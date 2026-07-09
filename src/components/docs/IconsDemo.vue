<script setup lang="ts">
import { ref, computed } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const search = ref("");
const filter = ref("all");

const collections = [
  { id: "ph", name: "Phosphor", description: "Mizu's default — clean, balanced, friendly.", count: 9072, sample: "house" },
  { id: "lucide", name: "Lucide", description: "Fork of Feather Icons. Crisp 1.5px strokes.", count: 1500, sample: "home" },
  { id: "heroicons", name: "Heroicons", description: "By the Tailwind CSS team. Outline + solid.", count: 600, sample: "home" },
  { id: "tabler", name: "Tabler", description: "Pixel-perfect, 2px stroke. 4500+ icons.", count: 4500, sample: "home" },
  { id: "material-symbols", name: "Material Symbols", description: "Google's design system. Variable axes.", count: 3000, sample: "home" },
];

const icons = [
  { name: "magnifying-glass", collection: "ph", aliases: ["search", "find"] },
  { name: "envelope", collection: "ph", aliases: ["mail", "email"] },
  { name: "user", collection: "ph", aliases: ["person", "account"] },
  { name: "check", collection: "ph", aliases: ["done", "tick"] },
  { name: "x", collection: "ph", aliases: ["close", "cancel"] },
  { name: "caret-down", collection: "ph", aliases: ["chevron-down"] },
  { name: "caret-right", collection: "ph", aliases: ["chevron-right", "arrow-right"] },
  { name: "copy", collection: "ph", aliases: ["duplicate", "clipboard"] },
  { name: "eye", collection: "ph", aliases: ["show", "visible"] },
  { name: "eye-slash", collection: "ph", aliases: ["hide"] },
  { name: "house", collection: "ph", aliases: ["home"] },
  { name: "circle-notch", collection: "ph", aliases: ["loader", "spinner"] },
  { name: "moon", collection: "ph", aliases: ["dark"] },
  { name: "sun", collection: "ph", aliases: ["light"] },
  { name: "pencil", collection: "ph", aliases: ["edit"] },
  { name: "plus", collection: "ph", aliases: ["add"] },
  { name: "floppy-disk", collection: "ph", aliases: ["save"] },
  { name: "gear-six", collection: "ph", aliases: ["settings", "cog"] },
  { name: "slash", collection: "ph", aliases: ["divider"] },
  { name: "trash", collection: "ph", aliases: ["delete", "remove"] },
];

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return icons.filter((i) => {
    if (filter.value !== "all" && i.collection !== filter.value) return false;
    if (!q) return true;
    return (
      i.name.toLowerCase().includes(q) ||
      i.aliases.some((a) => a.toLowerCase().includes(q)) ||
      i.collection.toLowerCase().includes(q)
    );
  });
});

const buttonExample = `<UButton icon="i-ph-magnifying-glass" label="Search" />
<UButton icon="i-ph-trash" color="error" label="Delete" />
<UButton trailing-icon="i-ph-caret-down" label="More" />`;

const inputExample = `<UInput icon="i-ph-magnifying-glass" placeholder="Search..." />
<UInput icon="i-ph-envelope" placeholder="Email" trailing />
<UInput
  leading-icon="i-ph-user"
  trailing-icon="i-ph-check"
  placeholder="Username"
/>`;

const dropdownExample = `<UDropdownMenu :items="[
  { label: 'Edit', icon: 'i-ph-pencil' },
  { label: 'Duplicate', icon: 'i-ph-copy' },
  { type: 'separator' },
  { label: 'Delete', icon: 'i-ph-trash', color: 'error' }
]">
  <UButton label="Actions" trailing-icon="i-ph-caret-down" />
</UDropdownMenu>`;

const standaloneExample = `<UIcon name="i-ph-magnifying-glass" class="size-5" />
<UIcon name="i-ph-gear-six" class="size-6 text-brand-primary" />`;

const sizeExample = `<UIcon name="i-ph-magnifying-glass" class="size-4" />
<UIcon name="i-ph-magnifying-glass" class="size-5" />
<UIcon name="i-ph-magnifying-glass" class="size-6" />`;
</script>

