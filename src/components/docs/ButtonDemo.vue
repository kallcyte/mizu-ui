<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
defineProps<{ section?: string }>();
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section v-if="!section || section === 'patterns'" class="example-section">
      <CodeCollapsible :code="`<!-- md -->
<UButton icon=&quot;i-ph-floppy-disk&quot; color=&quot;primary&quot; size=&quot;md&quot;>Save Changes</UButton>
<UButton variant=&quot;outline&quot; size=&quot;md&quot;>Open Page</UButton>
<UButton variant=&quot;ghost&quot; size=&quot;md&quot;>Cancel</UButton>
<UButton icon=&quot;i-ph-trash&quot; color=&quot;error&quot; variant=&quot;ghost&quot; size=&quot;md&quot;>Delete Item</UButton>
<UButton color=&quot;error&quot; size=&quot;md&quot;>Discard Changes</UButton>
<UButton icon=&quot;i-ph-sparkle&quot; color=&quot;nexus&quot; variant=&quot;outline&quot; size=&quot;md&quot;>New Feature</UButton>

<!-- sm -->
<UButton icon=&quot;i-ph-floppy-disk&quot; color=&quot;primary&quot; size=&quot;sm&quot;>Save Changes</UButton>
<UButton variant=&quot;outline&quot; size=&quot;sm&quot;>Open Page</UButton>
<UButton variant=&quot;ghost&quot; size=&quot;sm&quot;>Cancel</UButton>
<UButton icon=&quot;i-ph-trash&quot; color=&quot;error&quot; variant=&quot;ghost&quot; size=&quot;sm&quot;>Delete Item</UButton>
<UButton color=&quot;error&quot; size=&quot;sm&quot;>Discard Changes</UButton>
<UButton icon=&quot;i-ph-sparkle&quot; color=&quot;nexus&quot; variant=&quot;outline&quot; size=&quot;sm&quot;>New Feature</UButton>`">
        <div class="demo-row demo-row--wrap">
          <UButton icon="i-ph-floppy-disk" color="primary" size="md">Save Changes</UButton>
          <UButton variant="outline" size="md">Open Page</UButton>
          <UButton variant="ghost" size="md">Cancel</UButton>
          <UButton icon="i-ph-trash" color="error" variant="ghost" size="md">Delete Item</UButton>
          <UButton color="error" size="md">Discard Changes</UButton>
          <UButton icon="i-ph-sparkle" color="nexus" variant="outline" size="md">New Feature</UButton>
        </div>
        <div class="demo-row demo-row--wrap" style="margin-top: 12px;">
          <UButton icon="i-ph-floppy-disk" color="primary" size="sm">Save Changes</UButton>
          <UButton variant="outline" size="sm">Open Page</UButton>
          <UButton variant="ghost" size="sm">Cancel</UButton>
          <UButton icon="i-ph-trash" color="error" variant="ghost" size="sm">Delete Item</UButton>
          <UButton color="error" size="sm">Discard Changes</UButton>
          <UButton icon="i-ph-sparkle" color="nexus" variant="outline" size="sm">New Feature</UButton>
        </div>
      </CodeCollapsible>
    </section>

    <section v-if="!section || section === 'sizes'" class="example-section">
      <CodeCollapsible :code="`<UButton size=&quot;sm&quot;>Small</UButton>
<UButton size=&quot;md&quot;>Medium</UButton>
<UButton size=&quot;lg&quot;>Large</UButton>`">
        <div class="demo-row">
          <UButton size="sm" color="primary">Small</UButton>
          <UButton size="md" color="primary">Medium</UButton>
          <UButton size="lg" color="primary">Large</UButton>
        </div>
      </CodeCollapsible>
    </section>

    <section v-if="!section || section === 'colors'" class="example-section">
      <CodeCollapsible :code="`<UButton color=&quot;primary&quot;>Primary</UButton>
