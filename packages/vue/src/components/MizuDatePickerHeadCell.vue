<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerHeadCell } from "reka-ui";

export interface DatePickerHeadCellProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerHeadCellProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const headCellClasses = computed(() => {
  const classes = ["bp-date-picker__head-cell"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerHeadCell
    :class="headCellClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DatePickerHeadCell>
</template>

<style>
.bp-date-picker__head-cell {
  all: revert;
  width: 36px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  color: var(--color-foreground-muted);
}
</style>
