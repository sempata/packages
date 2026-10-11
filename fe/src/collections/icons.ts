const iconLicense = `MIT License

Copyright (c) 2026 Sempata

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

export type IconDefinition = {
  id: string
  addedAt: string
  name: string
  category: string
  tags: string[]
  body: string
}

export type IconSettings = { size: number; strokeWidth: number; color: string }
export type IconCollection = {
  id: string
  version: string
  name: string
  description: string
  categories: readonly string[]
  icons: IconDefinition[]
  defaultSettings: IconSettings
} & ({ style: 'outline' } | { style: 'color'; palette: readonly string[] })

export function iconComponentName(icon: IconDefinition) {
  return icon.id
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join('')
}

export function iconReact(
  collection: IconCollection,
  icon: IconDefinition,
  settings = collection.defaultSettings,
) {
  validateSettings(settings)
  const name = iconComponentName(icon)
  const appearance =
    collection.style === 'outline'
      ? ` color="${settings.color}" strokeWidth={${settings.strokeWidth}}`
      : ''
  return `import { ${name} } from '@sempata/icons-react/${collection.id}'\n\n<${name} size={${settings.size}}${appearance} />\n`
}

export function searchIcons(
  collection: IconCollection,
  query: string,
  category: string,
) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  return collection.icons.filter((icon) => {
    const text =
      `${icon.name} ${icon.id} ${icon.category} ${icon.tags.join(' ')}`.toLocaleLowerCase(
        'id',
      )
    return (
      (category === 'All' || icon.category === category) &&
      words.every((word) => text.includes(word))
    )
  })
}

function validateSettings(settings: IconSettings) {
  if (
    !Number.isFinite(settings.size) ||
    settings.size < 16 ||
    settings.size > 64 ||
    !Number.isFinite(settings.strokeWidth) ||
    settings.strokeWidth < 1 ||
    settings.strokeWidth > 3 ||
    !/^(#[0-9a-f]{6}|currentColor)$/i.test(settings.color)
  )
    throw new Error('Invalid icon settings.')
}

function presentation(collection: IconCollection, settings: IconSettings) {
  validateSettings(settings)
  return collection.style === 'outline'
    ? `fill="none" stroke="${settings.color}" stroke-width="${settings.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"`
    : 'fill="none" stroke="none"'
}

export function iconSvg(
  collection: IconCollection,
  icon: IconDefinition,
  settings = collection.defaultSettings,
) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${settings.size}" height="${settings.size}" viewBox="0 0 24 24" ${presentation(collection, settings)}>\n<!--\n${iconLicense}\n-->\n  ${icon.body}\n</svg>\n`
}

export function iconJsx(
  collection: IconCollection,
  icon: IconDefinition,
  settings = collection.defaultSettings,
) {
  return iconSvg(collection, icon, settings)
    .replace(`<!--\n${iconLicense}\n-->`, `{/*\n${iconLicense}\n*/}`)
    .replaceAll('stroke-width=', 'strokeWidth=')
    .replaceAll('stroke-linecap=', 'strokeLinecap=')
    .replaceAll('stroke-linejoin=', 'strokeLinejoin=')
    .replaceAll('stroke-dasharray=', 'strokeDasharray=')
    .replaceAll('fill-rule=', 'fillRule=')
    .replace(' fill="none"', ' aria-hidden="true" fill="none"')
}

export function iconSprite(
  collection: IconCollection,
  settings = collection.defaultSettings,
) {
  const attributes = presentation(collection, settings)
  const symbols = collection.icons.map(
    (icon) =>
      `  <symbol id="sempata-${icon.id}" viewBox="0 0 24 24" ${attributes}>${icon.body}</symbol>`,
  )
  return `<svg xmlns="http://www.w3.org/2000/svg">\n<!--\n${iconLicense}\n-->\n${symbols.join('\n')}\n</svg>\n`
}
