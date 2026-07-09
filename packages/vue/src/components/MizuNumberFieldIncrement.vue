<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NumberFieldIncrement } from "reka-ui";

export interface NumberFieldIncrementProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<NumberFieldIncrementProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const incClasses = computed(() => {
  const classes = ["mizu-number-field__increment"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <NumberFieldIncrement :class="incClasses" :as-child="asChild" :as="as">
    <slot />
  </NumberFieldIncrement>
</template>

<style>
.mizu-number-field__increment {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-foreground-muted);
  font-family: inherit;
  font-size: 16px;
  outline: none;
  user-select: none;
}

.mizu-number-field__increment:hover {
  color: var(--color-foreground-primary);
  background-color: var(--color-surface-hover);
}

.mizu-number-field__increment[data-disabled] {
  color: var(--color-foreground-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
