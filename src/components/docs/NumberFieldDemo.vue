<script setup lang="ts">
import { ref } from "vue";
import {
  MizuNumberFieldRoot,
  MizuNumberFieldInput,
  MizuNumberFieldIncrement,
  MizuNumberFieldDecrement,
} from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const basicCode = `<MizuNumberFieldRoot v-model="age" :min="0" :max="150">
  <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
  <MizuNumberFieldInput />
  <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
</MizuNumberFieldRoot>`;

const currencyCode = `<MizuNumberFieldRoot
  v-model="price"
  :min="0"
  :step="0.01"
  :format-options="{ style: 'currency', currency: 'USD' }"
>
  <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
  <MizuNumberFieldInput />
  <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
</MizuNumberFieldRoot>`;

const percentCode = `<MizuNumberFieldRoot
  v-model="percent"
  :min="0"
  :max="1"
  :step="0.01"
  :format-options="{ style: 'percent' }"
>
  <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
  <MizuNumberFieldInput />
  <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
</MizuNumberFieldRoot>`;

const age = ref(25);
const price = ref(19.99);
const percent = ref(0.05);
</script>

<template>
  <div class="number-field-demo not-content">
    <div class="demo-section">
      <h3>Basic</h3>
      <DemoTabs :code="basicCode">
      <MizuNumberFieldRoot v-model="age" :min="0" :max="150">
        <div class="number-field-group">
          <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
          <MizuNumberFieldInput />
          <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
        </div>
      </MizuNumberFieldRoot>
      <p class="demo-hint">Value: {{ age }}</p>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Currency</h3>
      <DemoTabs :code="currencyCode">
      <MizuNumberFieldRoot v-model="price" :min="0" :step="0.01" :format-options="{ style: 'currency', currency: 'USD' }">
        <div class="number-field-group">
          <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
          <MizuNumberFieldInput />
          <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
        </div>
      </MizuNumberFieldRoot>
      <p class="demo-hint">Value: {{ price }}</p>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Percentage</h3>
      <DemoTabs :code="percentCode">
      <MizuNumberFieldRoot v-model="percent" :min="0" :max="1" :step="0.01" :format-options="{ style: 'percent' }">
        <div class="number-field-group">
          <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
          <MizuNumberFieldInput />
          <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
        </div>
      </MizuNumberFieldRoot>
      <p class="demo-hint">Value: {{ percent }}</p>
      </DemoTabs>
    </div>
  </div>
</template>

<style scoped>
.number-field-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: transparent;

  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-section > * {
  margin-top: 0;
}

.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}

.demo-hint {
  all: revert;
  font-size: 12px;
  color: var(--sl-color-text) !important;
  margin: 0;
}

.number-field-group {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-surface-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-surface-base);
}
</style>
