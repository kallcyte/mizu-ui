<script setup lang="ts">
import { ref } from "vue";
import { MizuPagination } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicCode = `<MizuPagination v-model:page="page1" :total="10" />`;

const edgesCode = `<MizuPagination v-model:page="page2" :total="20" :show-edges="true" />`;

const siblingsCode = `<MizuPagination v-model:page="page3" :total="20" :sibling-count="2" :show-edges="true" />`;

const sizesCode = `<MizuPagination v-model:page="page4" :total="10" size="sm" />
<MizuPagination v-model:page="page4" :total="10" size="md" />
<MizuPagination v-model:page="page4" :total="10" size="lg" />`;

const manyCode = `<MizuPagination v-model:page="page5" :total="100" :sibling-count="1" :show-edges="true" />`;

const page1 = ref(1);
const page2 = ref(1);
const page3 = ref(1);
const page4 = ref(1);
const page5 = ref(1);
</script>

<template>
  <div class="pagination-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <MizuPagination v-model:page="page1" :total="10" />
        <span class="page-info">Page {{ page1 }} of 10</span>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Edges</h3>
      <CodeCollapsible :code="edgesCode">
        <MizuPagination v-model:page="page2" :total="20" :show-edges="true" />
        <span class="page-info">Page {{ page2 }} of 20</span>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>More Siblings</h3>
      <CodeCollapsible :code="siblingsCode">
        <MizuPagination v-model:page="page3" :total="20" :sibling-count="2" :show-edges="true" />
        <span class="page-info">Page {{ page3 }} of 20</span>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
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
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Many Pages</h3>
      <CodeCollapsible :code="manyCode">
        <MizuPagination v-model:page="page5" :total="100" :sibling-count="1" :show-edges="true" />
        <span class="page-info">Page {{ page5 }} of 100</span>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.pagination-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.pagination-examples :deep(*) { margin: 0; }
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
