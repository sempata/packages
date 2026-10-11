# Changelog

## React icons 0.2.1

- Add the public source repository and issue tracker to package metadata.
- Document npm, pnpm, Yarn, and Bun installation.
- Keep the same 1,235 icons and seven collections as version 0.2.0.

## MCP 0.1.1

- Add the `com.sempata/mcp` registry identity and public source repository.
- Make package tests independent of the website through local fixtures.
- Preserve local stdio tools, cached catalog search, and on-demand asset retrieval.

## React icons 0.2.0

Basic icons use the `@sempata/icons-react/basic` collection import. Users upgrading from 0.1.0 should update imports from the previous Basic collection paths. Pop and Quest use English icon IDs; update direct imports using the current package exports. This release does not retain the previous import paths.