<UButton color=&quot;secondary&quot;>Secondary</UButton>
<UButton color=&quot;nexus&quot;>Nexus</UButton>
<UButton color=&quot;success&quot;>Success</UButton>
<UButton color=&quot;error&quot;>Error</UButton>
<UButton color=&quot;warning&quot;>Warning</UButton>
<UButton color=&quot;info&quot;>Info</UButton>
<UButton color=&quot;neutral&quot;>Neutral</UButton>`">
        <div class="demo-row demo-row--wrap">
          <UButton v-for="c in ['primary','secondary','nexus','success','error','warning','info','neutral']" :key="c" size="md" :color="c">{{ c.charAt(0).toUpperCase() + c.slice(1) }}</UButton>
        </div>
      </CodeCollapsible>
    </section>

    <section v-if="!section || section === 'variants'" class="example-section">
      <CodeCollapsible :code="`<UButton variant=&quot;solid&quot;>Solid</UButton>
<UButton variant=&quot;outline&quot;>Outline</UButton>
<UButton variant=&quot;ghost&quot;>Ghost</UButton>
<UButton variant=&quot;link&quot;>Link</UButton>`">
        <div class="demo-row demo-row--wrap">
          <UButton size="md" variant="solid">Solid</UButton>
          <UButton size="md" variant="outline">Outline</UButton>
          <UButton size="md" variant="ghost">Ghost</UButton>
          <UButton size="md" variant="link">Link</UButton>
        </div>
      </CodeCollapsible>
      <p class="text-xs text-foreground-tertiary mt-2"><strong>Soft</strong> and <strong>Subtle</strong> are also available via Nuxt UI but not part of the core Mizu design system:</p>
      <CodeCollapsible :code="`<UButton variant=&quot;soft&quot;>Soft</UButton>
<UButton variant=&quot;subtle&quot;>Subtle</UButton>`">
        <div class="demo-row">
          <UButton size="md" variant="soft">Soft</UButton>
          <UButton size="md" variant="subtle">Subtle</UButton>
        </div>
      </CodeCollapsible>
    </section>

    <section v-if="!section || section === 'icons'" class="example-section">
      <CodeCollapsible :code="`<UButton icon=&quot;i-ph-magnifying-glass&quot; size=&quot;md&quot; />
<UButton icon=&quot;i-ph-plus&quot; size=&quot;md&quot; trailing>Add</UButton>
<UButton icon=&quot;i-ph-gear-six&quot; size=&quot;md&quot;>Settings</UButton>
<UButton leading-icon=&quot;i-ph-arrow-left&quot; trailing-icon=&quot;i-ph-arrow-right&quot; size=&quot;md&quot;>Both</UButton>`">
        <div class="demo-row">
          <UButton icon="i-ph-magnifying-glass" size="md" color="primary" />
          <UButton icon="i-ph-plus" size="md" color="primary" trailing>Add</UButton>
          <UButton icon="i-ph-gear-six" size="md" color="primary">Settings</UButton>
          <UButton leading-icon="i-ph-arrow-left" trailing-icon="i-ph-arrow-right" size="md" color="primary">Both</UButton>
        </div>
      </CodeCollapsible>
    </section>

    <section v-if="!section || section === 'disabled'" class="example-section">
      <CodeCollapsible :code="`<UButton disabled>Disabled</UButton>
<UButton disabled variant=&quot;outline&quot;>Outline Disabled</UButton>`">
        <div class="demo-row">
          <UButton size="md" color="primary" disabled>Disabled</UButton>
          <UButton size="md" variant="outline" disabled>Outline Disabled</UButton>
        </div>
      </CodeCollapsible>
    </section>

    <section v-if="!section || section === 'loading'" class="example-section">
      <CodeCollapsible :code="`<UButton loading>Loading</UButton>
