# Frontend skill 0.1.0 consumer evaluation

On 2026-10-14, two independent coding-agent runs received the same [Release desk brief](../examples/release-desk/BRIEF.md), React/Vite scaffold, dependency lockfile, and access to the published `@sempata/mcp@0.1.1` against Sempata's public catalog. One run read the installed Sempata frontend skill; the other was instructed not to read a Sempata skill. Neither received the other implementation or website application source.

Both ran under the same inherited coding-agent configuration. There was one run per condition, with no scoring rubric, model comparison, or repeated trials. The coordinating browser review was separate from the implementation runs. This is an integration check, not evidence that the skill reliably improves visual quality.

## What the implementations did

Both used verified `Copy` and `FileText` imports from `@sempata/icons-react/basic@0.4.0`, actual component source, and the Rise in CSS. Both produced a calm, warm-accent interface with a form, release preview, and selectable Markdown. They handled empty and malformed inputs, preserved a previous valid preview, marked edited drafts as stale, and disabled copying until the preview was current.

The skill run used the Raised capsule button with a terracotta palette and system typography. It read resource source and usage guidance before integration, preserved the motion CSS, and made source-level contrast corrections. Its seven validation and Markdown tests and production build passed.

The other run used the Prompt pill button with an amber palette. It removed type-only TypeScript syntax for the JavaScript scaffold and included asynchronous clipboard tests. Its eight tests and production build passed. It also tried an unnecessary guessed manifest URL, which returned 404; no code from that response was integrated.

The [published example](../examples/release-desk) follows the skill run. The coordinating change moved its clipboard write into the existing release module and added two tests for the exact awaited write and missing or denied clipboard support. The resulting example has nine passing tests. Its resource snapshots and notices remain available alongside the code.

## Defect found and fixed

The npm MCP schema offered `type: motion`, but the website catalog labeled all CSS motion as `component`. Both runs initially found zero motion results. Role-based searches without that filter located Rise in as `components/rise`, allowing both implementations to finish.

The website exporter now classifies CSS resources as `motion`, retaining the actual resource IDs and URLs. The exported metadata and asset hashes are checked together. A consumer check using the already-published MCP 0.1.1 against the corrected catalog found Rise in through the motion filter and retrieved its CSS and dependency-free usage guidance. MCP fixture checks also cover the filter and retrieval. No new npm runtime was needed.

Existing MCP clients can retain a cached catalog until their documented one-hour refresh. A fresh consumer cache observes the corrected catalog immediately.

## Coordinating checks and limits

The browser review of both original implementations confirmed three errors and focus on Project name for an empty form; successful Markdown generation; native clipboard success feedback; visible stale-draft messaging; preserved Markdown and disabled copying after an invalid version; and a visible keyboard focus outline on Copy Markdown.

Both were rendered inside a same-origin 390px iframe because the connected browser's desktop viewport could not be reduced to a true mobile-device viewport. Rendered client width and scroll width matched, including after generating a preview, so there was no horizontal overflow in that check. This does not establish behavior on a real mobile browser or touch device.

Clipboard success was observed through the resolved browser write and its UI feedback; the system clipboard contents were not independently read back. Rejection is tested with the actual copy helper and an unavailable or rejecting clipboard object. The browser's clipboard permission and reduced-motion preference were not overridden. Motion rules were preserved, but a live reduced-motion preference, screen reader, Safari, Firefox, and cross-agent behavior were not tested.

Source review confirms coherent resource choices and working integrations. One matched pair cannot establish a causal visual-quality improvement or support a blanket “anti-slop” guarantee. Future evaluations should use additional real briefs and independently repeat the same integration and browser checks.
