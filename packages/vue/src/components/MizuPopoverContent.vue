<script setup lang="ts">
import { computed, useAttrs, inject } from "vue";
import { PopoverContent } from "reka-ui";

const popoverModal = inject<boolean>("popoverModal", false);

export interface PopoverContentProps {
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | Element[] | null;
  collisionPadding?: number;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
  arrowPadding?: number;
  updatePositionStrategy?: "always" | "optimized";
  prioritizePosition?: boolean;
}

const props = withDefaults(defineProps<PopoverContentProps>(), {
  side: "bottom",
  sideOffset: 8,
  align: "center",
  alignOffset: 0,
  avoidCollisions: true,
  collisionBoundary: undefined,
  collisionPadding: 8,
  sticky: "partial",
  hideWhenDetached: false,
  arrowPadding: 0,
  updatePositionStrategy: "optimized",
  prioritizePosition: false,
});

const emit = defineEmits<{
  openAutoFocus: [event: Event];
  closeAutoFocus: [event: Event];
  escapeKeyDown: [event: KeyboardEvent];
  pointerDownOutside: [event: Event];
  focusOutside: [event: Event];
  interactOutside: [event: Event];
}>();

const attrs = useAttrs();

const contentClasses = computed(() => {
  const classes = ["bp-popover__content"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const contentStyle = computed(() => {
  return attrs.style as string | Record<string, string> | undefined;
});
</script>

<template>
  <PopoverContent
    :class="contentClasses"
    :style="contentStyle"
    :side="side"
    :side-offset="sideOffset"
    :align="align"
    :align-offset="alignOffset"
    :avoid-collisions="avoidCollisions"
    :collision-boundary="collisionBoundary"
    :collision-padding="collisionPadding"
    :sticky="sticky"
    :hide-when-detached="hideWhenDetached"
    :arrow-padding="arrowPadding"
    :update-position-strategy="updatePositionStrategy"
    :prioritize-position="prioritizePosition"
    @open-auto-focus="(e) => emit('openAutoFocus', e)"
    @close-auto-focus="(e) => emit('closeAutoFocus', e)"
    @escape-key-down="(e: KeyboardEvent) => emit('escapeKeyDown', e)"
    @pointer-down-outside="(e) => { if (popoverModal) e.preventDefault(); emit('pointerDownOutside', e); }"
    @focus-outside="(e) => emit('focusOutside', e)"
    @interact-outside="(e) => emit('interactOutside', e)"
  >
    <slot />
  </PopoverContent>
</template>

<style>
.bp-popover__content {
  all: revert;
  z-index: 50;
  min-width: 200px;
  max-width: 360px;
  border-radius: 8px;
  padding: 12px;
  background-color: var(--color-surface-base);
  color: var(--color-foreground-primary);
  box-shadow: 0 10px 38px -10px rgba(0, 0, 0, 0.15), 0 6px 20px -14px rgba(0, 0, 0, 0.2);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid var(--color-surface-muted);
  transform-origin: var(--reka-popover-content-transform-origin);
  margin-top: 0;
  outline: none;
}

.bp-popover__content:focus {
  outline: none;
}

.bp-popover__content[data-state="open"] {
  animation: popoverContentIn 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.bp-popover__content[data-state="closed"] {
  animation: popoverContentOut 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.bp-popover__content[data-side="top"] {
  animation-name: popoverSlideInFromTop;
}

.bp-popover__content[data-side="bottom"] {
  animation-name: popoverSlideInFromBottom;
}

.bp-popover__content[data-side="left"] {
  animation-name: popoverSlideInFromLeft;
}

.bp-popover__content[data-side="right"] {
  animation-name: popoverSlideInFromRight;
}

@keyframes popoverContentIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes popoverContentOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.96);
  }
}

@keyframes popoverSlideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes popoverSlideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes popoverSlideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes popoverSlideInFromRight {
  from {
    opacity: 0;
    transform: translateX(8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
</style>