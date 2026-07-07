<script setup lang="ts">
import { MizuEmpty, MizuButton } from "@mizu/vue";
import { Inbox, SearchX, FolderOpen } from "@lucide/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

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
  <div class="empty-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <div class="empty-container">
          <MizuEmpty
            title="No results found"
            description="Try adjusting your search or filters to find what you're looking for."
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icon</h3>
      <CodeCollapsible :code="withIconCode">
        <div class="empty-container">
          <MizuEmpty title="No messages">
            <template #icon><Inbox /></template>
          </MizuEmpty>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Action</h3>
      <CodeCollapsible :code="withActionCode">
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
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.empty-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.empty-examples :deep(*) {
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

.empty-container {
  background: var(--sl-color-bg);
  border-radius: 8px;
  border: 1px dashed var(--sl-color-gray-4);
}
</style>
