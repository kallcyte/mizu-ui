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
  const classes = ["mizu-combobox__cancel"];
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
@reference "../index.css";

.mizu-combobox__cancel {
  all: revert;
  @apply inline-flex items-center justify-center p-[6px];
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-foreground-muted);
  outline: none;
}

.mizu-combobox__cancel:hover {
  color: var(--color-foreground-primary);
}
</style>
