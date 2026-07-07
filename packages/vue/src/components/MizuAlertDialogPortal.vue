<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogPortal } from "reka-ui";

export interface AlertDialogPortalProps {
  to?: string | HTMLElement;
  disabled?: boolean;
  forceMount?: boolean;
}

const props = withDefaults(defineProps<AlertDialogPortalProps>(), {
  to: "body",
  disabled: false,
  forceMount: false,
});

const attrs = useAttrs();

const portalClasses = computed(() => {
  const classes = ["mizu-alert-dialog-portal"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <AlertDialogPortal :class="portalClasses" :to="to" :disabled="disabled" :force-mount="forceMount">
    <slot />
  </AlertDialogPortal>
</template>
