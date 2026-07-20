<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const singleValue = ref("");
const filterValue = ref("");
const multiValue = ref<string[]>([]);
const countryValue = ref("");
const descValue = ref("");
const iconValue = ref("");
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
  { label: "Orange", value: "orange" },
  { label: "Peach", value: "peach" },
  { label: "Pineapple", value: "pineapple" },
];

const fruitIcons = [
  { label: "Backlog", icon: "i-ph-circle-help", value: "backlog" },
  { label: "Todo", icon: "i-ph-circle-plus", value: "todo" },
  { label: "In Progress", icon: "i-ph-circle-arrow-up", value: "in_progress" },
  { label: "Done", icon: "i-ph-circle-check", value: "done" },
];

const countries = [
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "United Kingdom", code: "UK" },
  { name: "Australia", code: "AU" },
  { name: "Japan", code: "JP" },
  { name: "Germany", code: "DE" },
];

const countryList = [
  { label: "France", description: "The Hexagon", value: "FR", icon: "i-ph-map-pin" },
  { label: "Germany", description: "The Federal Republic", value: "DE", icon: "i-ph-map-pin" },
  { label: "Italy", description: "The Boot", value: "IT", icon: "i-ph-map-pin" },
  { label: "Spain", description: "The Bull Skin", value: "ES", icon: "i-ph-map-pin" },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic listbox</h3>
      <p class="demo-description">A simple single-select dropdown using <code>v-model</code> with an array of objects.</p>
      <CodeCollapsible
        :code="`const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Orange', value: 'orange' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pineapple', value: 'pineapple' },
]
const fruit = ref('')

<UListbox
  v-model=&quot;fruit&quot;
  :items=&quot;items&quot;
  value-key=&quot;value&quot;
  class=&quot;w-full&quot;
  placeholder=&quot;Pick a fruit&quot;
/>`"
      >
        <div class="demo-col">
          <UListbox
            v-model="singleValue"
            :items="fruits"
            value-key="value"
            class="w-full"
            placeholder="Pick a fruit"
          />
          <p v-if="singleValue" class="demo-selected">Selected: {{ singleValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple selection</h3>
      <p class="demo-description">Enables selecting multiple items with the <code>multiple</code> prop.</p>
      <CodeCollapsible
        :code="`const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Orange', value: 'orange' },
]
const selected = ref<string[]>([])

<UListbox
  v-model=&quot;selected&quot;
  :items=&quot;items&quot;
  value-key=&quot;value&quot;
  multiple
  class=&quot;w-full&quot;
  placeholder=&quot;Pick fruits&quot;
