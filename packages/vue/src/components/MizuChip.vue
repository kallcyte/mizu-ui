<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface ChipProps {
  /** Display value */
  value?: string | number;
  /** Size */
  size?: "sm" | "md";
  /** Color variant */
  color?: "primary" | "accent" | "success" | "warning" | "error" | "info";
  /** Dot-only mode (no value) */
  dot?: boolean;
  /** Position relative to parent (when used as overlay) */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const props = withDefaults(defineProps<ChipProps>(), {
  value: undefined,
  size: "md",
  color: "accent",
  dot: false,
  position: "top-right",
});

const attrs = useAttrs();
const slots = defineSlots<{
  default?: () => unknown;
}>();

const hasSlotContent = computed(() => !!slots.default);

const isPositioned = computed(() => hasSlotContent.value);

const visible = computed(() => {
  if (props.dot) return true;
  if (props.value != null) return true;
  return hasSlotContent.value;
});

const displayText = computed(() => {
  if (props.dot) return "";
  if (props.value != null) return String(props.value);
  return null;
});

const chipClasses = computed(() => {
  const classes = [
    "mizu-chip",
    `mizu-chip--${props.color}`,
    `mizu-chip--${props.size}`,
  ];

  if (props.dot) classes.push("mizu-chip--dot");
  if (isPositioned.value) classes.push("mizu-chip--positioned", `mizu-chip--${props.position}`);

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});
</script>

<template>
  <span v-if="isPositioned" class="mizu-chip-wrapper">
    <slot />
    <span v-if="visible" :class="chipClasses" role="status">
      <template v-if="dot" />
      <template v-else-if="displayText != null">{{ displayText }}</template>
    </span>
  </span>
  <span
    v-else-if="visible"
    :class="chipClasses"
    role="status"
  >
    <template v-if="dot" />
    <template v-else-if="displayText != null">{{ displayText }}</template>
  </span>
</template>

<style>
@reference "../index.css";

.mizu-chip-wrapper {
  @apply relative inline-flex;
}

/* Base */
.mizu-chip {
  @apply inline-flex items-center justify-center font-medium leading-none whitespace-nowrap select-none shrink-0;
  font-variant-numeric: tabular-nums;
}

/* Sizes */
.mizu-chip--sm {
  min-width: 16px;
  height: 16px;
  font-size: 10px;
  padding: 0 4px;
  border-radius: 8px;
}
.mizu-chip--md {
  min-width: 20px;
  height: 20px;
  font-size: 11px;
  padding: 0 6px;
  border-radius: 10px;
}

/* Dot mode */
.mizu-chip--dot.mizu-chip--sm {
  width: 8px;
  min-width: 8px;
  height: 8px;
  padding: 0;
  border-radius: var(--radius-full, 9999px);
}
.mizu-chip--dot.mizu-chip--md {
  width: 10px;
  min-width: 10px;
  height: 10px;
  padding: 0;
  border-radius: var(--radius-full, 9999px);
}

/* Color variants */
.mizu-chip--primary {
  background-color: var(--color-brand-primary);
  color: #fff;
}
.mizu-chip--accent {
  background-color: var(--color-brand-accent);
  color: #fff;
}
.mizu-chip--success {
  background-color: var(--color-feedback-success-base);
  color: var(--color-foreground-inverse);
}
.mizu-chip--warning {
  background-color: var(--color-feedback-warning-base);
  color: var(--color-foreground-inverse);
}
.mizu-chip--error {
  background-color: var(--color-feedback-error-base);
  color: var(--color-foreground-inverse);
}
.mizu-chip--info {
  background-color: var(--color-feedback-info-base);
  color: var(--color-foreground-inverse);
}

/* Positioned mode */
.mizu-chip--positioned {
  @apply absolute;
  z-index: 1;
}
.mizu-chip--top-right {
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}
.mizu-chip--top-left {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}
.mizu-chip--bottom-right {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}
.mizu-chip--bottom-left {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}
</style>
