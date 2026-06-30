# Mizu Design System — Plan

## Overview

A multi-framework design system built on DTCG tokens. Serves as both a documentation site (Astro + Tailwind v4) and a component library (Vue via Reka UI, React via shadcn/ui + ReUI).

## Repository Structure

```
mizu/
├── packages/
│   ├── tokens/              @mizu/tokens     — JS/TS token exports from tokens.json
│   ├── vue/                 @mizu/vue        — Vue 3 + Reka UI components
│   └── react/               @mizu/react      — React + shadcn/ui + ReUI (future)
├── public/                                        — Static assets (faq.js)
├── src/
│   ├── components/                                — Astro documentation components
│   ├── layouts/
│   ├── pages/
│   ├── scripts/
│   └── styles/global.css                          — Tailwind v4 @theme + component CSS
├── tokens.json                                    — DTCG canonical token source
├── pnpm-workspace.yaml
├── package.json
└── astro.config.mjs
```

## Token System

Single source of truth: `tokens.json` (DTCG format, `$value` / `$type` / `$description`) → consumed by `@mizu/tokens` build → emitted as CSS for every consumer.

### Pipeline

```
tokens.json (DTCG)
  └─→ packages/tokens/src/build.ts
        ├─→ dist/index.ts              typed TS exports + cssVariables map
        └─→ dist/{light,dark}.css      raw CSS custom properties (`:root` / `[data-theme="dark"]`)
        └─→ dist/tailwind.css          Tailwind v4 `@theme` block + dark overrides
        └─→ dist/starlight.css         `--sl-*` mappings → Mizu `--color-*` tokens
```

### Consumers

| Consumer | Imports | Purpose |
|---|---|---|
| `packages/vue/src/index.css` | `@mizu/tokens/light.css` + `dark.css` (in `layer(base)`) | Vue components read `var(--color-*)` |
| `src/styles/tokens.css` | `@mizu/tokens/tailwind.css` | Marketing pages use Tailwind utilities like `bg-surface-base` |
| `astro.config.mjs` `customCss` → `src/styles/starlight.css` | `@mizu/tokens/starlight.css` | Starlight pages read `var(--sl-*)` which resolve to Mizu tokens |

### Categories

13 token categories: color, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, spacing, borderRadius, shadow, sizing, zIndex, duration, breakpoint.

### Color groups

`brand` (primary/secondary/accent + variants), `surface` (base/subtle/muted), `foreground` (primary/secondary/tertiary/inverse), `feedback` (success/error/warning/info × base/hover/focus/subtle).

Each color has a light and dark variant. The dark variant path drops the `dark` segment in the emitted CSS var name so the same `--color-*` is overridden by `[data-theme="dark"] { ... }`.

### Naming convention

| Token type | Pattern | Example |
|---|---|---|
| Surface colors | `--color-surface-{variant}` | `bg-surface-base`, `border-surface-muted` |
| Foreground colors | `--color-foreground-{variant}` | `text-foreground-primary`, `text-foreground-secondary` |
| Brand colors | `--color-brand-{variant}` | `bg-brand-primary`, `text-brand-accent` |
| Feedback colors | `--color-feedback-{type}-{variant}` | `bg-feedback-error-subtle`, `text-feedback-success-base` |

### Tailwind v4 `@theme` mapping

| Token category | CSS namespace |
|---|---|
| `color` | `--color-*` |
| `fontFamily` | `--font-family-*` (+ `--font-sans`/`--font-mono`/`--font-serif` aliases) |
| `fontSize` | `--text-*` |
| `fontWeight` | `--font-weight-*` |
| `lineHeight` | `--leading-*` |
| `letterSpacing` | `--tracking-*` |
| `spacing` | `--spacing-*` |
| `borderRadius` | `--radius-*` |
| `shadow` | `--shadow-*` |
| `sizing` | `--sizing-*` |
| `zIndex` | `--z-*` |
| `duration` | `--duration-*` |
| `breakpoint` | `--breakpoint-*` |

### Starlight mapping

`starlight.css` emits `--sl-color-*` variables in both light and dark blocks that resolve to Mizu tokens. The 9-step gray ramp Starlight requires is hardcoded in the generated file (Mizu does not emit one) — kept here so this file remains the single source for Starlight theming.

## Phase 1: @mizu/tokens (packages/tokens/)

- Script extracts `tokens.json` → typed JS/TS exports
- Used by both Vue and React packages
- Avoids runtime JSON parsing

## Phase 2: @mizu/vue (packages/vue/)

**Stack**: Vue 3 + TypeScript + Reka UI v2.9 + Vite library mode

