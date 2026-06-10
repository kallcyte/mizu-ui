<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerHeading } from "reka-ui";

export interface DatePickerHeadingProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DatePickerHeadingProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const headingClasses = computed(() => {
  const classes = ["bp-date-picker__heading"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerHeading
    :class="headingClasses"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DatePickerHeading>
</template>

<style>
.bp-date-picker__heading {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  color: var(--color-foreground-primary);
  margin: 0;
}
</style>
