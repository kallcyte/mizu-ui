<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";

const columns = [
  {
    label: "Product",
    children: [
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "Changelog", to: "/changelog" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Documentation", to: "/docs" },
      { label: "API", to: "/api" },
      { label: "Support", to: "/support" },
    ],
  },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Renders multi-column footer navigation using the <code>:columns</code> prop with nested label and children link arrays.</p>
      <CodeCollapsible :code="`<UFooterColumns
  :columns=&quot;[
    { label: 'Product', children: [
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
    ]},
    { label: 'Company', children: [
      { label: 'About', to: '/about' },
      { label: 'Blog', to: '/blog' },
    ]},
  ]&quot;
/>`">
        <div class="demo-col">
          <UFooterColumns :columns="columns" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With External Links</h3>
      <p class="demo-description">Supports external links with <code>href</code>, <code>target</code>, and optional <code>icon</code> props for social or resource links.</p>
      <CodeCollapsible :code="`<UFooterColumns
  :columns=&quot;[
    { label: 'Social', children: [
      { label: 'GitHub', href: 'https://github.com', target: '_blank', icon: 'i-ph-github-logo' },
      { label: 'Twitter', href: 'https://twitter.com', target: '_blank', icon: 'i-ph-twitter-logo' },
    ]},
  ]&quot;
/>`">
        <div class="demo-col">
          <UFooterColumns
            :columns="[
              {
                label: 'Social',
                children: [
                  { label: 'GitHub', href: 'https://github.com', target: '_blank', icon: 'i-ph-github-logo' },
                  { label: 'Twitter', href: 'https://twitter.com', target: '_blank', icon: 'i-ph-twitter-logo' },
                ],
              },
            ]"
          />
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
