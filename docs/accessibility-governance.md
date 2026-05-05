# Accessibility Governance

UI IP Toolkit is a static visual prototyping vault, not a production UI framework. Even so, the public catalog should model responsible web standards because users copy snippets directly from it.

## Source Of Truth

- W3C WAI and WCAG 2.2: normative criteria for accessible interfaces.
- WAI-ARIA Authoring Practices Guide: expected behavior for complex widgets.
- MDN Accessibility and ARIA docs: practical HTML, ARIA and browser behavior references.
- WebAIM Contrast Checker: contrast verification for text and UI states.
- axe-core / Playwright accessibility testing: automated checks for rendered DOM.
- Inclusive Components, GOV.UK Design System and U.S. Web Design System: practical component references.

Core rule: semantic HTML first, ARIA only where native HTML does not expose the needed relationship, and custom JavaScript only when the native platform cannot handle the interaction.

The implementation rule is accessibility by default. New catalog cards and generated snippets are normalized at creation time so they ship with names, relationships and semantic states already present. Legacy cards are upgraded in small frame-budgeted batches, and copy actions normalize the snippet again before writing to the clipboard. This avoids a whack-a-mole model where individual defects are patched after the fact.

## Refactor Applied

The current accessibility pass addresses the community feedback directly:

- Landmarks: `header`, named `nav`, `main`, `footer` and a skip link are now present.
- Headings: section titles are promoted to `h2`; card titles are normalized to `h3`; legacy `h4` headings are repaired at runtime.
- Form controls: `input`, `select` and `textarea` demos receive labels or computed accessible names. Password demos use a form, username context and autocomplete.
- Focus: visible focus uses `outline` and `box-shadow`, avoiding border-width changes that cause layout shifts.
- Contrast: secondary copy, pagination status, metadata, menu numbers and notes have stronger contrast and slightly larger text.
- Motion: `prefers-reduced-motion` disables decorative motion and the custom cursor is removed for coarse pointers.
- Loaders: copied loader snippets are wrapped in `role="status"` with polite live-region behavior.
- Dialogs: generated modal snippets use native `<dialog>` with `aria-labelledby` and `method="dialog"` actions.
- Tables: generated data snippets use real `<table>`, `caption`, `thead`, `tbody`, `th`, `td`, `scope="col"` and `scope="row"`.
- Copy feedback: copy actions update a screen-reader-only live region.
- Navigation: the 64-section catalog is exposed through a compact, keyboard-friendly dropdown menu.
- Snippet generation: new copyable cards are normalized before they enter the DOM, including labels, fieldsets, switch semantics, status/progress semantics, table captions and controlled search regions.
- No-JS baseline: a `<noscript>` fallback exposes the repository, sitemap and primary catalog routes for users and crawlers when JavaScript is unavailable.
- Observability: Vercel Analytics and Speed Insights are loaded from external deferred code in production only, avoiding inline CSP hashes and keeping the local development console clean.

## Definition Of Done

A copied pattern or site change is not considered complete until it satisfies these checks:

1. Semantics
   - Native elements are preferred over ARIA roles.
   - Controls have a programmatic name.
   - Sections have an accessible label.
   - Tables use table semantics when presenting data.
   - Radio-like option sets use `fieldset` and `legend`.
   - Switches are keyboard focusable and expose `role="switch"` plus `aria-checked`.
   - Rendered preview cards do not create extra page-level landmarks.

2. Keyboard
   - Interactive controls are reachable with Tab.
   - Focus is visible.
   - Focus styling does not change layout geometry.
   - Escape closes native dialogs and menus where applicable.

3. Visual Accessibility
   - Text and UI states aim for WCAG AA contrast.
   - Microcopy stays readable on dark surfaces.
   - States are not communicated by color alone.
   - Text scales without fixed viewport font sizing.

4. Motion And Feedback
   - Reduced motion is respected.
   - Loading, success and error states have live-region semantics when needed.
   - Skeletons and loaders use `role="status"` when they communicate state.
   - Determinate progress uses `role="progressbar"` with value metadata.
   - Decorative icons and animations are hidden from assistive tech.

5. Testing
   - `npm run check` passes.
   - `npm run test:a11y` passes for the rendered catalog.
   - No-JS fallback test passes.
   - Generated snippets are normalized before copy.
   - Browser QA has no console errors.
   - Desktop and mobile have no horizontal overflow.
   - Manual keyboard review covers menu, copy buttons, form demos and audio control.
   - Playwright + axe-core remains active in CI for serious/critical regressions.

## Current Check Commands

```bash
npm run check
```

This runs:

- `node --check assets/app.js`
- `vercel.json` parsing
- `scripts/accessibility-smoke.mjs`

Run rendered accessibility checks:

```bash
npm run test:a11y
```

The smoke check is intentionally dependency-free so it does not increase runtime payload or deployment risk. The Playwright + axe-core test suite runs as development tooling only; it does not ship to the public page.

## Known Scope

This pass improves the public catalog and the snippets generated by the current static implementation. It does not claim every decorative snippet is a finished production component. The project remains a fast visual library for prototyping and learning, with copy-ready examples that now push users toward better semantics.
