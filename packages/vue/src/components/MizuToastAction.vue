<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ToastAction } from "reka-ui";

export interface ToastActionProps {
  altText: string;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ToastActionProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const actionClasses = computed(() => {
  const classes = ["mizu-toast__action"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ToastAction :class="actionClasses" :alt-text="altText" :as-child="asChild" :as="as">
    <slot />
  </ToastAction>
</template>
