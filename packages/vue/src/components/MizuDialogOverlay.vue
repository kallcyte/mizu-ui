<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogOverlay } from "reka-ui";

export interface DialogOverlayProps {
  forceMount?: boolean;
}

const props = withDefaults(defineProps<DialogOverlayProps>(), {
  forceMount: undefined,
});

const attrs = useAttrs();

const overlayClasses = computed(() => {
  const classes = ["bp-dialog__overlay"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DialogOverlay
    :class="overlayClasses"
    :force-mount="forceMount"
  >
    <slot />
  </DialogOverlay>
</template>

<style>
.bp-dialog__overlay {
  all: revert;
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
}

.bp-dialog__overlay[data-state="open"] {
  animation: dialogOverlayIn 200ms ease-out;
}

.bp-dialog__overlay[data-state="closed"] {
  animation: dialogOverlayOut 150ms ease-in;
}

@keyframes dialogOverlayIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes dialogOverlayOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
