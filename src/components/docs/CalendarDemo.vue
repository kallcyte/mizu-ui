<script setup lang="ts">
import { ref, shallowRef, computed } from "vue";
import {
  CalendarDate,
  DateFormatter,
  HebrewCalendar,
  getLocalTimeZone,
  today,
  type DateValue,
} from "@internationalized/date";
import CodeCollapsible from "./CodeCollapsible.vue";

const tz = getLocalTimeZone();
const df = new DateFormatter("en-US", { dateStyle: "medium" });

const singleValue = shallowRef(new CalendarDate(2022, 2, 3));
const defaultValue = shallowRef(new CalendarDate(2022, 2, 6));
const monthValue = shallowRef(new CalendarDate(2022, 2, 1));
const yearValue = shallowRef(new CalendarDate(2022, 1, 1));
const rangeValue = shallowRef({
  start: new CalendarDate(2022, 2, 3),
  end: new CalendarDate(2022, 2, 20),
});
const multipleValue = shallowRef([
  new CalendarDate(2022, 2, 4),
  new CalendarDate(2022, 2, 6),
  new CalendarDate(2022, 2, 8),
]);
const controlledDate = shallowRef(new CalendarDate(2025, 4, 2));
const todayValue = shallowRef(today(tz));
const hebrewValue = shallowRef(new CalendarDate(new HebrewCalendar(), 5781, 1, 1));
const minMaxValue = shallowRef(new CalendarDate(2023, 9, 10));
const minDate = new CalendarDate(2023, 9, 1);
const maxDate = new CalendarDate(2023, 9, 30);
const disabledRangeValue = shallowRef({
  start: new CalendarDate(2022, 1, 1),
  end: new CalendarDate(2022, 1, 9),
});
const unavailableRangeValue = shallowRef({
  start: new CalendarDate(2022, 1, 1),
  end: new CalendarDate(2022, 1, 9),
});

const chipValue = shallowRef(new CalendarDate(2022, 1, 10));
function getColorByDate(date: Date) {
  const isWeekend = date.getDay() % 6 === 0;
  const isDayMeeting = date.getDay() % 3 === 0;
  if (isWeekend) return undefined;
  if (isDayMeeting) return "error";
  return "success";
}

const isDateDisabled = (date: DateValue) => date.day >= 10 && date.day <= 16;
const isDateUnavailable = (date: DateValue) => date.day >= 10 && date.day <= 16;

const pickerValue = shallowRef(new CalendarDate(2022, 1, 10));
const formattedPicker = computed(() =>
  pickerValue.value ? df.format(pickerValue.value.toDate(tz)) : "Select a date",
);

const rangePickerValue = shallowRef({
  start: today(tz).subtract({ days: 14 }),
  end: today(tz),
});
const rangePresets = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 14 days", days: 14 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 3 months", months: 3 },
  { label: "Last 6 months", months: 6 },
  { label: "Last year", years: 1 },
];
const formattedRange = computed(() => {
  const { start, end } = rangePickerValue.value;
  if (!start) return "Pick a date";
  if (!end) return df.format(start.toDate(tz));
  return `${df.format(start.toDate(tz))} - ${df.format(end.toDate(tz))}`;
});
function computePresetStart(preset: (typeof rangePresets)[number]) {
  const end = today(tz);
  return {
    start: end.subtract({ days: preset.days, months: preset.months, years: preset.years }) as DateValue,
    end,
  };
}
function isPresetSelected(preset: (typeof rangePresets)[number]) {
  if (!rangePickerValue.value?.start || !rangePickerValue.value?.end) return false;
  const { start, end } = computePresetStart(preset);
  return (
    rangePickerValue.value.start.compare(start) === 0 &&
    rangePickerValue.value.end.compare(end) === 0
  );
}
function selectPreset(preset: (typeof rangePresets)[number]) {
  rangePickerValue.value = computePresetStart(preset) as typeof rangePickerValue.value;
}

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
const selectedColor = ref<string>("primary");
const variants = ["solid", "outline", "soft", "subtle"] as const;
const selectedVariant = ref<"solid" | "outline" | "soft" | "subtle">("solid");
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const selectedSize = ref<"xs" | "sm" | "md" | "lg" | "xl">("md");
const disabled = ref(false);
const readonly = ref(false);
const monthControls = ref(true);
const yearControls = ref(true);
const viewControl = ref(true);
const fixedWeeks = ref(false);
const weekNumbers = ref(false);
const numberOfMonths = ref(1);
const weekStartsOn = ref<0 | 1 | 2 | 3 | 4 | 5 | 6>(0);
const weekdayFormat = ref<"narrow" | "short" | "long">("short");
</script>

