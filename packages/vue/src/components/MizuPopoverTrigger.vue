<script setup lang="ts">
import { PopoverTrigger } from "reka-ui";

export interface PopoverTriggerProps {
  asChild?: boolean;
  as?: string;
}

withDefaults(defineProps<PopoverTriggerProps>(), {
  asChild: true,
  as: "button",
});
</script>

<template>
  <PopoverTrigger
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </PopoverTrigger>
</template>

<style>
.bp-popover-trigger {
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
}
</style>