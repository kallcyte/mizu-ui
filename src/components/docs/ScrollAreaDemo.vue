<script setup lang="ts">
import {
  MizuScrollAreaRoot,
  MizuScrollAreaViewport,
  MizuScrollAreaScrollbar,
  MizuScrollAreaThumb,
  MizuScrollAreaCorner,
} from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const verticalCode = `<MizuScrollAreaRoot :max-height="50" class="sa-card">
  <MizuScrollAreaViewport class="sa-pad">
    <div class="tag-cloud">
      <span v-for="t in tags" :key="t" class="tag-chip">{{ t }}</span>
    </div>
  </MizuScrollAreaViewport>
  <MizuScrollAreaScrollbar orientation="vertical">
    <MizuScrollAreaThumb />
  </MizuScrollAreaScrollbar>
</MizuScrollAreaRoot>`;

const horizontalCode = `<MizuScrollAreaRoot :max-width="360" class="sa-card">
  <MizuScrollAreaViewport class="sa-pad">
    <div class="h-scroll-row">
      <span v-for="t in [...tags, ...tags]" :key="t + Math.random()" class="tag-chip">{{ t }}</span>
    </div>
  </MizuScrollAreaViewport>
  <MizuScrollAreaScrollbar orientation="horizontal">
    <MizuScrollAreaThumb />
  </MizuScrollAreaScrollbar>
</MizuScrollAreaRoot>`;

const bothCode = `<MizuScrollAreaRoot :max-height="240" :max-width="420" class="sa-card">
  <MizuScrollAreaViewport class="sa-pad">
    <div class="grid-content">
      <div v-for="i in 80" :key="i" class="grid-cell">Cell {{ i }}</div>
    </div>
  </MizuScrollAreaViewport>
  <MizuScrollAreaScrollbar orientation="vertical">
    <MizuScrollAreaThumb />
  </MizuScrollAreaScrollbar>
  <MizuScrollAreaScrollbar orientation="horizontal">
    <MizuScrollAreaThumb />
  </MizuScrollAreaScrollbar>
  <MizuScrollAreaCorner />
</MizuScrollAreaRoot>`;

const alwaysCode = `<MizuScrollAreaRoot :max-height="160" type="always" class="sa-card">
  <MizuScrollAreaViewport class="sa-pad">
    <div class="tag-cloud">
      <span v-for="t in tags.slice(0, 8)" :key="t" class="tag-chip">{{ t }}</span>
    </div>
  </MizuScrollAreaViewport>
  <MizuScrollAreaScrollbar orientation="vertical">
    <MizuScrollAreaThumb />
  </MizuScrollAreaScrollbar>
</MizuScrollAreaRoot>`;

const tags = [
  "v0.12.9", "ToggleGroup", "segmented-control", "single-selection",
  "multiple-selection", "sm-md-lg", "aria-pressed", "focus-visible",
  "surface-muted", "surface-base", "shadow-elevated", "reka-ui",
  "batch-2b", "Batch-2a-complete", "143-components", "tree-shakeable",
  "ESM-CJS", "vue-3.5", "typescript", "tailwind-v4",
];
</script>

<template>
  <div class="scroll-area-examples">
    <section class="example-section">
      <h3>Vertical Scroll</h3>
      <CodeCollapsible :code="verticalCode">
        <p class="demo-note">Hover to reveal the scrollbar. Content taller than <code>max-height</code> becomes scrollable.</p>
        <MizuScrollAreaRoot :max-height="50" class="sa-card">
          <MizuScrollAreaViewport class="sa-pad">
            <div class="tag-cloud">
              <span v-for="t in tags" :key="t" class="tag-chip">{{ t }}</span>
            </div>
          </MizuScrollAreaViewport>
          <MizuScrollAreaScrollbar orientation="vertical">
            <MizuScrollAreaThumb />
          </MizuScrollAreaScrollbar>
        </MizuScrollAreaRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Horizontal Scroll</h3>
      <CodeCollapsible :code="horizontalCode">
        <p class="demo-note">Wide content constrained by <code>max-width</code> — horizontal scrollbar appears.</p>
        <MizuScrollAreaRoot :max-width="360" class="sa-card">
          <MizuScrollAreaViewport class="sa-pad">
            <div class="h-scroll-row">
              <span v-for="t in [...tags, ...tags]" :key="t + Math.random()" class="tag-chip">{{ t }}</span>
            </div>
          </MizuScrollAreaViewport>
          <MizuScrollAreaScrollbar orientation="horizontal">
            <MizuScrollAreaThumb />
          </MizuScrollAreaScrollbar>
        </MizuScrollAreaRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Both Directions</h3>
      <CodeCollapsible :code="bothCode">
        <p class="demo-note">A large grid constrained in both dimensions — vertical + horizontal scrollbars with a corner.</p>
        <MizuScrollAreaRoot :max-height="240" :max-width="420" class="sa-card">
          <MizuScrollAreaViewport class="sa-pad">
            <div class="grid-content">
              <div v-for="i in 80" :key="i" class="grid-cell">Cell {{ i }}</div>
            </div>
          </MizuScrollAreaViewport>
          <MizuScrollAreaScrollbar orientation="vertical">
            <MizuScrollAreaThumb />
          </MizuScrollAreaScrollbar>
          <MizuScrollAreaScrollbar orientation="horizontal">
            <MizuScrollAreaThumb />
          </MizuScrollAreaScrollbar>
          <MizuScrollAreaCorner />
        </MizuScrollAreaRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Always Visible</h3>
      <CodeCollapsible :code="alwaysCode">
        <p class="demo-note"><code>type="always"</code> keeps the area open without a scrollbar — scrollbars appear permanently.</p>
        <MizuScrollAreaRoot :max-height="160" type="always" class="sa-card">
          <MizuScrollAreaViewport class="sa-pad">
            <div class="tag-cloud">
              <span v-for="t in tags.slice(0, 8)" :key="t" class="tag-chip">{{ t }}</span>
            </div>
          </MizuScrollAreaViewport>
          <MizuScrollAreaScrollbar orientation="vertical">
            <MizuScrollAreaThumb />
          </MizuScrollAreaScrollbar>
        </MizuScrollAreaRoot>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.scroll-area-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.scroll-area-examples :deep(*) { margin: 0; }
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

.demo-note { font-size: 12px; color: var(--sl-color-text-light); margin: 0; }
.demo-note code { font-size: 11px; }
.sa-card { border: 1px solid var(--sl-color-hairline-shade); border-radius: 8px; background: var(--sl-color-bg); }
.sa-pad { padding: 16px; }
.tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
.tag-chip { display: inline-flex; align-items: center; padding: 4px 10px; font-size: 12px; font-weight: 500; border-radius: 9999px; background: var(--sl-color-gray-3); color: var(--sl-color-text); white-space: nowrap; }
.h-scroll-row { display: flex; gap: 8px; width: max-content; }
.grid-content { display: grid; grid-template-columns: repeat(8, 1fr); gap: 8px; width: max-content; }
.grid-cell { display: flex; align-items: center; justify-content: center; width: 80px; height: 48px; font-size: 12px; font-weight: 500; border-radius: 6px; background: var(--sl-color-gray-3); color: var(--sl-color-text); }
</style>
