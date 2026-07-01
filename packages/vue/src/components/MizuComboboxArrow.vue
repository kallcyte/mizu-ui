<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxArrow } from "reka-ui";

export interface ComboboxArrowProps {
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<ComboboxArrowProps>(), {
  width: 10,
  height: 5,
});

const attrs = useAttrs();

const arrowClasses = computed(() => {
  const classes = ["bp-combobox__arrow"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxArrow
    :class="arrowClasses"
    :width="width"
    :height="height"
  />
</template>
