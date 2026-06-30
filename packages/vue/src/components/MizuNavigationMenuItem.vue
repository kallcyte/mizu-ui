<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NavigationMenuItem } from "reka-ui";

export interface NavigationMenuItemProps {
  value?: string;
  asChild?: boolean;
  as?: string;
}

defineProps<NavigationMenuItemProps>();

const attrs = useAttrs();

const itemClasses = computed(() => {
  const c = ["NavigationMenuItem"];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <NavigationMenuItem :class="itemClasses" :value="value" :as-child="asChild" :as="as">
    <slot />
  </NavigationMenuItem>
</template>

<style>
.NavigationMenuItem {
  font-family: inherit;
}
</style>
