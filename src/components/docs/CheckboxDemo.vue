<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const checked = ref(false);
const indeterminate = ref("indeterminate");

const selectAll = ref(false);
const selectedFruits = ref<string[]>([]);
const fruits = ["Apple", "Banana", "Blueberry"];

</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>States</h3>
      <CodeCollapsible :code="`<UCheckbox v-model=&quot;checked&quot; label=&quot;Accept terms&quot; />
<UCheckbox label=&quot;Unchecked&quot; />
<UCheckbox label=&quot;Required -- agree to continue&quot; required />
<UCheckbox default-value=&quot;indeterminate&quot; label=&quot;Indeterminate&quot; />`">
        <div class="demo-col">
          <UCheckbox v-model="checked" label="Accept terms" />
          <UCheckbox label="Unchecked" />
          <UCheckbox label="Required — agree to continue" required />
          <UCheckbox :default-value="indeterminate" label="Indeterminate" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indeterminate</h3>
      <CodeCollapsible :code="`<UCheckbox
  v-model=&quot;selectAll&quot;
  :value=&quot;selectedFruits.length ? (selectedFruits.length === 3 ? true : 'indeterminate') : false&quot;
  label=&quot;Select all&quot;
/>
<UCheckbox
  v-for=&quot;fruit in fruits&quot;
  :key=&quot;fruit&quot;
  v-model=&quot;selectedFruits&quot;
  :value=&quot;fruit&quot;
  :label=&quot;fruit&quot;
  class=&quot;ms-6&quot;
/>`">
        <div class="demo-col">
          <UCheckbox
            :model-value="selectedFruits.length ? (selectedFruits.length === fruits.length ? true : 'indeterminate' as const) : false"
            @update:model-value="(val: any) => { if (val === true) selectedFruits = [...fruits]; else selectedFruits = []; }"
            label="Select all"
          />
          <UCheckbox
            v-for="fruit in fruits"
            :key="fruit"
            v-model="selectedFruits"
            :value="fruit"
            :label="fruit"
            class="ms-6"
          />
          <p v-if="selectedFruits.length" class="mizu-select-value">Selected: {{ selectedFruits.join(", ") }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Description</h3>
      <CodeCollapsible :code="`<UCheckbox label=&quot;Subscribe&quot; description=&quot;Receive product updates and tips.&quot; />`">
        <div class="demo-col">
          <UCheckbox label="Subscribe" description="Receive product updates and tips." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <CodeCollapsible :code="`<UCheckbox color=&quot;primary&quot; default-value label=&quot;Primary&quot; />
<UCheckbox color=&quot;secondary&quot; default-value label=&quot;Secondary&quot; />
<UCheckbox color=&quot;success&quot; default-value label=&quot;Success&quot; />
<UCheckbox color=&quot;info&quot; default-value label=&quot;Info&quot; />
<UCheckbox color=&quot;warning&quot; default-value label=&quot;Warning&quot; />
<UCheckbox color=&quot;error&quot; default-value label=&quot;Error&quot; />
<UCheckbox color=&quot;neutral&quot; default-value label=&quot;Neutral&quot; />`">
        <div class="demo-col">
          <UCheckbox color="primary" default-value label="Primary" />
          <UCheckbox color="secondary" default-value label="Secondary" />
          <UCheckbox color="success" default-value label="Success" />
          <UCheckbox color="info" default-value label="Info" />
          <UCheckbox color="warning" default-value label="Warning" />
          <UCheckbox color="error" default-value label="Error" />
          <UCheckbox color="neutral" default-value label="Neutral" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="`<UCheckbox size=&quot;sm&quot; default-value label=&quot;Small&quot; />
<UCheckbox size=&quot;md&quot; default-value label=&quot;Medium&quot; />
<UCheckbox size=&quot;lg&quot; default-value label=&quot;Large&quot; />
<UCheckbox size=&quot;xl&quot; default-value label=&quot;Extra Large&quot; />`">
        <div class="demo-col">
          <UCheckbox size="sm" default-value label="Small" />
          <UCheckbox size="md" default-value label="Medium" />
          <UCheckbox size="lg" default-value label="Large" />
          <UCheckbox size="xl" default-value label="Extra Large" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Card Variant</h3>
      <CodeCollapsible :code="`<UCheckbox color=&quot;primary&quot; variant=&quot;card&quot; default-value label=&quot;Primary&quot; description=&quot;This is a primary card checkbox.&quot; />
<UCheckbox color=&quot;neutral&quot; variant=&quot;card&quot; label=&quot;Neutral&quot; description=&quot;This is a neutral card checkbox.&quot; />
<UCheckbox color=&quot;error&quot; variant=&quot;card&quot; default-value label=&quot;Error&quot; description=&quot;This is an error card checkbox.&quot; />`">
        <div class="demo-col">
          <UCheckbox color="primary" variant="card" default-value label="Primary" description="This is a primary card checkbox." />
          <UCheckbox color="neutral" variant="card" label="Neutral" description="This is a neutral card checkbox." />
          <UCheckbox color="error" variant="card" default-value label="Error" description="This is an error card checkbox." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indicator Position</h3>
      <CodeCollapsible :code="`<UCheckbox indicator=&quot;start&quot; default-value label=&quot;Start (default)&quot; />
<UCheckbox indicator=&quot;end&quot; default-value label=&quot;End&quot; />
<UCheckbox indicator=&quot;hidden&quot; default-value label=&quot;Hidden&quot; />`">
        <div class="demo-col">
          <UCheckbox indicator="start" default-value label="Start (default)" />
          <UCheckbox indicator="end" default-value label="End" />
          <UCheckbox indicator="hidden" default-value label="Hidden" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<UCheckbox disabled label=&quot;Checked -- disabled&quot; :default-value=&quot;true&quot; />
<UCheckbox disabled label=&quot;Unchecked -- disabled&quot; />
<UCheckbox disabled :default-value=&quot;'indeterminate'&quot; label=&quot;Indeterminate -- disabled&quot; />`">
        <div class="demo-col">
          <UCheckbox disabled label="Checked — disabled" :default-value="true" />
          <UCheckbox disabled label="Unchecked — disabled" />
          <UCheckbox disabled :default-value="indeterminate" label="Indeterminate — disabled" />
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
  gap: 12px;
}
</style>
