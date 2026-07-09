<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ScrollAreaScrollbar } from "reka-ui";

export interface ScrollAreaScrollbarProps {
  orientation?: "vertical" | "horizontal";
  forceMount?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ScrollAreaScrollbarProps>(), {
  orientation: "vertical",
  forceMount: undefined,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const scrollbarClasses = computed(() => {
  const c = ["mizu-scroll-area__scrollbar", `mizu-scroll-area__scrollbar--${props.orientation}`];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <ScrollAreaScrollbar
    :class="scrollbarClasses"
    :orientation="orientation"
    :force-mount="forceMount"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ScrollAreaScrollbar>
</template>

<style>
.mizu-scroll-area__scrollbar {
  all: revert;
  display: flex;
  user-select: none;
  touch-action: none;
  padding: 2px;
  background-color: transparent;
  transition: background-color 200ms ease;
  font-family: inherit;
}

.mizu-scroll-area__scrollbar[data-state="visible"] {
  background-color: var(--color-surface-muted);
}

.mizu-scroll-area__scrollbar--vertical {
  width: 10px;
  flex-direction: column;
}

.mizu-scroll-area__scrollbar--horizontal {
  height: 10px;
  flex-direction: row;
}

.mizu-scroll-area__scrollbar:hover {
  background-color: var(--color-surface-subtle);
}
</style>
