<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DialogPortal } from "reka-ui";

export interface DrawerPortalProps {
  to?: string | HTMLElement;
  disabled?: boolean;
  forceMount?: boolean;
}

const props = withDefaults(defineProps<DrawerPortalProps>(), {
  to: "body",
  disabled: false,
  forceMount: false,
});

const attrs = useAttrs();

const portalClasses = computed(() => {
  const classes = ["mizu-drawer__portal"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DialogPortal
    :class="portalClasses"
    :to="to"
    :disabled="disabled"
    :force-mount="forceMount"
  >
    <slot />
  </DialogPortal>
</template>
