<script setup lang="ts">
import { MizuBreadcrumb } from "@mizu/vue";
import { Home } from "@lucide/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const simpleItems = [
  { label: "", href: "/", icon: Home },
  { label: "Products", href: "/products" },
  { label: "Laptop Stand" },
];

const deepItems = [
  { label: "", href: "/", icon: Home },
  { label: "Sales", href: "/sales" },
  { label: "Orders", href: "/sales/orders" },
  { label: "Invoice #1234" },
];

const twoItems = [
  { label: "", href: "/", icon: Home },
  { label: "Settings" },
];

const basicCode = `const items = [
  { label: "", href: "/", icon: Home },
  { label: "Settings" },
];

<MizuBreadcrumb :items="items" />`;

const multiLevelCode = `const items = [
  { label: "", href: "/", icon: Home },
  { label: "Products", href: "/products" },
  { label: "Laptop Stand" },
];

<MizuBreadcrumb :items="items" />`;

const deepNestingCode = `const items = [
  { label: "", href: "/", icon: Home },
  { label: "Sales", href: "/sales" },
  { label: "Orders", href: "/sales/orders" },
  { label: "Invoice #1234" },
];

<MizuBreadcrumb :items="items" />`;

const separatorsCode = `<MizuBreadcrumb :items="items" separator="/" />
<MizuBreadcrumb :items="items" separator=">" />
<MizuBreadcrumb :items="items" separator="·" />`;

const sizesCode = `<MizuBreadcrumb :items="items" size="sm" />
<MizuBreadcrumb :items="items" size="md" />
<MizuBreadcrumb :items="items" size="lg" />`;
</script>

<template>
  <div class="breadcrumb-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <MizuBreadcrumb :items="twoItems" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multi-level</h3>
      <CodeCollapsible :code="multiLevelCode">
        <MizuBreadcrumb :items="simpleItems" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Deep Nesting</h3>
      <CodeCollapsible :code="deepNestingCode">
        <MizuBreadcrumb :items="deepItems" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Separators</h3>
      <CodeCollapsible :code="separatorsCode">
        <div class="separator-row">
          <span class="label">Slash</span>
          <MizuBreadcrumb :items="simpleItems" separator="/" />
        </div>
        <div class="separator-row">
          <span class="label">Chevron</span>
          <MizuBreadcrumb :items="simpleItems" separator=">" />
        </div>
        <div class="separator-row">
          <span class="label">Dot</span>
          <MizuBreadcrumb :items="simpleItems" separator="·" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="size-row">
          <span class="label">Small</span>
          <MizuBreadcrumb :items="simpleItems" size="sm" />
        </div>
        <div class="size-row">
          <span class="label">Medium</span>
          <MizuBreadcrumb :items="simpleItems" size="md" />
        </div>
        <div class="size-row">
          <span class="label">Large</span>
          <MizuBreadcrumb :items="simpleItems" size="lg" />
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.breadcrumb-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.breadcrumb-examples :deep(*) { margin: 0; }
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

.separator-row,
.size-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.separator-row .label,
.size-row .label {
  font-size: 12px;
  font-weight: 500;
  color: var(--sl-color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
