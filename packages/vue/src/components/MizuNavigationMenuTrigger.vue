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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  background: white;
  color: #5f6b7c;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  outline: none;
}

.NavigationMenuTrigger:hover {
  background: #f8f8f8;
}

.NavigationMenuTrigger:focus-visible {
  box-shadow: 0 0 0 2px #6366f1;
}

.NavigationMenuTrigger[data-state="open"] {
  background: #f8f8f8;
}

.NavigationMenuTrigger[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>