<template>
  <UApp>
    <div class="not-content demo-isolated demo-examples">
      <!-- Date picker -->
      <section class="example-section">
        <h3>Date Picker</h3>
        <p class="demo-description">Standard single-date calendar for selecting a specific day.</p>
        <CodeCollapsible :code="`<UCalendar v-model=&quot;value&quot; />`">
          <div class="demo-row">
            <UCalendar v-model="singleValue" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Default value -->
      <section class="example-section">
        <h3>Default Value</h3>
        <p class="demo-description">Use <code>default-value</code> for an uncontrolled initial value.</p>
        <CodeCollapsible :code="`<UCalendar :default-value=&quot;value&quot; />`">
          <div class="demo-row">
            <UCalendar :default-value="defaultValue" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Month Picker -->
      <section class="example-section">
        <h3>Month Picker</h3>
        <p class="demo-description">Month-only selection view using <code>type="month"</code>.</p>
        <CodeCollapsible :code="`<UCalendar type=&quot;month&quot; v-model=&quot;value&quot; />`">
          <div class="demo-row">
            <UCalendar type="month" v-model="monthValue" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Year Picker -->
      <section class="example-section">
        <h3>Year Picker</h3>
        <p class="demo-description">Year-only selection view using <code>type="year"</code>.</p>
        <CodeCollapsible :code="`<UCalendar type=&quot;year&quot; v-model=&quot;value&quot; />`">
          <div class="demo-row">
            <UCalendar type="year" v-model="yearValue" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Range -->
      <section class="example-section">
        <h3>Range</h3>
        <p class="demo-description">Select a date range by setting the <code>range</code> prop.</p>
        <CodeCollapsible :code="`<UCalendar range v-model=&quot;value&quot; />`">
          <div class="demo-row">
            <UCalendar range v-model="rangeValue" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Range with month type -->
      <section class="example-section">
        <h3>Range with Month</h3>
        <p class="demo-description">The <code>range</code> prop also works with <code>type="month"</code> for selecting a range of months.</p>
        <CodeCollapsible :code="`<UCalendar type=&quot;month&quot; range v-model=&quot;value&quot; />`">
          <div class="demo-row">
            <UCalendar type="month" range v-model="rangeValue" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Multiple -->
      <section class="example-section">
        <h3>Multiple</h3>
        <p class="demo-description">Select multiple individual dates using the <code>multiple</code> prop.</p>
        <CodeCollapsible :code="`<UCalendar multiple v-model=&quot;value&quot; />`">
          <div class="demo-row">
            <UCalendar multiple v-model="multipleValue" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Number of Months -->
      <section class="example-section">
        <h3>Number of Months</h3>
        <p class="demo-description">Display multiple months side by side using <code>:number-of-months</code>.</p>
        <CodeCollapsible :code="`<UCalendar :number-of-months=&quot;${numberOfMonths}&quot; />`">
          <div class="demo-row">
            <div class="demo-col">
              <div class="chip-row">
                <UButton
                  v-for="n in [1, 2, 3]"
                  :key="n"
                  :label="String(n)"
                  :variant="numberOfMonths === n ? 'soft' : 'outline'"
                  size="sm"
                  @click="numberOfMonths = n"
                />
              </div>
              <UCalendar :number-of-months="numberOfMonths" />
            </div>
          </div>
        </CodeCollapsible>
      </section>

      <!-- Color -->
      <section class="example-section">
        <h3>Color</h3>
        <p class="demo-description">Change the accent color of the selected dates.</p>
        <CodeCollapsible :code="`<UCalendar color=&quot;${selectedColor}&quot; />`">
          <div class="demo-row">
            <div class="demo-col">
              <div class="chip-row">
                <UButton
                  v-for="c in colors"
                  :key="c"
                  :label="c"
                  :color="c"
                  :variant="selectedColor === c ? 'soft' : 'outline'"
                  size="sm"
                  @click="selectedColor = c"
                />
              </div>
              <UCalendar :color="selectedColor" />
            </div>
          </div>
        </CodeCollapsible>
      </section>

      <!-- Variant -->
      <section class="example-section">
        <h3>Variant</h3>
        <p class="demo-description">Compare the four visual variants for selected dates.</p>
        <CodeCollapsible :code="`<UCalendar variant=&quot;${selectedVariant}&quot; />`">
          <div class="demo-row">
            <div class="demo-col">
              <div class="chip-row">
                <UButton
                  v-for="v in variants"
                  :key="v"
                  :label="v"
                  :variant="selectedVariant === v ? 'soft' : 'outline'"
                  size="sm"
                  @click="selectedVariant = v"
                />
              </div>
              <UCalendar :variant="selectedVariant" />
            </div>
          </div>
        </CodeCollapsible>
      </section>

      <!-- Size -->
      <section class="example-section">
        <h3>Size</h3>
        <p class="demo-description">Calendar rendering size from <code>xs</code> to <code>xl</code>.</p>
        <CodeCollapsible :code="`<UCalendar size=&quot;${selectedSize}&quot; />`">
          <div class="demo-row">
            <div class="demo-col">
              <div class="chip-row">
                <UButton
                  v-for="s in sizes"
                  :key="s"
                  :label="s"
                  :variant="selectedSize === s ? 'soft' : 'outline'"
                  size="sm"
                  @click="selectedSize = s"
                />
              </div>
              <UCalendar :size="selectedSize" />
            </div>
          </div>
        </CodeCollapsible>
      </section>

      <!-- Month Controls -->
      <section class="example-section">
        <h3>Month Controls</h3>
        <p class="demo-description">Toggle the previous/next month buttons.</p>
        <CodeCollapsible :code="`<UCalendar :month-controls=&quot;${monthControls}&quot; />`">
          <div class="demo-col">
            <div class="chip-row">
              <UButton
                label="month-controls"
                :variant="monthControls ? 'soft' : 'outline'"
                size="sm"
                @click="monthControls = !monthControls"
              />
            </div>
            <UCalendar :month-controls="monthControls" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Year Controls -->
      <section class="example-section">
        <h3>Year Controls</h3>
        <p class="demo-description">Toggle the previous/next year buttons.</p>
        <CodeCollapsible :code="`<UCalendar :year-controls=&quot;${yearControls}&quot; />`">
          <div class="demo-col">
            <div class="chip-row">
              <UButton
                label="year-controls"
                :variant="yearControls ? 'soft' : 'outline'"
                size="sm"
                @click="yearControls = !yearControls"
              />
            </div>
            <UCalendar :year-controls="yearControls" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- View Control -->
      <section class="example-section">
        <h3>View Control</h3>
        <p class="demo-description">When <code>type="date"</code>, the heading toggles between day/month/year views. Disable to keep the day view only.</p>
        <CodeCollapsible :code="`<UCalendar :view-control=&quot;${viewControl}&quot; />`">
          <div class="demo-col">
            <div class="chip-row">
              <UButton
                label="view-control"
                :variant="viewControl ? 'soft' : 'outline'"
                size="sm"
                @click="viewControl = !viewControl"
              />
            </div>
            <UCalendar :view-control="viewControl" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Fixed Weeks -->
      <section class="example-section">
        <h3>Fixed Weeks</h3>
        <p class="demo-description">Always render 6 weeks in the grid.</p>
        <CodeCollapsible :code="`<UCalendar :fixed-weeks=&quot;${fixedWeeks}&quot; />`">
          <div class="demo-col">
            <div class="chip-row">
              <UButton
                label="fixed-weeks"
                :variant="fixedWeeks ? 'soft' : 'outline'"
                size="sm"
                @click="fixedWeeks = !fixedWeeks"
              />
            </div>
            <UCalendar :fixed-weeks="fixedWeeks" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Week Numbers -->
      <section class="example-section">
        <h3>Week Numbers</h3>
        <p class="demo-description">Display ISO week numbers in an extra column.</p>
        <CodeCollapsible :code="`<UCalendar ${weekNumbers ? 'week-numbers ' : ''}:fixed-weeks=&quot;true&quot; />`">
          <div class="demo-col">
            <div class="chip-row">
              <UButton
                label="week-numbers"
                :variant="weekNumbers ? 'soft' : 'outline'"
                size="sm"
                @click="weekNumbers = !weekNumbers"
              />
            </div>
            <UCalendar :week-numbers="weekNumbers" :fixed-weeks="true" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Week Starts On -->
      <section class="example-section">
        <h3>Week Starts On</h3>
        <p class="demo-description">Choose which day the week starts on (0 = Sunday).</p>
        <CodeCollapsible :code="`<UCalendar :week-starts-on=&quot;${weekStartsOn}&quot; />`">
          <div class="demo-col">
            <div class="chip-row">
              <UButton
                v-for="d in [0, 1, 6] as const"
                :key="d"
                :label="['Sun', 'Mon', 'Sat'][d === 0 ? 0 : d === 1 ? 1 : 2]"
                :variant="weekStartsOn === d ? 'soft' : 'outline'"
                size="sm"
                @click="weekStartsOn = d"
              />
            </div>
            <UCalendar :week-starts-on="weekStartsOn" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Weekday Format -->
      <section class="example-section">
        <h3>Weekday Format</h3>
        <p class="demo-description">Format weekday labels as <code>narrow</code>, <code>short</code>, or <code>long</code>.</p>
        <CodeCollapsible :code="`<UCalendar :weekday-format=&quot;${weekdayFormat}&quot; />`">
          <div class="demo-col">
            <div class="chip-row">
              <UButton
                v-for="f in (['narrow', 'short', 'long'] as const)"
                :key="f"
                :label="f"
                :variant="weekdayFormat === f ? 'soft' : 'outline'"
                size="sm"
                @click="weekdayFormat = f"
              />
            </div>
            <UCalendar :weekday-format="weekdayFormat" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Disabled -->
      <section class="example-section">
        <h3>Disabled</h3>
        <p class="demo-description">Disable the entire calendar to prevent user interaction.</p>
        <CodeCollapsible :code="`<UCalendar ${disabled ? 'disabled' : ''} />`">
          <div class="demo-col">
            <div class="chip-row">
              <UButton
                label="disabled"
                :variant="disabled ? 'soft' : 'outline'"
                size="sm"
                @click="disabled = !disabled"
              />
            </div>
            <UCalendar :disabled="disabled" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Readonly -->
      <section class="example-section">
        <h3>Readonly</h3>
        <p class="demo-description">Render the calendar read-only so values can be inspected but not changed.</p>
        <CodeCollapsible :code="`<UCalendar ${readonly ? 'readonly' : ''} />`">
          <div class="demo-col">
            <div class="chip-row">
              <UButton
                label="readonly"
                :variant="readonly ? 'soft' : 'outline'"
                size="sm"
                @click="readonly = !readonly"
              />
            </div>
            <UCalendar :readonly="readonly" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- With chip events -->
      <section class="example-section">
        <h3>With Chip Events</h3>
        <p class="demo-description">Use the <code>#day</code> slot and <code>UChip</code> to decorate days with event indicators.</p>
        <CodeCollapsible :code="`<UCalendar v-model=&quot;value&quot;>
  <template #day=&quot;{ day }&quot;>
    <UChip :show=&quot;!!getColorByDate(day.toDate('UTC'))&quot; :color=&quot;getColorByDate(day.toDate('UTC'))&quot; size=&quot;2xs&quot;>
      {{ day.day }}
    </UChip>
  </template>
