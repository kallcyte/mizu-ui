<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuPortal } from "reka-ui";

export interface DropdownMenuPortalProps {
  to?: string | HTMLElement;
  disabled?: boolean;
  forceMount?: boolean;
}

const props = withDefaults(defineProps<DropdownMenuPortalProps>(), {
  to: "body",
  disabled: false,
  forceMount: false,
});

const attrs = useAttrs();

const portalClasses = computed(() => {
  const classes = ["bp-dropdown-menu-portal"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DropdownMenuPortal
    :class="portalClasses"
    :to="to"
    :disabled="disabled"
    :force-mount="forceMount"
  >
    <slot />
  </DropdownMenuPortal>
</template>
