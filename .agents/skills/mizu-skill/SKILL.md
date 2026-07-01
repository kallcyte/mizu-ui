---
name: mizu-skill
description: A skill for assisting the development of Mizu Design System that basically a do's and don'ts list
disable-model-invocation: false
---

## Development

1. This project follows semantic versioning (SemVer) during pre-1.0 development.
2. **Always rebuild `@mizu/vue` after adding or modifying components** — run `pnpm --filter @mizu/vue build`. If the dist is stale, new components render as `undefined` and pages crash.
3. **The `packages/vue/src/index.ts` is auto-generated** by `packages/vue/scripts/generate-index.mjs`. It runs automatically before `vite build` in the `@mizu/vue` build pipeline. Just add `.vue` files to `packages/vue/src/components/` and run `pnpm --filter @mizu/vue build` — the exports are generated for you.
4. **Demo components must prevent Starlight CSS bleed** — every demo component must include this `<style scoped>` block (adapting the outer wrapper class name as needed):

```vue
<style scoped>
.your-demo { all: revert; }

.your-demo .demo-section {
  margin-top: 0;
}

.your-demo .demo-section > * {
  margin-top: 0;
}

.your-demo .demo-section h3 {
  all: revert;
}
</style>
```

This resets Starlight's `.sl-markdown-content :not(...) + :not(...)` rule which adds unwanted `margin-top` to elements inside demos.

5. When you find gaps or missing conventions in this skill, flag them at the end of the session.

## Documentation

6. After finalizing a new component, **always** complete all three of these documentation steps in the same batch — no exceptions:
   - Create component documentation at `src/content/docs/components/{name}.mdx` following the structure below.
   - Add a component card to `src/components/home/ComponentsSection.astro` inside `<div class="comp-grid">`. Use this template:

```html
<a href="/components/{slug}" class="block p-6 rounded-xl border transition-all duration-200 card-hover border-surface-muted bg-surface-base no-underline group hover:border-brand-accent/30 hover:shadow-[0_0_0_1px_var(--color-brand-accent)]">
  <h4 class="text-[16px] font-semibold mb-1 group-hover:text-brand-accent transition-colors">{DisplayName}</h4>
  <p class="text-sm text-foreground-secondary">{One-line description}.</p>
</a>
```

   - Add the component to the Starlight sidebar under the "Components" group in `astro.config.mjs`.
   - Verify all three stay in sync: sidebar entries, homepage cards, and docs pages. Compare the sidebar component list in `astro.config.mjs` against `src/components/home/ComponentsSection.astro` and `src/content/docs/components/` after every batch.
7. Before documenting a new component, run `pnpm --filter @mizu/vue build` to regenerate `packages/vue/src/index.ts`, then verify every exported component has a corresponding sidebar entry (`astro.config.mjs`), docs page (`src/content/docs/components/`), and homepage card (`src/components/home/ComponentsSection.astro`). The three must always be in sync — a missing homepage card is a documentation bug.
8. Create a new changelog entry in `src/content/docs/getting-started/changelog.mdx` before committing.
9. **Bump the patch version** (e.g., `0.12.0` → `0.12.1`) in `packages/vue/package.json` and `package.json` (root) after adding a new component.
10. After a version bump, update the version number in:
    - `packages/vue/package.json` (the canonical source of truth)
    - `package.json` (root, keep in sync)
    - `src/components/home/Hero.astro` — search for `Design System · v0.`
    - `src/components/home/Typography.astro` — search for `Design System · v0.`
    - `src/layouts/BaseLayout.astro` — search for `inline-block px-2.5` (nav badge)
    - `src/styles/starlight.css` — search for `content: "v0.` (Starlight nav badge)
    - `README.md` — search for `version-` (shields.io badge)

    Use grep to find the exact version strings rather than relying on line numbers.

## Release

11. Only commit, push, and release to the repo if requested explicitly.
12. The release workflow at `.github/workflows/release.yml` triggers on push to `master` and auto-creates a GitHub Release via `gh release create ... --generate-notes`. Since `--generate-notes` only lists commit titles, **always create the release manually with detailed notes:**

```bash
gh auth login  # if not already authenticated
gh release delete v{VERSION} --yes || true  # remove auto-generated release; no-op if it doesn't exist
gh release create v{VERSION} \
  --title "v{VERSION} — {Release Title}" \
  --notes-file /tmp/release-notes.md
```

**Release notes must include:**
1. One-line summary of the release
2. Table or list of new components with sub-component count and description
3. Enhanced/changed components with specific prop/API changes
4. Documentation changes (new MDX pages, demo sections)
5. Stats (files changed, insertions, package version)

**Changelog entry before release:**
- All changes go into a single version entry in `src/content/docs/getting-started/changelog.mdx`
- Do NOT create phantom version entries (e.g. 0.8.0, 0.9.0) for work that was committed together — consolidate into the actual released version
- Verify the changelog includes ALL components in the release (check `packages/vue/src/index.ts` exports)

13. **Every GitHub Release must have detailed release notes** — the release notes must mirror the changelog entry in `src/content/docs/getting-started/changelog.mdx`. Never create a release with only auto-generated commit titles. If a changelog entry exists for the version, the GitHub Release must include at minimum: one-line summary, new components list, changes list, and documentation changes. Verify the release notes match the changelog before finalizing.

