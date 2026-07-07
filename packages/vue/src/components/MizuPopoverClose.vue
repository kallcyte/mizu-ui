<script setup lang="ts">
import { PopoverClose } from "reka-ui";

export interface PopoverCloseProps {
  asChild?: boolean;
  as?: string;
}

withDefaults(defineProps<PopoverCloseProps>(), {
  asChild: undefined,
  as: undefined,
});
</script>

<template>
  <PopoverClose :as-child="asChild" :as="as">
    <slot />
  </PopoverClose>
</template>

<style>
.mizu-popover-close {
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  font: inherit;
  color: inherit;
}
</style>
