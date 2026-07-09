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
  const classes = ["mizu-textarea", `mizu-textarea--${props.size}`];

  if (props.error) classes.push("mizu-textarea--error");
  if (props.disabled) classes.push("mizu-textarea--disabled");

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
  <div :class="['mizu-textarea-wrapper', `mizu-textarea-wrapper--${size}`]">
    <label
      v-if="label"
      :for="textareaId"
      :class="['mizu-textarea-label', `mizu-textarea-label--${size}`]"
    >
      {{ label }}
      <span v-if="required" class="mizu-textarea-label__required" aria-hidden="true">*</span>
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
      :class="['mizu-textarea-helper', { 'mizu-textarea-helper--error': error }]"
    >
      {{ helperText }}
    </span>
  </div>
</template>

<style>
@reference "../index.css";

.mizu-textarea-wrapper {
  @apply flex flex-col;
  gap: 6px;
}

.mizu-textarea-label {
  @apply font-medium text-[var(--color-foreground-primary)];
}
.mizu-textarea-label--sm {
  @apply text-[12px];
}
.mizu-textarea-label--md {
  @apply text-[12px];
}
.mizu-textarea-label--lg {
  @apply text-[14px];
}
.mizu-textarea-label__required {
  @apply ml-[2px] text-[var(--color-feedback-error-base)];
}

.mizu-textarea {
  @apply w-full font-[inherit] outline-none resize-y;
  border: 1px solid var(--color-surface-muted);
  background-color: var(--color-surface-base);
  color: var(--color-foreground-primary);
  transition:
    border-color 200ms ease-in-out,
    box-shadow 200ms ease-in-out;
}
.mizu-textarea::placeholder {
  @apply text-[var(--color-foreground-tertiary)];
}
.mizu-textarea:focus-visible {
  border-color: var(--color-brand-ycp);
  box-shadow: 0 0 0 1px var(--color-brand-ycp);
}

.mizu-textarea--sm {
  @apply text-[12px];
  padding: 6px 8px;
  border-radius: 4px;
}
.mizu-textarea--md {
  @apply text-[12px];
  padding: 8px 10px;
  border-radius: 6px;
}
.mizu-textarea--lg {
  @apply text-[14px];
  padding: 10px 12px;
  border-radius: 6px;
}

.mizu-textarea--error {
  border-color: var(--color-feedback-error-base);
}
.mizu-textarea--error:focus-visible {
  border-color: var(--color-feedback-error-base);
  box-shadow: 0 0 0 1px var(--color-feedback-error-base);
}

.mizu-textarea--disabled {
  @apply bg-[var(--color-surface-muted)] text-[var(--color-foreground-tertiary)] cursor-not-allowed;
}

.mizu-textarea-helper {
  @apply text-[12px] text-[var(--color-foreground-secondary)];
}
.mizu-textarea-helper--error {
  @apply text-[var(--color-feedback-error-base)];
}
</style>
