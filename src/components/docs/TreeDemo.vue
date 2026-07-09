<script setup lang="ts">
import { UTree } from "@nuxt/ui";
import type { TreeItem } from "@nuxt/ui";
import CodeCollapsible from "./CodeCollapsible.vue";

const items: TreeItem[] = [
  {
    label: "app/",
    defaultExpanded: true,
    children: [
      {
        label: "composables/",
        children: [
          { label: "useAuth.ts", icon: "i-vscode-icons-file-type-typescript" },
          { label: "useUser.ts", icon: "i-vscode-icons-file-type-typescript" },
        ],
      },
      {
        label: "components/",
        defaultExpanded: true,
        children: [
          { label: "Card.vue", icon: "i-vscode-icons-file-type-vue" },
          { label: "Button.vue", icon: "i-vscode-icons-file-type-vue" },
        ],
      },
    ],
  },
  { label: "app.vue", icon: "i-vscode-icons-file-type-vue" },
  { label: "nuxt.config.ts", icon: "i-vscode-icons-file-type-nuxt" },
];

const basicCode = `<UTree :items="items" />`;

const multipleCode = `<UTree :items="items" multiple />`;

const colorCode = `<UTree :items="items" color="neutral" />`;

const sizeCode = `<UTree :items="items" size="sm" />
<UTree :items="items" size="md" />
<UTree :items="items" size="xl" />`;

const iconsCode = `<UTree
  :items="items"
  expanded-icon="i-lucide-book-open"
  collapsed-icon="i-lucide-book"
  trailing-icon="i-lucide-arrow-down"
/>`;
</script>

<template>
  <div class="tree-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <UTree :items="items" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple Selection</h3>
      <CodeCollapsible :code="multipleCode">
        <UTree :items="items" multiple />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <CodeCollapsible :code="colorCode">
        <UTree :items="items" color="neutral" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizeCode">
        <div class="tree-grid">
          <div>
            <h4>Small</h4>
            <UTree :items="items" size="sm" />
          </div>
          <div>
            <h4>Medium</h4>
            <UTree :items="items" size="md" />
          </div>
          <div>
            <h4>Extra Large</h4>
            <UTree :items="items" size="xl" />
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Icons</h3>
      <CodeCollapsible :code="iconsCode">
        <UTree
          :items="items"
          expanded-icon="i-lucide-book-open"
          collapsed-icon="i-lucide-book"
          trailing-icon="i-lucide-arrow-down"
        />
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.tree-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.tree-examples :deep(*) {
  margin: 0;
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

.example-section h4 {
  font-size: 12px;
  font-weight: 500;
  color: var(--sl-color-text-light);
  margin-bottom: 8px;
  margin-top: 0;
}

.tree-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
</style>
