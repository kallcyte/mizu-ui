<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Navigation breadcrumbs showing the current page location within a hierarchy. The last item is automatically treated as the current page.</p>
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
      <p class="demo-description">Add leading icons to breadcrumb items using the <code>icon</code> property for enhanced visual navigation.</p>
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
  gap: 8px;
}
</style>
