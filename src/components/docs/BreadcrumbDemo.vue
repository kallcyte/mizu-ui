<script setup lang="ts">
import { MizuBreadcrumb } from "@mizu/vue";
import { Home } from "@lucide/vue";

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
</script>

<template>
  <div class="breadcrumb-demo">
    <div class="demo-section">
      <h3>Basic</h3>
      <MizuBreadcrumb :items="twoItems" />
    </div>

    <div class="demo-section">
      <h3>Multi-level</h3>
      <MizuBreadcrumb :items="simpleItems" />
    </div>

    <div class="demo-section">
      <h3>Deep Nesting</h3>
      <MizuBreadcrumb :items="deepItems" />
    </div>

    <div class="demo-section">
      <h3>Separators</h3>
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
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
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
    </div>
  </div>
</template>

<style scoped>
.breadcrumb-demo {
  all: revert;
  font-family: var(--font-family-sans);
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: var(--sl-color-gray-2);
  border-radius: 8px;
}
.breadcrumb-demo :deep(*) { margin: 0; }
.breadcrumb-demo :deep(.mizu-breadcrumb__separator) { margin: 0 6px; }

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin-bottom: 0;
}
.demo-section > div {
  margin-top: 0;
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
