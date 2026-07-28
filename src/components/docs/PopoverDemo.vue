<script setup lang="ts">
import { ref, computed } from "vue";
import type { CommandPaletteItem } from "@nuxt/ui";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicOpen = ref(false);
const hoverOpen = ref(false);
const dismissibleOpen = ref(false);
const cursorOpen = ref(false);
const anchorOpen = ref(false);
const commandsOpen = ref(false);
const anchor = ref({ x: 0, y: 0 });

const items = ref([
  { label: "bug", value: "bug", chip: { color: "error" as const } },
  { label: "feature", value: "feature", chip: { color: "success" as const } },
  { label: "enhancement", value: "enhancement", chip: { color: "info" as const } },
] satisfies CommandPaletteItem[]);

const label = ref([]);

const reference = computed(() => ({
  getBoundingClientRect: () =>
    ({
      width: 0,
      height: 0,
      left: anchor.value.x,
      right: anchor.value.x,
      top: anchor.value.y,
      bottom: anchor.value.y,
      ...anchor.value,
    } as DOMRect),
}));
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Click the trigger to open a popover. Content goes in the <code>#content</code> slot.</p>
      <CodeCollapsible :code="`<UPopover>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #content>
    <div class=&quot;p-4&quot;>
      <p class=&quot;text-sm&quot;>Popover content</p>
    </div>
  </template>
</UPopover>`">
        <div class="demo-row">
          <UPopover>
            <UButton label="Open" color="neutral" variant="subtle" />
            <template #content>
              <div class="p-4">
                <p class="text-sm text-foreground-primary font-semibold mb-1">Notifications</p>
                <p class="text-xs text-foreground-secondary">You have 3 new notifications.</p>
              </div>
            </template>
          </UPopover>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Hover Mode</h3>
      <p class="demo-description">Use <code>mode="hover"</code> to open on hover instead of click. Add <code>enable-touch</code> for touch support.</p>
      <CodeCollapsible :code="`<UPopover mode=&quot;hover&quot; enable-touch>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #content>
    <div class=&quot;p-4&quot;>
      <p class=&quot;text-sm&quot;>Hover content</p>
    </div>
  </template>
</UPopover>`">
        <div class="demo-row">
          <UPopover mode="hover" enable-touch>
            <UButton label="Hover me" color="neutral" variant="subtle" />
            <template #content>
              <div class="p-4">
                <p class="text-xs text-foreground-secondary">This appears on hover.</p>
              </div>
            </template>
          </UPopover>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Content Positioning</h3>
      <p class="demo-description">Use <code>:content</code> with <code>side</code>, <code>align</code>, and <code>sideOffset</code> to control placement.</p>
      <CodeCollapsible :code="`<UPopover :content=&quot;{ align: 'center', side: 'bottom', sideOffset: 8 }&quot;>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #content>
    <div class=&quot;p-4&quot;>
      <p class=&quot;text-sm&quot;>Positioned content</p>
    </div>
  </template>
</UPopover>`">
        <div class="demo-row">
          <UPopover :content="{ align: 'center', side: 'bottom', sideOffset: 8 }">
            <UButton label="Bottom center" color="neutral" variant="subtle" />
            <template #content>
              <div class="p-4">
                <p class="text-xs text-foreground-secondary">Aligned center, side bottom.</p>
              </div>
            </template>
          </UPopover>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Arrow</h3>
      <p class="demo-description">Use the <code>arrow</code> prop to display a directional arrow pointing at the trigger.</p>
      <CodeCollapsible :code="`<UPopover arrow>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #content>
    <div class=&quot;p-4&quot;>
      <p class=&quot;text-sm&quot;>Arrow popover</p>
    </div>
  </template>
</UPopover>`">
        <div class="demo-row">
          <UPopover arrow>
            <UButton label="With arrow" color="neutral" variant="subtle" />
            <template #content>
              <div class="p-4">
                <p class="text-xs text-foreground-secondary">This popover has an arrow.</p>
              </div>
            </template>
          </UPopover>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Modal</h3>
      <p class="demo-description">Set <code>modal</code> to block interaction with outside content while the popover is open.</p>
      <CodeCollapsible :code="`<UPopover modal>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #content>
    <div class=&quot;p-4&quot;>
      <p class=&quot;text-sm&quot;>Modal popover</p>
    </div>
  </template>
</UPopover>`">
        <div class="demo-row">
          <UPopover modal>
            <UButton label="Modal popover" color="neutral" variant="subtle" />
            <template #content>
              <div class="p-4">
                <p class="text-xs text-foreground-secondary">Outside interaction blocked.</p>
              </div>
            </template>
          </UPopover>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Non-Dismissible</h3>
      <p class="demo-description">Set <code>:dismissible="false"</code> and use the <code>{ close }</code> slot prop for explicit dismiss control.</p>
      <CodeCollapsible :code="`<UPopover :dismissible=&quot;false&quot; :ui=&quot;{ content: 'p-4' }&quot;>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #content=&quot;{ close }&quot;>
    <h3 class=&quot;font-semibold text-sm mb-2&quot;>Non-Dismissible</h3>
    <UButton label=&quot;Close&quot; color=&quot;primary&quot; size=&quot;xs&quot; @click=&quot;close&quot; />
  </template>
