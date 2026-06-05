<script setup lang="ts">
import { computed, ref, useAttrs, useId, watch } from "vue";
import { CheckboxIndicator, CheckboxRoot } from "reka-ui";

export interface CheckboxProps {
  modelValue?: boolean | "indeterminate" | null;
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
  "update:modelValue": [value: boolean | "indeterminate" | null];
}>();

const attrs = useAttrs();
const generatedId = useId();

const checkboxId = computed(() => {
  if (attrs.id) return attrs.id as string;
  if (props.name) return `mizu-checkbox-${props.name}`;
  return generatedId;
});

const internalValue = ref<boolean | "indeterminate" | null>(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== internalValue.value) {
      internalValue.value = newVal;
    }
  },
);

const isIndeterminate = computed(() => internalValue.value === "indeterminate");
const isChecked = computed(
  () => internalValue.value === true || internalValue.value === props.trueValue,
);

const checkboxClasses = computed(() => {
  const classes = ["bp-checkbox", `bp-checkbox--${props.size}`];

  if (props.disabled) classes.push("bp-checkbox--disabled");
  if (isChecked.value) classes.push("bp-checkbox--checked");
  if (isIndeterminate.value) classes.push("bp-checkbox--indeterminate");

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});

function handleUpdate(value: boolean | "indeterminate") {
  if (value === "indeterminate") {
    internalValue.value = "indeterminate";
    emit("update:modelValue", "indeterminate");
    return;
  }
  const resolved = value ? props.trueValue : props.falseValue;
  internalValue.value = resolved as boolean | "indeterminate" | null;
  emit("update:modelValue", resolved as boolean | "indeterminate" | null);
}
</script>

<template>
  <label
    :for="checkboxId"
    :class="['bp-checkbox-wrapper', `bp-checkbox-wrapper--${size}`, { 'bp-checkbox-wrapper--disabled': disabled, 'bp-checkbox-wrapper--no-label': !label }]"
  >
    <CheckboxRoot
      :id="checkboxId"
      :model-value="internalValue"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
      :class="checkboxClasses"
      @update:model-value="handleUpdate"
    >
      <CheckboxIndicator class="bp-checkbox__indicator">
        <svg
          v-if="isIndeterminate"
          viewBox="0 0 14 14"
          class="bp-checkbox__icon"
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
          class="bp-checkbox__icon"
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
    <span v-if="label" class="bp-checkbox__label">{{ label }}</span>
  </label>
</template>

<style>
@reference "../index.css";

.bp-checkbox-wrapper {
  @apply inline-flex items-center gap-[8px] cursor-pointer select-none;
}

.bp-checkbox-wrapper--disabled {
  @apply cursor-not-allowed;
}

.bp-checkbox {
  @apply shrink-0 inline-flex items-center justify-center border rounded-[4px] transition-colors duration-200 ease-in-out outline-none;
  background-color: var(--color-surface-base);
  border-color: var(--color-foreground-tertiary);
  color: var(--color-foreground-inverse);
}

.bp-checkbox--sm { @apply w-[16px] h-[16px]; }
.bp-checkbox--md { @apply w-[18px] h-[18px]; }
.bp-checkbox--lg { @apply w-[20px] h-[20px]; }

.bp-checkbox:hover:not(.bp-checkbox--disabled) {
  border-color: var(--color-brand-primary);
}

.bp-checkbox:focus-visible {
  box-shadow: 0 0 0 2px var(--color-brand-accent);
}

.bp-checkbox--checked,
.bp-checkbox--indeterminate {
  background-color: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

.bp-checkbox--checked:hover:not(.bp-checkbox--disabled),
.bp-checkbox--indeterminate:hover:not(.bp-checkbox--disabled) {
  background-color: var(--color-brand-primary-hover);
  border-color: var(--color-brand-primary-hover);
}

.bp-checkbox--disabled {
  @apply cursor-not-allowed;
  background-color: var(--color-surface-muted);
  border-color: var(--color-surface-muted);
  color: var(--color-foreground-tertiary);
}

.bp-checkbox__indicator {
  @apply inline-flex items-center justify-center;
  width: 100%;
  height: 100%;
}

.bp-checkbox__icon {
  width: 75%;
  height: 75%;
}

.bp-checkbox__label {
  @apply font-normal text-[var(--color-foreground-primary)];
  line-height: 1.3;
}

.bp-checkbox-wrapper--sm .bp-checkbox__label { @apply text-[12px]; }
.bp-checkbox-wrapper--md .bp-checkbox__label { @apply text-[13px]; }
.bp-checkbox-wrapper--lg .bp-checkbox__label { @apply text-[14px]; }

.bp-checkbox-wrapper--disabled .bp-checkbox__label {
  @apply text-[var(--color-foreground-tertiary)];
}
</style>
