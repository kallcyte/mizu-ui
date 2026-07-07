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
  const c = ["NavigationMenuContent"];
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
.NavigationMenuContent {
  all: revert;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-family: inherit;
  padding: 16px;
  animation-duration: 250ms;
  animation-timing-function: ease;
}

.NavigationMenuContent[data-motion="from-start"] {
  animation-name: enterFromLeft;
}

.NavigationMenuContent[data-motion="from-end"] {
  animation-name: enterFromRight;
}

.NavigationMenuContent[data-motion="to-start"] {
  animation-name: exitToLeft;
}

.NavigationMenuContent[data-motion="to-end"] {
  animation-name: exitToRight;
}

@keyframes enterFromRight {
  from {
    opacity: 0;
    transform: translateX(200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enterFromLeft {
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes exitToRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(200px);
  }
}

@keyframes exitToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-200px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .NavigationMenuContent {
    animation: none;
  }
}
</style>
