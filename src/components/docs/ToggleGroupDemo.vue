<script setup lang="ts">
import { ref } from "vue";
import { MizuToggleGroupRoot, MizuToggleGroupItem } from "@mizu/vue";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "@lucide/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const textFormat = ref("bold");
const multiFormat = ref<string[]>([]);
const alignment = ref("left");

const singleCode = `<MizuToggleGroupRoot v-model="textFormat" type="single" size="md">
  <MizuToggleGroupItem value="bold"><Bold :size="14" /><span>Bold</span></MizuToggleGroupItem>
  <MizuToggleGroupItem value="italic"><Italic :size="14" /><span>Italic</span></MizuToggleGroupItem>
  <MizuToggleGroupItem value="underline"><Underline :size="14" /><span>Underline</span></MizuToggleGroupItem>
</MizuToggleGroupRoot>`;

const multipleCode = `<MizuToggleGroupRoot v-model="multiFormat" type="multiple" size="md">
  <MizuToggleGroupItem value="bold"><Bold :size="14" /><span>Bold</span></MizuToggleGroupItem>
  <MizuToggleGroupItem value="italic"><Italic :size="14" /><span>Italic</span></MizuToggleGroupItem>
  <MizuToggleGroupItem value="underline"><Underline :size="14" /><span>Underline</span></MizuToggleGroupItem>
</MizuToggleGroupRoot>`;

const sizesCode = `<div class="col"><span class="demo-label">sm</span>
  <MizuToggleGroupRoot v-model="alignment" type="single" size="sm">
    <MizuToggleGroupItem value="left"><AlignLeft :size="12" /></MizuToggleGroupItem>
    <MizuToggleGroupItem value="center"><AlignCenter :size="12" /></MizuToggleGroupItem>
    <MizuToggleGroupItem value="right"><AlignRight :size="12" /></MizuToggleGroupItem>
  </MizuToggleGroupRoot>
</div>
<div class="col"><span class="demo-label">md</span>
  <MizuToggleGroupRoot v-model="alignment" type="single" size="md">
    <MizuToggleGroupItem value="left"><AlignLeft :size="14" /></MizuToggleGroupItem>
    <MizuToggleGroupItem value="center"><AlignCenter :size="14" /></MizuToggleGroupItem>
    <MizuToggleGroupItem value="right"><AlignRight :size="14" /></MizuToggleGroupItem>
  </MizuToggleGroupRoot>
</div>
<div class="col"><span class="demo-label">lg</span>
  <MizuToggleGroupRoot v-model="alignment" type="single" size="lg">
    <MizuToggleGroupItem value="left"><AlignLeft :size="16" /></MizuToggleGroupItem>
    <MizuToggleGroupItem value="center"><AlignCenter :size="16" /></MizuToggleGroupItem>
    <MizuToggleGroupItem value="right"><AlignRight :size="16" /></MizuToggleGroupItem>
  </MizuToggleGroupRoot>
</div>`;

const disabledCode = `<MizuToggleGroupRoot v-model="textFormat" type="single" size="md">
  <MizuToggleGroupItem value="bold"><Bold :size="14" /><span>Bold</span></MizuToggleGroupItem>
  <MizuToggleGroupItem value="italic" disabled><Italic :size="14" /><span>Italic</span></MizuToggleGroupItem>
  <MizuToggleGroupItem value="underline"><Underline :size="14" /><span>Underline</span></MizuToggleGroupItem>
</MizuToggleGroupRoot>`;
</script>

