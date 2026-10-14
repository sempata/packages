# Contributing

Use Node.js 24 or newer, then follow the setup commands in the README.

- Edit icon metadata and vector paths in `fe/src/collections/`. Preserve existing IDs, addition timestamps, palettes, and license notices. New names, categories, and tags must use English.
- Update the relevant collection version when adding icons. Keep the 24px viewBox and accessibility behavior.
- MCP implementation changes belong in `packages/mcp/`. Tests use small local fixtures and do not require a running Sempata website.
- Frontend skill changes belong in `skills/sempata-frontend/`. Keep the entrypoint concise, preserve the resource licensing boundaries, and check it with the skills installer. Changes to instructions need a new `metadata.version` and an entry in the changelog.
- Consumer example changes belong in `examples/release-desk/`. Run `npm ci`, `npm test`, and `npm run build` there. Record the actual resource IDs and keep source notices. Test meaningful input, error, keyboard, narrow-screen, and reduced-motion behavior.
- Run `npm run build` and `npm test` before opening a pull request. Include a before/after preview for artwork changes and a clear description of behavior changes.

Do not commit generated output, credentials, or environment files. Follow `AGENTS.md`; Sempata headings do not use decorative eyebrows.

## Releasing

Maintainers build and test first, then bump the relevant package version. Each npm release needs a new version. Use patches for fixes and metadata, minors for added icons or features, and majors for breaking stable APIs. During 0.x development, document breaking changes prominently.

```sh
cd packages/icons-react
npm publish --dry-run --access public
npm publish --access public
```

For MCP, use `packages/mcp` instead. Keep `package.json` version and `server.json` version/package version aligned. After npm publication, publish `server.json` with the official `mcp-publisher` tool using the authenticated `com.sempata` domain identity.

Refresh the website's verified React export snapshot and static MCP catalog after a React release. Adding resources to the website does not require an MCP implementation release. Keep the setup examples pinned to a tested MCP version.

For skill releases, tag the reviewed commit as `frontend-skill-v<version>` matching the skill's `metadata.version`. Import the released skill and license into the website's vendored release inputs; generate its static skill file from those inputs rather than editing a second copy.

The prepared CI workflow is in `ci/developer-workflow.yml`. A maintainer with workflow access can activate it by moving it to `.github/workflows/developer-workflow.yml`; remove the draft location in the same change. The current repository CI is not active.
