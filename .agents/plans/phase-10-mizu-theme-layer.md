# Phase 10: Mizu Theme Layer — Component Defaults

## Goal

Apply Mizu's design language (sizing, spacing, radius, typography) to Nuxt UI v4 components so that consumers get Mizu-styled components when using `<UButton>`, `<UCard>`, `<UInput>`, etc. — without needing `Mizu*` wrapper components.

## Architecture

Nuxt UI v4 uses an **`app.config.ts`-based theme system**. Component defaults (padding, font-size, border-radius, etc.) are defined as Tailwind classes in the theme config, not as CSS custom properties. The `@nuxt/ui/vite` plugin reads this config at build time and generates the corresponding CSS.

### How It Works

```
Consumer's app.config.ts
        │
        ▼
  @nuxt/ui/vite plugin  ◄──  Mizu theme preset (@mizu/vue/theme)
        │
        ▼
  Tailwind CSS with Nuxt UI + Mizu overrides
        │
        ▼
  All <UComponent> instances get Mizu styling automatically
```

### Export Strategy

`@mizu/vue` exports a **theme preset object** (`@mizu/vue/theme`) that consumers merge into their config:

```ts
// Consumer's app.config.ts (Nuxt)
import { mizuTheme } from "@mizu/vue/theme";

export default defineAppConfig({
  ui: mizuTheme,
});
```

```ts
// Consumer's main.ts (Vue)
import { mizuTheme } from "@mizu/vue/theme";
app.use(nuxtUI, { theme: mizuTheme });
```

### What Can Be Themed

Nuxt UI v4's theme API per component exposes:

| Layer | Example | How to override |
|-------|---------|-----------------|
| **Slots** | `base`, `label`, `leadingIcon` | Tailwind classes |
| **Variants** | `size`, `color`, `variant` | Tailwind classes per variant |
| **CompoundVariants** | `color: 'primary'` + `variant: 'solid'` | Combined Tailwind classes |
| **DefaultVariants** | `size: 'md'`, `color: 'primary'` | Which variant is default |

### What's Already Done (Phase 1-2)

- ✅ **Color palette** — Mizu tokens mapped to Nuxt UI semantic colors via `@theme` in `index.css`
- ✅ **Container width** — `--ui-container: 1040px`
- ✅ **Font families** — `--font-family-sans/mono/serif` mapped
- ✅ **Radius tokens** — Available in `@mizu/tokens`

### What Needs Doing

- ❌ **Per-component sizing defaults** — Button heights, input padding, badge sizing
- ❌ **Per-component radius defaults** — Button corners, card corners, input corners
- ❌ **Per-component spacing** — Icon gaps, label spacing
- ❌ **Variant mapping** — Mizu variant names → Nuxt UI variant names
- ❌ **Size scale mapping** — Mizu's sm/md/lg → Nuxt UI's xs/sm/md/lg/xl

---

## Size Scale Mapping

Mizu uses a compact size scale (sm/md/lg). Nuxt UI uses a wider scale (xs/sm/md/lg/xl). We need to map Mizu values to the closest Nuxt UI sizes:

| Mizu | Mizu Height | Nuxt UI | Nuxt UI (Tailwind) | Action |
|------|------------|---------|--------------------|--------|
| — | — | `xs` | `px-2 py-1 text-xs` | Keep as extra small |
| `sm` | 28px | `sm` | `px-2.5 py-1.5 text-xs` | Override to match Mizu 28px |
| `md` | 36px | `md` | `px-2.5 py-1.5 text-sm` | Override to match Mizu 36px |
| `lg` | 40px | `lg` | `px-3 py-2 text-sm` | Override to match Mizu 40px |
| — | — | `xl` | `px-3 py-2 text-base` | Keep as extra large |

**Design decision:** Override Nuxt UI's `sm`/`md`/`lg` to match Mizu's exact dimensions. Keep `xs` and `xl` as-is for consumers who need them.

---

## Component Mapping — Priority 1

### 1. Button

**Mizu spec (from old MizuButton docs):**

