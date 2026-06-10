<script setup lang="ts">
import type { AcceptableValue } from "reka-ui";
import { computed, useAttrs } from "vue";
import { ComboboxRoot } from "reka-ui";

export interface ComboboxRootProps {
  modelValue?: AcceptableValue | AcceptableValue[];
  defaultValue?: AcceptableValue | AcceptableValue[];
  multiple?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  name?: string;
  ignoreFilter?: boolean;
  by?: string;
}

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  multiple: false,
  open: undefined,
  defaultOpen: false,
  disabled: false,
  name: undefined,
  ignoreFilter: false,
  by: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: AcceptableValue | AcceptableValue[] | undefined];
  "update:open": [value: boolean];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["bp-combobox"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxRoot
    :class="rootClasses"
    :model-value="modelValue"
    :default-value="defaultValue"
    :multiple="multiple"
    :open="open"
    :default-open="defaultOpen"
    :disabled="disabled"
    :name="name"
    :ignore-filter="ignoreFilter"
    :by="by"
    @update:model-value="(v: AcceptableValue | AcceptableValue[] | undefined) => emit('update:modelValue', v)"
    @update:open="(v: boolean) => emit('update:open', v)"
  >
    <slot />
  </ComboboxRoot>
</template>
