<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ScrollAreaRoot } from "reka-ui";

export interface ScrollAreaRootProps {
  type?: "auto" | "always" | "scroll" | "hover" | "glimpse";
  scrollHideDelay?: number;
  dir?: "ltr" | "rtl";
  maxHeight?: string | number;
  maxWidth?: string | number;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ScrollAreaRootProps>(), {
  type: "hover",
  scrollHideDelay: 600,
  dir: undefined,
  maxHeight: undefined,
  maxWidth: undefined,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

function sizeValue(value: string | number | undefined): string | undefined {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

const rootClasses = computed(() => {
  const c = ["mizu-scroll-area"];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});

const rootStyle = computed(() => {
  const s: Record<string, string> = {};
  if (props.maxHeight != null) s["max-height"] = sizeValue(props.maxHeight)!;
  if (props.maxWidth != null) s["max-width"] = sizeValue(props.maxWidth)!;
  return s;
});
</script>

<template>
  <ScrollAreaRoot
    :class="rootClasses"
    :style="rootStyle"
    :type="type"
    :scroll-hide-delay="scrollHideDelay"
    :dir="dir"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ScrollAreaRoot>
</template>

<style>
.mizu-scroll-area {
  all: revert;
  position: relative;
  overflow: hidden;
  font-family: inherit;
  width: 100%;
}
</style>