<template>
  <div class="icons-demo">
    <section class="example-section">
      <h3>Browse</h3>
      <div class="icons-demo__filters">
        <input v-model="search" type="search" placeholder="Search by name or alias..." class="icons-demo__search" />
        <select v-model="filter" class="icons-demo__select">
          <option value="all">All collections</option>
          <option value="ph">Phosphor (default)</option>
        </select>
      </div>
      <div class="icons-demo__grid">
        <div v-for="icon in filtered" :key="icon.collection + '-' + icon.name" class="icons-demo__cell">
          <UIcon :name="`i-${icon.collection}-${icon.name}`" class="icons-demo__icon" />
          <code class="icons-demo__name">i-{{ icon.collection }}-{{ icon.name }}</code>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h3>Icon collections</h3>
      <p class="example-note">
        Mizu uses <a href="https://iconify.design/" target="_blank" rel="noopener">Iconify</a>
        via Nuxt UI’s <code>&lt;UIcon&gt;</code>. Any Iconify collection is supported — use the
        <code>i-{collection}-{icon-name}</code> format. The Mizu default is Phosphor.
      </p>
      <div class="icons-demo__collections">
        <div v-for="c in collections" :key="c.id" class="icons-demo__collection">
          <div class="icons-demo__collection-header">
            <UIcon :name="`i-${c.id}-${c.sample}`" class="icons-demo__collection-icon" />
            <h4>{{ c.name }}</h4>
          </div>
          <p class="icons-demo__collection-desc">{{ c.description }}</p>
          <p class="icons-demo__collection-meta">{{ c.count.toLocaleString() }} icons</p>
          <code class="icons-demo__collection-prefix">i-{{ c.id }}-*</code>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h3>Lucide → Phosphor mapping</h3>
      <p class="example-note">
        Use this table when porting code or docs from Lucide-named icons to Mizu’s Phosphor default.
      </p>
      <div class="icons-demo__table-wrap">
        <table class="icons-demo__table">
          <thead>
            <tr>
              <th>Lucide</th>
              <th>Phosphor (Mizu default)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in icons" :key="idx">
              <td>
                <div class="icons-demo__cell-row">
                  <UIcon :name="`i-lucide-${row.aliases[0] || row.name}`" class="size-4 text-foreground-secondary" />
                  <code>i-lucide-{{ row.aliases[0] || row.name }}</code>
                </div>
              </td>
              <td>
                <div class="icons-demo__cell-row">
                  <UIcon :name="`i-ph-${row.name}`" class="size-4 text-foreground-secondary" />
                  <code>i-ph-{{ row.name }}</code>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="example-section">
      <h3>In a Button</h3>
      <CodeCollapsible :code="buttonExample">
        <div class="demo-row">
          <UButton icon="i-ph-magnifying-glass" label="Search" />
          <UButton icon="i-ph-trash" color="error" label="Delete" />
          <UButton trailing-icon="i-ph-caret-down" label="More" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>In an Input</h3>
      <CodeCollapsible :code="inputExample">
        <div class="demo-col">
          <UInput icon="i-ph-magnifying-glass" placeholder="Search..." />
          <UInput icon="i-ph-envelope" placeholder="Email" trailing />
          <UInput leading-icon="i-ph-user" trailing-icon="i-ph-check" placeholder="Username" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>In a DropdownMenu</h3>
      <CodeCollapsible :code="dropdownExample">
        <div class="demo-row">
          <UDropdownMenu :items="[
            { label: 'Edit', icon: 'i-ph-pencil' },
            { label: 'Duplicate', icon: 'i-ph-copy' },
            { type: 'separator' },
            { label: 'Delete', icon: 'i-ph-trash', color: 'error' }
          ]">
            <UButton label="Actions" trailing-icon="i-ph-caret-down" />
          </UDropdownMenu>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Standalone UIcon</h3>
      <CodeCollapsible :code="standaloneExample">
        <div class="demo-row">
          <UIcon name="i-ph-magnifying-glass" class="size-5" />
          <UIcon name="i-ph-gear-six" class="size-6 text-brand-primary" />
          <UIcon name="i-ph-envelope" class="size-6 text-feedback-info-base" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizing with Tailwind</h3>
      <CodeCollapsible :code="sizeExample">
        <div class="demo-row items-end">
          <div class="flex flex-col items-center gap-1">
            <UIcon name="i-ph-magnifying-glass" class="size-4" />
            <span class="text-xs">size-4</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <UIcon name="i-ph-magnifying-glass" class="size-5" />
            <span class="text-xs">size-5</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <UIcon name="i-ph-magnifying-glass" class="size-6" />
            <span class="text-xs">size-6</span>
          </div>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.icons-demo { all: revert; display: flex; flex-direction: column; gap: 32px; font-family: inherit; }
