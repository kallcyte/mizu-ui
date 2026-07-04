<script setup lang="ts">
import { MizuKbd } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const singleKeysCode = `<p>
  Press <MizuKbd keys="Enter" /> to submit or <MizuKbd keys="Esc" /> to cancel.
</p>`;

const keyCombinationsCode = `<p>
  Open command palette: <MizuKbd :keys="['⌘', 'K']" />
</p>
<p>
  Save file: <MizuKbd :keys="['Ctrl', 'S']" />
</p>
<p>
  Format code: <MizuKbd :keys="['Shift', 'Alt', 'F']" />
</p>`;

const sizesCode = `<MizuKbd :keys="['⌘', 'K']" size="sm" />
<MizuKbd :keys="['⌘', 'K']" size="md" />`;
</script>

<template>
  <div class="kbd-demo not-content">
    <DemoTabs :code="singleKeysCode">
    <div class="demo-section">
      <h3>Single Keys</h3>
      <p class="demo-text">
        Press <MizuKbd keys="Enter" /> to submit or <MizuKbd keys="Esc" /> to cancel.
      </p>
    </div>
    </DemoTabs>

    <DemoTabs :code="keyCombinationsCode">
    <div class="demo-section">
      <h3>Key Combinations</h3>
      <p class="demo-text">
        Open command palette: <MizuKbd :keys="['⌘', 'K']" />
      </p>
      <p class="demo-text">
        Save file: <MizuKbd :keys="['Ctrl', 'S']" />
      </p>
      <p class="demo-text">
        Format code: <MizuKbd :keys="['Shift', 'Alt', 'F']" />
      </p>
    </div>
    </DemoTabs>

    <DemoTabs :code="sizesCode">
    <div class="demo-section">
      <h3>Sizes</h3>
      <p class="demo-text">
        Small: <MizuKbd :keys="['⌘', 'K']" size="sm" />
        &nbsp;
        Medium: <MizuKbd :keys="['⌘', 'K']" size="md" />
      </p>
    </div>
    </DemoTabs>
  </div>
</template>

<style scoped>
.kbd-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: transparent;
  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
}
.kbd-demo :deep(*) { margin: 0; }
.demo-section { display: flex; flex-direction: column; gap: 12px; }
.demo-section h3 { font-size: 14px; font-weight: 600; color: var(--sl-color-text); margin-bottom: 0; }
.demo-section > p { margin-top: 0; }
.demo-text {
  font-size: 14px;
  color: var(--sl-color-text);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
</style>
