<script setup lang="ts">
import { ref } from "vue";
import { MizuTabsRoot, MizuTabsList, MizuTabsTrigger, MizuTabsContent } from "@mizu/vue";

const props = defineProps<{
  code: string;
}>();

const activeTab = ref("preview");
const copied = ref(false);

async function copyCode() {
  await navigator.clipboard.writeText(props.code.trim());
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <div class="demo-tabs">
    <MizuTabsRoot v-model="activeTab" defaultValue="preview">
      <MizuTabsList variant="underline" size="md">
        <MizuTabsTrigger value="preview">Preview</MizuTabsTrigger>
        <MizuTabsTrigger value="code">Code</MizuTabsTrigger>
      </MizuTabsList>
      <MizuTabsContent value="preview">
        <div class="demo-tabs__preview not-content">
          <slot />
        </div>
      </MizuTabsContent>
      <MizuTabsContent value="code">
        <div class="demo-tabs__code-wrapper not-content">
          <button
            class="demo-tabs__copy-btn"
            :class="{ 'demo-tabs__copy-btn--copied': copied }"
            :aria-label="copied ? 'Copied' : 'Copy code'"
            @click="copyCode"
          >
            <svg v-if="copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
          <pre class="demo-tabs__code-block"><code>{{ code }}</code></pre>
        </div>
      </MizuTabsContent>
    </MizuTabsRoot>
  </div>
</template>

<style>
.demo-tabs {
  all: revert;
  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
  overflow: hidden;
  font-family: inherit;
}

.demo-tabs__preview {
  all: revert;
  padding: 16px;
}

.demo-tabs__preview > * {
  margin-top: 0;
}

.demo-tabs__code-wrapper {
  all: revert;
  position: relative;
  padding: 16px;
}

.demo-tabs__code-wrapper > * {
  margin-top: 0;
}

.demo-tabs__code-block {
  all: revert;
  margin: 0;
  padding: 16px;
  border-radius: 6px;
  background: var(--color-surface-subtle);
  color: var(--color-foreground-primary);
  white-space: pre;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
  font-family: "JetBrains Mono", "Fira Code", monospace;
}

.demo-tabs__copy-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-surface-muted);
  border-radius: 6px;
  background: var(--color-surface-base);
  color: var(--color-foreground-secondary);
  cursor: pointer;
  padding: 0;
  font: inherit;
  transition: color 150ms, background 150ms, border-color 150ms;
}

.demo-tabs__copy-btn:hover {
  color: var(--color-foreground-primary);
  border-color: var(--color-foreground-secondary);
}

.demo-tabs__copy-btn--copied {
  color: var(--color-feedback-success-base, #22c55e);
  border-color: var(--color-feedback-success-base, #22c55e);
}
</style>
