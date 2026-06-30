<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NavigationMenuContent } from "reka-ui";

export interface NavigationMenuContentProps {
  disableOutsidePointerEvents?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<NavigationMenuContentProps>(), {
  disableOutsidePointerEvents: undefined,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const contentClasses = computed(() => {
  const c = ["bp-nav-menu__content"];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <NavigationMenuContent
    :class="contentClasses"
    :disable-outside-pointer-events="disableOutsidePointerEvents"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </NavigationMenuContent>
</template>

<style>
.bp-nav-menu__content {
  all: revert;
  position: absolute;
  font-family: inherit;
  background-color: var(--color-surface-base);
  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.06);
  padding: 16px;
  animation: bp-nav-menu-content-in 200ms ease;
}

/* Horizontal: content drops below the trigger */
.bp-nav-menu--horizontal .bp-nav-menu__item {
  position: relative;
}
.bp-nav-menu--horizontal .bp-nav-menu__content {
  top: 100%;
  left: 0;
  margin-top: 6px;
  min-width: 200px;
  width: max-content;
  max-width: 500px;
}

/* Vertical: content opens to the right of the trigger */
.bp-nav-menu--vertical .bp-nav-menu__item {
  position: relative;
}
.bp-nav-menu--vertical .bp-nav-menu__content {
  top: 0;
  left: 100%;
  margin-left: 6px;
  min-width: 200px;
  width: max-content;
  max-width: 500px;
}

[data-theme="dark"] .bp-nav-menu__content {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.2);
}

@keyframes bp-nav-menu-content-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bp-nav-menu__content {
    animation: none;
  }
}
</style>