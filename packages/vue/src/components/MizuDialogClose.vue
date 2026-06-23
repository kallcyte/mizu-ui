<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogClose } from "reka-ui";

export interface DialogCloseProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DialogCloseProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const closeClasses = computed(() => {
  const classes = ["bp-dialog__close"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DialogClose
    :class="closeClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </slot>
  </DialogClose>
</template>

<style>
.bp-dialog__close {
  all: revert;
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--color-foreground-secondary);
  cursor: pointer;
  padding: 0;
  margin: 0;
  font: inherit;
  transition: background 150ms, color 150ms;
}

.bp-dialog__close:hover {
  background: var(--color-surface-subtle);
  color: var(--color-foreground-primary);
}
</style>
