<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface TextareaProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  name?: string;
  required?: boolean;
  label?: string;
  helperText?: string;
  rows?: number;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: "",
  placeholder: "",
  disabled: false,
  error: false,
  size: "md",
  name: undefined,
  required: false,
  label: undefined,
  helperText: undefined,
  rows: 3,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const attrs = useAttrs();

const textareaId = computed(() => {
  if (attrs.id) return attrs.id as string;
  if (props.name) return `mizu-textarea-${props.name}`;
  return "mizu-textarea";
});

const helperId = computed(() => `${textareaId.value}-helper`);

const textareaClasses = computed(() => {
  const classes = [
    "bp-textarea",
    `bp-textarea--${props.size}`,
  ];

  if (props.error) classes.push("bp-textarea--error");
  if (props.disabled) classes.push("bp-textarea--disabled");

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
  const target = event.target as HTMLTextAreaElement;
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
  <div :class="['bp-textarea-wrapper', `bp-textarea-wrapper--${size}`]">
    <label
      v-if="label"
      :for="textareaId"
      :class="['bp-textarea-label', `bp-textarea-label--${size}`]"
    >
      {{ label }}
      <span v-if="required" class="bp-textarea-label__required" aria-hidden="true">*</span>
    </label>
    <textarea
      :id="textareaId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :name="name"
      :required="required"
      :rows="rows"
      :class="textareaClasses"
      v-bind="ariaAttributes"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span
      v-if="helperText"
      :id="helperId"
      :class="['bp-textarea-helper', { 'bp-textarea-helper--error': error }]"
    >
      {{ helperText }}
    </span>
  </div>
</template>

<style>
@reference "../index.css";

.bp-textarea-wrapper {
  @apply flex flex-col;
  gap: 6px;
}

.bp-textarea-label {
  @apply font-medium text-[var(--color-foreground-primary)];
}
.bp-textarea-label--sm { @apply text-[12px]; }
.bp-textarea-label--md { @apply text-[12px]; }
.bp-textarea-label--lg { @apply text-[14px]; }
.bp-textarea-label__required {
  @apply ml-[2px] text-[var(--color-feedback-error-base)];
}

.bp-textarea {
  @apply w-full font-[inherit] outline-none resize-y;
  border: 1px solid var(--color-surface-muted);
  background-color: var(--color-surface-base);
  color: var(--color-foreground-primary);
  transition: border-color 200ms ease-in-out, box-shadow 200ms ease-in-out;
}
.bp-textarea::placeholder {
  @apply text-[var(--color-foreground-tertiary)];
}
.bp-textarea:focus-visible {
  border-color: var(--color-brand-accent);
  box-shadow: 0 0 0 1px var(--color-brand-accent);
}

.bp-textarea--sm {
  @apply text-[12px];
  padding: 6px 8px;
  border-radius: 4px;
}
.bp-textarea--md {
  @apply text-[12px];
  padding: 8px 10px;
  border-radius: 6px;
}
.bp-textarea--lg {
  @apply text-[14px];
  padding: 10px 12px;
  border-radius: 6px;
}

.bp-textarea--error {
  border-color: var(--color-feedback-error-base);
}
.bp-textarea--error:focus-visible {
  border-color: var(--color-feedback-error-base);
  box-shadow: 0 0 0 1px var(--color-feedback-error-base);
}

.bp-textarea--disabled {
  @apply bg-[var(--color-surface-muted)] text-[var(--color-foreground-tertiary)] cursor-not-allowed;
}

.bp-textarea-helper {
  @apply text-[12px] text-[var(--color-foreground-secondary)];
}
.bp-textarea-helper--error {
  @apply text-[var(--color-feedback-error-base)];
}
</style>
