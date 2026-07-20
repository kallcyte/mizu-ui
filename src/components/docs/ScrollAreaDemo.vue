<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const items = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  label: `Item ${i + 1}`,
}));

const largeItems = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  label: `Item ${i + 1}`,
}));

const lanes = ref(3);

const basicCode = `<UScrollArea :items="items" class="h-64 w-full max-w-xs border rounded-lg">
  <template #default="{ item }">
    <div class="px-4 py-3 border-b text-sm">{{ item.label }}</div>
  </template>
</UScrollArea>`;

const orientationCode = `<UScrollArea :items="items" orientation="horizontal" class="w-full max-w-lg">
  <template #default="{ item }">
    <div class="px-4 py-3 border-r text-sm whitespace-nowrap">{{ item.label }}</div>
  </template>
</UScrollArea>`;

const virtualizeCode = `<UScrollArea :items="largeItems" virtualize class="h-64 w-full max-w-xs border rounded-lg">
  <template #default="{ item }">
    <div class="px-4 py-3 border-b text-sm">{{ item.label }}</div>
  </template>
</UScrollArea>`;

const shadowCode = `<UScrollArea :items="items" shadow class="h-64 w-full max-w-xs border rounded-lg">
  <template #default="{ item }">
    <div class="px-4 py-3 border-b text-sm">{{ item.label }}</div>
  </template>
</UScrollArea>`;

const customCode = `<UScrollArea class="h-64 w-full max-w-xs border rounded-lg p-4">
  <p class="text-sm mb-2">Custom scrollable content with any HTML or components.</p>
  <div v-for="i in 10" :key="i" class="p-3 mb-2 bg-surface-subtle rounded text-sm">
    Custom block {{ i }}
  </div>
</UScrollArea>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A scrollable container with a list of items, using <code>:items</code> to bind data and the default slot for rendering each item.</p>
      <CodeCollapsible :code="basicCode">
        <UScrollArea :items="items" class="h-64 w-full max-w-xs border rounded-lg">
          <template #default="{ item }">
            <div class="px-4 py-3 border-b text-sm">{{ item.label }}</div>
          </template>
        </UScrollArea>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Horizontal</h3>
      <p class="demo-description">Horizontal scrolling with <code>orientation="horizontal"</code>, useful for tab bars, tag lists, or wide content.</p>
      <CodeCollapsible :code="orientationCode">
        <UScrollArea :items="items" orientation="horizontal" class="w-full max-w-lg">
          <template #default="{ item }">
            <div class="px-4 py-3 border-r text-sm whitespace-nowrap">{{ item.label }}</div>
          </template>
        </UScrollArea>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Virtualized (5,000 items)</h3>
      <p class="demo-description">Virtualized rendering for large datasets via the <code>virtualize</code> prop, keeping only visible items in the DOM for smooth performance.</p>
      <CodeCollapsible :code="virtualizeCode">
        <UScrollArea :items="largeItems" virtualize class="h-64 w-full max-w-xs border rounded-lg">
          <template #default="{ item }">
            <div class="px-4 py-3 border-b text-sm">{{ item.label }}</div>
          </template>
        </UScrollArea>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Shadow</h3>
      <p class="demo-description">Adds a scroll shadow indicator using the <code>shadow</code> prop to hint at overflow content at the edges.</p>
      <CodeCollapsible :code="shadowCode">
        <UScrollArea :items="items" shadow class="h-64 w-full max-w-xs border rounded-lg">
          <template #default="{ item }">
            <div class="px-4 py-3 border-b text-sm">{{ item.label }}</div>
          </template>
        </UScrollArea>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Content (Default Slot)</h3>
      <p class="demo-description">Use the default slot for arbitrary HTML or components when you don't need item-based rendering.</p>
      <CodeCollapsible :code="customCode">
        <UScrollArea class="h-64 w-full max-w-xs border rounded-lg p-4">
          <p class="text-sm mb-2">Custom scrollable content with any HTML or components.</p>
          <div v-for="i in 10" :key="i" class="p-3 mb-2 bg-surface-subtle rounded text-sm">
            Custom block {{ i }}
          </div>
        </UScrollArea>
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
.demo-description {
  font-size: 13px;
  color: var(--sl-color-text-light);
  margin: 0;
  line-height: 1.5;
}
.demo-description code {
  font-size: 12px;
  background: var(--color-surface-muted, #F3F4F6);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