| Size | Height | H-Padding | V-Padding | Gap | Radius | Font | Icon |
|------|--------|-----------|-----------|-----|--------|------|------|
| SM | 28px | 8px | 8px | 4px | 4px | 10px | 10px |
| MD | 36px | 10px | 10px | 6px | 6px | 12px | 16px |
| LG | 40px | 10px | 10px | 8px | 6px | 14px | 20px |

**Nuxt UI theme keys to override:**

```ts
ui: {
  button: {
    variants: {
      size: {
        sm: { base: 'px-2 py-1 text-[10px] gap-1 rounded-sm', leadingIcon: 'size-2.5', trailingIcon: 'size-2.5' },
        md: { base: 'px-2.5 py-2.5 text-xs gap-1.5 rounded-[6px]', leadingIcon: 'size-4', trailingIcon: 'size-4' },
        lg: { base: 'px-2.5 py-2.5 text-sm gap-2 rounded-[6px]', leadingIcon: 'size-5', trailingIcon: 'size-5' },
      }
    },
    defaultVariants: { size: 'md', color: 'primary', variant: 'solid' }
  }
}
```

**Notes:**
- Mizu used `primary`/`accent`/`ghost`/`outline` + feedback variants. Nuxt UI uses `solid`/`outline`/`soft`/`subtle`/`ghost`/`link`.
- Map: Mizu `primary` → `solid`, Mizu `accent` → `solid` + `secondary` color, Mizu `ghost` → `ghost`, Mizu `outline` → `outline`.

### 2. Badge

**Mizu spec:**

| Property | sm | md |
|----------|----|----|
| Min Width | 16px | 20px |
| Height | 16px | 20px |
| H-Padding | 4px | 6px |
| Font Size | 10px | 11px |
| Radius | 8px | 10px |
| Font Weight | 500 | 500 |

**Nuxt UI theme overrides:**

```ts
ui: {
  badge: {
    variants: {
      size: {
        sm: { base: 'text-[10px]/3 px-1 py-0.5 gap-1 rounded-lg', leadingIcon: 'size-3', trailingIcon: 'size-3' },
        md: { base: 'text-[11px] px-1.5 py-1 gap-1 rounded-[10px]', leadingIcon: 'size-4', trailingIcon: 'size-4' },
      }
    },
    defaultVariants: { size: 'md' }
  }
}
```

**Notes:**
- Mizu Badge used `variant` for color (`primary`/`accent`/`success`/...). Nuxt UI uses `color` for color + `variant` for style (`solid`/`outline`/`soft`/`subtle`).
- Mizu Badge also had `dot` mode. Nuxt UI supports this natively — no override needed.

### 3. Input

**Mizu spec:**

| Size | Height | H-Padding | Radius |
|------|--------|-----------|--------|
| SM | 28px | 8px | 4px |
| MD | 36px | 10px | 6px |
| LG | 40px | 10px | 6px |

**Notes:**
- Inputs share the same height scale as buttons for alignment.
- Mizu had `label`, `helperText`, `error` as built-in props. Nuxt UI uses `UFormField` wrapper instead.
- Focus ring: Mizu used `brand-ycp` border + box-shadow.

### 4. Card

**Mizu spec:** Rounded corners (`radius-default`: 6px), surface background, subtle border.

**Nuxt UI theme overrides:** Set `defaultVariants: { variant: 'outline' }`, adjust padding if needed.

---

## Component Mapping — Priority 2

### 5. Modal (was MizuDialog)

Mizu Dialog had: header/body/footer layout, overlay opacity, transition timing. Nuxt UI Modal matches this structure natively — we mainly override padding and radius.

### 6. Select

Inherits Input sizing + adds dropdown styling. Override to match Input dimensions.

### 7. Checkbox / Switch / Textarea

These inherit from the Input/form scale. Override sizing to match.

---

## Implementation Phases

### Phase 10a — Foundation

| # | Task | Details |
|---|------|---------|
| 10a.1 | Create `packages/vue/src/theme.ts` | Export `mizuTheme` preset object |
| 10a.2 | Add `exports` entry in `package.json` | `"./theme": "./dist/theme.js"` + types |
| 10a.3 | Update `vite.config.ts` | Add `theme.ts` to library entry or separate build |
| 10a.4 | Add `auto-imports.d.ts` and `components.d.ts` to `.gitignore` | Generated files shouldn't be committed |

