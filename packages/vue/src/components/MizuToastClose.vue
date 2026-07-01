<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ToastClose } from "reka-ui";

export interface ToastCloseProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ToastCloseProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const closeClasses = computed(() => {
  const classes = ["bp-toast__close"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ToastClose
    :class="closeClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </slot>
  </ToastClose>
</template>

<style>
.bp-toast__close {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: var(--color-foreground-secondary);
  cursor: pointer;
  padding: 0;
  margin: 0;
  font: inherit;
  transition: background 150ms, color 150ms;
}

.bp-toast__close:hover {
  background: var(--color-surface-subtle);
  color: var(--color-foreground-primary);
}
</style>
