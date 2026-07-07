# Nuxt UI v4 Feature Adoption Plan

## Background

After evaluating whether to replace Reka UI with Nuxt UI v4 as the base layer for `@mizu/vue`, the conclusion was:

**Stay on Reka UI directly.** Nuxt UI v4 is itself a design system — it solves the same problem Mizu solves (styled, opinionated components). Wrapping a design system inside another design system creates styling conflicts, API mismatch, dependency bloat, and upgrade coupling.

Instead, **adopt specific ergonomic features and missing component types** from Nuxt UI v4 while keeping Reka UI as the headless foundation. Reka UI provides behavior and accessibility with zero styling opinion — exactly what a design system needs.

## Goals

1. **Adopt ergonomic DX patterns** from Nuxt UI that reduce boilerplate for consumers
2. **Fill component gaps** — add the most useful components Mizu currently lacks
3. **Enhance existing components** with well-designed props and behaviors
4. Keep all changes consistent with Mizu's existing architecture (Reka UI + Tailwind v4 + `@mizu/tokens`)

## Reference

- Master plan: `.agents/plans/PLAN.md`
- Mizu version: `0.14.0`
- Dependencies unchanged: `reka-ui ^2.9.0`, `tailwindcss ^4.3.0`

---

## Phase 1: Button Enhancements

Target: `MizuButton.vue`

High-visibility, low-effort improvements inspired by `UButton`.

### 1.1 `block` prop

| Prop    | Type      | Default | Description                                        |
| ------- | --------- | ------- | -------------------------------------------------- |
| `block` | `boolean` | `false` | Render button full width (`w-full justify-center`) |

```vue
<MizuButton block>Full Width</MizuButton>
```

### 1.2 `square` prop

| Prop     | Type      | Default | Description                                 |
| -------- | --------- | ------- | ------------------------------------------- |
| `square` | `boolean` | `false` | Equal padding on all sides (icon-only mode) |

When `square` mode is active:

- `sm`: `p-[8px]`
- `md`: `p-[10px]`
- `lg`: `p-[10px]`

### 1.3 `loading-auto` prop

| Prop          | Type      | Default | Description                                                                               |
| ------------- | --------- | ------- | ----------------------------------------------------------------------------------------- |
| `loadingAuto` | `boolean` | `false` | Automatically set `loading=true` while the `@click` handler's returned promise is pending |

Implementation: Wrap `handleClick` to detect if the handler returns a promise. If so, set `loading=true` before `await`, restore to `false` after settle.

### 1.4 `leading-icon` / `trailing-icon` updates

(Already supported via slots.) No change needed — Mizu's slot approach is more flexible than Nuxt's string `icon` prop because it accepts any component/SVG.

### Files to modify

- `packages/vue/src/components/MizuButton.vue` — add props, update `buttonClasses`, update `handleClick`
- `packages/vue/src/index.ts` — type exports updated automatically by build script
- `src/content/docs/components/button.mdx` — update docs with new props and examples
- `src/components/docs/ButtonDemo.vue` — update demo

---

## Phase 2: Dialog (Modal) Enhancements

Target: `MizuDialog*` components

### 2.1 `fullscreen` prop on MizuDialogRoot

| Prop         | Type      | Default | Description                                                |
| ------------ | --------- | ------- | ---------------------------------------------------------- |
| `fullscreen` | `boolean` | `false` | Dialog takes full viewport — no border, no shadow, inset 0 |

When `fullscreen=true` on `MizuDialogContent`:

- CSS: `inset: 0; border-radius: 0; max-width: 100%; max-height: 100%; width: 100vw; height: 100dvh; box-shadow: none`

### 2.2 `dismissible` prop

| Prop          | Type      | Default | Description                                            |
| ------------- | --------- | ------- | ------------------------------------------------------ |
| `dismissible` | `boolean` | `true`  | When `false`, prevents close on click-outside / Escape |

When `dismissible=false`:

- Pass `disable-outside-pointer-events` to Reka `DialogContent` (reversing the boolean — `true` = block outside clicks)
- Do **not** render close button
- Emit `closePrevent` when close is attempted

