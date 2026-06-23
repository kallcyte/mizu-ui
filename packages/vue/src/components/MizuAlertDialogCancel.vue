<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogCancel } from "reka-ui";

export interface AlertDialogCancelProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<AlertDialogCancelProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const cancelClasses = computed(() => {
  const classes = ["bp-alert-dialog__cancel"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <AlertDialogCancel
    :class="cancelClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </AlertDialogCancel>
</template>
