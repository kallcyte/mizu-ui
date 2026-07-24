<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
import { ref } from "vue";

const colors = [
  { label: "primary", value: "primary" },
  { label: "secondary", value: "secondary" },
  { label: "success", value: "success" },
  { label: "info", value: "info" },
  { label: "warning", value: "warning" },
  { label: "error", value: "error" },
  { label: "neutral", value: "neutral" },
] as const;

const selectedColor = ref<(typeof colors)[number]["value"]>("primary");
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <!-- Basic -->
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Navigation breadcrumbs showing the current page location within a hierarchy. The last item without a <code>to</code> prop is automatically treated as the current page.</p>
      <CodeCollapsible :code="`<UBreadcrumb :items=&quot;[
  { label: 'Home', icon: 'i-lucide-book-open', href: '/' },
  { label: 'Docs', icon: 'i-lucide-box', href: '/docs' },
  { label: 'Components' }
]&quot; />`">
        <div class="demo-col">
          <UBreadcrumb :items="[
            { label: 'Home', icon: 'i-lucide-book-open', href: '/' },
            { label: 'Docs', icon: 'i-lucide-box', href: '/docs' },
            { label: 'Components' },
          ]" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Separator Icon -->
    <section class="example-section">
      <h3>Separator Icon</h3>
      <p class="demo-description">Customize the separator icon between breadcrumb items using the <code>separator-icon</code> prop. Defaults to <code>i-lucide-chevron-right</code>.</p>
      <CodeCollapsible :code="`<UBreadcrumb separator-icon=&quot;i-lucide-arrow-right&quot; :items=&quot;[
  { label: 'Home', icon: 'i-lucide-book-open', href: '/' },
  { label: 'Docs', icon: 'i-lucide-box', href: '/docs' },
  { label: 'Components' }
]&quot; />`">
        <div class="demo-col">
          <UBreadcrumb :items="[
            { label: 'Home', icon: 'i-lucide-book-open', href: '/' },
            { label: 'Docs', icon: 'i-lucide-box', href: '/docs' },
            { label: 'Components' },
          ]" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Color -->
    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Change the color of the active (last) breadcrumb item. Available colors: <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>info</code>, <code>warning</code>, <code>error</code>, <code>neutral</code>.</p>
      <CodeCollapsible :code="`<UBreadcrumb color=&quot;${selectedColor}&quot; :items=&quot;[
  { label: 'Home', icon: 'i-lucide-book-open', href: '/' },
  { label: 'Docs', icon: 'i-lucide-box', href: '/docs' },
  { label: 'Components' }
]&quot; />`">
        <div class="demo-col demo-gap-lg">
          <div class="color-selector">
            <button
              v-for="color in colors"
              :key="color.value"
              :class="['color-chip', selectedColor === color.value && 'color-chip--active']"
              @click="selectedColor = color.value"
            >
              {{ color.label }}
            </button>
          </div>
          <UBreadcrumb :color="selectedColor" :items="[
            { label: 'Home', icon: 'i-lucide-book-open', href: '/' },
            { label: 'Docs', icon: 'i-lucide-box', href: '/docs' },
            { label: 'Components' },
          ]" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Sizes -->
    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Nuxt UI breadcrumb doesn't expose a <code>size</code> prop — it defaults to <code>text-sm</code>. Use the <code>:ui</code> prop to override the link slot class for custom sizes.</p>
      <CodeCollapsible :code="`<UBreadcrumb :ui=&quot;{ link: 'text-xs' }&quot; :items=&quot;[
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs' },
  { label: 'Components' }
]&quot; />`">
        <div class="demo-col demo-gap-lg">
          <div class="size-row">
            <span class="size-label">xs</span>
            <UBreadcrumb :ui="{ link: 'text-xs' }" :items="[
              { label: 'Home', href: '/' },
              { label: 'Docs', href: '/docs' },
              { label: 'Components' },
            ]" />
          </div>
          <div class="size-row">
            <span class="size-label">sm</span>
            <UBreadcrumb :ui="{ link: 'text-sm' }" :items="[
              { label: 'Home', href: '/' },
              { label: 'Docs', href: '/docs' },
              { label: 'Components' },
            ]" />
          </div>
          <div class="size-row">
            <span class="size-label">base</span>
            <UBreadcrumb :ui="{ link: 'text-base' }" :items="[
              { label: 'Home', href: '/' },
              { label: 'Docs', href: '/docs' },
              { label: 'Components' },
            ]" />
          </div>
          <div class="size-row">
            <span class="size-label">lg</span>
            <UBreadcrumb :ui="{ link: 'text-lg' }" :items="[
              { label: 'Home', href: '/' },
              { label: 'Docs', href: '/docs' },
              { label: 'Components' },
            ]" />
          </div>
          <div class="size-row">
            <span class="size-label">xl</span>
            <UBreadcrumb :ui="{ link: 'text-xl' }" :items="[
              { label: 'Home', href: '/' },
              { label: 'Docs', href: '/docs' },
              { label: 'Components' },
            ]" />
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <!-- With separator slot -->
    <section class="example-section">
      <h3>With separator slot</h3>
      <p class="demo-description">Use the <code>#separator</code> slot to render a custom separator between each item.</p>
      <CodeCollapsible :code="`<UBreadcrumb :items=&quot;[
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/docs/components' },
  { label: 'Breadcrumb' }
]&quot;>
  <template #separator>
    <span class=&quot;mx-2 text-xs text-(--ui-text-muted)&quot;>/</span>
  </template>
