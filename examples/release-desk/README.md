# Release desk

A small developer tool built with Sempata: enter a project name, a stable version, and one change per line; preview the release note, then copy Markdown.

This is a standalone React 19 + Vite consumer. It installs the published `@sempata/icons-react@0.4.0` from npm and includes adapted public component source and CSS motion. It does not use repository workspace links, a backend, an account, persistence, or tracking.

## Run it

Use Node.js 24; the recorded local checks used 24.14.1. From the repository root:

```sh
cd examples/release-desk
npm ci
npm run dev
```

Open the local URL printed by Vite. Drafts stay in memory and clear on reload.

To verify the consumer and preview its production build:

```sh
npm test
npm run build
npm run preview
```

The lockfile pins React and React DOM 19.3.0, Vite 8.3.4, the React Vite plugin 6.0.5, and Sempata icons 0.4.0. The package engine declares Vite's Node 22.12+ requirement; Node 24 is the tested setup.

## Use your agent

Install the skill in this example directory:

```sh
npx skills add sempata/packages --skill sempata-frontend
```

Choose your agent and project scope in the installer. The included `.cursor/mcp.json` configures the published local MCP server for Cursor. Approve or reconnect it through your client's normal MCP setup. For other clients, follow the [Sempata packages guide](https://sempata.com/packages#mcp) and keep any existing server entries.

Read [BRIEF.md](BRIEF.md) for the actual consumer task used in the first evaluation. A useful next request is:

> Use the Sempata frontend skill to adapt Release desk to our brand. Preserve draft validation, stale-preview warnings, honest copy feedback, focus states, and reduced motion. Explain your resource choices and review the result at desktop and narrow widths.

## Resource provenance

- [Copy](https://sempata.com/icons/basic/files/copy) and [File text](https://sempata.com/icons/basic/files/file-text): verified `Copy` and `FileText` imports from `@sempata/icons-react/basic`. Both use the same outline family and are decorative beside meaningful text.
- [Raised capsule button](https://sempata.com/components/actions/buttons/raised-capsule-button): actual button/face markup and CSS adapted for form submission, a terracotta palette, readable system typography, and the existing focus and reduced-motion rules. The original Baloo 2 font import was omitted; no remote font is loaded.
- [Rise in](https://sempata.com/components/entrance/fade-and-reveal/rise-in): supplied `.rise-in` CSS preserved in `src/styles.css`. It runs on a successful preview and disables animation for reduced motion.

The original MCP resource responses are retained in `resources/`, including exact code, dependencies, source URLs, and license metadata. Resource IDs come from the catalog; do not infer import names from icon labels or rewrite IDs from their type.

## Behavior and checks

The form accepts a stable `major.minor.patch` version without leading zeros, prefixes, prereleases, or build metadata. Invalid input displays field errors and focuses the first affected field. A previously valid preview remains visible. Editing any field marks it stale and disables copying until the draft matches or is previewed again.

Copy awaits the Clipboard API write before reporting success. Missing support or denied permission gives a visible manual-copy instruction. Clipboard writes require a browser-supported secure context such as HTTPS or localhost. The visible Markdown remains selectable.

The Node tests cover validation, stable versions, Markdown generation and escaping, retained and stale previews, exact asynchronous copy writes, and unavailable or rejected clipboard access. GitHub Actions installs dependencies from the lockfile, runs these tests, builds the consumer, and checks skill installation.

The first coordinating browser review exercised valid, empty, invalid, and edited drafts; copy success feedback; keyboard focus; and rendering at desktop and a 390px iframe viewport. Clipboard rejection is covered by unit tests rather than a browser permission override. Reduced-motion rules were preserved and reviewed, but the browser's motion preference was not emulated. No Safari, Firefox, real mobile device, or assistive-technology check was performed.

The [evaluation record](../../evaluations/frontend-skill-0.1.0.md) explains the comparison, the motion catalog defect found during it, and its limits.

## Licenses

Sempata icons and React runtime dependencies use MIT; their notices are included in `public/licenses` and copied into the build. The selected UI component and motion resource retain their catalog's [Sempata Terms](https://sempata.com/terms), separately from the icon license. See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). Build dependencies retain their installed notices. The original component snapshot retains its font attribution; that font is not used by this app.
