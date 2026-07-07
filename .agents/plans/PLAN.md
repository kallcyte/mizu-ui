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

| Consumer                                                    | Imports                                                  | Purpose                                                         |
| ----------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| `packages/vue/src/index.css`                                | `@mizu/tokens/light.css` + `dark.css` (in `layer(base)`) | Vue components read `var(--color-*)`                            |
| `src/styles/tokens.css`                                     | `@mizu/tokens/tailwind.css`                              | Marketing pages use Tailwind utilities like `bg-surface-base`   |
| `astro.config.mjs` `customCss` → `src/styles/starlight.css` | `@mizu/tokens/starlight.css`                             | Starlight pages read `var(--sl-*)` which resolve to Mizu tokens |

### Categories

13 token categories: color, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, spacing, borderRadius, shadow, sizing, zIndex, duration, breakpoint.

### Color groups

`brand` (primary/secondary/accent + variants), `surface` (base/subtle/muted), `foreground` (primary/secondary/tertiary/inverse), `feedback` (success/error/warning/info × base/hover/focus/subtle).

Each color has a light and dark variant. The dark variant path drops the `dark` segment in the emitted CSS var name so the same `--color-*` is overridden by `[data-theme="dark"] { ... }`.

### Naming convention

| Token type        | Pattern                             | Example                                                  |
| ----------------- | ----------------------------------- | -------------------------------------------------------- |
| Surface colors    | `--color-surface-{variant}`         | `bg-surface-base`, `border-surface-muted`                |
| Foreground colors | `--color-foreground-{variant}`      | `text-foreground-primary`, `text-foreground-secondary`   |
| Brand colors      | `--color-brand-{variant}`           | `bg-brand-primary`, `text-brand-ycp`                     |
| Feedback colors   | `--color-feedback-{type}-{variant}` | `bg-feedback-error-subtle`, `text-feedback-success-base` |

### Tailwind v4 `@theme` mapping

| Token category  | CSS namespace                                                            |
| --------------- | ------------------------------------------------------------------------ |
| `color`         | `--color-*`                                                              |
| `fontFamily`    | `--font-family-*` (+ `--font-sans`/`--font-mono`/`--font-serif` aliases) |
| `fontSize`      | `--text-*`                                                               |
| `fontWeight`    | `--font-weight-*`                                                        |
| `lineHeight`    | `--leading-*`                                                            |
| `letterSpacing` | `--tracking-*`                                                           |
| `spacing`       | `--spacing-*`                                                            |
| `borderRadius`  | `--radius-*`                                                             |
| `shadow`        | `--shadow-*`                                                             |
| `sizing`        | `--sizing-*`                                                             |
| `zIndex`        | `--z-*`                                                                  |
| `duration`      | `--duration-*`                                                           |
| `breakpoint`    | `--breakpoint-*`                                                         |

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

| Component      | Reka primitive    | Key props                                                                  |
| -------------- | ----------------- | -------------------------------------------------------------------------- |
| `MizuButton`   | native button     | `variant` (primary/accent/ghost), `size` (sm/md/lg), `disabled`, `loading` |
| `MizuTag`      | native span       | `variant` (all 7 feedback colors + brand), `closable`                      |
| `MizuCard`     | native div        | `variant` (default/featured), `padding`                                    |
| `MizuInput`    | TextField         | `modelValue`, `placeholder`, `disabled`, `error`, `type`                   |
| `MizuSelect`   | Select            | `modelValue`, `options`, `placeholder`, `disabled`                         |
| `MizuTextarea` | Textarea          | `modelValue`, `placeholder`, `disabled`, `rows`                            |
| `MizuCheckbox` | Checkbox          | `modelValue`, `disabled`, `indeterminate`, `label`                         |
| `MizuRadio`    | RadioGroup        | `modelValue`, `options`, `disabled`, `orientation`                         |
| `MizuSwitch`   | Switch            | `modelValue`, `disabled`, `label`                                          |
| `MizuAlert`    | native div        | `variant` (success/error/warning/info), `title`, `closable`                |
| `MizuAvatar`   | Avatar            | `src`, `alt`, `fallback`, `size`                                           |
| `MizuDivider`  | Separator         | `orientation` (horizontal/vertical), `label`                               |
| `MizuProgress` | Progress          | `modelValue`, `max`, `indeterminate`                                       |
| `MizuQuote`    | native blockquote | `cite`, `accent`                                                           |
| `MizuDashList` | native ul         | `items: string[]`                                                          |
| `MizuMetric`   | native div        | `value`, `label`, `color`                                                  |

