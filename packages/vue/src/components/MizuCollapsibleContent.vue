<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { CollapsibleContent } from "reka-ui";

export interface CollapsibleContentProps {
  forceMount?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<CollapsibleContentProps>(), {
  forceMount: undefined,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const contentClasses = computed(() => {
  const classes = ["bp-collapsible__content"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <CollapsibleContent
    :class="contentClasses"
    :force-mount="forceMount"
    :as-child="asChild"
    :as="as"
  >
    <div class="bp-collapsible__content-inner">
      <slot />
    </div>
  </CollapsibleContent>
</template>

<style>
.bp-collapsible__content {
  all: revert;
  overflow: hidden;
  font-family: inherit;
}

.bp-collapsible__content[data-state="closed"] {
  animation: collapsibleSlideUp 200ms ease-out;
}

.bp-collapsible__content[data-state="open"] {
  animation: collapsibleSlideDown 200ms ease-out;
}

.bp-collapsible__content-inner {
  padding: 0 16px 16px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-foreground-secondary);
}

@keyframes collapsibleSlideDown {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }
}

@keyframes collapsibleSlideUp {
  from {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}
</style>
