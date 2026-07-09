<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UCard>
  <template #content>
    <p>Card content goes here.</p>
  </template>
</UCard>`">
        <UCard variant="outline">
          <p style="margin: 0; font-size: 14px; color: var(--color-foreground-primary);">
            Card content goes here.
          </p>
        </UCard>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Header &amp; Footer</h3>
      <CodeCollapsible :code="`<UCard>
  <template #header>
    <h3>Card Title</h3>
    <p>Card description or subtitle</p>
  </template>
  <template #content>
    <p>Main content area with body text.</p>
  </template>
  <template #footer>
    <UButton variant=&quot;ghost&quot;>Cancel</UButton>
    <UButton color=&quot;primary&quot;>Save changes</UButton>
  </template>
</UCard>`">
        <UCard variant="outline" class="max-w-[420px]">
          <template #header>
            <h3 style="margin: 0; font-size: 15px; font-weight: 600; color: var(--color-foreground-primary);">Card Title</h3>
            <p style="margin: 4px 0 0; font-size: 13px; color: var(--color-foreground-secondary);">Card description or subtitle</p>
          </template>
          <p style="margin: 0; font-size: 14px; color: var(--color-foreground-primary);">
            Main content area with body text.
          </p>
          <template #footer>
            <UButton variant="ghost">Cancel</UButton>
            <UButton color="primary">Save changes</UButton>
          </template>
        </UCard>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variants</h3>
      <CodeCollapsible :code="`<UCard variant=&quot;outline&quot;>
  <template #content>
    <p>Card with outline variant (Mizu default).</p>
  </template>
</UCard>`">
        <div class="demo-col">
          <UCard v-for="v in ['solid','outline','soft','subtle']" :key="v" :variant="v" class="max-w-[420px]">
            <p style="margin: 0; font-size: 14px; color: var(--color-foreground-primary);">
              {{ v.charAt(0).toUpperCase() + v.slice(1) }} variant
            </p>
          </UCard>
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
