## v0.12.8 — MizuSkeleton rewrite + deferred

MizuSkeleton received a major overhaul inspired by vue3-skeleton, then was deferred from the active component list while the animation pipeline matures.

### Changed

**`MizuSkeleton`** — fully rewritten:
- **Content-wrapping `loading` prop**: skeleton wraps content. `loading=true` → show placeholder, `loading=false` → reveal `<slot>` content, `undefined` → auto-detect from slot children
- **`::after` pseudo-element shimmer**: replaced `background-position` animation with cleaner `translateX`-based sliding gradient band (vue3-skeleton pattern)
- **CSS custom property theming**: all colors and animation params via CSS variables — `--bp-skeleton-base`, `--bp-skeleton-highlight`, `--bp-animation-duration`, `--bp-animation-direction`, `--bp-skeleton-custom-gradient`
- **New props**: `baseColor`, `highlightColor`, `animationDuration`, `animationDirection`, `enableAnimation`, `customHighlightBackground`
- **`MizuSkeletonTheme`** provider: sets defaults for all child skeletons via `provide`/`inject`
- **Pulse fix**: local `@keyframes bp-skeleton-pulse` instead of broken `@apply animate-pulse` (Tailwind dropped keyframes from bundle); duplicate `@keyframes bp-skeleton-shimmer` removed

### Removed

**`MizuSkeleton` deferred** — removed from Starlight docs sidebar and active component list. Component files, demo, types, and docs page kept in repo for future reference.

### Stats

- Files changed: 18
- Insertions: +805
- Deletions: −22
- Package: `@mizu/vue@0.12.8`
