## v0.12.9 — New component: MizuToggleGroup

Segmented control for single and multiple selection, built on Reka UI ToggleGroup.

### Added

**`MizuToggleGroup`** — compound component with 2 sub-components:
- **`MizuToggleGroupRoot`** — container managing active state and selection mode
- **`MizuToggleGroupItem`** — individual toggle button with on/off state

| Feature | Details |
|---------|--------|
| Selection modes | `single` (radio-style) and `multiple` (checkbox-style) |
| Sizes | `sm` / `md` / `lg` via `data-size` attribute |
| Visual style | Segmented control with `surface-muted` container, elevated active items |
| Accessibility | Keyboard navigation, `focus-visible` ring, `aria-pressed` |

### Documentation

- New MDX page: `toggle-group.mdx`
- New demo: `ToggleGroupDemo.vue` (5 sections: Single, Multiple, Sizes, Disabled)

### Changes

- Removed Skeleton from homepage card grid (deferred in v0.12.8)

### Stats

- Files changed: 16
- Insertions: +452
- Deletions: -44
- Package: `@mizu/vue@0.12.9`
