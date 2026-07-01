<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxInput } from "reka-ui";

export interface ComboboxInputProps {
  modelValue?: string;
  displayValue?: ((item: unknown) => string) | undefined;
  placeholder?: string;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxInputProps>(), {
  modelValue: undefined,
  displayValue: undefined,
  placeholder: undefined,
  asChild: undefined,
  as: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const attrs = useAttrs();

const inputClasses = computed(() => {
  const classes = ["bp-combobox__input"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const inputStyle = computed(() => {
  return attrs.style as string | Record<string, string> | undefined;
});
</script>

<template>
  <ComboboxInput
    :class="inputClasses"
    :style="inputStyle"
    :model-value="modelValue"
    :display-value="displayValue"
    :placeholder="placeholder"
    :as-child="asChild"
    :as="as"
    @update:model-value="(v: string) => emit('update:modelValue', v)"
  >
    <slot />
  </ComboboxInput>
</template>

<style>
.bp-combobox__input {
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
  margin: 0;
}

.bp-combobox__input::placeholder {
  color: var(--color-foreground-muted);
}
</style>
