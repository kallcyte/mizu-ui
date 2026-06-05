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
  const classes = ["bp-metric", `bp-metric--${props.size}`, `bp-metric--${props.variant}`];

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
    <span v-if="label" class="bp-metric__label">{{ label }}</span>
    <span v-if="value != null" class="bp-metric__value">{{ value }}</span>
    <div v-if="trend || trendValue" class="bp-metric__trend-row">
      <svg
        v-if="trend && trend !== 'neutral'"
        class="bp-metric__trend-icon"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          v-if="trend === 'up'"
          d="M8 3L13 8L11.5 9.5L9 7V13H7V7L4.5 9.5L3 8L8 3Z"
          fill="currentColor"
        />
        <path
          v-else
          d="M8 13L3 8L4.5 6.5L7 9V3H9V9L11.5 6.5L13 8L8 13Z"
          fill="currentColor"
        />
      </svg>
      <span
        v-if="trendValue"
        class="bp-metric__trend-value"
        :style="{ color: trendColor }"
      >
        {{ trendValue }}
      </span>
    </div>
  </div>
</template>

<style>
@reference "../index.css";

.bp-metric {
  @apply inline-flex flex-col;
}

.bp-metric__label {
  @apply font-medium;
  color: var(--color-foreground-secondary);
}

.bp-metric__value {
  @apply font-bold;
  color: var(--color-foreground-primary);
  letter-spacing: var(--letter-spacing-tight, -0.03em);
  line-height: 1.1;
}

.bp-metric__trend-row {
  @apply inline-flex items-center;
  gap: 4px;
}

.bp-metric__trend-icon {
  @apply shrink-0;
  width: 14px;
  height: 14px;
}

.bp-metric__trend-value {
  @apply font-medium;
}

.bp-metric--sm .bp-metric__label { @apply text-[11px]; }
.bp-metric--sm .bp-metric__value { @apply text-[18px]; }
.bp-metric--sm .bp-metric__trend-value { @apply text-[11px]; }

.bp-metric--md .bp-metric__label { @apply text-[12px]; }
.bp-metric--md .bp-metric__value { @apply text-[24px]; }
.bp-metric--md .bp-metric__trend-value { @apply text-[12px]; }

.bp-metric--lg .bp-metric__label { @apply text-[13px]; }
.bp-metric--lg .bp-metric__value { @apply text-[36px]; }
.bp-metric--lg .bp-metric__trend-value { @apply text-[13px]; }

.bp-metric--primary .bp-metric__value {
  color: var(--color-brand-primary);
}
.bp-metric--accent .bp-metric__value {
  color: var(--color-brand-accent);
}
.bp-metric--success .bp-metric__value {
  color: var(--color-feedback-success-base);
}
.bp-metric--warning .bp-metric__value {
  color: var(--color-feedback-warning-base);
}
.bp-metric--error .bp-metric__value {
  color: var(--color-feedback-error-base);
}
</style>
