<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";

const items = [
  { label: "Research", description: "User research and requirements gathering phase.", date: "Jan 2024", value: "research" },
  { label: "Design", description: "UI/UX design and prototyping completed.", date: "Mar 2024", value: "design" },
  { label: "Development", description: "Core features implemented and tested.", date: "Jun 2024", value: "development" },
  { label: "Launch", description: "Product launched to production.", date: "Sep 2024", value: "launch" },
];

const verticalCode = `<UTimeline :items="items" />`;

const horizontalCode = `<UTimeline :items="items" orientation="horizontal" />`;

const colorsCode = `<UTimeline :items="items" color="primary" />
<UTimeline :items="items" color="success" />
<UTimeline :items="items" color="warning" />
<UTimeline :items="items" color="error" />`;

const sizesCode = `<UTimeline :items="items" size="sm" />
<UTimeline :items="items" size="md" />
<UTimeline :items="items" size="lg" />`;

const customSlotsCode = `<UTimeline :items="items">
  <template #indicator="{ item }">
    <UIcon :name="item.icon" class="size-5" />
  </template>
  <template #date="{ item }">
    <span class="text-brand-ycp">{{ item.date }}</span>
  </template>
</UTimeline>`;

const reverseCode = `<UTimeline :items="items" reverse />`;
</script>

<template>
  <div class="timeline-examples">
    <section class="example-section">
      <h3>Vertical (Default)</h3>
      <p class="demo-description">Display chronological events in a vertical stack. Each item supports <code>label</code>, <code>description</code>, and <code>date</code>.</p>
      <CodeCollapsible :code="verticalCode">
        <div class="demo-row">
          <UTimeline :items="items" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Horizontal</h3>
      <p class="demo-description">Arrange timeline events side-by-side using <code>orientation="horizontal"</code> for space-efficient layouts.</p>
      <CodeCollapsible :code="horizontalCode">
        <div class="demo-row">
          <UTimeline :items="items" orientation="horizontal" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <p class="demo-description">Change the accent color with the <code>color</code> prop — supports <code>primary</code>, <code>success</code>, <code>warning</code>, and <code>error</code>.</p>
      <CodeCollapsible :code="colorsCode">
        <div class="timeline-grid">
          <UTimeline :items="items" color="primary" />
          <UTimeline :items="items" color="success" />
          <UTimeline :items="items" color="warning" />
          <UTimeline :items="items" color="error" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Control indicator and text sizing with the <code>size</code> prop — available in <code>sm</code>, <code>md</code>, and <code>lg</code>.</p>
      <CodeCollapsible :code="sizesCode">
        <div class="timeline-grid">
          <UTimeline :items="items" size="sm" />
          <UTimeline :items="items" size="md" />
          <UTimeline :items="items" size="lg" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Slots</h3>
      <p class="demo-description">Override indicator and date rendering using <code>#indicator</code> and <code>#date</code> named slots for custom content.</p>
      <CodeCollapsible :code="customSlotsCode">
        <div class="demo-row">
          <UTimeline :items="items" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Reversed</h3>
      <p class="demo-description">Reverse the display order with the <code>reverse</code> prop to show the latest item first.</p>
      <CodeCollapsible :code="reverseCode">
        <div class="demo-row">
          <UTimeline :items="items" reverse class="w-full" />
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.timeline-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.timeline-examples :deep(*) {
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
.demo-row {
  all: revert;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.timeline-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
