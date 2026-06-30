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
  const c = ["bp-nav-menu__link"];
  if (props.active) c.push("bp-nav-menu__link--active");
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
.bp-nav-menu__link {
  all: revert;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-foreground-secondary);
  text-decoration: none;
  border-radius: 6px;
  white-space: nowrap;
  user-select: none;
  outline: none;
  transition: color 150ms ease, background-color 150ms ease;
}

.bp-nav-menu__link:hover {
  color: var(--color-foreground-primary);
  background-color: var(--color-surface-subtle);
}

.bp-nav-menu__link--active {
  color: var(--color-brand-primary);
  background-color: var(--color-brand-accent-subtle);
}

.bp-nav-menu__link:focus-visible {
  outline: 2px solid var(--color-brand-accent);
  outline-offset: 2px;
}
</style>