<script setup lang="ts">
import { ref } from "vue";
import {
  MizuCollapsibleRoot,
  MizuCollapsibleTrigger,
  MizuCollapsibleContent,
} from "@mizu/vue";

const isOpen = ref(false);
</script>

<template>
  <div class="collapsible-demo">
    <!-- Basic collapsible -->
    <div class="demo-section">
      <h3>Basic</h3>
      <MizuCollapsibleRoot>
        <MizuCollapsibleTrigger>Toggle content</MizuCollapsibleTrigger>
        <MizuCollapsibleContent>
          This content can be collapsed and expanded. Click the trigger above to toggle visibility.
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
    </div>

    <!-- Controlled with v-model -->
    <div class="demo-section">
      <h3>Controlled (v-model)</h3>
      <p class="demo-hint">Currently open: {{ isOpen }}</p>
      <MizuCollapsibleRoot v-model:open="isOpen">
        <MizuCollapsibleTrigger>Controlled toggle</MizuCollapsibleTrigger>
        <MizuCollapsibleContent>
          This collapsible is controlled via v-model. The state is reflected above.
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
    </div>

    <!-- Default open -->
    <div class="demo-section">
      <h3>Default open</h3>
      <MizuCollapsibleRoot :default-open="true">
        <MizuCollapsibleTrigger>Initially expanded</MizuCollapsibleTrigger>
        <MizuCollapsibleContent>
          This collapsible starts in the open state using the defaultOpen prop.
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
    </div>

    <!-- Disabled -->
    <div class="demo-section">
      <h3>Disabled</h3>
      <MizuCollapsibleRoot disabled>
        <MizuCollapsibleTrigger>Disabled collapsible</MizuCollapsibleTrigger>
        <MizuCollapsibleContent>
          This content cannot be shown because the collapsible is disabled.
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
    </div>

    <!-- Nested content -->
    <div class="demo-section">
      <h3>Rich content</h3>
      <MizuCollapsibleRoot>
        <MizuCollapsibleTrigger>Show details</MizuCollapsibleTrigger>
        <MizuCollapsibleContent>
          <p style="margin: 0 0 8px 0;">Collapsibles can contain any content:</p>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Text and paragraphs</li>
            <li>Lists and tables</li>
            <li>Forms and inputs</li>
            <li>Other components</li>
          </ul>
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
    </div>
  </div>
</template>

<style scoped>
.collapsible-demo { all: revert; }

.collapsible-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: var(--sl-color-gray-2);
  border-radius: 8px;
}

.collapsible-demo .demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.collapsible-demo .demo-section > * {
  margin-top: 0;
}

.collapsible-demo .demo-section h3 {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}

.collapsible-demo .demo-hint {
  font-size: 13px;
  color: var(--color-foreground-muted);
  margin: 0;
}
</style>
