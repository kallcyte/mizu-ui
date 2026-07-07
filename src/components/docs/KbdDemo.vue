<script setup lang="ts">
import { MizuKbd } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

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
  <div class="kbd-examples">
    <section class="example-section">
      <h3>Single Keys</h3>
      <CodeCollapsible :code="singleKeysCode">
        <p class="demo-text">
          Press <MizuKbd keys="Enter" /> to submit or <MizuKbd keys="Esc" /> to cancel.
        </p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Key Combinations</h3>
      <CodeCollapsible :code="keyCombinationsCode">
        <p class="demo-text">
          Open command palette: <MizuKbd :keys="['⌘', 'K']" />
        </p>
        <p class="demo-text">
          Save file: <MizuKbd :keys="['Ctrl', 'S']" />
        </p>
        <p class="demo-text">
          Format code: <MizuKbd :keys="['Shift', 'Alt', 'F']" />
        </p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <p class="demo-text">
          Small: <MizuKbd :keys="['⌘', 'K']" size="sm" />
          &nbsp;
          Medium: <MizuKbd :keys="['⌘', 'K']" size="md" />
        </p>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.kbd-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.kbd-examples :deep(*) {
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

.demo-text {
  font-size: 14px;
  color: var(--sl-color-text);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
</style>
