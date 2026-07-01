<script setup lang="ts">
import { computed, useAttrs, useId } from "vue";
import { CheckboxIndicator, CheckboxRoot } from "reka-ui";

export interface CheckboxProps {
  modelValue?: boolean | "indeterminate" | string | number | null;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  trueValue?: boolean | string | number;
  falseValue?: boolean | string | number;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
  required: false,
  name: undefined,
  value: undefined,
  label: undefined,
  size: "md",
  trueValue: true,
  falseValue: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean | "indeterminate" | string | number | null];
}>();

const attrs = useAttrs();
const generatedId = useId();

const checkboxId = computed(() => {
  if (attrs.id) return attrs.id as string;
  if (props.name) return `mizu-checkbox-${props.name}`;
  return generatedId;
});

const isIndeterminate = computed(() => props.modelValue === "indeterminate");
const isChecked = computed(() => {
  if (isIndeterminate.value) return false;
  return props.modelValue === props.trueValue;
});

const checkboxClasses = computed(() => {
  const classes = ["mizu-checkbox", `mizu-checkbox--${props.size}`];

  if (props.disabled) classes.push("mizu-checkbox--disabled");
  if (isChecked.value) classes.push("mizu-checkbox--checked");
  if (isIndeterminate.value) classes.push("mizu-checkbox--indeterminate");

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});
</script>

<template>
  <label
    :for="checkboxId"
    :class="['mizu-checkbox-wrapper', `mizu-checkbox-wrapper--${size}`, { 'mizu-checkbox-wrapper--disabled': disabled, 'mizu-checkbox-wrapper--no-label': !label }]"
  >
    <CheckboxRoot
      :id="checkboxId"
      :model-value="modelValue"
      :true-value="trueValue"
      :false-value="falseValue"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
      :class="checkboxClasses"
      @update:model-value="(value) => emit('update:modelValue', value)"
    >
      <CheckboxIndicator class="mizu-checkbox__indicator">
        <svg
          v-if="isIndeterminate"
          viewBox="0 0 14 14"
          class="mizu-checkbox__icon"
        >
          <rect
            x="3"
            y="6"
            width="8"
            height="2"
            rx="1"
            fill="currentColor"
          />
        </svg>
        <svg
          v-else
          viewBox="0 0 14 14"
          fill="none"
          class="mizu-checkbox__icon"
        >
          <path
            d="M2.5 7.5L5.5 10.5L11.5 4.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </CheckboxIndicator>
    </CheckboxRoot>
    <span v-if="label" class="mizu-checkbox__label">{{ label }}</span>
  </label>
</template>

<style>
@reference "../index.css";

.mizu-checkbox-wrapper {
  @apply inline-flex items-center gap-[8px] cursor-pointer select-none;
}

.mizu-checkbox-wrapper--disabled {
  @apply cursor-not-allowed;
}

.mizu-checkbox {
  @apply shrink-0 inline-flex items-center justify-center border rounded-[4px] transition-colors duration-200 ease-in-out outline-none;
  background-color: var(--color-surface-base);
  border-color: var(--color-foreground-tertiary);
  color: var(--color-foreground-inverse);
}

.mizu-checkbox--sm { @apply w-[16px] h-[16px]; }
.mizu-checkbox--md { @apply w-[18px] h-[18px]; }
.mizu-checkbox--lg { @apply w-[20px] h-[20px]; }

.mizu-checkbox:hover:not(.mizu-checkbox--disabled) {
  border-color: var(--color-brand-primary);
}

.mizu-checkbox:focus-visible {
  box-shadow: 0 0 0 2px var(--color-brand-accent);
}

.mizu-checkbox--checked,
.mizu-checkbox--indeterminate {
  background-color: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

.mizu-checkbox--checked:hover:not(.mizu-checkbox--disabled),
.mizu-checkbox--indeterminate:hover:not(.mizu-checkbox--disabled) {
  background-color: var(--color-brand-primary-hover);
  border-color: var(--color-brand-primary-hover);
}

.mizu-checkbox--disabled {
  @apply cursor-not-allowed;
  background-color: var(--color-surface-muted);
  border-color: var(--color-surface-muted);
  color: var(--color-foreground-tertiary);
}

.mizu-checkbox__indicator {
  @apply inline-flex items-center justify-center;
  width: 100%;
  height: 100%;
}

.mizu-checkbox__icon {
  width: 75%;
  height: 75%;
}

.mizu-checkbox__label {
  @apply font-normal text-[var(--color-foreground-primary)];
  line-height: 1.3;
}

.mizu-checkbox-wrapper--sm .mizu-checkbox__label { @apply text-[12px]; }
.mizu-checkbox-wrapper--md .mizu-checkbox__label { @apply text-[13px]; }
.mizu-checkbox-wrapper--lg .mizu-checkbox__label { @apply text-[14px]; }

.mizu-checkbox-wrapper--disabled .mizu-checkbox__label {
  @apply text-[var(--color-foreground-tertiary)];
}
</style>