## Don'ts

1. Don't assume to push updates or changes to repo automatically.
2. Don't create a new component without my command. A new component should only be created when I specifically request it.
3. Don't add components to `src/components/home/` (legacy) — put new component demos under `src/components/docs/{Name}Demo.vue`.
4. Don't edit `packages/vue/src/index.ts` directly — it's auto-generated by `packages/vue/scripts/generate-index.mjs`. Add new `.vue` files to `packages/vue/src/components/` and run `pnpm --filter @mizu/vue build`.

## Component Documentation Structure

Every `src/content/docs/components/{name}.mdx` must use this skeleton. Sections marked **(if applicable)** are only included when the component has the relevant property; component-specific sections (e.g. Status Tags, Focus Ring, Composition) slot in where appropriate.

### 1. Frontmatter

```yaml
---
title: ComponentName
description: One-sentence description (<= 80 chars), used in the page meta and TOC preview.
---
```

### 2. Imports

```mdx
import {Name}Demo from '../../../components/docs/{Name}Demo.vue';
```

The demo component lives at `src/components/docs/{Name}Demo.vue` (PascalCase) and is mounted with `client:load`.

### 3. Intro paragraph

One sentence explaining what the component is and when to use it. No heading.

### 4. Demo

`## Demo` → `<{Name}Demo client:load />`

### 5. Anatomy

`## Anatomy` → short prose ("A {component} consists of up to N parts:") + a table:

| Part | Required | Description |
|------|----------|-------------|
| ... | Yes/No | ... |

### 6. Variants **or** Composition

- Single-element components: `## Variants` → table of variants with Container / Border / Use Case columns, then a `### {Variant} {Component}` subsection per variant with `Container:`, `Label:`, `Icon:` lines naming the tokens.
- Compound components: `## Composition` → ASCII tree of the part hierarchy, followed by sections per sub-component (e.g. Card has `## CardImage`, etc.).

### 7. Size Specifications (if applicable)

`## Size Specifications` → tables for height, padding, icon dimensions, touch targets. Reference `font-size-*` and `duration-fast` tokens.

### 8. Typography (if applicable)

`## Typography` → table mapping size → font-size / weight / line-height / letter-spacing, all token-based.

### 9. Shape (if applicable)

`## Shape` → border radius, border width, etc. — short table.

### 10. Color Specifications

`## Color Specifications` → sub-sections per concern: state map (Enabled / Hovered / Focused / Pressed / Disabled), feedback variants, loading state, etc. Always reference Mizu tokens by name (`brand-primary-hover`, `feedback-success-subtle`, etc.), not hex, but include the hex value in parentheses for cross-reference.

### 11. Spacing Details (if applicable)

`## Spacing Details` → ASCII box-drawing layout diagram + spacing table (horizontal/vertical padding, internal gaps).

### 12. Transitions (if applicable)

`## Transitions` → table of property / duration / easing. Use `duration-fast` / `duration-normal` tokens.

### 13. Component-specific sections (optional, in order)

Insert any of these between Transitions and Accessibility when relevant:
- `## Focus Ring` — when the component has a custom focus ring spec.
- `## Status Tags` — variant-to-workflow-status mapping table (tags, badges).
- `## Visual Sections` — per-section background / separator spec (cards).
- `## Loading State` — spinner size, label behavior, cursor.
- `## Touch Target` — minimum interactive area (WCAG 2.5.8 = 44×44).

### 14. Accessibility

`## Accessibility` → `### Requirements` table (criterion / implementation) + `### ARIA Attributes` with a minimal HTML/ARIA snippet.

### 15. Token Mapping

`## Token Mapping` → `### CSS Custom Properties` table with columns: Token | Value | Usage. List only the tokens this component actually consumes.

### 16. Vue Component API

`## Vue Component API` → tables for **Props** (one per root component; `### Card* Props` for compound components), **Slots**, **Events** (if any), then `### Example Usage` with a fenced ` ```vue ` block covering all variants/props. **Use `Mizu*` component names in examples** (not the legacy `Mizunagi*` prefix).

### 17. Implementation Notes

`## Implementation Notes` → numbered list of the technical decisions a consumer or maintainer needs to know (e.g. native element choice, CSS-var binding, Tailwind v4 `@apply`/`@reference` pattern, class inheritance via `useAttrs()`, tree-shakeable export). One line per item.

### Conventions

- **Section heading levels**: `##` for top-level sections (drives Starlight's auto-generated right-sidebar TOC). `###` for per-variant / per-state subsections. Never use `h1` (the page title comes from frontmatter).
- **Token references**: use the kebab-case token path with `--color-` / `--font-` / `--spacing-` / `--radius-` / `--duration-` prefix (the canonical name, not the legacy `--bp-*` prefix). When showing the resolved value, put the hex in parentheses: `brand-primary` (#001C44).
- **Tables** for any tabular data (variants, sizes, state maps, props, slots, events, tokens). Avoid prose lists.
- **No emojis** in tables, headings, or code blocks.
- **Example blocks** fence with ` ```vue ` for component examples and ` ```html ` for raw ARIA/HTML snippets.
- **Demo components** must be self-contained and only depend on the published `@mizu/vue` import (no internal src paths).
