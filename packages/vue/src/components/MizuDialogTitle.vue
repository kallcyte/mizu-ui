<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogTitle } from "reka-ui";

export interface DialogTitleProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DialogTitleProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const titleClasses = computed(() => {
  const classes = ["mizu-dialog__title"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DialogTitle :class="titleClasses" :as-child="asChild" :as="as">
    <slot />
  </DialogTitle>
</template>

<style>
.mizu-dialog__title {
  all: revert;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-foreground-primary);
}
</style>
