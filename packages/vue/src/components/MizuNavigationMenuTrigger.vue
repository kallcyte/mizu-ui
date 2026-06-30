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
  const c = ["bp-nav-menu__trigger"];
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
.bp-nav-menu__trigger {
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
  color: var(--color-foreground-secondary);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  outline: none;
  transition: color 150ms ease, background-color 150ms ease;
}

.bp-nav-menu__trigger:hover {
  color: var(--color-foreground-primary);
  background-color: var(--color-surface-subtle);
}

.bp-nav-menu__trigger[data-state="open"] {
  color: var(--color-foreground-primary);
  background-color: var(--color-surface-subtle);
}

.bp-nav-menu__trigger:focus-visible {
  outline: 2px solid var(--color-brand-accent);
  outline-offset: 2px;
}

.bp-nav-menu__trigger[data-disabled] {
  color: var(--color-foreground-tertiary);
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>