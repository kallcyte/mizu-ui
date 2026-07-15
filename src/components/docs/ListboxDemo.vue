<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const singleValue = ref("");
const multiValue = ref<string[]>([]);
const objectValue = ref<{ name: string; code: string } | null>(null);

const fruits = ["Apple", "Banana", "Blueberry", "Cherry", "Grapes", "Mango", "Orange", "Peach", "Pineapple", "Strawberry"];

const countries = [
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "United Kingdom", code: "UK" },
  { name: "Australia", code: "AU" },
  { name: "Japan", code: "JP" },
  { name: "Germany", code: "DE" },
];

const basicCode = `<UListbox
  v-model="value"
  :items="['Apple', 'Banana', 'Blueberry', ...]"
  placeholder="Pick a fruit"
/>`;

const multiCode = `<UListbox
  v-model="value"
  :items="['Apple', 'Banana', 'Blueberry', ...]"
  multiple
  placeholder="Pick fruits"
/>`;

const objectCode = `<UListbox
  v-model="value"
  :items="countries"
  value-key="code"
  label-key="name"
  placeholder="Select a country"
/>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic listbox</h3>
      <CodeCollapsible :code="basicCode">
        <div class="demo-col">
          <UListbox
            v-model="singleValue"
            :items="fruits"
            placeholder="Pick a fruit"
          />
          <p v-if="singleValue" class="mizu-select-value">Selected: {{ singleValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple selection</h3>
      <CodeCollapsible :code="multiCode">
        <div class="demo-col">
          <UListbox
            v-model="multiValue"
            :items="fruits"
            multiple
            placeholder="Pick fruits"
          />
          <p v-if="multiValue.length" class="mizu-select-value">Selected: {{ multiValue.join(", ") }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With objects and value-key</h3>
      <CodeCollapsible :code="objectCode">
        <div class="demo-col">
          <UListbox
            v-model="objectValue"
            :items="countries"
            value-key="code"
            label-key="name"
            placeholder="Select a country"
          />
          <p v-if="objectValue" class="mizu-select-value">Code: {{ objectValue.code }} ({{ objectValue.name }})</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With search filter</h3>
      <CodeCollapsible :code="`<UListbox
  v-model=&quot;value&quot;
  :items=&quot;fruits&quot;
  filter
  placeholder=&quot;Search fruit...&quot;
/>`">
        <div class="demo-col">
          <UListbox
            v-model="singleValue"
            :items="fruits"
            filter
            placeholder="Search fruit..."
          />
          <p v-if="singleValue" class="mizu-select-value">Picked: {{ singleValue }}</p>
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
  width: 100%;
  gap: 8px;
  max-width: 320px;
}
.mizu-select-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
