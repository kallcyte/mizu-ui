<script setup lang="ts">
import { computed, useAttrs } from "vue";
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

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["bp-collapsible"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <CollapsibleRoot
    :class="rootClasses"
    :open="open"
    :default-open="defaultOpen"
    :disabled="disabled"
    :as-child="asChild"
    :as="as"
    @update:open="(value) => emit('update:open', value)"
  >
    <slot />
  </CollapsibleRoot>
</template>

<style>
.bp-collapsible {
  all: revert;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: inherit;
}
</style>
