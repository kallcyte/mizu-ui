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
  const classes = ["mizu-progress", `mizu-progress--${props.size}`, `mizu-progress--${props.variant}`];

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});

const indicatorStyle = computed(() => {
  if (percent.value == null) return undefined;
  return { transform: `translateX(-${100 - percent.value}%)` };
});
</script>

<template>
  <div :class="['mizu-progress-wrapper', `mizu-progress-wrapper--${size}`]">
    <ProgressRoot
      :model-value="modelValue"
      :max="max"
      :class="progressClasses"
      :get-value-text="getValueText"
      @update:model-value="(value) => emit('update:modelValue', (value ?? null) as number | null)"
    >
      <ProgressIndicator
        class="mizu-progress__indicator"
        :style="indicatorStyle"
      />
    </ProgressRoot>
    <span v-if="showLabel" class="mizu-progress__label">{{ displayText }}</span>
  </div>
</template>

<style>
@reference "../index.css";

.mizu-progress-wrapper {
  @apply inline-flex items-center w-full;
  gap: 8px;
}

.mizu-progress {
  @apply relative w-full overflow-hidden rounded-full;
  background-color: var(--color-surface-muted);
}

.mizu-progress--sm { height: 4px; }
.mizu-progress--md { height: 8px; }
.mizu-progress--lg { height: 12px; }

.mizu-progress__indicator {
  @apply h-full w-full;
  background-color: var(--color-brand-primary);
  transition: transform var(--duration-normal, 300ms) ease-in-out;
  will-change: transform;
}

.mizu-progress--accent .mizu-progress__indicator {
  background-color: var(--color-brand-accent);
}
.mizu-progress--success .mizu-progress__indicator {
  background-color: var(--color-feedback-success-base);
}
.mizu-progress--warning .mizu-progress__indicator {
  background-color: var(--color-feedback-warning-base);
}
.mizu-progress--error .mizu-progress__indicator {
  background-color: var(--color-feedback-error-base);
}
.mizu-progress--info .mizu-progress__indicator {
  background-color: var(--color-feedback-info-base);
}

.mizu-progress[data-state="indeterminate"] .mizu-progress__indicator {
  width: 30%;
  @apply absolute top-0 left-0;
  animation: mizu-progress-indeterminate 1.4s ease-in-out infinite;
  transition: none;
}

.mizu-progress[data-state="complete"] .mizu-progress__indicator {
  background-color: var(--color-feedback-success-base);
}

@keyframes mizu-progress-indeterminate {
  0% {
    left: -30%;
  }
  100% {
    left: 100%;
  }
}

.mizu-progress__label {
  @apply font-medium shrink-0;
  color: var(--color-foreground-secondary);
  font-variant-numeric: tabular-nums;
  min-width: 32px;
  text-align: right;
}

.mizu-progress-wrapper--sm .mizu-progress__label { font-size: 10px; min-width: 28px; }
.mizu-progress-wrapper--md .mizu-progress__label { font-size: 12px; min-width: 32px; }
.mizu-progress-wrapper--lg .mizu-progress__label { font-size: 13px; min-width: 36px; }
</style>
