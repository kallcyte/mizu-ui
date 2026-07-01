<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ToastDescription } from "reka-ui";

export interface ToastDescriptionProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ToastDescriptionProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const descriptionClasses = computed(() => {
  const classes = ["mizu-toast__description"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ToastDescription
    :class="descriptionClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ToastDescription>
</template>

<style>
.mizu-toast__description {
  all: revert;
  margin: 4px 0 0;
  font-size: 13px;
  line-height: 1.4;
  color: var(--color-foreground-secondary);
}
</style>
