<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NumberFieldInput } from "reka-ui";

export interface NumberFieldInputProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<NumberFieldInputProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const inputClasses = computed(() => {
  const classes = ["bp-number-field__input"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const inputStyle = computed(() => {
  return attrs.style as string | Record<string, string> | undefined;
});
</script>

<template>
  <NumberFieldInput
    :class="inputClasses"
    :style="inputStyle"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </NumberFieldInput>
</template>

<style>
.bp-number-field__input {
  all: revert;
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.4;
  color: var(--color-foreground-primary);
  background: transparent;
  border: none;
  outline: none;
  text-align: center;
  margin: 0;
}

.bp-number-field__input[data-disabled] {
  color: var(--color-foreground-disabled);
}
</style>
