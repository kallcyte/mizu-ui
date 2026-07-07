<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogPortal } from "reka-ui";

export interface DialogPortalProps {
  to?: string | HTMLElement;
  disabled?: boolean;
  forceMount?: boolean;
}

const props = withDefaults(defineProps<DialogPortalProps>(), {
  to: "body",
  disabled: false,
  forceMount: false,
});

const attrs = useAttrs();

const portalClasses = computed(() => {
  const classes = ["mizu-dialog-portal"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DialogPortal :class="portalClasses" :to="to" :disabled="disabled" :force-mount="forceMount">
    <slot />
  </DialogPortal>
</template>
