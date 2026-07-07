<script setup lang="ts">
import { computed } from "vue";
import { CollapsibleRoot } from "reka-ui";

export interface CollapsibleRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<CollapsibleRootProps>(), {
  open: undefined,
  defaultOpen: false,
  disabled: false,
  asChild: undefined,
  as: undefined,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const collapsibleProps = computed(() => {
  const bindings: Record<string, unknown> = {
    class: "mizu-collapsible",
    "default-open": props.defaultOpen,
    disabled: props.disabled,
  };
  if (props.open !== undefined) bindings.open = props.open;
  if (props.asChild !== undefined) bindings["as-child"] = props.asChild;
  if (props.as !== undefined) bindings.as = props.as;
  return bindings;
});
</script>

<template>
  <CollapsibleRoot
  v-bind="collapsibleProps"
  @update:open="(value) => emit('update:open', value)"
>
    <slot />
  </CollapsibleRoot>
</template>

<style>
.mizu-collapsible {
  all: revert;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  font-family: inherit;
}
</style>
