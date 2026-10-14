# Changelog

## Video templates 0.1.1 — 2026-10-14

- Build FFmpeg against the installed x264 headers so the source renders on systems with a different x264 ABI than the upstream prebuilt archive. Preserve the template API and rendered samples.

## Frontend skill 0.2.0 and video templates 0.1.0 — 2026-10-14

- Add named motion and product-video guidance to the frontend skill.
- Publish three complete fframes CPU video templates with editable JSON, original sample visuals, bundled fonts, and validation tests.
- Add six CSS motion effects to the website and separate Motion and Video directories. Preserve existing MCP resource IDs and redirect established motion page URLs.
- Expose video sample players and editable-source links through the current MCP catalog format.

## Frontend skill 0.1.0 — 2026-10-14

- Publish the Sempata frontend skill source and MIT license with a versioned Git release.
- Add a runnable React 19 + Vite consumer example using published icons, component source, and CSS motion.
- Activate GitHub Actions checks for the example build, behavior tests, skill installation, and MCP fixture tests.

## React icons 0.4.0 — 2026-10-12

- Add thirty-two original Tinker icons for study, science, practice, and progress.
- Preserve all existing 1,378 icons and collection imports.
- Export 1,410 icons across ten collections with native SVG paths, React 19 props, TypeScript declarations, and MIT notices.

## React icons 0.3.0 — 2026-10-11

- Add the public source repository and issue tracker to package metadata.
- Document npm, pnpm, Yarn, and Bun installation.
- Add ninety-three original Gleam icons with glossy silhouettes and candy colors.
- Include fifty Aegean blue-ink icons from the shared catalog.
- Export 1,378 icons across nine collections, including the new `aegean` and `gleam` imports.

## MCP 0.1.1 — 2026-10-11

- Add the `com.sempata/mcp` registry identity and public source repository.
- Make package tests independent of the website through local fixtures.
- Preserve local stdio tools, cached catalog search, and on-demand asset retrieval.

## React icons 0.2.0

Basic icons use the `@sempata/icons-react/basic` collection import. Users upgrading from 0.1.0 should update imports from the previous Basic collection paths. Pop and Quest use English icon IDs; update direct imports using the current package exports. This release does not retain the previous import paths.
