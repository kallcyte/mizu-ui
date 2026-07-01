<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuRoot } from "reka-ui";

export interface DropdownMenuRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}

const props = withDefaults(defineProps<DropdownMenuRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["mizu-dropdown-menu"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DropdownMenuRoot
    :class="rootClasses"
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    @update:open="(value) => emit('update:open', value)"
  >
    <slot />
  </DropdownMenuRoot>
</template>
