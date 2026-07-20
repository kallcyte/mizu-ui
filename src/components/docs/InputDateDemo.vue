<script setup lang="ts">
import { shallowRef, ref, computed } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";
import { CalendarDate, type DateValue } from "@internationalized/date";

interface DateRange {
  start: DateValue;
  end: DateValue;
}

const singleDate = shallowRef(new CalendarDate(2026, 7, 9));
const defaultDate = shallowRef(new CalendarDate(2026, 7, 15));
const dateRange = shallowRef<DateRange>({
  start: new CalendarDate(2026, 7, 1),
  end: new CalendarDate(2026, 7, 15),
});
const pickerDate = shallowRef(new CalendarDate(2026, 7, 9));
const pickerRange = shallowRef<DateRange>({
  start: new CalendarDate(2026, 7, 1),
  end: new CalendarDate(2026, 7, 15),
});
const unavailableDate = shallowRef(new CalendarDate(2026, 7, 9));
const minMaxDate = shallowRef(new CalendarDate(2026, 7, 9));
const minValue = new CalendarDate(2026, 7, 1);
const maxValue = new CalendarDate(2026, 7, 31);
// Interactive locale switcher
const currentLocale = ref("en-ID");
const localeDemoDate = shallowRef(new CalendarDate(2026, 7, 9));

const localeOptions = [
  { label: "en-ID — DD/MM/YYYY", value: "en-ID" },
  { label: "en-US — MM/DD/YYYY", value: "en-US" },
  { label: "en-GB — DD/MM/YYYY", value: "en-GB" },
  { label: "de-DE — DD.MM.YYYY", value: "de-DE" },
  { label: "ja-JP — YYYY/MM/DD", value: "ja-JP" },
  { label: "fr-FR — DD/MM/YYYY", value: "fr-FR" },
  { label: "zh-CN — YYYY/MM/DD", value: "zh-CN" },
  { label: "ko-KR — YYYY. MM. DD", value: "ko-KR" },
  { label: "ar-SA — DD/MM/YYYY", value: "ar-SA" },
];

const localeDemoCode = computed(
  () => `<UInputDate
  v-model="date"
  locale="${currentLocale.value}"
/>`
);

function isWeekend(date: DateValue) {
  return date.dayOfWeek === 6 || date.dayOfWeek === 0;
}

