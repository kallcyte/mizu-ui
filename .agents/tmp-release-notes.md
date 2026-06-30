## v0.12.6 — MizuBadge

### Summary

New component: MizuBadge — a compact count or status indicator for notifications, statuses, and inline labels.

### New Components

| Component | Sub-components | Description |
|-----------|----------------|-------------|
| **MizuBadge** | 1 (standalone) | Compact indicator for notification counts, dot status, and text labels. Supports 6 color variants, 2 sizes, dot mode for presence indicators, count with max overflow formatting (e.g. 99+), showZero toggle, and absolute positioning relative to a parent element. |

### Component Details

**MizuBadge** — single SFC, no Reka UI primitive needed.

- Props: `variant`, `size`, `dot`, `count`, `max`, `showZero`, `position`
- Variants: primary, accent, success, warning, error, info (solid fill, inverse text)
- Sizes: sm (16px), md (20px)
- Dot mode: renders as a small circle (8px/10px)
- Count overflow: shows `{max}+` when count exceeds max (default 99)
- Positioning: top-right, top-left, bottom-right, bottom-left (absolute with transform centering)
- Accessibility: `role="status"`, `tabular-nums` for consistent digit width

### Documentation

- New MDX page: `src/content/docs/components/badge.mdx`
- New demo file: `src/components/docs/BadgeDemo.vue` (7 sections: Variants, Sizes, Dot Indicator, Count Overflow, Show Zero, Positioned on Avatar, Text Content)
- Added sidebar entry in `astro.config.mjs`
- Added homepage card in `src/components/home/ComponentsSection.astro`

### Changed

- Version bumped to 0.12.6 across all package.json files, Hero.astro, Typography.astro, BaseLayout.astro, starlight.css, and README.md

### Stats

- Files changed: 14 (3 new + 11 modified)
- Insertions: 682
- Package version: 0.12.5 → 0.12.6
- Component count: 139 exports
