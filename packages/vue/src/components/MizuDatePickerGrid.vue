<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerGrid } from "reka-ui";

export interface DatePickerGridProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerGridProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const gridClasses = computed(() => {
  const classes = ["bp-date-picker__grid"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerGrid
    :class="gridClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DatePickerGrid>
</template>
