<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NavigationMenuLink } from "reka-ui";

export interface NavigationMenuLinkProps {
  active?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<NavigationMenuLinkProps>(), {
  active: undefined,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const linkClasses = computed(() => {
  const c = ["NavigationMenuLink"];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <NavigationMenuLink
    :class="linkClasses"
    :active="active"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </NavigationMenuLink>
</template>

<style>
.NavigationMenuLink {
  all: revert;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-foreground-secondary, #5f6b7c);
  text-decoration: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  outline: none;
  transition: color 150ms ease, background-color 150ms ease;
}

.NavigationMenuLink:hover {
  color: var(--color-foreground-primary, #1a1a2e);
  background-color: var(--color-surface-subtle, #f8f8f8);
}

.NavigationMenuLink:focus-visible {
  outline: 2px solid var(--color-brand-accent, #6366f1);
  outline-offset: 2px;
}

.NavigationMenuLink[data-active] {
  color: var(--color-brand-primary, #001c44);
  background-color: var(--color-brand-accent-subtle, #e8f0ff);
}
</style>