import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import {
  catalogSchema,
  createCatalogClient,
  digest,
  resourceSchema,
  searchResources,
} from "../catalog.mjs";

const files = new URL("fixtures/", import.meta.url);
const original = catalogSchema.parse(
  JSON.parse(await readFile(new URL("catalog.json", files), "utf8")),
);

async function fixture(t) {
  const cacheDirectory = await mkdtemp(join(tmpdir(), "sempata-mcp-test-"));
  const requests = [];
  let catalog = structuredClone(original);
  const replacements = new Map();
  const server = createServer(async (req, res) => {
    requests.push(req.url);
    const path = req.url.slice("/agents/".length);
    if (path === "catalog.json") {
      const etag = `"${catalog.version}"`;
      res.setHeader("etag", `W/${etag}`);
      if (req.headers["if-none-match"] === etag) {
        res.writeHead(304);
        res.end();
        return;
      }
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify(catalog));
      return;
    }
    try {
      const body =
        replacements.get(path) ??
        (await readFile(new URL(path, files), "utf8"));
      res.setHeader("content-type", "application/json");
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}/agents/`;
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await rm(cacheDirectory, { recursive: true, force: true });
  });
  return {
    url,
    cacheDirectory,
    requests,
    replacements,
    update: (data) => {
      catalog = data;
    },
  };
}

test("fixture assets validate and search results are bounded and filterable", async () => {
  for (const entry of original.resources)
    resourceSchema.parse(
      JSON.parse(await readFile(new URL(`${entry.id}.json`, files), "utf8")),
    );
  const search = searchResources(original, {
    query: "yellow CTA",
    type: "component",
    limit: 1,
  });
  assert.equal(search.results[0].id, "components/button-yellow");
  assert.equal(search.results.length, 1);
  assert.equal(
    searchResources(original, { collection: "quest", type: "icon" }).total,
    original.resources.filter((item) => item.collection === "quest").length,
  );
  const page = searchResources(original, { limit: 2 });
  assert.equal(page.nextOffset, 2);
  assert.equal(
    searchResources(original, { query: "this-resource-does-not-exist" }).total,
    0,
  );
  const motion = searchResources(original, { type: "motion" });
  assert.ok(motion.total > 0);
  assert.ok(motion.results.every((item) => item.formats.includes("css")));
});

test("catalog and asset caches survive process restarts, deduplicate index loads, and revalidate after one hour", async (t) => {
  const f = await fixture(t);
  let time = Date.now();
  const client = createCatalogClient({ ...f, now: () => time });
  await Promise.all([client.catalog(), client.catalog(), client.catalog()]);
  assert.equal(f.requests.length, 1);
  const first = await client.resource("components/button-yellow");
  const requestCount = f.requests.length;
  await client.resource(first.id);
  const restarted = createCatalogClient({ ...f, now: () => time });
  await restarted.resource(first.id);
  assert.equal(f.requests.length, requestCount);
  time += 3_600_001;
  await restarted.catalog();
  assert.equal(f.requests.length, requestCount + 1);
  assert.equal(f.requests.at(-1), "/agents/catalog.json");
  const key = original.resources.find((item) => item.id === first.id).hash;
  const path = join(f.cacheDirectory, digest(f.url), `${key}.json`);
  await writeFile(
    path,
    JSON.stringify({
      ...first,
      code: { jsx: "<script>changed cache</script>" },
    }),
  );
  assert.equal((await restarted.resource(first.id)).code.jsx, first.code.jsx);
  assert.equal(f.requests.length, requestCount + 2);
});

test("a changed asset refreshes a cached index before use", async (t) => {
  const f = await fixture(t);
  const client = createCatalogClient(f);
  await client.catalog();
  const id = "motion/rise";
  const asset = JSON.parse(
    await readFile(new URL(`${id}.json`, files), "utf8"),
  );
  asset.code.css += "\n/* updated animation */";
  const body = JSON.stringify(asset) + "\n";
  f.replacements.set(`${id}.json`, body);
  const next = structuredClone(original);
  next.resources.find((item) => item.id === id).hash = digest(body);
  next.version = digest(JSON.stringify(next.resources));
  f.update(next);
  assert.match((await client.resource(id)).code.css, /updated animation/);
  assert.equal(
    f.requests.filter((path) => path.endsWith("catalog.json")).length,
    2,
  );
});

test("untrusted URLs, traversal IDs, malformed metadata, and oversized assets are rejected", async (t) => {
  assert.throws(
    () => createCatalogClient({ url: "http://example.com/agents/" }),
    /HTTPS/,
  );
  assert.throws(
    () =>
      createCatalogClient({ url: "https://user:secret@example.com/agents/" }),
    /credentials/,
  );
  const invalid = structuredClone(original);
  invalid.resources[0].id = "../private";
  assert.equal(catalogSchema.safeParse(invalid).success, false);
  const f = await fixture(t);
  const client = createCatalogClient(f);
  await assert.rejects(client.resource("../private"), /Invalid/);
  assert.equal(f.requests.length, 0);
  f.replacements.set("motion/rise.json", "x".repeat(1_000_001));
  await assert.rejects(client.resource("motion/rise"), /size limit/);
});

test("stdio MCP discovers three tools and returns usable React, SVG, CSS, and dependencies", async (t) => {
  const f = await fixture(t);
  const client = new Client({ name: "sempata-test", version: "1.0.0" });
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [fileURLToPath(new URL("../index.mjs", import.meta.url))],
    env: {
      ...process.env,
      SEMPATA_CATALOG_URL: f.url,
      SEMPATA_CACHE_DIR: f.cacheDirectory,
    },
    stderr: "pipe",
  });
  let stderr = "";
  transport.stderr?.on("data", (data) => {
    stderr += data;
  });
  t.after(() => client.close());
  await client.connect(transport);
  assert.equal(client.getServerVersion().name, "sempata");
  assert.match(client.getInstructions(), /Search Sempata/);
  const tools = await client.listTools();
  assert.deepEqual(tools.tools.map((tool) => tool.name).sort(), [
    "get_resource",
    "get_usage",
    "search_resources",
  ]);
  assert.ok(tools.tools.every((tool) => tool.annotations.readOnlyHint));
  const call = async (name, arguments_) => {
    const result = await client.callTool({ name, arguments: arguments_ });
    assert.ok(!result.isError, JSON.stringify(result));
    return result.structuredContent;
  };
  const search = await call("search_resources", {
    query: "yellow CTA button",
    type: "component",
  });
  assert.equal(search.results[0].id, "components/button-yellow");
  const component = await call("get_usage", { id: search.results[0].id });
  assert.ok(
    component.dependencies.some((name) => name.startsWith("tailwindcss@")),
  );
  const motion = await call("search_resources", { type: "motion", query: "rise" });
  assert.ok(motion.total > 0);
  const motionUsage = await call("get_usage", { id: motion.results[0].id, format: "css" });
  assert.equal(motionUsage.type, "motion");
  assert.deepEqual(motionUsage.dependencies, []);
  const icon = original.resources.find(
    (item) => item.type === "icon" && item.formats.includes("react"),
  );
  assert.match(
    (await call("get_usage", { id: icon.id, format: "react" })).code,
    /import .*@sempata\/icons-react/,
  );
  assert.match(
    (await call("get_resource", { id: icon.id, format: "svg" })).code,
    /MIT License/,
  );
  assert.match(
    (await call("get_resource", { id: "motion/rise" })).code,
    /prefers-reduced-motion/,
  );
  const unreleased = original.resources.find(
    (item) => item.type === "icon" && !item.formats.includes("react"),
  );
  assert.ok(
    (
      await client.callTool({
        name: "get_usage",
        arguments: { id: unreleased.id, format: "react" },
      })
    ).isError,
  );
  const invalid = await client.callTool({
    name: "search_resources",
    arguments: { limit: 1000 },
  });
  assert.ok(invalid.isError);
  await client.close();
  assert.equal(stderr, "");
});
