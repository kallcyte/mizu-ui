<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuSeparator } from "reka-ui";

export interface DropdownMenuSeparatorProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DropdownMenuSeparatorProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const separatorClasses = computed(() => {
  const classes = ["mizu-dropdown-menu__separator"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DropdownMenuSeparator :class="separatorClasses" :as-child="asChild" :as="as" />
</template>

<style>
.mizu-dropdown-menu__separator {
  all: revert;
  height: 1px;
  margin: 4px 8px;
  background-color: var(--color-surface-muted);
}
</style>
