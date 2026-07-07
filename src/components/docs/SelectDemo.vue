<script setup lang="ts">
import { ref } from "vue";
import { MizuSelect, MizuButton } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicCode = `<MizuSelect v-model="basicSelected" :options="fruitOptions" />
<MizuSelect v-model="withPlaceholder" :options="fruitOptions" placeholder="Choose a fruit..." />
<MizuSelect v-model="withLabel" :options="fruitOptions" label="Favorite fruit" />`;

const sizesCode = `<MizuSelect v-model="sizeSm" :options="sizeOptions" size="sm" label="Small" />
<MizuSelect v-model="sizeMd" :options="sizeOptions" size="md" label="Medium" />
<MizuSelect v-model="sizeLg" :options="sizeOptions" size="lg" label="Large" />`;

const statesCode = `<MizuSelect v-model="errorSelected" :options="fruitOptions" label="With Error" error helper-text="This field has an error" />
<MizuSelect v-model="disabledSelected" :options="countryOptions" label="Disabled" disabled />`;

const formCode = `<MizuSelect
  v-model="country"
  :options="countryOptions"
  label="Country"
  placeholder="Select your country..."
  required
/>
<MizuSelect
  v-model="category"
  :options="[
    { value: 'general', label: 'General' },
    { value: 'support', label: 'Support' },
    { value: 'billing', label: 'Billing' },
  ]"
  label="Category"
  placeholder="Choose category..."
/>
<div>
  <MizuButton size="sm" @click="handleSubmit">Submit</MizuButton>
</div>`;

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "jp", label: "Japan" },
  { value: "de", label: "Germany" },
];

const sizeOptions = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

const basicSelected = ref("");
const withPlaceholder = ref("");
const withLabel = ref("orange");

const sizeSm = ref("");
const sizeMd = ref("md");
const sizeLg = ref("");

const errorSelected = ref("");
const disabledSelected = ref("us");

const country = ref("");
const category = ref("");

function handleSubmit() {
  alert(`Country: ${country.value}\nCategory: ${category.value}`);
}
</script>

<template>
  <div class="select-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <div class="select-stack">
          <MizuSelect v-model="basicSelected" :options="fruitOptions" />
          <MizuSelect v-model="withPlaceholder" :options="fruitOptions" placeholder="Choose a fruit..." />
          <MizuSelect v-model="withLabel" :options="fruitOptions" label="Favorite fruit" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="select-stack">
          <MizuSelect v-model="sizeSm" :options="sizeOptions" size="sm" label="Small" />
          <MizuSelect v-model="sizeMd" :options="sizeOptions" size="md" label="Medium" />
          <MizuSelect v-model="sizeLg" :options="sizeOptions" size="lg" label="Large" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>States</h3>
      <CodeCollapsible :code="statesCode">
        <div class="select-stack">
          <MizuSelect v-model="errorSelected" :options="fruitOptions" label="With Error" error helper-text="This field has an error" />
          <MizuSelect v-model="disabledSelected" :options="countryOptions" label="Disabled" disabled />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Form Example</h3>
      <CodeCollapsible :code="formCode">
        <div class="select-stack">
          <MizuSelect
            v-model="country"
            :options="countryOptions"
            label="Country"
            placeholder="Select your country..."
            required
          />
          <MizuSelect
            v-model="category"
            :options="[
              { value: 'general', label: 'General' },
              { value: 'support', label: 'Support' },
              { value: 'billing', label: 'Billing' },
            ]"
            label="Category"
            placeholder="Choose category..."
          />
          <div>
            <MizuButton size="sm" @click="handleSubmit">Submit</MizuButton>
          </div>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.select-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.select-examples :deep(*) {
  margin: 0;
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

.select-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 320px;
}
</style>
