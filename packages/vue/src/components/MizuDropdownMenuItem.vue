<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuItem } from "reka-ui";

export interface DropdownMenuItemProps {
  disabled?: boolean;
  asChild?: boolean;
  as?: string;
  variant?: "default" | "destructive";
}

const props = withDefaults(defineProps<DropdownMenuItemProps>(), {
  disabled: false,
  asChild: undefined,
  as: undefined,
  variant: "default",
});

const emit = defineEmits<{
  select: [event: Event];
}>();

const attrs = useAttrs();

const itemClasses = computed(() => {
  const classes = ["mizu-dropdown-menu__item"];
  if (props.variant === "destructive") classes.push("mizu-dropdown-menu__item--destructive");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DropdownMenuItem
    :class="itemClasses"
    :disabled="disabled"
    :as-child="asChild"
    :as="as"
    @select="(e: Event) => emit('select', e)"
  >
    <slot />
  </DropdownMenuItem>
</template>

<style>
.mizu-dropdown-menu__item {
  all: revert;
  display: flex;
  align-items: center;
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

.mizu-dropdown-menu__item[data-highlighted] {
  background-color: var(--color-surface-hover);
}

.mizu-dropdown-menu__item--destructive {
  color: var(--color-feedback-error-base);
}

.mizu-dropdown-menu__item--destructive[data-highlighted] {
  background-color: var(--color-feedback-error-subtle);
  color: var(--color-feedback-error-base);
}

.mizu-dropdown-menu__item[data-disabled] {
  color: var(--color-foreground-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
