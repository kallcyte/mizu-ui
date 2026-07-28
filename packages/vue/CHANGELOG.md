# @mizu-ui/vue

## 0.19.0

### Minor Changes

- 29c3ee5: Breaking token rename: `brand` → `hub` across all color tokens.

  All `--color-brand-*` CSS custom properties, `bg-brand-*`/`text-brand-*`/`border-brand-*` Tailwind utilities, `COLOR_BRAND_*` TypeScript constants, and Style Dictionary `color/brand/*` keys renamed to `hub` equivalents.

  55 files updated. Migration: replace `brand` with `hub` in all token references.
  Also removed Histoire storybook from @mizu-ui/vue dev dependencies.

### Patch Changes

- 3b7c8e3: Mark Popover documentation as Ready. Fix fake v3 API and add full demo.

  Fixed:
  - Removed non-existent `title`, `description`, `modelValue`, `disabled`, `forceMount` props from docs. Popover v4 has none of these — replaced with correct `mode`, `open`, `modal`, `dismissible`, `arrow`, `content`, `openDelay`, `closeDelay`, `enableTouch`, `reference`, `ui`.

  Documentation:
  - Full template rewrite: popover.mdx with Demo, Anatomy (4-part), Variants (Click + Hover mode tables), Color/Spacing, Accessibility, Token Mapping, Vue Component API (13 props, 3 slots, 2 emits, 3 usage snippets), 8 Implementation Notes
  - Demo expanded from 1 to 10 sections: Basic, Hover Mode, Content Positioning, Arrow, Modal, Non-Dismissible, Control Open State, With Command Palette, Following Cursor, Anchor Slot
  - Added `#content="{ close }"` slot prop to non-dismissible example

  docs-plan.md: Overlay now lists all 8 components (4 Ready, 4 Pending). Added missing DropdownMenu and updated total to 56 components.

- e697c73: Mark Tooltip documentation as Ready.

  Documentation:
  - Full template rewrite: tooltip.mdx with Demo, Anatomy, Variants (4 behavioral toggles), Size/Color/Spacing, Accessibility (keyboard + ARIA), Token Mapping (4 CSS vars), Vue Component API (13 props, 2 slots, 1 emit, 3 usage snippets using v4 `content`/`side` API), 7 Implementation Notes
  - Demo expanded from 2 to 8 sections: Basic, With Kbds, Delay Duration, Content Positioning (v4 API replacing broken v3 `:popper`), Arrow, Disabled, Control Open State, Following Cursor — all use Nuxt UI v4 `:content="{ side: '...' }"` API

  docs-plan.md: Overlay 5→6 components, total 50→54 comps (27 Ready/27 Pending)

- Updated dependencies [29c3ee5]
  - @mizu-ui/tokens@0.10.0

## 0.18.36

### Patch Changes

- 3e6ebf9: Fix Modal theme bugs and mark docs as Ready.

  Theme fixes:
  - overlay z-index: added `z-40` overlay / `z-50` content in modal theme slots
  - fullscreen content: Nuxt UI v4 bug (missing `fixed` on `inset-0`) — content collapsed to 0x0 without it. Fixed with `fixed inset-0 z-50 rounded-none` variant override
  - footer alignment: buttons now default to `justify-end` (right-aligned)
  - overlay opacity: changed from `bg-elevated/75` (75%) to `bg-black/25` (25%)

  Documentation:
  - Full template rewrite: modal.mdx with Demo, Anatomy, Variants, Size/Color/Spacing, Accessibility, Token Mapping, Vue Component API (15 props, 9 slots, 6 emits), 8 Implementation Notes
  - Demo expanded from 3 to 7 sections: Basic, With Description, Fullscreen, Scrollable (20 items), Non-Dismissible, Nested, Footer Slot — all follow Nuxt UI trigger-in-default-slot pattern
  - Marked Ready (green badge). Overlay: 4→5 components, total: 24→25 Ready

- f8806a8: Mark Separator documentation as Ready. Full template rewrite: frontmatter, Demo, Anatomy, Size Specifications (5 sizes → 1-5px border widths), Color Specifications (7-color Mizu token table), Spacing Details (container margin table for orientation × position), Accessibility (decorative prop + ARIA patterns for list/toolbar/section-break), Token Mapping, Vue Component API with 11 props (added `as` and `ui` slot override), 1 slot, and 9 Example Usage snippets. 8 Implementation Notes covering default size, vertical height requirement, accessibility, label positioning, container spacing, compound variants, and comparison to `<hr>`. Demo already had 9 sections covering all use cases; no demo changes needed.

  Verified all 24 components still in sync: sidebar (`astro.config.mjs`), docs page (`src/content/docs/components/element/separator.mdx`), and homepage showcase (`src/components/home/ComponentShowcase.vue` does not include Separator since it's a primitive element wrapper).

  Components now Ready: 24/52 (up from 23). Element category is now 8/8 complete.

- Updated dependencies [f8806a8]
  - @mizu-ui/tokens@0.9.5

## 0.18.35

### Patch Changes

- 033027e: Mark Icon documentation as Ready. Full template rewrite: frontmatter, Demo, Anatomy, Size Specifications (8 sizes), Color Specifications (currentColor + customize callback), Accessibility (decorative vs semantic), Token Mapping, Vue Component API with 8 Example Usage snippets, and 8 Implementation Notes. Demo expanded from 4 to 6 sections adding Colors (5 semantic variants via Tailwind text classes) and Customize Callback (per-segment recolor via `:customize` prop).

  Verified all 23 components still in sync: sidebar (`astro.config.mjs`), docs page (`src/content/docs/components/element/icon.mdx`), and homepage showcase (`src/components/home/ComponentShowcase.vue` does not include Icon since it's a primitive element wrapper).

  Components now Ready: 23/52 (up from 22).

- Updated dependencies [033027e]
  - @mizu-ui/tokens@0.9.4

## 0.18.34

### Patch Changes

- d19b0f0: Mark Banner documentation as Ready. The docs page was already complete to the Mizu standard template from the 0.18.29 rewrite (frontmatter, Demo, Anatomy, Color Specifications, Transitions, Accessibility, Token Mapping, Vue Component API, Implementation Notes). Only the status badge needed flipping from Pending to Ready. Verified all 22 components still in sync: sidebar (`astro.config.mjs`), docs page (`src/content/docs/components/element/banner.mdx`), and homepage (`src/components/home/ComponentsSection.astro` if present).

  Components now Ready: 22/52 (up from 21).

- Updated dependencies [d19b0f0]
  - @mizu-ui/tokens@0.9.3

## 0.18.33

### Patch Changes

- a35b9a4: Test the OIDC Trusted Publishing pipeline end-to-end. Verifies that the `release.yml` workflow can mint an npm OIDC token, authenticate as the Trusted Publisher attached to each package, and publish without a long-lived `NPM_TOKEN` secret.
- Updated dependencies [a35b9a4]
  - @mizu-ui/tokens@0.9.2
