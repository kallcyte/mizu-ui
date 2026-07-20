<script setup lang="ts">
import { computed, ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const items = ["System", "Light", "Dark"];
const value = ref<string[]>(["System"]);

const objectItems = [
  { label: "System", description: "Follow the system preference.", value: "system" },
  { label: "Light", description: "Always use light mode.", value: "light" },
  { label: "Dark", description: "Always use dark mode.", value: "dark" },
];
const objectValue = ref<string[]>(["system"]);

const horizontalItems = ["Backlog", "Todo", "In Progress", "Done"];
const horizontalValue = ref<string[]>(["Backlog"]);

const fruits = ["Apple", "Banana", "Blueberry"];
const selectedFruits = ref<string[]>(["Apple"]);

function onSelectAll(val: boolean | "indeterminate") {
  selectedFruits.value = val === true ? [...fruits] : [];
}

const selectAllValue = computed(() =>
  selectedFruits.value.length === fruits.length
    ? true
    : selectedFruits.value.length
      ? "indeterminate"
      : false
);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">
        A simple checkbox group bound with <code>v-model</code> to an array of string items.
      </p>
      <CodeCollapsible
        :code="`<UCheckboxGroup v-model=&quot;value&quot; :items=&quot;items&quot; />`"
      >
        <div class="demo-col">
          <UCheckboxGroup v-model="value" :items="items" />
          <p v-if="value.length" class="mizu-select-value">Selected: {{ value.join(", ") }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indeterminate Select-All</h3>
      <p class="demo-description">
        Combines an independent <code>UCheckbox</code> with a <code>UCheckboxGroup</code> for a
        select-all/deselect-all pattern.
      </p>
      <CodeCollapsible
        :code="`<UCheckbox
  :model-value=&quot;selectAllValue&quot;
  label=&quot;Select all&quot;
  @update:model-value=&quot;onSelectAll&quot;
/>
<UCheckboxGroup
  v-model=&quot;selectedFruits&quot;
  :items=&quot;fruits&quot;
  class=&quot;ms-6&quot;
/>`"
      >
        <div class="demo-col">
          <UCheckbox
            :model-value="selectAllValue"
            label="Select all"
            @update:model-value="onSelectAll"
          />
          <UCheckboxGroup v-model="selectedFruits" :items="fruits" class="ms-6" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Objects</h3>
      <p class="demo-description">
        Items defined as objects with <code>label</code>, <code>description</code>, and
        <code>value</code> properties for richer options.
      </p>
      <CodeCollapsible
        :code="`<UCheckboxGroup v-model=&quot;objectValue&quot; :items=&quot;objectItems&quot; />`"
      >
        <div class="demo-col">
          <UCheckboxGroup v-model="objectValue" :items="objectItems" />
          <p v-if="objectValue.length" class="mizu-select-value">
            Selected: {{ objectValue.join(", ") }}
          </p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Legend</h3>
      <p class="demo-description">
        Adds a legend label above the group using the <code>legend</code> prop for grouping context.
      </p>
      <CodeCollapsible
        :code="`<UCheckboxGroup legend=&quot;Theme&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />`"
      >
        <div class="demo-col">
          <UCheckboxGroup legend="Theme" :default-value="['System']" :items="items" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Required with Helper Text</h3>
      <p class="demo-description">
        A required checkbox group wrapped in a <code>UFormField</code> with helper text for form
        validation.
      </p>
      <CodeCollapsible
        :code="`<UFormField help=&quot;Select how you want to be notified.&quot; class=&quot;w-full&quot;>
  <UCheckboxGroup required legend=&quot;Channels&quot; :default-value=&quot;['Email']&quot; :items=&quot;['Email', 'SMS', 'Push']&quot; />
</UFormField>`"
      >
        <div class="demo-col">
          <UFormField help="Select how you want to be notified." class="w-full">
            <UCheckboxGroup
              required
              legend="Channels"
              :default-value="['Email']"
              :items="['Email', 'SMS', 'Push']"
            />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <p class="demo-description">
        Seven color variants available: primary, secondary, success, info, warning, error, and
        neutral.
      </p>
      <CodeCollapsible
        :code="`<UCheckboxGroup color=&quot;primary&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />
<UCheckboxGroup color=&quot;secondary&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />
<UCheckboxGroup color=&quot;success&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />
<UCheckboxGroup color=&quot;info&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />
<UCheckboxGroup color=&quot;warning&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />
<UCheckboxGroup color=&quot;error&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />
<UCheckboxGroup color=&quot;neutral&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />`"
      >
        <div class="demo-col">
          <UCheckboxGroup color="primary" :default-value="['System']" :items="items" />
          <UCheckboxGroup color="secondary" :default-value="['System']" :items="items" />
          <UCheckboxGroup color="success" :default-value="['System']" :items="items" />
          <UCheckboxGroup color="info" :default-value="['System']" :items="items" />
          <UCheckboxGroup color="warning" :default-value="['System']" :items="items" />
          <UCheckboxGroup color="error" :default-value="['System']" :items="items" />
          <UCheckboxGroup color="neutral" :default-value="['System']" :items="items" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Horizontal Orientation</h3>
      <p class="demo-description">
        Arranges checkboxes horizontally using <code>orientation="horizontal"</code> for compact
        layouts.
      </p>
      <CodeCollapsible
        :code="`<UCheckboxGroup v-model=&quot;horizontalValue&quot; orientation=&quot;horizontal&quot; :items=&quot;horizontalItems&quot; />`"
      >
        <div class="demo-col">
          <UCheckboxGroup
            v-model="horizontalValue"
            orientation="horizontal"
            :items="horizontalItems"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Card Variant</h3>
      <p class="demo-description">
        Card-styled group with <code>variant="card"</code> for a visually distinct selection area.
      </p>
      <CodeCollapsible
        :code="`<UCheckboxGroup color=&quot;primary&quot; variant=&quot;card&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />`"
      >
        <div class="demo-col">
          <UCheckboxGroup
            color="primary"
            variant="card"
            :default-value="['System']"
            :items="items"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indicator End</h3>
      <p class="demo-description">
        Positions the checkbox indicator at the end of the label with card variant styling.
      </p>
      <CodeCollapsible
        :code="`<UCheckboxGroup indicator=&quot;end&quot; variant=&quot;card&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />`"
      >
        <div class="demo-col max-w-xs">
          <UCheckboxGroup
            indicator="end"
            variant="card"
            :default-value="['System']"
            :items="items"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">
        A fully disabled checkbox group, preventing all user interaction.
      </p>
      <CodeCollapsible
        :code="`<UCheckboxGroup disabled :default-value=&quot;['System']&quot; :items=&quot;items&quot; />`"
      >
        <div class="demo-col">
          <UCheckboxGroup disabled :default-value="['System']" :items="items" />
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
  background: var(--color-surface-muted, #f3f4f6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
}
.mizu-select-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4b5563);
  margin: 0;
}
</style>
