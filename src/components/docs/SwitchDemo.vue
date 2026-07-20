<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const on = ref(false);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>States</h3>
      <p class="demo-description">A toggle switch controlled by <code>v-model</code>. Set <code>:default-value="true"</code> to make it checked by default.</p>
      <CodeCollapsible :code="`<USwitch v-model=&quot;on&quot; label=&quot;Enable notifications&quot; />
<USwitch label=&quot;Checked&quot; :default-value=&quot;true&quot; />
<USwitch label=&quot;Unchecked&quot; />`">
        <div class="demo-col">
          <USwitch v-model="on" label="Enable notifications" />
          <USwitch label="Checked" :default-value="true" />
          <USwitch label="Unchecked" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Use the <code>disabled</code> prop to prevent interaction. Works in both checked and unchecked states.</p>
      <CodeCollapsible :code="`<USwitch disabled label=&quot;Disabled&quot; :default-value=&quot;true&quot; />
<USwitch disabled label=&quot;Disabled&quot; />`">
        <div class="demo-col">
          <USwitch disabled label="Disabled — on" :default-value="true" />
          <USwitch disabled label="Disabled — off" />
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
  width: 100%;
  gap: 12px;
}
</style>
