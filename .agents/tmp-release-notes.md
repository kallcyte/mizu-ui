## v0.12.10 — New component: MizuScrollArea

Custom-styled scroll container with themed scrollbars, built on Reka UI ScrollArea.

### Added

**`MizuScrollArea`** — compound component with 5 sub-components:
- **`MizuScrollAreaRoot`** — container managing overflow and scrollbar visibility
- **`MizuScrollAreaViewport`** — the scrollable content region
- **`MizuScrollAreaScrollbar`** — track for vertical or horizontal scrollbar
- **`MizuScrollAreaThumb`** — draggable thumb inside the scrollbar
- **`MizuScrollAreaCorner`** — fills the corner when both scrollbars are present

| Feature | Details |
|---------|--------|
| Visibility modes | `auto` / `always` / `scroll` / `hover` / `glimpse` |
| Direction | vertical, horizontal, or both (with corner) |
| Sizing | `maxHeight` and `maxWidth` props (string or number) |
| Thumb | 6px themed (`foreground-tertiary` → `foreground-secondary` on hover) |
| Touch target | 44 × 44px via `::before` pseudo-element (WCAG 2.5.8) |
| Track | 10px, picks up `surface-muted` when visible |

### Documentation

- New MDX page: `scroll-area.mdx`
- New demo: `ScrollAreaDemo.vue` (4 sections: Vertical, Horizontal, Both Directions, Always Visible)

### Stats

- Files changed: 18
- Insertions: +544
- Deletions: -7
- Package: `@mizu/vue@0.12.10`
