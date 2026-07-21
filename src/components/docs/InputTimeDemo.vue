<script setup lang="ts">
import { shallowRef } from "vue";
import { Time } from "@internationalized/date";
import CodeCollapsible from "./CodeCollapsible.vue";

const time = shallowRef(new Time(12, 30, 0));
const defaultTime = shallowRef(new Time(9, 45, 0));
const rangeValue = shallowRef({ start: new Time(9, 0, 0), end: new Time(17, 30, 0) });
const hour24Value = shallowRef(new Time(16, 30, 0));
const iconTime = shallowRef(new Time(14, 0, 0));
const rangeIconTime = shallowRef({ start: new Time(10, 0, 0), end: new Time(15, 0, 0) });
const formFieldTime = shallowRef(new Time(12, 30, 0));
const disabledTime = shallowRef(new Time(8, 0, 0));

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A time input using <code>UInputTime</code> with v-model bound to a <code>Time</code> from <code>@internationalized/date</code>.</p>
      <CodeCollapsible
:code="`<script setup lang=&quot;ts&quot;>
import { shallowRef } from 'vue'
import { Time } from '@internationalized/date'

const value = shallowRef(new Time(12, 30, 0))
<\/script>

<template>
  <UInputTime v-model=&quot;value&quot; />
</template>`">
        <div class="demo-col">
          <UInputTime v-model="time" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Default Value</h3>
      <p class="demo-description">Use <code>default-value</code> to set the initial time when you don't need to control state.</p>
      <CodeCollapsible :code="`<UInputTime :default-value=&quot;defaultValue&quot; />`">
        <div class="demo-col">
          <UInputTime :default-value="defaultTime" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Time Range</h3>
      <p class="demo-description">Enable time range selection with the <code>range</code> prop for start and end times.</p>
      <CodeCollapsible :code="`<UInputTime range v-model=&quot;value&quot; />`">
        <div class="demo-col">
          <UInputTime v-model="rangeValue" range />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Hour Cycle</h3>
      <p class="demo-description">Use the <code>hour-cycle</code> prop to switch between 12-hour (default) and 24-hour format.</p>
      <CodeCollapsible :code="`<UInputTime :hour-cycle=&quot;24&quot; v-model=&quot;value&quot; />`">
        <div class="demo-col">
          <UInputTime v-model="hour24Value" :hour-cycle="24" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Use the <code>color</code> prop to change the color of the input's focus ring and segments.</p>
      <CodeCollapsible :code="colors.map(c => `<UInputTime color=&quot;${c}&quot; highlight />`).join('\n')">
        <div class="demo-col">
          <UInputTime
            v-for="c in colors"
            :key="c"
            :color="c"
            highlight
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variant</h3>
      <p class="demo-description">Use the <code>variant</code> prop to change the visual style of the input.</p>
      <CodeCollapsible
:code="`<UInputTime variant=&quot;outline&quot; />
<UInputTime variant=&quot;soft&quot; />
<UInputTime variant=&quot;subtle&quot; />
<UInputTime variant=&quot;ghost&quot; />`">
        <div class="demo-col">
          <UInputTime variant="outline" />
          <UInputTime variant="soft" />
          <UInputTime variant="subtle" />
          <UInputTime variant="ghost" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Size</h3>
      <p class="demo-description">Use the <code>size</code> prop to change the size of the input.</p>
      <CodeCollapsible :code="sizes.map(s => `<UInputTime size=&quot;${s}&quot; />`).join('\n')">
        <div class="demo-col">
          <UInputTime
            v-for="s in sizes"
            :key="s"
            :size="s"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <p class="demo-description">Use the <code>icon</code> prop to show an icon inside the time input.</p>
      <CodeCollapsible :code="`<UInputTime icon=&quot;i-lucide-clock&quot; v-model=&quot;value&quot; />`">
        <div class="demo-col">
          <UInputTime v-model="iconTime" icon="i-lucide-clock" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Range Separator Icon</h3>
      <p class="demo-description">Use the <code>separator-icon</code> prop to customize the icon between range start and end times.</p>
      <CodeCollapsible :code="`<UInputTime range separator-icon=&quot;i-lucide-arrow-right&quot; v-model=&quot;value&quot; />`">
        <div class="demo-col">
          <UInputTime v-model="rangeIconTime" range separator-icon="i-lucide-arrow-right" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With FormField</h3>
      <p class="demo-description">Wrap the time input in a <code>UFormField</code> to add a label, help text, and required indicator.</p>
      <CodeCollapsible
:code="`<UFormField label=&quot;Time&quot; help=&quot;Specify the meeting time&quot; required>
  <UInputTime v-model=&quot;value&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Time" help="Specify the meeting time" required>
            <UInputTime v-model="formFieldTime" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Use the <code>disabled</code> prop to prevent user interaction with the time input.</p>
      <CodeCollapsible :code="`<UInputTime disabled v-model=&quot;value&quot; />`">
        <div class="demo-col">
          <UInputTime v-model="disabledTime" disabled />
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
  gap: 8px;
  width: 100%;
  max-width: 320px;
}
</style>
