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
  font-family: inherit;
  padding: 16px;

  /* Enter/exit transitions driven by data-state */
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
  transition: opacity 200ms ease, transform 200ms ease;
}

.bp-nav-menu__content[data-state="open"] {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .bp-nav-menu__content {
    transition: none;
  }
}
</style>