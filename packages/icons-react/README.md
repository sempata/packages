# @sempata/icons-react

Original Sempata SVG icons for React 19, with TypeScript declarations and tree-shakable imports. Components are generated from the same catalog as [sempata.com](https://sempata.com/icons).

## Installation

Requires React 19. Install from npm:

```sh
npm install @sempata/icons-react
# Or use your preferred package manager:
# pnpm add @sempata/icons-react
# yarn add @sempata/icons-react
# bun add @sempata/icons-react
```

To build a local archive from this repository instead:

```sh
npm --prefix fe ci
npm pack ./packages/icons-react --pack-destination ./packages/icons-react
```

Install the generated `.tgz` from your consuming React project using `npm install /path/to/sempata-icons-react-0.3.0.tgz`.

## Usage

```tsx
import { Sword } from '@sempata/icons-react/quest'
import { Shop } from '@sempata/icons-react/basic'
import { TRex } from '@sempata/icons-react/mascot'

<Sword size={32} aria-label="Equipment" />
<Shop size="1em" color="currentColor" strokeWidth={2} />
<TRex size={48} className="mascot" />
```

Import from `basic`, `pop`, `quest`, `mascot`, `doodle`, `arcade`, or `puff`. Each icon also has a direct import, such as `@sempata/icons-react/quest/sword`. Root imports use collection prefixes, such as `QuestSword`, `BasicShop`, and `MascotTRex`, to keep names unique.

The `0.3.0` build also includes `aegean` and `gleam`. Gleam 1.1 contains 93 glossy icons, including interface controls, learning subjects, audio, progress, and rankings. Use the locally built archive for these collections until this version is published:

```tsx
import { Rocket } from '@sempata/icons-react/gleam'

<Rocket size={40} aria-label="Launch" />
```

`size` defaults to the collection's preview size. Outline icons accept `color` and `strokeWidth`; color icons retain their original palette. Standard SVG props, CSS classes, styles, events, and React 19 refs are supported. `IconProps` is exported for TypeScript consumers.

Icons are decorative by default. Provide `aria-label` or `aria-labelledby` when an icon conveys meaning without accompanying text. A labelled icon receives `role="img"` and is exposed to assistive technology.

## Development and publication

Source code and contributions: [sempata/packages](https://github.com/sempata/packages). See the repository's contribution guide for installation, tests, and pull requests.

Run `npm --prefix fe run icons:package` to regenerate the package. Add artwork to `fe/src/collections/`, preserving existing `addedAt` timestamps. Generated modules contain no runtime catalog, HTML injection, network requests, or additional dependencies beyond React.

### First release

1. [Create an npm account](https://www.npmjs.com/signup) and verify its email address.
2. Create an organization named `sempata`, if available, using the free **Unlimited public packages** plan. This grants the `@sempata` scope. An account whose username is `sempata` already owns that user scope. See [npm's organization setup](https://docs.npmjs.com/creating-an-organization/).
3. [Enable two-factor authentication](https://docs.npmjs.com/configuring-two-factor-authentication/) on the publishing account. Complete login and authentication in your browser.
4. From the repository root, review and publish the package:

```sh
cd packages/icons-react
npm login --auth-type=web --registry=https://registry.npmjs.org/
npm whoami
npm publish --dry-run --access public
npm publish --access public
```

Publishing runs the shared catalog exporter and test suite automatically before building the package. The dry run reviews the same package contents without uploading them. Public npm packages and public-only organizations are free.

Confirm the published version with `npm view @sempata/icons-react version`, then install `@sempata/icons-react@latest` in a React 19 project. The public package page is [npmjs.com/package/@sempata/icons-react](https://www.npmjs.com/package/@sempata/icons-react).

### Later releases

Add icons to the shared catalog, then from `packages/icons-react` update the version and publish:

```sh
npm version minor --no-git-tag-version
npm publish --dry-run --access public
npm publish --access public
```

Use `patch` for fixes and `minor` for new icons or collections. After the API is stable, use `major` for changes that break existing imports or props. Every release needs a new version; an already published name/version cannot be overwritten. There is no need to release on days without changes.

After publishing, run `npm --prefix fe run icons:published` from the repository root, then rebuild and deploy the website. This verifies the actual published exports before the [local MCP](../mcp/README.md) offers their npm imports.

## License

MIT. Keep the copyright and permission notices when distributing the icons. See [LICENSE.txt](LICENSE.txt).
