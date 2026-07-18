<script setup lang="ts">
import { shallowRef } from "vue";
import { CalendarDate } from "@internationalized/date";
import MizuDateField from "../components/MizuDateField.vue";
import type { DateRange } from "../components/MizuDateField.vue";

const single = shallowRef(new CalendarDate(2026, 7, 17));
const range = shallowRef<DateRange>({
  start: new CalendarDate(2026, 7, 10),
  end: new CalendarDate(2026, 7, 24),
});
</script>

<template>
  <Story title="MizuDateField" :layout="{ type: 'single', width: 400 }">
    <Variant title="Date styles">
      <div class="flex flex-col gap-3">
        <MizuDateField :model-value="single" date-style="short" />
        <MizuDateField :model-value="single" date-style="medium" />
        <MizuDateField :model-value="single" date-style="long" />
        <MizuDateField :model-value="single" date-style="full" />
        <MizuDateField :model-value="single" date-style="compact" />
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="flex flex-col gap-3">
        <MizuDateField :model-value="single" date-style="compact" size="sm" />
        <MizuDateField :model-value="single" date-style="compact" size="md" />
        <MizuDateField :model-value="single" date-style="compact" size="lg" />
      </div>
    </Variant>

    <Variant title="States">
      <div class="flex flex-col gap-3">
        <MizuDateField :model-value="single" date-style="compact" />
        <MizuDateField date-style="compact" />
        <MizuDateField :model-value="single" date-style="compact" disabled />
      </div>
    </Variant>

    <Variant title="Range">
      <MizuDateField :model-value="range" range date-style="compact" />
    </Variant>
  </Story>
</template>
