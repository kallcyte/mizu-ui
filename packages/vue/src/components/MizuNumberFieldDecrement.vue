<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NumberFieldDecrement } from "reka-ui";

export interface NumberFieldDecrementProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<NumberFieldDecrementProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const decClasses = computed(() => {
  const classes = ["bp-number-field__decrement"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <NumberFieldDecrement
    :class="decClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </NumberFieldDecrement>
</template>

<style>
.bp-number-field__decrement {
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

.bp-number-field__decrement:hover {
  color: var(--color-foreground-primary);
  background-color: var(--color-surface-hover);
}

.bp-number-field__decrement[data-disabled] {
  color: var(--color-foreground-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
