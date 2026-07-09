<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ToastRoot, type ToastRootEmits } from "reka-ui";

export interface ToastRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  type?: "foreground" | "background";
  duration?: number;
  forceMount?: boolean;
  variant?: "info" | "success" | "warning" | "error";
  position?:
    "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
}

const props = withDefaults(defineProps<ToastRootProps>(), {
  open: undefined,
  defaultOpen: true,
  type: "foreground",
  forceMount: undefined,
  variant: "info",
  position: "top-right",
});

const emit = defineEmits<{
  "update:open": [value: boolean];
  pause: [];
  resume: [];
  escapeKeyDown: [event: KeyboardEvent];
  swipeStart: [event: unknown];
  swipeMove: [event: unknown];
  swipeCancel: [event: unknown];
  swipeEnd: [event: unknown];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["mizu-toast", `mizu-toast--${props.variant}`];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const slideFromX = computed(() => {
  if (props.position === "top-left" || props.position === "bottom-left") return "-100%";
  if (props.position === "top-center" || props.position === "bottom-center") return "0";
  return "100%";
});

const slideFromY = computed(() => {
  if (props.position === "top-center") return "-100%";
  if (props.position === "bottom-center") return "100%";
  return "0";
});
</script>

<template>
  <ToastRoot
    :class="rootClasses"
    :style="{ '--toast-slide-from-x': slideFromX, '--toast-slide-from-y': slideFromY }"
    :open="open"
    :default-open="defaultOpen"
    :type="type"
    :duration="duration"
    :force-mount="forceMount"
    @update:open="(v: boolean) => emit('update:open', v)"
    @pause="emit('pause')"
    @resume="emit('resume')"
    @escape-key-down="(e: KeyboardEvent) => emit('escapeKeyDown', e)"
    @swipe-start="(e) => emit('swipeStart', e)"
    @swipe-move="(e) => emit('swipeMove', e)"
    @swipe-cancel="(e) => emit('swipeCancel', e)"
    @swipe-end="(e) => emit('swipeEnd', e)"
  >
    <slot />
  </ToastRoot>
</template>

<style>
.mizu-toast {
  all: revert;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--color-surface-base);
  color: var(--color-foreground-primary);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.1),
    0 1px 4px rgba(0, 0, 0, 0.06);
  font-family: inherit;
  margin-top: 0;
  border: none;
}

.mizu-toast[data-state="open"] {
  animation: toastSlideIn 200ms ease-out;
}

.mizu-toast[data-state="closed"] {
  animation: toastSlideOut 150ms ease-in;
}

.mizu-toast[data-swipe="start"] {
  animation: none;
}

.mizu-toast[data-swipe="move"] {
  translate: var(--reka-toast-swipe-move-x) var(--reka-toast-swipe-move-y);
}

.mizu-toast[data-swipe="cancel"] {
  translate: 0 0;
  transition: translate 200ms ease-out;
}

.mizu-toast[data-swipe="end"] {
  animation: toastSlideOut 150ms ease-in;
}

.mizu-toast--success {
  background: linear-gradient(
    to right,
    var(--color-feedback-success-subtle, #f0fdf4),
    var(--color-surface-base)
  );
  border-left: 3px solid var(--color-feedback-success-base);
}

.mizu-toast--warning {
  background: linear-gradient(
    to right,
    var(--color-feedback-warning-subtle, #fffbeb),
    var(--color-surface-base)
  );
  border-left: 3px solid var(--color-feedback-warning-base);
}

.mizu-toast--error {
  background: linear-gradient(
    to right,
    var(--color-feedback-error-subtle, #fef2f2),
    var(--color-surface-base)
  );
  border-left: 3px solid var(--color-feedback-error-base);
}

.mizu-toast--info {
  background: linear-gradient(
    to right,
    var(--color-feedback-info-subtle, #eff6ff),
    var(--color-surface-base)
  );
  border-left: 3px solid var(--color-feedback-info-base);
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    translate: var(--toast-slide-from-x, 100%) var(--toast-slide-from-y, 0);
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes toastSlideOut {
  from {
    opacity: 1;
    translate: 0 0;
  }
  to {
    opacity: 0;
    translate: var(--toast-slide-from-x, 100%) var(--toast-slide-from-y, 0);
  }
}
</style>
