---
name: mizu-skill
description: A skill for assisting the development of Mizu Design System that basically a do's and don'ts list
disable-model-invocation: false
---

## Do's

1. This project follows semantic versioning (SemVer) during pre-1.0 development.
2. Only commit, push, and release to the repo if requested explicitly.
3. This skill can be updated in the future. Any suggestions for this skill may be considered.
4. After finalizing a new component, update the component documentation under `src/content/docs/components/{name}.mdx` to follow the structure below and add the component card to homepage.
5. Component documentation under `src/content/docs/components/{name}.mdx` MUST follow the structure below.
6. Create a new changelog entry before doing commit.
7. **Always rebuild `@mizu/vue` after adding or modifying components** — run `pnpm --filter @mizu/vue build`. Astro SSR resolves `@mizu/vue` to the built `dist/` files (not the source `src/` files), so stale dist means new components render as `undefined` and pages crash with "Unable to render ... because it contains an undefined Component!"
8. Always update version number on homepage, navigation bar, and starlight navigation bar.
9. **Demo components must prevent Starlight CSS bleed** — add `all: revert` on the root element AND add `margin-top: 0` to `.demo-section` and `.demo-section > *` in scoped styles. This prevents the Starlight rule `.sl-markdown-content :not(...) + :not(...) { margin-top: var(--sl-content-gap-y) }` from adding unwanted spacing inside demos.

## Don'ts

1. Don't assume to push updates or changes to repo automatically
2. Don't add components to `src/components/home/` (legacy) — put new component demos under `src/components/docs/{Name}Demo.vue`
3. Don't let Starlight CSS bleed into demo sections — the rule `.sl-markdown-content :not(a, strong, em, del, span, input, code, br) + :not(a, strong, em, del, span, input, code, br, :where(.not-content *))` adds unwanted `margin-top` to elements inside demos. Demo components must reset this.
4. Don't create a new component without my command. A new component should only be created when I specifically request it.

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