</UBreadcrumb>`">
        <div class="demo-col">
          <UBreadcrumb :items="[
            { label: 'Docs', href: '/docs' },
            { label: 'Components', href: '/docs/components' },
            { label: 'Breadcrumb' },
          ]">
            <template #separator>
              <span class="mx-2 text-xs text-(--ui-text-muted)">/</span>
            </template>
          </UBreadcrumb>
        </div>
      </CodeCollapsible>
    </section>

    <!-- With custom slot (dropdown) -->
    <section class="example-section">
      <h3>With custom slot (dropdown)</h3>
      <p class="demo-description">Use the <code>slot</code> property on an item to render a custom component for that position — such as a collapsed ellipsis dropdown.</p>
      <CodeCollapsible :code="`<UBreadcrumb :items=&quot;[
  { label: 'Home', href: '/' },
  { slot: 'dropdown', icon: 'i-lucide-ellipsis', children: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Themes' },
    { label: 'GitHub' }
  ] },
  { label: 'Components', href: '/docs/components' },
  { label: 'Breadcrumb' }
]&quot;>
  <template #dropdown=&quot;{ item }&quot;>
    <UDropdownMenu :items=&quot;item.children&quot;>
      <UButton :icon=&quot;item.icon&quot; color=&quot;neutral&quot; variant=&quot;link&quot; class=&quot;p-0.5&quot; />
    </UDropdownMenu>
  </template>
</UBreadcrumb>`">
        <div class="demo-col">
          <UBreadcrumb :items="[
            { label: 'Home', href: '/' },
            { slot: 'dropdown', icon: 'i-lucide-ellipsis', children: [
              { label: 'Documentation', href: '/docs' },
              { label: 'Themes' },
              { label: 'GitHub' },
            ] },
            { label: 'Components', href: '/docs/components' },
            { label: 'Breadcrumb' },
          ]">
            <template #dropdown="{ item }">
              <UDropdownMenu :items="item.children">
                <UButton :icon="item.icon" color="neutral" variant="link" class="p-0.5" />
              </UDropdownMenu>
            </template>
          </UBreadcrumb>
        </div>
      </CodeCollapsible>
    </section>

    <!-- With Icons -->
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
.demo-gap-lg {
  gap: 16px;
}
.size-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.size-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--sl-color-text-light);
  min-width: 28px;
  text-align: right;
  font-family: monospace;
}
.color-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.color-chip {
  all: unset;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: var(--color-surface-muted, #F3F4F6);
  color: var(--sl-color-text-light);
  border: 1px solid transparent;
  transition: all 0.15s;
}
.color-chip:hover {
  background: var(--color-surface-muted-hover, #E5E7EB);
}
.color-chip--active {
  background: var(--sl-color-text-accent);
  color: var(--sl-color-bg);
  border-color: var(--sl-color-text-accent);
}
</style>