### Phase 10b — Priority 1 Components

| # | Component | Theme Keys | Source Spec |
|---|-----------|-----------|-------------|
| 10b.1 | **Button** | `button.variants.size`, `button.defaultVariants` | MizuButton docs (28/36/40px) |
| 10b.2 | **Badge** | `badge.variants.size`, `badge.defaultVariants` | MizuBadge docs (16/20px) |
| 10b.3 | **Input** | `input.variants.size` | MizuInput docs (28/36/40px) |
| 10b.4 | **Card** | `card.defaultVariants` | MizuCard docs |

### Phase 10c — Priority 2 Components

| # | Component | Theme Keys |
|---|-----------|-----------|
| 10c.1 | **Modal** | `modal.slots` (padding) |
| 10c.2 | **Select** | `selectMenu.variants.size` |
| 10c.3 | **Checkbox** | `checkbox.variants.size` |
| 10c.4 | **Switch** | `switch.variants.size` |
| 10c.5 | **Textarea** | `textarea.variants.size` |

### Phase 10d — Priority 3

| # | Component |
|---|-----------|
| 10d.1 | Avatar, Tabs, Tooltip, Popover |
| 10d.2 | DropdownMenu, Kbd, Divider, Progress |
| 10d.3 | Breadcrumb, Pagination |
| 10d.4 | Add global defaults to `index.css` (focus ring, transition presets) |

### Phase 10e — Documentation Rebuild ✅

Recreate component docs pages (deleted in Phase 8) updated for Nuxt UI's `<UComponent>` format with Mizu design specs and usage examples.

**Status: Priority 1 complete (Button, Badge, Input, Card)**

**Docs structure per component:**

1. **Overview** — What the component does, note Mizu styling applies via theme preset
2. **Examples** — Demo component showing variants and states
3. **API** — Props/slots/events table (reference Nuxt UI, note Mizu defaults)
4. **Theme / Design Specs** — Sizing table, color map, typography, radius, icon sizes
5. **Anatomy** — Visual breakdown of component parts
6. **Implementation Notes** — Usage with Mizu theme, gotchas

**Sidebar organization:**

| Category | Pages |
|----------|-------|
| **Element** | Button, Badge, Card, Skeleton (existing), Avatar, Kbd, Divider, Progress |
| **Forms** | Input, Select, Checkbox, Switch, Textarea, Form (existing), Validation Patterns (existing) |
| **Overlay** | Modal, AlertDialog (existing), Tooltip, Popover, DropdownMenu |
| **Data** | DashList (existing), DataTable (existing), Metric (existing), Quote (existing) |
| **Layout** | Tabs, Breadcrumb, Pagination |

