<script setup lang="ts">
import { ref } from "vue";
import {
  MizuNumberFieldRoot,
  MizuNumberFieldInput,
  MizuNumberFieldIncrement,
  MizuNumberFieldDecrement,
} from "@mizu/vue";

const age = ref(25);
const price = ref(19.99);
const percent = ref(0.05);
</script>

<template>
  <div class="number-field-demo">
    <div class="demo-section">
      <h3>Basic</h3>
      <MizuNumberFieldRoot v-model="age" :min="0" :max="150">
        <div class="number-field-group">
          <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
          <MizuNumberFieldInput />
          <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
        </div>
      </MizuNumberFieldRoot>
      <p class="demo-hint">Value: {{ age }}</p>
    </div>

    <div class="demo-section">
      <h3>Currency</h3>
      <MizuNumberFieldRoot v-model="price" :min="0" :step="0.01" :format-options="{ style: 'currency', currency: 'USD' }">
        <div class="number-field-group">
          <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
          <MizuNumberFieldInput />
          <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
        </div>
      </MizuNumberFieldRoot>
      <p class="demo-hint">Value: {{ price }}</p>
    </div>

    <div class="demo-section">
      <h3>Percentage</h3>
      <MizuNumberFieldRoot v-model="percent" :min="0" :max="1" :step="0.01" :format-options="{ style: 'percent' }">
        <div class="number-field-group">
          <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
          <MizuNumberFieldInput />
          <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
        </div>
      </MizuNumberFieldRoot>
      <p class="demo-hint">Value: {{ percent }}</p>
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
  background: var(--sl-color-gray-2);
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
