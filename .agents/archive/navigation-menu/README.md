# MizuNavigationMenu (archived)

This component was removed from the active codebase on 2026-06-30 and preserved here
for future re-introduction. It is a horizontal/vertical navigation bar with dropdown
content panels, built on Reka UI's `NavigationMenu` primitives.

## Contents

```
.agents/archive/navigation-menu/
├── README.md                       (this file)
├── navigation-menu.mdx             (docs page — was src/content/docs/components/navigation-menu.mdx)
├── components/                     (9 component .vue files — were packages/vue/src/components/)
│   ├── MizuNavigationMenuContent.vue
│   ├── MizuNavigationMenuIndicator.vue
│   ├── MizuNavigationMenuItem.vue
│   ├── MizuNavigationMenuLink.vue
│   ├── MizuNavigationMenuList.vue
│   ├── MizuNavigationMenuRoot.vue
│   ├── MizuNavigationMenuSub.vue
│   ├── MizuNavigationMenuTrigger.vue
│   └── MizuNavigationMenuViewport.vue
└── docs-demo/
    └── NavigationMenuDemo.vue      (demo — was src/components/docs/NavigationMenuDemo.vue)
```

## How to restore

1. **Move the component files back into the package:**

   ```sh
   mv .agents/archive/navigation-menu/components/MizuNavigationMenu*.vue packages/vue/src/components/
   ```

   The `packages/vue/scripts/generate-index.mjs` build step auto-discovers every `.vue`
   file in `packages/vue/src/components/`, so the exports in `packages/vue/src/index.ts`
   will be regenerated on the next `pnpm --filter @mizu/vue build`.

2. **Restore the docs page and demo:**

   ```sh
   mv .agents/archive/navigation-menu/navigation-menu.mdx src/content/docs/components/
   mv .agents/archive/navigation-menu/docs-demo/NavigationMenuDemo.vue src/components/docs/
   ```

3. **Re-add the sidebar entry** in `astro.config.mjs` (inside the `Components` group,
   alphabetically between `Metric` and `NumberField`):

   ```js
   { label: "NavigationMenu", slug: "components/navigation-menu" },
   ```

4. **Re-add the home components card** in `src/components/home/ComponentsSection.astro`:

   ```astro
   <a href="/components/navigation-menu" class="block p-6 rounded-xl border transition-all duration-200 card-hover border-surface-muted bg-surface-base no-underline group hover:border-brand-ycp/30 hover:shadow-[0_0_0_1px_var(--color-brand-ycp)]">
     <h4 class="text-[16px] font-semibold mb-1 group-hover:text-brand-ycp transition-colors">NavigationMenu</h4>
     <p class="text-sm text-foreground-secondary">Horizontal or vertical navigation bar with dropdown content panels.</p>
   </a>
   ```

5. **Re-add the changelog entry** in `src/content/docs/getting-started/changelog.mdx`
   (see git history for the original 0.12.11 wording) and update `PLAN.md` if desired.

6. **Build & verify:** `pnpm --filter @mizu/vue build` then run the docs dev server.
