<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerInput } from "reka-ui";

export interface DatePickerInputProps {
  part?: "year" | "month" | "day" | "hour" | "minute" | "second" | "dayPeriod" | "timeZoneName";
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerInputProps>(), {
  part: undefined,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const inputClasses = computed(() => {
  const classes = ["bp-date-picker__input"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerInput
    :class="inputClasses"
    :part="part"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DatePickerInput>
</template>
