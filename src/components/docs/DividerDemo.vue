<script setup lang="ts">
import { MizuDivider } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

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
  <div class="divider-demo not-content">
    <DemoTabs :code="basicCode">
    <div class="demo-section">
      <h3>Basic</h3>
      <p>Content above</p>
      <MizuDivider />
      <p>Content below</p>
    </div>
    </DemoTabs>

    <DemoTabs :code="withLabelCode">
    <div class="demo-section">
      <h3>With Label</h3>
      <p>Section above</p>
      <MizuDivider label="OR" />
      <p>Section below</p>
    </div>
    </DemoTabs>

    <DemoTabs :code="verticalCode">
    <div class="demo-section">
      <h3>Vertical</h3>
      <div class="vertical-row">
        <span>Left</span>
        <MizuDivider orientation="vertical" />
        <span>Center</span>
        <MizuDivider orientation="vertical" />
        <span>Right</span>
      </div>
    </div>
    </DemoTabs>

    <DemoTabs :code="inContextCode">
    <div class="demo-section">
      <h3>In Context</h3>
      <div class="context-card">
        <div class="context-header">Header Section</div>
        <MizuDivider />
        <div class="context-body">Body content goes here.</div>
        <MizuDivider />
        <div class="context-footer">Footer Section</div>
      </div>
    </div>
    </DemoTabs>
  </div>
</template>

<style scoped>
.divider-demo {
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
.divider-demo :deep(*) { margin: 0; }

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
.demo-section p {
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
