<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxAnchor } from "reka-ui";

export interface ComboboxAnchorProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxAnchorProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const anchorClasses = computed(() => {
  const classes = ["bp-combobox__anchor"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <ComboboxAnchor
    :class="anchorClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </ComboboxAnchor>
</template>
