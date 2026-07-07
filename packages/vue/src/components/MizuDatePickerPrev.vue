<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerPrev } from "reka-ui";

export interface DatePickerPrevProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerPrevProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const prevClasses = computed(() => {
  const classes = ["mizu-date-picker__prev"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerPrev :class="prevClasses" :as-child="asChild" :as="as">
    <slot />
  </DatePickerPrev>
</template>

<style>
.mizu-date-picker__prev {
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

.mizu-date-picker__prev:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-foreground-primary);
}

.mizu-date-picker__prev[data-disabled] {
  color: var(--color-foreground-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
