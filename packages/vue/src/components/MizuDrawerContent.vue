<script lang="ts">
import { type InjectionKey } from "vue";

export const MizuDrawerDismissibleKey: InjectionKey<boolean> = Symbol("MizuDrawerDismissible");

export interface DrawerContentProps {
  forceMount?: boolean;
  disableOutsidePointerEvents?: boolean;
  asChild?: boolean;
  as?: string;
  /** Which edge the drawer slides from */
  side?: "left" | "right" | "top" | "bottom";
  /** Width (for left/right) or height (for top/bottom) */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** When false, prevents close on click-outside / Escape */
  dismissible?: boolean;
  /** Enable/disable slide animation */
  transition?: boolean;
}
</script>

<script setup lang="ts">
import { computed, useAttrs, provide } from "vue";
import { DialogContent } from "reka-ui";

const props = withDefaults(defineProps<DrawerContentProps>(), {
  forceMount: undefined,
  disableOutsidePointerEvents: undefined,
  asChild: undefined,
  as: undefined,
  side: "right",
  size: "md",
  dismissible: true,
  transition: true,
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

// Provide dismissible state to child components (MizuDrawerClose)
provide(MizuDrawerDismissibleKey, props.dismissible);

const contentClasses = computed(() => {
  const classes = [
    "mizu-drawer__content",
    `mizu-drawer__content--${props.side}`,
    `mizu-drawer__content--${props.size}`,
  ];
  if (!props.transition) classes.push("mizu-drawer__content--no-transition");
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
/* ---- Base ---- */
.mizu-drawer__content {
  all: revert;
  position: fixed;
  z-index: 51;
  background-color: var(--color-surface-base);
  color: var(--color-foreground-primary);
  display: flex;
  flex-direction: column;
  font-family: inherit;
  margin-top: 0;
}

.mizu-drawer__content:focus {
  outline: none;
}

/* ---- Right ---- */
.mizu-drawer__content--right {
  top: 0;
  right: 0;
  height: 100%;
  width: 28rem;
  max-width: 100vw;
  border-left: 1px solid var(--color-surface-muted);
}

.mizu-drawer__content--right[data-state="open"] {
  animation: drawerInRight 200ms ease-out;
}

.mizu-drawer__content--right[data-state="closed"] {
  animation: drawerOutRight 150ms ease-in;
}

@keyframes drawerInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes drawerOutRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

/* ---- Left ---- */
.mizu-drawer__content--left {
  top: 0;
  left: 0;
  height: 100%;
  width: 28rem;
  max-width: 100vw;
  border-right: 1px solid var(--color-surface-muted);
}

.mizu-drawer__content--left[data-state="open"] {
  animation: drawerInLeft 200ms ease-out;
}

.mizu-drawer__content--left[data-state="closed"] {
  animation: drawerOutLeft 150ms ease-in;
}

@keyframes drawerInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes drawerOutLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

/* ---- Top ---- */
.mizu-drawer__content--top {
  top: 0;
  left: 0;
  right: 0;
  height: 50vh;
  border-bottom: 1px solid var(--color-surface-muted);
}

.mizu-drawer__content--top[data-state="open"] {
  animation: drawerInTop 200ms ease-out;
}

.mizu-drawer__content--top[data-state="closed"] {
  animation: drawerOutTop 150ms ease-in;
}

@keyframes drawerInTop {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes drawerOutTop {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

/* ---- Bottom ---- */
.mizu-drawer__content--bottom {
  bottom: 0;
  left: 0;
  right: 0;
  height: 50vh;
  border-top: 1px solid var(--color-surface-muted);
}

.mizu-drawer__content--bottom[data-state="open"] {
  animation: drawerInBottom 200ms ease-out;
}

.mizu-drawer__content--bottom[data-state="closed"] {
  animation: drawerOutBottom 150ms ease-in;
}

@keyframes drawerInBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes drawerOutBottom {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

/* ---- Size variants (left / right) ---- */
.mizu-drawer__content--left.mizu-drawer__content--sm,
.mizu-drawer__content--right.mizu-drawer__content--sm {
  width: 24rem;
}

.mizu-drawer__content--left.mizu-drawer__content--md,
.mizu-drawer__content--right.mizu-drawer__content--md {
  width: 28rem;
}

.mizu-drawer__content--left.mizu-drawer__content--lg,
.mizu-drawer__content--right.mizu-drawer__content--lg {
  width: 32rem;
}

.mizu-drawer__content--left.mizu-drawer__content--xl,
.mizu-drawer__content--right.mizu-drawer__content--xl {
  width: 36rem;
}

.mizu-drawer__content--left.mizu-drawer__content--full,
.mizu-drawer__content--right.mizu-drawer__content--full {
  width: 100vw;
  max-width: none;
}

/* ---- Size variants (top / bottom) ---- */
.mizu-drawer__content--top.mizu-drawer__content--sm,
.mizu-drawer__content--bottom.mizu-drawer__content--sm {
  max-height: 30vh;
}

.mizu-drawer__content--top.mizu-drawer__content--md,
.mizu-drawer__content--bottom.mizu-drawer__content--md {
  max-height: 50vh;
}

.mizu-drawer__content--top.mizu-drawer__content--lg,
.mizu-drawer__content--bottom.mizu-drawer__content--lg {
  max-height: 70vh;
}

.mizu-drawer__content--top.mizu-drawer__content--xl,
.mizu-drawer__content--bottom.mizu-drawer__content--xl {
  max-height: 85vh;
}

.mizu-drawer__content--top.mizu-drawer__content--full,
.mizu-drawer__content--bottom.mizu-drawer__content--full {
  height: 100vh;
  max-height: none;
}

/* ---- No transition ---- */
.mizu-drawer__content--no-transition[data-state="open"],
.mizu-drawer__content--no-transition[data-state="closed"] {
  animation: none;
}
</style>