</UCalendar>`">
          <div class="demo-row">
            <UCalendar v-model="chipValue">
              <template #day="{ day }">
                <UChip
                  :show="!!getColorByDate(day.toDate('UTC'))"
                  :color="getColorByDate(day.toDate('UTC'))"
                  size="2xs"
                >
                  {{ day.day }}
                </UChip>
              </template>
            </UCalendar>
          </div>
        </CodeCollapsible>
      </section>

      <!-- With disabled dates -->
      <section class="example-section">
        <h3>With Disabled Dates</h3>
        <p class="demo-description">Use <code>:is-date-disabled</code> with a matcher to disable specific dates.</p>
        <CodeCollapsible :code="`<UCalendar v-model=&quot;value&quot; :is-date-disabled=&quot;isDateDisabled&quot; range />`">
          <div class="demo-row">
            <UCalendar v-model="disabledRangeValue" :is-date-disabled="isDateDisabled" range />
          </div>
        </CodeCollapsible>
      </section>

      <!-- With unavailable dates -->
      <section class="example-section">
        <h3>With Unavailable Dates</h3>
        <p class="demo-description">Use <code>:is-date-unavailable</code> with a matcher to mark dates as unavailable (struck through).</p>
        <CodeCollapsible :code="`<UCalendar v-model=&quot;value&quot; :is-date-unavailable=&quot;isDateUnavailable&quot; range />`">
          <div class="demo-row">
            <UCalendar v-model="unavailableRangeValue" :is-date-unavailable="isDateUnavailable" range />
          </div>
        </CodeCollapsible>
      </section>

      <!-- With min/max -->
      <section class="example-section">
        <h3>With Min/Max</h3>
        <p class="demo-description">Restrict selectable dates with <code>min-value</code> and <code>max-value</code>.</p>
        <CodeCollapsible :code="`<UCalendar v-model=&quot;value&quot; :min-value=&quot;minDate&quot; :max-value=&quot;maxDate&quot; />`">
          <div class="demo-row">
            <UCalendar v-model="minMaxValue" :min-value="minDate" :max-value="maxDate" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- With other calendar systems -->
      <section class="example-section">
        <h3>With Other Calendar Systems</h3>
        <p class="demo-description">Use <code>@internationalized/date</code> calendars like HebrewCalendar to render alternative systems.</p>
        <CodeCollapsible :code="`<UCalendar v-model=&quot;hebrewDate&quot; />`">
          <div class="demo-row">
            <UCalendar v-model="hebrewValue" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- With external controls -->
      <section class="example-section">
        <h3>With External Controls</h3>
        <p class="demo-description">Drive the calendar from external Prev/Next buttons by mutating the <code>v-model</code> value.</p>
        <CodeCollapsible :code="`<UCalendar v-model=&quot;date&quot; :month-controls=&quot;false&quot; :year-controls=&quot;false&quot; />

