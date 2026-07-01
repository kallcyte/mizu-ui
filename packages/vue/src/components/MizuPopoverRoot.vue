<script setup lang="ts">
import { computed, useAttrs, provide } from "vue";
import { PopoverRoot } from "reka-ui";

export interface PopoverRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}

const props = withDefaults(defineProps<PopoverRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: false,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

// Provide modal state so Content can prevent outside dismissal
provide("popoverModal", props.modal);

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["mizu-popover"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <PopoverRoot
    :class="rootClasses"
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    @update:open="(value) => emit('update:open', value)"
  >
    <slot />
  </PopoverRoot>
</template>