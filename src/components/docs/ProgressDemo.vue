<script setup lang="ts">
import { ref } from "vue";
import { MizuProgress } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const fileUpload = ref(67);
const storageQuota = ref(42);
const download = ref(85);
const taskComplete = ref(100);
const serverLoad = ref(null);
const live = ref(35);

function reset() {
  live.value = 0;
  const tick = setInterval(() => {
    live.value = (live.value ?? 0) + 5;
    if (live.value >= 100) clearInterval(tick);
  }, 200);
}

const basicCode = `<MizuProgress :model-value="50" />`;

const withLabelCode = `<MizuProgress :model-value="fileUpload" show-label />`;

const sizesCode = `<MizuProgress :model-value="40" size="sm" />
<MizuProgress :model-value="40" size="md" />
<MizuProgress :model-value="40" size="lg" />`;

const variantsCode = `<MizuProgress :model-value="60" variant="primary" />
<MizuProgress :model-value="60" variant="accent" />
<MizuProgress :model-value="60" variant="success" />
<MizuProgress :model-value="60" variant="warning" />
<MizuProgress :model-value="60" variant="error" />
<MizuProgress :model-value="60" variant="info" />`;

const completeStateCode = `<MizuProgress :model-value="taskComplete" variant="primary" show-label />
<MizuProgress :model-value="taskComplete" variant="success" show-label />`;

const indeterminateCode = `<MizuProgress :model-value="null" />
<MizuProgress :model-value="null" variant="accent" />`;

const storageQuotaCode = `<MizuProgress
  :model-value="storageQuota"
  :max="100"
  variant="primary"
  size="lg"
  show-label
  :label="\`\${storageQuota} GB of 100 GB used\`"
/>`;

const fileDownloadCode = `<MizuProgress
  :model-value="download"
  :max="100"
  variant="info"
  show-label
/>`;

const serverLoadCode = `<MizuProgress
  :model-value="serverLoad"
  :max="100"
  variant="warning"
  show-label
/>
<button class="reset-button" @click="serverLoad = 30">Set 30%</button>
<button class="reset-button" @click="serverLoad = 75">Set 75%</button>
<button class="reset-button" @click="serverLoad = 95">Set 95%</button>`;

const skillProgressCode = `<MizuProgress :model-value="live" variant="primary" show-label />
<button class="reset-button" @click="reset">Replay</button>`;

const customMaxCode = `<MizuProgress :model-value="7" :max="10" variant="success" show-label />`;

const skillChecklistCode = `<div class="checklist">
  <div class="checklist-item">
    <span class="checklist-label">HTML &amp; CSS</span>
    <MizuProgress :model-value="100" size="sm" variant="success" />
  </div>
  <div class="checklist-item">
    <span class="checklist-label">JavaScript</span>
    <MizuProgress :model-value="80" size="sm" variant="primary" />
  </div>
  <div class="checklist-item">
    <span class="checklist-label">TypeScript</span>
    <MizuProgress :model-value="65" size="sm" variant="primary" />
  </div>
  <div class="checklist-item">
    <span class="checklist-label">Vue</span>
    <MizuProgress :model-value="50" size="sm" variant="primary" />
  </div>
  <div class="checklist-item">
    <span class="checklist-label">Design Systems</span>
    <MizuProgress :model-value="25" size="sm" variant="primary" />
  </div>
</div>`;
</script>

<template>
  <div class="progress-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <MizuProgress :model-value="50" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Label</h3>
      <CodeCollapsible :code="withLabelCode">
        <MizuProgress :model-value="fileUpload" show-label />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <MizuProgress :model-value="40" size="sm" />
        <MizuProgress :model-value="40" size="md" />
        <MizuProgress :model-value="40" size="lg" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variants</h3>
      <CodeCollapsible :code="variantsCode">
        <MizuProgress :model-value="60" variant="primary" />
        <MizuProgress :model-value="60" variant="accent" />
        <MizuProgress :model-value="60" variant="success" />
        <MizuProgress :model-value="60" variant="warning" />
        <MizuProgress :model-value="60" variant="error" />
        <MizuProgress :model-value="60" variant="info" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Complete State</h3>
      <CodeCollapsible :code="completeStateCode">
        <MizuProgress :model-value="taskComplete" variant="primary" show-label />
        <MizuProgress :model-value="taskComplete" variant="success" show-label />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indeterminate</h3>
      <CodeCollapsible :code="indeterminateCode">
        <MizuProgress :model-value="null" />
        <MizuProgress :model-value="null" variant="accent" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Storage Quota</h3>
      <CodeCollapsible :code="storageQuotaCode">
        <MizuProgress
          :model-value="storageQuota"
          :max="100"
          variant="primary"
          size="lg"
          show-label
          :label="`${storageQuota} GB of 100 GB used`"
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>File Download</h3>
      <CodeCollapsible :code="fileDownloadCode">
        <MizuProgress :model-value="download" :max="100" variant="info" show-label />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Server Load (Live)</h3>
      <CodeCollapsible :code="serverLoadCode">
        <MizuProgress :model-value="serverLoad" :max="100" variant="warning" show-label />
        <button class="reset-button" @click="serverLoad = 30">Set 30%</button>
        <button class="reset-button" @click="serverLoad = 75">Set 75%</button>
        <button class="reset-button" @click="serverLoad = 95">Set 95%</button>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Skill Progress (Animated)</h3>
      <CodeCollapsible :code="skillProgressCode">
        <MizuProgress :model-value="live" variant="primary" show-label />
        <button class="reset-button" @click="reset">Replay</button>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Custom max</h3>
      <CodeCollapsible :code="customMaxCode">
        <MizuProgress :model-value="7" :max="10" variant="success" show-label />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Skill Checklist</h3>
      <CodeCollapsible :code="skillChecklistCode">
        <div class="checklist">
          <div class="checklist-item">
            <span class="checklist-label">HTML &amp; CSS</span>
            <MizuProgress :model-value="100" size="sm" variant="success" />
          </div>
          <div class="checklist-item">
            <span class="checklist-label">JavaScript</span>
            <MizuProgress :model-value="80" size="sm" variant="primary" />
          </div>
          <div class="checklist-item">
            <span class="checklist-label">TypeScript</span>
            <MizuProgress :model-value="65" size="sm" variant="primary" />
          </div>
          <div class="checklist-item">
            <span class="checklist-label">Vue</span>
            <MizuProgress :model-value="50" size="sm" variant="primary" />
          </div>
          <div class="checklist-item">
            <span class="checklist-label">Design Systems</span>
            <MizuProgress :model-value="25" size="sm" variant="primary" />
          </div>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.progress-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.progress-examples :deep(*) {
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

.checklist {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checklist-item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
  align-items: center;
}

.checklist-label {
  font-size: 12px;
  color: var(--sl-color-text);
}

.reset-button {
  font-family: var(--font-family-sans);
  font-size: 12px;
  padding: 6px 12px;
  background: var(--sl-color-white);
  color: var(--sl-color-text);
  border: 1px solid var(--sl-color-gray-4);
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
  transition: all 200ms ease-in-out;
}
.reset-button:hover {
  background: var(--sl-color-gray-3);
  border-color: var(--sl-color-gray-5);
}

:global(html[data-theme="dark"]) .reset-button {
  background: var(--sl-color-gray-3);
  color: var(--sl-color-text);
  border-color: var(--sl-color-gray-5);
}
:global(html[data-theme="dark"]) .reset-button:hover {
  background: var(--sl-color-gray-4);
}
</style>
