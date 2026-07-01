<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuRadioItem } from "reka-ui";

export interface DropdownMenuRadioItemProps {
  value: string;
  disabled?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DropdownMenuRadioItemProps>(), {
  disabled: false,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const radioItemClasses = computed(() => {
  const classes = ["bp-dropdown-menu__radio-item"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DropdownMenuRadioItem
    :class="radioItemClasses"
    :value="value"
    :disabled="disabled"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DropdownMenuRadioItem>
</template>

<style>
.bp-dropdown-menu__radio-item {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  padding-left: 28px;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.4;
  cursor: pointer;
  color: var(--color-foreground-primary);
  outline: none;
  user-select: none;
  margin-top: 0;
  box-sizing: border-box;
  position: relative;
}

.bp-dropdown-menu__radio-item[data-highlighted] {
  background-color: var(--color-surface-hover);
}

.bp-dropdown-menu__radio-item[data-disabled] {
  color: var(--color-foreground-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
