<script setup lang="ts">
import { computed, useAttrs, useId } from "vue";
import { SwitchRoot, SwitchThumb } from "reka-ui";

export interface SwitchProps {
  modelValue?: boolean | string | number;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  trueValue?: boolean | string | number;
  falseValue?: boolean | string | number;
}

const props = withDefaults(defineProps<SwitchProps>(), {
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
  "update:modelValue": [value: boolean | string | number];
}>();

const attrs = useAttrs();
const generatedId = useId();

const switchId = computed(() => {
  if (attrs.id) return attrs.id as string;
  if (props.name) return `mizu-switch-${props.name}`;
  return generatedId;
});

const isChecked = computed(() => props.modelValue === props.trueValue);

const switchClasses = computed(() => {
  const classes = ["mizu-switch", `mizu-switch--${props.size}`];

  if (props.disabled) classes.push("mizu-switch--disabled");
  if (isChecked.value) classes.push("mizu-switch--checked");

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});
</script>

<template>
  <label
    :for="switchId"
    :class="['mizu-switch-wrapper', `mizu-switch-wrapper--${size}`, { 'mizu-switch-wrapper--disabled': disabled, 'mizu-switch-wrapper--no-label': !label }]"
  >
    <SwitchRoot
      :id="switchId"
      :model-value="modelValue"
      :true-value="trueValue"
      :false-value="falseValue"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
      :class="switchClasses"
      @update:model-value="(value) => emit('update:modelValue', value as boolean | string | number)"
    >
      <SwitchThumb class="mizu-switch__thumb" />
    </SwitchRoot>
    <span v-if="label" class="mizu-switch__label">{{ label }}</span>
  </label>
</template>

<style>
@reference "../index.css";

.mizu-switch-wrapper {
  @apply inline-flex items-center gap-[8px] cursor-pointer select-none;
}

.mizu-switch-wrapper--disabled {
  @apply cursor-not-allowed;
}

.mizu-switch {
  @apply shrink-0 relative rounded-full transition-colors duration-200 ease-in-out;
  background-color: var(--color-foreground-tertiary);
}

.mizu-switch--checked {
  background-color: var(--color-brand-primary);
}

.mizu-switch--checked:hover:not(.mizu-switch--disabled) {
  background-color: var(--color-brand-primary-hover);
}

.mizu-switch--sm { @apply w-[36px] h-[20px]; }
.mizu-switch--md { @apply w-[44px] h-[24px]; }
.mizu-switch--lg { @apply w-[52px] h-[28px]; }

.mizu-switch:focus-visible {
  box-shadow: 0 0 0 2px var(--color-brand-accent);
}

.mizu-switch--disabled {
  @apply cursor-not-allowed;
  background-color: var(--color-surface-muted);
}

.mizu-switch--disabled.mizu-switch--checked {
  background-color: var(--color-foreground-tertiary);
}

.mizu-switch__thumb {
  @apply block rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out;
  transform: translateX(2px);
}

.mizu-switch--checked .mizu-switch__thumb {
  transform: translateX(calc(100% + 2px));
}

.mizu-switch--disabled .mizu-switch__thumb {
  background-color: var(--color-surface-base);
}

.mizu-switch--sm .mizu-switch__thumb { @apply w-[16px] h-[16px]; }
.mizu-switch--md .mizu-switch__thumb { @apply w-[20px] h-[20px]; }
.mizu-switch--lg .mizu-switch__thumb { @apply w-[24px] h-[24px]; }

.mizu-switch--checked .mizu-switch__thumb {
  background-color: #fff;
}

.mizu-switch__label {
  @apply font-normal text-[var(--color-foreground-primary)];
  line-height: 1.3;
}

.mizu-switch-wrapper--sm .mizu-switch__label { @apply text-[12px]; }
.mizu-switch-wrapper--md .mizu-switch__label { @apply text-[13px]; }
.mizu-switch-wrapper--lg .mizu-switch__label { @apply text-[14px]; }

.mizu-switch-wrapper--disabled .mizu-switch__label {
  @apply text-[var(--color-foreground-tertiary)];
}
</style>
