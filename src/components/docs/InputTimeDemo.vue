<script setup lang="ts">
import { shallowRef } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";
import { Time, type TimeValue } from "@internationalized/date";

interface TimeRange {
  start: TimeValue;
  end: TimeValue;
}

const singleTime = shallowRef(new Time(14, 30));
const timeRange = shallowRef<TimeRange>({
  start: new Time(9, 0),
  end: new Time(17, 0),
});
const defaultTime = shallowRef(new Time(9, 0));
const disabledTime = shallowRef(new Time(12, 0));
const iconTime = shallowRef(new Time(10, 30));
const avatarTime = shallowRef(new Time(14, 0));
const hourCycleTime = shallowRef(new Time(16, 30));
const granularityTime = shallowRef(new Time(14, 30, 15));
const formFieldTime = shallowRef(new Time(9, 0));
const stepTime = shallowRef(new Time(12, 0));
const readonlyTime = shallowRef(new Time(10, 0));
const loadingTime = shallowRef(new Time(8, 0));
const builtinMinMaxTime = shallowRef(new Time(14, 0));

const basicCode = `<UInputTime
  v-model="time"
/>`;

const rangeCode = `<UInputTime
  v-model="range"
  range
/>`;

const defaultValueCode = `<UInputTime
  :default-value="defaultTime"
/>`;

const hourCycleCode = `<UInputTime
  :hour-cycle="12"
/>
<UInputTime
  :hour-cycle="24"
/>`;

const colorCode = `<UInputTime color="primary" highlight />
<UInputTime color="secondary" highlight />
<UInputTime color="success" highlight />
<UInputTime color="info" highlight />
<UInputTime color="warning" highlight />
<UInputTime color="error" highlight />
<UInputTime color="neutral" highlight />`;

const variantCode = `<UInputTime variant="outline" />
<UInputTime variant="soft" />
<UInputTime variant="subtle" />
<UInputTime variant="ghost" />
<UInputTime variant="none" />`;

const sizeCode = `<UInputTime size="sm" />
<UInputTime size="md" />
<UInputTime size="lg" />`;

const iconCode = `<UInputTime
  icon="i-lucide-clock"
/>`;

const separatorCode = `<UInputTime
  range
  separator-icon="i-lucide-arrow-right"
/>`;

const avatarCode = `<UInputTime
  :avatar="{ src: 'https://github.com/nuxt.png' }"
/>`;

const disabledCode = `<UInputTime
  disabled
/>`;

const granularityCode = `<UInputTime
  v-model="time"
  granularity="hour"
/>
<UInputTime
  v-model="time"
  granularity="minute"
/>
<UInputTime
  v-model="time"
  granularity="second"
/>`;

const formFieldCode = `<UFormField label="Meeting time" helper="Select your preferred time slot">
  <UInputTime v-model="time" />
</UFormField>`;

const stepCode = `<UInputTime
  v-model="time"
  :step="{ minute: 15 }"
  step-snapping
/>`;

const readonlyCode = `<UInputTime
  v-model="time"
  readonly
/>`;

const loadingCode = `<UInputTime
  v-model="time"
  loading
/>`;

const builtinMinMaxCode = `<UInputTime
  v-model="time"
  :min-value="new Time(9, 0)"
  :max-value="new Time(17, 0)"
  :hour-cycle="24"
/>`;

