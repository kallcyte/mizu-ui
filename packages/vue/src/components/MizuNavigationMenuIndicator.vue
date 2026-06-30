<script setup lang="ts">
import { useAttrs } from "vue";
import { NavigationMenuIndicator } from "reka-ui";

export interface NavigationMenuIndicatorProps {
  forceMount?: boolean;
  asChild?: boolean;
  as?: string;
}

defineProps<NavigationMenuIndicatorProps>();

const attrs = useAttrs();
</script>

<template>
  <NavigationMenuIndicator
    :class="['bp-nav-menu__indicator', attrs.class]"
    :force-mount="forceMount"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </NavigationMenuIndicator>
</template>

<style>
.bp-nav-menu__indicator {
  all: revert;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-family: inherit;
  z-index: 1;
  transition: transform 200ms ease;
}

.bp-nav-menu__indicator::after {
  content: "";
  width: 10px;
  height: 10px;
  background-color: var(--color-surface-base);
  border-left: 1px solid var(--color-surface-muted);
  border-bottom: 1px solid var(--color-surface-muted);
  transform: rotate(45deg) translateY(2px);
}
</style>