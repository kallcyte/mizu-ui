# Tooling Setup Plan — Vitest, ESLint + Prettier, GitHub Actions CI

## Overview

Set up three foundational quality tools for the mizu-ui monorepo:

1. **Vitest** — Unit & component testing for `@mizu/vue`
2. **ESLint + Prettier** — Code linting and formatting across all packages
3. **GitHub Actions CI** — Automated checks on every PR

### Current State

| Aspect | Status |
|---|---|
| Monorepo tool | pnpm workspaces (`pnpm-workspace.yaml`) |
| Packages | `@mizu/tokens`, `@mizu/vue`, `@mizu/react` (future) |
| Build tools | `tsx` (tokens), Vite + vue-tsc (vue), Astro (docs) |
| Testing | ❌ None — zero test files, no test runner |
| Linting/Formatting | ❌ None — no ESLint, no Prettier |
| CI/CD | ⚠️ Release workflow only (`.github/workflows/release.yml`) — no PR checks |

---

## 1. Vitest (Testing)

### Why Vitest

- Already using Vite for `@mizu/vue` — Vitest shares the same transform pipeline (Vue SFC, TypeScript, TailwindCSS via `@tailwindcss/vite`)
- Zero extra config for path aliases, plugins, etc.
- Native ESM support (project uses `"type": "module"`)
- **Why not Jest**: Jest requires its own transform pipeline and doesn't understand Vite's resolve aliases
- **Why not Playwright/Cypress**: Overkill for unit tests. Reserve E2E for sample page smoke tests later

### Dependencies

```bash
pnpm --filter @mizu/vue add -D vitest @vue/test-utils jsdom @vitest/coverage-v8
```

| Package | Purpose |
|---|---|
| `vitest` | Test runner — native Vite integration |
| `@vue/test-utils` | Mount Vue components, assert props/slots/emits/DOM |
| `jsdom` | Lightweight DOM environment for component tests |
| `@vitest/coverage-v8` | Code coverage reporting via V8 |

### Configuration

Create `packages/vue/vitest.config.ts`:

```ts
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,vue}"],
      exclude: ["src/**/*.test.ts", "src/index.ts"],
    },
  },
}));
```

Add scripts to `packages/vue/package.json`:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

### Test File Structure

```
packages/vue/src/__tests__/
├── composables/
│   ├── useMizuField.test.ts       ← P0 (form validation logic)
│   └── useToast.test.ts           ← P1
└── components/
    ├── MizuInput.test.ts          ← P0 (the helperText bug we fixed)
    ├── MizuButton.test.ts         ← P0 (most-used component)
    ├── MizuSelect.test.ts         ← P1
    ├── MizuCheckbox.test.ts       ← P1
    ├── MizuTextarea.test.ts       ← P1
    ├── MizuRadio.test.ts          ← P2
    ├── MizuSwitch.test.ts         ← P2
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
    ├── MizuAccordion.test.ts      ← P3
    ├── MizuCollapsible.test.ts    ← P3
    ├── MizuSlider.test.ts         ← P3
    ├── MizuToggleGroup.test.ts    ← P3
    └── MizuTagsInput.test.ts      ← P3
```

### Initial Test Scope (Phase 1 — Infrastructure Validation)

Start with **3 tests** to validate the setup works end-to-end:

| Test File | Priority | What It Covers |
|---|---|---|
| `useMizuField.test.ts` | P0 | Zod validation, touched tracking, error states, handleSubmit flow |
| `MizuInput.test.ts` | P0 | helperText rendering, error state classes, v-model binding |
| `MizuButton.test.ts` | P0 | Variant classes, disabled state, loading state, click events |

### Key Testing Patterns

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
    props: { helperText: "Please enter a valid email", error: true }
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

**Tailwind class assertions**: Tests run in jsdom without the CSS cascade. Assert class **presence** (e.g., `wrapper.classes("mizu-input--error")`), not computed styles.

**Reka UI wrappers**: Focus on: (1) props pass through correctly, (2) slots render in the right Reka sub-component, (3) Mizu-specific CSS classes are applied. Do **not** test Reka UI's internal behavior.

### Prioritized Rollout

| Phase | Scope | Why first |
|---|---|---|
| **1** | `useMizuField` + `MizuInput` + `MizuButton` | Core form validation + highest regression risk |
| **2** | Form components: Select, Textarea, Checkbox, Radio, Switch | Same `helperText`/`error` pattern — ensure parity |
| **3** | Display components: Alert, Badge, Card, Tag, Progress, Avatar, Divider, Quote, DashList, Metric | Simple assertions, quick coverage wins |
| **4** | Complex components: DataTable, Pagination, Tabs, Breadcrumb, Toast | Higher complexity, TanStack/Reka interactions |
| **5** | Reka UI wrappers: Accordion, Collapsible, Slider, ToggleGroup, TagsInput, Dialog, AlertDialog, DropdownMenu, Combobox | Focus on Mizu props, not Reka internals |
| **6** | CI coverage thresholds | `vitest --coverage`, fail under 70% |

---

## 2. ESLint + Prettier

### Architecture

