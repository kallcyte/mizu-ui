<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const horizontalItems = [
  { label: "Home", icon: "i-lucide-house", to: "/" },
  {
    label: "Products",
    icon: "i-lucide-box",
    children: [
      { label: "Software", description: "Tools for modern teams", icon: "i-lucide-laptop" },
      { label: "Hardware", description: "Devices that work beautifully", icon: "i-lucide-monitor" },
      { label: "Services", description: "Support for your organization", icon: "i-lucide-handshake" },
    ],
  },
  { label: "About", icon: "i-lucide-info", to: "/about" },
];

const iconItems = [
  { label: "Dashboard", icon: "i-lucide-layout-dashboard", to: "/dashboard" },
  { label: "Settings", icon: "i-lucide-settings", to: "/settings" },
  { label: "Billing", icon: "i-lucide-credit-card", to: "/billing" },
  { label: "Help", icon: "i-lucide-circle-help", to: "/help" },
];

const groupedItems = [
  [
    { label: "Workspace", type: "label" as const },
    { label: "Overview", icon: "i-lucide-house", to: "/overview" },
    { label: "Projects", icon: "i-lucide-folder", to: "/projects" },
  ],
  [
    { label: "Account", type: "label" as const },
    { label: "Members", icon: "i-lucide-users", to: "/members" },
    { label: "Settings", icon: "i-lucide-settings", to: "/settings" },
  ],
];

const collapsedItems = [
  { label: "Home", icon: "i-lucide-house", to: "/" },
  { label: "Search", icon: "i-lucide-search", to: "/search" },
  { label: "Notifications", icon: "i-lucide-bell", to: "/notifications", chip: { color: "error" as const, text: 3 } },
  { label: "Settings", icon: "i-lucide-settings", to: "/settings" },
];

const activeItems = [
  { label: "Guide", icon: "i-lucide-book-open", active: true, children: [{ label: "Introduction", description: "Get started with Mizu" }, { label: "Installation", description: "Install the design system" }] },
  { label: "Components", icon: "i-lucide-box", children: [{ label: "Buttons", description: "Interactive controls" }, { label: "Navigation", description: "Navigation patterns" }] },
];

const colorItems = [
  { label: "Guide", icon: "i-lucide-book-open", to: "/guide" },
  { label: "Components", icon: "i-lucide-box", to: "/components", active: true },
  { label: "Resources", icon: "i-lucide-library", to: "/resources" },
];
const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
const selectedColor = ref<string>("primary");

const selectedVariant = ref<"pill" | "link">("pill");
const selectedOrientation = ref<"horizontal" | "vertical">("horizontal");
const activeValue = ref<string | undefined>(undefined);

const collapsed = ref(true);
const tooltip = ref(true);
const popover = ref(true);
const highlight = ref(true);
const arrow = ref(true);
const contentOrientation = ref<"horizontal" | "vertical">("vertical");

const customItems = [
  { label: "Guide", icon: "i-lucide-book-open", to: "/guide" },
  { label: "More", slot: "more" as const },
  { label: "GitHub", icon: "i-simple-icons-github", slot: "github" as const, to: "https://github.com/nuxt/ui", target: "_blank" },
];

const bottomItems = [
  { label: "Home", icon: "i-lucide-house", active: true },
  { label: "Samples", icon: "i-lucide-circle-play" },
  { label: "Explore", icon: "i-lucide-compass" },
  { label: "Library", icon: "i-lucide-bookmark" },
];
</script>

