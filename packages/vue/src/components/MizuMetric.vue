<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface MetricProps {
  label?: string;
  value?: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "accent" | "success" | "warning" | "error";
}

const props = withDefaults(defineProps<MetricProps>(), {
  label: undefined,
  value: undefined,
  trend: undefined,
  trendValue: undefined,
  size: "md",
  variant: "default",
});

const attrs = useAttrs();

const metricClasses = computed(() => {
  const classes = ["mizu-metric", `mizu-metric--${props.size}`, `mizu-metric--${props.variant}`];

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});

const trendColor = computed(() => {
  if (props.trend === "up") return "var(--color-feedback-success-base)";
  if (props.trend === "down") return "var(--color-feedback-error-base)";
  return "var(--color-foreground-tertiary)";
});
</script>

<template>
  <div :class="metricClasses">
    <span v-if="label" class="mizu-metric__label">{{ label }}</span>
    <span v-if="value != null" class="mizu-metric__value">{{ value }}</span>
    <div v-if="trend || trendValue" class="mizu-metric__trend-row">
      <svg
        v-if="trend && trend !== 'neutral'"
        class="mizu-metric__trend-icon"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          v-if="trend === 'up'"
          d="M8 3L13 8L11.5 9.5L9 7V13H7V7L4.5 9.5L3 8L8 3Z"
          fill="currentColor"
        />
        <path v-else d="M8 13L3 8L4.5 6.5L7 9V3H9V9L11.5 6.5L13 8L8 13Z" fill="currentColor" />
      </svg>
      <span v-if="trendValue" class="mizu-metric__trend-value" :style="{ color: trendColor }">
        {{ trendValue }}
      </span>
    </div>
  </div>
</template>

<style>
@reference "../index.css";

.mizu-metric {
  @apply inline-flex flex-col;
}

.mizu-metric__label {
  @apply font-medium;
  color: var(--color-foreground-secondary);
}

.mizu-metric__value {
  @apply font-bold;
  color: var(--color-foreground-primary);
  letter-spacing: var(--letter-spacing-tight, -0.03em);
  line-height: 1.1;
}

.mizu-metric__trend-row {
  @apply inline-flex items-center;
  gap: 4px;
}

.mizu-metric__trend-icon {
  @apply shrink-0;
  width: 14px;
  height: 14px;
}

.mizu-metric__trend-value {
  @apply font-medium;
}

.mizu-metric--sm .mizu-metric__label {
  @apply text-[11px];
}
.mizu-metric--sm .mizu-metric__value {
  @apply text-[18px];
}
.mizu-metric--sm .mizu-metric__trend-value {
  @apply text-[11px];
}

.mizu-metric--md .mizu-metric__label {
  @apply text-[12px];
}
.mizu-metric--md .mizu-metric__value {
  @apply text-[24px];
}
.mizu-metric--md .mizu-metric__trend-value {
  @apply text-[12px];
}

.mizu-metric--lg .mizu-metric__label {
  @apply text-[13px];
}
.mizu-metric--lg .mizu-metric__value {
  @apply text-[36px];
}
.mizu-metric--lg .mizu-metric__trend-value {
  @apply text-[13px];
}

.mizu-metric--primary .mizu-metric__value {
  color: var(--color-hub-primary);
}
.mizu-metric--accent .mizu-metric__value {
  color: var(--color-hub-ycp);
}
.mizu-metric--success .mizu-metric__value {
  color: var(--color-feedback-success-base);
}
.mizu-metric--warning .mizu-metric__value {
  color: var(--color-feedback-warning-base);
}
.mizu-metric--error .mizu-metric__value {
  color: var(--color-feedback-error-base);
}
</style>
