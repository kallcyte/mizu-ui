<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Loading</h3>
      <p class="demo-description">Tool invocation in a loading state, showing a spinner to indicate an operation in progress.</p>
      <CodeCollapsible :code="`<UChatTool text=&quot;Searching files...&quot; loading />`">
        <div class="demo-row">
          <UChatTool text="Searching files..." loading />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Completed</h3>
      <p class="demo-description">Completed tool with a content slot and <code>suffix</code> for displaying results like file contents.</p>
      <CodeCollapsible :code="`<UChatTool text=&quot;Read file&quot; suffix=&quot;app.ts&quot;>
  <template #default>
    <pre>export default defineAppConfig({ ... })</pre>
  </template>
</UChatTool>`">
        <div class="demo-row">
          <UChatTool text="Read file" suffix="app.ts">
            <pre class="text-xs text-foreground-secondary">export default defineAppConfig({
  ui: {
    primary: 'blue',
  },
})</pre>
          </UChatTool>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Card Variant</h3>
      <p class="demo-description">Card-styled tool with <code>variant="card"</code> and expandable content for richer tool result display.</p>
      <CodeCollapsible :code="`<UChatTool variant=&quot;card&quot; text=&quot;Search results&quot; suffix=&quot;3 files&quot; />`">
        <div class="demo-row">
          <UChatTool variant="card" text="Search results" suffix="3 files" default-open>
            <ul class="text-xs text-foreground-secondary list-disc pl-4">
              <li>src/components/Button.vue</li>
              <li>src/components/Input.vue</li>
              <li>src/components/Modal.vue</li>
            </ul>
          </UChatTool>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Actions</h3>
      <p class="demo-description">Tool with interactive action buttons via the <code>actions</code> prop, useful for confirmation dialogs.</p>
      <CodeCollapsible :code="`<UChatTool
  text=&quot;Delete file?&quot;
  suffix=&quot;config.json&quot;
  :actions=&quot;[{ label: 'Approve' }, { label: 'Deny', color: 'error' }]&quot;
/>`">
        <div class="demo-row">
          <UChatTool
            text="Delete file?"
            suffix="config.json"
            :actions="[{ label: 'Approve', color: 'primary' }, { label: 'Deny', color: 'error' }]"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Streaming</h3>
      <p class="demo-description">Animated streaming state with the <code>streaming</code> prop, indicating ongoing tool execution.</p>
      <CodeCollapsible :code="`<UChatTool text=&quot;Generating code...&quot; streaming />`">
        <div class="demo-row">
          <UChatTool text="Generating code..." streaming />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">A non-interactive tool with the <code>disabled</code> prop, preventing expansion and interaction.</p>
      <CodeCollapsible :code="`<UChatTool disabled text=&quot;Locked tool...&quot; />`">
        <div class="demo-row">
          <UChatTool disabled text="This tool invocation is locked." />
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.demo-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
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
.demo-description {
  font-size: 13px;
  color: var(--sl-color-text-light);
  margin: 0;
  line-height: 1.5;
}
.demo-description code {
  font-size: 12px;
  background: var(--color-surface-muted, #F3F4F6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
</style>
