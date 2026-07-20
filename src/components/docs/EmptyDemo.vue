<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";

const basicCode = `<UEmpty
  icon="i-lucide-inbox"
  title="No items"
  description="There are no items in this collection yet."
/>`;

const withActionsCode = `<UEmpty
  icon="i-lucide-folder-open"
  title="No projects"
  description="Get started by creating a new project."
  :actions="[{ label: 'New Project', color: 'primary' }]"
/>`;

const avatarCode = `<UEmpty
  :avatar="{ src: 'https://github.com/nuxt.png', alt: 'Nuxt' }"
  title="Welcome to Nuxt UI"
  description="Explore the component library and build beautiful interfaces."
/>`;

const variantsCode = `<UEmpty variant="outline" icon="i-lucide-search" title="No results" description="Try adjusting your search." />
<UEmpty variant="solid" icon="i-lucide-search" title="No results" description="Try adjusting your search." />
<UEmpty variant="soft" icon="i-lucide-search" title="No results" description="Try adjusting your search." />
<UEmpty variant="subtle" icon="i-lucide-search" title="No results" description="Try adjusting your search." />
<UEmpty variant="naked" icon="i-lucide-search" title="No results" description="Try adjusting your search." />`;

const sizesCode = `<UEmpty size="xs" icon="i-lucide-inbox" title="Small" description="Extra small empty state." />
<UEmpty size="sm" icon="i-lucide-inbox" title="Small" description="Small empty state." />
<UEmpty size="md" icon="i-lucide-inbox" title="Medium" description="Medium empty state." />
<UEmpty size="lg" icon="i-lucide-inbox" title="Large" description="Large empty state." />
<UEmpty size="xl" icon="i-lucide-inbox" title="Extra Large" description="Extra large empty state." />`;

const slotsCode = `<UEmpty icon="i-lucide-database" title="No data">
  <template #description>
    <span class="text-brand-ycp">Custom description slot with styling.</span>
  </template>
  <template #actions>
    <UButton label="Import" color="neutral" variant="outline" />
    <UButton label="Create" color="primary" />
  </template>
</UEmpty>`;
const customImageCode = `<UEmpty
  title="No items"
  description="There are no items in this collection yet."
>
  <template #leading>
    <img
      src="/images/empty.svg"
      alt="Empty state illustration"
      class="empty-custom-img"
    />
  </template>
</UEmpty>`;
</script>

<template>
  <div class="empty-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Displays a simple empty state with an icon, title, and description using the <code>icon</code>, <code>title</code>, and <code>description</code> props.</p>
      <CodeCollapsible :code="basicCode">
        <div class="demo-row">
          <UEmpty
            icon="i-lucide-inbox"
            title="No items"
            description="There are no items in this collection yet."
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Actions</h3>
      <p class="demo-description">Adds action buttons to the empty state using the <code>:actions</code> prop, accepting an array of button configs with <code>label</code> and <code>color</code>.</p>
      <CodeCollapsible :code="withActionsCode">
        <div class="demo-row">
          <UEmpty
            icon="i-lucide-folder-open"
            title="No projects"
            description="Get started by creating a new project."
            :actions="[{ label: 'New Project', color: 'primary' }]"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Avatar</h3>
      <p class="demo-description">Replaces the icon with an avatar image using the <code>:avatar</code> prop with <code>src</code> and <code>alt</code> attributes.</p>
      <CodeCollapsible :code="avatarCode">
        <div class="demo-row">
          <UEmpty
            :avatar="{ src: 'https://github.com/nuxt.png', alt: 'Nuxt' }"
            title="Welcome to Nuxt UI"
            description="Explore the component library and build beautiful interfaces."
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variants</h3>
      <p class="demo-description">Five visual variants&mdash;<code>outline</code>, <code>solid</code>, <code>soft</code>, <code>subtle</code>, and <code>naked</code>&mdash;controlled via the <code>variant</code> prop.</p>
      <CodeCollapsible :code="variantsCode">
        <div class="empty-grid">
          <UEmpty variant="outline" icon="i-lucide-search" title="No results" description="Try adjusting your search." />
          <UEmpty variant="solid" icon="i-lucide-search" title="No results" description="Try adjusting your search." />
          <UEmpty variant="soft" icon="i-lucide-search" title="No results" description="Try adjusting your search." />
          <UEmpty variant="subtle" icon="i-lucide-search" title="No results" description="Try adjusting your search." />
          <UEmpty variant="naked" icon="i-lucide-search" title="No results" description="Try adjusting your search." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Five size variants&mdash;<code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, and <code>xl</code>&mdash;controlled via the <code>size</code> prop to fit different contexts.</p>
      <CodeCollapsible :code="sizesCode">
        <div class="empty-grid">
          <UEmpty size="xs" icon="i-lucide-inbox" title="XS" description="Extra small empty state." />
          <UEmpty size="sm" icon="i-lucide-inbox" title="SM" description="Small empty state." />
          <UEmpty size="md" icon="i-lucide-inbox" title="MD" description="Medium empty state." />
          <UEmpty size="lg" icon="i-lucide-inbox" title="LG" description="Large empty state." />
          <UEmpty size="xl" icon="i-lucide-inbox" title="XL" description="Extra large empty state." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Image (SVG)</h3>
      <p class="demo-description">Uses the <code>#leading</code> slot to replace the default icon with a custom SVG image for branded or illustrated empty states.</p>
      <CodeCollapsible :code="customImageCode">
        <div class="demo-row">
          <UEmpty
            title="No items"
            description="There are no items in this collection yet."
          >
            <template #leading>
              <img
                src="/images/empty.svg"
                alt="Empty state illustration"
                class="empty-custom-img"
              />
            </template>
          </UEmpty>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.empty-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.empty-examples :deep(*) {
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
.empty-custom-img {
  all: revert;
  width: 48px;
  height: 48px;
  object-fit: contain;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.empty-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
