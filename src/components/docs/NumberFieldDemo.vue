<script setup lang="ts">
import { ref } from "vue";
import {
  MizuNumberFieldRoot,
  MizuNumberFieldInput,
  MizuNumberFieldIncrement,
  MizuNumberFieldDecrement,
} from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicCode = `<MizuNumberFieldRoot v-model="age" :min="0" :max="150">
  <div class="number-field-group">
    <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
    <MizuNumberFieldInput />
    <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
  </div>
</MizuNumberFieldRoot>
<p class="demo-hint">Value: {{ age }}</p>`;

const currencyCode = `<MizuNumberFieldRoot
  v-model="price"
  :min="0"
  :step="0.01"
  :format-options="{ style: 'currency', currency: 'USD' }"
>
  <div class="number-field-group">
    <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
    <MizuNumberFieldInput />
    <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
  </div>
</MizuNumberFieldRoot>
<p class="demo-hint">Value: {{ price }}</p>`;

const percentCode = `<MizuNumberFieldRoot
  v-model="percent"
  :min="0"
  :max="1"
  :step="0.01"
  :format-options="{ style: 'percent' }"
>
  <div class="number-field-group">
    <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
    <MizuNumberFieldInput />
    <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
  </div>
</MizuNumberFieldRoot>
<p class="demo-hint">Value: {{ percent }}</p>`;

const age = ref(25);
const price = ref(19.99);
const percent = ref(0.05);
</script>

<template>
  <div class="number-field-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <MizuNumberFieldRoot v-model="age" :min="0" :max="150">
          <div class="number-field-group">
            <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
            <MizuNumberFieldInput />
            <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
          </div>
        </MizuNumberFieldRoot>
        <p class="demo-hint">Value: {{ age }}</p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Currency</h3>
      <CodeCollapsible :code="currencyCode">
        <MizuNumberFieldRoot v-model="price" :min="0" :step="0.01" :format-options="{ style: 'currency', currency: 'USD' }">
          <div class="number-field-group">
            <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
            <MizuNumberFieldInput />
            <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
          </div>
        </MizuNumberFieldRoot>
        <p class="demo-hint">Value: {{ price }}</p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Percentage</h3>
      <CodeCollapsible :code="percentCode">
        <MizuNumberFieldRoot v-model="percent" :min="0" :max="1" :step="0.01" :format-options="{ style: 'percent' }">
          <div class="number-field-group">
            <MizuNumberFieldDecrement>−</MizuNumberFieldDecrement>
            <MizuNumberFieldInput />
            <MizuNumberFieldIncrement>+</MizuNumberFieldIncrement>
          </div>
        </MizuNumberFieldRoot>
        <p class="demo-hint">Value: {{ percent }}</p>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.number-field-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.number-field-examples :deep(*) {
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
