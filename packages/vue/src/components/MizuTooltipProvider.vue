<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { TooltipProvider } from "reka-ui";

export interface TooltipProviderProps {
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  delayDuration: 700,
  skipDelayDuration: 300,
  disableHoverableContent: false,
  disabled: false,
});

const attrs = useAttrs();

const providerClasses = computed(() => {
  const classes = ["bp-tooltip-provider"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <TooltipProvider
    :class="providerClasses"
    :delay-duration="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    :disable-hoverable-content="disableHoverableContent"
    :disabled="disabled"
  >
    <slot />
  </TooltipProvider>
</template>
