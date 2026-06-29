## v0.12.3 — Collapsible & Popover

Batch 2b supporting components: MizuCollapsible and MizuPopover added.

### New Components

| Component | Sub-components | Description |
|-----------|---------------|-------------|
| **MizuCollapsible** | Root, Trigger, Content | Toggleable content panel with chevron rotation animation. Supports `open` (v-model:open), `defaultOpen`, `disabled`. |
| **MizuPopover** | Root, Trigger, Portal, Content, Arrow, Close, Anchor | Floating popup anchored to a trigger element. Supports `open` (v-model:open), `defaultOpen`, `modal`, `side`, `align`, `sideOffset`, `alignOffset`, `avoidCollisions`, and direction-aware animations. |

### Fixes

- **MizuTooltip** — fixed dark/light mode visibility. Tooltip variants now use fixed hex colors (`#1B1B1D` / `#F1F5F9`) instead of theme tokens so text is always readable regardless of page theme.

### Documentation

- New MDX pages: `collapsible.mdx`, `popover.mdx`
- New demo files: `CollapsibleDemo.vue`, `PopoverDemo.vue`
- Added **Collapsible vs Accordion** comparison tables to both `collapsible.mdx` and `accordion.mdx`
- Changelog entries for v0.12.2 and v0.12.3

### Stats

- 29 files changed, +3285 / -423 lines
- 133 components exported from `@mizu/vue`
