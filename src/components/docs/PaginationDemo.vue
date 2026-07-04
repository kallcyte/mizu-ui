<script setup lang="ts">
import { ref } from "vue";
import { MizuPagination } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const basicCode = `<MizuPagination v-model:page="page" :total="10" />`;

const edgesCode = `<MizuPagination v-model:page="page" :total="20" :show-edges="true" />`;

const siblingsCode = `<MizuPagination v-model:page="page" :total="20" :sibling-count="2" :show-edges="true" />`;

const sizesCode = `<MizuPagination v-model:page="page" :total="10" size="sm" />
<MizuPagination v-model:page="page" :total="10" size="md" />
<MizuPagination v-model:page="page" :total="10" size="lg" />`;

const manyCode = `<MizuPagination v-model:page="page" :total="100" :sibling-count="1" :show-edges="true" />`;

const page1 = ref(1);
const page2 = ref(1);
const page3 = ref(1);
const page4 = ref(1);
const page5 = ref(1);
</script>

<template>
  <div class="pagination-demo not-content">
    <div class="demo-section">
      <h3>Basic</h3>
      <DemoTabs :code="basicCode">
      <MizuPagination v-model:page="page1" :total="10" />
      <span class="page-info">Page {{ page1 }} of 10</span>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>With Edges</h3>
      <DemoTabs :code="edgesCode">
      <MizuPagination v-model:page="page2" :total="20" :show-edges="true" />
      <span class="page-info">Page {{ page2 }} of 20</span>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>More Siblings</h3>
      <DemoTabs :code="siblingsCode">
      <MizuPagination v-model:page="page3" :total="20" :sibling-count="2" :show-edges="true" />
      <span class="page-info">Page {{ page3 }} of 20</span>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <DemoTabs :code="sizesCode">
      <div class="size-row">
        <span class="label">Small</span>
        <MizuPagination v-model:page="page4" :total="10" size="sm" />
      </div>
      <div class="size-row">
        <span class="label">Medium</span>
        <MizuPagination v-model:page="page4" :total="10" size="md" />
      </div>
      <div class="size-row">
        <span class="label">Large</span>
        <MizuPagination v-model:page="page4" :total="10" size="lg" />
      </div>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Many Pages</h3>
      <DemoTabs :code="manyCode">
      <MizuPagination v-model:page="page5" :total="100" :sibling-count="1" :show-edges="true" />
      <span class="page-info">Page {{ page5 }} of 100</span>
      </DemoTabs>
    </div>
  </div>
</template>

<style scoped>
.pagination-demo {
  all: revert;
  font-family: var(--font-family-sans);
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: transparent;

  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
}
.pagination-demo :deep(*) { margin: 0; }

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin-bottom: 0;
}
.demo-section > div {
  margin-top: 0;
}

.page-info {
  font-size: 12px;
  color: var(--sl-color-text-light);
}

.size-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.size-row .label {
  font-size: 12px;
  font-weight: 500;
  color: var(--sl-color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
