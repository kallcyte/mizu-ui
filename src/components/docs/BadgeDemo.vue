<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">
        Five sizes from <code>xs</code> to <code>xl</code>. Mizu overrides <code>sm</code>=16px and <code>md</code>=20px for a compact scale; <code>md</code> is the default.
      </p>
      <CodeCollapsible
        :code="`<UBadge size=&quot;xs&quot;>Extra small</UBadge>
<UBadge size=&quot;sm&quot;>Small</UBadge>
<UBadge size=&quot;md&quot;>Medium</UBadge>
<UBadge size=&quot;lg&quot;>Large</UBadge>
<UBadge size=&quot;xl&quot;>Extra large</UBadge>`"
      >
        <div class="demo-row demo-row-align-center">
          <UBadge size="xs" color="primary">Extra small</UBadge>
          <UBadge size="sm" color="primary">Small</UBadge>
          <UBadge size="md" color="primary">Medium</UBadge>
          <UBadge size="lg" color="primary">Large</UBadge>
          <UBadge size="xl" color="primary">Extra large</UBadge>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <p class="demo-description">
        Seven semantic colors: <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>info</code>, <code>warning</code>, <code>error</code>, <code>neutral</code>.
      </p>
      <CodeCollapsible
        :code="`<UBadge color=&quot;primary&quot;>Primary</UBadge>
<UBadge color=&quot;secondary&quot;>Secondary</UBadge>
<UBadge color=&quot;success&quot;>Success</UBadge>
<UBadge color=&quot;info&quot;>Info</UBadge>
<UBadge color=&quot;warning&quot;>Warning</UBadge>
<UBadge color=&quot;error&quot;>Error</UBadge>
<UBadge color=&quot;neutral&quot;>Neutral</UBadge>`"
      >
        <div class="demo-row demo-row-wrap">
          <UBadge color="primary">Primary</UBadge>
          <UBadge color="secondary">Secondary</UBadge>
          <UBadge color="success">Success</UBadge>
          <UBadge color="info">Info</UBadge>
          <UBadge color="warning">Warning</UBadge>
          <UBadge color="error">Error</UBadge>
          <UBadge color="neutral">Neutral</UBadge>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variants</h3>
      <p class="demo-description">
        Four visual styles: <code>solid</code> for emphasis, <code>outline</code> for subtle borders, <code>soft</code> for medium background, <code>subtle</code> for minimal impact.
      </p>
      <CodeCollapsible
        :code="`<UBadge variant=&quot;solid&quot;>Solid</UBadge>
<UBadge variant=&quot;outline&quot;>Outline</UBadge>
<UBadge variant=&quot;soft&quot;>Soft</UBadge>
<UBadge variant=&quot;subtle&quot;>Subtle</UBadge>`"
      >
        <div class="demo-row demo-row-wrap">
          <UBadge variant="solid">Solid</UBadge>
          <UBadge variant="outline">Outline</UBadge>
          <UBadge variant="soft">Soft</UBadge>
          <UBadge variant="subtle">Subtle</UBadge>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variant & Color Matrix</h3>
      <p class="demo-description">
        Every variant works with every color. Use this grid to compare contrast and emphasis.
      </p>
      <CodeCollapsible
        :code="`<UBadge variant=&quot;solid&quot; color=&quot;success&quot;>Success</UBadge>
<UBadge variant=&quot;soft&quot; color=&quot;success&quot;>Success</UBadge>
<UBadge variant=&quot;outline&quot; color=&quot;success&quot;>Success</UBadge>
<UBadge variant=&quot;subtle&quot; color=&quot;success&quot;>Success</UBadge>`"
      >
        <div class="demo-stack">
          <div v-for="v in ['solid', 'outline', 'soft', 'subtle']" :key="v" class="demo-row">
            <span class="demo-label">{{ v }}</span>
            <UBadge :variant="v" color="primary">Primary</UBadge>
            <UBadge :variant="v" color="secondary">Secondary</UBadge>
            <UBadge :variant="v" color="success">Success</UBadge>
            <UBadge :variant="v" color="info">Info</UBadge>
            <UBadge :variant="v" color="warning">Warning</UBadge>
            <UBadge :variant="v" color="error">Error</UBadge>
            <UBadge :variant="v" color="neutral">Neutral</UBadge>
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <p class="demo-description">
        Pass an Iconify class via <code>icon</code> to render a leading icon. Set <code>trailing</code> to <code>true</code> to move the icon to the right side.
      </p>
      <CodeCollapsible
        :code="`<UBadge icon=&quot;i-lucide-check&quot; color=&quot;success&quot;>Verified</UBadge>
