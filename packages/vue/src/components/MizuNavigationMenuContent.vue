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
  top: 0;
  left: 0;
  width: 100%;
  font-family: inherit;
  padding: 16px;
}

.bp-nav-menu__content[data-motion="from-start"] {
  animation-name: bp-nav-menu-enter-from-left;
}
.bp-nav-menu__content[data-motion="from-end"] {
  animation-name: bp-nav-menu-enter-from-right;
}
.bp-nav-menu__content[data-motion="to-start"] {
  animation-name: bp-nav-menu-exit-to-left;
}
.bp-nav-menu__content[data-motion="to-end"] {
  animation-name: bp-nav-menu-exit-to-right;
}

.bp-nav-menu__content[data-state="open"],
.bp-nav-menu__content[data-state="closed"] {
  animation-duration: 250ms;
  animation-timing-function: ease;
}

@keyframes bp-nav-menu-enter-from-right {
  from { opacity: 0; transform: translateX(200px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes bp-nav-menu-enter-from-left {
  from { opacity: 0; transform: translateX(-200px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes bp-nav-menu-exit-to-right {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(200px); }
}

@keyframes bp-nav-menu-exit-to-left {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-200px); }
}

@media (prefers-reduced-motion: reduce) {
  .bp-nav-menu__content[data-state="open"],
  .bp-nav-menu__content[data-state="closed"] {
    animation: none;
  }
}
</style>