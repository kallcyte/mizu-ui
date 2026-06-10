<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NumberFieldRoot } from "reka-ui";

export interface NumberFieldRootProps {
  modelValue?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  largeStep?: number;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
}

const props = withDefaults(defineProps<NumberFieldRootProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  min: undefined,
  max: undefined,
  step: 1,
  largeStep: 10,
  disabled: false,
  required: false,
  name: undefined,
  formatOptions: undefined,
  locale: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["bp-number-field"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <NumberFieldRoot
    :class="rootClasses"
    :model-value="modelValue"
    :default-value="defaultValue"
    :min="min"
    :max="max"
    :step="step"
    :large-step="largeStep"
    :disabled="disabled"
    :required="required"
    :name="name"
    :format-options="formatOptions"
    :locale="locale"
    @update:model-value="(v: number) => emit('update:modelValue', v)"
  >
    <slot />
  </NumberFieldRoot>
</template>
