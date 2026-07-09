<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";
import { Time, type TimeValue } from "@internationalized/date";

interface TimeRange {
  start: TimeValue;
  end: TimeValue;
}

const singleTime = ref(new Time(14, 30));
const timeRange = ref<TimeRange>({
  start: new Time(9, 0),
  end: new Time(17, 0),
});

const basicCode = `<UInputTime
  v-model="time"
  placeholder="Select a time"
/>`;

const rangeCode = `<UInputTime
  v-model="range"
  range
  placeholder="Select a time range"
/>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic time picker</h3>
      <CodeCollapsible :code="basicCode">
        <div class="demo-col">
          <UInputTime
            v-model="singleTime"
            placeholder="Select a time"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Time range</h3>
      <CodeCollapsible :code="rangeCode">
        <div class="demo-col">
          <UInputTime
            v-model="timeRange"
            range
            placeholder="Select a time range"
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
