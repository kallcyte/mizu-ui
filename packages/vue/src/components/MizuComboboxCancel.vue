<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxCancel } from "reka-ui";

export interface ComboboxCancelProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxCancelProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const cancelClasses = computed(() => {
  const classes = ["bp-combobox__cancel"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxCancel
    :class="cancelClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ComboboxCancel>
</template>

<style>
.bp-combobox__cancel {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-foreground-muted);
  outline: none;
}

.bp-combobox__cancel:hover {
  color: var(--color-foreground-primary);
}
</style>
