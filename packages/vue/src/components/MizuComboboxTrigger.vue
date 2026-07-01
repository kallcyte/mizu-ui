<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxTrigger } from "reka-ui";

export interface ComboboxTriggerProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxTriggerProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const triggerClasses = computed(() => {
  const classes = ["mizu-combobox__trigger"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxTrigger
    :class="triggerClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ComboboxTrigger>
</template>

<style>
.mizu-combobox__trigger {
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

.mizu-combobox__trigger:hover {
  color: var(--color-foreground-primary);
}

.mizu-combobox__trigger[data-state="open"] {
  color: var(--color-foreground-primary);
}
</style>
