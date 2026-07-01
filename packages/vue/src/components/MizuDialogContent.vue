<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogContent } from "reka-ui";

export interface DialogContentProps {
  forceMount?: boolean;
  disableOutsidePointerEvents?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DialogContentProps>(), {
  forceMount: undefined,
  disableOutsidePointerEvents: undefined,
  asChild: undefined,
  as: undefined,
});

const emit = defineEmits<{
  escapeKeyDown: [event: KeyboardEvent];
  pointerDownOutside: [event: unknown];
  focusOutside: [event: unknown];
  interactOutside: [event: unknown];
  openAutoFocus: [event: unknown];
  closeAutoFocus: [event: unknown];
}>();

const attrs = useAttrs();

const contentClasses = computed(() => {
  const classes = ["mizu-dialog__content"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const contentStyle = computed(() => {
  return attrs.style as string | Record<string, string> | undefined;
});
</script>

<template>
  <DialogContent
    :class="contentClasses"
    :style="contentStyle"
    :force-mount="forceMount"
    :disable-outside-pointer-events="disableOutsidePointerEvents"
    :as-child="asChild"
    :as="as"
    @escape-key-down="(e: KeyboardEvent) => emit('escapeKeyDown', e)"
    @pointer-down-outside="(e) => emit('pointerDownOutside', e)"
    @focus-outside="(e) => emit('focusOutside', e)"
    @interact-outside="(e) => emit('interactOutside', e)"
    @open-auto-focus="(e) => emit('openAutoFocus', e)"
    @close-auto-focus="(e) => emit('closeAutoFocus', e)"
  >
    <slot />
  </DialogContent>
</template>

<style>
.mizu-dialog__content {
  all: revert;
  position: fixed;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  z-index: 51;
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  border-radius: 8px;
  background-color: var(--color-surface-base);
  color: var(--color-foreground-primary);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  font-family: inherit;
  margin-top: 0;
}

.mizu-dialog__content:focus {
  outline: none;
}

.mizu-dialog__content[data-state="open"] {
  animation: dialogContentIn 200ms ease-out;
}

.mizu-dialog__content[data-state="closed"] {
  animation: dialogContentOut 150ms ease-in;
}

@keyframes dialogContentIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes dialogContentOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
</style>
