<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogTitle } from "reka-ui";

export interface AlertDialogTitleProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<AlertDialogTitleProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const titleClasses = computed(() => {
  const classes = ["mizu-alert-dialog__title"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <AlertDialogTitle
    :class="titleClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </AlertDialogTitle>
</template>

<style>
.mizu-alert-dialog__title {
  all: revert;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-foreground-primary);
}
</style>
