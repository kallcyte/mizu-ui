<script setup lang="ts">
import { MizuDivider } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicCode = `<p>Content above</p>
<MizuDivider />
<p>Content below</p>`;

const withLabelCode = `<p>Section above</p>
<MizuDivider label="OR" />
<p>Section below</p>`;

const verticalCode = `<span>Left</span>
<MizuDivider orientation="vertical" />
<span>Center</span>
<MizuDivider orientation="vertical" />
<span>Right</span>`;

const inContextCode = `<div class="card">
  <div>Header Section</div>
  <MizuDivider />
  <div>Body content goes here.</div>
  <MizuDivider />
  <div>Footer Section</div>
</div>`;
</script>

<template>
  <div class="divider-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <p>Content above</p>
        <MizuDivider />
        <p>Content below</p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Label</h3>
      <CodeCollapsible :code="withLabelCode">
        <p>Section above</p>
        <MizuDivider label="OR" />
        <p>Section below</p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Vertical</h3>
      <CodeCollapsible :code="verticalCode">
        <div class="vertical-row">
          <span>Left</span>
          <MizuDivider orientation="vertical" />
          <span>Center</span>
          <MizuDivider orientation="vertical" />
          <span>Right</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>In Context</h3>
      <CodeCollapsible :code="inContextCode">
        <div class="context-card">
          <div class="context-header">Header Section</div>
          <MizuDivider />
          <div class="context-body">Body content goes here.</div>
          <MizuDivider />
          <div class="context-footer">Footer Section</div>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.divider-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.divider-examples :deep(*) {
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

.example-section p {
  font-size: 13px;
  color: var(--sl-color-text-light);
}

.vertical-row {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 40px;
}
.vertical-row span {
  font-size: 13px;
  color: var(--sl-color-text-light);
}

.context-card {
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 6px;
  overflow: hidden;
}
.context-header,
.context-body,
.context-footer {
  padding: 10px 14px;
  font-size: 13px;
  color: var(--sl-color-text);
}
.context-body {
  background: var(--sl-color-gray-1);
}
</style>
