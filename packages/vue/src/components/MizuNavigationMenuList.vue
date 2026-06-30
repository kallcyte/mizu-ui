<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NavigationMenuList } from "reka-ui";

export interface NavigationMenuListProps {
  asChild?: boolean;
  as?: string;
}

defineProps<NavigationMenuListProps>();

const attrs = useAttrs();

const listClasses = computed(() => {
  const c = ["bp-nav-menu__list"];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <NavigationMenuList :class="listClasses" :as-child="asChild" :as="as">
    <slot />
  </NavigationMenuList>
</template>

<style>
.bp-nav-menu .bp-nav-menu__list {
  all: revert;
  display: flex;
  font-family: inherit;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.bp-nav-menu--horizontal .bp-nav-menu__list {
  flex-direction: row;
  align-items: center;
  gap: 2px;
}

.bp-nav-menu--vertical .bp-nav-menu__list {
  flex-direction: column;
  align-items: stretch;
  gap: 2px;
}
</style>
