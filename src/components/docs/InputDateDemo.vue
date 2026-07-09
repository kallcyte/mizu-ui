<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";
import { CalendarDate, type DateValue } from "@internationalized/date";

interface DateRange {
  start: DateValue;
  end: DateValue;
}

const singleDate = ref(new CalendarDate(2026, 7, 9));
const dateRange = ref<DateRange>({
  start: new CalendarDate(2026, 7, 1),
  end: new CalendarDate(2026, 7, 15),
});

const basicCode = `<UInputDate
  v-model="date"
  placeholder="Select a date"
/>`;

const rangeCode = `<UInputDate
  v-model="range"
  range
  placeholder="Select a date range"
/>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic date picker</h3>
      <CodeCollapsible :code="basicCode">
        <div class="demo-col">
          <UInputDate
            v-model="singleDate"
            placeholder="Select a date"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Date range</h3>
      <CodeCollapsible :code="rangeCode">
        <div class="demo-col">
          <UInputDate
            v-model="dateRange"
            range
            placeholder="Select a date range"
          />
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
  width: max-content;
  gap: 8px;
  max-width: 320px;
}
</style>
