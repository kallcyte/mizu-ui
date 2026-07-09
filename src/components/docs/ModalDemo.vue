<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicOpen = ref(false);
const fullscreenOpen = ref(false);
const scrollableOpen = ref(false);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UModal v-model:open=&quot;open&quot; title=&quot;Edit Profile&quot;>
  <template #body>
    <p>Make changes to your profile here.</p>
  </template>
</UModal>`">
        <div class="demo-row">
          <UButton label="Open Modal" @click="basicOpen = true" />
        </div>
        <UModal v-model:open="basicOpen" title="Edit Profile">
          <p>Make changes to your profile here. Click Save when you're done.</p>
          <template #footer>
            <UButton variant="ghost" label="Cancel" @click="basicOpen = false" />
            <UButton color="primary" label="Save" @click="basicOpen = false" />
          </template>
        </UModal>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Fullscreen</h3>
      <CodeCollapsible :code="`<UModal v-model:open=&quot;open&quot; title=&quot;Welcome&quot; fullscreen />`">
        <div class="demo-row">
          <UButton label="Fullscreen" @click="fullscreenOpen = true" />
        </div>
        <UModal v-model:open="fullscreenOpen" title="Welcome" fullscreen>
          <p>Fullscreen modals fill the entire viewport. Ideal for immersive experiences or mobile layouts.</p>
          <template #footer>
            <UButton variant="ghost" label="Cancel" @click="fullscreenOpen = false" />
            <UButton color="primary" label="Confirm" @click="fullscreenOpen = false" />
          </template>
        </UModal>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Scrollable</h3>
      <CodeCollapsible :code="`<UModal v-model:open=&quot;open&quot; title=&quot;Terms&quot; scrollable />`">
        <div class="demo-row">
          <UButton label="Scrollable Modal" @click="scrollableOpen = true" />
        </div>
        <UModal v-model:open="scrollableOpen" title="Terms of Service" scrollable>
          <p>The quick brown fox jumps over the lazy dog.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui.</p>
          <template #footer>
            <UButton variant="ghost" label="Decline" @click="scrollableOpen = false" />
            <UButton color="primary" label="Accept" @click="scrollableOpen = false" />
          </template>
        </UModal>
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
