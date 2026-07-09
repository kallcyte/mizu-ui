<script setup lang="ts">
import { useAttrs } from "vue";
import { ScrollAreaViewport } from "reka-ui";

export interface ScrollAreaViewportProps {
  nonce?: string;
  asChild?: boolean;
  as?: string;
}

defineProps<ScrollAreaViewportProps>();

const attrs = useAttrs();
</script>

<template>
  <ScrollAreaViewport
    :class="['mizu-scroll-area__viewport', attrs.class]"
    :nonce="nonce"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ScrollAreaViewport>
</template>

<style>
.mizu-scroll-area__viewport {
  all: revert;
  width: 100%;
  max-height: inherit;
  max-width: inherit;
  border-radius: inherit;
  font-family: inherit;
}

.mizu-scroll-area__viewport > div {
  width: 100%;
}
</style>
