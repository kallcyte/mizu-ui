---
"@mizu-ui/tokens": minor
"@mizu-ui/vue": minor
---

Breaking token rename: `brand` → `hub` across all color tokens.

All `--color-brand-*` CSS custom properties, `bg-brand-*`/`text-brand-*`/`border-brand-*` Tailwind utilities, `COLOR_BRAND_*` TypeScript constants, and Style Dictionary `color/brand/*` keys renamed to `hub` equivalents.

55 files updated. Migration: replace `brand` with `hub` in all token references.
Also removed Histoire storybook from @mizu-ui/vue dev dependencies.
