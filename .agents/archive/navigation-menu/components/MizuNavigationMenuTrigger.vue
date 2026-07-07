<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NavigationMenuTrigger } from "reka-ui";

export interface NavigationMenuTriggerProps {
  disabled?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<NavigationMenuTriggerProps>(), {
  disabled: false,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const triggerClasses = computed(() => {
  const c = ["NavigationMenuTrigger"];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <NavigationMenuTrigger
    :class="triggerClasses"
    :disabled="disabled"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </NavigationMenuTrigger>
</template>

<style>
.NavigationMenuTrigger {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 14px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-foreground-secondary, #5f6b7c);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  outline: none;
  transition: color 150ms ease, background-color 150ms ease;
}

.NavigationMenuTrigger:hover,
.NavigationMenuTrigger[data-state="open"] {
  color: var(--color-foreground-primary, #1a1a2e);
  background-color: var(--color-surface-subtle, #f8f8f8);
}

.NavigationMenuTrigger:focus-visible {
  outline: 2px solid var(--color-brand-ycp, #6366f1);
  outline-offset: 2px;
}

.NavigationMenuTrigger[data-disabled] {
  color: var(--color-foreground-tertiary, #9ca3af);
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>