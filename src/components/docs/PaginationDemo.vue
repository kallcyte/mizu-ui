<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const currentPage = ref(1);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;50&quot; :page-size=&quot;10&quot; />`">
        <div class="demo-col">
          <UPagination v-model:page="currentPage" :total="50" :page-size="10" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Ellipsis</h3>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;200&quot; :page-size=&quot;10&quot; />`">
        <div class="demo-col">
          <UPagination v-model:page="currentPage" :total="200" :page-size="10" />
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 8px;
}
</style>
