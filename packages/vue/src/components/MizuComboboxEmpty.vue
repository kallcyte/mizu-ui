<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxEmpty } from "reka-ui";

export interface ComboboxEmptyProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxEmptyProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const emptyClasses = computed(() => {
  const classes = ["mizu-combobox__empty"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxEmpty :class="emptyClasses" :as-child="asChild" :as="as">
    <slot />
  </ComboboxEmpty>
</template>

<style>
.mizu-combobox__empty {
  all: revert;
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
  color: var(--color-foreground-muted);
  text-align: center;
}
</style>
