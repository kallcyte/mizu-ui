<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuArrow } from "reka-ui";

export interface DropdownMenuArrowProps {
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<DropdownMenuArrowProps>(), {
  width: 10,
  height: 5,
});

const attrs = useAttrs();

const arrowClasses = computed(() => {
  const classes = ["mizu-dropdown-menu__arrow"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DropdownMenuArrow :class="arrowClasses" :width="width" :height="height" />
</template>