<template>
  <div class=&quot;flex flex-col gap-4&quot;>
    <UCalendar v-model=&quot;date&quot; :month-controls=&quot;false&quot; :year-controls=&quot;false&quot; />
    <div class=&quot;flex justify-between gap-4&quot;>
      <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; @click=&quot;date = date.subtract({ months: 1 })&quot;>Prev</UButton>
      <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; @click=&quot;date = date.add({ months: 1 })&quot;>Next</UButton>
    </div>
  </div>
</template>`">
          <div class="demo-col">
            <UCalendar v-model="controlledDate" :month-controls="false" :year-controls="false" />
            <div class="flex justify-between gap-4">
              <UButton
                color="neutral"
                variant="outline"
                label="Prev"
                @click="controlledDate = controlledDate.subtract({ months: 1 }) as CalendarDate"
              />
              <UButton
                color="neutral"
                variant="outline"
                label="Next"
                @click="controlledDate = controlledDate.add({ months: 1 }) as CalendarDate"
              />
            </div>
          </div>
        </CodeCollapsible>
      </section>

      <!-- With today's date -->
      <section class="example-section">
        <h3>With Today's Date</h3>
        <p class="demo-description">Use <code>today(getLocalTimeZone())</code> to seed the value to the current date.</p>
        <CodeCollapsible :code="`<UCalendar v-model=&quot;date&quot; />

