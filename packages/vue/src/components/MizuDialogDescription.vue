<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogDescription } from "reka-ui";

export interface DialogDescriptionProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DialogDescriptionProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const descriptionClasses = computed(() => {
  const classes = ["bp-dialog__description"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DialogDescription
    :class="descriptionClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DialogDescription>
</template>

<style>
.bp-dialog__description {
  all: revert;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-foreground-secondary);
}
</style>
