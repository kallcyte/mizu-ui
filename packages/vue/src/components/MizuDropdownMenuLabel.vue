<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuLabel } from "reka-ui";

export interface DropdownMenuLabelProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DropdownMenuLabelProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const labelClasses = computed(() => {
  const classes = ["mizu-dropdown-menu__label"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DropdownMenuLabel
    :class="labelClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DropdownMenuLabel>
</template>

<style>
.mizu-dropdown-menu__label {
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