### Batch 2a ✅ Core ERP Components

**Version**: `@mizu/vue` → `0.13.1`

**Dependencies** (already installed):

- `@tanstack/vue-table` — DataTable logic (sorting, filtering, pagination, row selection)
- `@internationalized/date` — DatePicker (required by Reka UI DatePicker)
- `@internationalized/number` — NumberField locale formatting

```bash
# already installed
```

**Implementation order** (all done): Breadcrumb → Pagination → DataTable → Tooltip → Dialog → AlertDialog → Toast → DropdownMenu → Tabs → Combobox → NumberField → DatePicker

| #   | Component          | Reka primitive      | Key props                                                                                                                                                              |
| --- | ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `MizuBreadcrumb`   | native HTML         | `items: BreadcrumbItem[]`, `separator` (/ > ·), `size` (sm/md/lg)                                                                                                      |
| 2   | `MizuPagination`   | Pagination          | `page` (v-model), `total`, `siblingCount`, `showEdges`, `size`                                                                                                         |
| 3   | `MizuDataTable`    | @tanstack/vue-table | `columns: ColumnDef[]`, `data`, `sortable`, `selectable`, `loading`, `pageSize`. Supports both props-only and slot-based cell rendering.                               |
| 4   | `MizuTooltip`      | Tooltip             | `content`, `side`, `delayDuration`, `sideOffset`                                                                                                                       |
| 5   | `MizuDialog`       | Dialog              | `open` (v-model), `title`, `description`, `size`. Slots: #trigger, #default, #close                                                                                    |
| 6   | `MizuAlertDialog`  | AlertDialog         | `open` (v-model), `title`, `description`, `confirmText`, `cancelText`, `variant` (danger/warning/info)                                                                 |
| 7   | `MizuToast`        | Toast               | `variant`, `title`, `description`, `duration`, `action`. Both composable (`useToast()`) and component API. Requires `<ToastProvider>` + `<ToastViewport>` in app root. |
| 8   | `MizuDropdownMenu` | DropdownMenu        | `items: DropdownMenuItem[]`. Supports #trigger slot.                                                                                                                   |
| 9   | `MizuTabs`         | Tabs                | `tabs: Tab[]`, `modelValue`, `defaultValue`, `orientation`, `size`                                                                                                     |
| 10  | `MizuCombobox`     | Combobox            | `modelValue`, `options`, `placeholder`, `disabled`, `error`, `multiple`, `size`                                                                                        |
| 11  | `MizuNumberField`  | NumberField         | `modelValue`, `min`, `max`, `step`, `formatOptions`, `size`                                                                                                            |
| 12  | `MizuDatePicker`   | DatePicker (Alpha)  | `modelValue`, `placeholder`, `disabled`, `error`, `size`, `granularity` (day/month/year)                                                                               |