<template>
  <div class="toggle-group-examples">
    <section class="example-section">
      <h3>Single Selection</h3>
      <CodeCollapsible :code="singleCode">
        <p class="demo-note">Only one item active at a time. Use for mutually exclusive options.</p>
        <MizuToggleGroupRoot v-model="textFormat" type="single" size="md">
          <MizuToggleGroupItem value="bold"><Bold :size="14" /><span>Bold</span></MizuToggleGroupItem>
          <MizuToggleGroupItem value="italic"><Italic :size="14" /><span>Italic</span></MizuToggleGroupItem>
          <MizuToggleGroupItem value="underline"><Underline :size="14" /><span>Underline</span></MizuToggleGroupItem>
        </MizuToggleGroupRoot>
        <p class="demo-note">Selected: <code>{{ textFormat }}</code></p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple Selection</h3>
      <CodeCollapsible :code="multipleCode">
        <p class="demo-note">Multiple items can be active. Use for filters or independent options.</p>
        <MizuToggleGroupRoot v-model="multiFormat" type="multiple" size="md">
          <MizuToggleGroupItem value="bold"><Bold :size="14" /><span>Bold</span></MizuToggleGroupItem>
          <MizuToggleGroupItem value="italic"><Italic :size="14" /><span>Italic</span></MizuToggleGroupItem>
          <MizuToggleGroupItem value="underline"><Underline :size="14" /><span>Underline</span></MizuToggleGroupItem>
        </MizuToggleGroupRoot>
        <p class="demo-note">Selected: <code>{{ multiFormat.join(", ") || "none" }}</code></p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="stack">
          <div class="col"><span class="demo-label">sm</span>
            <MizuToggleGroupRoot v-model="alignment" type="single" size="sm">
              <MizuToggleGroupItem value="left"><AlignLeft :size="12" /></MizuToggleGroupItem>
              <MizuToggleGroupItem value="center"><AlignCenter :size="12" /></MizuToggleGroupItem>
              <MizuToggleGroupItem value="right"><AlignRight :size="12" /></MizuToggleGroupItem>
            </MizuToggleGroupRoot>
          </div>
          <div class="col"><span class="demo-label">md</span>
            <MizuToggleGroupRoot v-model="alignment" type="single" size="md">
              <MizuToggleGroupItem value="left"><AlignLeft :size="14" /></MizuToggleGroupItem>
              <MizuToggleGroupItem value="center"><AlignCenter :size="14" /></MizuToggleGroupItem>
              <MizuToggleGroupItem value="right"><AlignRight :size="14" /></MizuToggleGroupItem>
            </MizuToggleGroupRoot>
          </div>
          <div class="col"><span class="demo-label">lg</span>
            <MizuToggleGroupRoot v-model="alignment" type="single" size="lg">
              <MizuToggleGroupItem value="left"><AlignLeft :size="16" /></MizuToggleGroupItem>
              <MizuToggleGroupItem value="center"><AlignCenter :size="16" /></MizuToggleGroupItem>
              <MizuToggleGroupItem value="right"><AlignRight :size="16" /></MizuToggleGroupItem>
            </MizuToggleGroupRoot>
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="disabledCode">
        <div class="row gap-12 align-center">
          <MizuToggleGroupRoot v-model="textFormat" type="single" size="md">
            <MizuToggleGroupItem value="bold"><Bold :size="14" /><span>Bold</span></MizuToggleGroupItem>
            <MizuToggleGroupItem value="italic" disabled><Italic :size="14" /><span>Italic</span></MizuToggleGroupItem>
            <MizuToggleGroupItem value="underline"><Underline :size="14" /><span>Underline</span></MizuToggleGroupItem>
          </MizuToggleGroupRoot>
          <span class="demo-label">Italic disabled</span>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.toggle-group-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.toggle-group-examples :deep(*) { margin: 0; }

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

.demo-label { font-size: 11px; font-weight: 500; color: var(--sl-color-text-light); margin: 0; display: block; }
.demo-note { font-size: 12px; color: var(--sl-color-text-light); margin: 0; }
.demo-note code { font-size: 11px; }
.row { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 24px; }
.col { display: flex; flex-direction: column; gap: 8px; min-width: 80px; }
.stack { display: flex; flex-direction: column; gap: 16px; }
.gap-12 { gap: 12px; }
.align-center { align-items: center; }
</style>
