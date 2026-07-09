<script setup lang="ts">
import { ref } from "vue";
import { MizuRadio } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

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
  <div class="radio-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <MizuRadio v-model="basicSelected" :items="basicOptions" name="basic" />
        <p class="demo-text">
          Selected: <code>{{ basicSelected }}</code>
        </p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <MizuRadio
          v-model="sizeSelected"
          :items="sizeOptions"
          size="md"
          label="Select size"
          name="sizes"
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Label</h3>
      <CodeCollapsible :code="labelCode">
        <MizuRadio
          v-model="colorSelected"
          :items="colorOptions"
          label="Favorite color"
          name="color"
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled Item</h3>
      <CodeCollapsible :code="disabledCode">
        <MizuRadio
          v-model="disabledSelected"
          :items="disabledOptions"
          label="Choose an option"
          name="disabled-test"
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Horizontal Orientation</h3>
      <CodeCollapsible :code="horizontalCode">
        <MizuRadio
          v-model="horizontalSelected"
          :items="basicOptions"
          orientation="horizontal"
          name="horizontal"
        />
        <p class="demo-text">
          Selected: <code>{{ horizontalSelected }}</code>
        </p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Form Example</h3>
      <CodeCollapsible :code="formCode">
        <MizuRadio
          v-model="fruitSelected"
          :items="fruitOptions"
          label="Select a fruit"
          name="fruit"
          required
        />
        <p class="demo-text">
          Selected: <code>{{ fruitSelected }}</code>
        </p>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.radio-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.radio-examples :deep(*) {
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