| # | Task | Details |
|---|------|---------|
| 10e.1 | Create docs directories | ✅ Already existed — `element/`, `forms/`, `overlay/` directories present |
| 10e.2 | Create demo components | ✅ Created ButtonDemo, BadgeDemo, InputDemo, CardDemo (plain HTML, not Nuxt UI imports — Astro can't resolve `@nuxt/ui`) |
| 10e.3 | Write MDX docs — Priority 1 | ✅ Button, Badge, Input, Card — full specs + examples + demo components |
| 10e.4 | Write MDX docs — Priority 2 | Modal, Select, Checkbox, Switch, Textarea (deferred to Phase 10c) |
| 10e.5 | Write MDX docs — Priority 3 | Avatar, Tabs, Tooltip, Popover, DropdownMenu, Kbd, Divider, Progress, Breadcrumb, Pagination |
| 10e.6 | Update sidebar | ✅ Added Button, Badge, Card, Input, Forms section to sidebar |
| 10e.7 | Update migration guide | Add theme preset setup to `migration.mdx` |
| 10e.8 | Update homepage | Update `ComponentsSection.astro` to reflect new doc pages |

---

## Files to Create/Modify

### Create

| File | Purpose |
|------|---------|
| `packages/vue/src/theme.ts` | Mizu theme preset object |
| `.agents/plans/phase-10-mizu-theme-layer.md` | This plan |
| `src/components/docs/ButtonDemo.vue` | Button demo (Priority 1) |
| `src/components/docs/BadgeDemo.vue` | Badge demo (Priority 1) |
| `src/components/docs/InputDemo.vue` | Input demo (Priority 1) |
| `src/components/docs/CardDemo.vue` | Card demo (Priority 1) |
| `src/content/docs/components/element/button.mdx` | Button docs page |
| `src/content/docs/components/element/badge.mdx` | Badge docs page |
| `src/content/docs/components/element/card.mdx` | Card docs page |
| `src/content/docs/components/element/avatar.mdx` | Avatar docs page (P3) |
| `src/content/docs/components/element/kbd.mdx` | Kbd docs page (P3) |
| `src/content/docs/components/element/divider.mdx` | Divider docs page (P3) |
| `src/content/docs/components/element/progress.mdx` | Progress docs page (P3) |
| `src/content/docs/components/forms/input.mdx` | Input docs page |
| `src/content/docs/components/forms/select.mdx` | Select docs page (P2) |
| `src/content/docs/components/forms/checkbox.mdx` | Checkbox docs page (P2) |
| `src/content/docs/components/forms/switch.mdx` | Switch docs page (P2) |
| `src/content/docs/components/forms/textarea.mdx` | Textarea docs page (P2) |
| `src/content/docs/components/overlay/modal.mdx` | Modal docs page (P2) |
| `src/content/docs/components/overlay/tooltip.mdx` | Tooltip docs page (P3) |
| `src/content/docs/components/overlay/popover.mdx` | Popover docs page (P3) |
| `src/content/docs/components/overlay/dropdown-menu.mdx` | DropdownMenu docs page (P3) |
| `src/content/docs/components/layout/tabs.mdx` | Tabs docs page (P3) |
| `src/content/docs/components/layout/breadcrumb.mdx` | Breadcrumb docs page (P3) |
| `src/content/docs/components/layout/pagination.mdx` | Pagination docs page (P3) |

### Modify

| File | Change |
|------|--------|
| `packages/vue/package.json` | Add `"./theme"` exports + types |
| `packages/vue/vite.config.ts` | Add theme.ts multi-entry build config |
| `packages/vue/src/index.css` | Add global defaults (focus ring, transition presets) |
| `.gitignore` | Add `auto-imports.d.ts`, `components.d.ts` |
| `astro.config.mjs` | Add all new doc pages to sidebar |
| `src/components/home/ComponentsSection.astro` | Update homepage component cards |
| `src/content/docs/getting-started/migration.mdx` | Add theme preset setup instructions |

---

## Validation

For each phase:

| Check | Command | Notes |
|-------|---------|-------|
| Build | `pnpm --filter @mizu/vue build` | Ensure theme.ts compiles and exports |
| Typecheck | `pnpm --filter @mizu/vue typecheck` | No type errors in theme or components |
| Tests | `pnpm --filter @mizu/vue test` | Existing tests still pass |
| Docs build | `pnpm build` (full monorepo) | All MDX pages build, no broken links |
| Visual | Check Histoire stories for component sizing | Spot-check button/badge/input sizing matches specs |
| Docs visual | `pnpm dev` and inspect new docs pages | Verify examples render, specs are accurate |

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Consumer doesn't apply theme preset | Components use Nuxt UI defaults, not Mizu style | Document clearly in migration guide; make it a one-liner |
| Theme preset conflicts with consumer's own overrides | Visual glitches | Use `deepmerge`-style composition; document override priority |
| Nuxt UI theme API changes between v4 minor versions | Theme preset breaks on Nuxt UI update | Pin Nuxt UI peer dep; test against latest |
| Multi-entry build complexity | Build config for theme.ts separate from main index.ts | Use Vite library mode with multiple entries or a separate build step |
| Demo components can't auto-import `<UComponent>` in Astro | Docs site build fails | Astro site uses `@astrojs/vue` without `@nuxt/ui/vite` — demo components must import U* components from `@nuxt/ui` explicitly or use HTML equivalents |

---

## Out of Scope

- Creating `Mizu*` wrapper components — consumers use `<UComponent>` directly
- Overriding every possible Nuxt UI component — focus on the most commonly used ones first
- Dark mode overrides — tokens already handle light/dark via `@mizu/tokens`
