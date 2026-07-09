<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Internal Link</h3>
      <CodeCollapsible :code="`<ULink to=&quot;/components/navigation/link&quot;>
  Go to Link page
</ULink>`">
        <div class="demo-col">
          <ULink to="/components/navigation/link">
            Go to Link page
          </ULink>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>External Link</h3>
      <CodeCollapsible :code="`<ULink href=&quot;https://github.com&quot; target=&quot;_blank&quot;>
  GitHub &amp;rarr;
</ULink>`">
        <div class="demo-col">
          <ULink href="https://github.com" target="_blank">
            GitHub &rarr;
          </ULink>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<ULink to=&quot;/dashboard&quot; disabled>
  Dashboard
</ULink>`">
        <div class="demo-col">
          <ULink to="/dashboard" disabled>
            Dashboard
          </ULink>
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
  gap: 8px;
}
</style>
