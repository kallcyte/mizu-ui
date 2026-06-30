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
    :class="['NavigationMenuIndicator', attrs.class]"
    :force-mount="forceMount"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </NavigationMenuIndicator>
</template>

<style>
.NavigationMenuIndicator {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 10px;
  top: 100%;
  overflow: hidden;
  z-index: 1;
  transition: width, transform, 250ms ease;
}

.NavigationMenuIndicator::after {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 2px;
  border-top-left-radius: 0;
  transform: translateY(70%) rotate(45deg);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.NavigationMenuIndicator[data-state="hidden"] {
  opacity: 0;
  transition: opacity 200ms ease;
}

.NavigationMenuIndicator[data-state="visible"] {
  opacity: 1;
}
</style>