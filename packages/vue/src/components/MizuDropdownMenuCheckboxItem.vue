<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuCheckboxItem } from "reka-ui";

export interface DropdownMenuCheckboxItemProps {
  modelValue?: boolean;
  checked?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DropdownMenuCheckboxItemProps>(), {
  disabled: false,
  asChild: undefined,
  as: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "update:checked": [value: boolean];
}>();

const attrs = useAttrs();

const checkboxItemClasses = computed(() => {
  const classes = ["mizu-dropdown-menu__checkbox-item"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const internalValue = computed(() => {
  if (props.modelValue !== undefined) return props.modelValue;
  if (props.checked !== undefined) return props.checked;
  return false;
});

function handleUpdate(value: boolean) {
  emit("update:modelValue", value);
  emit("update:checked", value);
}
</script>

<template>
  <DropdownMenuCheckboxItem
    :class="checkboxItemClasses"
    :model-value="internalValue"
    :disabled="disabled"
    :as-child="asChild"
    :as="as"
    @update:model-value="handleUpdate"
  >
    <slot />
  </DropdownMenuCheckboxItem>
</template>

<style>
.mizu-dropdown-menu__checkbox-item {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  padding-left: 28px;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.4;
  cursor: pointer;
  color: var(--color-foreground-primary);
  outline: none;
  user-select: none;
  margin-top: 0;
  box-sizing: border-box;
  position: relative;
}

.mizu-dropdown-menu__checkbox-item[data-highlighted] {
  background-color: var(--color-surface-hover);
}

.mizu-dropdown-menu__checkbox-item[data-disabled] {
  color: var(--color-foreground-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