<template>
  <UApp>
    <div class="not-content demo-isolated demo-examples">
    <!-- Basic -->
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A horizontal navigation menu with nested children. Hover or click <code>Products</code> to open its content.</p>
      <CodeCollapsible :code="`<UNavigationMenu :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide"><UNavigationMenu :items="horizontalItems" class="w-full" /></div>
      </CodeCollapsible>
    </section>

    <!-- Items with icons and badges -->
    <section class="example-section">
      <h3>With Icons</h3>
      <p class="demo-description">Add <code>icon</code> and other Link properties to make destinations easier to scan.</p>
      <CodeCollapsible :code="`<UNavigationMenu :items=&quot;items&quot; orientation=&quot;vertical&quot; />`">
        <div class="demo-col"><UNavigationMenu :items="iconItems" orientation="vertical" /></div>
      </CodeCollapsible>
    </section>

    <!-- Grouped -->
    <section class="example-section">
      <h3>Grouped Items</h3>
      <p class="demo-description">Pass an array of arrays to create separated groups. Use <code>type="label"</code> for group headings.</p>
      <CodeCollapsible :code="`<UNavigationMenu orientation=&quot;vertical&quot; :items=&quot;groups&quot; />`">
        <div class="demo-col"><UNavigationMenu orientation="vertical" :items="groupedItems" class="w-56" /></div>
      </CodeCollapsible>
    </section>

    <!-- Orientation -->
    <section class="example-section">
      <h3>Orientation</h3>
      <p class="demo-description">Switch between top navigation and sidebar navigation with the <code>orientation</code> prop.</p>
      <CodeCollapsible :code="`<UNavigationMenu orientation=&quot;${selectedOrientation}&quot; :items=&quot;items&quot; />`">
        <div class="demo-col demo-col-wide">
          <div class="chip-row">
            <UButton :color="selectedOrientation === 'horizontal' ? 'primary' : undefined" label="horizontal" :variant="selectedOrientation === 'horizontal' ? 'soft' : 'ghost'" size="sm" @click="selectedOrientation = 'horizontal'" />
            <UButton :color="selectedOrientation === 'vertical' ? 'primary' : undefined" label="vertical" :variant="selectedOrientation === 'vertical' ? 'soft' : 'ghost'" size="sm" @click="selectedOrientation = 'vertical'" />
          </div>
          <UNavigationMenu :orientation="selectedOrientation" :items="horizontalItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Collapsed -->
    <section class="example-section">
      <h3>Collapsed</h3>
      <p class="demo-description">Collapse a vertical sidebar to show only icons. Use <code>tooltip</code> or <code>popover</code> to preserve discoverability.</p>
      <CodeCollapsible :code="`<UNavigationMenu ${collapsed ? 'collapsed ' : ''}orientation=&quot;vertical&quot; ${tooltip ? 'tooltip ' : ''}:items=&quot;items&quot; />`">
        <div class="demo-col demo-col-collapsed">
          <div class="chip-row">
            <UButton label="collapsed" :variant="collapsed ? 'soft' : 'ghost'" size="sm" @click="collapsed = !collapsed" />
            <UButton label="tooltip" :variant="tooltip ? 'soft' : 'ghost'" size="sm" @click="tooltip = !tooltip" />
          </div>
          <UNavigationMenu :collapsed="collapsed" orientation="vertical" :tooltip="tooltip" :items="collapsedItems" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Popover -->
    <section class="example-section">
      <h3>Collapsed with Popover</h3>
      <p class="demo-description">Set <code>popover</code> alongside <code>collapsed</code> to show nested children in a floating panel.</p>
      <CodeCollapsible :code="`<UNavigationMenu ${collapsed ? 'collapsed ' : ''}popover orientation=&quot;vertical&quot; :items=&quot;items&quot; />`">
        <div class="demo-col demo-col-collapsed">
          <div class="chip-row">
            <UButton label="collapsed" :variant="collapsed ? 'soft' : 'ghost'" size="sm" @click="collapsed = !collapsed" />
            <UButton label="popover" :variant="popover ? 'soft' : 'ghost'" size="sm" @click="popover = !popover" />
          </div>
          <UNavigationMenu :collapsed="collapsed" :popover="popover" orientation="vertical" :items="activeItems" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Highlight -->
    <section class="example-section">
      <h3>Highlight</h3>
      <p class="demo-description">Display a highlighted border for active items with <code>highlight</code>. The highlight follows the configured <code>highlight-color</code>.</p>
      <CodeCollapsible :code="`<UNavigationMenu ${highlight ? 'highlight ' : ''}highlight-color=&quot;primary&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <div class="chip-row">
            <UButton label="highlight" :color="highlight ? 'primary' : undefined" :variant="highlight ? 'soft' : 'ghost'" size="sm" @click="highlight = !highlight" />
          </div>
          <UNavigationMenu :highlight="highlight" highlight-color="primary" :items="activeItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Color -->
    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Change the active link color with the <code>color</code> prop.</p>
      <CodeCollapsible :code="`<UNavigationMenu color=&quot;${selectedColor}&quot; :items=&quot;items&quot; />`">
        <div class="demo-col demo-col-wide">
          <div class="chip-row">
            <UButton v-for="c in colors" :key="c" :label="c" :color="c" :variant="selectedColor === c ? 'soft' : 'outline'" size="sm" @click="selectedColor = c" />
          </div>
          <UNavigationMenu :color="selectedColor" :items="colorItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Variant -->
    <section class="example-section">
      <h3>Variant</h3>
      <p class="demo-description">Compare the <code>pill</code> and <code>link</code> visual variants.</p>
      <CodeCollapsible :code="`<UNavigationMenu variant=&quot;${selectedVariant}&quot; :items=&quot;items&quot; />`">
        <div class="demo-col demo-col-wide">
          <div class="chip-row">
            <UButton :color="selectedVariant === 'pill' ? 'primary' : undefined" label="pill" :variant="selectedVariant === 'pill' ? 'soft' : 'ghost'" size="sm" @click="selectedVariant = 'pill'" />
            <UButton :color="selectedVariant === 'link' ? 'primary' : undefined" label="link" :variant="selectedVariant === 'link' ? 'soft' : 'ghost'" size="sm" @click="selectedVariant = 'link'" />
          </div>
          <UNavigationMenu :variant="selectedVariant" :items="colorItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Arrow and content orientation -->
    <section class="example-section">
      <h3>Arrow and Content Orientation</h3>
      <p class="demo-description">Use <code>arrow</code> to point at open content and <code>content-orientation="vertical"</code> for a narrow flyout layout.</p>
      <CodeCollapsible :code="`<UNavigationMenu ${arrow ? 'arrow ' : ''}content-orientation=&quot;${contentOrientation}&quot; :items=&quot;items&quot; />`">
        <div class="demo-col demo-col-wide">
          <div class="chip-row">
            <UButton label="arrow" :variant="arrow ? 'soft' : 'ghost'" size="sm" @click="arrow = !arrow" />
            <UButton label="horizontal" :variant="contentOrientation === 'horizontal' ? 'soft' : 'ghost'" size="sm" @click="contentOrientation = 'horizontal'" />
            <UButton label="vertical" :variant="contentOrientation === 'vertical' ? 'soft' : 'ghost'" size="sm" @click="contentOrientation = 'vertical'" />
          </div>
          <UNavigationMenu :arrow="arrow" :content-orientation="contentOrientation" :items="horizontalItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Control active item -->
    <section class="example-section">
      <h3>Control Active Item</h3>
      <p class="demo-description">Use <code>v-model</code> with an item's <code>value</code> to control the active item externally. The displayed value updates when a menu trigger opens.</p>
      <CodeCollapsible :code="`<UNavigationMenu v-model=&quot;active&quot; :items=&quot;items&quot; />`">
        <div class="demo-col demo-col-wide">
          <UNavigationMenu v-model="activeValue" :items="horizontalItems" class="w-full" />
          <div class="text-xs text-muted">active = <code>{{ activeValue || 'none' }}</code></div>
        </div>
      </CodeCollapsible>
    </section>

    <!-- Custom slot -->
    <section class="example-section">
      <h3>With Custom Slot</h3>
      <p class="demo-description">Use an item's <code>slot</code> property and named slots to customize individual items.</p>
      <CodeCollapsible :code="`<UNavigationMenu :items=&quot;items&quot;>
  <template #more><UButton icon=&quot;i-lucide-ellipsis&quot; color=&quot;neutral&quot; variant=&quot;link&quot; /></template>
