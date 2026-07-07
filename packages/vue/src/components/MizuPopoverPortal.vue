<script setup lang="ts">
import { PopoverPortal } from "reka-ui";

export interface PopoverPortalProps {
  forceMount?: boolean;
  to?: string | HTMLElement;
}

withDefaults(defineProps<PopoverPortalProps>(), {
  forceMount: undefined,
  to: "body",
});
</script>

<template>
  <PopoverPortal
    :force-mount="forceMount"
    :to="to"
  >
    <slot />
  </PopoverPortal>
</template>