.example-section { all: revert; display: flex; flex-direction: column; gap: 12px; }
.example-section h3 { all: revert; font-size: 14px; font-weight: 600; color: var(--sl-color-text); margin: 0; }
.example-note { all: revert; font-size: 13px; color: var(--color-foreground-secondary, #4b5563); line-height: 1.6; margin: 0; }
.example-note a { color: var(--color-brand-primary, #0070f2); text-decoration: none; }
.example-note code, .icons-demo__name, .icons-demo__collection-prefix { all: revert; font-family: var(--font-family-mono, monospace); font-size: 12px; background: var(--color-surface-muted, #f3f4f6); padding: 1px 6px; border-radius: 4px; color: var(--color-foreground-primary, #001c44); }
.icons-demo__filters { all: revert; display: flex; gap: 8px; flex-wrap: wrap; }
.icons-demo__search, .icons-demo__select { all: revert; padding: 8px 12px; border: 1px solid var(--color-surface-muted, #f3f4f6); border-radius: 6px; background: var(--color-surface-base, #fff); color: var(--color-foreground-primary, #001c44); font-family: inherit; font-size: 13px; min-width: 0; }
.icons-demo__search { flex: 1; min-width: 200px; }
.icons-demo__grid { all: revert; display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; }
.icons-demo__cell { all: revert; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 8px; border: 1px solid var(--color-surface-muted, #f3f4f6); border-radius: 6px; background: var(--color-surface-base, #fff); transition: border-color 150ms; }
.icons-demo__cell:hover { border-color: var(--color-foreground-primary, #001c44); }
.icons-demo__icon { font-size: 20px; color: var(--color-foreground-primary, #001c44); }
.icons-demo__collections { all: revert; display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.icons-demo__collection { all: revert; display: flex; flex-direction: column; gap: 6px; padding: 16px; border: 1px solid var(--color-surface-muted, #f3f4f6); border-radius: 8px; background: var(--color-surface-base, #fff); }
.icons-demo__collection-header { all: revert; display: flex; align-items: center; gap: 8px; }
.icons-demo__collection-icon { font-size: 20px; color: var(--color-brand-primary, #0070f2); }
.icons-demo__collection-header h4 { all: revert; margin: 0; font-size: 14px; font-weight: 600; color: var(--color-foreground-primary, #001c44); }
.icons-demo__collection-desc { all: revert; font-size: 12px; color: var(--color-foreground-secondary, #4b5563); line-height: 1.5; margin: 0; }
.icons-demo__collection-meta { all: revert; font-size: 11px; color: var(--color-foreground-tertiary, #9ca3af); margin: 0; }
.icons-demo__collection-prefix { all: revert; align-self: flex-start; }
.icons-demo__table-wrap { all: revert; overflow-x: auto; border: 1px solid var(--color-surface-muted, #f3f4f6); border-radius: 6px; }
.icons-demo__table { all: revert; width: 100%; border-collapse: collapse; font-size: 13px; }
.icons-demo__table th, .icons-demo__table td { all: revert; padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--color-surface-muted, #f3f4f6); }
.icons-demo__table th { all: revert; background: var(--color-surface-subtle, #f9fafb); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-foreground-secondary, #4b5563); }
.icons-demo__table tr:last-child td { border-bottom: none; }
.icons-demo__cell-row { all: revert; display: flex; align-items: center; gap: 8px; }
.icons-demo__cell-row code { all: revert; font-family: var(--font-family-mono, monospace); font-size: 12px; color: var(--color-foreground-primary, #001c44); }
.demo-row { all: revert; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.demo-col { all: revert; display: flex; flex-direction: column; width: max-content; gap: 8px; max-width: 320px; }
</style>
