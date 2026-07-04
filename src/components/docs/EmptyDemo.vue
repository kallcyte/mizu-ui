<script setup lang="ts">
import { MizuEmpty, MizuButton } from "@mizu/vue";
import { Inbox, SearchX, FolderOpen } from "@lucide/vue";
import DemoTabs from "./DemoTabs.vue";

const basicCode = `<MizuEmpty
  title="No results found"
  description="Try adjusting your search or filters to find what you're looking for."
/>`;

const withIconCode = `<MizuEmpty title="No messages">
  <template #icon><Inbox /></template>
</MizuEmpty>`;

const withActionCode = `<MizuEmpty
  title="No projects yet"
  description="Get started by creating your first project."
>
  <template #icon><FolderOpen /></template>
  <template #action>
    <MizuButton variant="primary">Create Project</MizuButton>
  </template>
</MizuEmpty>`;
</script>

<template>
  <div class="empty-demo not-content">
    <DemoTabs :code="basicCode">
    <div class="demo-section">
      <h3>Basic</h3>
      <div class="empty-container">
        <MizuEmpty
          title="No results found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      </div>
    </div>
    </DemoTabs>

    <DemoTabs :code="withIconCode">
    <div class="demo-section">
      <h3>With Icon</h3>
      <div class="empty-container">
        <MizuEmpty title="No messages">
          <template #icon><Inbox /></template>
        </MizuEmpty>
      </div>
    </div>
    </DemoTabs>

    <DemoTabs :code="withActionCode">
    <div class="demo-section">
      <h3>With Action</h3>
      <div class="empty-container">
        <MizuEmpty
          title="No projects yet"
          description="Get started by creating your first project."
        >
          <template #icon><FolderOpen /></template>
          <template #action>
            <MizuButton variant="primary">Create Project</MizuButton>
          </template>
        </MizuEmpty>
      </div>
    </div>
    </DemoTabs>
  </div>
</template>

<style scoped>
.empty-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: transparent;
  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
}
.empty-demo :deep(*) { margin: 0; }
.demo-section { display: flex; flex-direction: column; gap: 12px; }
.demo-section h3 { font-size: 14px; font-weight: 600; color: var(--sl-color-text); margin-bottom: 0; }
.demo-section > div { margin-top: 0; }
.empty-container {
  background: var(--sl-color-bg);
  border-radius: 8px;
  border: 1px dashed var(--sl-color-gray-4);
}
</style>
