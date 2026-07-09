<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerAnchor } from "reka-ui";

export interface DatePickerAnchorProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerAnchorProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const anchorClasses = computed(() => {
  const classes = ["mizu-date-picker__anchor"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerAnchor :class="anchorClasses" :as-child="asChild" :as="as">
    <slot />
  </DatePickerAnchor>
</template>
