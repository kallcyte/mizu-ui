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
  const classes = ["mizu-radio-group", `mizu-radio-group--${props.size}`, `mizu-radio-group--${props.orientation}`];

  if (props.disabled) classes.push("mizu-radio-group--disabled");

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});

function handleValueChange(value: unknown) {
  emit("update:modelValue", String(value));
}
</script>

<template>
  <div :class="['mizu-radio-wrapper', `mizu-radio-wrapper--${size}`]">
    <label
      v-if="label"
      class="mizu-radio-group-label"
    >
      {{ label }}
      <span v-if="required" class="mizu-radio-group-label__required" aria-hidden="true">*</span>
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
        :class="['mizu-radio-item', `mizu-radio-item--${size}`, { 'mizu-radio-item--disabled': item.disabled || disabled }]"
      >
        <RadioGroupItem
          :value="item.value"
          :disabled="item.disabled || disabled"
          :id="`${name || 'mizu-radio'}-${item.value}`"
          class="mizu-radio"
        >
          <RadioGroupIndicator class="mizu-radio__indicator" />
        </RadioGroupItem>
        <label
          v-if="item.label"
          :for="`${name || 'mizu-radio'}-${item.value}`"
          class="mizu-radio__item-label"
        >
          {{ item.label }}
        </label>
      </div>
    </RadioGroupRoot>
  </div>
</template>

<style>
@reference "../index.css";

.mizu-radio-wrapper {
  @apply flex flex-col;
  gap: 6px;
}

.mizu-radio-group-label {
  @apply font-medium text-[var(--color-foreground-primary)];
}
.mizu-radio-wrapper--sm .mizu-radio-group-label { @apply text-[12px]; }
.mizu-radio-wrapper--md .mizu-radio-group-label { @apply text-[12px]; }
.mizu-radio-wrapper--lg .mizu-radio-group-label { @apply text-[14px]; }
.mizu-radio-group-label__required {
  @apply ml-[2px] text-[var(--color-feedback-error-base)];
}

.mizu-radio-group {
  @apply flex;
}

.mizu-radio-group--vertical {
  @apply flex-col;
  gap: 10px;
}

.mizu-radio-group--horizontal {
  @apply flex-row flex-wrap;
  gap: 16px;
}

.mizu-radio-item {
  @apply flex items-center gap-[8px];
}

.mizu-radio-item--disabled {
  @apply cursor-not-allowed;
}

.mizu-radio {
  @apply p-0 shrink-0 w-[18px] h-[18px] rounded-full border transition-colors duration-200 ease-in-out outline-none inline-flex items-center justify-center;
  background-color: var(--color-surface-base);
  border-color: var(--color-foreground-tertiary);
}

.mizu-radio-item--sm .mizu-radio { @apply w-[16px] h-[16px]; }
.mizu-radio-item--md .mizu-radio { @apply w-[18px] h-[18px]; }
.mizu-radio-item--lg .mizu-radio { @apply w-[20px] h-[20px]; }

.mizu-radio:hover:not(.mizu-radio-item--disabled .mizu-radio) {
  border-color: var(--color-brand-primary);
}

.mizu-radio:focus-visible {
  box-shadow: 0 0 0 2px var(--color-brand-ycp);
}

.mizu-radio[data-state="checked"] {
  background-color: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
}

.mizu-radio[data-state="checked"]:hover {
  background-color: var(--color-brand-primary-hover);
  border-color: var(--color-brand-primary-hover);
}

.mizu-radio__indicator {
  @apply flex items-center justify-center w-full h-full;
}

.mizu-radio__indicator::after {
  content: "";
  @apply block rounded-full;
  width: 8px;
  height: 8px;
  background-color: #fff;
}

.mizu-radio-item--sm .mizu-radio__indicator::after {
  width: 6px;
  height: 6px;
}

.mizu-radio-item--lg .mizu-radio__indicator::after {
  width: 10px;
  height: 10px;
}

.mizu-radio__item-label {
  @apply font-normal text-[var(--color-foreground-primary)] cursor-pointer;
  line-height: 1.3;
}

.mizu-radio-item--sm .mizu-radio__item-label { @apply text-[12px]; }
.mizu-radio-item--md .mizu-radio__item-label { @apply text-[13px]; }
.mizu-radio-item--lg .mizu-radio__item-label { @apply text-[14px]; }

.mizu-radio-item--disabled .mizu-radio__item-label {
  @apply text-[var(--color-foreground-tertiary)] cursor-not-allowed;
}

.mizu-radio-item--disabled .mizu-radio {
  background-color: var(--color-surface-muted);
  border-color: var(--color-surface-muted);
}

.mizu-radio-item--disabled .mizu-radio[data-state="checked"] {
  background-color: var(--color-foreground-tertiary);
  border-color: var(--color-foreground-tertiary);
}
</style>
