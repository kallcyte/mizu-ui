<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogRoot } from "reka-ui";

export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
}

const props = withDefaults(defineProps<AlertDialogProps>(), {
  open: undefined,
  defaultOpen: false,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["mizu-alert-dialog"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <AlertDialogRoot
    :class="rootClasses"
    :open="open"
    :default-open="defaultOpen"
    @update:open="(value) => emit('update:open', value)"
  >
    <slot />
  </AlertDialogRoot>
</template>
