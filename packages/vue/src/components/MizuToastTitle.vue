<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ToastTitle } from "reka-ui";

export interface ToastTitleProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ToastTitleProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const titleClasses = computed(() => {
  const classes = ["mizu-toast__title"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ToastTitle
    :class="titleClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ToastTitle>
</template>

<style>
.mizu-toast__title {
  all: revert;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-foreground-primary);
}
</style>
