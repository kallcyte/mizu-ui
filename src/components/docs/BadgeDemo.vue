<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Two size variants: sm for compact contexts, md (default) for standard use.</p>
      <CodeCollapsible :code="`<UBadge size=&quot;sm&quot;>Small</UBadge>
<UBadge size=&quot;md&quot;>Medium</UBadge>`">
        <div class="demo-row">
          <UBadge size="sm" color="primary">Small</UBadge>
          <UBadge size="md" color="primary">Medium</UBadge>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <p class="demo-description">Seven semantic color variants for different status types and visual contexts.</p>
      <CodeCollapsible :code="`<UBadge color=&quot;primary&quot;>Primary</UBadge>
<UBadge color=&quot;secondary&quot;>Secondary</UBadge>
<UBadge color=&quot;success&quot;>Success</UBadge>
<UBadge color=&quot;error&quot;>Error</UBadge>
<UBadge color=&quot;warning&quot;>Warning</UBadge>
<UBadge color=&quot;info&quot;>Info</UBadge>
<UBadge color=&quot;neutral&quot;>Neutral</UBadge>`">
        <div class="demo-row demo-row--wrap">
          <UBadge
            v-for="c in ['primary','secondary','success','error','warning','info','neutral']"
            :key="c"
            size="md"
            :color="c"
          >
            {{ c.charAt(0).toUpperCase() + c.slice(1) }}
          </UBadge>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variants</h3>
      <p class="demo-description">Four visual styles: solid for emphasis, outline for subtle borders, soft for medium background, subtle for minimal impact.</p>
      <CodeCollapsible :code="`<UBadge variant=&quot;solid&quot;>Solid</UBadge>
<UBadge variant=&quot;outline&quot;>Outline</UBadge>
<UBadge variant=&quot;soft&quot;>Soft</UBadge>
<UBadge variant=&quot;subtle&quot;>Subtle</UBadge>`">
        <div class="demo-row demo-row--wrap">
          <UBadge size="md" variant="solid">Solid</UBadge>
          <UBadge size="md" variant="outline">Outline</UBadge>
          <UBadge size="md" variant="soft">Soft</UBadge>
          <UBadge size="md" variant="subtle">Subtle</UBadge>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Status Indicators</h3>
      <p class="demo-description">Common status patterns using color-coded badges: Online (success), Away (warning), Offline (error).</p>
      <CodeCollapsible :code="`<UBadge variant=&quot;soft&quot; color=&quot;success&quot;>Online</UBadge>
<UBadge variant=&quot;soft&quot; color=&quot;warning&quot;>Away</UBadge>
<UBadge variant=&quot;soft&quot; color=&quot;error&quot;>Offline</UBadge>`">
        <div class="demo-row">
          <UBadge size="md" variant="soft" color="success">Online</UBadge>
          <UBadge size="md" variant="soft" color="warning">Away</UBadge>
          <UBadge size="md" variant="soft" color="error">Offline</UBadge>
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
}
.demo-row--wrap {
  flex-wrap: wrap;
}
</style>