<UBadge icon=&quot;i-lucide-arrow-right&quot; trailing color=&quot;primary&quot;>Continue</UBadge>
<UBadge icon=&quot;i-lucide-sparkles&quot; color=&quot;secondary&quot;>New</UBadge>`"
      >
        <div class="demo-row demo-row-wrap">
          <UBadge icon="i-lucide-check" color="success">Verified</UBadge>
          <UBadge icon="i-lucide-x" color="error">Closed</UBadge>
          <UBadge icon="i-lucide-sparkles" color="secondary">New</UBadge>
          <UBadge icon="i-lucide-bell" color="warning">3 alerts</UBadge>
          <UBadge icon="i-lucide-arrow-right" trailing color="primary">Continue</UBadge>
          <UBadge icon="i-lucide-external-link" trailing color="info">Open</UBadge>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Status Indicators</h3>
      <p class="demo-description">
        Common status patterns using <code>variant="soft"</code> with a matching <code>color</code>. Pair with a leading icon for an at-a-glance signal.
      </p>
      <CodeCollapsible
        :code="`<UBadge variant=&quot;soft&quot; color=&quot;success&quot; icon=&quot;i-lucide-circle-dot&quot;>Online</UBadge>
<UBadge variant=&quot;soft&quot; color=&quot;warning&quot; icon=&quot;i-lucide-circle-dot&quot;>Away</UBadge>
<UBadge variant=&quot;soft&quot; color=&quot;error&quot; icon=&quot;i-lucide-circle-dot&quot;>Offline</UBadge>
<UBadge variant=&quot;soft&quot; color=&quot;info&quot; icon=&quot;i-lucide-circle-dot&quot;>In meeting</UBadge>`"
      >
        <div class="demo-row demo-row-wrap">
          <UBadge variant="soft" color="success" icon="i-lucide-circle-dot">Online</UBadge>
          <UBadge variant="soft" color="warning" icon="i-lucide-circle-dot">Away</UBadge>
          <UBadge variant="soft" color="error" icon="i-lucide-circle-dot">Offline</UBadge>
          <UBadge variant="soft" color="info" icon="i-lucide-circle-dot">In meeting</UBadge>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Counter & Label</h3>
      <p class="demo-description">
        Use the <code>label</code> prop for a text-only shorthand. Numeric counters such as <code>label="99+"</code> are decorative — the surrounding context should announce the count. Add a <code>min-width</code> equal to the badge height and zero the flex <code>gap</code> for single-digit counters so they render as a perfectly centered circle.
      </p>
      <CodeCollapsible
        :code="`<UBadge label=&quot;99+&quot; color=&quot;error&quot; size=&quot;md&quot; />
<UBadge label=&quot;New&quot; variant=&quot;subtle&quot; color=&quot;primary&quot; />
<UBadge label=&quot;Beta&quot; variant=&quot;outline&quot; color=&quot;secondary&quot; />
<UBadge label=&quot;3&quot; color=&quot;error&quot; size=&quot;md&quot; :ui=&quot;{ base: 'min-w-[26px] gap-0 justify-center' }&quot; />`"
      >
        <div class="demo-row demo-row-wrap">
          <UBadge label="99+" color="error" size="md" />
          <UBadge label="New" variant="subtle" color="primary" />
          <UBadge label="Beta" variant="outline" color="secondary" />
          <UBadge label="3" color="error" size="md" :ui="{ base: 'min-w-[26px] gap-0 justify-center' }" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Square</h3>
      <p class="demo-description">
        Set <code>square</code> to use equal padding on all sides — designed for icon-only badges. Use a consistent icon size (e.g. <code>size-4</code>) so the badge renders as a perfect circle.
      </p>
      <CodeCollapsible
        :code="`<UBadge square color=&quot;error&quot; icon=&quot;i-lucide-bell&quot; />
<UBadge square color=&quot;success&quot; icon=&quot;i-lucide-check&quot; />
<UBadge square color=&quot;primary&quot; icon=&quot;i-lucide-sparkles&quot; />`"
      >
        <div class="demo-row">
          <UBadge square color="error" icon="i-lucide-bell" />
          <UBadge square color="success" icon="i-lucide-check" />
          <UBadge square color="primary" icon="i-lucide-sparkles" />
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
  color: inherit;
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
  background: var(--color-surface-muted, #f3f4f6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
}
.demo-row-wrap {
  flex-wrap: wrap;
}
.demo-row-align-center {
  align-items: center;
}
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.demo-label {
  font-size: 11px;
  color: var(--sl-color-text-light);
  font-family: ui-monospace, SFMono-Regular, monospace;
  width: 64px;
  flex-shrink: 0;
}
</style>