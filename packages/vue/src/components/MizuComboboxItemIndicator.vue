<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxItemIndicator } from "reka-ui";

export interface ComboboxItemIndicatorProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxItemIndicatorProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const indicatorClasses = computed(() => {
  const classes = ["bp-combobox__item-indicator"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxItemIndicator
    :class="indicatorClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ComboboxItemIndicator>
</template>