```
ESLint (code quality)          Prettier (formatting)
├── Catches bugs               ├── Handles indentation
├── Enforces best practices    ├── Handles quotes/semicolons
├── Vue-specific rules         ├── Handles line breaks
└── TypeScript rules           └── Consistent style everywhere
         │                              │
         └──── eslint-config-prettier ──┘
               (disables ESLint rules
                that conflict with Prettier)
```

### Dependencies (install at root)

```bash
pnpm add -Dw eslint @eslint/js typescript-eslint eslint-plugin-vue prettier eslint-config-prettier
```

| Package | Purpose |
|---|---|
| `eslint` | Core linter (v9 flat config) |
| `@eslint/js` | Recommended JS rules |
| `typescript-eslint` | TypeScript-specific rules + parser |
| `eslint-plugin-vue` | Vue SFC linting rules |
| `prettier` | Code formatter |
| `eslint-config-prettier` | Disables ESLint rules that conflict with Prettier |

### Files to Create

#### `eslint.config.js` (root — ESLint v9 flat config)

```js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";

export default [
  // Ignore patterns
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.astro/**",
      "**/coverage/**",
      "packages/tokens/src/index.ts", // auto-generated by build.ts
    ],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Vue recommended rules
  ...pluginVue.configs["flat/recommended"],

  // Vue SFC parser with TypeScript support
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // Custom rules
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "vue/multi-word-component-names": "off",
    },
  },

  // Prettier integration (must be last)
  prettier,
];
```

#### `.prettierrc` (root)

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "vueIndentScriptAndStyle": false
}
```

#### `.prettierignore` (root)

```
dist
node_modules
.astro
coverage
pnpm-lock.yaml
packages/tokens/src/index.ts
```

### Scripts to Add to Root `package.json`

```json
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"format": "prettier --write .",
"format:check": "prettier --check ."
```

### Decision: Separate vs Integrated

**Recommended: Separate** — Run `prettier --check` and `eslint` as separate commands in CI.

- Cleaner separation of concerns (formatting ≠ linting)
- Faster execution (no double-parsing)
- Easier to understand CI failures (formatting error vs code quality error)

---

## 3. GitHub Actions CI

### Existing Workflows

| File | Trigger | Purpose |
|---|---|---|
| `.github/workflows/release.yml` | push to `master` | Auto-create GitHub Release |

### New Workflow: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
    branches: [master]
  push:
    branches: [master]

jobs:
  check:
    name: Lint, Typecheck, Test & Build
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build tokens
        run: pnpm build:tokens

      - name: Lint
        run: pnpm lint

      - name: Format check
        run: pnpm format:check

      - name: Typecheck (Vue)
        run: pnpm --filter @mizu/vue typecheck

      - name: Test
        run: pnpm --filter @mizu/vue test

      - name: Build Vue
        run: pnpm build:vue

      - name: Build docs site
        run: pnpm build
```

### Pipeline Flow

```
PR opened/updated
       │
       ▼
┌─────────────────┐
│  Install deps   │
│  Build tokens   │  (needed by @mizu/vue)
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────┐
│ Lint   │ │ Format   │     ← fast, fail early
│        │ │ check    │
└───┬────┘ └────┬─────┘
    │           │
    └─────┬─────┘
          ▼
   ┌──────────────┐
   │  Typecheck   │         ← catch type errors
   └──────┬───────┘
          ▼
   ┌──────────────┐
   │    Test      │         ← vitest run
   └──────┬───────┘
          ▼
   ┌──────────────┐
   │  Build Vue   │         ← vite build + vue-tsc
   └──────┬───────┘
          ▼
   ┌──────────────┐
   │  Build docs  │         ← astro build (full integration)
   └──────────────┘
```

---

## Implementation Steps

| Step | Task | Files |
|---|---|---|
| 1 | Install Vitest dependencies | `packages/vue/package.json` |
| 2 | Create Vitest config | `packages/vue/vitest.config.ts` |
| 3 | Write 3 initial tests (Phase 1) | `packages/vue/src/__tests__/{composables,components}/*.test.ts` |
| 4 | Verify tests pass locally | `pnpm --filter @mizu/vue test` |
| 5 | Install ESLint + Prettier deps | `package.json` (root) |
| 6 | Create ESLint flat config | `eslint.config.js` |
| 7 | Create Prettier config | `.prettierrc`, `.prettierignore` |
| 8 | Add lint/format scripts to root | `package.json` (root) |
| 9 | Run `pnpm format` to format all files | — |
| 10 | Run `pnpm lint:fix` to auto-fix issues | — |
| 11 | Manually fix remaining lint warnings | Various files |
| 12 | Create CI workflow | `.github/workflows/ci.yml` |
| 13 | Verify full pipeline locally | `pnpm lint && pnpm format:check && pnpm --filter @mizu/vue typecheck && pnpm --filter @mizu/vue test && pnpm build` |

---

## Future Considerations (Out of Scope for Now)

| Item | When to Add |
|---|---|
| **Coverage threshold** (`--coverage.thresholds.lines: 70`) | After Phase 3+ tests are written |
| **Pre-commit hooks** (`lint-staged` + `husky`) | When team grows beyond 1 contributor |
| **E2E tests** (Playwright) | When sample pages need smoke testing |
| **Visual regression** (Chromatic/Percy) | When component visual stability matters |
| **Bundle size tracking** (`size-limit`) | Before publishing to npm |