<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const items = [
  { label: "Getting Started", content: "Learn the basics of setting up your project and installing dependencies.", value: "start" },
  { label: "Configuration", content: "Configure your application with environment variables and options.", value: "config" },
  { label: "Deployment", content: "Deploy your application to production with best practices.", value: "deploy" },
];

const itemsWithIcons = [
  { label: "Getting Started", icon: "i-ph-rocket-launch", content: "Learn the basics of setting up your project and installing dependencies.", value: "start" },
  { label: "Configuration", icon: "i-ph-gear", content: "Configure your application with environment variables and options.", value: "config" },
  { label: "Deployment", icon: "i-ph-cloud", content: "Deploy your application to production with best practices.", value: "deploy" },
];

const singleCode = `<UAccordion :items="items" />`;

const multipleCode = `<UAccordion type="multiple" :items="items" />`;

const defaultOpenCode = `<UAccordion :items="items" default-value="config" />`;

const collapsibleCode = `<UAccordion :items="items" :collapsible="false" />`;

const unmountCode = `<UAccordion :items="items" :unmount-on-hide="false" />`;

const controlCode = `<UAccordion v-model="active" :items="items" />`;

const trailingIconCode = `<UAccordion :items="items">
  <template #trailing="{ open }">
    <UIcon :name="open ? 'i-ph-minus-circle' : 'i-ph-plus-circle'" class="size-5" />
  </template>
</UAccordion>`;

const contentSlotCode = `<UAccordion :items="items">
  <template #content="{ item }">
    <div class="p-4 text-sm bg-[var(--color-surface-subtle)] rounded-md">
      {{ item.content }}
    </div>
  </template>
</UAccordion>`;

const customSlotCode = `<UAccordion :items="items">
  <template #leading="{ item }">
    <UIcon :name="item.icon" class="size-5" />
  </template>
  <template #body="{ item }">
    <div class="p-4">
      {{ item.content }}
    </div>
  </template>
</UAccordion>`;

const active = ref("");
</script>

<template>
  <div class="accordion-examples">
    <section class="example-section">
      <h3>Single (Default)</h3>
      <p class="demo-description">Only one item can be open at a time. Opening another item automatically closes the previous one.</p>
      <CodeCollapsible :code="singleCode">
        <div class="demo-row">
          <UAccordion :items="items" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple</h3>
      <p class="demo-description">Allow multiple items to be open simultaneously using the <code>type="multiple"</code> prop.</p>
      <CodeCollapsible :code="multipleCode">
        <div class="demo-row">
          <UAccordion type="multiple" :items="items" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Default Open</h3>
      <p class="demo-description">Specify an item to be open by default using the <code>default-value</code> prop.</p>
      <CodeCollapsible :code="defaultOpenCode">
        <div class="demo-row">
          <UAccordion :items="items" default-value="config" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Not Collapsible</h3>
      <p class="demo-description">Prevent all items from being collapsed by setting <code>:collapsible="false"</code>. At least one item stays open.</p>
      <CodeCollapsible :code="collapsibleCode">
        <div class="demo-row">
          <UAccordion :items="items" :collapsible="false" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Unmount on Hide</h3>
      <p class="demo-description">Keep content mounted in the DOM when collapsed by setting <code>:unmount-on-hide="false"</code>.</p>
      <CodeCollapsible :code="unmountCode">
        <div class="demo-row">
          <UAccordion :items="items" :unmount-on-hide="false" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Control Active Items</h3>
      <p class="demo-description">Programmatically control which items are active using <code>v-model</code> binding.</p>
      <CodeCollapsible :code="controlCode">
        <div class="demo-row">
          <UAccordion v-model="active" :items="items" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Trailing Icon</h3>
      <p class="demo-description">Customize the expand/collapse icon using the <code>#trailing</code> slot with conditional rendering based on open state.</p>
      <CodeCollapsible :code="trailingIconCode">
        <div class="demo-row">
          <UAccordion :items="items" class="w-full">
            <template #trailing="{ open }">
              <UIcon :name="open ? 'i-ph-minus-circle' : 'i-ph-plus-circle'" class="size-5" />
            </template>
          </UAccordion>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Content Slot</h3>
      <p class="demo-description">Override the content area for each item using the <code>#content</code> slot with custom styling.</p>
      <CodeCollapsible :code="contentSlotCode">
        <div class="demo-row">
          <UAccordion :items="items" class="w-full">
            <template #content="{ item }">
              <div class="p-4 text-sm bg-[var(--color-surface-subtle)] rounded-md">
                {{ item.content }}
              </div>
            </template>
          </UAccordion>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Slots</h3>
      <p class="demo-description">Full customization with leading icons, custom body content, and item-specific data.</p>
      <CodeCollapsible :code="customSlotCode">
        <div class="demo-row">
          <UAccordion :items="itemsWithIcons" class="w-full">
            <template #leading="{ item }">
              <UIcon :name="item.icon" class="size-5" />
            </template>
            <template #body="{ item }">
              <div class="p-4 text-sm text-foreground-secondary">
                {{ item.content }}
              </div>
            </template>
          </UAccordion>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Disable the entire accordion to prevent user interaction.</p>
      <CodeCollapsible code="<UAccordion :items=&quot;items&quot; disabled />">
        <div class="demo-row">
          <UAccordion :items="items" disabled class="w-full" />
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.accordion-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.accordion-examples :deep(*) {
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
.demo-row {
  all: revert;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
</style>