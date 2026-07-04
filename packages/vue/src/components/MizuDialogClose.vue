<script lang="ts">
import { type Component } from "vue";

export interface DialogCloseProps {
  asChild?: boolean;
  as?: string;
  /** Custom icon component to replace the default X icon */
  closeIcon?: Component;
}
</script>

<script setup lang="ts">
import { computed, useAttrs, inject } from "vue";
import { DialogClose } from "reka-ui";
import { MizuDialogDismissibleKey } from "./MizuDialogContent.vue";

const props = withDefaults(defineProps<DialogCloseProps>(), {
  asChild: undefined,
  as: undefined,
  closeIcon: undefined,
});

const attrs = useAttrs();

// Inject dismissible from MizuDialogContent — if false, don't render
const dismissible = inject(MizuDialogDismissibleKey, true);

const closeClasses = computed(() => {
  const classes = ["mizu-dialog__close"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DialogClose
    v-if="dismissible"
    :class="closeClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot>
      <component
        v-if="closeIcon"
        :is="closeIcon"
        :size="16"
      />
      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </slot>
  </DialogClose>
</template>

<style>
.mizu-dialog__close {
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

.mizu-dialog__close:hover {
  background: var(--color-surface-subtle);
  color: var(--color-foreground-primary);
}
</style>
