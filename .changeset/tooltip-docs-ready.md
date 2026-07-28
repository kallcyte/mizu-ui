---
"@mizu-ui/vue": patch
---

Mark Tooltip documentation as Ready.

Documentation:
- Full template rewrite: tooltip.mdx with Demo, Anatomy, Variants (4 behavioral toggles), Size/Color/Spacing, Accessibility (keyboard + ARIA), Token Mapping (4 CSS vars), Vue Component API (13 props, 2 slots, 1 emit, 3 usage snippets using v4 `content`/`side` API), 7 Implementation Notes
- Demo expanded from 2 to 8 sections: Basic, With Kbds, Delay Duration, Content Positioning (v4 API replacing broken v3 `:popper`), Arrow, Disabled, Control Open State, Following Cursor — all use Nuxt UI v4 `:content="{ side: '...' }"` API

docs-plan.md: Overlay 5→6 components, total 50→54 comps (27 Ready/27 Pending)
