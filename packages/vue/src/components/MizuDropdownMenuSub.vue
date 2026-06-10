<script setup lang="ts">
import { DropdownMenuSub } from "reka-ui";

export interface DropdownMenuSubProps {
  open?: boolean;
  defaultOpen?: boolean;
}

const props = withDefaults(defineProps<DropdownMenuSubProps>(), {
  open: undefined,
  defaultOpen: false,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();
</script>

<template>
  <DropdownMenuSub
    :open="open"
    :default-open="defaultOpen"
    @update:open="(value) => emit('update:open', value)"
  >
    <slot />
  </DropdownMenuSub>
</template>