<template>
  <div class=&quot;flex flex-col gap-4&quot;>
    <UCalendar v-model=&quot;date&quot; />
    <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; class=&quot;justify-center&quot; @click=&quot;date = today(getLocalTimeZone())&quot;>Today</UButton>
  </div>
</template>`">
          <div class="demo-col">
            <UCalendar v-model="todayValue" />
            <UButton
              color="neutral"
              variant="outline"
              label="Today"
              class="justify-center"
              @click="todayValue = today(getLocalTimeZone())"
            />
          </div>
        </CodeCollapsible>
      </section>

      <!-- As a date picker -->
      <section class="example-section">
        <h3>As a Date Picker</h3>
        <p class="demo-description">Compose a <code>UPopover</code> and <code>UButton</code> to build a compact date picker.</p>
        <CodeCollapsible :code="`<UPopover>
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; icon=&quot;i-lucide-calendar&quot;>
    {{ formatted }}
  </UButton>
  <template #content>
    <UCalendar v-model=&quot;value&quot; class=&quot;p-2&quot; />
  </template>
</UPopover>`">
          <div class="demo-row">
            <UPopover>
              <UButton color="neutral" variant="subtle" icon="i-lucide-calendar" :label="formattedPicker" />
              <template #content>
                <UCalendar v-model="pickerValue" class="p-2" />
              </template>
            </UPopover>
          </div>
        </CodeCollapsible>
      </section>

      <!-- As a date range picker -->
      <section class="example-section">
        <h3>As a Date Range Picker</h3>
        <p class="demo-description">Compose a popover with a sidebar of preset ranges and dual-month calendar.</p>
        <CodeCollapsible :code="`<UPopover :content=&quot;{ align: 'center' }&quot;>
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; icon=&quot;i-lucide-calendar&quot;>
    {{ label }}
  </UButton>
  <template #content>
    <div class=&quot;flex items-stretch divide-x divide-(--ui-border)&quot;>
      <div class=&quot;hidden sm:flex flex-col justify-center py-2&quot;>
        <UButton
          v-for=&quot;(range, index) in ranges&quot;
          :key=&quot;index&quot;
          :label=&quot;range.label&quot;
          color=&quot;neutral&quot;
          variant=&quot;ghost&quot;
          class=&quot;rounded-none px-4&quot;
          truncate
          @click=&quot;selectRange(range)&quot;
        />
      </div>
      <UCalendar v-model=&quot;value&quot; class=&quot;p-2&quot; :number-of-months=&quot;2&quot; range />
    </div>
  </template>
