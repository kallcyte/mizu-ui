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
  const classes = ["bp-switch", `bp-switch--${props.size}`];

  if (props.disabled) classes.push("bp-switch--disabled");
  if (isChecked.value) classes.push("bp-switch--checked");

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});
</script>

<template>
  <label
    :for="switchId"
    :class="['bp-switch-wrapper', `bp-switch-wrapper--${size}`, { 'bp-switch-wrapper--disabled': disabled, 'bp-switch-wrapper--no-label': !label }]"
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
      <SwitchThumb class="bp-switch__thumb" />
    </SwitchRoot>
    <span v-if="label" class="bp-switch__label">{{ label }}</span>
  </label>
</template>

<style>
@reference "../index.css";

.bp-switch-wrapper {
  @apply inline-flex items-center gap-[8px] cursor-pointer select-none;
}

.bp-switch-wrapper--disabled {
  @apply cursor-not-allowed;
}

.bp-switch {
  @apply shrink-0 relative rounded-full transition-colors duration-200 ease-in-out;
  background-color: var(--color-foreground-tertiary);
}

.bp-switch--checked {
  background-color: var(--color-brand-primary);
}

.bp-switch--checked:hover:not(.bp-switch--disabled) {
  background-color: var(--color-brand-primary-hover);
}

.bp-switch--sm { @apply w-[36px] h-[20px]; }
.bp-switch--md { @apply w-[44px] h-[24px]; }
.bp-switch--lg { @apply w-[52px] h-[28px]; }

.bp-switch:focus-visible {
  box-shadow: 0 0 0 2px var(--color-brand-accent);
}

.bp-switch--disabled {
  @apply cursor-not-allowed;
  background-color: var(--color-surface-muted);
}

.bp-switch--disabled.bp-switch--checked {
  background-color: var(--color-foreground-tertiary);
}

.bp-switch__thumb {
  @apply block rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out;
  transform: translateX(2px);
}

.bp-switch--checked .bp-switch__thumb {
  transform: translateX(calc(100% + 2px));
}

.bp-switch--disabled .bp-switch__thumb {
  background-color: var(--color-surface-base);
}

.bp-switch--sm .bp-switch__thumb { @apply w-[16px] h-[16px]; }
.bp-switch--md .bp-switch__thumb { @apply w-[20px] h-[20px]; }
.bp-switch--lg .bp-switch__thumb { @apply w-[24px] h-[24px]; }

.bp-switch--checked .bp-switch__thumb {
  background-color: var(--color-foreground-inverse);
}

.bp-switch__label {
  @apply font-normal text-[var(--color-foreground-primary)];
  line-height: 1.3;
}

.bp-switch-wrapper--sm .bp-switch__label { @apply text-[12px]; }
.bp-switch-wrapper--md .bp-switch__label { @apply text-[13px]; }
.bp-switch-wrapper--lg .bp-switch__label { @apply text-[14px]; }

.bp-switch-wrapper--disabled .bp-switch__label {
  @apply text-[var(--color-foreground-tertiary)];
}
</style>
