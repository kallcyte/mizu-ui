<script setup lang="ts">
import type { AcceptableValue } from "reka-ui";
import { DropdownMenuRadioGroup } from "reka-ui";

export interface DropdownMenuRadioGroupProps {
  modelValue?: AcceptableValue;
}

const props = withDefaults(defineProps<DropdownMenuRadioGroupProps>(), {
  modelValue: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: AcceptableValue];
}>();
</script>

<template>
  <DropdownMenuRadioGroup
    :model-value="modelValue"
    @update:model-value="(v: AcceptableValue) => emit('update:modelValue', v)"
  >
    <slot />
  </DropdownMenuRadioGroup>
</template>
