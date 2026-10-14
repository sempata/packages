# Sempata

Build interfaces with character. Free React icons and local tools for developers and their AI coding agents.

This repository contains the source for [`@sempata/icons-react`](https://www.npmjs.com/package/@sempata/icons-react), [`@sempata/mcp`](https://www.npmjs.com/package/@sempata/mcp), and the Sempata frontend skill, plus the shared vector catalog and a runnable React example. Browse the library at [sempata.com](https://sempata.com), or follow the [installation guide](https://sempata.com/packages).

## Frontend skill and prompt recipes

The [Sempata frontend skill](https://sempata.com/guides/sempata-frontend) guides your agent from a project brief to a consistent visual direction, matching resources, and browser review. Install it in your project:

```sh
npx skills add sempata/packages --skill sempata-frontend
```

Pair the skill with the local MCP server below for actual code and usage guidance. Explore [prompt recipes](https://sempata.com/recipes) with live previews, dependencies, and source for a playful CTA, a portfolio photo stack, and a quiet CSS entrance.

Read the [skill source](skills/sempata-frontend/SKILL.md) and its [MIT license](skills/sempata-frontend/LICENSE.txt). The first version is `0.1.0`; its release tag is `frontend-skill-v0.1.0`. To install that release:

```sh
npx skills add https://github.com/sempata/packages/tree/frontend-skill-v0.1.0/skills/sempata-frontend
```

The website distributes the same released skill as a generated static file. Skill updates do not require an npm package release.

The public packages and MCP catalog contain free resources. Premium originals on the website use its authenticated paid access.

## Run a real consumer example

[Release desk](examples/release-desk) is a standalone React 19 + Vite app: enter a project name, version, and changes, generate a release preview, then copy Markdown. It uses published React icons, adapted Sempata component source, and CSS motion.

```sh
git clone https://github.com/sempata/packages.git
cd packages/examples/release-desk
npm ci
npm run dev
```

Use Node.js 24 for the example. Its dependencies are pinned with a lockfile and resolve from npm rather than linking to this repository's package source. See the example README for resource provenance, licenses, agent setup, tests, and integration limits.

## React icons

Requires React 19. Choose your package manager:

```sh
npm install @sempata/icons-react
# pnpm add @sempata/icons-react
# yarn add @sempata/icons-react
# bun add @sempata/icons-react
```

```tsx
import { Shop } from '@sempata/icons-react/basic'
import { Heart } from '@sempata/icons-react/arcade'

export function Example() {
  return <><Shop size={24} color="currentColor" /><Heart size={32} aria-label="Favorite" /></>
}
```

Available collections: Basic, Pop, Quest, Mascot, Doodle, Arcade, Puff, Aegean, Gleam, and Tinker. Outline icons support custom color and stroke width. Color icons preserve their palette. Imports support tree-shaking and TypeScript. [React documentation](packages/icons-react/README.md).

React `0.4.0` adds thirty-two Tinker icons for learning interfaces, bringing the catalog to 1,410 icons across ten collections. Import playful illustrations from `@sempata/icons-react/tinker` and secondary interface controls from `@sempata/icons-react/basic`.

## Local MCP

Requires Node.js 22 or newer. Add this entry to `.cursor/mcp.json` for Cursor or `.mcp.json` for Claude Code. Keep any existing server entries.

```json
{
  "mcpServers": {
    "sempata": {
      "command": "npx",
      "args": ["-y", "@sempata/mcp@0.1.1"]
    }
  }
}
```

Reconnect your client, then ask it to find an icon, React component, or CSS animation. Search runs locally. The catalog is cached and checked during use; selected source files are fetched on demand. No Sempata account, API key, or remote MCP server is required. [MCP documentation](packages/mcp/README.md).

## Development

Use Node.js 24 or newer to run the TypeScript icon build tools. The published MCP itself supports Node.js 22 or newer.

```sh
npm --prefix fe ci
npm --prefix packages/mcp ci
npm run build
npm test
```

`fe/src/collections/` holds the vector catalog. `fe/scripts/` contains only package build and validation tools. Generated SVG files and React modules are not committed. The complete website is maintained separately.

See [CONTRIBUTING.md](CONTRIBUTING.md) for changes and [CHANGELOG.md](CHANGELOG.md) for releases. Report reproducible issues at [sempata/packages/issues](https://github.com/sempata/packages/issues).

## License

The icon catalog and package implementations are [MIT licensed](LICENSE.txt). Asset fixtures retain the license recorded in their metadata. UI and motion retrieved through MCP follow [Sempata terms](https://sempata.com/terms); third-party dependencies retain their own licenses.
