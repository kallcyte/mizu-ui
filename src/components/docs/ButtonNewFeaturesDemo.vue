<script setup lang="ts">
import { MizuButton } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";
import { Plus, X, Save, Check } from "@lucide/vue";

const simulateAsync = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
};

const blockCode = `<MizuButton variant="primary" block>Full Width Primary</MizuButton>
<MizuButton variant="outline" block>Full Width Outline</MizuButton>
<MizuButton variant="ghost" block>Full Width Ghost</MizuButton>`;

const squareCode = `<MizuButton variant="primary" square size="sm">
  <template #leading-icon><Plus /></template>
</MizuButton>
<MizuButton variant="accent" square size="md">
  <template #leading-icon><Plus /></template>
</MizuButton>
<MizuButton variant="outline" square size="lg">
  <template #leading-icon><Plus /></template>
</MizuButton>
<MizuButton variant="ghost" square size="md">
  <template #leading-icon><X /></template>
</MizuButton>`;

const loadingAutoCode = `<MizuButton variant="primary" loading-auto @click="simulateAsync">
  <template #leading-icon><Save /></template>
  Save (2s delay)
</MizuButton>
<MizuButton variant="success" loading-auto @click="simulateAsync">
  <template #leading-icon><Check /></template>
  Confirm
</MizuButton>`;
</script>

<template>
  <div class="button-new-demo not-content">
    <div class="demo-section">
      <h3>Block (Full Width)</h3>
      <DemoTabs :code="blockCode">
      <div class="button-row" style="flex-direction: column; width: 100%;">
        <MizuButton variant="primary" block>Full Width Primary</MizuButton>
        <MizuButton variant="outline" block>Full Width Outline</MizuButton>
        <MizuButton variant="ghost" block>Full Width Ghost</MizuButton>
      </div>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Square (Icon Only)</h3>
      <DemoTabs :code="squareCode">
      <div class="button-row">
        <MizuButton variant="primary" square size="sm">
          <template #leading-icon><Plus /></template>
        </MizuButton>
        <MizuButton variant="accent" square size="md">
          <template #leading-icon><Plus /></template>
        </MizuButton>
        <MizuButton variant="outline" square size="lg">
          <template #leading-icon><Plus /></template>
        </MizuButton>
        <MizuButton variant="ghost" square size="md">
          <template #leading-icon><X /></template>
        </MizuButton>
      </div>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Loading Auto (async click)</h3>
      <DemoTabs :code="loadingAutoCode">
      <div class="button-row">
        <MizuButton variant="primary" loading-auto @click="simulateAsync">
          <template #leading-icon><Save /></template>
          Save (2s delay)
        </MizuButton>
        <MizuButton variant="success" loading-auto @click="simulateAsync">
          <template #leading-icon><Check /></template>
          Confirm
        </MizuButton>
      </div>
      </DemoTabs>
    </div>
  </div>
</template>

<style scoped>
.button-new-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
  background: transparent;
}

.button-new-demo :deep(*) {
  margin: 0;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin-bottom: 0;
  margin-top: 0;
}

.demo-section > div {
  margin-top: 0;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
}
</style>
