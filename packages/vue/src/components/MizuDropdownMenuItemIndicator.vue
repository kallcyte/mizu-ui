<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuItemIndicator } from "reka-ui";

export interface DropdownMenuItemIndicatorProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DropdownMenuItemIndicatorProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const indicatorClasses = computed(() => {
  const classes = ["bp-dropdown-menu__item-indicator"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DropdownMenuItemIndicator
    :class="indicatorClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DropdownMenuItemIndicator>
</template>

<style>
.bp-dropdown-menu__item-indicator {
  all: revert;
  position: absolute;
  left: 10px;
  top: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  transform: translateY(-50%);
}
</style>
