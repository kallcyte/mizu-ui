<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface AlertProps {
  variant?: "success" | "error" | "warning" | "info";
  title?: string;
  closable?: boolean;
  defaultIcon?: boolean;
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: "info",
  title: undefined,
  closable: false,
  defaultIcon: true,
});

const emit = defineEmits<{
  close: [];
}>();

const attrs = useAttrs();

const slots = defineSlots<{
  default: () => unknown;
  icon: () => unknown;
}>();

const hasDefaultIcon = computed(() => props.defaultIcon && !slots.icon);
const hasCustomIcon = computed(() => !!slots.icon);

const alertId = computed(() => {
  if (attrs.id) return attrs.id as string;
  return "mizu-alert";
});

const variantColors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  success: {
    bg: "var(--color-feedback-success-subtle)",
    text: "var(--color-feedback-success-base)",
    border: "var(--color-feedback-success-base)",
    icon: "var(--color-feedback-success-base)",
  },
  error: {
    bg: "var(--color-feedback-error-subtle)",
    text: "var(--color-feedback-error-base)",
    border: "var(--color-feedback-error-base)",
    icon: "var(--color-feedback-error-base)",
  },
  warning: {
    bg: "var(--color-feedback-warning-subtle)",
    text: "var(--color-feedback-warning-base)",
    border: "var(--color-feedback-warning-base)",
    icon: "var(--color-feedback-warning-base)",
  },
  info: {
    bg: "var(--color-feedback-info-subtle)",
    text: "var(--color-feedback-info-base)",
    border: "var(--color-feedback-info-base)",
    icon: "var(--color-feedback-info-base)",
  },
};

const variantColor = computed(() => variantColors[props.variant] || variantColors.info);

const alertClasses = computed(() => {
  const classes = [
    "bp-alert",
    `bp-alert--${props.variant}`,
  ];

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});

const styleVars = computed(() => ({
  "--bp-alert-bg": variantColor.value.bg,
  "--bp-alert-text": variantColor.value.text,
  "--bp-alert-border": variantColor.value.border,
  "--bp-alert-icon": variantColor.value.icon,
}));

const role = computed(() => (props.variant === "error" ? "alert" : "status"));

const ariaLive = computed(() => (props.variant === "error" ? "assertive" : "polite"));

function handleClose() {
  emit("close");
}
</script>

<template>
  <div
    :id="alertId"
    :class="alertClasses"
    :style="styleVars"
    :role="role"
    :aria-live="ariaLive"
  >
    <span v-if="hasDefaultIcon || hasCustomIcon" class="bp-alert__icon">
      <slot name="icon">
        <svg
          v-if="hasDefaultIcon"
          viewBox="0 0 16 16"
          fill="none"
          width="16"
          height="16"
        >
          <template v-if="variant === 'success'">
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" />
            <path d="M5 8.5L7 10.5L11 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </template>
          <template v-else-if="variant === 'error'">
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" />
            <path d="M8 5V8.5M8 11V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </template>
          <template v-else-if="variant === 'warning'">
            <path d="M8 2L14.5 13.5H1.5L8 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            <path d="M8 6V9.5M8 11V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </template>
          <template v-else>
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" />
            <path d="M8 7V11M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </template>
        </svg>
      </slot>
    </span>
    <div class="bp-alert__content">
      <div v-if="title" class="bp-alert__title">{{ title }}</div>
      <div class="bp-alert__body">
        <slot />
      </div>
    </div>
    <button
      v-if="closable"
      type="button"
      class="bp-alert__close"
      aria-label="Close alert"
      @click="handleClose"
    >
      <svg viewBox="0 0 10 10" width="10" height="10" fill="none">
        <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style>
@reference "../index.css";

.bp-alert {
  @apply relative flex items-start gap-[10px] border rounded-md;
  background-color: var(--bp-alert-bg);
  border-color: color-mix(in srgb, var(--bp-alert-border) 25%, transparent);
  color: var(--bp-alert-text);
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.45;
}

.bp-alert__icon {
  @apply shrink-0 flex items-center justify-center;
  color: var(--bp-alert-icon);
  width: 16px;
  height: 16px;
  margin-top: 1px;
}

.bp-alert__content {
  @apply flex-1 min-w-0 flex flex-col;
  gap: 2px;
}

.bp-alert__title {
  @apply font-semibold;
  font-size: 13px;
  line-height: 1.3;
}

.bp-alert__body {
  @apply font-normal;
  font-size: 12px;
  line-height: 1.45;
}

.bp-alert__body > * {
  margin: 0;
}

.bp-alert__close {
  @apply shrink-0 flex items-center justify-center border-none bg-transparent cursor-pointer p-0 opacity-70 transition-opacity;
  color: var(--bp-alert-text);
  width: 14px;
  height: 14px;
  margin-top: 1px;
}

.bp-alert__close:hover {
  @apply opacity-100;
}
</style>
