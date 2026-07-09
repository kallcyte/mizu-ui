<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UBreadcrumb :items=&quot;[
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs' },
  { label: 'Components' }
]&quot; />`">
        <div class="demo-col">
          <UBreadcrumb :items="[
            { label: 'Home', href: '/' },
            { label: 'Docs', href: '/docs' },
            { label: 'Components' },
          ]" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icons</h3>
      <CodeCollapsible :code="`<UBreadcrumb :items=&quot;[
  { label: 'Home', icon: 'i-ph-house' },
  { label: 'Dashboard' }
]&quot; />`">
        <div class="demo-col">
          <UBreadcrumb :items="[
            { label: 'Home', icon: 'i-ph-house' },
            { label: 'Dashboard' },
          ]" />
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
  gap: 8px;
}
</style>
