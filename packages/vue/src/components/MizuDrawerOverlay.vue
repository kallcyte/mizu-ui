<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogOverlay } from "reka-ui";

export interface DrawerOverlayProps {
  forceMount?: boolean;
  /** Enable/disable fade animation */
  transition?: boolean;
}

const props = withDefaults(defineProps<DrawerOverlayProps>(), {
  forceMount: undefined,
  transition: true,
});

const attrs = useAttrs();

const overlayClasses = computed(() => {
  const classes = ["mizu-drawer__overlay"];
  if (!props.transition) classes.push("mizu-drawer__overlay--no-transition");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DialogOverlay :class="overlayClasses" :force-mount="forceMount">
    <slot />
  </DialogOverlay>
</template>

<style>
.mizu-drawer__overlay {
  all: revert;
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
}

.mizu-drawer__overlay[data-state="open"] {
  animation: drawerOverlayIn 200ms ease-out;
}

.mizu-drawer__overlay[data-state="closed"] {
  animation: drawerOverlayOut 150ms ease-in;
}

.mizu-drawer__overlay--no-transition[data-state="open"],
.mizu-drawer__overlay--no-transition[data-state="closed"] {
  animation: none;
}

@keyframes drawerOverlayIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes drawerOverlayOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
