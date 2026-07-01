<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface BadgeProps {
  variant?: "primary" | "accent" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  dot?: boolean;
  count?: number;
  max?: number;
  showZero?: boolean;
  position?: "inline" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: "error",
  size: "md",
  dot: false,
  count: undefined,
  max: 99,
  showZero: false,
  position: "inline",
});

const attrs = useAttrs();

const slots = defineSlots<{
  default: () => unknown;
}>();

const displayText = computed(() => {
  if (props.dot) return "";
  if (props.count != null) {
    if (props.count === 0 && !props.showZero) return null;
    if (props.count > props.max) return `${props.max}+`;
    return String(props.count);
  }
  return null;
});

const hasSlotContent = computed(() => !!slots.default);

const visible = computed(() => {
  if (props.dot) return true;
  if (props.count != null) return !(props.count === 0 && !props.showZero);
  return hasSlotContent.value;
});

const content = computed(() => {
  if (displayText.value != null) return displayText.value;
  return null;
});

const badgeClasses = computed(() => {
  const classes = [
    "bp-badge",
    `bp-badge--${props.variant}`,
    `bp-badge--${props.size}`,
  ];

  if (props.dot) classes.push("bp-badge--dot");
  if (props.position !== "inline") classes.push("bp-badge--positioned", `bp-badge--${props.position}`);

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});
</script>

<template>
  <span
    v-if="visible"
    :class="badgeClasses"
    role="status"
  >
    <template v-if="dot" />
    <template v-else-if="content != null">{{ content }}</template>
    <slot v-else />
  </span>
</template>

<style>
@reference "../index.css";

/* Base */
.bp-badge {
  @apply inline-flex items-center justify-center font-medium leading-none whitespace-nowrap select-none shrink-0;
  font-variant-numeric: tabular-nums;
}

/* Sizes */
.bp-badge--sm {
  min-width: 16px;
  height: 16px;
  font-size: 10px;
  padding: 0 4px;
}
.bp-badge--md {
  min-width: 20px;
  height: 20px;
  font-size: 11px;
  padding: 0 6px;
}

/* Dot mode */
.bp-badge--dot.bp-badge--sm {
  width: 8px;
  min-width: 8px;
  height: 8px;
  padding: 0;
}
.bp-badge--dot.bp-badge--md {
  width: 10px;
  min-width: 10px;
  height: 10px;
  padding: 0;
}

/* Shape */
.bp-badge--sm {
  border-radius: 8px;
}
.bp-badge--md {
  border-radius: 10px;
}
.bp-badge--dot {
  border-radius: var(--radius-full, 9999px);
}

/* Variants — solid fill, inverse text */
.bp-badge--primary {
  background-color: var(--color-brand-primary);
  color: var(--color-foreground-inverse);
}
.bp-badge--accent {
  background-color: var(--color-brand-accent);
  color: var(--color-foreground-inverse);
}
.bp-badge--success {
  background-color: var(--color-feedback-success-base);
  color: var(--color-foreground-inverse);
}
.bp-badge--warning {
  background-color: var(--color-feedback-warning-base);
  color: var(--color-foreground-inverse);
}
.bp-badge--error {
  background-color: var(--color-feedback-error-base);
  color: var(--color-foreground-inverse);
}
.bp-badge--info {
  background-color: var(--color-feedback-info-base);
  color: var(--color-foreground-inverse);
}

/* Positioned mode */
.bp-badge--positioned {
  @apply absolute;
  z-index: 1;
}
.bp-badge--top-right {
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}
.bp-badge--top-left {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}
.bp-badge--bottom-right {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}
.bp-badge--bottom-left {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}
</style>
