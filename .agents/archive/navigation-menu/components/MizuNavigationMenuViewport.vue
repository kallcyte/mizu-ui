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
  const c = ["NavigationMenuViewport"];
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
.NavigationMenuViewport {
  all: revert;
  position: relative;
  width: var(--reka-navigation-menu-viewport-width);
  height: var(--reka-navigation-menu-viewport-height);
  font-family: inherit;
  transition:
    width,
    height,
    250ms ease;
  overflow: hidden;
  border-radius: 6px;
  background: var(--color-surface-base, white);
  border: 1px solid var(--color-surface-muted, #e0e0e0);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .NavigationMenuViewport {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 2px 4px -2px rgba(0, 0, 0, 0.2);
}
</style>
