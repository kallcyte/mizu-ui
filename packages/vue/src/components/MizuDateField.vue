<script setup lang="ts">
import { computed } from "vue";
import { CalendarDate } from "@internationalized/date";

export type DateFieldStyle = "short" | "medium" | "long" | "full" | "compact";

export interface DateRange {
  start: CalendarDate;
  end: CalendarDate;
}

export type DateFieldModel = CalendarDate | DateRange | undefined;

export interface MizuDateFieldProps {
  modelValue?: DateFieldModel;
  range?: boolean;
  dateStyle?: DateFieldStyle;
  format?: Intl.DateTimeFormatOptions;
  locale?: string;
  placeholder?: string;
  rangePlaceholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<MizuDateFieldProps>(), {
  dateStyle: "medium",
  placeholder: "Pick a date",
  rangePlaceholder: "Pick a date range",
  size: "md",
});

const emit = defineEmits<{
  "update:modelValue": [value: DateFieldModel];
}>();

const STYLE_MAP: Record<DateFieldStyle, Intl.DateTimeFormatOptions> = {
  short: { dateStyle: "short" },
  medium: { dateStyle: "medium" },
  long: { dateStyle: "long" },
  full: { dateStyle: "full" },
  compact: { weekday: "short", day: "2-digit", month: "short", year: "numeric" },
};

const fmtOptions = computed<Intl.DateTimeFormatOptions>(() =>
  props.format ?? STYLE_MAP[props.dateStyle]
);

function formatDate(d: CalendarDate): string {
  try { return d.toDate("UTC").toLocaleDateString(props.locale, fmtOptions.value); }
  catch { return ""; }
}

function isRangeValue(v: DateFieldModel): v is DateRange {
  return v != null && "start" in v && "end" in v;
}

const display = computed(() => {
  if (!props.modelValue) return "";
  if (isRangeValue(props.modelValue)) {
    if (!props.modelValue.start || !props.modelValue.end) return "";
    return `${formatDate(props.modelValue.start)} \u2014 ${formatDate(props.modelValue.end)}`;
  }
  return formatDate(props.modelValue as CalendarDate);
});

const currentPlaceholder = computed(() =>
  props.range ? props.rangePlaceholder : props.placeholder
);

const sizeClasses = {
  sm: "h-7 px-2.5 text-[10px] rounded",
  md: "h-9 px-2.5 text-xs rounded-md",
  lg: "h-10 px-2.5 text-sm rounded-md",
};

function onCalendarUpdate(value: unknown) {
  emit("update:modelValue", value as DateFieldModel);
}
</script>

<template>
  <UPopover :disabled="disabled">
    <button
      type="button"
      :disabled="disabled"
      :class="[
        'mizu-date-field-trigger',
        sizeClasses[size],
        disabled ? 'mizu-date-field-trigger--disabled' : '',
      ]"
    >
      <span
        v-if="display"
        class="mizu-date-field-trigger__value"
      >{{ display }}</span>
      <span
        v-else
        class="mizu-date-field-trigger__placeholder"
      >{{ currentPlaceholder }}</span>
      <span class="mizu-date-field-trigger__icon i-lucide-calendar" aria-hidden="true" />
    </button>

    <template #content>
      <UCalendar
        :model-value="modelValue"
        :range="range"
        @update:model-value="onCalendarUpdate"
      />
    </template>
  </UPopover>
</template>

<style>
@reference "../index.css";

.mizu-date-field-trigger {
  @apply inline-flex items-center gap-2 cursor-pointer select-none;
  @apply ring ring-inset ring-(--ui-border-accented);
  @apply bg-(--ui-bg) text-left;
  @apply outline-none transition-colors;
  @apply hover:bg-(--ui-bg-elevated);
  @apply focus-visible:outline-2 focus-visible:outline-(--ui-ring-color) focus-visible:-outline-offset-1;
  font-family: inherit;
  width: 100%;
  max-width: 320px;
}

.mizu-date-field-trigger--disabled {
  @apply opacity-50 cursor-not-allowed;
  @apply hover:bg-(--ui-bg);
}

.mizu-date-field-trigger__value {
  @apply flex-1 truncate;
  color: var(--color-foreground-primary);
}

.mizu-date-field-trigger__placeholder {
  @apply flex-1 truncate;
  color: var(--color-foreground-tertiary);
}

.mizu-date-field-trigger__icon {
  @apply size-4 shrink-0;
  color: var(--color-foreground-tertiary);
}
</style>