</UPopover>`">
          <div class="demo-row">
            <UPopover :content="{ align: 'center' }">
              <UButton color="neutral" variant="subtle" icon="i-lucide-calendar" :label="formattedRange" />
              <template #content>
                <div class="flex items-stretch divide-x divide-(--ui-border)">
                  <div class="hidden sm:flex flex-col justify-center py-2">
                    <UButton
                      v-for="(preset, index) in rangePresets"
                      :key="index"
                      :label="preset.label"
                      color="neutral"
                      variant="ghost"
                      class="rounded-none px-4"
                      :class="[isPresetSelected(preset) ? 'bg-elevated' : 'hover:bg-elevated/50']"
                      truncate
                      @click="selectPreset(preset)"
                    />
                  </div>
                  <UCalendar v-model="rangePickerValue" class="p-2" :number-of-months="2" range />
                </div>
              </template>
            </UPopover>
          </div>
        </CodeCollapsible>
      </section>
    </div>
  </UApp>
</template>

<style scoped>
.demo-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
  overflow: visible;
}
.example-section {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: visible;
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
  flex-wrap: wrap;
  overflow: visible;
}
.demo-row--wrap {
  flex-wrap: wrap;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: visible;
}
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.demo-examples :deep(.code-collapsible),
.demo-examples :deep(.code-collapsible__preview) {
  overflow: visible;
}

/* Range calendar: continuous fill, rounded only on outer edges.
   Architecture notes:
   - Reka UI's RangeCalendarGrid sets role="application" (not "grid"), so we
     use `[data-slot="grid"]` (set by Nuxt UI's Calendar.vue line 232).
   - The grid <tr>s are `display: grid; grid-template-columns: repeat(7, ...)`
     with `place-items: center`, so <td>s shrink to content by default. To
     make them fill their column we force `justify-items: stretch` on the
     row in range mode, then paint each <td> via its cellTrigger child.
   - The selection-start/end attrs only exist on RangeCalendarCellTrigger,
     never on single CalendarCellTrigger — `:has([data-selection-start])`
     on the grid safely gates range-mode styling.
   - For the highlighted hover preview we rely on Reka UI's own
     `data-highlighted:bg-primary/20` (the trigger is already colored); we
     dim it with opacity so the actual selection stands out. */
.demo-examples :deep([data-slot="grid"]:has([data-selection-start]) [data-slot="gridRow"]) {
  /* Override `place-items-center` so <td>s stretch to fill each grid column. */
  justify-items: stretch !important;
  align-items: stretch !important;
}
.demo-examples :deep([data-slot="grid"]:has([data-selection-start]) [data-slot="cell"]) {
  /* Make the <td> the layout cell that fills its grid column. */
  width: 100% !important;
}
/* Selected (and highlighted-preview) triggers: fill the <td> edge-to-edge,
   no inset margin so adjacent selected cells meet seamlessly. */
.demo-examples :deep([data-slot="grid"]:has([data-selection-start]) [data-slot="cellTrigger"][data-selected]),
.demo-examples :deep([data-slot="grid"]:has([data-highlighted-start]) [data-slot="cellTrigger"][data-highlighted]:not([data-selected])) {
  margin-inline: 0 !important;
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
  border-radius: 0 !important;
}
/* Round only the left edge on range start (and highlighted preview start) */
.demo-examples :deep([data-slot="grid"]:has([data-selection-start]) [data-slot="cellTrigger"][data-selection-start]),
.demo-examples :deep([data-slot="grid"]:has([data-highlighted-start]) [data-slot="cellTrigger"][data-highlighted-start]:not([data-selected])) {
  border-top-left-radius: 9999px !important;
  border-bottom-left-radius: 9999px !important;
}
/* Round only the right edge on range end (and highlighted preview end) */
.demo-examples :deep([data-slot="grid"]:has([data-selection-start]) [data-slot="cellTrigger"][data-selection-end]),
.demo-examples :deep([data-slot="grid"]:has([data-highlighted-start]) [data-slot="cellTrigger"][data-highlighted-end]:not([data-selected])) {
  border-top-right-radius: 9999px !important;
  border-bottom-right-radius: 9999px !important;
}
/* Hover preview (highlighted) range: subdued color so the actual selection stands out.
   Trigger keeps its `data-highlighted:bg-primary/20` from the theme; we just dim it. */
.demo-examples :deep([data-slot="grid"]:has([data-highlighted-start]) [data-slot="cellTrigger"][data-highlighted]:not([data-selected])) {
  opacity: 0.35;
}
</style>
