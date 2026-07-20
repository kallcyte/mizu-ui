<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A progress bar at 60% completion, controlled by the <code>:model-value</code> prop as a percentage (0&ndash;100).</p>
      <CodeCollapsible :code="`<UProgress :model-value=&quot;60&quot; />`">
        <div class="demo-col">
          <UProgress :model-value="60" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>States</h3>
      <p class="demo-description">Progress bars at different completion levels: 25% (low), 60% (in progress), and 100% (complete).</p>
      <CodeCollapsible :code="`<UProgress :model-value=&quot;25&quot; />
<UProgress :model-value=&quot;60&quot; />
<UProgress :model-value=&quot;100&quot; />`">
        <div class="demo-col">
          <UProgress :model-value="25" />
          <UProgress :model-value="60" />
          <UProgress :model-value="100" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indeterminate</h3>
      <p class="demo-description">An indeterminate progress bar that animates continuously when no <code>model-value</code> is provided, indicating ongoing activity.</p>
      <CodeCollapsible :code="`<UProgress />`">
        <div class="demo-col">
          <UProgress />
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
  gap: 12px;
  max-width: 300px;
}
</style>
