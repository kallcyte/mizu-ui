<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
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

    <section class="example-section">
      <h3>Colors</h3>
      <CodeCollapsible :code="`<UButton color=&quot;primary&quot;>Primary</UButton>
<UButton color=&quot;secondary&quot;>Secondary</UButton>
<UButton color=&quot;success&quot;>Success</UButton>
<UButton color=&quot;error&quot;>Error</UButton>
<UButton color=&quot;warning&quot;>Warning</UButton>
<UButton color=&quot;info&quot;>Info</UButton>
<UButton color=&quot;neutral&quot;>Neutral</UButton>`">
        <div class="demo-row demo-row--wrap">
          <UButton
            v-for="c in ['primary','secondary','success','error','warning','info','neutral']"
            :key="c"
            size="md"
            :color="c"
          >
            {{ c.charAt(0).toUpperCase() + c.slice(1) }}
          </UButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variants</h3>
      <CodeCollapsible :code="`<UButton variant=&quot;solid&quot;>Solid</UButton>
<UButton variant=&quot;outline&quot;>Outline</UButton>
<UButton variant=&quot;soft&quot;>Soft</UButton>
<UButton variant=&quot;subtle&quot;>Subtle</UButton>
<UButton variant=&quot;ghost&quot;>Ghost</UButton>`">
        <div class="demo-row demo-row--wrap">
          <UButton size="md" variant="solid">Solid</UButton>
          <UButton size="md" variant="outline">Outline</UButton>
          <UButton size="md" variant="soft">Soft</UButton>
          <UButton size="md" variant="subtle">Subtle</UButton>
          <UButton size="md" variant="ghost">Ghost</UButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icons</h3>
      <CodeCollapsible :code="`<UButton icon=&quot;i-ph-magnifying-glass&quot; />
<UButton icon=&quot;i-ph-plus&quot; trailing>Add</UButton>
<UButton icon=&quot;i-ph-gear-six&quot;>Settings</UButton>`">
        <div class="demo-row">
          <UButton icon="i-ph-magnifying-glass" color="primary" />
          <UButton icon="i-ph-plus" color="primary" trailing>Add</UButton>
          <UButton icon="i-ph-gear-six" color="primary">Settings</UButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<UButton disabled>Disabled</UButton>
<UButton disabled variant=&quot;outline&quot;>Outline Disabled</UButton>`">
        <div class="demo-row">
          <UButton size="md" color="primary" disabled>Disabled</UButton>
          <UButton size="md" variant="outline" disabled>Outline Disabled</UButton>
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
