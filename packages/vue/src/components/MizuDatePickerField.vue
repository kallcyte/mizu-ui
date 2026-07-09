<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerField } from "reka-ui";

export interface DatePickerFieldProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerFieldProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const fieldClasses = computed(() => {
  const classes = ["mizu-date-picker__field"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerField :class="fieldClasses" :as-child="asChild" :as="as">
    <slot />
  </DatePickerField>
</template>

<style>
.mizu-date-picker__field {
  all: revert;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  border: 1px solid var(--color-surface-border);
  border-radius: 8px;
  padding: 8px 12px;
  background: var(--color-surface-base);
  font-family: inherit;
}
</style>
