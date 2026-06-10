<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerTrigger } from "reka-ui";

export interface DatePickerTriggerProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerTriggerProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const triggerClasses = computed(() => {
  const classes = ["bp-date-picker__trigger"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerTrigger
    :class="triggerClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DatePickerTrigger>
</template>

<style>
.bp-date-picker__trigger {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-foreground-muted);
  outline: none;
}

.bp-date-picker__trigger:hover {
  color: var(--color-foreground-primary);
}
</style>
