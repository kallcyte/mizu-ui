<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { TabsContent } from "reka-ui";

export interface TabsContentProps {
  value: string;
  forceMount?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<TabsContentProps>(), {
  forceMount: undefined,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const contentClasses = computed(() => {
  const classes = ["mizu-tabs__content"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const contentStyle = computed(() => {
  return attrs.style as string | Record<string, string> | undefined;
});
</script>

<template>
  <TabsContent
    :class="contentClasses"
    :style="contentStyle"
    :value="value"
    :force-mount="forceMount"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </TabsContent>
</template>

<style>
.mizu-tabs__content {
  padding: 16px 0;
  font-family: inherit;
  margin: 0;
}

.mizu-tabs__content[data-state="active"] {
  animation: tabsContentIn 200ms ease-out;
}

@keyframes tabsContentIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
