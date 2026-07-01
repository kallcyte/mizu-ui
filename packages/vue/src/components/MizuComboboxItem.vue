<script setup lang="ts">
import type { AcceptableValue } from "reka-ui";
import { computed, useAttrs } from "vue";
import { ComboboxItem } from "reka-ui";

export interface ComboboxItemProps {
  value: AcceptableValue;
  disabled?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxItemProps>(), {
  disabled: false,
  asChild: undefined,
  as: undefined,
});

const emit = defineEmits<{
  select: [event: Event];
}>();

const attrs = useAttrs();

const itemClasses = computed(() => {
  const classes = ["bp-combobox__item"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxItem
    :class="itemClasses"
    :value="value"
    :disabled="disabled"
    :as-child="asChild"
    :as="as"
    @select="(e: Event) => emit('select', e)"
  >
    <slot />
  </ComboboxItem>
</template>

<style>
.bp-combobox__item {
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
}

.bp-combobox__item[data-highlighted] {
  background-color: var(--color-surface-hover);
}

.bp-combobox__item[data-disabled] {
  color: var(--color-foreground-disabled);
  cursor: not-allowed;
  pointer-events: none;
}

.bp-combobox__item[data-state="checked"] {
  padding-left: 8px;
}
</style>
