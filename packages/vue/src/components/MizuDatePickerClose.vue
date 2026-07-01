<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerClose } from "reka-ui";

export interface DatePickerCloseProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerCloseProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const closeClasses = computed(() => {
  const classes = ["bp-date-picker__close"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerClose
    :class="closeClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DatePickerClose>
</template>

<style>
.bp-date-picker__close {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-foreground-muted);
  outline: none;
  position: absolute;
  top: 8px;
  right: 8px;
}

.bp-date-picker__close:hover {
  color: var(--color-foreground-primary);
}
</style>
