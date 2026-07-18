<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const singleValue = ref("");
const filterValue = ref("");
const multiValue = ref<string[]>([]);
const countryValue = ref("");
const iconCountryValue = ref("");
const sizeSm = ref("");
const sizeMd = ref("");
const sizeLg = ref("");
const sizeXl = ref("");

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Cherry", value: "cherry" },
  { label: "Grapes", value: "grapes" },
  { label: "Mango", value: "mango" },
  { label: "Orange", value: "orange" },
  { label: "Peach", value: "peach" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Strawberry", value: "strawberry" },
];

const countries = [
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "United Kingdom", code: "UK" },
  { name: "Australia", code: "AU" },
  { name: "Japan", code: "JP" },
  { name: "Germany", code: "DE" },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic listbox</h3>
      <CodeCollapsible
        :code="`const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
]
const fruit = ref('')

<UListbox v-model=&quot;fruit&quot; :items=&quot;fruits&quot; value-key=&quot;value&quot; placeholder=&quot;Pick a fruit&quot; />`"
      >
        <div class="demo-col">
          <UListbox
            v-model="singleValue"
            :items="fruits"
            value-key="value"
            placeholder="Pick a fruit"
          />
          <p v-if="singleValue" class="demo-selected">Selected: {{ singleValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple selection</h3>
      <CodeCollapsible
        :code="`const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Peach', value: 'peach' },
]
const selected = ref<string[]>([])

<UListbox v-model=&quot;selected&quot; :items=&quot;fruits&quot; value-key=&quot;value&quot; multiple placeholder=&quot;Pick fruits&quot; />`"
      >
        <div class="demo-col">
          <UListbox
            v-model="multiValue"
            :items="fruits"
            value-key="value"
            multiple
            placeholder="Pick fruits"
          />
          <p v-if="multiValue.length" class="demo-selected">Selected: {{ multiValue.join(", ") }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With objects and value-key</h3>
      <CodeCollapsible
        :code="`const countries = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Australia', code: 'AU' },
  { name: 'Japan', code: 'JP' },
]
const country = ref('')

<UListbox
  v-model=&quot;country&quot;
  :items=&quot;countries&quot;
  value-key=&quot;code&quot;
  label-key=&quot;name&quot;
  placeholder=&quot;Select a country&quot;
/>`"
      >
        <div class="demo-col">
          <UListbox
            v-model="countryValue"
            :items="countries"
            value-key="code"
            label-key="name"
            placeholder="Select a country"
          />
          <p v-if="countryValue" class="demo-selected">Code: {{ countryValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With search filter</h3>
      <CodeCollapsible
        :code="`const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Peach', value: 'peach' },
]
const fruit = ref('')

<UListbox v-model=&quot;fruit&quot; :items=&quot;fruits&quot; value-key=&quot;value&quot; filter placeholder=&quot;Search fruit...&quot; />`"
      >
        <div class="demo-col">
          <UListbox
            v-model="filterValue"
            :items="fruits"
            value-key="value"
            filter
            placeholder="Search fruit..."
          />
          <p v-if="filterValue" class="demo-selected">Picked: {{ filterValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With icons and descriptions</h3>
      <CodeCollapsible
        :code="`const items = [
  { label: 'France', description: 'The Hexagon', icon: 'i-ph-map-pin', value: 'FR' },
  { label: 'Germany', description: 'The Federal Republic', icon: 'i-ph-map-pin', value: 'DE' },
  { label: 'Italy', description: 'The Boot', icon: 'i-ph-map-pin', value: 'IT' },
  { label: 'Spain', description: 'The Bull Skin', icon: 'i-ph-map-pin', value: 'ES' },
]
const country = ref('')

<UListbox v-model=&quot;country&quot; :items=&quot;items&quot; value-key=&quot;value&quot; />`"
      >
        <div class="demo-col">
          <UListbox
            v-model="iconCountryValue"
            :items="[
              { label: 'France', description: 'The Hexagon', icon: 'i-ph-map-pin', value: 'FR' },
              { label: 'Germany', description: 'The Federal Republic', icon: 'i-ph-map-pin', value: 'DE' },
              { label: 'Italy', description: 'The Boot', icon: 'i-ph-map-pin', value: 'IT' },
              { label: 'Spain', description: 'The Bull Skin', icon: 'i-ph-map-pin', value: 'ES' },
            ]"
            value-key="value"
          />
          <p v-if="iconCountryValue" class="demo-selected">Code: {{ iconCountryValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible
        :code="`const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grapes', value: 'grapes' },
]

<UListbox size=&quot;sm&quot; :items=&quot;items&quot; value-key=&quot;value&quot; />
<UListbox size=&quot;md&quot; :items=&quot;items&quot; value-key=&quot;value&quot; />
<UListbox size=&quot;lg&quot; :items=&quot;items&quot; value-key=&quot;value&quot; />
<UListbox size=&quot;xl&quot; :items=&quot;items&quot; value-key=&quot;value&quot; />`"
      >
        <div class="demo-col">
          <UListbox v-model="sizeSm" size="sm" :items="fruits" value-key="value" placeholder="Small" />
          <UListbox v-model="sizeMd" size="md" :items="fruits" value-key="value" placeholder="Medium" />
          <UListbox v-model="sizeLg" size="lg" :items="fruits" value-key="value" placeholder="Large" />
          <UListbox v-model="sizeXl" size="xl" :items="fruits" value-key="value" placeholder="Extra large" />
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
.demo-selected {
  font-size: 12px;
  color: var(--color-foreground-secondary);
  margin: 0;
}
</style>
