<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogOverlay } from "reka-ui";

export interface AlertDialogOverlayProps {
  forceMount?: boolean;
}

const props = withDefaults(defineProps<AlertDialogOverlayProps>(), {
  forceMount: undefined,
});

const attrs = useAttrs();

const overlayClasses = computed(() => {
  const classes = ["mizu-alert-dialog__overlay"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <AlertDialogOverlay
    :class="overlayClasses"
    :force-mount="forceMount"
  >
    <slot />
  </AlertDialogOverlay>
</template>

<style>
.mizu-alert-dialog__overlay {
  all: revert;
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
}

.mizu-alert-dialog__overlay[data-state="open"] {
  animation: alertDialogOverlayIn 200ms ease-out;
}

.mizu-alert-dialog__overlay[data-state="closed"] {
  animation: alertDialogOverlayOut 150ms ease-in;
}

@keyframes alertDialogOverlayIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes alertDialogOverlayOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
