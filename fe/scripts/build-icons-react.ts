import assert from 'node:assert/strict'
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import ts from 'typescript'
import { collections } from '../src/collections/index.ts'
import { iconComponentName, iconJsx } from '../src/collections/icons.ts'

const directory = new URL('../../packages/icons-react/', import.meta.url)
const output = new URL('dist/', directory)
const license = await readFile(
  new URL('../src/collections/LICENSE.txt', import.meta.url),
  'utf8',
)
const banner = `/*!\n${license.trim()}\n*/\n`
await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })
await copyFile(
  new URL('../src/collections/LICENSE.txt', import.meta.url),
  new URL('LICENSE.txt', directory),
)

async function compile(source: string, filename: string) {
  const options = {
    fileName: filename,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      declaration: true,
    },
    reportDiagnostics: true,
  }
  const javascript = ts.transpileModule(source, options)
  const declaration = ts.transpileDeclaration(source, options)
  for (const result of [javascript, declaration])
    assert.equal(
      result.diagnostics?.length,
      0,
      ts.formatDiagnosticsWithColorAndContext(result.diagnostics ?? [], {
        getCurrentDirectory: () => process.cwd(),
        getCanonicalFileName: (name) => name,
        getNewLine: () => '\n',
      }),
    )
  await writeFile(
    new URL(filename.replace(/\.tsx?$/, '.js'), output),
    banner + javascript.outputText,
  )
  await writeFile(
    new URL(filename.replace(/\.tsx?$/, '.d.ts'), output),
    banner + declaration.outputText,
  )
}

await compile(
  await readFile(new URL('src/types.ts', directory), 'utf8'),
  'types.ts',
)
const root = ["export type { IconProps } from './types.js';"]
for (const collection of collections) {
  await mkdir(new URL(`${collection.id}/`, output), { recursive: true })
  const exports = ["export type { IconProps } from './types.js';"]
  const prefix = collection.name.replace(/[^a-zA-Z0-9]/g, '')
  const outline = collection.style === 'outline'
  for (const icon of collection.icons) {
    const name = iconComponentName(icon)
    const jsx = iconJsx(collection, icon)
    const body = jsx.slice(jsx.indexOf('>\n') + 2, jsx.lastIndexOf('</svg>'))
    await compile(
      `import type { ReactElement } from 'react';
import type { IconProps } from '../types.js';
export function ${name}({ size = ${collection.defaultSettings.size}, color = 'currentColor', strokeWidth = ${collection.defaultSettings.strokeWidth}, ...props }: IconProps): ReactElement {
  const labelled = Boolean(props['aria-label'] || props['aria-labelledby']);
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" color={color} stroke={${outline ? 'color' : "'none'"}} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden={labelled ? undefined : true} role={labelled ? 'img' : undefined} focusable="false" {...props}>
${body}</svg>;
}
`,
      `${collection.id}/${icon.id}.tsx`,
    )
    exports.push(`export { ${name} } from './${collection.id}/${icon.id}.js';`)
    root.push(
      `export { ${name} as ${prefix}${name} } from './${collection.id}/${icon.id}.js';`,
    )
  }
  await compile(exports.join('\n'), `${collection.id}.ts`)
}
await compile(root.join('\n'), 'index.ts')
console.error(
  `Built ${collections.reduce((count, collection) => count + collection.icons.length, 0)} React icons from ${collections.length} collections.`,
)
