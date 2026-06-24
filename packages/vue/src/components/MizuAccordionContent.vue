<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AccordionContent } from "reka-ui";

export interface AccordionContentProps {
  forceMount?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<AccordionContentProps>(), {
  forceMount: undefined,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const contentClasses = computed(() => {
  const classes = ["bp-accordion__content"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <AccordionContent
    :class="contentClasses"
    :force-mount="forceMount"
    :as-child="asChild"
    :as="as"
  >
    <div class="bp-accordion__content-inner">
      <slot />
    </div>
  </AccordionContent>
</template>

<style>
.bp-accordion__content {
  all: revert;
  overflow: hidden;
  font-family: inherit;
}

.bp-accordion__content[data-state="closed"] {
  animation: accordionSlideUp 200ms ease-out;
}

.bp-accordion__content[data-state="open"] {
  animation: accordionSlideDown 200ms ease-out;
}

.bp-accordion__content-inner {
  padding: 0 16px 16px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-foreground-secondary);
}

@keyframes accordionSlideDown {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--reka-accordion-content-height);
    opacity: 1;
  }
}

@keyframes accordionSlideUp {
  from {
    height: var(--reka-accordion-content-height);
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}
</style>
