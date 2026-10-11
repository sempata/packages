import { copyFile, mkdir, readdir, unlink, writeFile } from 'node:fs/promises'
import { collections } from '../src/collections/index.ts'
import { iconSprite, iconSvg } from '../src/collections/icons.ts'

for (const collection of collections) {
  const directory = new URL(
    `../public/icons/${collection.id}/`,
    import.meta.url,
  )
  const settings = { ...collection.defaultSettings, color: 'currentColor' }
  await mkdir(directory, { recursive: true })
  const filenames = new Set([
    'sprite.svg',
    ...collection.icons.map((icon) => `${icon.id}.svg`),
  ])
  for (const filename of await readdir(directory)) {
    if (filename.endsWith('.svg') && !filenames.has(filename))
      await unlink(new URL(filename, directory))
  }
  for (const icon of collection.icons) {
    await writeFile(
      new URL(`${icon.id}.svg`, directory),
      iconSvg(collection, icon, settings),
    )
  }
  await writeFile(
    new URL('sprite.svg', directory),
    iconSprite(collection, settings),
  )
  await copyFile(
    new URL('../src/collections/LICENSE.txt', import.meta.url),
    new URL('LICENSE.txt', directory),
  )
  await writeFile(
    new URL('manifest.json', directory),
    JSON.stringify(
      {
        name: collection.name,
        version: collection.version,
        license: 'MIT',
        style: collection.style,
        palette: collection.style === 'color' ? collection.palette : undefined,
        viewBox: '0 0 24 24',
        defaultSettings: collection.defaultSettings,
        icons: collection.icons.map(({ body: _body, ...metadata }) => metadata),
      },
      null,
      2,
    ) + '\n',
  )
  console.log(
    `Exported ${collection.icons.length} original ${collection.name} icons.`,
  )
}
