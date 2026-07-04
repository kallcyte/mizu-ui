<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface BadgeProps {
  variant?: "primary" | "accent" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  dot?: boolean;
  /** Simple display value (string or number, no max truncation). Takes priority over `count`. */
  value?: string | number;
  count?: number;
  max?: number;
  showZero?: boolean;
  position?: "inline" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: "error",
  size: "md",
  dot: false,
  value: undefined,
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
  if (props.value != null) return String(props.value);
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
  if (props.value != null) return true;
  if (props.count != null) return !(props.count === 0 && !props.showZero);
  return hasSlotContent.value;
});

const isOverlay = computed(() => props.position !== "inline" && hasSlotContent.value);

const badgeClasses = computed(() => {
  const classes = [
    "mizu-badge",
    `mizu-badge--${props.variant}`,
    `mizu-badge--${props.size}`,
  ];

  if (props.dot) classes.push("mizu-badge--dot");
  if (isOverlay.value || (props.position !== "inline" && !hasSlotContent.value))
    classes.push("mizu-badge--positioned", `mizu-badge--${props.position}`);

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});
</script>

<template>
  <!-- Overlay mode: wrap slot content + badge in a relative container -->
  <span v-if="isOverlay" class="mizu-badge-wrapper">
    <slot />
    <span v-if="visible" :class="badgeClasses" role="status">
      <template v-if="dot" />
      <template v-else-if="displayText != null">{{ displayText }}</template>
    </span>
  </span>
  <!-- Standalone / inline mode -->
  <span
    v-else-if="visible"
    :class="badgeClasses"
    role="status"
  >
    <template v-if="dot" />
    <template v-else-if="displayText != null">{{ displayText }}</template>
    <slot v-else />
  </span>
</template>

<style>
@reference "../index.css";

/* Wrapper for overlay mode — provides relative positioning context */
.mizu-badge-wrapper {
  @apply relative inline-flex;
}

/* Base */
.mizu-badge {
  @apply inline-flex items-center justify-center font-medium leading-none whitespace-nowrap select-none shrink-0;
  font-variant-numeric: tabular-nums;
}

/* Sizes */
.mizu-badge--sm {
  min-width: 16px;
  height: 16px;
  font-size: 10px;
  padding: 0 4px;
}
.mizu-badge--md {
  min-width: 20px;
  height: 20px;
  font-size: 11px;
  padding: 0 6px;
}

/* Dot mode */
.mizu-badge--dot.mizu-badge--sm {
  width: 8px;
  min-width: 8px;
  height: 8px;
  padding: 0;
}
.mizu-badge--dot.mizu-badge--md {
  width: 10px;
  min-width: 10px;
  height: 10px;
  padding: 0;
}

/* Shape */
.mizu-badge--sm {
  border-radius: 8px;
}
.mizu-badge--md {
  border-radius: 10px;
}
.mizu-badge--dot {
  border-radius: var(--radius-full, 9999px);
}

/* Variants — solid fill, inverse text */
.mizu-badge--primary {
  background-color: var(--color-brand-primary);
  color: #fff;
}
.mizu-badge--accent {
  background-color: var(--color-brand-accent);
  color: #fff;
}
.mizu-badge--success {
  background-color: var(--color-feedback-success-base);
  color: var(--color-foreground-inverse);
}
.mizu-badge--warning {
  background-color: var(--color-feedback-warning-base);
  color: var(--color-foreground-inverse);
}
.mizu-badge--error {
  background-color: var(--color-feedback-error-base);
  color: var(--color-foreground-inverse);
}
.mizu-badge--info {
  background-color: var(--color-feedback-info-base);
  color: var(--color-foreground-inverse);
}

/* Positioned mode */
.mizu-badge--positioned {
  @apply absolute;
  z-index: 1;
}
.mizu-badge--top-right {
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}
.mizu-badge--top-left {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}
.mizu-badge--bottom-right {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}
.mizu-badge--bottom-left {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}
</style>
