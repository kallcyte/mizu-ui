<script setup lang="ts">
import { ref } from "vue";
import { MizuRadio } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const basicCode = `<MizuRadio
  v-model="basicSelected"
  :items="basicOptions"
  name="basic"
/>`;

const sizesCode = `<MizuRadio
  v-model="sizeSelected"
  :items="sizeOptions"
  size="md"
  label="Select size"
  name="sizes"
/>`;

const labelCode = `<MizuRadio
  v-model="colorSelected"
  :items="colorOptions"
  label="Favorite color"
  name="color"
/>`;

const disabledCode = `<MizuRadio
  v-model="disabledSelected"
  :items="disabledOptions"
  label="Choose an option"
  name="disabled-test"
/>`;

const horizontalCode = `<MizuRadio
  v-model="horizontalSelected"
  :items="basicOptions"
  orientation="horizontal"
  name="horizontal"
/>`;

const formCode = `<MizuRadio
  v-model="fruitSelected"
  :items="fruitOptions"
  label="Select a fruit"
  name="fruit"
  required
/>`;

const sizeOptions = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

const basicOptions = [
  { value: "option-1", label: "First option" },
  { value: "option-2", label: "Second option" },
  { value: "option-3", label: "Third option" },
];

const colorOptions = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

const disabledOptions = [
  { value: "normal", label: "Normal option" },
  { value: "disabled-item", label: "Disabled option", disabled: true },
  { value: "another", label: "Another option" },
];

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

const basicSelected = ref("option-1");
const colorSelected = ref("blue");
const disabledSelected = ref("normal");
const sizeSelected = ref("md");
const fruitSelected = ref("apple");
const horizontalSelected = ref("option-1");
</script>

<template>
  <div class="radio-demo not-content">
    <div class="demo-section">
      <h3>Basic</h3>
      <DemoTabs :code="basicCode">
      <MizuRadio
        v-model="basicSelected"
        :items="basicOptions"
        name="basic"
      />
      <p class="demo-text">Selected: <code>{{ basicSelected }}</code></p>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <DemoTabs :code="sizesCode">
      <MizuRadio
        v-model="sizeSelected"
        :items="sizeOptions"
        size="md"
        label="Select size"
        name="sizes"
      />
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>With Label</h3>
      <DemoTabs :code="labelCode">
      <MizuRadio
        v-model="colorSelected"
        :items="colorOptions"
        label="Favorite color"
        name="color"
      />
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Disabled Item</h3>
      <DemoTabs :code="disabledCode">
      <MizuRadio
        v-model="disabledSelected"
        :items="disabledOptions"
        label="Choose an option"
        name="disabled-test"
      />
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Horizontal Orientation</h3>
      <DemoTabs :code="horizontalCode">
      <MizuRadio
        v-model="horizontalSelected"
        :items="basicOptions"
        orientation="horizontal"
        name="horizontal"
      />
      <p class="demo-text">Selected: <code>{{ horizontalSelected }}</code></p>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Form Example</h3>
      <DemoTabs :code="formCode">
      <MizuRadio
        v-model="fruitSelected"
        :items="fruitOptions"
        label="Select a fruit"
        name="fruit"
        required
      />
      <p class="demo-text">Selected: <code>{{ fruitSelected }}</code></p>
      </DemoTabs>
    </div>
  </div>
</template>

<style scoped>
.radio-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: transparent;
  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
}

.radio-demo :deep(*) {
  margin: 0;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin-bottom: 0;
  margin-top: 0;
}

.demo-text {
  font-size: 12px;
  color: var(--sl-color-text);
  margin: 0;
}

.demo-text code {
  background: var(--sl-color-gray-3);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: var(--sl-font-mono);
  font-size: 12px;
}
</style>