Each component:
- Wraps a Reka UI primitive (or native element where none exists)
- Accepts a `class` prop for Tailwind overrides
- Uses Mizu token classes directly (`text-foreground-primary`, `bg-surface-base`, etc.)
- Fully typed with `<script setup lang="ts">`
- Published as ESM + CJS, tree-shakeable

### Batch 1 components (complete)

| Component | Reka primitive | Key props |
|---|---|---|
| `MizuButton` | native button | `variant` (primary/accent/ghost), `size` (sm/md/lg), `disabled`, `loading` |
| `MizuTag` | native span | `variant` (all 7 feedback colors + brand), `closable` |
| `MizuCard` | native div | `variant` (default/featured), `padding` |
| `MizuInput` | TextField | `modelValue`, `placeholder`, `disabled`, `error`, `type` |
| `MizuSelect` | Select | `modelValue`, `options`, `placeholder`, `disabled` |
| `MizuTextarea` | Textarea | `modelValue`, `placeholder`, `disabled`, `rows` |
| `MizuCheckbox` | Checkbox | `modelValue`, `disabled`, `indeterminate`, `label` |
| `MizuRadio` | RadioGroup | `modelValue`, `options`, `disabled`, `orientation` |
| `MizuSwitch` | Switch | `modelValue`, `disabled`, `label` |
| `MizuAlert` | native div | `variant` (success/error/warning/info), `title`, `closable` |
| `MizuAvatar` | Avatar | `src`, `alt`, `fallback`, `size` |
| `MizuDivider` | Separator | `orientation` (horizontal/vertical), `label` |
| `MizuProgress` | Progress | `modelValue`, `max`, `indeterminate` |
| `MizuQuote` | native blockquote | `cite`, `accent` |
| `MizuDashList` | native ul | `items: string[]` |
| `MizuMetric` | native div | `value`, `label`, `color` |

### Batch 2a — Core ERP Components (planned)

**Version**: `@mizu/vue` → `0.8.0`

**New dependencies**:
- `@tanstack/vue-table` — DataTable logic (sorting, filtering, pagination, row selection)
- `@internationalized/date` — DatePicker (required by Reka UI DatePicker)
- `@internationalized/number` — NumberField locale formatting

```bash
pnpm --filter @mizu/vue add @tanstack/vue-table @internationalized/date @internationalized/number
```

**Implementation order**: Breadcrumb → Pagination → DataTable → Tooltip → Dialog → AlertDialog → Toast → DropdownMenu → Tabs → Combobox → NumberField → DatePicker

| # | Component | Reka primitive | Key props |
|---|-----------|---------------|-----------|
| 1 | `MizuBreadcrumb` | native HTML | `items: BreadcrumbItem[]`, `separator` (/ > ·), `size` (sm/md/lg) |
| 2 | `MizuPagination` | Pagination | `page` (v-model), `total`, `siblingCount`, `showEdges`, `size` |
| 3 | `MizuDataTable` | @tanstack/vue-table | `columns: ColumnDef[]`, `data`, `sortable`, `selectable`, `loading`, `pageSize`. Supports both props-only and slot-based cell rendering. |
| 4 | `MizuTooltip` | Tooltip | `content`, `side`, `delayDuration`, `sideOffset` |
| 5 | `MizuDialog` | Dialog | `open` (v-model), `title`, `description`, `size`. Slots: #trigger, #default, #close |
| 6 | `MizuAlertDialog` | AlertDialog | `open` (v-model), `title`, `description`, `confirmText`, `cancelText`, `variant` (danger/warning/info) |
| 7 | `MizuToast` | Toast | `variant`, `title`, `description`, `duration`, `action`. Both composable (`useToast()`) and component API. Requires `<ToastProvider>` + `<ToastViewport>` in app root. |
| 8 | `MizuDropdownMenu` | DropdownMenu | `items: DropdownMenuItem[]`. Supports #trigger slot. |
| 9 | `MizuTabs` | Tabs | `tabs: Tab[]`, `modelValue`, `defaultValue`, `orientation`, `size` |
| 10 | `MizuCombobox` | Combobox | `modelValue`, `options`, `placeholder`, `disabled`, `error`, `multiple`, `size` |
| 11 | `MizuNumberField` | NumberField | `modelValue`, `min`, `max`, `step`, `formatOptions`, `size` |
| 12 | `MizuDatePicker` | DatePicker (Alpha) | `modelValue`, `placeholder`, `disabled`, `error`, `size`, `granularity` (day/month/year) |

#### MizuBreadcrumb

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;       // if omitted, renders as current page (aria-current="page")
  icon?: Component;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "/" | ">" | "·" | Component;
  size?: "sm" | "md" | "lg";
}
```

#### MizuDataTable

```typescript
import type { ColumnDef, SortingState, VisibilityState } from "@tanstack/vue-table";

interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  sortable?: boolean;
  selectable?: boolean;
  loading?: boolean;
  emptyText?: string;
  pageSize?: number;
  page?: number;            // v-model:page
  totalRows?: number;
}

// Slots: #cell-{accessorKey}, #empty, #loading, #header
// Events: update:page, sortingChange, rowSelect
```

#### MizuCombobox

```typescript
interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: Component;
}

interface ComboboxProps {
  modelValue?: string | string[];
  options: ComboboxOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  multiple?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  helperText?: string;
  searchable?: boolean;     // default true
}
```

#### MizuNumberField

```typescript
interface NumberFieldProps {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  formatOptions?: Intl.NumberFormatOptions;
  disabled?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  helperText?: string;
  placeholder?: string;
}
```

#### MizuDatePicker

```typescript
import type { DateValue } from "@internationalized/date";

interface DatePickerProps {
  modelValue?: DateValue;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  helperText?: string;
  granularity?: "day" | "month" | "year";
}
```

#### MizuDialog

```typescript
interface DialogProps {
  open?: boolean;          // v-model:open
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}
// Slots: #trigger, #default (content), #close
```

#### MizuAlertDialog

```typescript
interface AlertDialogProps {
  open?: boolean;          // v-model:open
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}
// Events: confirm, cancel
```

#### MizuToast

```typescript
// Provider wraps app, ToastProvider + ToastViewport
interface ToastProps {
  variant?: "success" | "error" | "warning" | "info";
  title?: string;
  description?: string;
  duration?: number;       // auto-close ms
  action?: { label: string; onClick: () => void };
}
// Composable: useToast() — toast.success("msg"), toast.error("msg")
```

#### MizuTabs

```typescript
interface Tab {
  value: string;
  label: string;
  icon?: Component;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  modelValue?: string;     // v-model:activeTab
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
}
// Slots: #tab-{value} for each tab's content
```

#### MizuDropdownMenu

```typescript
interface DropdownMenuItem {
  label: string;
  icon?: Component;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
}