#### MizuBreadcrumb

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string; // if omitted, renders as current page (aria-current="page")
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
  page?: number; // v-model:page
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
  searchable?: boolean; // default true
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
  open?: boolean; // v-model:open
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}
// Slots: #trigger, #default (content), #close
```

#### MizuAlertDialog

```typescript
interface AlertDialogProps {
  open?: boolean; // v-model:open
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
  duration?: number; // auto-close ms
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
  modelValue?: string; // v-model:activeTab
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
  trigger?: string; // trigger label or use #trigger slot
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
  page: number; // v-model:page
  total: number; // total pages
  siblingCount?: number; // default 1
  showEdges?: boolean; // default false
  size?: "sm" | "md" | "lg";
}
```

### Batch 2b ✅ Supporting Components

| #   | Component         | Reka primitive | Key props                                                 |
| --- | ----------------- | -------------- | --------------------------------------------------------- |
| 13  | `MizuAccordion`   | Accordion      | `items`, `type` (single/multiple), `collapsible`          |
| 14  | `MizuPopover`     | Popover        | `open` (v-model), `side`, `sideOffset`, `align`           |
| 15  | `MizuCollapsible` | Collapsible    | `open` (v-model), `disabled`                              |
| 16  | `MizuTagsInput`   | TagsInput      | `modelValue`, `placeholder`, `max`, `delimiter`, `size`   |
| 17  | `MizuSlider`      | Slider         | `modelValue`, `min`, `max`, `step`, `orientation`, `size` |
| 18  | `MizuToggleGroup` | ToggleGroup    | `modelValue`, `options`, `type` (single/multiple), `size` |
| 19  | `MizuScrollArea`  | ScrollArea     | `orientation`, `maxHeight`, `maxWidth`                    |

## Phase 3: @mizu/react (packages/react/) — future

**Stack**: React 19 + TypeScript + shadcn/ui + ReUI registry

Approach:

1. Initialize shadcn/ui with CSS variables mapped to Mizu token values
2. Install ReUI components via `shadcn add @reui/...`
3. Components land as local source files; customize and re-export as `@mizu/react`
4. Custom Mizu tokens (warning, info, success, subtle variants) added via shadcn's "Adding New Tokens" pattern

CSS variable mapping (one-way adapter):

| shadcn variable                          | Mizu token                               |
| ---------------------------------------- | ---------------------------------------- |
| `--background` / `--foreground`          | `surface-base` / `foreground-primary`    |
| `--primary` / `--primary-foreground`     | `brand-primary` / `foreground-inverse`   |
| `--accent` / `--accent-foreground`       | `brand-ycp` / `foreground-inverse`       |
| `--secondary` / `--secondary-foreground` | `surface-muted` / `foreground-secondary` |
| `--muted` / `--muted-foreground`         | `surface-subtle` / `foreground-tertiary` |
| `--destructive`                          | `feedback-error-base`                    |
| `--border` / `--ring`                    | `surface-muted` / `brand-ycp`            |
| `--radius`                               | `0.5rem` (8px)                           |

## Key Decisions

- **DTCG format** for `tokens.json` with `$value`, `$type`, `$description`
- **Tailwind v4** via `@tailwindcss/vite` plugin (not PostCSS)
- **Vue components**: Reka UI primitives for accessibility; Mizu token classes for styling
- **React components**: shadcn/ui + ReUI; Mizu tokens injected via CSS variable overrides
- **Monorepo**: pnpm workspaces with `packages/*`
- **Docs site**: Astro 5, uses Mizu's own Tailwind classes (not shadcn semantic classes)
- **Single token source**: `@mizu/tokens` is consumed by every package and the docs site — no duplicate hardcoded values anywhere
- **Token naming**: canonical CSS vars are `--color-{group}-{variant}` with full kebab-case path. Feedback colors keep the `feedback` segment (e.g. `--color-feedback-success-base`); previously the docs used the short form `--color-success-base`, now removed
- **`@mizu/vue` current version `0.13.1`** (shared with root and `@mizu/tokens`); all three original batches (1, 2a, 2b) are complete
- **DataTable**: Uses `@tanstack/vue-table` for sorting, filtering, pagination, row selection. Supports both props-only and slot-based cell rendering.
- **Toast**: Dual API — composable (`useToast()`) for programmatic triggers, and component (`<MizuToast>`) for template use. Requires `<ToastProvider>` + `<ToastViewport>` at app root.
- **DatePicker**: Uses Reka UI's DatePicker primitive (Alpha status). Accepts API stability risk. Components built but no demo page yet.
- **Batch 2b components** (Accordion, Popover, Collapsible, TagsInput, Slider, ToggleGroup, ScrollArea) are complete; NavigationMenu archived to `.agents/archive/navigation-menu/` for future re-introduction
- **Login sample page** — Live at `/samples/login/` in the Starlight docs — demonstrates form validation with Zod + `useForm`

## Unit Testing [TODO]

### Status

No testing infrastructure exists yet. Zero test files, no vitest/jest configs, no test runner dependencies.

### Motivation

- **Catch regressions** — the `MizuInput.helperText` rendering bug (fixed 2026-07-02) would have been caught immediately by a component test asserting DOM presence of the helper span
- **Composable correctness** — `useForm` (useMizuField) has non-trivial validation logic (field-level parsing, touched tracking, handleSubmit flow) that benefits from unit coverage

### Framework Choice: Vitest + @vue/test-utils + jsdom

| Tool                | Purpose                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Vitest**          | Test runner — native Vite integration, shares the same transform pipeline (TypeScript, Vue SFC, TailwindCSS via `@tailwindcss/vite`) |
| **@vue/test-utils** | Mount Vue components, assert props/slots/emits/DOM structure                                                                         |
| **jsdom**           | Lightweight DOM environment — faster than headless browser, sufficient for component unit tests                                      |

**Why not Jest**: Jest requires its own transform pipeline and doesn't understand Vite's resolve aliases. Vitest uses the project's existing `vite.config.ts`.

**Why not Playwright/Cypress**: Overkill for unit tests. Reserve E2E for sample page smoke tests later.

### Dependencies

```bash
pnpm --filter @mizu/vue add -D vitest @vue/test-utils jsdom
```

### Configuration

Create `packages/vue/vitest.config.ts`:

```ts
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      include: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    },
  })
);
```

Add scripts to `packages/vue/package.json`:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

### Test file structure

```
packages/vue/src/__tests__/
├── composables/
│   ├── useMizuField.test.ts       ← P0
│   └── useToast.test.ts           ← P1
└── components/
    ├── MizuInput.test.ts          ← P0: the bug we just fixed
    ├── MizuSelect.test.ts         ← P1
    ├── MizuTextarea.test.ts       ← P1
    ├── MizuCheckbox.test.ts       ← P1
    ├── MizuRadio.test.ts          ← P2
    ├── MizuSwitch.test.ts         ← P2
    ├── MizuButton.test.ts         ← P2
    ├── MizuAlert.test.ts          ← P2
    ├── MizuBadge.test.ts          ← P2
    ├── MizuCard.test.ts           ← P2
    ├── MizuTag.test.ts            ← P2
    ├── MizuProgress.test.ts       ← P2
    ├── MizuAvatar.test.ts         ← P2
    ├── MizuDivider.test.ts        ← P2
    ├── MizuQuote.test.ts          ← P2
    ├── MizuDashList.test.ts       ← P2
    ├── MizuMetric.test.ts         ← P2
    ├── MizuDataTable.test.ts      ← P2
    ├── MizuPagination.test.ts     ← P2
    ├── MizuTabs.test.ts           ← P3
    ├── MizuBreadcrumb.test.ts     ← P3
    ├── MizuToast.test.ts          ← P3
    ├── MizuSkeleton.test.ts       ← P3
    ├── MizuAccordion.test.ts      ← P3
    ├── MizuCollapsible.test.ts    ← P3
    ├── MizuSlider.test.ts         ← P3
    ├── MizuToggleGroup.test.ts    ← P3
    └── MizuTagsInput.test.ts      ← P3
```

### Prioritized rollout

| Phase | Scope                                                                                                                | Why first                                                                |
| ----- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **1** | `useMizuField` + `MizuInput`                                                                                         | Core form validation + component we just fixed. Highest regression risk. |
| **2** | Form components: Select, Textarea, Checkbox, Radio, Switch                                                           | Same `helperText`/`error` pattern — ensure parity                        |
| **3** | Display components + `useToast`: Button, Alert, Badge, Card, Tag, Progress, Avatar, Divider, Quote, DashList, Metric | Simple assertions, quick coverage wins                                   |
| **4** | Complex components: DataTable, Pagination, Tabs, Breadcrumb, Toast, Skeleton                                         | Higher complexity, TanStack/Vue interactions                             |
| **5** | Reka UI wrappers: Accordion, Collapsible, Slider, ToggleGroup, TagsInput, Dialog/AlertDialog/DropdownMenu/Combobox   | Focus on Mizu props, not Reka internals                                  |
| **6** | CI integration + coverage thresholds                                                                                 | GitHub Actions, `vitest --coverage`, fail under 70%                      |

### Key testing patterns

**Composable test (useMizuField)**:

```ts
import { useForm } from "../composables/useMizuField";
import { z } from "zod";

const schema = z.object({ email: z.email("Invalid email") });

test("field.error returns error after blur with invalid input", () => {
  const form = useForm(schema);
  form.fields.email.onChange("not-an-email");
  expect(form.fields.email.error.value).toBeUndefined(); // not touched yet
  form.fields.email.onBlur();
  expect(form.fields.email.error.value).toBe("Invalid email");
});
```

**Component test (MizuInput helperText — the bug we fixed)**:

```ts
import { mount } from "@vue/test-utils";
import MizuInput from "../components/MizuInput.vue";

test("renders helper text below the input", () => {
  const wrapper = mount(MizuInput, {
    props: { helperText: "Please enter a valid email", error: true },
  });
  const helper = wrapper.find(".mizu-input-helper");
  expect(helper.exists()).toBe(true);
  expect(helper.text()).toBe("Please enter a valid email");
  expect(helper.classes()).toContain("mizu-input-helper--error");
});

test("does not render helper span when helperText is empty", () => {
  const wrapper = mount(MizuInput, { props: { helperText: "" } });
  expect(wrapper.find(".mizu-input-helper").exists()).toBe(false);
});
```

**Tailwind class assertions**: Since `@tailwindcss/vite` resolves utility classes at build time, tests run in jsdom without the CSS cascade. Assert class **presence** (e.g., `wrapper.classes("mizu-input--error")`), not computed styles. Visual regression testing is out of scope for unit tests.

**Reka UI wrappers**: Components wrapping Reka primitives (Checkbox, Switch, Accordion, Dialog, etc.) should focus on: (1) props pass through correctly, (2) slots render in the right Reka sub-component, (3) Mizu-specific CSS classes are applied. Do **not** test Reka UI's internal behavior.

## Sample Pages

Mizu product pages that exercise the full component set and demonstrate ERP UI patterns:

| Page                                              | Primary UX pattern | Components exercised                                                  |
| ------------------------------------------------- | ------------------ | --------------------------------------------------------------------- |
| Login ✅                                          | Auth form          | Input, Button, Checkbox, Alert, Card, useForm, Zod                    |
| Dashboard (components ready)                      | Data overview      | Metric, Tag, Avatar, Progress, DashList, Tabs, DataTable              |
| Customer List (components ready)                  | CRUD table         | DataTable, Pagination, DropdownMenu, Breadcrumb, Dialog, Toast        |
| Order Form (components ready, no DatePicker demo) | Complex form       | Input, NumberField, DatePicker, Combobox, Select, Button, AlertDialog |

Pages live in `src/content/docs/samples/` as Starlight content, importing components from `@mizu/vue`.

### Form Validation [DONE]

Validation was implemented using **Zod + `useForm` composable** (the "Zod schemas wrapped in a thin composable" approach from the original options).

**What was built:**

- **`packages/vue/src/composables/useMizuField.ts`** -- exports `useForm(schema)` function and `FieldState`/`MizuFormResult` types
- **`src/content/docs/components/validation-patterns.mdx`** -- documentation page with API reference and pattern examples
- **`src/content/docs/samples/login.mdx`** -- Login sample page demonstrating the composable
- **`src/components/docs/LoginDemo.vue`** -- reusable Login form demo component
- Added `zod` dependency to @mizu/vue (v4.x)
- Updated Starlight sidebar with Validation Patterns under Components and Login under Samples

**Key facts:**

- `useForm(schema)` returns fields, values, errors, hasErrors, isSubmitting, submitCount, validate, handleSubmit, reset, setFieldValue, setFieldError
- `handleSubmit(fn)` wraps submit function with full validation -- only calls fn when all fields pass
- Field-level errors bind directly to MizuInput.error + MizuInput.helperText
- Server-side errors use setFieldError(field, message) after API calls
- Cross-field validation uses Zod .refine()

## Deferred

### MizuSkeleton (removed — planned for future)

Loading placeholder component that wraps content and shows skeleton shapes while data loads.

**Why deferred**: The current implementation doesn't meet the visual bar for a loading indicator. Revisit when a more polished shimmer/pulse animation pipeline is established.

**Design retained for future implementation**:

| Prop                                       | Type                             | Purpose                                                   |
| ------------------------------------------ | -------------------------------- | --------------------------------------------------------- |
| `loading`                                  | boolean                          | `true` → show skeleton, `false` → render `<slot>` content |
| `variant`                                  | `"text" \| "circle" \| "rect"`   | Placeholder shape                                         |
| `lines`                                    | number                           | Multi-line text stack (last line 60% width)               |
| `animation`                                | `"shimmer" \| "pulse" \| "none"` | Loading animation style                                   |
| `baseColor` / `highlightColor`             | string                           | Themeable skeleton colors                                 |
| `animationDuration` / `animationDirection` | number / string                  | Animation tuning                                          |

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
