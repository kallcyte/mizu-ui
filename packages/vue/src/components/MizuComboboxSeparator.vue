<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxSeparator } from "reka-ui";

export interface ComboboxSeparatorProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxSeparatorProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const separatorClasses = computed(() => {
  const classes = ["bp-combobox__separator"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxSeparator
    :class="separatorClasses"
    :as-child="asChild"
    :as="as"
  />
</template>

<style>
.bp-combobox__separator {
  all: revert;
  height: 1px;
  margin: 4px 8px;
  background-color: var(--color-surface-border);
}
</style>
