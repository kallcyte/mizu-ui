<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuSubContent } from "reka-ui";

export interface DropdownMenuSubContentProps {
  sideOffset?: number;
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

const props = withDefaults(defineProps<DropdownMenuSubContentProps>(), {
  sideOffset: 4,
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

const subContentClasses = computed(() => {
  const classes = ["mizu-dropdown-menu__sub-content"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const subContentStyle = computed(() => {
  return attrs.style as string | Record<string, string> | undefined;
});
</script>

<template>
  <DropdownMenuSubContent
    :class="subContentClasses"
    :style="subContentStyle"
    :side-offset="sideOffset"
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
  </DropdownMenuSubContent>
</template>

<style>
.mizu-dropdown-menu__sub-content {
  all: revert;
  z-index: 51;
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

.mizu-dropdown-menu__sub-content[data-state="open"] {
  animation: dropdownSubContentIn 150ms ease-out;
}

.mizu-dropdown-menu__sub-content[data-state="closed"] {
  animation: dropdownSubContentOut 100ms ease-in;
}

@keyframes dropdownSubContentIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes dropdownSubContentOut {
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
