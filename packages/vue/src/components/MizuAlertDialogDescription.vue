<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogDescription } from "reka-ui";

export interface AlertDialogDescriptionProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<AlertDialogDescriptionProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const descriptionClasses = computed(() => {
  const classes = ["mizu-alert-dialog__description"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <AlertDialogDescription
    :class="descriptionClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </AlertDialogDescription>
</template>

<style>
.mizu-alert-dialog__description {
  all: revert;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-foreground-secondary);
}
</style>