### 2.3 `scrollable` prop

| Prop         | Type      | Default | Description                                                                   |
| ------------ | --------- | ------- | ----------------------------------------------------------------------------- |
| `scrollable` | `boolean` | `false` | Content scrolls within the overlay instead of the dialog being fixed-position |

When `scrollable=true`:

- Overlay becomes `overflow-y-auto`
- Dialog content becomes `relative` (not `fixed`)
- Wrap overlay + content in a grid `place-items-center`

### 2.4 `transition` toggle

| Prop         | Type      | Default | Description                    |
| ------------ | --------- | ------- | ------------------------------ |
| `transition` | `boolean` | `true`  | Disable enter/leave animations |

When `transition=false`:

- Remove animation classes from content and overlay
- (Useful for reduced-motion preferences or SSR)

### Files to modify

- `packages/vue/src/components/MizuDialogRoot.vue` — add new props
- `packages/vue/src/components/MizuDialogContent.vue` — apply `fullscreen`, `scrollable`, `dismissible`, `transition` in classes/style
- `packages/vue/src/components/MizuDialogOverlay.vue` — apply `scrollable`, `transition`
- `packages/vue/src/components/MizuDialogClose.vue` — conditionally render when `dismissible`
- `src/content/docs/components/dialog.mdx` — update docs
- `src/components/docs/DialogDemo.vue` — update demo

---

## Phase 3: Drawer / Slideover

New component built on Reka UI `Dialog`.

### 3.1 `MizuDrawer`

A panel that slides in from the edge of the screen. Reuses `MizuDialog` internals but with different positioning and animation.

```
MizuDrawer
├── MizuDrawerTrigger
├── MizuDrawerPortal
├── MizuDrawerOverlay
└── MizuDrawerContent
    ├── MizuDrawerHeader
    │   ├── MizuDrawerTitle
    │   └── MizuDrawerDescription
    ├── MizuDrawerBody
    └── MizuDrawerFooter
        └── MizuDrawerClose
```

### Props

| Prop          | Type                                     | Default   | Description                                       |
| ------------- | ---------------------------------------- | --------- | ------------------------------------------------- |
| `open`        | `boolean` (v-model)                      | `false`   | Controlled open state                             |
| `side`        | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | Which edge the drawer slides from                 |
| `size`        | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"`    | Width (for left/right) or height (for top/bottom) |
| `title`       | `string`                                 | —         | Optional title in header                          |
| `description` | `string`                                 | —         | Optional description in header                    |
| `dismissible` | `boolean`                                | `true`    | Prevent close on outside-click / Escape           |

### Size mapping (right/left)

| Size   | Width              |
| ------ | ------------------ |
| `sm`   | `max-w-sm` (384px) |
| `md`   | `max-w-md` (448px) |
| `lg`   | `max-w-lg` (512px) |
| `xl`   | `max-w-xl` (576px) |
| `full` | `w-screen`         |

### Size mapping (top/bottom)

| Size   | Height         |
| ------ | -------------- |
| `sm`   | `max-h-[30vh]` |
| `md`   | `max-h-[50vh]` |
| `lg`   | `max-h-[70vh]` |
| `xl`   | `max-h-[85vh]` |
| `full` | `h-screen`     |

### Files to create

- `packages/vue/src/components/MizuDrawerRoot.vue`
- `packages/vue/src/components/MizuDrawerTrigger.vue`
- `packages/vue/src/components/MizuDrawerPortal.vue`
- `packages/vue/src/components/MizuDrawerOverlay.vue`
- `packages/vue/src/components/MizuDrawerContent.vue`
- `packages/vue/src/components/MizuDrawerHeader.vue`
- `packages/vue/src/components/MizuDrawerTitle.vue`
- `packages/vue/src/components/MizuDrawerDescription.vue`
- `packages/vue/src/components/MizuDrawerBody.vue`
- `packages/vue/src/components/MizuDrawerFooter.vue`
- `packages/vue/src/components/MizuDrawerClose.vue`

### Files to modify

- `src/content/docs/components/drawer.mdx` — new doc page
- `src/components/docs/DrawerDemo.vue` — new demo
- `astro.config.mjs` — add sidebar entry
- `src/components/home/ComponentsSection.astro` — add card

