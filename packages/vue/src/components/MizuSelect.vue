<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  modelValue?: string;
  placeholder?: string;
  options?: SelectOption[];
  disabled?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  name?: string;
  required?: boolean;
  label?: string;
  helperText?: string;
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: "",
  placeholder: "",
  options: () => [],
  disabled: false,
  error: false,
  size: "md",
  name: undefined,
  required: false,
  label: undefined,
  helperText: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const attrs = useAttrs();

const selectId = computed(() => {
  if (attrs.id) return attrs.id as string;
  if (props.name) return `mizu-select-${props.name}`;
  return "mizu-select";
});

const helperId = computed(() => `${selectId.value}-helper`);

const selectClasses = computed(() => {
  const classes = [
    "mizu-select",
    `mizu-select--${props.size}`,
  ];

  if (props.error) classes.push("mizu-select--error");
  if (props.disabled) classes.push("mizu-select--disabled");

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});

const ariaAttributes = computed(() => {
  const attrs: Record<string, string | boolean | undefined> = {
    "aria-disabled": props.disabled,
    "aria-required": props.required,
    "aria-invalid": props.error,
  };

  if (props.helperText) {
    attrs["aria-describedby"] = helperId.value;
  }

  return attrs;
});

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
}

function handleFocus(event: FocusEvent) {
  emit("focus", event);
}

function handleBlur(event: FocusEvent) {
  emit("blur", event);
}
</script>

<template>
  <div :class="['mizu-select-wrapper', `mizu-select-wrapper--${size}`]">
    <label
      v-if="label"
      :for="selectId"
      :class="['mizu-select-label', `mizu-select-label--${size}`]"
    >
      {{ label }}
      <span v-if="required" class="mizu-select-label__required" aria-hidden="true">*</span>
    </label>
    <div class="mizu-select-container">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        :name="name"
        :required="required"
        :class="selectClasses"
        v-bind="ariaAttributes"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <option
          v-if="placeholder"
          value=""
          disabled
          hidden
        >
          {{ placeholder }}
        </option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :disabled="opt.disabled"
        >
          {{ opt.label }}
        </option>
      </select>
      <svg
        class="mizu-select-chevron"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 8L10 13L15 8"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <span
      v-if="helperText"
      :id="helperId"
      :class="['mizu-select-helper', { 'mizu-select-helper--error': error }]"
    >
      {{ helperText }}
    </span>
  </div>
</template>

<style>
@reference "../index.css";

.mizu-select-wrapper {
  @apply flex flex-col;
  gap: 6px;
}

.mizu-select-label {
  @apply font-medium text-[var(--color-foreground-primary)];
}
.mizu-select-label--sm { @apply text-[12px]; }
.mizu-select-label--md { @apply text-[12px]; }
.mizu-select-label--lg { @apply text-[14px]; }
.mizu-select-label__required {
  @apply ml-[2px] text-[var(--color-feedback-error-base)];
}

.mizu-select-container {
  @apply relative flex items-center;
}

.mizu-select {
  @apply w-full font-[inherit] outline-none appearance-none cursor-pointer;
  box-sizing: border-box;
  line-height: 1;
  border: 1px solid var(--color-surface-muted);
  background-color: var(--color-surface-base);
  color: var(--color-foreground-primary);
  transition: border-color 200ms ease-in-out, box-shadow 200ms ease-in-out;
}
.mizu-select:focus-visible {
  border-color: var(--color-brand-ycp);
  box-shadow: 0 0 0 1px var(--color-brand-ycp);
}

.mizu-select--sm {
  @apply h-[28px] text-[12px];
  padding: 0 28px 0 8px;
  border-radius: 4px;
  line-height: 1;
}
.mizu-select--md {
  @apply h-[36px] text-[12px];
  padding: 0 32px 0 10px;
  border-radius: 6px;
  line-height: 1;
}
.mizu-select--lg {
  @apply h-[40px] text-[14px];
  padding: 0 36px 0 10px;
  border-radius: 6px;
  line-height: 1;
}

.mizu-select--error {
  border-color: var(--color-feedback-error-base);
}
.mizu-select--error:focus-visible {
  border-color: var(--color-feedback-error-base);
  box-shadow: 0 0 0 1px var(--color-feedback-error-base);
}

.mizu-select--disabled {
  @apply bg-[var(--color-surface-muted)] text-[var(--color-foreground-tertiary)] cursor-not-allowed;
}

.mizu-select-chevron {
  @apply absolute pointer-events-none;
  right: 8px;
  width: 16px;
  height: 16px;
  color: var(--color-foreground-tertiary);
}

.mizu-select-wrapper--sm .mizu-select-chevron { right: 6px; }
.mizu-select-wrapper--lg .mizu-select-chevron { right: 10px; }

.mizu-select-helper {
  @apply text-[12px] text-[var(--color-foreground-secondary)];
}
.mizu-select-helper--error {
  @apply text-[var(--color-feedback-error-base)];
}
</style>
