<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from "reka-ui";

export interface RadioItem {
  value: string;
  label?: string;
  disabled?: boolean;
}

export interface RadioProps {
  modelValue?: string;
  items?: RadioItem[];
  disabled?: boolean;
  name?: string;
  required?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  orientation?: "vertical" | "horizontal";
}

const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: "",
  items: () => [],
  disabled: false,
  name: undefined,
  required: false,
  label: undefined,
  size: "md",
  orientation: "vertical",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const attrs = useAttrs();

const radioGroupClasses = computed(() => {
  const classes = ["bp-radio-group", `bp-radio-group--${props.size}`, `bp-radio-group--${props.orientation}`];

  if (props.disabled) classes.push("bp-radio-group--disabled");

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});

function handleValueChange(value: unknown) {
  emit("update:modelValue", String(value));
}
</script>

<template>
  <div :class="['bp-radio-wrapper', `bp-radio-wrapper--${size}`]">
    <label
      v-if="label"
      class="bp-radio-group-label"
    >
      {{ label }}
      <span v-if="required" class="bp-radio-group-label__required" aria-hidden="true">*</span>
    </label>
    <RadioGroupRoot
      :model-value="modelValue"
      :class="radioGroupClasses"
      :disabled="disabled"
      :name="name"
      :required="required"
      @update:model-value="handleValueChange"
    >
      <div
        v-for="item in items"
        :key="item.value"
        :class="['bp-radio-item', `bp-radio-item--${size}`, { 'bp-radio-item--disabled': item.disabled || disabled }]"
      >
        <RadioGroupItem
          :value="item.value"
          :disabled="item.disabled || disabled"
          :id="`${name || 'mizu-radio'}-${item.value}`"
          class="bp-radio"
        >
          <RadioGroupIndicator class="bp-radio__indicator" />
        </RadioGroupItem>
        <label
          v-if="item.label"
          :for="`${name || 'mizu-radio'}-${item.value}`"
          class="bp-radio__item-label"
        >
          {{ item.label }}
        </label>
      </div>
    </RadioGroupRoot>
  </div>
</template>

<style>
@reference "../index.css";

.bp-radio-wrapper {
  @apply flex flex-col;
  gap: 6px;
}

.bp-radio-group-label {
  @apply font-medium text-[var(--color-foreground-primary)];
}
.bp-radio-wrapper--sm .bp-radio-group-label { @apply text-[12px]; }
.bp-radio-wrapper--md .bp-radio-group-label { @apply text-[12px]; }
.bp-radio-wrapper--lg .bp-radio-group-label { @apply text-[14px]; }
.bp-radio-group-label__required {
  @apply ml-[2px] text-[var(--color-feedback-error-base)];
}

.bp-radio-group {
  @apply flex;
}

.bp-radio-group--vertical {
  @apply flex-col;
  gap: 10px;
}

.bp-radio-group--horizontal {
  @apply flex-row flex-wrap;
  gap: 16px;
}

.bp-radio-item {
  @apply flex items-center gap-[8px];
}

.bp-radio-item--disabled {
  @apply cursor-not-allowed;
}

.bp-radio {
  @apply shrink-0 w-[18px] h-[18px] rounded-full border transition-colors duration-200 ease-in-out outline-none inline-flex items-center justify-center;
  background-color: var(--color-surface-base);
  border-color: var(--color-foreground-tertiary);
}

.bp-radio-item--sm .bp-radio { @apply w-[16px] h-[16px]; }
.bp-radio-item--md .bp-radio { @apply w-[18px] h-[18px]; }
.bp-radio-item--lg .bp-radio { @apply w-[20px] h-[20px]; }

.bp-radio:hover:not(.bp-radio-item--disabled .bp-radio) {
  border-color: var(--color-brand-primary);
}

.bp-radio:focus-visible {
  box-shadow: 0 0 0 2px var(--color-brand-accent);
}

.bp-radio[data-state="checked"] {
  background-color: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

.bp-radio[data-state="checked"]:hover {
  background-color: var(--color-brand-primary-hover);
  border-color: var(--color-brand-primary-hover);
}

.bp-radio__indicator {
  @apply flex items-center justify-center w-full h-full;
}

.bp-radio__indicator::after {
  content: "";
  @apply block rounded-full;
  width: 8px;
  height: 8px;
  background-color: var(--color-foreground-inverse);
}

.bp-radio-item--sm .bp-radio__indicator::after {
  width: 6px;
  height: 6px;
}

.bp-radio-item--lg .bp-radio__indicator::after {
  width: 10px;
  height: 10px;
}

.bp-radio__item-label {
  @apply font-normal text-[var(--color-foreground-primary)] cursor-pointer;
  line-height: 1.3;
}

.bp-radio-item--sm .bp-radio__item-label { @apply text-[12px]; }
.bp-radio-item--md .bp-radio__item-label { @apply text-[13px]; }
.bp-radio-item--lg .bp-radio__item-label { @apply text-[14px]; }

.bp-radio-item--disabled .bp-radio__item-label {
  @apply text-[var(--color-foreground-tertiary)] cursor-not-allowed;
}

.bp-radio-item--disabled .bp-radio {
  background-color: var(--color-surface-muted);
  border-color: var(--color-surface-muted);
}

.bp-radio-item--disabled .bp-radio[data-state="checked"] {
  background-color: var(--color-foreground-tertiary);
  border-color: var(--color-foreground-tertiary);
}
</style>