---

## Phase 4: Missing Simple Components

### 4.1 `MizuChip`

Numeric or status indicator (notification dot / count badge).

| Prop       | Type                                                                   | Default       | Description                 |
| ---------- | ---------------------------------------------------------------------- | ------------- | --------------------------- |
| `value`    | `string \| number`                                                     | —             | Display value               |
| `size`     | `"sm" \| "md"`                                                         | `"md"`        | Size                        |
| `color`    | `"primary" \| "accent" \| "success" \| "warning" \| "error" \| "info"` | `"accent"`    | Color variant               |
| `dot`      | `boolean`                                                              | `false`       | Dot-only mode (no value)    |
| `position` | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"`         | `"top-right"` | Position relative to parent |

Uses Reka UI `Presence` for mount/unmount animation. When used as standalone (no default slot), renders as inline badge. When wrapped around children, positions as overlay dot badge.

### 4.2 `MizuKbd`

Keyboard key display (`⌘K`, `Ctrl+S`, etc.).

| Prop   | Type                 | Default | Description            |
| ------ | -------------------- | ------- | ---------------------- |
| `keys` | `string \| string[]` | —       | Key or keys to display |
| `size` | `"sm" \| "md"`       | `"md"`  | Size                   |

Renders `<kbd>` element with stylized key appearance using `--radius-xs` and `--color-surface-muted` background.

### 4.3 `MizuAvatarGroup`

Stacked avatars with overlap and overflow count.

| Prop    | Type                | Default | Description                                |
| ------- | ------------------- | ------- | ------------------------------------------ |
| `items` | `AvatarGroupItem[]` | —       | Array of avatar items                      |
| `max`   | `number`            | `5`     | Max visible before `+N` overflow indicator |

```typescript
interface AvatarGroupItem {
  src?: string;
  alt?: string;
  fallback?: string;
}
```

The `+N` overflow chip uses the same `MizuChip` component. Each avatar has negative `margin-left` (except first) creating overlap. Hover reveals full avatar.

### 4.4 `MizuEmpty`

Empty state placeholder for data displays.

| Prop          | Type            | Default | Description                            |
| ------------- | --------------- | ------- | -------------------------------------- |
| `icon`        | `string` (slot) | —       | Optional icon slot                     |
| `title`       | `string`        | —       | Heading text                           |
| `description` | `string`        | —       | Body text                              |
| `action`      | `string` (slot) | —       | Optional CTA slot (typically a button) |

### 4.5 `MizuCheckboxGroup`

Group wrapper around `MizuCheckbox`.

| Prop          | Type                         | Default      | Description          |
| ------------- | ---------------------------- | ------------ | -------------------- |
| `modelValue`  | `string[]` (v-model)         | `[]`         | Selected values      |
| `options`     | `CheckboxGroupOption[]`      | `[]`         | Available options    |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Layout direction     |
| `legend`      | `string`                     | —            | Fieldset legend text |

Renders `<fieldset>` with `<legend>`. Each option renders as `<MizuCheckbox>` with label.

### Files to create

- `packages/vue/src/components/MizuChip.vue`
- `packages/vue/src/components/MizuKbd.vue`
- `packages/vue/src/components/MizuAvatarGroup.vue`
- `packages/vue/src/components/MizuEmpty.vue`
- `packages/vue/src/components/MizuCheckboxGroup.vue`

### Files to modify

- `src/content/docs/components/{chip,kbd,avatar-group,empty,checkbox-group}.mdx` — new doc pages
- `src/components/docs/{Chip,Kbd,AvatarGroup,Empty,CheckboxGroup}Demo.vue` — new demos
- `astro.config.mjs` — sidebar entries
- `src/components/home/ComponentsSection.astro` — homepage cards

---

## Phase 5: Form + FormField

Target: Integrate with existing `useForm` (`useMizuField`) composable.

### 5.1 `MizuForm`

Wrapper component that consumes `FieldState` from `useMizuField` context and provides submission/validation lifecycle.