</UPopover>`">
        <div class="demo-row">
          <UPopover :dismissible="false" :ui="{ content: 'p-4' }">
            <UButton label="Non-dismissible" color="warning" variant="subtle" />
            <template #content="{ close }">
              <h3 class="font-semibold text-sm mb-3 text-foreground-primary">Non-Dismissible</h3>
              <UButton label="Close" color="primary" size="xs" @click="close" />
            </template>
          </UPopover>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Control Open State</h3>
      <p class="demo-description">Use <code>v-model:open</code> to programmatically control visibility.</p>
      <CodeCollapsible :code="`<UPopover v-model:open=&quot;open&quot;>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #content>
    <div class=&quot;p-4&quot;>
      <p class=&quot;text-sm&quot;>Controlled popover</p>
    </div>
  </template>
</UPopover>`">
        <div class="demo-row items-center gap-3">
          <UPopover v-model:open="basicOpen">
            <UButton label="Open" color="neutral" variant="subtle" />
            <template #content>
              <div class="p-4">
                <p class="text-xs text-foreground-secondary">Controlled via v-model:open.</p>
              </div>
            </template>
          </UPopover>
          <UButton label="Toggle" size="xs" variant="outline" @click="basicOpen = !basicOpen" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Command Palette</h3>
      <p class="demo-description">Embed a <code>UCommandPalette</code> for search/selection use cases like label pickers.</p>
      <CodeCollapsible :code="`<UPopover :content=&quot;{ side: 'right', align: 'start' }&quot;>
  <UButton label=&quot;Select labels&quot; icon=&quot;i-lucide-tag&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #content>
    <UCommandPalette v-model=&quot;label&quot; multiple :groups=&quot;[{ id: 'labels', items }]&quot; />
  </template>
</UPopover>`">
        <div class="demo-row">
          <UPopover :content="{ side: 'right', align: 'start' }">
            <UButton label="Select labels" icon="i-lucide-tag" color="neutral" variant="subtle" />
            <template #content>
              <UCommandPalette
                v-model="label"
                multiple
                placeholder="Search labels..."
                :groups="[{ id: 'labels', items }]"
                :ui="{ input: '[&>input]:h-8 [&>input]:text-sm' }"
              />
            </template>
          </UPopover>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Following Cursor</h3>
      <p class="demo-description">Use <code>:reference</code> to anchor the popover to the cursor position.</p>
      <CodeCollapsible :code="`<UPopover :open=&quot;open&quot; :reference=&quot;reference&quot; :content=&quot;{ side: 'top', sideOffset: 16, updatePositionStrategy: 'always' }&quot;>
  <div @pointerenter=&quot;open = true&quot; @pointerleave=&quot;open = false&quot; @pointermove=&quot;(ev) => { anchor.x = ev.clientX; anchor.y = ev.clientY }&quot;>
    Hover me
  </div>
  <template #content>
    <div class=&quot;p-4&quot;>
      {{ anchor.x.toFixed(0) }} - {{ anchor.y.toFixed(0) }}
    </div>
  </template>
</UPopover>`">
        <div class="demo-row">
          <UPopover
            :open="cursorOpen"
            :reference="reference"
            :content="{ side: 'top', sideOffset: 16, updatePositionStrategy: 'always' }"
          >
            <div
              class="flex items-center justify-center rounded-md border border-dashed border-foreground-tertiary text-sm aspect-video w-72"
              @pointerenter="cursorOpen = true"
              @pointerleave="cursorOpen = false"
              @pointermove="(ev: PointerEvent) => {
                anchor.x = ev.clientX
                anchor.y = ev.clientY
              }"
            >
              Hover me
            </div>
            <template #content>
              <div class="p-4">
                <p class="text-xs text-foreground-secondary">{{ anchor.x.toFixed(0) }} - {{ anchor.y.toFixed(0) }}</p>
              </div>
            </template>
          </UPopover>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Anchor Slot</h3>
      <p class="demo-description">Use <code>#anchor</code> to position the popover against a custom element (click mode only).</p>
      <CodeCollapsible :code="`<UPopover v-model:open=&quot;open&quot; :dismissible=&quot;false&quot; :ui=&quot;{ content: 'p-4' }&quot;>
  <template #anchor>
    <UInput placeholder=&quot;Focus to open&quot; @focus=&quot;open = true&quot; @blur=&quot;open = false&quot; />
  </template>
  <template #content>
    <p class=&quot;text-sm text-foreground-secondary&quot;>Search suggestions appear here.</p>
  </template>
</UPopover>`">
        <div class="demo-row">
          <UPopover v-model:open="anchorOpen" :dismissible="false" :ui="{ content: 'p-4' }">
            <template #anchor>
              <UInput placeholder="Focus to open" @focus="anchorOpen = true" @blur="anchorOpen = false" />
            </template>
            <template #content>
              <p class="text-sm text-foreground-secondary">Search suggestions appear here.</p>
            </template>
          </UPopover>
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
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
