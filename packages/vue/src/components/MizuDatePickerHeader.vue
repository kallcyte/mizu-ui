<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerHeader } from "reka-ui";

export interface DatePickerHeaderProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerHeaderProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const headerClasses = computed(() => {
  const classes = ["mizu-date-picker__header"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerHeader :class="headerClasses" :as-child="asChild" :as="as">
    <slot />
  </DatePickerHeader>
</template>

<style>
.mizu-date-picker__header {
  all: revert;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}
</style>
