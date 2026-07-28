<script setup lang="ts">
import { ref, computed } from "vue";
import { TooltipProvider } from "reka-ui";
import CodeCollapsible from "./CodeCollapsible.vue";

const open = ref(false);
const cursorOpen = ref(false);
const anchor = ref({ x: 0, y: 0 });

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
  <TooltipProvider>
    <div class="not-content demo-isolated demo-examples">
      <section class="example-section">
        <h3>Basic</h3>
        <p class="demo-description">Wrap any element with <code>UTooltip</code> and use the <code>text</code> prop for hover tooltips.</p>
        <CodeCollapsible :code="`<UTooltip text=&quot;Open on GitHub&quot;>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UTooltip>`">
          <div class="demo-row">
            <UTooltip text="Open on GitHub">
              <UButton label="Open" color="neutral" variant="subtle" />
            </UTooltip>
          </div>
        </CodeCollapsible>
      </section>

      <section class="example-section">
        <h3>With Kbds</h3>
        <p class="demo-description">Use <code>:kbds</code> to display keyboard shortcut hints alongside the tooltip text.</p>
        <CodeCollapsible :code="`<UTooltip text=&quot;Open on GitHub&quot; :kbds=&quot;['meta', 'G']&quot;>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UTooltip>`">
          <div class="demo-row">
            <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
              <UButton label="Open" color="neutral" variant="subtle" />
            </UTooltip>
          </div>
        </CodeCollapsible>
      </section>

      <section class="example-section">
        <h3>Delay Duration</h3>
        <p class="demo-description">Set <code>:delay-duration="0"</code> to make the tooltip appear instantly on hover.</p>
        <CodeCollapsible :code="`<UTooltip text=&quot;Instant tooltip&quot; :delay-duration=&quot;0&quot;>
  <UButton label=&quot;Hover me&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UTooltip>`">
          <div class="demo-row">
            <UTooltip text="Instant tooltip" :delay-duration="0">
              <UButton label="Hover me" color="neutral" variant="subtle" />
            </UTooltip>
          </div>
        </CodeCollapsible>
      </section>

      <section class="example-section">
        <h3>Content Positioning</h3>
        <p class="demo-description">Use the <code>:content</code> prop with <code>side</code> and <code>align</code> to control placement.</p>
        <CodeCollapsible :code="`<UTooltip text=&quot;Top&quot; :content=&quot;{ side: 'top' }&quot;>
  <UButton label=&quot;Top&quot; />
</UTooltip>`">
          <div class="demo-row">
            <UTooltip text="Top" :content="{ side: 'top' }">
              <UButton label="Top" />
            </UTooltip>
            <UTooltip text="Right" :content="{ side: 'right' }">
              <UButton label="Right" />
            </UTooltip>
            <UTooltip text="Bottom" :content="{ side: 'bottom' }">
              <UButton label="Bottom" />
            </UTooltip>
            <UTooltip text="Left" :content="{ side: 'left' }">
              <UButton label="Left" />
            </UTooltip>
          </div>
        </CodeCollapsible>
      </section>

      <section class="example-section">
        <h3>Arrow</h3>
        <p class="demo-description">Use the <code>arrow</code> prop to display a directional arrow pointing to the trigger.</p>
        <CodeCollapsible :code="`<UTooltip text=&quot;Open on GitHub&quot; arrow>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UTooltip>`">
          <div class="demo-row">
            <UTooltip text="Open on GitHub" arrow>
              <UButton label="Open" color="neutral" variant="subtle" />
            </UTooltip>
          </div>
        </CodeCollapsible>
      </section>

      <section class="example-section">
        <h3>Disabled</h3>
        <p class="demo-description">Use the <code>disabled</code> prop to prevent the tooltip from appearing.</p>
        <CodeCollapsible :code="`<UTooltip text=&quot;Open on GitHub&quot; disabled>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UTooltip>`">
          <div class="demo-row">
            <UTooltip text="Open on GitHub" disabled>
              <UButton label="Open" color="neutral" variant="subtle" />
            </UTooltip>
          </div>
        </CodeCollapsible>
      </section>

      <section class="example-section">
        <h3>Control Open State</h3>
        <p class="demo-description">Use <code>v-model:open</code> to programmatically control whether the tooltip is visible.</p>
        <CodeCollapsible :code="`<UTooltip v-model:open=&quot;open&quot; text=&quot;Open on GitHub&quot;>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UTooltip>`">
          <div class="demo-row items-center gap-3">
            <UTooltip v-model:open="open" text="Open on GitHub">
              <UButton label="Open" color="neutral" variant="subtle" />
            </UTooltip>
            <UButton label="Toggle Tooltip" size="xs" variant="outline" @click="open = !open" />
          </div>
        </CodeCollapsible>
      </section>

      <section class="example-section">
        <h3>Following Cursor</h3>
        <p class="demo-description">Use the <code>:reference</code> prop to make the tooltip follow the cursor position.</p>
        <CodeCollapsible :code="`<UTooltip :open=&quot;open&quot; :reference=&quot;reference&quot; :content=&quot;{ side: 'top', sideOffset: 16, updatePositionStrategy: 'always' }&quot;>
  <div @pointerenter=&quot;open = true&quot; @pointerleave=&quot;open = false&quot; @pointermove=&quot;(ev) => { anchor.x = ev.clientX; anchor.y = ev.clientY }&quot;>
    Hover me
  </div>
  <template #content>
    {{ anchor.x.toFixed(0) }} - {{ anchor.y.toFixed(0) }}
  </template>
</UTooltip>`">
          <div class="demo-row">
            <UTooltip
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
                {{ anchor.x.toFixed(0) }} - {{ anchor.y.toFixed(0) }}
              </template>
            </UTooltip>
          </div>
        </CodeCollapsible>
      </section>
    </div>
  </TooltipProvider>
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
