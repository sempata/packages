---
name: sempata-frontend
description: Build or refine web interfaces and product videos using Sempata icons, UI components, CSS motion, and editable video templates. Use when a user asks to build with Sempata or wants a distinctive frontend using its resource library.
license: MIT
metadata:
  version: "0.2.0"
---

# Sempata frontend

Build an interface with a coherent visual direction and resource code that fits the user's project. Sempata is a toolkit of icons, UI components, motion, and editable video templates, not a replacement for the project's framework or design system.

## Choose a direction

Read the brief and the existing frontend before selecting resources. Identify the audience, main interaction, stack, and established brand. For a redesign, preserve working navigation, content, and behavior unless the user requests a change.

Describe the intended typography, palette, spacing, icon style, and purpose of motion briefly. Choose a direction appropriate to the product: a restrained developer tool and a playful portfolio need different decisions. Use one consistent icon family within each UI context and adapt components to the existing design. Avoid adding decorative motion or extra sections without a purpose.

## Find actual resources

Use the configured Sempata MCP tools:

- `search_resources` searches by description, type, collection, and category. Search for the intended role, such as a navigation icon, a CTA button, a carousel, or an entrance effect.
- `get_resource` returns source for an ID found in search. Use an offered format compatible with the project.
- `get_usage` returns examples, dependencies, and license information. Read it before integrating the selected resource.

When MCP is not configured, the same public resources can be discovered through [Sempata's agent guide](https://sempata.com/llms.txt) and [static catalog](https://sempata.com/agents/catalog.json). Follow the catalog's actual resource URLs instead of guessing IDs or scraping preview images for code. The [packages guide](https://sempata.com/packages) explains MCP setup and React installation.

The public MCP catalog contains free resources. Premium assets require the website's authenticated paid access. Do not infer entitlement from a preview or copy protected assets into a public export.

## Integrate selected code

Use the project's existing framework and component conventions. Install only dependencies needed by the selected resource and permitted by the user's task. `@sempata/icons-react` currently requires React 19. Use package imports only when the catalog verifies the icon is published; SVG and inline JSX are available for other public icons.

Adapt size, color, spacing, and motion parameters to the visual direction. Check both the CSS and its example markup: class names, component props, and dependencies must match the actual code. Preserve license notices, meaningful accessible labels, keyboard controls, focus states, and reduced-motion behavior. Keep basic controls familiar and readable while using character in the parts that benefit from it.

## Motion and product videos

Find named effects in [the motion library](https://sempata.com/motion). CSS usage includes example markup; adapt HTML class and style attributes to JSX when using React. Preserve the reduced-motion state. Use the exact resource ID returned by search even when its namespace differs from its type.

For a product video, search MCP with `query: "video"` and `type: "component"`, or browse [video templates](https://sempata.com/video). MCP returns a React player for the rendered sample and usage links to the complete editable fframes project. A player does not render a customized video.

Read the source project's README before building. Replace the fictional Atlas copy, logo, and screenshot in the selected JSON and media directory. Run its validation and frame inspection, render locally, and review the actual result before sharing. Keep the template MIT and font OFL notices. If the rendering toolchain is unavailable, report the limit and supply the editable source rather than claiming a successful render.

## Check the implemented interface

Review the real page at desktop and mobile sizes using the available browser tools. Check the primary interaction, readable hierarchy, consistent styling, overflow, focus order, and motion preferences. Test applicable loading, empty, and error states. Correct demonstrated problems without adding a second implementation or unrelated features.

Report which Sempata resources were used, required dependencies, and what was actually verified. If a browser check is unavailable, state that limit instead of claiming visual verification.

## Useful starting briefs

- A developer tool: use one outline icon family for controls and a quiet motion pattern for a meaningful state change. Keep forms readable and report validation next to the affected field.
- A product CTA: find a button and a matching icon, adapt their palette to the brand, and verify hover, focus, and reduced motion.
- A portfolio gallery: search for a carousel, preserve keyboard navigation and image descriptions, and review narrow-screen layout.

Use [sempata.com](https://sempata.com) for live previews, [the frontend skill guide](https://sempata.com/guides/sempata-frontend) for setup, [prompt recipes](https://sempata.com/recipes) for concrete starting points, and [the licensing terms](https://sempata.com/terms) for resource usage. The [Release desk example](https://github.com/sempata/packages/tree/main/examples/release-desk) shows a standalone React consumer project.

This skill is MIT licensed, copyright (c) 2026 Sempata. Preserve the copyright and permission notice in [LICENSE.txt](LICENSE.txt) when distributing it. Source and releases are maintained in [sempata/packages](https://github.com/sempata/packages/tree/main/skills/sempata-frontend).