const basicCode = `<UInputDate
  v-model="date"
/>`;
const defaultValueCode = `<UInputDate
  :default-value="defaultDate"
/>`;
const rangeCode = `<UInputDate
  v-model="range"
  range
/>`;
const disabledCode = `<UInputDate
  disabled
/>`;
const colorCode = `<UInputDate color="primary" />
<UInputDate color="secondary" />
<UInputDate color="success" />
<UInputDate color="info" />
<UInputDate color="warning" />
<UInputDate color="error" />
<UInputDate color="neutral" />`;
const variantCode = `<UInputDate variant="outline" />
<UInputDate variant="soft" />
<UInputDate variant="subtle" />
<UInputDate variant="ghost" />
<UInputDate variant="none" />`;
const sizeCode = `<UInputDate size="xs" />
<UInputDate size="sm" />
<UInputDate size="md" />
<UInputDate size="lg" />
<UInputDate size="xl" />`;
const iconCode = `<UInputDate
  icon="i-lucide-calendar"
/>`;
const separatorCode = `<UInputDate
  range
  separator-icon="i-lucide-arrow-right"
/>`;
const unavailableCode = `<UInputDate
  v-model="date"
  :is-date-unavailable="isWeekend"
/>`;
const minMaxCode = `<UInputDate
  v-model="date"
  :min-value="minValue"
  :max-value="maxValue"
/>`;
const datePickerCode = `<UPopover>
  <UInputDate v-model="date" />
  <template #content>
    <UCalendar v-model="date" />
  </template>
</UPopover>`;
const dateRangePickerCode = `<UPopover>
  <UInputDate v-model="range" range />
  <template #content>
    <UCalendar v-model="range" range />
  </template>
</UPopover>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section example-section--locale">
      <h3>Locale</h3>
      <p class="demo-description">Switch between locales to see how the <code>locale</code> prop changes date format rendering (DD/MM/YYYY, MM/DD/YYYY, etc.) in real time.</p>
      <p class="locale-hint">Switch the locale to see how the date format changes in real time.</p>
      <CodeCollapsible :code="localeDemoCode">
        <div class="locale-controls">
          <USelectMenu
            v-model="currentLocale"
            :items="localeOptions"
            value-key="value"
            label-key="label"
            placeholder="Select locale"
            size="sm"
            class="locale-select"
          />
          <UInputDate v-model="localeDemoDate" :locale="currentLocale" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Two-way date input with <code>v-model</code> binding using <code>CalendarDate</code> from <code>@internationalized/date</code>.</p>
      <CodeCollapsible :code="basicCode">
        <div class="demo-col">
          <UInputDate v-model="singleDate" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Default value (uncontrolled)</h3>
      <p class="demo-description">Set an initial date via the <code>:default-value</code> prop without two-way binding for uncontrolled usage.</p>
      <CodeCollapsible :code="defaultValueCode">
        <div class="demo-col">
          <UInputDate :default-value="defaultDate" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Range</h3>
      <p class="demo-description">Enable date range selection with the <code>range</code> prop, accepting a start and end date object via <code>v-model</code>.</p>
      <CodeCollapsible :code="rangeCode">
        <div class="demo-col">
          <UInputDate v-model="dateRange" range />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Prevents user interaction using the <code>disabled</code> prop, graying out the input and blocking the calendar popup.</p>
      <CodeCollapsible :code="disabledCode">
        <div class="demo-col">
          <UInputDate disabled />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Seven semantic color variants: primary, secondary, success, info, warning, error, and neutral via the <code>color</code> prop.</p>
      <CodeCollapsible :code="colorCode">
        <div class="demo-row demo-row--wrap">
          <UInputDate color="primary" />
          <UInputDate color="secondary" />
          <UInputDate color="success" />
          <UInputDate color="info" />
          <UInputDate color="warning" />
          <UInputDate color="error" />
          <UInputDate color="neutral" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variant</h3>
      <p class="demo-description">Five visual styles via the <code>variant</code> prop: outline (default), soft, subtle, ghost, and none.</p>
      <CodeCollapsible :code="variantCode">
        <div class="demo-row demo-row--wrap">
          <UInputDate variant="outline" />
          <UInputDate variant="soft" />
          <UInputDate variant="subtle" />
          <UInputDate variant="ghost" />
          <UInputDate variant="none" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Size</h3>
      <p class="demo-description">Five size options from extra-small to extra-large: xs, sm, md, lg, and xl via the <code>size</code> prop.</p>
      <CodeCollapsible :code="sizeCode">
        <div class="demo-row demo-row--wrap">
          <UInputDate size="xs" />
          <UInputDate size="sm" />
          <UInputDate size="md" />
          <UInputDate size="lg" />
          <UInputDate size="xl" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <p class="demo-description">Add a leading calendar icon with the <code>icon</code> prop to provide a visual affordance for date input.</p>
      <CodeCollapsible :code="iconCode">
        <div class="demo-col">
          <UInputDate icon="i-lucide-calendar" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Separator Icon</h3>
      <p class="demo-description">Customize the separator between range dates using the <code>separator-icon</code> prop, defaulting to an arrow.</p>
      <CodeCollapsible :code="separatorCode">
        <div class="demo-col">
          <UInputDate range separator-icon="i-lucide-arrow-right" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Unavailable dates (weekends blocked)</h3>
      <p class="demo-description">Block specific dates from selection using the <code>:is-date-unavailable</code> callback prop, such as disabling weekends.</p>
      <CodeCollapsible :code="unavailableCode">
        <div class="demo-col">
          <UInputDate v-model="unavailableDate" :is-date-unavailable="isWeekend" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Min / max dates</h3>
      <p class="demo-description">Constrain the selectable date range with <code>:min-value</code> and <code>:max-value</code> props to limit the user's date choices.</p>
      <CodeCollapsible :code="minMaxCode">
        <div class="demo-col">
          <UInputDate v-model="minMaxDate" :min-value="minValue" :max-value="maxValue" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Date picker (Popover + Calendar)</h3>
      <p class="demo-description">Combine an <code>UInputDate</code> with a <code>UPopover</code> and <code>UCalendar</code> to create a full-featured date picker with a popup calendar.</p>
      <CodeCollapsible :code="datePickerCode">
        <div class="demo-col">
          <UPopover>
            <UInputDate v-model="pickerDate" />
            <template #content>
              <UCalendar v-model="pickerDate" />
            </template>
          </UPopover>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Date range picker (Popover + Calendar)</h3>
      <p class="demo-description">Pair a range-mode <code>UInputDate</code> with a <code>UPopover</code> and range <code>UCalendar</code> for start-to-end date range picking.</p>
      <CodeCollapsible :code="dateRangePickerCode">
        <div class="demo-col">
          <UPopover>
            <UInputDate v-model="pickerRange" range />
            <template #content>
              <UCalendar v-model="pickerRange" range />
            </template>
          </UPopover>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.demo-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.example-section {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.example-section h3 {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}
.demo-description {
  font-size: 13px;
  color: var(--sl-color-text-light);
  margin: 0;
  line-height: 1.5;
}
.demo-description code {
  font-size: 12px;
  background: var(--color-surface-muted, #F3F4F6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  max-width: 320px;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.demo-row--wrap {
  flex-wrap: wrap;
}

/* Locale switcher */
.example-section--locale {
  gap: 8px;
}
.locale-hint {
  all: revert;
  font-size: 12px;
  color: var(--color-foreground-secondary, #6b7280);
  margin: 0;
  line-height: 1.4;
}
.locale-controls {
  all: revert;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.locale-select {
  min-width: 220px;
}
</style>