<UButton loading loading-icon=&quot;i-ph-spinner-gap&quot;>Custom Spinner</UButton>
<UButton loading variant=&quot;outline&quot;>Outline Loading</UButton>`">
        <div class="demo-row demo-row--wrap">
          <UButton size="md" color="primary" loading>Loading</UButton>
          <UButton size="md" color="primary" loading loading-icon="i-ph-spinner-gap">Custom Spinner</UButton>
          <UButton size="md" variant="outline" loading>Outline Loading</UButton>
        </div>
      </CodeCollapsible>
    </section>

    <section v-if="!section || section === 'link'" class="example-section">
      <CodeCollapsible :code="`<UButton to=&quot;/getting-started&quot; variant=&quot;link&quot;>Internal Link</UButton>
<UButton href=&quot;https://nuxt.com&quot; target=&quot;_blank&quot; variant=&quot;link&quot; trailing-icon=&quot;i-ph-arrow-square-out&quot;>External Link</UButton>`">
        <div class="demo-row">
          <UButton to="/getting-started" variant="link">Internal Link</UButton>
          <UButton href="https://nuxt.com" target="_blank" variant="link" trailing-icon="i-ph-arrow-square-out">External Link</UButton>
        </div>
      </CodeCollapsible>
    </section>

    <section v-if="!section || section === 'block'" class="example-section">
      <CodeCollapsible :code="`<UButton block>Full Width</UButton>
<UButton square icon=&quot;i-ph-magnifying-glass&quot; />
<UButton square icon=&quot;i-ph-plus&quot; color=&quot;secondary&quot; />`">
        <div class="flex flex-col gap-3 w-full">
          <UButton size="md" color="primary" block>Full Width</UButton>
          <div class="demo-row">
            <UButton square icon="i-ph-magnifying-glass" color="primary" />
            <UButton square icon="i-ph-plus" color="secondary" />
            <UButton square icon="i-ph-check" color="success" />
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <section v-if="!section || section === 'label'" class="example-section">
      <CodeCollapsible :code="`<UButton label=&quot;Button&quot; />
<UButton label=&quot;Primary&quot; color=&quot;primary&quot; />
<UButton label=&quot;Outline&quot; variant=&quot;outline&quot; />`">
        <div class="demo-row demo-row--wrap">
          <UButton label="Button" />
          <UButton label="Primary" color="primary" />
          <UButton label="Outline" variant="outline" />
        </div>
      </CodeCollapsible>
    </section>

    <section v-if="!section || section === 'avatar'" class="example-section">
      <CodeCollapsible :code="`<UButton :avatar=&quot;{ src: 'https://github.com/nuxt.png', size: '2xs' }&quot; size=&quot;sm&quot; variant=&quot;outline&quot;>Nuxt</UButton>
<UButton :avatar=&quot;{ src: 'https://github.com/nuxt.png', size: '2xs' }&quot; size=&quot;sm&quot; color=&quot;neutral&quot; variant=&quot;ghost&quot; />
<UButton :avatar=&quot;{ src: 'https://github.com/nuxt.png', size: '2xs' }&quot; size=&quot;sm&quot; trailing>Profile</UButton>`">
        <div class="demo-row demo-row--wrap">
          <UButton :avatar="{ src: 'https://github.com/nuxt.png', size: '2xs' }" size="sm" variant="outline">Nuxt</UButton>
          <UButton :avatar="{ src: 'https://github.com/nuxt.png', size: '2xs' }" size="sm" color="neutral" variant="ghost" />
          <UButton :avatar="{ src: 'https://github.com/nuxt.png', size: '2xs' }" size="sm" trailing>Profile</UButton>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.demo-examples { all: revert; display: flex; flex-direction: column; gap: 32px; font-family: inherit; }
.example-section { all: revert; display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
.example-section h3 { all: revert; font-size: 14px; font-weight: 600; color: var(--sl-color-text); margin: 0; }
.demo-row { all: revert; display: flex; align-items: center; gap: 8px; }
.demo-row--wrap { flex-wrap: wrap; }
</style>