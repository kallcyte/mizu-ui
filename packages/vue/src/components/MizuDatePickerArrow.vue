<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerArrow } from "reka-ui";

export interface DatePickerArrowProps {
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<DatePickerArrowProps>(), {
  width: 10,
  height: 5,
});

const attrs = useAttrs();

const arrowClasses = computed(() => {
  const classes = ["bp-date-picker__arrow"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerArrow
    :class="arrowClasses"
    :width="width"
    :height="height"
  />
</template>
