<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const singleValue = ref("");
const multiValue = ref<string[]>([]);
const countryValue = ref("");
const sizeValue = ref("");

const fruits = ["Apple", "Banana", "Blueberry", "Cherry", "Grapes", "Mango", "Orange", "Peach", "Pineapple", "Strawberry"];

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
        :code="`const fruits = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grapes', 'Mango', 'Orange', 'Peach', 'Pineapple', 'Strawberry']
const fruit = ref('')

<UListbox v-model=&quot;fruit&quot; :items=&quot;fruits&quot; placeholder=&quot;Pick a fruit&quot; />`"
      >
        <div class="demo-col">
          <UListbox
            v-model="singleValue"
            :items="fruits"
            placeholder="Pick a fruit"
          />
          <p v-if="singleValue" class="demo-selected">Selected: {{ singleValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple selection</h3>
      <CodeCollapsible
        :code="`const fruits = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grapes', 'Mango', 'Orange', 'Peach']
const selected = ref<string[]>([])

<UListbox v-model=&quot;selected&quot; :items=&quot;fruits&quot; multiple placeholder=&quot;Pick fruits&quot; />`"
      >
        <div class="demo-col">
          <UListbox
            v-model="multiValue"
            :items="fruits"
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
        :code="`const fruits = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grapes', 'Mango', 'Orange', 'Peach']
const fruit = ref('')

<UListbox v-model=&quot;fruit&quot; :items=&quot;fruits&quot; filter placeholder=&quot;Search fruit...&quot; />`"
      >
        <div class="demo-col">
          <UListbox
            v-model="singleValue"
            :items="fruits"
            filter
            placeholder="Search fruit..."
          />
          <p v-if="singleValue" class="demo-selected">Picked: {{ singleValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible
        :code="`const items = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grapes']

<UListbox size=&quot;sm&quot; :items=&quot;items&quot; />
<UListbox size=&quot;md&quot; :items=&quot;items&quot; />
<UListbox size=&quot;lg&quot; :items=&quot;items&quot; />
<UListbox size=&quot;xl&quot; :items=&quot;items&quot; />`"
      >
        <div class="demo-col">
          <UListbox v-model="sizeValue" size="sm" :items="fruits" placeholder="Small" />
          <UListbox v-model="sizeValue" size="md" :items="fruits" placeholder="Medium" />
          <UListbox v-model="sizeValue" size="lg" :items="fruits" placeholder="Large" />
          <UListbox v-model="sizeValue" size="xl" :items="fruits" placeholder="Extra large" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading state</h3>
      <CodeCollapsible
        :code="`const items = [
  { label: 'France', icon: 'i-lucide-map-pin', value: 'FR' },
  { label: 'Germany', icon: 'i-lucide-map-pin', value: 'DE' },
  { label: 'Italy', icon: 'i-lucide-map-pin', value: 'IT' },
]

<UListbox loading :items=&quot;items&quot; />`"
      >
        <div class="demo-col">
          <UListbox
            :items="[
              { label: 'France', icon: 'i-lucide-map-pin', value: 'FR' },
              { label: 'Germany', icon: 'i-lucide-map-pin', value: 'DE' },
              { label: 'Italy', icon: 'i-lucide-map-pin', value: 'IT' },
            ]"
            loading
            placeholder="Select a country"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible
        :code="`const items = [
  { label: 'France', icon: 'i-lucide-map-pin', value: 'FR' },
  { label: 'Germany', icon: 'i-lucide-map-pin', value: 'DE' },
  { label: 'Italy', icon: 'i-lucide-map-pin', value: 'IT' },
]

<UListbox disabled :items=&quot;items&quot; />`"
      >
        <div class="demo-col">
          <UListbox
            :items="[
              { label: 'France', icon: 'i-lucide-map-pin', value: 'FR' },
              { label: 'Germany', icon: 'i-lucide-map-pin', value: 'DE' },
              { label: 'Italy', icon: 'i-lucide-map-pin', value: 'IT' },
            ]"
            disabled
            placeholder="Select a country"
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
