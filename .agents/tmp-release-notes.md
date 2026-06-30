## v0.12.11 — New component: MizuNavigationMenu

Horizontal/vertical navigation bar with dropdown content panels, built on Reka UI NavigationMenu.

### Added

**`MizuNavigationMenu`** — compound component with 9 sub-components:
- **`MizuNavigationMenuRoot`** — container managing open state, orientation, hover/click delays
- **`MizuNavigationMenuList`** — horizontal or vertical list of items
- **`MizuNavigationMenuItem`** — associates a trigger with its content panel
- **`MizuNavigationMenuTrigger`** — button that opens the content panel
- **`MizuNavigationMenuContent`** — dropdown panel with enter animation
- **`MizuNavigationMenuLink`** — navigational link with active state
- **`MizuNavigationMenuIndicator`** — arrow pointing from content to trigger
- **`MizuNavigationMenuViewport`** — animated container that resizes between panels
- **`MizuNavigationMenuSub`** — nested sub-menu

| Feature | Details |
|---------|--------|
| Orientation | `horizontal` (top nav) and `vertical` (sidebar) |
| Trigger modes | Hover (200ms delay) and click, independently toggleable |
| Active link | `active` prop highlights current page (`brand-accent-subtle` bg) |
| Animation | Content enter: opacity + translateY (200ms, respects reduced-motion) |
| Accessibility | Keyboard nav, ARIA roles, focus-visible ring |

### Documentation

- New MDX page: `navigation-menu.mdx`
- New demo: `NavigationMenuDemo.vue` (4 sections: Basic Navigation, Active Link, Icon Triggers, Vertical Orientation)

### Stats

- Files changed: 23
- Insertions: +909
- Deletions: -8
- Package: `@mizu/vue@0.12.11`
