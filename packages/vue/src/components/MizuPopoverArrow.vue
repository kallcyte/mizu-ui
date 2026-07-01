<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { PopoverArrow } from "reka-ui";

export interface PopoverArrowProps {
  width?: number;
  height?: number;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<PopoverArrowProps>(), {
  width: 10,
  height: 5,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const arrowClasses = computed(() => {
  const classes = ["bp-popover__arrow"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <PopoverArrow
    :class="arrowClasses"
    :width="width"
    :height="height"
    :as-child="asChild"
    :as="as"
  />
</template>

<style>
.bp-popover__arrow {
  fill: var(--color-surface-base);
  stroke: var(--color-surface-muted);
  stroke-width: 1px;
}
</style>