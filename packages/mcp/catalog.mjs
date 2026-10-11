import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { z } from "zod";

export const resourceId = z
  .string()
  .max(160)
  .regex(/^(icons\/[a-z0-9-]+|components|motion)\/[a-z0-9-]+$/);
export const formatSchema = z.enum(["svg", "jsx", "react", "css"]);
const hashSchema = z.string().regex(/^[a-f0-9]{64}$/);
const metadataSchema = z.object({
  id: resourceId,
  type: z.enum(["icon", "component", "motion"]),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  category: z.string().max(100),
  tags: z.array(z.string().max(100)).max(100),
  addedAt: z.iso.datetime(),
  collection: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  style: z.enum(["outline", "color"]).optional(),
  formats: z.array(formatSchema).min(1).max(4),
  license: z.string().max(100),
  licenseUrl: z.url(),
  url: z.url(),
});
export const resourceSchema = metadataSchema
  .extend({
    code: z.partialRecord(formatSchema, z.string().min(1).max(500_000)),
    usage: z.partialRecord(
      formatSchema,
      z.object({
        instructions: z.string().max(4000),
        dependencies: z.array(z.string().max(200)).max(20),
      }),
    ),
  })
  .refine(
    (item) =>
      item.formats.every((format) => item.code[format] && item.usage[format]),
    "Missing code or usage for a declared format",
  );
export const catalogSchema = z
  .object({
    schemaVersion: z.literal(1),
    version: hashSchema,
    resources: z.array(metadataSchema.extend({ hash: hashSchema })).max(50_000),
  })
  .refine(
    (data) =>
      new Set(data.resources.map((item) => item.id)).size ===
      data.resources.length,
    "Duplicate resource IDs",
  );
export const digest = (value) =>
  createHash("sha256").update(value).digest("hex");

async function readCached(path, schema, hash) {
  try {
    if ((await stat(path)).size > (hash ? 1_000_000 : 12_000_000))
      return undefined;
    const body = await readFile(path, "utf8");
    if (hash && digest(body) !== hash) return undefined;
    return schema.parse(JSON.parse(body));
  } catch (error) {
    if (
      error.code === "ENOENT" ||
      error instanceof SyntaxError ||
      error instanceof z.ZodError
    )
      return undefined;
    throw error;
  }
}

async function saveCached(path, body) {
  const temporary = `${path}.${randomUUID()}.tmp`;
  await writeFile(temporary, body, { mode: 0o600 });
  await rename(temporary, path);
}

async function download(url, limit, headers = {}) {
  const response = await fetch(url, {
    headers,
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
  if (response.status === 304) return { response };
  if (!response.ok)
    throw new Error(
      `Sempata catalog request failed (HTTP ${response.status}).`,
    );
  if (!response.headers.get("content-type")?.includes("application/json"))
    throw new Error("Sempata returned a non-JSON catalog response.");
  const chunks = [];
  let size = 0;
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > limit)
      throw new Error("Sempata catalog response exceeded its size limit.");
    chunks.push(chunk);
  }
  return { response, body: Buffer.concat(chunks).toString("utf8") };
}

export function createCatalogClient({
  url = "https://sempata.com/agents/",
  cacheDirectory = join(homedir(), ".cache", "sempata-mcp"),
  now = Date.now,
} = {}) {
  const base = new URL(url);
  if (
    base.protocol !== "https:" &&
    !(
      base.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)
    )
  )
    throw new Error(
      "The catalog URL must use HTTPS, or HTTP on localhost for development.",
    );
  if (base.username || base.password || base.search || base.hash)
    throw new Error(
      "The catalog URL cannot contain credentials, a query, or a fragment.",
    );
  if (!base.pathname.endsWith("/")) base.pathname += "/";
  const directory = join(cacheDirectory, digest(base.href));
  const indexPath = join(directory, "catalog.json");
  const cacheSchema = z.object({
    checkedAt: z.number().nonnegative(),
    etag: z.string().nullable(),
    data: catalogSchema,
  });
  let memory;
  let pending;

  async function loadCatalog(force) {
    await mkdir(directory, { recursive: true, mode: 0o700 });
    memory ??= await readCached(indexPath, cacheSchema);
    if (
      !force &&
      memory &&
      now() - memory.checkedAt >= 0 &&
      now() - memory.checkedAt < 3_600_000
    )
      return memory.data;
    const { response, body } = await download(
      new URL("catalog.json", base),
      10_000_000,
      memory?.etag ? { "If-None-Match": memory.etag } : {},
    );
    if (response.status === 304 && !memory)
      throw new Error("Received a cache response without a cached catalog.");
    memory = {
      checkedAt: now(),
      etag:
        response.status === 304
          ? memory.etag
          : // GET validators compare weakly; normalize the CDN tag for the origin.
            (response.headers.get("etag")?.replace(/^W\//, "") ?? null),
      data:
        response.status === 304
          ? memory.data
          : catalogSchema.parse(JSON.parse(body)),
    };
    await saveCached(indexPath, JSON.stringify(memory));
    return memory.data;
  }

  async function catalog(force = false) {
    if (pending) {
      const data = await pending;
      if (!force) return data;
    }
    pending = loadCatalog(force);
    try {
      return await pending;
    } finally {
      pending = undefined;
    }
  }

  async function resource(id) {
    resourceId.parse(id);
    let entry = (await catalog()).resources.find((item) => item.id === id);
    if (!entry)
      throw new Error(
        `Unknown Sempata resource: ${id}. Use search_resources first.`,
      );
    const path = join(directory, `${entry.hash}.json`);
    const cached = await readCached(path, resourceSchema, entry.hash);
    if (cached && cached.id === id) return cached;
    const { body } = await download(new URL(`${id}.json`, base), 1_000_000);
    const hash = digest(body);
    // A deploy can update an asset while the local index is still cached.
    if (hash !== entry.hash)
      entry = (await catalog(true)).resources.find((item) => item.id === id);
    if (!entry || hash !== entry.hash)
      throw new Error(
        "The Sempata catalog changed during the request. Retry after deployment finishes.",
      );
    const data = resourceSchema.parse(JSON.parse(body));
    if (data.id !== id)
      throw new Error("Sempata returned a different resource than requested.");
    await saveCached(join(directory, `${hash}.json`), body);
    return data;
  }

  return { catalog, resource };
}

export function searchResources(
  catalog,
  { query = "", type, collection, category, limit = 20, offset = 0 },
) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = catalog.resources.filter(
    (item) =>
      (!type || item.type === type) &&
      (!collection || item.collection === collection) &&
      (!category || item.category.toLowerCase() === category.toLowerCase()) &&
      words.every((word) =>
        `${item.id} ${item.name} ${item.description} ${item.category} ${item.tags.join(" ")} ${item.style ?? ""}`
          .toLowerCase()
          .includes(word),
      ),
  );
  return {
    version: catalog.version,
    total: matches.length,
    offset,
    nextOffset: offset + limit < matches.length ? offset + limit : null,
    results: matches
      .slice(offset, offset + limit)
      .map(({ hash, ...item }) => item),
  };
}
