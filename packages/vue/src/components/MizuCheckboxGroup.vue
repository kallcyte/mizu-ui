<script setup lang="ts">
import { computed, useAttrs } from "vue";
import MizuCheckbox from "./MizuCheckbox.vue";

export interface CheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** Selected values (v-model) */
  modelValue?: string[];
  /** Available options */
  options?: CheckboxGroupOption[];
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  /** Fieldset legend text */
  legend?: string;
  /** Disabled state for all checkboxes */
  disabled?: boolean;
  /** Size for all checkboxes */
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  options: () => [],
  orientation: "vertical",
  legend: undefined,
  disabled: false,
  size: "md",
});

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const attrs = useAttrs();

const groupClasses = computed(() => {
  const classes = ["mizu-checkbox-group", `mizu-checkbox-group--${props.orientation}`];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

function isChecked(value: string): boolean {
  return props.modelValue.includes(value);
}

function handleToggle(value: string) {
  const newValue = isChecked(value)
    ? props.modelValue.filter((v) => v !== value)
    : [...props.modelValue, value];
  emit("update:modelValue", newValue);
}
</script>

<template>
  <fieldset :class="groupClasses" :disabled="disabled">
    <legend v-if="legend" class="mizu-checkbox-group__legend">{{ legend }}</legend>
    <div class="mizu-checkbox-group__options">
      <MizuCheckbox
        v-for="option in options"
        :key="option.value"
        :model-value="isChecked(option.value)"
        :label="option.label"
        :disabled="option.disabled || disabled"
        :size="size"
        @update:model-value="() => handleToggle(option.value)"
      />
    </div>
  </fieldset>
</template>

<style>
@reference "../index.css";

.mizu-checkbox-group {
  @apply border-none p-0 m-0;
}

.mizu-checkbox-group__legend {
  @apply text-sm font-medium text-[var(--color-foreground-primary)] mb-3;
}

.mizu-checkbox-group__options {
  @apply flex;
}

.mizu-checkbox-group--vertical .mizu-checkbox-group__options {
  @apply flex-col gap-2;
}

.mizu-checkbox-group--horizontal .mizu-checkbox-group__options {
  @apply flex-row flex-wrap gap-4;
}

.mizu-checkbox-group:disabled {
  @apply opacity-60;
}
</style>
