<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuTrigger } from "reka-ui";

export interface DropdownMenuTriggerProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const triggerClasses = computed(() => {
  const classes = ["bp-dropdown-menu__trigger"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DropdownMenuTrigger
    :class="triggerClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
