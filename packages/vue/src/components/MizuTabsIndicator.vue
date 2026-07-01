<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { TabsIndicator } from "reka-ui";

export interface TabsIndicatorProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<TabsIndicatorProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const indicatorClasses = computed(() => {
  const classes = ["mizu-tabs__indicator"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <TabsIndicator
    :class="indicatorClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </TabsIndicator>
</template>

<style>
.mizu-tabs__indicator {
  all: revert;
  position: absolute;
  bottom: -1px;
  height: 2px;
  background-color: var(--color-brand-accent);
  transition: left 200ms ease, width 200ms ease;
}

.mizu-tabs__list[data-orientation="vertical"] .mizu-tabs__indicator {
  bottom: 0;
  top: 0;
  left: -1px;
  width: 2px;
  height: auto;
  transition: top 200ms ease, height 200ms ease;
}
</style>
