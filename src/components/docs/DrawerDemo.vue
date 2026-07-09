<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const bottomOpen = ref(false);
const leftOpen = ref(false);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Bottom</h3>
      <CodeCollapsible :code="`<UDrawer v-model:open=&quot;open&quot; title=&quot;Settings&quot; direction=&quot;bottom&quot;>
  <template #body>
    <p>Drawer content goes here.</p>
  </template>
</UDrawer>`">
        <div class="demo-row">
          <UButton label="Open Bottom Drawer" @click="bottomOpen = true" />
        </div>
        <UDrawer v-model:open="bottomOpen" title="Settings" direction="bottom">
          <template #body>
            <p class="text-sm text-foreground-secondary">This is a bottom drawer. Use it for mobile-friendly sheets, settings panels, or action menus.</p>
          </template>
          <template #footer>
            <UButton variant="ghost" label="Cancel" @click="bottomOpen = false" />
            <UButton color="primary" label="Save" @click="bottomOpen = false" />
          </template>
        </UDrawer>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Left</h3>
      <CodeCollapsible :code="`<UDrawer v-model:open=&quot;open&quot; title=&quot;Navigation&quot; direction=&quot;left&quot;>
  <template #body>
    <p>Navigation content goes here.</p>
  </template>
</UDrawer>`">
        <div class="demo-row">
          <UButton label="Open Left Drawer" @click="leftOpen = true" />
        </div>
        <UDrawer v-model:open="leftOpen" title="Navigation" direction="left">
          <template #body>
            <p class="text-sm text-foreground-secondary">This is a left drawer. Ideal for navigation menus, filters, or sidebars.</p>
          </template>
          <template #footer>
            <UButton variant="ghost" label="Close" @click="leftOpen = false" />
          </template>
        </UDrawer>
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
