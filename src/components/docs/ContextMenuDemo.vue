<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";

const items = [
  [
    { label: "Back", icon: "i-lucide-arrow-left", type: "label" as const },
    { label: "Forward", icon: "i-lucide-arrow-right", type: "label" as const },
    { label: "Reload", icon: "i-lucide-refresh-cw", type: "label" as const },
  ],
  [
    { label: "Bookmark", icon: "i-lucide-bookmark", type: "label" as const },
    { label: "Save As...", icon: "i-lucide-download", type: "label" as const },
  ],
  [
    { label: "Print...", icon: "i-lucide-printer", type: "label" as const },
    { label: "Cast...", icon: "i-lucide-cast", type: "label" as const },
  ],
  [
    { label: "Zoom", icon: "i-lucide-search", type: "label" as const, children: [
      { label: "Zoom In", icon: "i-lucide-zoom-in", type: "label" as const },
      { label: "Zoom Out", icon: "i-lucide-zoom-out", type: "label" as const },
    ]},
  ],
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A right-click context menu with nested items and submenus, triggered by wrapping any element with <code>UContextMenu</code>.</p>
      <CodeCollapsible :code="`<UContextMenu :items=&quot;items&quot;>
  <div class=&quot;p-8 border-2 border-dashed rounded-lg text-center&quot;>
    Right-click here
  </div>
</UContextMenu>`">
        <div class="demo-row">
          <UContextMenu :items="items">
            <div class="p-8 border-2 border-dashed border-surface-muted rounded-lg text-center text-sm text-foreground-secondary cursor-context-menu">
              Right-click on this area to open the context menu
            </div>
          </UContextMenu>
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
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
