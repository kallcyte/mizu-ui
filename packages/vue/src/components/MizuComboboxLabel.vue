<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxLabel } from "reka-ui";

export interface ComboboxLabelProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxLabelProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const labelClasses = computed(() => {
  const classes = ["mizu-combobox__label"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxLabel
    :class="labelClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ComboboxLabel>
</template>

<style>
.mizu-combobox__label {
  all: revert;
  display: flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  line-height: 1.4;
  color: var(--color-foreground-muted);
  user-select: none;
  margin-top: 0;
}
</style>
