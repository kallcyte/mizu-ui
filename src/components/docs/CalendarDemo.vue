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
      <p class="demo-description">Standard single-date calendar for selecting a specific day.</p>
      <CodeCollapsible :code="`<UCalendar v-model=&quot;value&quot; />`">
        <div class="demo-row">
          <UCalendar v-model="singleValue" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Month Picker</h3>
      <p class="demo-description">Month-only selection view using <code>type="month"</code>.</p>
      <CodeCollapsible :code="`<UCalendar type=&quot;month&quot; v-model=&quot;value&quot; />`">
        <div class="demo-row">
          <UCalendar type="month" v-model="monthValue" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Year Picker</h3>
      <p class="demo-description">Year-only selection view using <code>type="year"</code>.</p>
      <CodeCollapsible :code="`<UCalendar type=&quot;year&quot; v-model=&quot;value&quot; />`">
        <div class="demo-row">
          <UCalendar type="year" v-model="yearValue" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Range</h3>
      <p class="demo-description">Select a date range by setting the <code>range</code> prop.</p>
      <CodeCollapsible :code="`<UCalendar range v-model=&quot;value&quot; />`">
        <div class="demo-row">
          <UCalendar range v-model="rangeValue" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple</h3>
      <p class="demo-description">Select multiple individual dates using the <code>multiple</code> prop.</p>
      <CodeCollapsible :code="`<UCalendar multiple v-model=&quot;value&quot; />`">
        <div class="demo-row">
          <UCalendar multiple v-model="multipleValue" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color &amp; Variant</h3>
      <p class="demo-description">Customize the appearance with color and variant props.</p>
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
      <p class="demo-description">Display multiple months side by side using <code>:number-of-months</code>.</p>
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
