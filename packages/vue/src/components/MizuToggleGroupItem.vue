<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ToggleGroupItem } from "reka-ui";

export interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ToggleGroupItemProps>(), {
  disabled: false,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const itemClasses = computed(() => {
  const c = ["bp-toggle-group__item"];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <ToggleGroupItem
    :class="itemClasses"
    :value="value"
    :disabled="disabled"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ToggleGroupItem>
</template>

<style>
.bp-toggle-group__item {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 4px 10px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-foreground-muted);
  background: transparent;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  outline: none;
  margin-top: 0;
  transition: color 150ms ease, background-color 150ms ease;
}

.bp-toggle-group__item[data-state="on"] {
  color: var(--color-foreground-primary);
  background-color: var(--color-surface-base);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08),
    0 1px 2px -1px rgba(0, 0, 0, 0.06);
}

[data-theme="dark"] .bp-toggle-group__item[data-state="on"] {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
}

.bp-toggle-group__item:not([data-disabled]):hover {
  color: var(--color-foreground-primary);
  background-color: var(--color-surface-subtle);
}

.bp-toggle-group__item[data-disabled] {
  color: var(--color-foreground-tertiary);
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.bp-toggle-group__item:focus-visible {
  outline: 2px solid var(--color-brand-accent);
  outline-offset: 2px;
}

/* Size variants — driven by data-size on parent */
.bp-toggle-group[data-size="sm"] .bp-toggle-group__item {
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 3px;
  gap: 4px;
}

.bp-toggle-group[data-size="lg"] .bp-toggle-group__item {
  padding: 6px 14px;
  font-size: 14px;
  border-radius: 7px;
  gap: 8px;
}
</style>
