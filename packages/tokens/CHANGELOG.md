# @mizu-ui/tokens

## 0.10.0

### Minor Changes

- 29c3ee5: Breaking token rename: `brand` → `hub` across all color tokens.

  All `--color-brand-*` CSS custom properties, `bg-brand-*`/`text-brand-*`/`border-brand-*` Tailwind utilities, `COLOR_BRAND_*` TypeScript constants, and Style Dictionary `color/brand/*` keys renamed to `hub` equivalents.

  55 files updated. Migration: replace `brand` with `hub` in all token references.
  Also removed Histoire storybook from @mizu-ui/vue dev dependencies.

## 0.9.5

### Patch Changes

- f8806a8: Mark Separator documentation as Ready. Full template rewrite: frontmatter, Demo, Anatomy, Size Specifications (5 sizes → 1-5px border widths), Color Specifications (7-color Mizu token table), Spacing Details (container margin table for orientation × position), Accessibility (decorative prop + ARIA patterns for list/toolbar/section-break), Token Mapping, Vue Component API with 11 props (added `as` and `ui` slot override), 1 slot, and 9 Example Usage snippets. 8 Implementation Notes covering default size, vertical height requirement, accessibility, label positioning, container spacing, compound variants, and comparison to `<hr>`. Demo already had 9 sections covering all use cases; no demo changes needed.

  Verified all 24 components still in sync: sidebar (`astro.config.mjs`), docs page (`src/content/docs/components/element/separator.mdx`), and homepage showcase (`src/components/home/ComponentShowcase.vue` does not include Separator since it's a primitive element wrapper).

  Components now Ready: 24/52 (up from 23). Element category is now 8/8 complete.

## 0.9.4

### Patch Changes

- 033027e: Mark Icon documentation as Ready. Full template rewrite: frontmatter, Demo, Anatomy, Size Specifications (8 sizes), Color Specifications (currentColor + customize callback), Accessibility (decorative vs semantic), Token Mapping, Vue Component API with 8 Example Usage snippets, and 8 Implementation Notes. Demo expanded from 4 to 6 sections adding Colors (5 semantic variants via Tailwind text classes) and Customize Callback (per-segment recolor via `:customize` prop).

  Verified all 23 components still in sync: sidebar (`astro.config.mjs`), docs page (`src/content/docs/components/element/icon.mdx`), and homepage showcase (`src/components/home/ComponentShowcase.vue` does not include Icon since it's a primitive element wrapper).

  Components now Ready: 23/52 (up from 22).

## 0.9.3

### Patch Changes

- d19b0f0: Mark Banner documentation as Ready. The docs page was already complete to the Mizu standard template from the 0.18.29 rewrite (frontmatter, Demo, Anatomy, Color Specifications, Transitions, Accessibility, Token Mapping, Vue Component API, Implementation Notes). Only the status badge needed flipping from Pending to Ready. Verified all 22 components still in sync: sidebar (`astro.config.mjs`), docs page (`src/content/docs/components/element/banner.mdx`), and homepage (`src/components/home/ComponentsSection.astro` if present).

  Components now Ready: 22/52 (up from 21).

## 0.9.2

### Patch Changes

- a35b9a4: Test the OIDC Trusted Publishing pipeline end-to-end. Verifies that the `release.yml` workflow can mint an npm OIDC token, authenticate as the Trusted Publisher attached to each package, and publish without a long-lived `NPM_TOKEN` secret.
