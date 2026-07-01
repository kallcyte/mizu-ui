<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuContent } from "reka-ui";

export interface DropdownMenuContentProps {
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
  forceMount?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DropdownMenuContentProps>(), {
  side: "bottom",
  sideOffset: 4,
  align: "start",
  alignOffset: 0,
  avoidCollisions: true,
  collisionBoundary: null,
  collisionPadding: 8,
  sticky: "partial",
  hideWhenDetached: false,
  arrowPadding: 0,
  forceMount: undefined,
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
  const classes = ["bp-dropdown-menu__content"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const contentStyle = computed(() => {
  return attrs.style as string | Record<string, string> | undefined;
});
</script>

<template>
  <DropdownMenuContent
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
    :force-mount="forceMount"
    :as-child="asChild"
    :as="as"
    @escape-key-down="(e: KeyboardEvent) => emit('escapeKeyDown', e)"
    @pointer-down-outside="(e: unknown) => emit('pointerDownOutside', e)"
    @focus-outside="(e: unknown) => emit('focusOutside', e)"
    @interact-outside="(e: unknown) => emit('interactOutside', e)"
    @open-auto-focus="(e: unknown) => emit('openAutoFocus', e)"
    @close-auto-focus="(e: unknown) => emit('closeAutoFocus', e)"
  >
    <slot />
  </DropdownMenuContent>
</template>

<style>
.bp-dropdown-menu__content {
  all: revert;
  z-index: 50;
  min-width: 180px;
  border-radius: 8px;
  padding: 4px;
  background-color: var(--color-surface-base);
  color: var(--color-foreground-primary);
  box-shadow: 0 10px 38px -10px rgba(0, 0, 0, 0.15), 0 6px 20px -14px rgba(0, 0, 0, 0.2);
  font-family: inherit;
  transform-origin: var(--reka-dropdown-menu-content-transform-origin);
  margin-top: 0;
}

.bp-dropdown-menu__content[data-state="open"] {
  animation: dropdownContentIn 150ms ease-out;
}

.bp-dropdown-menu__content[data-state="closed"] {
  animation: dropdownContentOut 100ms ease-in;
}

.bp-dropdown-menu__content[data-side="top"] {
  animation-name: dropdownContentSlideInFromTop;
}

.bp-dropdown-menu__content[data-side="bottom"] {
  animation-name: dropdownContentSlideInFromBottom;
}

@keyframes dropdownContentIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes dropdownContentOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

@keyframes dropdownContentSlideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes dropdownContentSlideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(4px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
