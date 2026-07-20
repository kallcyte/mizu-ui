<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const selected = ref<string | null>(null);

const groups = [
  {
    key: "actions",
    label: "Actions",
    items: [
      { id: "new-file", label: "New File", description: "Create a new file" },
      { id: "new-folder", label: "New Folder", description: "Create a new folder" },
      { id: "search", label: "Search", description: "Search across files" },
    ],
  },
  {
    key: "navigation",
    label: "Navigation",
    items: [
      { id: "dashboard", label: "Dashboard", description: "Go to dashboard" },
      { id: "settings", label: "Settings", description: "Manage account" },
      { id: "profile", label: "Profile", description: "View profile" },
    ],
  },
  {
    key: "files",
    label: "Recent Files",
    items: [
      { id: "readme", label: "README.md", description: "Project documentation" },
      { id: "config", label: "config.ts", description: "Configuration file" },
      { id: "app", label: "App.vue", description: "Root component" },
    ],
  },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A searchable command palette with grouped items, keyboard navigation, and <code>v-model</code> selection binding.</p>
      <CodeCollapsible :code="`<UCommandPalette
  :groups=&quot;[
    { key: 'actions', label: 'Actions', items: [
      { id: 'new', label: 'New File' },
      { id: 'search', label: 'Search' },
    ]},
  ]&quot;
  placeholder=&quot;Type a command...&quot;
  @update:model-value=&quot;handleSelect&quot;
/>`">
        <div class="demo-col">
          <UCommandPalette
            :groups="groups"
            placeholder="Type a command or search..."
            @update:model-value="selected = $event"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icons</h3>
      <p class="demo-description">Add visual cues to items with the <code>icon</code> property and set a leading icon on the search input via the <code>icon</code> prop.</p>
      <CodeCollapsible :code="`<UCommandPalette
  :groups=&quot;[
    { key: 'nav', items: [
      { id: 'home', label: 'Home', icon: 'i-ph-house' },
      { id: 'search', label: 'Search', icon: 'i-ph-magnifying-glass' },
    ]},
  ]&quot;
  icon=&quot;i-ph-magnifying-glass&quot;
/>`">
        <div class="demo-col">
          <UCommandPalette
            :groups="[
              {
                key: 'nav',
                items: [
                  { id: 'home', label: 'Home', icon: 'i-ph-house' },
                  { id: 'search', label: 'Search', icon: 'i-ph-magnifying-glass' },
                  { id: 'settings', label: 'Settings', icon: 'i-ph-gear-six' },
                ],
              },
            ]"
            icon="i-ph-magnifying-glass"
            placeholder="Search with icon..."
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
  all: revert;
  font-size: 13px;
  color: var(--sl-color-text-light);
  margin: 0;
  line-height: 1.5;
}
.demo-description code {
  all: revert;
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
