<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ToastViewport } from "reka-ui";

export interface ToastViewportProps {
  hotkey?: string[];
  label?: string | ((hotkey: string) => string);
  position?: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
}

const props = withDefaults(defineProps<ToastViewportProps>(), {
  hotkey: () => ["F8"],
  label: "Notifications ({hotkey})",
  position: "top-right",
});

const attrs = useAttrs();

const viewportClasses = computed(() => {
  const classes = ["mizu-toast__viewport", `mizu-toast__viewport--${props.position}`];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ToastViewport
    :class="viewportClasses"
    :hotkey="hotkey"
    :label="label"
  >
    <slot />
  </ToastViewport>
</template>

<style>
.mizu-toast__viewport {
  all: revert;
  position: fixed;
  z-index: 2147483647;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  max-width: 420px;
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
  margin: 0;
  list-style: none;
  outline: none;
}

.mizu-toast__viewport--top-right {
  top: 0;
  right: 0;
}

.mizu-toast__viewport--top-left {
  top: 0;
  left: 0;
}

.mizu-toast__viewport--top-center {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.mizu-toast__viewport--bottom-right {
  bottom: 0;
  right: 0;
}

.mizu-toast__viewport--bottom-left {
  bottom: 0;
  left: 0;
}

.mizu-toast__viewport--bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