/>`"
      >
        <div class="demo-col">
          <UListbox
            v-model="multiValue"
            :items="fruits"
            value-key="value"
            multiple
            class="w-full"
            placeholder="Pick fruits"
          />
          <p v-if="multiValue.length" class="demo-selected">Selected: {{ multiValue.join(", ") }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With objects and value-key</h3>
      <p class="demo-description">Maps display labels and values using <code>label-key</code> and <code>value-key</code> for object items.</p>
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
  class=&quot;w-full&quot;
  placeholder=&quot;Select a country&quot;
/>`"
      >
        <div class="demo-col">
          <UListbox
            v-model="countryValue"
            :items="countries"
            value-key="code"
            label-key="name"
            class="w-full"
            placeholder="Select a country"
          />
          <p v-if="countryValue" class="demo-selected">Code: {{ countryValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With search filter</h3>
      <p class="demo-description">Enables in-listbox search filtering with the <code>filter</code> prop.</p>
      <CodeCollapsible
        :code="`const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Orange', value: 'orange' },
]
const fruit = ref('')

<UListbox
  v-model=&quot;fruit&quot;
  :items=&quot;items&quot;
  value-key=&quot;value&quot;
  filter
  class=&quot;w-full&quot;
  placeholder=&quot;Search fruit...&quot;
/>`"
      >
        <div class="demo-col">
          <UListbox
            v-model="filterValue"
            :items="fruits"
            value-key="value"
            filter
            class="w-full"
            placeholder="Search fruit..."
          />
          <p v-if="filterValue" class="demo-selected">Picked: {{ filterValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With icons and descriptions</h3>
      <p class="demo-description">Each item can display an icon and a supporting description alongside its label.</p>
      <CodeCollapsible
        :code="`const items = [
  { label: 'France', description: 'The Hexagon', icon: 'i-ph-map-pin', value: 'FR' },
  { label: 'Germany', description: 'The Federal Republic', icon: 'i-ph-map-pin', value: 'DE' },
  { label: 'Italy', description: 'The Boot', icon: 'i-ph-map-pin', value: 'IT' },
  { label: 'Spain', description: 'The Bull Skin', icon: 'i-ph-map-pin', value: 'ES' },
]
const country = ref('')

<UListbox
  v-model=&quot;country&quot;
  :items=&quot;items&quot;
  value-key=&quot;value&quot;
  class=&quot;w-full&quot;
/>`"
      >
        <div class="demo-col">
          <UListbox
            v-model="descValue"
            :items="countryList"
            value-key="value"
            class="w-full"
          />
          <p v-if="descValue" class="demo-selected">Code: {{ descValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Selected icon</h3>
      <p class="demo-description">Customizes the icon shown for the currently selected item with <code>selected-icon</code>.</p>
      <CodeCollapsible
        :code="`const items = [
  { label: 'Backlog', icon: 'i-ph-circle-help', value: 'backlog' },
  { label: 'Todo', icon: 'i-ph-circle-plus', value: 'todo' },
  { label: 'In Progress', icon: 'i-ph-circle-arrow-up', value: 'in_progress' },
  { label: 'Done', icon: 'i-ph-circle-check', value: 'done' },
]
const status = ref('')

<UListbox
  v-model=&quot;status&quot;
  :items=&quot;items&quot;
  value-key=&quot;value&quot;
  selected-icon=&quot;i-ph-flame&quot;
  class=&quot;w-full&quot;
/>`"
      >
        <div class="demo-col">
          <UListbox
            v-model="iconValue"
            :items="fruitIcons"
            value-key="value"
            selected-icon="i-ph-flame"
            class="w-full"
            placeholder="Select a status"
          />
          <p v-if="iconValue" class="demo-selected">Selected: {{ iconValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Four size variants: sm, md, lg, and xl for different UI densities.</p>
      <CodeCollapsible
        :code="`const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grapes', value: 'grapes' },
]

<UListbox size=&quot;sm&quot; :items=&quot;items&quot; value-key=&quot;value&quot; class=&quot;w-full&quot; placeholder=&quot;Small&quot; />
<UListbox size=&quot;md&quot; :items=&quot;items&quot; value-key=&quot;value&quot; class=&quot;w-full&quot; placeholder=&quot;Medium&quot; />
<UListbox size=&quot;lg&quot; :items=&quot;items&quot; value-key=&quot;value&quot; class=&quot;w-full&quot; placeholder=&quot;Large&quot; />
<UListbox size=&quot;xl&quot; :items=&quot;items&quot; value-key=&quot;value&quot; class=&quot;w-full&quot; placeholder=&quot;Extra large&quot; />`"
      >
        <div class="demo-col">
          <UListbox v-model="sizeSm" size="sm" :items="fruits" value-key="value" class="w-full" placeholder="Small" />
          <UListbox v-model="sizeMd" size="md" :items="fruits" value-key="value" class="w-full" placeholder="Medium" />
          <UListbox v-model="sizeLg" size="lg" :items="fruits" value-key="value" class="w-full" placeholder="Large" />
          <UListbox v-model="sizeXl" size="xl" :items="fruits" value-key="value" class="w-full" placeholder="Extra large" />
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
