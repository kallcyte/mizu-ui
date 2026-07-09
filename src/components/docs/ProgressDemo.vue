<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UProgress :model-value=&quot;60&quot; />`">
        <div class="demo-col">
          <UProgress :model-value="60" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>States</h3>
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 12px;
  max-width: 300px;
}
</style>
