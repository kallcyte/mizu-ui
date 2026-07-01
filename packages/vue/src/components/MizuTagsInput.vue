<script setup lang="ts">
import { computed, ref, useAttrs, nextTick } from "vue";
import MizuTag from "./MizuTag.vue";

export interface TagsInputProps {
  modelValue?: string[];
  defaultValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  tagVariant?: "primary" | "accent" | "success" | "warning" | "error" | "info";
  separator?: ("Enter" | "," | ";" | "Tab")[];
  maxTags?: number;
  allowDuplicates?: boolean;
  validate?: ((value: string) => boolean | string) | undefined;
  name?: string;
  label?: string;
  helperText?: string;
  id?: string;
}

const props = withDefaults(defineProps<TagsInputProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  placeholder: "Add a tag...",
  disabled: false,
  readOnly: false,
  required: false,
  error: false,
  size: "md",
  tagVariant: "primary",
  separator: () => ["Enter", ","],
  maxTags: undefined,
  allowDuplicates: false,
  validate: undefined,
  name: undefined,
  label: undefined,
  helperText: undefined,
  id: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
  add: [value: string];
  remove: [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  "invalid-tag": [value: string, reason: "duplicate" | "max" | "validation"];
}>();

const attrs = useAttrs();

const isControlled = computed(() => props.modelValue !== undefined);

const internalTags = ref<string[]>([...(props.defaultValue ?? [])]);

const tags = computed<string[]>(() => {
  return isControlled.value ? (props.modelValue as string[]) : internalTags.value;
});

const inputValue = ref("");
const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const showErrorFlash = ref(false);

const inputId = computed(() => {
  if (props.id) return props.id;
  if (attrs.id) return attrs.id as string;
  if (props.name) return `mizu-input-${props.name}`;
  return "mizu-input";
});

const helperId = computed(() => `${inputId.value}-helper`);

const isAtMax = computed(() => {
  if (props.maxTags === undefined) return false;
  return tags.value.length >= props.maxTags;
});

const wrapperClasses = computed(() => {
  const classes = ["mizu-input-wrapper", `mizu-input-wrapper--${props.size}`];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const containerClasses = computed(() => {
  const classes = ["mizu-input", "mizu-tags-input", `mizu-input--${props.size}`];
  if (props.error) classes.push("mizu-input--error");
  if (props.disabled) classes.push("mizu-input--disabled");
  if (isFocused.value) classes.push("mizu-tags-input--focused");
  if (isAtMax.value) classes.push("mizu-tags-input--max");
  return classes.join(" ");
});

const inputClasses = computed(() => {
  const classes = ["mizu-tags-input__field", `mizu-tags-input__field--${props.size}`];
  if (isAtMax.value) classes.push("mizu-tags-input__field--disabled");
  return classes.join(" ");
});

const ariaAttributes = computed(() => {
  const a: Record<string, string | boolean | undefined> = {
    "aria-disabled": props.disabled,
    "aria-required": props.required,
    "aria-invalid": props.error,
    role: "group",
  };
  if (props.helperText) {
    a["aria-describedby"] = helperId.value;
  }
  return a;
});

function commitValue(raw: string) {
  const value = raw.trim();
  if (value === "") return;

  if (!props.allowDuplicates && tags.value.includes(value)) {
    emit("invalid-tag", value, "duplicate");
    flashError();
    return;
  }

  if (isAtMax.value) {
    emit("invalid-tag", value, "max");
    flashError();
    return;
  }

  if (props.validate) {
    const result = props.validate(value);
    if (result === false || (typeof result === "string" && result === "")) {
      emit("invalid-tag", value, "validation");
      flashError();
      return;
    }
  }

  const next = [...tags.value, value];
  if (!isControlled.value) {
    internalTags.value = next;
  }
  emit("update:modelValue", next);
  emit("add", value);
}

function flashError() {
  showErrorFlash.value = true;
  setTimeout(() => {
    showErrorFlash.value = false;
  }, 300);
}

function splitSeparators(text: string): string[] {
  const seps = props.separator;
  if (seps.length === 0) return [text];
  const escaped = seps.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(escaped, "g");
  return text.split(regex).map((p) => p.trim()).filter((p) => p !== "");
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (value.includes(",") || value.includes(";")) {
    const parts = splitSeparators(value);
    inputValue.value = "";
    for (const part of parts) {
      commitValue(part);
    }
    return;
  }

  inputValue.value = value;
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled || props.readOnly) return;

  const key = event.key;

  if (key === "Enter" || key === "," || key === ";" || (key === "Tab" && inputValue.value !== "")) {
    if (key === "Tab" && !event.shiftKey && inputValue.value !== "") {
      event.preventDefault();
    }
    if (inputValue.value !== "") {
      event.preventDefault();
      commitValue(inputValue.value);
      inputValue.value = "";
    }
    return;
  }

  if (key === "Backspace" && inputValue.value === "" && tags.value.length > 0) {
    const last = tags.value[tags.value.length - 1];
    removeTag(last);
    return;
  }
}

function handlePaste(event: ClipboardEvent) {
  const text = event.clipboardData?.getData("text");
  if (!text) return;

  if (text.includes(",") || text.includes(";") || text.includes("\n")) {
    event.preventDefault();
    const parts = splitSeparators(text);
    for (const part of parts) {
      commitValue(part);
    }
  }
}

function removeTag(tag: string) {
  const next = tags.value.filter((t) => t !== tag);
  if (!isControlled.value) {
    internalTags.value = next;
  }
  emit("update:modelValue", next);
  emit("remove", tag);
  nextTick(() => {
    inputRef.value?.focus();
  });
}

function handleFocus(event: FocusEvent) {
  isFocused.value = true;
  emit("focus", event);
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false;
  if (inputValue.value !== "") {
    commitValue(inputValue.value);
    inputValue.value = "";
  }
  emit("blur", event);
}

function handleContainerClick(event: MouseEvent) {
  if (props.disabled || props.readOnly) return;
  const target = event.target as HTMLElement;
  if (target.closest("button")) return;
  inputRef.value?.focus();
}
</script>

<template>
  <div :class="wrapperClasses">
    <label
      v-if="label"
      :for="inputId"
      :class="['mizu-input-label', `mizu-input-label--${size}`]"
    >
      {{ label }}
      <span v-if="required" class="mizu-input-label__required" aria-hidden="true">*</span>
    </label>
    <div
      :id="inputId"
      :class="containerClasses"
      v-bind="ariaAttributes"
      @click="handleContainerClick"
    >
      <MizuTag
        v-for="(tag, index) in tags"
        :key="`${tag}-${index}`"
        :variant="tagVariant"
        :closable="!disabled && !readOnly"
        :class="['mizu-tags-input__tag', { 'mizu-tags-input__tag--flash': showErrorFlash }]"
        @close="removeTag(tag)"
      >
        {{ tag }}
      </MizuTag>
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        :class="inputClasses"
        :placeholder="tags.length === 0 ? placeholder : ''"
        :disabled="disabled"
        :readonly="readOnly"
        :name="name"
        autocomplete="off"
        @input="handleInput"
        @keydown="handleKeydown"
        @paste="handlePaste"
        @focus="handleFocus"
        @blur="handleBlur"
      />
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

.mizu-tags-input {
  @apply flex flex-wrap items-center w-full;
  font-family: inherit;
  gap: 4px;
  height: auto;
  min-height: unset;
  cursor: text;
}

.mizu-tags-input.mizu-input--sm {
  min-height: 28px;
  padding: 2px 8px;
}
.mizu-tags-input.mizu-input--md {
  min-height: 36px;
  padding: 6px 10px;
}
.mizu-tags-input.mizu-input--lg {
  min-height: 40px;
  padding: 8px 10px;
}

.mizu-tags-input.mizu-input--disabled {
  cursor: not-allowed;
}

.mizu-tags-input.mizu-tags-input--focused {
  border-color: var(--color-brand-accent);
  box-shadow: 0 0 0 1px var(--color-brand-accent);
}

.mizu-tags-input.mizu-input--error.mizu-tags-input--focused {
  border-color: var(--color-feedback-error-base);
  box-shadow: 0 0 0 1px var(--color-feedback-error-base);
}

.mizu-tags-input__tag {
  animation: mizu-tags-input-pop 150ms ease-out;
}
.mizu-tags-input__tag.mizu-tags-input__tag--flash {
  animation: mizu-tags-input-shake 200ms ease-in-out;
}

.mizu-tags-input__field {
  @apply font-[inherit] outline-none;
  all: revert;
  flex: 1;
  min-width: 80px;
  height: 24px;
  line-height: 24px;
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
  color: inherit;
  box-sizing: border-box;
  font-family: inherit;
}
.mizu-tags-input__field::placeholder {
  color: var(--color-foreground-tertiary);
}
.mizu-tags-input__field:disabled {
  cursor: not-allowed;
  background: transparent;
}

.mizu-tags-input__field--sm { font-size: 12px; }
.mizu-tags-input__field--md { font-size: 12px; }
.mizu-tags-input__field--lg { font-size: 14px; }

.mizu-tags-input__field--disabled {
  cursor: not-allowed;
}

.mizu-tags-input--max .mizu-tags-input__field:not(:disabled) {
  cursor: not-allowed;
}

@keyframes mizu-tags-input-pop {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes mizu-tags-input-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}
</style>