| Prop       | Type                           | Default | Description                |
| ---------- | ------------------------------ | ------- | -------------------------- |
| `state`    | `Record<string, unknown>`      | —       | Reactive form state object |
| `validate` | `(state) => ValidationError[]` | —       | Validation function        |
| `submit`   | `(state) => Promise<void>`     | —       | Submit handler             |

Emits `submit` event with the validated state. Prevents submission when validation fails. Shows errors on touched fields only.

### 5.2 `MizuFormField`

Validation-aware wrapper for any form input.

| Prop       | Type      | Default | Description                            |
| ---------- | --------- | ------- | -------------------------------------- |
| `name`     | `string`  | —       | Field name (matches key in form state) |
| `label`    | `string`  | —       | Label text                             |
| `required` | `boolean` | `false` | Adds asterisk to label                 |
| `help`     | `string`  | —       | Help text below input                  |

Connects to `MizuForm` context to resolve error messages for the given `name`. Passes `error` boolean and `helperText` to child input components.

### Files to create

- `packages/vue/src/components/MizuForm.vue`
- `packages/vue/src/components/MizuFormField.vue`
- (May need `provideFieldContext` / `injectFieldContext` composable in `useMizuField.ts`)

### Files to modify

- `packages/vue/src/composables/useMizuField.ts` — add context injection for form validation
- `src/content/docs/components/form.mdx` — new doc page
- `src/components/docs/FormDemo.vue` — new demo
- `src/content/docs/components/validation-patterns.mdx` — update with new Form component

---

## Phase 6: Convenience API Patterns

Low-priority ergonomic improvements to existing components.

### 6.1 Items array API for compound components

Add an `items` prop shorthand to existing compound components, keeping the sub-component API for complex cases.

| Component          | Current API                                               | Items shorthand                                 |
| ------------------ | --------------------------------------------------------- | ----------------------------------------------- |
| `MizuAccordion`    | `<MizuAccordionRoot>` + Item + Header + Trigger + Content | `:items="[{ label, content, icon, disabled }]"` |
| `MizuTabs`         | `<MizuTabsRoot>` + List + Trigger + Content               | `:tabs="[{ label, value, content }]"`           |
| `MizuDropdownMenu` | `<MizuDropdownMenuRoot>` + Item + etc.                    | `:items="[{ label, icon, onSelect }]"`          |
| `MizuBreadcrumb`   | Already has items array                                   | —                                               |

When items array is provided, the component internally maps each item to the appropriate sub-components. When not provided, the user composes sub-components manually (current behavior).

### 6.2 `v-model:open` consistency audit

Ensure all overlay components use `v-model:open` consistently:

| Component              | Current                | Target         |
| ---------------------- | ---------------------- | -------------- |
| `MizuDialogRoot`       | Already `v-model:open` | ✅ OK          |
| `MizuAlertDialogRoot`  | Already `v-model:open` | ✅ OK          |
| `MizuPopoverRoot`      | Check                  | `v-model:open` |
| `MizuDropdownMenuRoot` | Check                  | `v-model:open` |
| `MizuTooltipRoot`      | Check                  | `v-model:open` |

### 6.3 `ui` prop for slot-level styling

Add `:ui` prop to compound components for targeted style overrides per slot, mirroring Nuxt UI's pattern.

```vue
<MizuDialog
  :ui="{ header: 'bg-surface-subtle', body: 'p-6', footer: 'border-t border-surface-muted' }"
>
  ...
</MizuDialog>
```

The `ui` prop is typed as an object mapping slot names to class strings. These classes are merged with (not replacing) the component's default classes.

### Files to modify

- `packages/vue/src/components/MizuAccordionRoot.vue` — add `items` prop + internal mapping
- `packages/vue/src/components/MizuAccordionItem.vue` — no change
- `packages/vue/src/components/MizuTabsRoot.vue` — add `tabs` prop + internal mapping
- `packages/vue/src/components/MizuDropdownMenuRoot.vue` — add `items` prop + internal mapping
- All overlay root components — audit `v-model:open` consistency
- All compound components — add `ui` prop

---

## Phase 7: Larger Components (Future)

Lower priority, higher effort.

