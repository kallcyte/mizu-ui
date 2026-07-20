<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A click-triggered popover with a <code>title</code> and <code>#content</code> slot, using any element as the trigger.</p>
      <CodeCollapsible :code="`<UPopover title=&quot;Notifications&quot;>
  <template #content>
    <p>You have 3 new notifications.</p>
  </template>
  <UButton label=&quot;Open&quot; />
</UPopover>`">
        <div class="demo-col">
          <UPopover title="Notifications">
            <template #content>
              <p style="font-size: 13px; color: var(--color-foreground-secondary); margin: 0;">You have 3 new notifications.</p>
            </template>
            <UButton label="Open Popover" />
          </UPopover>
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 8px;
}
</style>
