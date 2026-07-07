<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerCellTrigger } from "reka-ui";

export interface DatePickerCellTriggerProps {
  day: any;
  month: any;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerCellTriggerProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const cellTriggerClasses = computed(() => {
  const classes = ["mizu-date-picker__cell-trigger"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerCellTrigger
    :class="cellTriggerClasses"
    :day="day"
    :month="month"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DatePickerCellTrigger>
</template>

<style>
.mizu-date-picker__cell-trigger {
  all: revert;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-foreground-primary);
  outline: none;
}

.mizu-date-picker__cell-trigger:hover {
  background-color: var(--color-surface-hover);
}

.mizu-date-picker__cell-trigger[data-today] {
  font-weight: 600;
  border: 1px solid var(--color-brand-ycp);
}

.mizu-date-picker__cell-trigger[data-selected] {
  background-color: var(--color-brand-ycp);
  color: #fff;
}

.mizu-date-picker__cell-trigger[data-disabled] {
  color: var(--color-foreground-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
