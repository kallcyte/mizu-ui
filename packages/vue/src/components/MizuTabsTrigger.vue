<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { TabsTrigger } from "reka-ui";

export interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<TabsTriggerProps>(), {
  disabled: false,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const triggerClasses = computed(() => {
  const classes = ["mizu-tabs__trigger"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <TabsTrigger
    :class="triggerClasses"
    :value="value"
    :disabled="disabled"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </TabsTrigger>
</template>

<style>
.mizu-tabs__trigger {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-foreground-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  outline: none;
  position: relative;
  margin-top: 0;
}

.mizu-tabs__trigger[data-state="active"] {
  color: var(--color-foreground-primary);
}

.mizu-tabs__trigger[data-state="active"]::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-brand-accent);
}

.mizu-tabs__list[data-orientation="vertical"] .mizu-tabs__trigger[data-state="active"]::after {
  bottom: 0;
  top: 0;
  left: -1px;
  right: auto;
  width: 2px;
  height: auto;
}

.mizu-tabs__trigger:not([data-disabled]):hover {
  color: var(--color-foreground-primary);
}

.mizu-tabs__trigger[data-disabled] {
  color: var(--color-foreground-tertiary);
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.mizu-tabs__list[data-size="sm"] .mizu-tabs__trigger {
  padding: 6px 12px;
  font-size: 13px;
}

.mizu-tabs__list[data-size="lg"] .mizu-tabs__trigger {
  padding: 10px 20px;
  font-size: 15px;
}

.mizu-tabs__list[data-variant="button"] .mizu-tabs__trigger {
  flex: 1;
  border-radius: 6px;
  padding: 6px 12px;
  border: 1px solid transparent;
}

.mizu-tabs__list[data-variant="button"][data-size="sm"] .mizu-tabs__trigger {
  padding: 4px 10px;
  font-size: 13px;
  border-radius: 4px;
}

.mizu-tabs__list[data-variant="button"][data-size="lg"] .mizu-tabs__trigger {
  padding: 8px 16px;
  font-size: 15px;
  border-radius: 6px;
}

.mizu-tabs__list[data-variant="button"] .mizu-tabs__trigger[data-state="active"] {
  color: var(--color-foreground-inverse);
  background-color: var(--color-brand-accent);
  border-color: transparent;
  box-shadow: none;
}

.mizu-tabs__list[data-variant="button"] .mizu-tabs__trigger[data-state="active"]::after {
  display: none;
}

.mizu-tabs__list[data-variant="button"] .mizu-tabs__trigger:not([data-state="active"]):hover {
  color: var(--color-foreground-primary);
  background-color: var(--color-surface-base);
}

.mizu-tabs__list[data-orientation="vertical"][data-variant="button"] .mizu-tabs__trigger {
  flex: none;
}
</style>
