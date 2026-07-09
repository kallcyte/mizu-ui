<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerNext } from "reka-ui";

export interface DatePickerNextProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerNextProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const nextClasses = computed(() => {
  const classes = ["mizu-date-picker__next"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerNext :class="nextClasses" :as-child="asChild" :as="as">
    <slot />
  </DatePickerNext>
</template>

<style>
.mizu-date-picker__next {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  background: transparent;
  border: 1px solid var(--color-surface-border);
  border-radius: 6px;
  cursor: pointer;
  color: var(--color-foreground-muted);
  font-family: inherit;
  font-size: 14px;
  outline: none;
}

.mizu-date-picker__next:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-foreground-primary);
}

.mizu-date-picker__next[data-disabled] {
  color: var(--color-foreground-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
