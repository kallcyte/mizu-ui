<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxPortal } from "reka-ui";

export interface ComboboxPortalProps {
  to?: string | HTMLElement;
  disabled?: boolean;
}

const props = withDefaults(defineProps<ComboboxPortalProps>(), {
  to: "body",
  disabled: false,
});

const attrs = useAttrs();

const portalClasses = computed(() => {
  const classes = ["mizu-combobox-portal"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxPortal
    :class="portalClasses"
    :to="to"
    :disabled="disabled"
  >
    <slot />
  </ComboboxPortal>
</template>
