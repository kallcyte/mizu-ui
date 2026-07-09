<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";

const items = [
  { label: 'Edit', icon: 'i-ph-pencil' },
  { label: 'Duplicate', icon: 'i-ph-copy' },
  { type: 'separator' as const },
  { label: 'Delete', icon: 'i-ph-trash', color: 'error' },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UDropdownMenu :items=&quot;[
  { label: 'Edit', icon: 'i-ph-pencil' },
  { label: 'Duplicate', icon: 'i-ph-copy' },
  { label: 'Delete', icon: 'i-ph-trash', color: 'error' }
]&quot;>
  <UButton label=&quot;Actions&quot; trailing-icon=&quot;i-ph-caret-down&quot; />
</UDropdownMenu>`">
        <div class="demo-col">
          <UDropdownMenu :items="items">
            <UButton label="Actions" trailing-icon="i-ph-caret-down" />
          </UDropdownMenu>
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
  width: max-content;
}
</style>
