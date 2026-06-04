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

- **Source of truth**: `tokens.json` in DTCG format (`$value`, `$type`, `$description`)
- **13 categories**: color, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, spacing, borderRadius, shadow, sizing, zIndex, duration, breakpoint
- **Color groups**: brand, surface, foreground, feedback (success/error/warning/info)
- **Tailwind mapping**: `src/styles/global.css` `@theme` block maps tokens to `--color-*`, `--font-*`, `--spacing-*`, `--radius-*`, etc.
- **Package**: `packages/tokens/` exports typed JS/TS constants for use by Vue and React packages

### Naming convention

| Token type | Pattern | Example |
|---|---|---|
| Surface colors | `--color-surface-{variant}` | `bg-surface-base`, `border-surface-muted` |
| Foreground colors | `--color-foreground-{variant}` | `text-foreground-primary`, `text-foreground-secondary` |
| Brand colors | `--color-brand-{variant}` | `bg-brand-primary`, `text-brand-accent` |
| Feedback colors | `--color-{type}-{variant}` | `bg-error-subtle`, `text-success-base` |

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

### Batch 1 components

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
| `--destructive` | `error-base` |
| `--border` / `--ring` | `surface-muted` / `brand-accent` |
| `--radius` | `0.5rem` (8px) |

## Key Decisions

- **DTCG format** for `tokens.json` with `$value`, `$type`, `$description`
- **Tailwind v4** via `@tailwindcss/vite` plugin (not PostCSS)
- **Vue components**: Reka UI primitives for accessibility; Mizu token classes for styling
- **React components**: shadcn/ui + ReUI; Mizu tokens injected via CSS variable overrides
- **Monorepo**: pnpm workspaces with `packages/*`
- **Docs site**: Astro 5, uses Mizu's own Tailwind classes (not shadcn semantic classes)
- **No showcase page yet** — deferred to a later phase

## Sample Pages (Future)

Mizu product pages that exercise the full component set and demonstrate ERP UI patterns:

| Page | Primary UX pattern | Components exercised |
|---|---|---|
| Login | Auth form | Input, Button, Checkbox, Alert, Card |
| Dashboard | Data overview | Metric, Tag, Avatar, Progress, DashList |

Each page lives in `src/pages/samples/` and imports components from `@mizu/vue` (or directly from `src/components/ui/` when the Vue package isn't ready).

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
