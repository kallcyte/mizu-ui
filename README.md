# Mizu[水] Design System

![version](https://img.shields.io/badge/version-0.17.1-blue)](https://github.com/kallcyte/mizu-ui/releases/tag/v0.17.1) [![license](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

Constraint-based design tokens and multi-framework UI components for building coherent interfaces.

- **Tokens** — DTCG-compliant (`tokens.json`) with 13 categories: color, typography, spacing, shadows, and more
- **Docs site** — Astro 5 + Tailwind CSS v4
- **Vue components** — `@mizu/vue` built on Reka UI primitives
- **React components** — `@mizu/react` built on shadcn/ui + ReUI _(future release)_

## Packages

| Package        | Description                                            |
| -------------- | ------------------------------------------------------ |
| `@mizu/tokens` | Typed JS/TS exports from `tokens.json`                 |
| `@mizu/vue`    | Vue 3 component library with Reka UI                   |
| `@mizu/react`  | React component library with shadcn/ui _(coming soon)_ |

## Quick Start

```bash
npm install @mizu/vue
```

```vue
<script setup>
import { MizuButton } from "@mizu/vue";
</script>

<template>
  <MizuButton variant="primary">Get Started</MizuButton>
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
