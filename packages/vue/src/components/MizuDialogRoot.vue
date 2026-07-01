<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogRoot } from "reka-ui";

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}

const props = withDefaults(defineProps<DialogProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["bp-dialog"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DialogRoot
    :class="rootClasses"
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    @update:open="(value) => emit('update:open', value)"
  >
    <slot />
  </DialogRoot>
</template>
