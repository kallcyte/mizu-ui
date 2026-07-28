---
"@mizu-ui/vue": patch
---

Mark Popover documentation as Ready. Fix fake v3 API and add full demo.

Fixed:
- Removed non-existent `title`, `description`, `modelValue`, `disabled`, `forceMount` props from docs. Popover v4 has none of these — replaced with correct `mode`, `open`, `modal`, `dismissible`, `arrow`, `content`, `openDelay`, `closeDelay`, `enableTouch`, `reference`, `ui`.

Documentation:
- Full template rewrite: popover.mdx with Demo, Anatomy (4-part), Variants (Click + Hover mode tables), Color/Spacing, Accessibility, Token Mapping, Vue Component API (13 props, 3 slots, 2 emits, 3 usage snippets), 8 Implementation Notes
- Demo expanded from 1 to 10 sections: Basic, Hover Mode, Content Positioning, Arrow, Modal, Non-Dismissible, Control Open State, With Command Palette, Following Cursor, Anchor Slot
- Added `#content="{ close }"` slot prop to non-dismissible example

docs-plan.md: Overlay now lists all 8 components (4 Ready, 4 Pending). Added missing DropdownMenu and updated total to 56 components.