</UNavigationMenu>`">
        <div class="demo-col demo-col-wide">
          <UNavigationMenu :items="customItems" class="w-full">
            <template #more>
              <UButton icon="i-lucide-ellipsis" color="neutral" variant="link" aria-label="More navigation items" />
            </template>
            <template #github-trailing>
              <UBadge label="6k+" color="neutral" variant="subtle" size="sm" />
            </template>
          </UNavigationMenu>
        </div>
      </CodeCollapsible>
    </section>

    <!-- Bottom tab bar -->
    <section class="example-section">
      <h3>Bottom Tab Bar</h3>
      <p class="demo-description">Use <code>ui</code> overrides to turn NavigationMenu into a mobile-style bottom tab bar.</p>
      <CodeCollapsible :code="`<UNavigationMenu :items=&quot;items&quot; :ui=&quot;{ link: 'flex-col gap-1', linkLabel: 'text-[10px]/3' }&quot; />`">
        <div class="demo-col demo-col-wide">
          <UNavigationMenu :items="bottomItems" :ui="{ root: 'justify-around border-t border-default py-2', item: 'py-0', link: 'flex-col gap-1 px-3', linkLeadingIcon: 'size-5', linkLabel: 'text-[10px]/3 font-normal' }" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>
    </div>
  </UApp>
</template>

<style scoped>
.demo-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
  overflow: visible;
}
.example-section {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: visible;
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
  overflow: visible;
}
.demo-col-wide {
  width: 100%;
  max-width: 720px;
  overflow: visible;
  position: relative;
}
.demo-col-collapsed {
  width: fit-content;
  align-items: flex-start;
}
/* Allow NavigationMenu flyout to escape CodeCollapsible's overflow:hidden */
.demo-examples :deep(.code-collapsible),
.demo-examples :deep(.code-collapsible__preview) {
  overflow: visible;
}
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
