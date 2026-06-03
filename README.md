# Mizunagi Design System

Constraint-based design tokens and multi-framework UI components for building coherent interfaces.

- **Tokens** — DTCG-compliant (`tokens.json`) with 13 categories: color, typography, spacing, shadows, and more
- **Docs site** — Astro 5 + Tailwind CSS v4
- **Vue components** — `@mizunagi/vue` built on Reka UI primitives
- **React components** — `@mizunagi/react` built on shadcn/ui + ReUI _(future release)_

## Packages

| Package | Description |
|---|---|
| `@mizunagi/tokens` | Typed JS/TS exports from `tokens.json` |
| `@mizunagi/vue` | Vue 3 component library with Reka UI |
| `@mizunagi/react` | React component library with shadcn/ui _(coming soon)_ |

## Quick Start

```bash
npm install @mizunagi/vue
```

```vue
<script setup>
import { MizunagiButton } from '@mizunagi/vue'
</script>

<template>
  <MizunagiButton variant="primary">Get Started</MizunagiButton>
</template>
```

## Local Development

```bash
pnpm install
pnpm dev            # Docs site → http://localhost:4321
pnpm build          # Build docs site
pnpm preview        # Preview built docs site
```

## Design

- Figma (coming soon)
- [PLAN.md](./PLAN.md) — architecture and roadmap

## License

MIT
