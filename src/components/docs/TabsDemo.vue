<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UTabs :items=&quot;['Account', 'Billing', 'Security']&quot;>
  <template #content>
    <div v-if=&quot;selected === 0&quot;>Account settings</div>
    <div v-else-if=&quot;selected === 1&quot;>Billing info</div>
    <div v-else>Security settings</div>
  </template>
</UTabs>`">
        <div class="demo-col">
          <UTabs :items="[{ label: 'Account' }, { label: 'Billing' }, { label: 'Security' }]" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icons</h3>
      <CodeCollapsible :code="`<UTabs :items=&quot;[{ label: 'Home', icon: 'i-ph-house' }, { label: 'Settings', icon: 'i-ph-gear-six' }]&quot; />`">
        <div class="demo-col">
          <UTabs :items="[{ label: 'Home', icon: 'i-ph-house' }, { label: 'Settings', icon: 'i-ph-gear-six' }]" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<UTabs :items=&quot;['Account', 'Billing', 'Security']&quot; :disabled=&quot;[1]&quot; />`">
        <div class="demo-col">
          <UTabs :items="[{ label: 'Account' }, { label: 'Billing', disabled: true }, { label: 'Security' }]" />
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 12px;
}
</style>