interface DropdownMenuProps {
  trigger?: string;        // trigger label or use #trigger slot
  items: DropdownMenuItem[];
}
// Events: select(item)
```

#### MizuTooltip

```typescript
interface TooltipProps {
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
  sideOffset?: number;
}
// Default slot: the trigger element
```

#### MizuPagination

```typescript
interface PaginationProps {
  page: number;            // v-model:page
  total: number;           // total pages
  siblingCount?: number;   // default 1
  showEdges?: boolean;     // default false
  size?: "sm" | "md" | "lg";
}
```

### Batch 2b — Supporting Components (deferred)

| # | Component | Reka primitive | Key props |
|---|-----------|---------------|-----------|
| 13 | `MizuAccordion` | Accordion | `items`, `type` (single/multiple), `collapsible` |
| 14 | `MizuPopover` | Popover | `open` (v-model), `side`, `sideOffset`, `align` |
| 15 | `MizuCollapsible` | Collapsible | `open` (v-model), `disabled` |
| 16 | `MizuTagsInput` | TagsInput | `modelValue`, `placeholder`, `max`, `delimiter`, `size` |
| 17 | `MizuSlider` | Slider | `modelValue`, `min`, `max`, `step`, `orientation`, `size` |
| 18 | `MizuToggleGroup` | ToggleGroup | `modelValue`, `options`, `type` (single/multiple), `size` |
| 19 | `MizuScrollArea` | ScrollArea | `orientation`, `maxHeight`, `maxWidth` |
| 20 | `MizuNavigationMenu` | NavigationMenu | `items`, `orientation`, `size` |

## Phase 3: @mizu/react (packages/react/) — future

**Stack**: React 19 + TypeScript + shadcn/ui + ReUI registry

Approach:
1. Initialize shadcn/ui with CSS variables mapped to Mizu token values
2. Install ReUI components via `shadcn add @reui/...`
3. Components land as local source files; customize and re-export as `@mizu/react`
4. Custom Mizu tokens (warning, info, success, subtle variants) added via shadcn's "Adding New Tokens" pattern

CSS variable mapping (one-way adapter):

| shadcn variable | Mizu token |
|---|---|
| `--background` / `--foreground` | `surface-base` / `foreground-primary` |
| `--primary` / `--primary-foreground` | `brand-primary` / `foreground-inverse` |
| `--accent` / `--accent-foreground` | `brand-accent` / `foreground-inverse` |
| `--secondary` / `--secondary-foreground` | `surface-muted` / `foreground-secondary` |
| `--muted` / `--muted-foreground` | `surface-subtle` / `foreground-tertiary` |
| `--destructive` | `feedback-error-base` |
| `--border` / `--ring` | `surface-muted` / `brand-accent` |
| `--radius` | `0.5rem` (8px) |

## Key Decisions

- **DTCG format** for `tokens.json` with `$value`, `$type`, `$description`
- **Tailwind v4** via `@tailwindcss/vite` plugin (not PostCSS)
- **Vue components**: Reka UI primitives for accessibility; Mizu token classes for styling
- **React components**: shadcn/ui + ReUI; Mizu tokens injected via CSS variable overrides
- **Monorepo**: pnpm workspaces with `packages/*`
- **Docs site**: Astro 5, uses Mizu's own Tailwind classes (not shadcn semantic classes)
- **Single token source**: `@mizu/tokens` is consumed by every package and the docs site — no duplicate hardcoded values anywhere
- **Token naming**: canonical CSS vars are `--color-{group}-{variant}` with full kebab-case path. Feedback colors keep the `feedback` segment (e.g. `--color-feedback-success-base`); previously the docs used the short form `--color-success-base`, now removed
- **`@mizu/tokens` 0.7.0** aligns with root version; `@mizu/vue` 0.7.0 (Batch 1), 0.8.0 (Batch 2a)
- **DataTable**: Uses `@tanstack/vue-table` for sorting, filtering, pagination, row selection. Supports both props-only and slot-based cell rendering.
- **Toast**: Dual API — composable (`useToast()`) for programmatic triggers, and component (`<MizuToast>`) for template use. Requires `<ToastProvider>` + `<ToastViewport>` at app root.
- **DatePicker**: Uses Reka UI's DatePicker primitive (Alpha status). Accepts API stability risk.
- **Batch 2b deferred** — supporting components (Accordion, Popover, Collapsible, TagsInput, Slider, ToggleGroup, ScrollArea, NavigationMenu) planned for later
- **No showcase page yet** — deferred to a later phase

## Sample Pages (Future)

Mizu product pages that exercise the full component set and demonstrate ERP UI patterns:

| Page | Primary UX pattern | Components exercised |
|---|---|---|
| Login | Auth form | Input, Button, Checkbox, Alert, Card |
| Dashboard | Data overview | Metric, Tag, Avatar, Progress, DashList, Tabs, DataTable |
| Customer List | CRUD table | DataTable, Pagination, DropdownMenu, Breadcrumb, Dialog, Toast |
| Order Form | Complex form | Input, NumberField, DatePicker, Combobox, Select, Button, AlertDialog |

Each page lives in `src/pages/samples/` and imports components from `@mizu/vue` (or directly from `src/components/ui/` when the Vue package isn't ready).

### Form Validation (Future)

Validation will be demonstrated through the sample pages rather than baked into `MizuInput`. The component stays a controlled primitive (`v-model` + `error` + `helperText` props) and consumers plug in their own validation layer.

Candidate approaches to evaluate when implementing the Login page:
- Hand-rolled composables using `ref` + `computed` (no dependency)
- VeeValidate + `@vee-validate/zod` (popular Vue form library with schema support)
- Zod schemas wrapped in a thin `useMizuField` composable

A "Validation patterns" section may also be added to the Input demo showing required / email format / min length / password match examples without a library.

## Deferred

### MizuSkeleton (removed — planned for future)

Loading placeholder component that wraps content and shows skeleton shapes while data loads.

**Why deferred**: The current implementation doesn't meet the visual bar for a loading indicator. Revisit when a more polished shimmer/pulse animation pipeline is established.

**Design retained for future implementation**:

| Prop | Type | Purpose |
|------|------|---------|
| `loading` | boolean | `true` → show skeleton, `false` → render `<slot>` content |
| `variant` | `"text" \| "circle" \| "rect"` | Placeholder shape |
| `lines` | number | Multi-line text stack (last line 60% width) |
| `animation` | `"shimmer" \| "pulse" \| "none"` | Loading animation style |
| `baseColor` / `highlightColor` | string | Themeable skeleton colors |
| `animationDuration` / `animationDirection` | number / string | Animation tuning |

**Provider**: `MizuSkeletonTheme` — sets defaults for all child skeletons via `provide`/`inject`.

**Package files** (deactivated, kept for reference):
- `packages/vue/src/components/MizuSkeleton.vue`
- `packages/vue/src/components/MizuSkeletonTheme.vue`
- `packages/vue/src/components/skeleton-types.ts`
- `src/components/docs/SkeletonDemo.vue`
- `src/content/docs/components/skeleton.mdx`

## Build & Dev

```bash
pnpm dev          # Astro docs site (localhost)
pnpm build        # Build docs site → dist/
pnpm preview      # Preview built docs site
```

Package builds (once scaffolded):

```bash
pnpm --filter @mizu/tokens build
pnpm --filter @mizu/vue build
pnpm --filter @mizu/react build
```

## Design Files

- Figma (coming soon)
