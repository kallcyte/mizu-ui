<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";

const items = [
  { label: "Home", to: "/" },
  {
    label: "Products",
    children: [
      { label: "Software", to: "/products/software" },
      { label: "Hardware", to: "/products/hardware" },
      { label: "Services", to: "/products/services" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Documentation", to: "/docs" },
      { label: "API", to: "/api" },
    ],
  },
  { label: "About", to: "/about" },
];

const verticalItems = [
  { label: "Dashboard", to: "/dashboard", icon: "i-ph-house" },
  { label: "Settings", to: "/settings", icon: "i-ph-gear-six" },
  { label: "Billing", to: "/billing", icon: "i-ph-credit-card" },
  { label: "Help", to: "/help", icon: "i-ph-question" },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Horizontal</h3>
      <p class="demo-description">Default horizontal navigation bar with nested dropdown children for multi-level menus.</p>
      <CodeCollapsible :code="`<UNavigationMenu :items=&quot;[
  { label: 'Home', to: '/' },
  { label: 'Products', children: [
    { label: 'Software', to: '/products/software' },
    { label: 'Hardware', to: '/products/hardware' },
  ]},
  { label: 'About', to: '/about' },
]&quot; />`">
        <div class="demo-col">
          <UNavigationMenu :items="items" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Vertical with Icons</h3>
      <p class="demo-description">The <code>orientation="vertical"</code> prop creates a sidebar-style menu with leading icons on each item.</p>
      <CodeCollapsible :code="`<UNavigationMenu
  :items=&quot;[
    { label: 'Dashboard', to: '/dashboard', icon: 'i-ph-house' },
    { label: 'Settings', to: '/settings', icon: 'i-ph-gear-six' },
  ]&quot;
  orientation=&quot;vertical&quot;
/>`">
        <div class="demo-col">
          <UNavigationMenu :items="verticalItems" orientation="vertical" />
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
