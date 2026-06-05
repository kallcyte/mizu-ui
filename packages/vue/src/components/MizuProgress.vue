<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ProgressIndicator, ProgressRoot } from "reka-ui";

export interface ProgressProps {
  modelValue?: number | null;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "accent" | "success" | "warning" | "error" | "info";
  showLabel?: boolean;
  label?: string;
  getValueText?: (value: number | null | undefined, max: number) => string | undefined;
}

const props = withDefaults(defineProps<ProgressProps>(), {
  modelValue: 0,
  max: 100,
  size: "md",
  variant: "primary",
  showLabel: false,
  label: undefined,
  getValueText: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: number | null];
}>();

const attrs = useAttrs();

const percent = computed(() => {
  if (props.modelValue == null) return null;
  const clamped = Math.max(0, Math.min(props.modelValue, props.max));
  return (clamped / props.max) * 100;
});

const displayText = computed(() => {
  if (props.label) return props.label;
  if (percent.value == null) return "";
  return `${Math.round(percent.value)}%`;
});

const progressClasses = computed(() => {
  const classes = ["bp-progress", `bp-progress--${props.size}`, `bp-progress--${props.variant}`];

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});

const indicatorStyle = computed(() => {
  if (percent.value == null) return undefined;
  return { transform: `translateX(-${100 - percent.value}%)` };
});
</script>

<template>
  <div :class="['bp-progress-wrapper', `bp-progress-wrapper--${size}`]">
    <ProgressRoot
      :model-value="modelValue"
      :max="max"
      :class="progressClasses"
      :get-value-text="getValueText"
      @update:model-value="(value) => emit('update:modelValue', (value ?? null) as number | null)"
    >
      <ProgressIndicator
        class="bp-progress__indicator"
        :style="indicatorStyle"
      />
    </ProgressRoot>
    <span v-if="showLabel" class="bp-progress__label">{{ displayText }}</span>
  </div>
</template>

<style>
@reference "../index.css";

.bp-progress-wrapper {
  @apply inline-flex items-center w-full;
  gap: 8px;
}

.bp-progress {
  @apply relative w-full overflow-hidden rounded-full;
  background-color: var(--color-surface-muted);
}

.bp-progress--sm { height: 4px; }
.bp-progress--md { height: 8px; }
.bp-progress--lg { height: 12px; }

.bp-progress__indicator {
  @apply h-full w-full;
  background-color: var(--color-brand-primary);
  transition: transform var(--duration-normal, 300ms) ease-in-out;
  will-change: transform;
}

.bp-progress--accent .bp-progress__indicator {
  background-color: var(--color-brand-accent);
}
.bp-progress--success .bp-progress__indicator {
  background-color: var(--color-feedback-success-base);
}
.bp-progress--warning .bp-progress__indicator {
  background-color: var(--color-feedback-warning-base);
}
.bp-progress--error .bp-progress__indicator {
  background-color: var(--color-feedback-error-base);
}
.bp-progress--info .bp-progress__indicator {
  background-color: var(--color-feedback-info-base);
}

.bp-progress[data-state="indeterminate"] .bp-progress__indicator {
  width: 30%;
  @apply absolute top-0 left-0;
  animation: bp-progress-indeterminate 1.4s ease-in-out infinite;
  transition: none;
}

.bp-progress[data-state="complete"] .bp-progress__indicator {
  background-color: var(--color-feedback-success-base);
}

@keyframes bp-progress-indeterminate {
  0% {
    left: -30%;
  }
  100% {
    left: 100%;
  }
}

.bp-progress__label {
  @apply font-medium shrink-0;
  color: var(--color-foreground-secondary);
  font-variant-numeric: tabular-nums;
  min-width: 32px;
  text-align: right;
}

.bp-progress-wrapper--sm .bp-progress__label { font-size: 10px; min-width: 28px; }
.bp-progress-wrapper--md .bp-progress__label { font-size: 12px; min-width: 32px; }
.bp-progress-wrapper--lg .bp-progress__label { font-size: 13px; min-width: 36px; }
</style>
