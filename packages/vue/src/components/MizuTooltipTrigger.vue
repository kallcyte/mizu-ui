<script setup lang="ts">
import { TooltipTrigger } from "reka-ui";

export interface TooltipTriggerProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<TooltipTriggerProps>(), {
  asChild: true,
  as: "span",
});
</script>

<template>
  <TooltipTrigger
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </TooltipTrigger>
</template>

<style>
.mizu-tooltip-trigger {
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
