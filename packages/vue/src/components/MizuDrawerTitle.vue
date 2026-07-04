<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogTitle } from "reka-ui";

export interface DrawerTitleProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DrawerTitleProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const titleClasses = computed(() => {
  const classes = ["mizu-drawer__title"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DialogTitle
    :class="titleClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DialogTitle>
</template>

<style>
.mizu-drawer__title {
  all: revert;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-foreground-primary);
}
</style>
