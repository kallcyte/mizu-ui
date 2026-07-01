<script setup lang="ts">
import { PopoverAnchor } from "reka-ui";

export interface PopoverAnchorProps {
  asChild?: boolean;
  as?: string;
  reference?: HTMLElement;
}

withDefaults(defineProps<PopoverAnchorProps>(), {
  asChild: undefined,
  as: undefined,
  reference: undefined,
});
</script>

<template>
  <PopoverAnchor
    :as-child="asChild"
    :as="as"
    :reference="reference"
  >
    <slot />
  </PopoverAnchor>
</template>