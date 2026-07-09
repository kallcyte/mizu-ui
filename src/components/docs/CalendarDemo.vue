<script setup lang="ts">
import { shallowRef } from "vue";
import { CalendarDate } from "@internationalized/date";
import CodeCollapsible from "./CodeCollapsible.vue";

const singleValue = shallowRef(new CalendarDate(2022, 2, 3));
const monthValue = shallowRef(new CalendarDate(2022, 2, 1));
const yearValue = shallowRef(new CalendarDate(2022, 1, 1));
const rangeValue = shallowRef({ start: new CalendarDate(2022, 2, 3), end: new CalendarDate(2022, 2, 20) });
const multipleValue = shallowRef([new CalendarDate(2022, 2, 4), new CalendarDate(2022, 2, 6), new CalendarDate(2022, 2, 8)]);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Date Picker</h3>
      <CodeCollapsible :code="`<UCalendar v-model=&quot;value&quot; />`">
        <div class="demo-row">
          <UCalendar v-model="singleValue" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Month Picker</h3>
      <CodeCollapsible :code="`<UCalendar type=&quot;month&quot; v-model=&quot;value&quot; />`">
        <div class="demo-row">
          <UCalendar type="month" v-model="monthValue" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Year Picker</h3>
      <CodeCollapsible :code="`<UCalendar type=&quot;year&quot; v-model=&quot;value&quot; />`">
        <div class="demo-row">
          <UCalendar type="year" v-model="yearValue" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Range</h3>
      <CodeCollapsible :code="`<UCalendar range v-model=&quot;value&quot; />`">
        <div class="demo-row">
          <UCalendar range v-model="rangeValue" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple</h3>
      <CodeCollapsible :code="`<UCalendar multiple v-model=&quot;value&quot; />`">
        <div class="demo-row">
          <UCalendar multiple v-model="multipleValue" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color &amp; Variant</h3>
      <CodeCollapsible :code="`<UCalendar color=&quot;neutral&quot; variant=&quot;outline&quot; />
<UCalendar color=&quot;primary&quot; variant=&quot;soft&quot; />`">
        <div class="demo-row demo-row--wrap">
          <UCalendar color="neutral" variant="outline" />
          <UCalendar color="primary" variant="soft" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Number of Months</h3>
      <CodeCollapsible :code="`<UCalendar :number-of-months=&quot;3&quot; />`">
        <div class="demo-row">
          <UCalendar :number-of-months="3" />
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
.demo-row {
  all: revert;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.demo-row--wrap {
  flex-wrap: wrap;
}
</style>
