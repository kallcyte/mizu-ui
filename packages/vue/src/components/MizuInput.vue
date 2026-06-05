<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface InputProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  size?: "sm" | "md" | "lg";
  name?: string;
  required?: boolean;
  label?: string;
  helperText?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: "",
  placeholder: "",
  disabled: false,
  error: false,
  type: "text",
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

const slots = defineSlots<{
  "leading-icon": () => unknown;
  "trailing-icon": () => unknown;
}>();

const hasLeadingIcon = computed(() => !!slots["leading-icon"]);
const hasTrailingIcon = computed(() => !!slots["trailing-icon"]);

const inputId = computed(() => {
  if (attrs.id) return attrs.id as string;
  if (props.name) return `mizu-input-${props.name}`;
  return "mizu-input";
});

const helperId = computed(() => `${inputId}-helper`);

const inputClasses = computed(() => {
  const classes = [
    "bp-input",
    `bp-input--${props.size}`,
  ];

  if (props.error) classes.push("bp-input--error");
  if (props.disabled) classes.push("bp-input--disabled");
  if (hasLeadingIcon.value) classes.push("bp-input--has-leading");
  if (hasTrailingIcon.value) classes.push("bp-input--has-trailing");

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

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
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
  <div :class="['bp-input-wrapper', `bp-input-wrapper--${size}`]">
    <label
      v-if="label"
      :for="inputId"
      :class="['bp-input-label', `bp-input-label--${size}`]"
    >
      {{ label }}
      <span v-if="required" class="bp-input-label__required" aria-hidden="true">*</span>
    </label>
    <div class="bp-input-container">
      <span v-if="hasLeadingIcon" class="bp-input-icon bp-input-icon--leading">
        <slot name="leading-icon" />
      </span>
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :name="name"
        :required="required"
        :class="inputClasses"
        v-bind="ariaAttributes"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="hasTrailingIcon" class="bp-input-icon bp-input-icon--trailing">
        <slot name="trailing-icon" />
      </span>
    </div>
    <span
      v-if="helperText"
      :id="helperId"
      :class="['bp-input-helper', { 'bp-input-helper--error': error }]"
    >
      {{ helperText }}
    </span>
  </div>
</template>

<style>
@reference "../index.css";

/* Wrapper */
.bp-input-wrapper {
  @apply flex flex-col;
  gap: 6px;
}

/* Label */
.bp-input-label {
  @apply font-medium text-[var(--color-foreground-primary)];
}
.bp-input-label--sm { @apply text-[12px]; }
.bp-input-label--md { @apply text-[12px]; }
.bp-input-label--lg { @apply text-[14px]; }
.bp-input-label__required {
  @apply ml-[2px] text-[var(--color-feedback-error-base)];
}

/* Container */
.bp-input-container {
  @apply relative flex items-center;
}

/* Base input */
.bp-input {
  @apply w-full font-[inherit] outline-none;
  border: 1px solid var(--color-surface-muted);
  background-color: var(--color-surface-base);
  color: var(--color-foreground-primary);
  transition: border-color 200ms ease-in-out, box-shadow 200ms ease-in-out;
}
.bp-input::placeholder {
  @apply text-[var(--color-foreground-tertiary)];
}
.bp-input:focus-visible {
  border-color: var(--color-brand-accent);
  box-shadow: 0 0 0 1px var(--color-brand-accent);
}

/* Sizes */
.bp-input--sm {
  @apply h-[28px] text-[12px];
  padding: 0 8px;
  border-radius: 4px;
}
.bp-input--md {
  @apply h-[36px] text-[12px];
  padding: 0 10px;
  border-radius: 6px;
}
.bp-input--lg {
  @apply h-[40px] text-[14px];
  padding: 0 10px;
  border-radius: 6px;
}

/* Icon padding */
.bp-input--has-leading.bp-input--sm { @apply pl-[28px]; }
.bp-input--has-leading.bp-input--md { @apply pl-[34px]; }
.bp-input--has-leading.bp-input--lg { @apply pl-[36px]; }
.bp-input--has-trailing.bp-input--sm { @apply pr-[28px]; }
.bp-input--has-trailing.bp-input--md { @apply pr-[34px]; }
.bp-input--has-trailing.bp-input--lg { @apply pr-[36px]; }

/* Icons */
.bp-input-icon {
  @apply absolute flex items-center justify-center pointer-events-none;
  color: var(--color-foreground-tertiary);
}
.bp-input-icon--leading {
  @apply left-0;
}
.bp-input-icon--trailing {
  @apply right-0;
}
.bp-input-wrapper--sm .bp-input-icon { @apply w-[28px] h-[28px]; }
.bp-input-wrapper--md .bp-input-icon { @apply w-[34px] h-[36px]; }
.bp-input-wrapper--lg .bp-input-icon { @apply w-[36px] h-[40px]; }
.bp-input-icon svg {
  @apply w-[14px] h-[14px];
}

/* Error state */
.bp-input--error {
  border-color: var(--color-feedback-error-base);
}
.bp-input--error:focus-visible {
  border-color: var(--color-feedback-error-base);
  box-shadow: 0 0 0 1px var(--color-feedback-error-base);
}

/* Disabled */
.bp-input--disabled {
  @apply bg-[var(--color-surface-muted)] text-[var(--color-foreground-tertiary)] cursor-not-allowed;
}

/* Helper text */
.bp-input-helper {
  @apply text-[12px] text-[var(--color-foreground-secondary)];
}
.bp-input-helper--error {
  @apply text-[var(--color-feedback-error-base)];
}
</style>
