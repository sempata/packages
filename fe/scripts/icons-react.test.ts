import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { after, test } from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { rolldown } from 'rolldown'
import ts from 'typescript'
import { collections } from '../src/collections/index.ts'
import { iconComponentName, iconReact } from '../src/collections/icons.ts'

execFileSync(process.execPath, [
  fileURLToPath(new URL('build-icons-react.ts', import.meta.url)),
])
const consumer = await mkdtemp(join(tmpdir(), 'sempata-icons-react-'))
const nodeModules = join(consumer, 'node_modules')
const installed = join(nodeModules, '@sempata', 'icons-react')
await mkdir(installed, { recursive: true })
const source = new URL('../../packages/icons-react/', import.meta.url)
await cp(new URL('dist/', source), join(installed, 'dist'), { recursive: true })
for (const filename of ['package.json', 'LICENSE.txt'])
  await cp(new URL(filename, source), join(installed, filename))
await mkdir(join(nodeModules, '@types'), { recursive: true })
for (const dependency of ['react', '@types/react', 'csstype'])
  await symlink(
    fileURLToPath(new URL(`../node_modules/${dependency}`, import.meta.url)),
    join(nodeModules, dependency),
    'dir',
  )
await writeFile(join(consumer, 'package.json'), '{"type":"module"}\n')
after(() => rm(consumer, { recursive: true, force: true }))

test('React package exports every catalog icon and preserves vectors, palettes, and MIT notices', async () => {
  const license = await readFile(
    new URL('../src/collections/LICENSE.txt', import.meta.url),
    'utf8',
  )
  assert.equal(await readFile(join(installed, 'LICENSE.txt'), 'utf8'), license)
  const root = await import(
    pathToFileURL(join(installed, 'dist/index.js')).href
  )
  let count = 0
  for (const collection of collections) {
    const components = await import(
      pathToFileURL(join(installed, `dist/${collection.id}.js`)).href
    )
    assert.equal(Object.keys(components).length, collection.icons.length)
    const prefix = collection.name.replace(/[^a-zA-Z0-9]/g, '')
    for (const icon of collection.icons) {
      const name = iconComponentName(icon)
      assert.equal(components[name], root[`${prefix}${name}`])
      const html = renderToStaticMarkup(createElement(components[name]))
      assert.match(html, /viewBox="0 0 24 24"/)
      assert.match(html, /aria-hidden="true"/)
      assert.deepEqual(
        [...html.matchAll(/ d="([^"]+)"/g)].map((match) => match[1]),
        [...icon.body.matchAll(/ d="([^"]+)"/g)].map((match) => match[1]),
      )
      if (collection.style === 'color')
        assert.deepEqual(
          [...html.matchAll(/(?:fill|stroke)="(#[A-F0-9]{6})"/g)].map(
            (match) => match[1],
          ),
          [...icon.body.matchAll(/(?:fill|stroke)="(#[A-F0-9]{6})"/g)].map(
            (match) => match[1],
          ),
        )
      const code = await readFile(
        join(installed, `dist/${collection.id}/${icon.id}.js`),
        'utf8',
      )
      assert.ok(code.includes(license.trim()))
      assert.doesNotMatch(code, /dangerouslySetInnerHTML/)
      assert.ok(
        iconReact(collection, icon).includes(
          `import { ${name} } from '@sempata/icons-react/${collection.id}'`,
        ),
      )
      count++
    }
  }
  assert.equal(Object.keys(root).length, count)
})

test('React icons accept SVG customization and expose labelled icons accessibly', async () => {
  const { Shop } = await import(
    pathToFileURL(join(installed, 'dist/basic.js')).href
  )
  const html = renderToStaticMarkup(
    createElement(Shop, {
      size: '1em',
      color: '#123abc',
      strokeWidth: 2.5,
      className: 'shop',
      'aria-label': 'Shop',
      'data-test': 'icon',
    }),
  )
  assert.match(html, /width="1em" height="1em"/)
  assert.match(html, /stroke="#123abc" stroke-width="2.5"/)
  assert.match(html, /class="shop"/)
  assert.match(html, /aria-label="Shop"/)
  assert.match(html, /role="img"/)
  assert.match(html, /data-test="icon"/)
  assert.doesNotMatch(html, /aria-hidden/)
  const labelled = renderToStaticMarkup(
    createElement(Shop, { 'aria-labelledby': 'label' }),
  )
  assert.match(labelled, /role="img"/)
  assert.doesNotMatch(labelled, /aria-hidden/)
  assert.match(
    renderToStaticMarkup(createElement(Shop, { 'aria-label': '' })),
    /aria-hidden="true"/,
  )
})

test('all collection imports, direct imports, root exports, and React 19 refs type-check', async () => {
  const imports = [
    "import { createRef } from 'react';",
    "import { Sword as DirectSword } from '@sempata/icons-react/quest/sword';",
    "import { QuestSword } from '@sempata/icons-react';",
  ]
  const usage = [
    '<DirectSword />;',
    '<QuestSword ref={createRef<SVGSVGElement>()} />;',
  ]
  for (const collection of collections) {
    const prefix = collection.name.replace(/[^a-zA-Z0-9]/g, '')
    const names = collection.icons.map(iconComponentName)
    imports.push(
      `import { ${names.map((name) => `${name} as ${prefix}${name}FromCollection`).join(', ')} } from '@sempata/icons-react/${collection.id}';`,
    )
    usage.push(
      ...names.map(
        (name) =>
          `<${prefix}${name}FromCollection size="1em" className="icon" aria-label="Icon" />;`,
      ),
    )
  }
  usage.push(
    '// @ts-expect-error icon geometry cannot be replaced with HTML',
    '<QuestSword dangerouslySetInnerHTML={{__html: "bad"}} />;',
    '// @ts-expect-error size must be a number or string',
    '<QuestSword size={{}} />;',
  )
  const entry = join(consumer, 'usage.tsx')
  await writeFile(entry, [...imports, ...usage].join('\n'))
  const program = ts.createProgram([entry], {
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
    noEmit: true,
    strict: true,
    skipLibCheck: true,
  })
  const diagnostics = ts.getPreEmitDiagnostics(program)
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCurrentDirectory: () => consumer,
      getCanonicalFileName: (name) => name,
      getNewLine: () => '\n',
    }),
  )
})

test('tree-shaking keeps only the imported icon from root and collection imports', async () => {
  for (const specifier of [
    '@sempata/icons-react',
    '@sempata/icons-react/quest',
  ]) {
    const entry = join(consumer, 'bundle.js')
    const exportName = specifier.endsWith('/quest') ? 'Sword' : 'QuestSword'
    await writeFile(
      entry,
      `export { ${exportName} as Sword } from '${specifier}';`,
    )
    const bundle = await rolldown({
      input: entry,
      external: ['react/jsx-runtime'],
    })
    try {
      const { output } = await bundle.generate({ format: 'esm' })
      const chunk = output.find((item) => item.type === 'chunk')!
      const rendered = Object.entries(chunk.modules)
        .filter(([, module]) => module.renderedLength > 0)
        .map(([name]) => name)
      assert.deepEqual(
        rendered
          .filter((name) => name.includes('/dist/quest/'))
          .map((name) => name.split('/').pop()),
        ['sword.js'],
      )
      assert.ok(
        chunk.code.length < 20000,
        'unused collections must not enter the bundle',
      )
    } finally {
      await bundle.close()
    }
  }
})
