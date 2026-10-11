#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";
import {
  createCatalogClient,
  formatSchema,
  resourceId,
  searchResources,
} from "./catalog.mjs";

const { version } = JSON.parse(
  await readFile(new URL("package.json", import.meta.url), "utf8"),
);
const client = createCatalogClient({
  url: process.env.SEMPATA_CATALOG_URL,
  cacheDirectory: process.env.SEMPATA_CACHE_DIR,
});
const annotations = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: true,
};
const result = (data) => ({
  content: [{ type: "text", text: JSON.stringify(data) }],
  structuredContent: data,
});
const handle = (action) => async (input) => {
  try {
    return result(await action(input));
  } catch (error) {
    return { isError: true, content: [{ type: "text", text: error.message }] };
  }
};

serveStdio(() => {
  const server = new McpServer(
    { name: "sempata", version },
    {
      instructions:
        "Search Sempata for free icons, React components, and CSS motion. Search locally, retrieve only the assets you need, and use get_usage for dependencies and exact code. Only the react format contains verified published npm imports. Preserve license notices, keyboard focus, and reduced-motion rules. These tools return source code; apply it using your own project tools.",
    },
  );
  server.registerTool(
    "search_resources",
    {
      description:
        "Search the Sempata catalog locally by English words, type, collection, or category. Returns bounded metadata and IDs for get_resource/get_usage.",
      inputSchema: z.object({
        query: z.string().max(200).default(""),
        type: z.enum(["icon", "component", "motion"]).optional(),
        collection: z.string().max(100).optional(),
        category: z.string().max(100).optional(),
        limit: z.number().int().min(1).max(50).default(20),
        offset: z.number().int().min(0).max(50_000).default(0),
      }),
      annotations,
    },
    handle(async (input) => searchResources(await client.catalog(), input)),
  );

  const inputSchema = z.object({
    id: resourceId,
    format: formatSchema.optional(),
  });
  for (const tool of ["get_resource", "get_usage"])
    server.registerTool(
      tool,
      {
        description:
          tool === "get_resource"
            ? "Retrieve exact SVG, JSX, React npm usage, or CSS for a resource ID returned by search_resources. Files are fetched on demand and cached locally."
            : "Get a resource usage example, required dependencies, accessibility guidance, and license. React npm imports are offered only for icons verified in a published package.",
        inputSchema,
        annotations,
      },
      handle(async ({ id, format }) => {
        const asset = await client.resource(id);
        format ??=
          tool === "get_usage" && asset.formats.includes("react")
            ? "react"
            : asset.formats[0];
        if (!asset.formats.includes(format))
          throw new Error(
            `Format ${format} is unavailable for ${id}. Available: ${asset.formats.join(", ")}.`,
          );
        const { code, usage, ...metadata } = asset;
        return { ...metadata, format, code: code[format], ...usage[format] };
      }),
    );
  return server;
});
