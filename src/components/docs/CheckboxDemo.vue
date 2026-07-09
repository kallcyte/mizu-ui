<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const checked = ref(false);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>States</h3>
      <CodeCollapsible :code="`<UCheckbox v-model=&quot;checked&quot; label=&quot;Accept terms&quot; />
<UCheckbox label=&quot;Unchecked&quot; />
<UCheckbox label=&quot;Required -- agree to continue&quot; required />`">
        <div class="demo-col">
          <UCheckbox v-model="checked" label="Accept terms" />
          <UCheckbox label="Unchecked" />
          <UCheckbox label="Required — agree to continue" required />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Description</h3>
      <CodeCollapsible :code="`<UCheckbox label=&quot;Subscribe&quot; description=&quot;Receive product updates and tips.&quot; />`">
        <div class="demo-col">
          <UCheckbox label="Subscribe" description="Receive product updates and tips." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<UCheckbox disabled label=&quot;Checked -- disabled&quot; :default-value=&quot;true&quot; />
<UCheckbox disabled label=&quot;Unchecked -- disabled&quot; />`">
        <div class="demo-col">
          <UCheckbox disabled label="Checked — disabled" :default-value="true" />
          <UCheckbox disabled label="Unchecked — disabled" />
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
  gap: 12px;
}
</style>
