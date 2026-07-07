<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";

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
  showPassword?: boolean;
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
  showPassword: false,
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

const passwordVisible = ref(false);

const hasLeadingIcon = computed(() => !!slots["leading-icon"]);
const hasTrailingIcon = computed(() => !!slots["trailing-icon"]);
const hasPasswordToggle = computed(() => props.showPassword && props.type === "password");

const inputType = computed(() => {
  if (props.type === "password" && passwordVisible.value) return "text";
  return props.type;
});

const inputId = computed(() => {
  if (attrs.id) return attrs.id as string;
  if (props.name) return `mizu-input-${props.name}`;
  return "mizu-input";
});

const helperId = computed(() => `${inputId.value}-helper`);

const inputClasses = computed(() => {
  const classes = ["mizu-input", `mizu-input--${props.size}`];

  if (props.error) classes.push("mizu-input--error");
  if (props.disabled) classes.push("mizu-input--disabled");
  if (hasLeadingIcon.value) classes.push("mizu-input--has-leading");
  if (hasTrailingIcon.value || hasPasswordToggle.value) classes.push("mizu-input--has-trailing");

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

function togglePassword() {
  passwordVisible.value = !passwordVisible.value;
}
</script>

<template>
  <div :class="['mizu-input-wrapper', `mizu-input-wrapper--${size}`]">
    <label v-if="label" :for="inputId" :class="['mizu-input-label', `mizu-input-label--${size}`]">
      {{ label }}
      <span v-if="required" class="mizu-input-label__required" aria-hidden="true">*</span>
    </label>
    <div class="mizu-input-container">
      <span v-if="hasLeadingIcon" class="mizu-input-icon mizu-input-icon--leading">
        <slot name="leading-icon" />
      </span>
      <input
        :id="inputId"
        :type="inputType"
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
      <span v-if="hasTrailingIcon" class="mizu-input-icon mizu-input-icon--trailing">
        <slot name="trailing-icon" />
      </span>
      <button
        v-if="hasPasswordToggle"
        type="button"
        class="mizu-input-password-toggle"
        :aria-label="passwordVisible ? 'Hide password' : 'Show password'"
        @click="togglePassword"
      >
        <svg
          v-if="!passwordVisible"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mizu-input-password-icon"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mizu-input-password-icon"
        >
          <path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24M1 1l22 22"
          ></path>
        </svg>
      </button>
    </div>
    <span
      v-if="helperText"
      :id="helperId"
      :class="['mizu-input-helper', { 'mizu-input-helper--error': error }]"
    >
      {{ helperText }}
    </span>
  </div>
</template>

<style>
@reference "../index.css";

.mizu-input-wrapper {
  @apply flex flex-col;
  gap: 6px;
}
.mizu-input-label {
  @apply font-medium text-[var(--color-foreground-primary)];
}
.mizu-input-label--sm {
  @apply text-[12px];
}
.mizu-input-label--md {
  @apply text-[12px];
}
.mizu-input-label--lg {
  @apply text-[14px];
}
.mizu-input-label__required {
  @apply ml-[2px] text-[var(--color-feedback-error-base)];
}

.mizu-input-container {
  @apply relative flex items-center;
}

.mizu-input {
  @apply w-full font-[inherit] outline-none;
  box-sizing: border-box;
  line-height: 1;
  border: 1px solid var(--color-surface-muted);
  background-color: var(--color-surface-base);
  color: var(--color-foreground-primary);
  transition:
    border-color 200ms ease-in-out,
    box-shadow 200ms ease-in-out;
}
.mizu-input::placeholder {
  @apply text-[var(--color-foreground-tertiary)];
}
.mizu-input:focus-visible {
  border-color: var(--color-brand-ycp);
  box-shadow: 0 0 0 1px var(--color-brand-ycp);
}

.mizu-input--sm {
  @apply h-[28px] text-[12px];
  padding: 0 8px;
  border-radius: 4px;
  line-height: 1;
}
.mizu-input--md {
  @apply h-[36px] text-[12px];
  padding: 0 10px;
  border-radius: 6px;
  line-height: 1;
}
.mizu-input--lg {
  @apply h-[40px] text-[14px];
  padding: 0 10px;
  border-radius: 6px;
  line-height: 1;
}

.mizu-input--has-leading.mizu-input--sm {
  @apply pl-[28px];
}
.mizu-input--has-leading.mizu-input--md {
  @apply pl-[34px];
}
.mizu-input--has-leading.mizu-input--lg {
  @apply pl-[36px];
}
.mizu-input--has-trailing.mizu-input--sm {
  @apply pr-[28px];
}
.mizu-input--has-trailing.mizu-input--md {
  @apply pr-[34px];
}
.mizu-input--has-trailing.mizu-input--lg {
  @apply pr-[36px];
}

.mizu-input-icon {
  @apply absolute flex items-center justify-center pointer-events-none;
  color: var(--color-foreground-tertiary);
}
.mizu-input-icon--leading {
  @apply left-0;
}
.mizu-input-icon--trailing {
  @apply right-0;
}
.mizu-input-wrapper--sm .mizu-input-icon {
  @apply w-[28px] h-[28px];
}
.mizu-input-wrapper--md .mizu-input-icon {
  @apply w-[34px] h-[36px];
}
.mizu-input-wrapper--lg .mizu-input-icon {
  @apply w-[36px] h-[40px];
}
.mizu-input-icon svg {
  @apply w-[14px] h-[14px];
}

.mizu-input-password-toggle {
  @apply absolute right-0 flex items-center justify-center cursor-pointer border-none bg-transparent p-0;
  color: var(--color-foreground-tertiary);
}
.mizu-input-password-toggle:hover {
  color: var(--color-foreground-secondary);
}
.mizu-input-wrapper--sm .mizu-input-password-toggle {
  @apply w-[28px] h-[28px];
}
.mizu-input-wrapper--md .mizu-input-password-toggle {
  @apply w-[34px] h-[36px];
}
.mizu-input-wrapper--lg .mizu-input-password-toggle {
  @apply w-[36px] h-[40px];
}
.mizu-input-password-icon {
  @apply w-[14px] h-[14px];
}

.mizu-input--error {
  border-color: var(--color-feedback-error-base);
}
.mizu-input--error:focus-visible {
  border-color: var(--color-feedback-error-base);
  box-shadow: 0 0 0 1px var(--color-feedback-error-base);
}
.mizu-input--disabled {
  @apply bg-[var(--color-surface-muted)] text-[var(--color-foreground-tertiary)] cursor-not-allowed;
}

.mizu-input-helper {
  @apply text-[12px] text-[var(--color-foreground-secondary)];
}
.mizu-input-helper--error {
  @apply text-[var(--color-feedback-error-base)];
}
</style>
