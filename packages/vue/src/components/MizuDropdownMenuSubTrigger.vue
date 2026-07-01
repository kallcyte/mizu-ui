<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuSubTrigger } from "reka-ui";

export interface DropdownMenuSubTriggerProps {
  disabled?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DropdownMenuSubTriggerProps>(), {
  disabled: false,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const subTriggerClasses = computed(() => {
  const classes = ["bp-dropdown-menu__sub-trigger"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DropdownMenuSubTrigger
    :class="subTriggerClasses"
    :disabled="disabled"
    :as-child="asChild"
    :as="as"
  >
    <slot />
    <svg
      class="bp-dropdown-menu__sub-trigger-chevron"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  </DropdownMenuSubTrigger>
</template>

<style>
.bp-dropdown-menu__sub-trigger {
  all: revert;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
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
}

.bp-dropdown-menu__sub-trigger-chevron {
  flex-shrink: 0;
  opacity: 0.6;
  pointer-events: none;
}

.bp-dropdown-menu__sub-trigger[data-highlighted] {
  background-color: var(--color-surface-hover);
}

.bp-dropdown-menu__sub-trigger[data-disabled] {
  color: var(--color-foreground-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
