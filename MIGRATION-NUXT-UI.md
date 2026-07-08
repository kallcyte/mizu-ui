# Migration Plan: Reka UI → Nuxt UI v4

This document outlines the phased migration of the Mizu Design System from **reka-ui v2.10.1** to **@nuxt/ui v4** as the base component library.

## Strategic Decision

**Consumers use `<UComponent>` directly** — no `Mizu*` wrappers around Nuxt UI components. The `@mizu/vue` package becomes a **theme extension + custom components layer** that ships only:

- **Theme configuration** (CSS + token mapping via `@import "@nuxt/ui"`)
- **Custom components** Nuxt UI doesn't provide (MizuMetric, MizuDashList, MizuDataTable, MizuQuote, MizuSkeletonTheme, MizuAlertDialog\*)
- **Custom composables** (`useToast`, `useForm`)
- **Documentation** (updated to show `U*` usage)

---

## Phase 1: Foundation ✅

Solidify the foundation so the build pipeline is green.

| # | Task | Files | Details | Status |
|---|------|-------|---------|--------|
| 1.1 | Remove PostCSS transformer & add Tailwind import | `packages/vue/vite.config.ts`, `packages/vue/src/index.css` | Removed `css.transformer: "postcss"` (conflicted with `@nuxt/ui/vite`'s internal tailwind). Added `@import "tailwindcss"` to `index.css` — needed for `@reference` in component `<style>` blocks. Build passes cleanly. | ✅ Done |
| 1.2 | Register Nuxt UI Vue plugin for Histoire | `packages/vue/src/histoire.setup.ts` | `app.use(ui as any)`. The `as any` cast is needed due to Vue version type mismatch. | ✅ Done |
| 1.3 | Keep scrollIntoView mock for tests | `packages/vue/src/__tests__/setup.ts` | Still needed while Reka-based MizuCombobox* components exist. Marked for removal in Phase 3. All 339 tests pass. | ✅ Done |
| 1.4 | Add `@nuxt/ui` to peerDependencies | `packages/vue/package.json` | Consumers must install `@nuxt/ui` separately. | ✅ Done |
| 1.5 | Astro config tailwind cleanup | `astro.config.mjs` | **Deferred.** The Astro site's `@tailwindcss/vite` processes CSS separately from the library bundle. No conflict exists. Revisit when docs site needs Nuxt UI component rendering. | ⬜ Deferred |
| 1.6 | Update `generate-index.mjs` | `packages/vue/scripts/generate-index.mjs` | **Deferred to Phase 3.** Keep exporting all 165 components until Reka-based ones are deleted. | ⬜ Deferred |

### Verification (as of 2026-07-08)

| Command | Status |
|---------|--------|
| `pnpm --filter @mizu/vue build` | ✅ Passes (vite build + vue-tsc, 165 components) |
| `pnpm --filter @mizu/vue test` | ✅ 339 tests pass, 31 files, 0 errors |
| `pnpm --filter @mizu/vue story:build` | ⬜ Not tested (no stories for Nuxt UI components yet) |
| `astro dev` | ⬜ Not tested (needs `@nuxt/ui/vite` for demo components) |

### Key Fixes from Phase 1

1. **`css.transformer: "postcss"` removed** — Nuxt UI's Vite plugin bundles `@tailwindcss/vite`. Setting `transformer: "postcss"` created a conflict causing `Cannot apply unknown utility class` errors.
2. **`@import "tailwindcss"` added** — Component `@reference` directives need Tailwind utilities available through the reference chain. Nuxt UI's runtime CSS doesn't include `@import "tailwindcss"` explicitly.
3. **`app.use(ui as any)` cast** — Nuxt UI's Vue plugin type doesn't match Vue's `app.use()` signature exactly.
4. **`scrollIntoView` mock retained** — Reka UI's ListboxRoot calls it on highlighted elements. Removable once MizuCombobox* is deleted.
5. **`@nuxt/ui` externalized** — Listed in `rollupOptions.external` so it's not bundled — consumers install it separately.

---

## Phase 2: Theme Deep Alignment ✅

Align remaining Mizu design tokens to Nuxt UI's theming system. All tasks completed.

### Task 2.1-2.4: Analysis Results

| Token Category | Mizu Value | Nuxt UI Default | Action Taken |
|---------------|------------|----------------|-------------|
| **Container width** | 1040px | 80rem (1280px) | ✅ Override via `:root { --ui-container: 1040px }` in `index.css` |
| **Spacing** | 4/6/12/24/48/80px strides | Tailwind v4 default scale (4/8/12/16/24/32/...) | ✅ No `@theme` override needed. Only `6px` lacks a Tailwind v4 equivalent; custom components reference `--spacing-*` CSS variables directly. |
| **Font families** | `dm-sans`, `jetbrains-mono` | Tailwind v4 `sans`/`mono`/`serif` | ✅ Indirection pattern in `@theme { --font-family-sans: var(--font-family-sans) }` — resolved at runtime by `@mizu/tokens/light.css` |
| **Border radius** | 4/8/12/16/24px | `--ui-radius: 0.25rem` → `sm: 4px, md: 6px, lg: 8px, xl: 12px` | ✅ No override needed. Mizu values (4/8/12/16/24) are close enough to Nuxt UI defaults (4/6/8/12/16/24). Overriding `--ui-radius` would cascade to all components. |
| **Animation durations** | 200ms (fast), 300ms (normal) | Uses `motion-v` library, not CSS durations | ✅ No override needed. `--duration-fast`/`--duration-normal` available as CSS variables for consumer use. |
| **Colors** | 30+ Mizu tokens (brand, feedback, surface) | 6 semantic color families (50-950 scale) | ✅ Full `@theme` mapping block in `index.css` maps Mizu tokens → Nuxt UI semantic colors (`--color-primary: var(--color-brand-primary)`, etc.) |

### Task 2.5: Mizu Theme Preset ✅

The existing `packages/vue/src/index.css` **is** the Mizu theme preset. It ships as `@mizu/vue/style.css` and consumers import it as their single CSS entry point. See [Mizu Theme Preset Reference](#mizu-theme-preset-reference) below for the complete documentation.

### Verification

| Command | Status |
|---------|--------|
| `pnpm --filter @mizu/vue build` | ✅ Passes |
| `pnpm --filter @mizu/vue test` | ✅ 339 tests pass |

---

## Mizu Theme Preset Reference

This section documents the Mizu theme as a Nuxt UI preset. For a library context (`@mizu/vue`), the preset is implemented via CSS variables rather than `app.config.ts`.

### How It Works

1. **Consumers** install `@mizu/vue` + `@nuxt/ui`
2. **Consumers** import `@mizu/vue/style.css` in their app's entrypoint
3. **The CSS** imports Tailwind → Nuxt UI → Mizu tokens → applies overrides
4. **Nuxt UI components** automatically use Mizu colors via the `@theme` color alias block

### CSS Entry Point (`index.css`)

```css
@import "tailwindcss";          /* Tailwind v4 utilities */
@import "@nuxt/ui";             /* Nuxt UI theme + components CSS */

@import "@mizu/tokens/light.css" layer(base);  /* Mizu design tokens (light) */
@import "@mizu/tokens/dark.css" layer(base);   /* Mizu design tokens (dark) */

@theme {
  --font-family-sans: var(--font-family-sans);  /* dm-sans at runtime */
  --font-family-mono: var(--font-family-mono);  /* jetbrains-mono at runtime */
  --font-family-serif: var(--font-family-serif);
}

:root {
  --ui-container: 1040px;  /* Override Nuxt UI's default 1280px */
}

@theme {
  /* Primary — Mizu brand-blue */
  --color-primary: var(--color-brand-primary);
  --color-primary-hover: var(--color-brand-primary-hover);
  --color-primary-focus: var(--color-brand-primary-focus);
  --color-primary-subtle: var(--color-brand-primary-subtle);

  /* Secondary — Mizu ycp (deep navy) */
  --color-secondary: var(--color-brand-ycp);
  --color-secondary-hover: var(--color-brand-ycp-hover);
  --color-secondary-focus: var(--color-brand-ycp-focus);
  --color-secondary-subtle: var(--color-brand-ycp-subtle);

  /* Surface / Foreground */
  --color-surface-base: var(--color-surface-base);
  --color-surface-subtle: var(--color-surface-subtle);
  --color-surface-muted: var(--color-surface-muted);
  --color-foreground-primary: var(--color-foreground-primary);
  --color-foreground-secondary: var(--color-foreground-secondary);
  --color-foreground-tertiary: var(--color-foreground-tertiary);
  --color-foreground-inverse: var(--color-foreground-inverse);

  /* Feedback colors */
  --color-success: var(--color-feedback-success-base);
  --color-success-hover: var(--color-feedback-success-hover);
  --color-success-focus: var(--color-feedback-success-focus);
  --color-success-subtle: var(--color-feedback-success-subtle);

  --color-error: var(--color-feedback-error-base);
  --color-error-hover: var(--color-feedback-error-hover);
  --color-error-focus: var(--color-feedback-error-focus);
  --color-error-subtle: var(--color-feedback-error-subtle);

  --color-warning: var(--color-feedback-warning-base);
  --color-warning-hover: var(--color-feedback-warning-hover);
  --color-warning-focus: var(--color-feedback-warning-focus);
  --color-warning-subtle: var(--color-feedback-warning-subtle);

  --color-info: var(--color-feedback-info-base);
  --color-info-hover: var(--color-feedback-info-hover);
  --color-info-focus: var(--color-feedback-info-focus);
  --color-info-subtle: var(--color-feedback-info-subtle);
}
```

### Nuxt UI Theme Override Chain

Nuxt UI generates a `@theme default inline` block (from `@nuxt/ui/vite` plugin) that sets:

```css
@theme default inline {
  --color-primary-50: var(--ui-color-primary-50);
  --color-primary: var(--ui-primary);
  --radius-sm: var(--ui-radius);                    /* 4px at default */
  --radius-md: calc(var(--ui-radius) * 1.5);        /* 6px */
  --radius-lg: calc(var(--ui-radius) * 2);          /* 8px */
  --radius-xl: calc(var(--ui-radius) * 3);          /* 12px */
  --radius-2xl: calc(var(--ui-radius) * 4);         /* 16px */
  --radius-3xl: calc(var(--ui-radius) * 6);         /* 24px */
  --text-color-default: var(--ui-text);
  --background-color-default: var(--ui-bg);
  --border-color-default: var(--ui-border);
  /* ... */
}
```

The Nuxt UI runtime CSS (`@import "@nuxt/ui"`) sets `@layer theme { :root { ... } }` with:

```css
@layer theme {
  :host, :root {
    --ui-header-height: 4rem;
    --ui-radius: 0.25rem;
    --ui-container: 80rem;
  }
  .light, :host, :root {
    --ui-text: var(--ui-color-neutral-700);
    --ui-bg: #fff;
    --ui-border: var(--ui-color-neutral-200);
    /* ... */
  }
  .dark {
    --ui-text: var(--ui-color-neutral-200);
    --ui-bg: var(--ui-color-neutral-900);
    /* ... */
  }
}
```

Mizu's `index.css` overrides these by setting unlayered CSS at `:root`, which beats layered declarations per CSS cascade rules.

### What This Means for Consumers

- **`<UButton color="primary">`** — uses Mizu's brand-blue (`--color-brand-primary`)
- **`<UButton color="secondary">`** — uses Mizu's ycp deep navy (`--color-brand-ycp`)
- **`<UCard>`** — uses Mizu surface/foreground tokens for background and text
- **Container width** — Mizu's 1040px layout via `--ui-container: 1040px`
- **Font families** — DM Sans (sans) and JetBrains Mono (mono)
- **Border radius** — Nuxt UI defaults (close match to Mizu values)
- **Spacing** — Tailwind v4 default scale (Mizu-extra 6px value handled via `--spacing-*` vars)

### Notes for Custom Mizu Components

Mizu-specific components (MizuAlertDialog, MizuDashList, MizuDataTable, MizuMetric, MizuQuote, MizuSkeletonTheme) can reference:

- Mizu token CSS variables directly: `var(--color-brand-primary)`, `var(--duration-fast)`
- Tailwind utilities via `@apply` or inline classes: `class="text-primary font-semibold"`
- Nuxt UI components internally: `<UButton>` inside MizuToastProvider

---

## Phase 3: Component Migration — Batch Deletion

Delete Reka-based `Mizu{Component}.vue` wrappers that have Nuxt UI equivalents.

> **Important:** After each deletion batch, re-run `pnpm --filter @mizu/vue build` to regenerate `index.ts` and confirm the build still passes.

### Nuxt UI ↔ Mizu Component Mapping

Elements — self-contained, simple components:

| Nuxt UI | Mizu File(s) to Delete | Count |
|---------|------------------------|-------|
| `UAlert` | `MizuAlert.vue` | 1 |
| `UAvatar` | `MizuAvatar.vue` | 1 |
| `UAvatarGroup` | `MizuAvatarGroup.vue` | 1 |
| `UBadge` | `MizuBadge.vue` | 1 |
| `UButton` | `MizuButton.vue` | 1 |
| `UKbd` | `MizuKbd.vue` | 1 |
| `UProgress` | `MizuProgress.vue` | 1 |
| `USkeleton` | `MizuSkeleton.vue` | 1 |
| `UBadge` (replaces Tag) | `MizuTag.vue` | 1 |
| `USeparator` (replaces Divider) | `MizuDivider.vue` | 1 |

Form components:

| Nuxt UI | Mizu File(s) to Delete | Count |
|---------|------------------------|-------|
| `UCheckbox` | `MizuCheckbox.vue` | 1 |
| `UCheckboxGroup` | `MizuCheckboxGroup.vue` | 1 |
| `UInput` | `MizuInput.vue` | 1 |
| `UInputNumber` | `MizuNumberField*.vue` | 4 |
| `URadioGroup` | `MizuRadio.vue` | 1 |
| `USelect` | `MizuSelect.vue` | 1 |
| `USlider` | `MizuSlider*.vue` | 4 |
| `USwitch` | `MizuSwitch.vue` | 1 |
| `UTextarea` | `MizuTextarea.vue` | 1 |
| `UInputTags` | `MizuTagsInput.vue` | 1 |
| `UToggleGroup` / `UFieldGroup` | `MizuToggleGroup*.vue` | 2 |
| `UForm` | `MizuForm.vue` | 1 |
| `UFormField` | `MizuFormField.vue` | 1 |

Compound / Overlay / Navigation components:

| Nuxt UI | Mizu File(s) to Delete | Count |
|---------|------------------------|-------|
| `UAccordion` | `MizuAccordion*.vue` | 5 |
| `UBreadcrumb` | `MizuBreadcrumb.vue` | 1 |
| `UCard` | `MizuCard*.vue` | 8 |
| `UCollapsible` | `MizuCollapsible*.vue` | 3 |
| `UInputMenu` / `USelectMenu` | `MizuCombobox*.vue` | 16 |
| `UCalendar` / `UInputDate` | `MizuDatePicker*.vue` | 20 |
| `UModal` | `MizuDialog*.vue` | 11 |
| `UDrawer` / `USlideover` | `MizuDrawer*.vue` | 12 |
| `UDropdownMenu` | `MizuDropdownMenu*.vue` | 18 |
| `UEmpty` | `MizuEmpty.vue` | 1 |
| `UPagination` | `MizuPagination.vue` | 1 |
| `UPopover` | `MizuPopover*.vue` | 7 |
| `UScrollArea` | `MizuScrollArea*.vue` | 5 |
| `UTabs` | `MizuTabs*.vue` | 5 |
| `UToast` | `MizuToast*.vue` | 7 |
| `UTooltip` | `MizuTooltip*.vue` | 4 |

**Total files to delete: ~155**

> **Note:** `MizuToastProvider.vue` internally imports `MizuButton` — before deleting `MizuButton`, update the toast provider to use `UButton` instead.

### Files to KEEP (Mizu-specific, no Nuxt UI equivalent)

| File(s) | Reason |
|---------|--------|
| `MizuAlertDialog*.vue` (9 files) | Custom alert dialog with Mizu-specific APIs (size, transitions, shorthand mode) |
| `MizuDashList.vue` | Custom key-value data display |
| `MizuDataTable.vue` | Uses `@tanstack/vue-table`, independent of Reka/Nuxt UI |
| `MizuMetric.vue` | Custom metric/stat display |
| `MizuQuote.vue` | Custom blockquote component |
| `MizuSkeletonTheme.vue` + `skeleton-types.ts` | Custom skeleton theme engine |

### Recommended Deletion Order

**Batch 3A — Elements (safe, self-contained):**
Alert, Avatar, AvatarGroup, Badge, Button, Divider, Kbd, Progress, Skeleton, Tag

**Batch 3B — Form components:**
Checkbox, CheckboxGroup, Input, NumberField, Radio, Select, Slider, Switch, Textarea, TagsInput, ToggleGroup

**Batch 3C — Overlay & navigation (more complex):**
Dialog, Drawer, DropdownMenu, Popover, Tooltip, Toast, Pagination

**Batch 3D — Compound components:**
Accordion, Breadcrumb, Card, Collapsible, Combobox, DatePicker, Empty, Form, FormField, ScrollArea, Tabs

---

## Phase 4: Documentation Updates

Update all docs site assets to reference `U*` components.

| # | Task | Files | Details |
|---|------|-------|---------|
| 4.1 | Update MDX docs | `src/content/docs/components/**/*.mdx` | Update code examples to use `UButton`, `UModal`, etc. instead of `MizuButton`, `MizuDialog`. Update prop references to match Nuxt UI's API |
| 4.2 | Update demo components | `src/components/docs/*.vue` | Rewrite demo components to use `U*` components. Most become simpler — just thin wrappers around Nuxt UI components |
| 4.3 | Update mizu-skill | `.agents/skills/mizu-skill/SKILL.md` | Remove Reka-specific advice (e.g., `all: revert` caveat for `MizuTabsContent`). Update examples to use `U*` |
| 4.4 | Update Starlight sidebar | `astro.config.mjs` | Keep entries for Mizu-specific components. Add note for components delegated to Nuxt UI. Remove or re-label entries as needed |
| 4.5 | Update homepage cards | `src/components/home/ComponentsSection.astro` | Keep only Mizu-specific component cards. Add section explaining Nuxt UI as the base |
| 4.6 | Update changelog | `src/content/docs/getting-started/changelog.mdx` | Document the migration per release batch |

---

## Phase 5: Stories Update

| # | Task | Files | Details |
|---|------|-------|---------|
| 5.1 | Update/delete existing stories | `packages/vue/src/stories/` | 3 stories (Badge, Button, ComboboxRoot) reference Reka-based components. Rewrite or delete along with the corresponding component deletion |
| 5.2 | Add stories for kept components | `packages/vue/src/stories/` | Add Histoire stories for: MizuAlertDialog, MizuDashList, MizuDataTable, MizuMetric, MizuQuote, MizuSkeletonTheme. Follow the mizu-skill story template |

---

## Phase 6: Composables & Utilities

| # | Task | Details |
|---|------|---------|
| 6.1 | Update `useToast` composable | Nuxt UI has its own `useToast()`. Mizu's version has custom features (showTimer, action buttons, variant icons). **Recommendation: keep Mizu's useToast** — it provides functionality Nuxt UI's toast doesn't cover, and is composable-layer only (no Reka dependency) |
| 6.2 | Verify `useForm` composable | Mizu's Zod-based `useForm` is independent of Reka. Keep as-is — it works with any form components |
| 6.3 | Ensure kept components have no Reka imports | Verify MizuAlertDialog, MizuDataTable, and other kept files don't import from `reka-ui`. Remove any such imports |

---

## Phase 7: Verification

Full verification pass before cleanup.

| # | Command | What to check |
|---|---------|---------------|
| 7.1 | `pnpm --filter @mizu/vue build` | Library Vite build succeeds with Nuxt UI externalized |
| 7.2 | `pnpm --filter @mizu/vue typecheck` | `vue-tsc --noEmit` passes without type errors |
| 7.3 | `pnpm --filter @mizu/vue story:build` | Histoire stories compile cleanly |
| 7.4 | `pnpm --filter @mizu/vue test` | Vitest tests all pass |
| 7.5 | `pnpm build` | Full monorepo build succeeds (tokens → vue → astro) |
| 7.6 | Visual inspection | Check docs site for visual regressions on migrated components |

---

## Phase 8: Cleanup

Remove legacy dependencies and simplify build config.

| # | Task | Files | Details |
|---|------|-------|---------|
| 8.1 | Remove `reka-ui` from dependencies | `packages/vue/package.json` | Remove from `dependencies` once no components import from it |
| 8.2 | Remove `reka-ui` from root | `package.json` | Remove from root workspace `dependencies` |
| 8.3 | Remove `@tailwindcss/vite` from devDependencies | `packages/vue/package.json` | No longer needed — Nuxt UI brings its own Tailwind |
| 8.4 | Remove `tailwindcss` from devDependencies | `packages/vue/package.json` | Nuxt UI brings Tailwind v4 as a transitive dependency |
| 8.5 | Simplify `generate-index.mjs` | `packages/vue/scripts/generate-index.mjs` | Only scan for the ~15 kept Mizu-specific components instead of all `.vue` files |
| 8.6 | Remove `@lucide/vue` if unused | `package.json` | Check if kept components still use lucide icons |
| 8.7 | Remove unused CSS | `packages/vue/src/index.css` | Clean up any stale CSS that was only relevant for Reka-based components |
| 8.8 | Version bump | `packages/vue/package.json` + root `package.json` | Bump to `0.16.0` (breaking change — consumers must migrate from `Mizu*` to `U*`) |

---

## Phase 9: Release

| # | Task | Details |
|---|------|---------|
| 9.1 | Update CHANGELOG | `src/content/docs/getting-started/changelog.mdx` — document all removed components, changed APIs, and migration notes |
| 9.2 | Update consumer migration guide | Add a migration guide section explaining how to migrate from `MizuButton` to `UButton`, including prop mapping tables |
| 9.3 | Write release notes | One-line summary, components removed, components kept, migration instructions, build stats |
| 9.4 | Git tag & release | `v0.16.0` — first Nuxt UI-based release |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Vite library mode + Nuxt UI plugin compatibility | Build fails | Test early (Phase 1.1). If `@nuxt/ui/vite` doesn't work in library mode, switch to explicit CSS import + manual component registration |
| Nuxt UI `@theme` conflicts with existing Mizu CSS variables | Visual regressions | Visual diff on docs site before/after each batch. Keep both theme systems side-by-side during transition |
| Toast composable API mismatch | Consumer breakage | Keep Mizu `useToast` API but re-implement internals using Nuxt UI toast primitives if needed |
| Auto-generated `index.ts` includes deleted components | Broken exports, build fails | Update `generate-index.mjs` before deleting files — either filter or rely on rebuild to regenerate |
| Astro + Nuxt UI Vite plugin conflict | Docs site build fails | Test `astro dev` early. If `@nuxt/ui/vite` and `@astrojs/vue` conflict, configure the docs site to load Nuxt UI CSS separately |
| Component docs reference APIs that no longer exist | Wrong documentation, confusing consumers | Update docs in the same batch as component deletion. Never delete without also updating the corresponding docs page |

---

## Execution Checklist (Per Batch)

For each deletion batch in Phase 3, follow this procedure:

```markdown
- [ ] 1. Identify all .vue files in the batch
- [ ] 2. Check if any kept Mizu components import from these files
     (e.g. MizuToastProvider imports MizuButton)
- [ ] 3. If cross-imports exist, update the importing file first
- [ ] 4. Delete the .vue files
- [ ] 5. Run `pnpm --filter @mizu/vue build` to regenerate index.ts
- [ ] 6. Run `pnpm --filter @mizu/vue typecheck` to check types
- [ ] 7. Update corresponding docs (MDX + demo component) in the same batch
- [ ] 8. Verify `pnpm --filter @mizu/vue build` still passes
```

---

## Component Mapping Reference

### Mizu Prop → Nuxt UI Prop Mapping (for docs updates)

When updating docs examples, use these equivalences:

| Mizu Prop | Nuxt UI Prop | Notes |
|-----------|-------------|-------|
| `variant="primary"` | `color="primary"` | Nuxt UI uses `color` instead of `variant` |
| `variant="outline"` | `variant="outline"` | Same prop name for buttons |
| `variant="ghost"` | `variant="ghost"` | Same |
| `size="sm"` | `size="sm"` | Same sizing scale (sm/md/lg) |
| `block` | `block` | Same prop for full-width |
| `loading` | `loading` | Same prop |
| `disabled` | `disabled` | Same |
| `square` | `square` | Same for icon-only mode |
| `title` | `title` | Same for compound components |
| `description` | `description` | Same |
| `close` | `close` | Same for dialog/modal |
| `v-model:open` | `v-model:open` | Same pattern for overlay components |
| `v-model` | `v-model` | Same for form inputs |
| `asChild` | `as-child` | Nuxt UI uses kebab-case for this prop |
| `ui` (slot class overrides) | `class` + `ui` | Nuxt UI has a similar `ui` prop pattern |

---

## Changelog

| Date | Phase | Change |
|------|-------|--------|
| 2026-07-08 | 1 | Initial setup: `@nuxt/ui/vite` plugin, `index.css` rewrite, peerDependencies, Histoire setup, test mock retention |
| 2026-07-08 | 2 | Theme deep alignment: container width override, color mapping, font indirection, Mizu Theme Preset Reference documented |
| 2026-07-08 | 3 | Component migration: 148 Reka-based components deleted (4 batches). Cross-imports fixed (MizuToastProvider→UButton, MizuDataTable→UCheckbox/UPagination). `router: false` added to vite config. scrollIntoView mock removed. 14 kept components, 45 tests. Build ✅, tests ✅ |

## Phase 3: Component Migration — Batch Deletion

Delete Reka-based `Mizu{Component}.vue` wrappers that have Nuxt UI equivalents.

> **Important:** After each deletion batch, re-run `pnpm --filter @mizu/vue build` to regenerate `index.ts` and confirm the build still passes.

### Nuxt UI ↔ Mizu Component Mapping

Elements — self-contained, simple components:

| Nuxt UI | Mizu File(s) to Delete | Count |
|---------|------------------------|-------|
| `UAlert` | `MizuAlert.vue` | 1 |
| `UAvatar` | `MizuAvatar.vue` | 1 |
| `UAvatarGroup` | `MizuAvatarGroup.vue` | 1 |
| `UBadge` | `MizuBadge.vue` | 1 |
| `UButton` | `MizuButton.vue` | 1 |
| `UKbd` | `MizuKbd.vue` | 1 |
| `UProgress` | `MizuProgress.vue` | 1 |
| `USkeleton` | `MizuSkeleton.vue` | 1 |
| `UBadge` (replaces Tag) | `MizuTag.vue` | 1 |
| `USeparator` (replaces Divider) | `MizuDivider.vue` | 1 |

Form components:

| Nuxt UI | Mizu File(s) to Delete | Count |
|---------|------------------------|-------|
| `UCheckbox` | `MizuCheckbox.vue` | 1 |
| `UCheckboxGroup` | `MizuCheckboxGroup.vue` | 1 |
| `UInput` | `MizuInput.vue` | 1 |
| `UInputNumber` | `MizuNumberField*.vue` | 4 |
| `URadioGroup` | `MizuRadio.vue` | 1 |
| `USelect` | `MizuSelect.vue` | 1 |
| `USlider` | `MizuSlider*.vue` | 4 |
| `USwitch` | `MizuSwitch.vue` | 1 |
| `UTextarea` | `MizuTextarea.vue` | 1 |
| `UInputTags` | `MizuTagsInput.vue` | 1 |
| `UToggleGroup`/`UFieldGroup` | `MizuToggleGroup*.vue` | 2 |
| `UForm` | `MizuForm.vue` | 1 |
| `UFormField` | `MizuFormField.vue` | 1 |

Compound / Overlay / Navigation components:

| Nuxt UI | Mizu File(s) to Delete | Count |
|---------|------------------------|-------|
| `UAccordion` | `MizuAccordion*.vue` | 5 |
| `UBreadcrumb` | `MizuBreadcrumb.vue` | 1 |
| `UCard` | `MizuCard*.vue` | 8 |
| `UCollapsible` | `MizuCollapsible*.vue` | 3 |
| `UInputMenu`/`USelectMenu` | `MizuCombobox*.vue` | 16 |
| `UCalendar`/`UInputDate` | `MizuDatePicker*.vue` | 20 |
| `UModal` | `MizuDialog*.vue` | 11 |
| `UDrawer`/`USlideover` | `MizuDrawer*.vue` | 12 |
| `UDropdownMenu` | `MizuDropdownMenu*.vue` | 18 |
| `UEmpty` | `MizuEmpty.vue` | 1 |
| `UPagination` | `MizuPagination.vue` | 1 |
| `UPopover` | `MizuPopover*.vue` | 7 |
| `UScrollArea` | `MizuScrollArea*.vue` | 5 |
| `UTabs` | `MizuTabs*.vue` | 5 |
| `UToast` | `MizuToast*.vue` | 7 |
| `UTooltip` | `MizuTooltip*.vue` | 4 |

**Total files to delete: ~155**

> **Note:** `MizuToastProvider.vue` internally imports `MizuButton` — before deleting `MizuButton`, update the toast provider to use `UButton` instead.

### Files to KEEP (Mizu-specific, no Nuxt UI equivalent)

| File(s) | Reason |
|---------|--------|
| `MizuAlertDialog*.vue` (9 files) | Custom alert dialog with Mizu-specific APIs (size, transitions, shorthand mode) |
| `MizuDashList.vue` | Custom key-value data display |
| `MizuDataTable.vue` | Uses `@tanstack/vue-table`, independent of Reka/Nuxt UI |
| `MizuMetric.vue` | Custom metric/stat display |
| `MizuQuote.vue` | Custom blockquote component |
| `MizuSkeletonTheme.vue` + `skeleton-types.ts` | Custom skeleton theme engine |

### Recommended Deletion Order

**Batch 3A — Elements (safe, self-contained):**
Alert, Avatar, AvatarGroup, Badge, Button, Divider, Kbd, Progress, Skeleton, Tag

**Batch 3B — Form components:**
Checkbox, CheckboxGroup, Input, NumberField, Radio, Select, Slider, Switch, Textarea, TagsInput, ToggleGroup

**Batch 3C — Overlay & navigation (more complex):**
Dialog, Drawer, DropdownMenu, Popover, Tooltip, Toast, Pagination

**Batch 3D — Compound components:**
Accordion, Breadcrumb, Card, Collapsible, Combobox, DatePicker, Empty, Form, FormField, ScrollArea, Tabs

---

## Phase 4: Documentation Updates

Update all docs site assets to reference `U*` components.

| # | Task | Files | Details |
|---|------|-------|---------|
| 4.1 | Update MDX docs | `src/content/docs/components/**/*.mdx` | Update code examples to use `UButton`, `UModal`, etc. instead of `MizuButton`, `MizuDialog`. Update prop references to match Nuxt UI's API |
| 4.2 | Update demo components | `src/components/docs/*.vue` | Rewrite demo components to use `U*` components. Most become simpler — just thin wrappers around Nuxt UI components |
| 4.3 | Update mizu-skill | `.agents/skills/mizu-skill/SKILL.md` | Remove Reka-specific advice (e.g., `all: revert` caveat for `MizuTabsContent`). Update examples to use `U*` |
| 4.4 | Update Starlight sidebar | `astro.config.mjs` | Keep entries for Mizu-specific components. Add note for components delegated to Nuxt UI. Remove or re-label entries as needed |
| 4.5 | Update homepage cards | `src/components/home/ComponentsSection.astro` | Keep only Mizu-specific component cards. Add section explaining Nuxt UI as the base |
| 4.6 | Update changelog | `src/content/docs/getting-started/changelog.mdx` | Document the migration per release batch |

---

## Phase 5: Stories Update

| # | Task | Files | Details |
|---|------|-------|---------|
| 5.1 | Update/delete existing stories | `packages/vue/src/stories/` | 3 stories (Badge, Button, ComboboxRoot) reference Reka-based components. Rewrite or delete along with the corresponding component deletion |
| 5.2 | Add stories for kept components | `packages/vue/src/stories/` | Add Histoire stories for: MizuAlertDialog, MizuDashList, MizuDataTable, MizuMetric, MizuQuote, MizuSkeletonTheme. Follow the mizu-skill story template |

---

## Phase 6: Composables & Utilities

| # | Task | Details |
|---|------|---------|
| 6.1 | Update `useToast` composable | Nuxt UI has its own `useToast()`. Mizu's version has custom features (showTimer, action buttons, variant icons). **Recommendation: keep Mizu's useToast** — it provides functionality Nuxt UI's toast doesn't cover, and is composable-layer only (no Reka dependency) |
| 6.2 | Verify `useForm` composable | Mizu's Zod-based `useForm` is independent of Reka. Keep as-is — it works with any form components |
| 6.3 | Ensure kept components have no Reka imports | Verify MizuAlertDialog, MizuDataTable, and other kept files don't import from `reka-ui`. Remove any such imports. The AlertDialog may use Reka under the hood — if so, replace with Nuxt UI's dialog primitives or keep Reka until a suitable replacement |

---

## Phase 7: Verification

Full verification pass before cleanup.

| # | Command | What to check |
|---|---------|---------------|
| 7.1 | `pnpm --filter @mizu/vue build` | Library Vite build succeeds with Nuxt UI externalized |
| 7.2 | `pnpm --filter @mizu/vue typecheck` | `vue-tsc --noEmit` passes without type errors |
| 7.3 | `pnpm --filter @mizu/vue story:build` | Histoire stories compile cleanly |
| 7.4 | `pnpm --filter @mizu/vue test` | Vitest tests all pass |
| 7.5 | `pnpm build` | Full monorepo build succeeds (tokens → vue → astro) |
| 7.6 | Visual inspection | Check docs site for visual regressions on migrated components |

---

## Phase 8: Cleanup

Remove legacy dependencies and simplify build config.

| # | Task | Files | Details |
|---|------|-------|---------|
| 8.1 | Remove `reka-ui` from dependencies | `packages/vue/package.json` | Remove from `dependencies` once no components import from it |
| 8.2 | Remove `reka-ui` from root | `package.json` | Remove from root workspace `dependencies` |
| 8.3 | Remove `@tailwindcss/vite` from devDependencies | `packages/vue/package.json` | No longer needed — Nuxt UI brings its own Tailwind |
| 8.4 | Remove `tailwindcss` from devDependencies | `packages/vue/package.json` | Nuxt UI brings Tailwind v4 as a transitive dependency |
| 8.5 | Simplify `generate-index.mjs` | `packages/vue/scripts/generate-index.mjs` | Only scan for the ~15 kept Mizu-specific components instead of all `.vue` files |
| 8.6 | Remove `@lucide/vue` if unused | `package.json` | Check if kept components still use lucide icons. MizuAlertDialog might still need them |
| 8.7 | Remove unused CSS | `packages/vue/src/index.css` | Clean up any stale CSS that was only relevant for Reka-based components |
| 8.8 | Version bump | `packages/vue/package.json` + root `package.json` | Bump to `0.16.0` (breaking change — consumers must migrate from `Mizu*` to `U*`) |

---

## Phase 9: Release

| # | Task | Details |
|---|------|---------|
| 9.1 | Update CHANGELOG | `src/content/docs/getting-started/changelog.mdx` — document all removed components, changed APIs, and migration notes |
| 9.2 | Update consumer migration guide | Add a migration guide section explaining how to migrate from `MizuButton` to `UButton`, including prop mapping tables |
| 9.3 | Write release notes | One-line summary, components removed, components kept, migration instructions, build stats |
| 9.4 | Git tag & release | `v0.16.0` — first Nuxt UI-based release |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Vite library mode + Nuxt UI plugin compatibility | Build fails | Test early (Phase 1.1). If `@nuxt/ui/vite` doesn't work in library mode, switch to explicit CSS import + manual component registration |
| Nuxt UI `@theme` conflicts with existing Mizu CSS variables | Visual regressions | Visual diff on docs site before/after each batch. Keep both theme systems side-by-side during transition |
| Toast composable API mismatch | Consumer breakage | Keep Mizu `useToast` API but re-implement internals using Nuxt UI toast primitives if needed |
| Auto-generated `index.ts` includes deleted components | Broken exports, build fails | Update `generate-index.mjs` before deleting files — either filter or rely on rebuild to regenerate |
| Astro + Nuxt UI Vite plugin conflict | Docs site build fails | Test `astro dev` early. If `@nuxt/ui/vite` and `@astrojs/vue` conflict, configure the docs site to load Nuxt UI CSS separately |
| Component docs reference APIs that no longer exist | Wrong documentation, confusing consumers | Update docs in the same batch as component deletion. Never delete without also updating the corresponding docs page |

---

## Execution Checklist (Per Batch)

For each deletion batch in Phase 3, follow this procedure:

```markdown
- [ ] 1. Identify all .vue files in the batch
- [ ] 2. Check if any kept Mizu components import from these files
     (e.g. MizuToastProvider imports MizuButton)
- [ ] 3. If cross-imports exist, update the importing file first
- [ ] 4. Delete the .vue files
- [ ] 5. Run `pnpm --filter @mizu/vue build` to regenerate index.ts
- [ ] 6. Run `pnpm --filter @mizu/vue typecheck` to check types
- [ ] 7. Update corresponding docs (MDX + demo component) in the same batch
- [ ] 8. Verify `pnpm --filter @mizu/vue build` still passes
```

---

## Component Mapping Reference

### Mizu Prop → Nuxt UI Prop Mapping (for docs updates)

When updating docs examples, use these equivalences:

| Mizu Prop | Nuxt UI Prop | Notes |
|-----------|-------------|-------|
| `variant="primary"` | `color="primary"` | Nuxt UI uses `color` instead of `variant` |
| `variant="outline"` | `variant="outline"` | Same prop name for buttons |
| `variant="ghost"` | `variant="ghost"` | Same |
| `size="sm"` | `size="sm"` | Same sizing scale (sm/md/lg) |
| `block` | `block` | Same prop for full-width |
| `loading` | `loading` | Same prop |
| `disabled` | `disabled` | Same |
| `square` | `square` | Same for icon-only mode |
| `title` | `title` | Same for compound components |
| `description` | `description` | Same |
| `close` | `close` | Same for dialog/modal |
| `v-model:open` | `v-model:open` | Same pattern for overlay components |
| `v-model` | `v-model` | Same for form inputs |
| `asChild` | `as-child` | Nuxt UI uses kebab-case for this prop |
| `ui` (slot class overrides) | `class` + `ui` | Nuxt UI has a similar `ui` prop pattern |
