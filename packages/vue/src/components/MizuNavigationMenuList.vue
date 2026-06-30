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
  const c = ["NavigationMenuList"];
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
.NavigationMenuRoot .NavigationMenuList {
  all: revert;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  font-family: inherit;
}

.NavigationMenuList[data-orientation="vertical"] {
  flex-direction: column;
  align-items: stretch;
}
</style>
