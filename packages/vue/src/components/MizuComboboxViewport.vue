<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxViewport } from "reka-ui";

export interface ComboboxViewportProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxViewportProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const viewportClasses = computed(() => {
  const classes = ["bp-combobox__viewport"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxViewport
    :class="viewportClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ComboboxViewport>
</template>

<style>
.bp-combobox__viewport {
  all: revert;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 0;
}
</style>
