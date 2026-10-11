# Engineering preferences

- Target the current product flow. Do not add legacy compatibility branches,
  dual reads/writes, deprecated fallbacks, or a second runtime unless requested.
- When replacing a system or persisted model, migrate every caller and required
  data, then delete the old runtime path in the same change.
- Remove obsolete code only after confirming it has no active callers.
- Preserve validation, authorization, security, accessibility, and data protection.

## Design preferences

- Do not use eyebrows: decorative short labels above page, section, or card
  headings, including kickers and overlines. Start with the actual heading and
  put supporting context below it.
- Keep functional badges, form labels, breadcrumbs, and accessibility labels.
  Apply this preference to every Sempata page and future design change.

## Icon creation

Create Basic icons directly as SVG geometry, matching the existing
24px grid, outline weight, and rounded caps and joins. Preserve customizable
color and stroke width. Add English metadata and the actual UTC addition time,
bump the collection version, and run the catalog/export checks in step 7 below.

For every new icon in other Sempata collections, use this workflow unless the user explicitly
requests a different method:

1. Read the target collection and `assets/<collection>/generation.json`. Inspect
   its reference and existing icons to match the art style and palette.
2. Generate each icon separately with the built-in `image_gen` tool first.
   Request a transparent background, a complete silhouette with clear margins,
   and simple shapes suitable for vector tracing. Do not substitute hand-written
   SVG, CSS, or an embedded bitmap for the generated design.
3. Inspect each image. Save the selected original PNG at
   `fe/public/images/<collection>/<id>.png`. Record its prompt, reference, palette,
   and source path in `assets/<collection>/generation.json`.
4. Convert the PNG to actual vector paths with
   `python3 scripts/vectorize-icons.py <collection> <id> [<id> ...]`.
   Its Python dependencies are listed in `scripts/requirements-icons.txt`.
   Preserve intentional opaque white shapes and transparency outside the icon.
   The output uses a `0 0 24 24` viewBox and lives in
   `assets/<collection>/vectors/<id>.svg`.
5. Render and inspect the SVG on a white background at large and UI sizes. Check
   silhouette, palette, margins, black outlines, and seams before publishing.
6. Copy the traced paths into the existing collection catalog with a unique ID,
   English name, category, search tags, and the actual UTC `addedAt`. Preserve
   existing icons and their timestamps. Bump the collection version.
7. Update affected catalog assertions, run `npm --prefix fe run icons:export`
   and `npm --prefix fe test`, and check the gallery, detail page, SVG/JSX export,
   homepage newest row, and counts. These surfaces use the shared catalog.

The project SessionStart hook reloads these instructions after startup, resume,
and compaction. Codex requires new hook definitions to be reviewed and trusted
through `/hooks`; the instructions in this file also apply directly.