### 7.1 `MizuCommandPalette`

Cmd+K / Ctrl+K search overlay. Powered by Fuse.js for fuzzy search.

Components:

- `MizuCommandPaletteRoot`
- `MizuCommandPaletteInput`
- `MizuCommandPaletteGroup`
- `MizuCommandPaletteItem`

Dependency: `fuse.js` (optional / peer dependency)

### 7.2 `MizuNavigationMenu`

Horizontal nav bar with dropdown groups. (Already started in `.agents/archive/navigation-menu/`.)

### 7.3 `MizuPinInput`

OTP / verification code input with auto-advance between cells.

### 7.4 `MizuContextMenu`

Right-click context menu. Ships as a composable overlay (similar to Reka UI context menu).

### 7.5 Programmatic overlay API

`useOverlay().create()` composable for opening modals, drawers, and other overlays from JavaScript with a result promise.

```typescript
const overlay = useOverlay()
const result = await overlay.open(MizuDialog, { title: 'Confirm', ... })
```

---

## Effort Estimate & Priority

| Phase                         | Components         | Effort       | Priority | Dependencies             |
| ----------------------------- | ------------------ | ------------ | -------- | ------------------------ |
| 1 — Button enhancements       | 1 modify           | Small        | **P0**   | None                     |
| 2 — Dialog enhancements       | 4 modify           | Small        | **P0**   | None                     |
| 3 — Drawer                    | 11 create          | Medium       | **P1**   | Reka UI Dialog           |
| 4 — Missing simple components | 5 create           | Small-Medium | **P1**   | None                     |
| 5 — Form + FormField          | 2 create, 1 modify | Medium       | **P1**   | `useMizuField`           |
| 6 — Convenience APIs          | ~5 modify          | Large        | **P2**   | —                        |
| 7 — Larger components         | 5 create           | Large        | **P3**   | Fuse.js (for CmdPalette) |

---

## Implementation Order (Recommended Sequence)

```
Iteration A (current sprint):
  1. Phase 1 — Button: block, square, loading-auto
  2. Phase 2 — Dialog: fullscreen, dismissible, scrollable, transition

Iteration B (next sprint):
  3. Phase 4 — Chip, Kbd, AvatarGroup, Empty, CheckboxGroup

Iteration C:
  4. Phase 3 — Drawer (all 11 components)
  5. Phase 5 — Form + FormField

Iteration D:
  6. Phase 6 — Items array APIs, v-model audit, ui prop

Future:
  7. Phase 7 — CommandPalette, NavMenu, PinInput, ContextMenu, useOverlay
```

---

## Key Decisions

1. **No new dependencies** for Phases 1-5. All changes stay within Reka UI + Tailwind v4.
2. **Items array API is additive** — existing sub-component API continues to work. No breaking changes.
3. **All new components follow Mizu conventions**: `<script setup lang="ts">`, Mizu tokens via `var(--color-*)`, Tailwind v4 utility classes, `@reference` in `<style>`.
4. **Phase 7 components** (CommandPalette, ContextMenu, Programmatic overlay) require design discussion before implementation.

---

## Documentation

Every new or enhanced component must follow the skills-defined documentation structure (see [.agents/skills/mizu-skill/SKILL.md](../.agents/skills/mizu-skill/SKILL.md)):

- MDX doc page in `src/content/docs/components/`
- Demo component in `src/components/docs/`
- Sidebar entry in `astro.config.mjs`
- Homepage card in `src/components/home/ComponentsSection.astro`
- Changelog entry in `src/content/docs/getting-started/changelog.mdx`
- Version bump in `packages/vue/package.json` and root `package.json`
- Rebuild `@mizu/vue` after adding/modifying components

---

## Success Criteria

- [ ] All P0 items (Button + Dialog enhancements) implemented, documented, and built
- [ ] All P1 items (Drawer, Chip, Kbd, AvatarGroup, Empty, CheckboxGroup, Form) implemented, documented, and built
- [ ] No breaking changes to existing component APIs
- [ ] `pnpm --filter @mizu/vue build` succeeds
- [ ] Demo components render correctly in dev server
