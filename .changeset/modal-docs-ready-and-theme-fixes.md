---
"@mizu-ui/vue": patch
---

Fix Modal theme bugs and mark docs as Ready.

Theme fixes:
- overlay z-index: added `z-40` overlay / `z-50` content in modal theme slots
- fullscreen content: Nuxt UI v4 bug (missing `fixed` on `inset-0`) — content collapsed to 0x0 without it. Fixed with `fixed inset-0 z-50 rounded-none` variant override
- footer alignment: buttons now default to `justify-end` (right-aligned)
- overlay opacity: changed from `bg-elevated/75` (75%) to `bg-black/25` (25%)

Documentation:
- Full template rewrite: modal.mdx with Demo, Anatomy, Variants, Size/Color/Spacing, Accessibility, Token Mapping, Vue Component API (15 props, 9 slots, 6 emits), 8 Implementation Notes
- Demo expanded from 3 to 7 sections: Basic, With Description, Fullscreen, Scrollable (20 items), Non-Dismissible, Nested, Footer Slot — all follow Nuxt UI trigger-in-default-slot pattern
- Marked Ready (green badge). Overlay: 4→5 components, total: 24→25 Ready