</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A time picker using <code>Time</code> from @internationalized/date with <code>v-model</code> binding.</p>
      <CodeCollapsible :code="basicCode">
        <div class="demo-col">
          <UInputTime
            v-model="singleTime"
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Time range</h3>
      <p class="demo-description">Selects a start and end time pair with the <code>range</code> prop.</p>
      <CodeCollapsible :code="rangeCode">
        <div class="demo-col">
          <UInputTime
            v-model="timeRange"
            range
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Default value (uncontrolled)</h3>
      <p class="demo-description">Sets an initial uncontrolled value with <code>default-value</code>.</p>
      <CodeCollapsible :code="defaultValueCode">
        <div class="demo-col">
          <UInputTime
            :default-value="defaultTime"
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Hour Cycle</h3>
      <p class="demo-description">Switches between 12-hour and 24-hour formats with <code>hour-cycle</code>.</p>
      <CodeCollapsible :code="hourCycleCode">
        <div class="demo-col">
          <UInputTime
            v-model="hourCycleTime"
            :hour-cycle="12"
          />
          <UInputTime
            v-model="hourCycleTime"
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Semantic color themes applied with the <code>color</code> and <code>highlight</code> props.</p>
      <CodeCollapsible :code="colorCode">
        <div class="demo-row demo-row--wrap">
          <UInputTime color="primary" :hour-cycle="24" highlight />
          <UInputTime color="secondary" :hour-cycle="24" highlight />
          <UInputTime color="success" :hour-cycle="24" highlight />
          <UInputTime color="info" :hour-cycle="24" highlight />
          <UInputTime color="warning" :hour-cycle="24" highlight />
          <UInputTime color="error" :hour-cycle="24" highlight />
          <UInputTime color="neutral" :hour-cycle="24" highlight />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variant</h3>
      <p class="demo-description">Five visual variants: outline, soft, subtle, ghost, and none.</p>
      <CodeCollapsible :code="variantCode">
        <div class="demo-row demo-row--wrap">
          <UInputTime variant="outline" :hour-cycle="24" />
          <UInputTime variant="soft" :hour-cycle="24" />
          <UInputTime variant="subtle" :hour-cycle="24" />
          <UInputTime variant="ghost" :hour-cycle="24" />
          <UInputTime variant="none" :hour-cycle="24" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Size</h3>
      <p class="demo-description">Three size options: small, medium, and large.</p>
      <CodeCollapsible :code="sizeCode">
        <div class="demo-row demo-row--wrap">
          <UInputTime size="sm" :hour-cycle="24" />
          <UInputTime size="md" :hour-cycle="24" />
          <UInputTime size="lg" :hour-cycle="24" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <p class="demo-description">Adds a leading icon with the <code>icon</code> prop.</p>
      <CodeCollapsible :code="iconCode">
        <div class="demo-col">
          <UInputTime
            v-model="iconTime"
            icon="i-lucide-clock"
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Separator Icon</h3>
      <p class="demo-description">Customizes the icon between range fields with <code>separator-icon</code>.</p>
      <CodeCollapsible :code="separatorCode">
        <div class="demo-col">
          <UInputTime
            range
            separator-icon="i-lucide-arrow-right"
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Avatar</h3>
      <p class="demo-description">Adds a leading avatar image with the <code>avatar</code> prop.</p>
      <CodeCollapsible :code="avatarCode">
        <div class="demo-col">
          <UInputTime
            v-model="avatarTime"
            :avatar="{ src: 'https://github.com/nuxt.png' }"
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Prevents user interaction with a muted appearance.</p>
      <CodeCollapsible :code="disabledCode">
        <div class="demo-col">
          <UInputTime
            v-model="disabledTime"
            disabled
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Granularity</h3>
      <p class="demo-description">Controls pickable precision: hour, minute, or second level.</p>
      <CodeCollapsible :code="granularityCode">
        <div class="demo-col">
          <UInputTime
            v-model="granularityTime"
            granularity="hour"
            :hour-cycle="24"
          />
          <UInputTime
            v-model="granularityTime"
            granularity="minute"
            :hour-cycle="24"
          />
          <UInputTime
            v-model="granularityTime"
            granularity="second"
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Form Field</h3>
      <p class="demo-description">Wraps input in UFormField for label, helper text, and validation.</p>
      <CodeCollapsible :code="formFieldCode">
        <div class="demo-col">
          <UFormField label="Meeting time" helper="Select your preferred time slot">
            <UInputTime v-model="formFieldTime" :hour-cycle="24" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Step</h3>
      <p class="demo-description">Snaps time values to 15-minute increments with <code>step</code> and <code>step-snapping</code>.</p>
      <CodeCollapsible :code="stepCode">
        <div class="demo-col">
          <UInputTime
            v-model="stepTime"
            :step="{ minute: 15 }"
            step-snapping
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Readonly</h3>
      <p class="demo-description">Read-only mode that displays the value without allowing edits.</p>
      <CodeCollapsible :code="readonlyCode">
        <div class="demo-col">
          <UInputTime
            v-model="readonlyTime"
            readonly
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <p class="demo-description">Shows a loading spinner to indicate a pending operation.</p>
      <CodeCollapsible :code="loadingCode">
        <div class="demo-col">
          <UInputTime
            v-model="loadingTime"
            loading
            :hour-cycle="24"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Min / max</h3>
      <p class="demo-description">Constrains the valid time range with <code>min-value</code> and <code>max-value</code>.</p>
      <CodeCollapsible :code="builtinMinMaxCode">
        <div class="demo-col">
          <UInputTime
            v-model="builtinMinMaxTime"
            :min-value="new Time(9, 0)"
            :max-value="new Time(17, 0)"
            :hour-cycle="24"
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
  gap: 8px;
}
.demo-row--wrap {
  flex-wrap: wrap;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  max-width: 320px;
}
</style>
