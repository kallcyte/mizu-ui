<script setup lang="ts">
import { shallowRef, ref, computed } from "vue";
import { CalendarDate } from "@internationalized/date";
import { MizuDateField, type DateRange } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const date = shallowRef(new CalendarDate(2026, 7, 17));
const customDate = shallowRef(new CalendarDate(2026, 7, 17));
const currentStyle = ref<"short" | "medium" | "long" | "full" | "compact">("compact");

const rangeDate = shallowRef<DateRange>({
  start: new CalendarDate(2026, 7, 10),
  end: new CalendarDate(2026, 7, 24),
});

const yieldSingle = computed(() => date.value?.toString() ?? "—");
const yieldRange = computed(() =>
  rangeDate.value ? `${rangeDate.value.start} \u2014 ${rangeDate.value.end}` : "\u2014"
);
const yieldCustom = computed(() => customDate.value?.toString() ?? "\u2014");

const basicCode = `<MizuDateField
  v-model="date"
  date-style="compact"
/>`;

const allStylesCode = `<template>
  <MizuDateField v-model="date" date-style="short" />
  <MizuDateField v-model="date" date-style="medium" />
  <MizuDateField v-model="date" date-style="long" />
  <MizuDateField v-model="date" date-style="full" />
  <MizuDateField v-model="date" date-style="compact" />
</template>`;

const customFormatCode = `<MizuDateField
  v-model="date"
  :format="{
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }"
/>`;

const localeCode = `<MizuDateField
  v-model="date"
  date-style="full"
  locale="de-DE"
/>`;

const pickerCode = `<MizuDateField
  v-model="date"
  :date-style="style"
/>`;

const rangeCode = `<MizuDateField
  v-model="range"
  range
  date-style="compact"
/>`;

const styleOptions = [
  { label: "short \u2014 17/07/2026", value: "short" },
  { label: "medium \u2014 17 Jul 2026", value: "medium" },
  { label: "long \u2014 17 July 2026", value: "long" },
  { label: "full \u2014 Friday, 17 July 2026", value: "full" },
  { label: "compact \u2014 Fri, 17 Jul 2026", value: "compact" },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <div class="demo-col">
          <MizuDateField v-model="date" date-style="compact" />
          <span class="yield">modelValue: {{ yieldSingle }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Date style presets</h3>
      <CodeCollapsible :code="allStylesCode">
        <div class="demo-col">
          <div class="demo-row"><MizuDateField v-model="date" date-style="short" /><span class="yield">modelValue: {{ yieldSingle }}</span></div>
          <div class="demo-row"><MizuDateField v-model="date" date-style="medium" /><span class="yield">modelValue: {{ yieldSingle }}</span></div>
          <div class="demo-row"><MizuDateField v-model="date" date-style="long" /><span class="yield">modelValue: {{ yieldSingle }}</span></div>
          <div class="demo-row"><MizuDateField v-model="date" date-style="full" /><span class="yield">modelValue: {{ yieldSingle }}</span></div>
          <div class="demo-row"><MizuDateField v-model="date" date-style="compact" /><span class="yield">modelValue: {{ yieldSingle }}</span></div>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Interactive style picker</h3>
      <CodeCollapsible :code="pickerCode">
        <div class="demo-col">
          <div class="demo-row">
            <MizuDateField
              v-model="customDate"
              :date-style="currentStyle"
            />
            <USelectMenu
              v-model="currentStyle"
              :items="styleOptions"
              value-key="value"
              label-key="label"
              size="sm"
            />
          </div>
          <span class="yield">modelValue: {{ yieldCustom }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Date range</h3>
      <CodeCollapsible :code="rangeCode">
        <div class="demo-col">
          <MizuDateField v-model="rangeDate" range date-style="compact" />
          <span class="yield">modelValue: {{ yieldRange }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom format</h3>
      <CodeCollapsible :code="customFormatCode">
        <div class="demo-col">
          <MizuDateField
            v-model="customDate"
            :format="{ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }"
          />
          <span class="yield">modelValue: {{ yieldCustom }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Locale</h3>
      <CodeCollapsible :code="localeCode">
        <div class="demo-col">
          <MizuDateField v-model="customDate" date-style="full" locale="de-DE" />
          <span class="yield">modelValue: {{ yieldCustom }}</span>
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  gap: 8px;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.yield {
  font-size: 12px;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  color: var(--color-foreground-secondary);
  background: var(--color-surface-muted);
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
}
</style>
