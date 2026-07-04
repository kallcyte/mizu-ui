<script setup lang="ts">
import { MizuChip, MizuButton, MizuAvatar } from "@mizu/vue";
import { Bell, ShoppingCart } from "@lucide/vue";
import DemoTabs from "./DemoTabs.vue";

const standaloneChipsCode = `<MizuChip value="5" color="primary" />
<MizuChip value="12" color="accent" />
<MizuChip value="New" color="success" size="sm" />
<MizuChip value="99+" color="error" />
<MizuChip value="Beta" color="info" />
<MizuChip value="Draft" color="warning" />`;

const dotChipsCode = `<MizuChip dot color="primary" />
<MizuChip dot color="success" />
<MizuChip dot color="error" />
<MizuChip dot color="warning" />
<MizuChip dot color="info" />`;

const sizesCode = `<MizuChip value="SM" size="sm" color="primary" />
<MizuChip value="MD" size="md" color="primary" />`;

const positionedCode = `<MizuChip :value="3" color="error" position="top-right">
  <MizuButton variant="ghost" square>
    <template #leading-icon><Bell /></template>
  </MizuButton>
</MizuChip>
<MizuChip :value="12" color="primary" position="top-right">
  <MizuButton variant="ghost" square>
    <template #leading-icon><ShoppingCart /></template>
  </MizuButton>
</MizuChip>
<MizuChip dot color="success" position="bottom-right">
  <MizuAvatar name="Alice" size="lg" color="primary" />
</MizuChip>`;
</script>

<template>
  <div class="chip-demo not-content">
    <DemoTabs :code="standaloneChipsCode">
    <div class="demo-section">
      <h3>Standalone Chips</h3>
      <div class="chip-row">
        <MizuChip value="5" color="primary" />
        <MizuChip value="12" color="accent" />
        <MizuChip value="New" color="success" size="sm" />
        <MizuChip value="99+" color="error" />
        <MizuChip value="Beta" color="info" />
        <MizuChip value="Draft" color="warning" />
      </div>
    </div>
    </DemoTabs>

    <DemoTabs :code="dotChipsCode">
    <div class="demo-section">
      <h3>Dot Chips</h3>
      <div class="chip-row">
        <MizuChip dot color="primary" />
        <MizuChip dot color="success" />
        <MizuChip dot color="error" />
        <MizuChip dot color="warning" />
        <MizuChip dot color="info" />
      </div>
    </div>
    </DemoTabs>

    <DemoTabs :code="sizesCode">
    <div class="demo-section">
      <h3>Sizes</h3>
      <div class="chip-row">
        <MizuChip value="SM" size="sm" color="primary" />
        <MizuChip value="MD" size="md" color="primary" />
      </div>
    </div>
    </DemoTabs>

    <DemoTabs :code="positionedCode">
    <div class="demo-section">
      <h3>Positioned (Overlay Badge)</h3>
      <div class="chip-row">
        <MizuChip :value="3" color="error" position="top-right">
          <MizuButton variant="ghost" square>
            <template #leading-icon><Bell /></template>
          </MizuButton>
        </MizuChip>
        <MizuChip :value="12" color="primary" position="top-right">
          <MizuButton variant="ghost" square>
            <template #leading-icon><ShoppingCart /></template>
          </MizuButton>
        </MizuChip>
        <MizuChip dot color="success" position="bottom-right">
          <MizuAvatar name="Alice" size="lg" color="primary" />
        </MizuChip>
      </div>
    </div>
    </DemoTabs>
  </div>
</template>

<style scoped>
.chip-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: transparent;
  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
}
.chip-demo :deep(*) { margin: 0; }
.demo-section { display: flex; flex-direction: column; gap: 12px; }
.demo-section h3 { font-size: 14px; font-weight: 600; color: var(--sl-color-text); margin-bottom: 0; }
.demo-section > div { margin-top: 0; }
.chip-row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin: 0; padding: 0; }
</style>
