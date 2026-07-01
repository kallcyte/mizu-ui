<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DatePickerRoot } from "reka-ui";

export interface DatePickerRootProps {
  modelValue?: any;
  defaultValue?: any;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  name?: string;
  placeholder?: any;
  locale?: string;
  readonlySegments?: ("year" | "month" | "day" | "hour" | "minute" | "second" | "dayPeriod" | "timeZoneName")[];
  hourCycle?: 12 | 24;
  granularity?: "day" | "hour" | "minute" | "second";
  hideTimeZone?: boolean;
  isDateUnavailable?: (date: any) => boolean;
  allowNonExistentDay?: boolean;
  startOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const props = withDefaults(defineProps<DatePickerRootProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  open: undefined,
  defaultOpen: false,
  disabled: false,
  readonly: false,
  name: undefined,
  placeholder: undefined,
  locale: "en",
  readonlySegments: undefined,
  hourCycle: undefined,
  granularity: "day",
  hideTimeZone: false,
  isDateUnavailable: undefined,
  allowNonExistentDay: false,
  startOfWeek: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: any];
  "update:open": [value: boolean];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["mizu-date-picker"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DatePickerRoot
    :class="rootClasses"
    :model-value="modelValue"
    :default-value="defaultValue"
    :open="open"
    :default-open="defaultOpen"
    :disabled="disabled"
    :readonly="readonly"
    :name="name"
    :placeholder="placeholder"
    :locale="locale"
    :readonly-segments="readonlySegments"
    :hour-cycle="hourCycle"
    :granularity="granularity"
    :hide-time-zone="hideTimeZone"
    :is-date-unavailable="isDateUnavailable"
    :allow-non-existent-day="allowNonExistentDay"
    :start-of-week="startOfWeek"
    @update:model-value="(v: any) => emit('update:modelValue', v)"
    @update:open="(v: boolean) => emit('update:open', v)"
  >
    <slot />
  </DatePickerRoot>
</template>
