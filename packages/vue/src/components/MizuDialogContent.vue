<script lang="ts">
import { type InjectionKey } from "vue";

export const MizuDialogDismissibleKey: InjectionKey<boolean> = Symbol("MizuDialogDismissible");

export interface DialogContentProps {
  forceMount?: boolean;
  disableOutsidePointerEvents?: boolean;
  asChild?: boolean;
  as?: string;
  /** Dialog takes full viewport — no border, no shadow, inset 0 */
  fullscreen?: boolean;
  /** When false, prevents close on click-outside / Escape */
  dismissible?: boolean;
  /** Content scrolls within the overlay instead of dialog being fixed */
  scrollable?: boolean;
  /** Enable/disable enter/leave animations */
  transition?: boolean;
  /** Dialog width size */
  size?: "sm" | "md" | "lg" | "xl";
}
</script>

<script setup lang="ts">
import { computed, useAttrs, provide } from "vue";
import { DialogContent } from "reka-ui";

const props = withDefaults(defineProps<DialogContentProps>(), {
  forceMount: undefined,
  disableOutsidePointerEvents: undefined,
  asChild: undefined,
  as: undefined,
  fullscreen: false,
  dismissible: true,
  scrollable: false,
  transition: true,
  size: "md",
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

// Provide dismissible state to child components (MizuDialogClose)
provide(MizuDialogDismissibleKey, props.dismissible);

const contentClasses = computed(() => {
  const classes = ["mizu-dialog__content", `mizu-dialog__content--${props.size}`];
  if (props.fullscreen) classes.push("mizu-dialog__content--fullscreen");
  if (props.scrollable) classes.push("mizu-dialog__content--scrollable");
  if (!props.transition) classes.push("mizu-dialog__content--no-transition");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const contentStyle = computed(() => {
  return attrs.style as string | Record<string, string> | undefined;
});

// When dismissible=false, prevent close on outside pointer events
function handlePointerDownOutside(e: unknown) {
  if (!props.dismissible) {
    (e as Event).preventDefault();
  }
  emit("pointerDownOutside", e);
}

function handleEscapeKeyDown(e: KeyboardEvent) {
  if (!props.dismissible) {
    e.preventDefault();
  }
  emit("escapeKeyDown", e);
}
</script>

<template>
  <DialogContent
    :class="contentClasses"
    :style="contentStyle"
    :force-mount="forceMount"
    :disable-outside-pointer-events="disableOutsidePointerEvents"
    :as-child="asChild"
    :as="as"
    @escape-key-down="handleEscapeKeyDown"
    @pointer-down-outside="handlePointerDownOutside"
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

/* Size variants */
.mizu-dialog__content--sm {
  max-width: 400px;
}
.mizu-dialog__content--md {
  max-width: 500px;
}
.mizu-dialog__content--lg {
  max-width: 700px;
}
.mizu-dialog__content--xl {
  max-width: 900px;
}

/* Fullscreen mode */
.mizu-dialog__content--fullscreen {
  inset: 0;
  translate: 0 0;
  width: 100vw;
  height: 100vh;
  max-width: none;
  max-height: none;
  border-radius: 0;
  box-shadow: none;
}

/* Scrollable mode */
.mizu-dialog__content--scrollable {
  max-height: 90vh;
  overflow-y: auto;
}

/* No transition mode */
.mizu-dialog__content--no-transition[data-state="open"],
.mizu-dialog__content--no-transition[data-state="closed"] {
  animation: none;
}
</style>
