<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NavigationMenuViewport } from "reka-ui";

export interface NavigationMenuViewportProps {
  forceMount?: boolean;
  asChild?: boolean;
  as?: string;
}

defineProps<NavigationMenuViewportProps>();

const attrs = useAttrs();

const viewportClasses = computed(() => {
  const c = ["bp-nav-menu__viewport"];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <NavigationMenuViewport
    :class="viewportClasses"
    :force-mount="forceMount"
    :as-child="asChild"
    :as="as"
  />
</template>

<style>
.bp-nav-menu__viewport {
  all: revert;
  position: relative;
  font-family: inherit;
  background-color: var(--color-surface-base);
  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  z-index: 50;
  transition: width 250ms ease, height 250ms ease;
}

.bp-nav-menu--horizontal .bp-nav-menu__viewport {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 6px;
  width: max-content;
  min-width: 200px;
  max-width: 500px;
}

.bp-nav-menu--vertical .bp-nav-menu__viewport {
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 6px;
}

[data-theme="dark"] .bp-nav-menu__viewport {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.2);
}
</style>