<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerCalendar } from "reka-ui";

export interface DatePickerCalendarProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerCalendarProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const calendarClasses = computed(() => {
  const classes = ["bp-date-picker__calendar"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerCalendar
    :class="calendarClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DatePickerCalendar>
</template>

<style>
.bp-date-picker__calendar {
  all: revert;
  font-family: inherit;
}
</style>
