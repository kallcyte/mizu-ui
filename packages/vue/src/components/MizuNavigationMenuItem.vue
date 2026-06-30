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
  const c = ["bp-nav-menu__item"];
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
.bp-nav-menu__item {
  all: revert;
  font-family: inherit;
}
</style>
