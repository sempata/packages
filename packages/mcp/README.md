# @sempata/mcp

Search and use free Sempata icons, React components, and CSS motion from your AI coding agent. This MCP server runs locally over stdio. It searches a cached catalog on your computer and fetches selected assets as static JSON from [Sempata](https://sempata.com).

Requires Node.js 22 or newer. No account or API key is required.

Build interfaces with character. Pair these tools with the [Sempata frontend skill](https://sempata.com/guides/sempata-frontend) for visual direction and browser review, or start from [prompt recipes](https://sempata.com/recipes) with real resource previews and source code.

## Connect your agent

For Cursor, add this to your project's `.cursor/mcp.json`. For Claude Code, use `.mcp.json`. Other clients that launch stdio MCP servers can use the same command and arguments in their own configuration format.

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

Restart or reconnect your MCP client after changing its configuration. Ask your agent:

> Find a yellow CTA button and a matching outline icon from Sempata. Show their code and dependencies.

## Tools

- `search_resources`: search locally by words, resource type (`icon`, `component`, or `motion`), icon collection, or category. CSS motion uses type `motion`; retrieve the exact ID returned by search. Results default to 20 and are limited to 50; use `offset` to page through them.
- `get_resource`: fetch exact code for an ID returned by search. Supports SVG, inline JSX, verified React package imports, and CSS where available.
- `get_usage`: retrieve an example, dependencies, usage instructions, and license information. The `react` format is offered only when the icon and its export name were verified in a published `@sempata/icons-react` version. Other icons remain available as SVG and inline JSX.

The tools return source code. Your agent applies it using its existing project tools. Preserve the license notices, keyboard focus states, and reduced-motion rules in the returned code.

For a complete consumer app, run the [Release desk example](../../examples/release-desk). Its README records the selected resources and adaptations. The [frontend skill source](../../skills/sempata-frontend/SKILL.md) is versioned in this repository.

## Updates and resource use

The catalog is checked at most once per hour during tool calls, with conditional HTTP requests when an ETag is available. Cached catalogs and assets survive process restarts under `~/.cache/sempata-mcp`. Source files are fetched only when requested and cached by their content hash. There is no background polling or remote MCP endpoint.

Adding an asset updates the website's static catalog on its next build and deployment. It does not require a new MCP package version. Updating the MCP implementation requires a new npm release. React icon package releases are separate.

## Development

Source code and contributions: [sempata/packages](https://github.com/sempata/packages). Its registry identity is `com.sempata/mcp`; registry metadata is maintained in `server.json`.

From the repository root:

```sh
npm --prefix packages/mcp ci
npm --prefix packages/mcp test
npm pack ./packages/mcp --pack-destination /tmp
```

Tests use local fixtures and do not require the website source or a network connection.

For website maintainers: after publishing a new React icon version, run these commands in the website repository to refresh the verified npm export snapshot and rebuild the website:

```sh
npm --prefix fe run icons:published
npm --prefix fe run build
```

`SEMPATA_CATALOG_URL` can point to a trusted preview catalog directory; it requires HTTPS, except for HTTP on localhost. `SEMPATA_CACHE_DIR` changes the cache directory. For example, run a local web preview serving `fe/public` and set the catalog URL to `http://127.0.0.1:3000/agents/`.

To publish the MCP package after tests pass:

```sh
cd packages/mcp
npm publish --dry-run --access public
npm publish --access public
```

## License

The MCP package and Sempata icons use MIT. Keep their copyright and permission notices. Components and motion carry links to Sempata terms; third-party dependencies retain their own licenses. See [LICENSE.txt](LICENSE.txt).
