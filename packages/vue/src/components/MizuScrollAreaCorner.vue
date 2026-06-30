<script setup lang="ts">
import { useAttrs } from "vue";
import { ScrollAreaCorner } from "reka-ui";

export interface ScrollAreaCornerProps {
  asChild?: boolean;
  as?: string;
}

defineProps<ScrollAreaCornerProps>();

const attrs = useAttrs();
</script>

<template>
  <ScrollAreaCorner
    :class="['bp-scroll-area__corner', attrs.class]"
    :as-child="asChild"
    :as="as"
  />
</template>

<style>
.bp-scroll-area__corner {
  all: revert;
  background-color: var(--color-surface-muted);
  font-family: inherit;
}
</style>
