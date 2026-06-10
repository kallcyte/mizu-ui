<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogTrigger } from "reka-ui";

export interface AlertDialogTriggerProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<AlertDialogTriggerProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const triggerClasses = computed(() => {
  const classes = ["bp-alert-dialog__trigger"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <AlertDialogTrigger
    :class="triggerClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </AlertDialogTrigger>
</template>
