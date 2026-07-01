<script setup lang="ts">
import { useAttrs } from "vue";
import { ScrollAreaThumb } from "reka-ui";

export interface ScrollAreaThumbProps {
  asChild?: boolean;
  as?: string;
}

defineProps<ScrollAreaThumbProps>();

const attrs = useAttrs();
</script>

<template>
  <ScrollAreaThumb
    :class="['mizu-scroll-area__thumb', attrs.class]"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ScrollAreaThumb>
</template>

<style>
.mizu-scroll-area__thumb {
  all: revert;
  flex: 1;
  background-color: var(--color-foreground-tertiary);
  border-radius: 9999px;
  position: relative;
  font-family: inherit;
  transition: background-color 150ms ease;
}

.mizu-scroll-area__thumb::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: 44px;
  min-height: 44px;
}

.mizu-scroll-area__thumb:hover {
  background-color: var(--color-foreground-secondary);
}

.mizu-scroll-area__scrollbar--vertical .mizu-scroll-area__thumb {
  width: 6px;
  min-height: 24px;
}

.mizu-scroll-area__scrollbar--horizontal .mizu-scroll-area__thumb {
  height: 6px;
  min-width: 24px;
}
</style>
