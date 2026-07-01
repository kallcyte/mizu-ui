<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogAction } from "reka-ui";

export interface AlertDialogActionProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<AlertDialogActionProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const actionClasses = computed(() => {
  const classes = ["mizu-alert-dialog__action"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <AlertDialogAction
    :class="actionClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </AlertDialogAction>
</template>
