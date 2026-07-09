<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const rightOpen = ref(false);
const leftOpen = ref(false);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Right (Default)</h3>
      <CodeCollapsible :code="`<USlideover v-model:open=&quot;open&quot; title=&quot;Details&quot; side=&quot;right&quot;>
  <template #body>
    <p>Slideover content goes here.</p>
  </template>
</USlideover>`">
        <div class="demo-row">
          <UButton label="Open Right Slideover" @click="rightOpen = true" />
        </div>
        <USlideover v-model:open="rightOpen" title="Details" side="right">
          <template #body>
            <p class="text-sm text-foreground-secondary">This is a right slideover. Use it for detail panels, settings forms, or supplementary content.</p>
          </template>
          <template #footer>
            <UButton variant="ghost" label="Cancel" @click="rightOpen = false" />
            <UButton color="primary" label="Confirm" @click="rightOpen = false" />
          </template>
        </USlideover>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Left</h3>
      <CodeCollapsible :code="`<USlideover v-model:open=&quot;open&quot; title=&quot;Filters&quot; side=&quot;left&quot;>
  <template #body>
    <p>Filter content goes here.</p>
  </template>
</USlideover>`">
        <div class="demo-row">
          <UButton label="Open Left Slideover" @click="leftOpen = true" />
        </div>
        <USlideover v-model:open="leftOpen" title="Filters" side="left">
          <template #body>
            <p class="text-sm text-foreground-secondary">This is a left slideover. Ideal for filter panels, navigation drawers, or reference content.</p>
          </template>
          <template #footer>
            <UButton variant="ghost" label="Clear" @click="leftOpen = false" />
            <UButton color="primary" label="Apply" @click="leftOpen = false" />
          </template>
        </USlideover>
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
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
