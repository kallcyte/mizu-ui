<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerCell } from "reka-ui";

export interface DatePickerCellProps {
  date: any;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerCellProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const cellClasses = computed(() => {
  const classes = ["bp-date-picker__cell"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerCell
    :class="cellClasses"
    :date="date"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DatePickerCell>
</template>

<style>
.bp-date-picker__cell {
  all: revert;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
}

.bp-date-picker__cell[data-disabled] {
  opacity: 0.4;
}
</style>
