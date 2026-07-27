<script setup lang="ts">
import { ref, computed } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

type CardVariant = "solid" | "outline" | "soft" | "subtle";
const variants: CardVariant[] = ["solid", "outline", "soft", "subtle"];

const selectedVariant = ref<CardVariant>("outline");

const variantCode = computed(
  () => `<UCard variant="${selectedVariant.value}">
  <template #header>
    <h3>Card title</h3>
  </template>
  <p>Card content</p>
  <template #footer>
    <div class="flex gap-2">
      <UButton variant="ghost" color="${selectedVariant.value === 'solid' ? 'neutral' : 'primary'}">Cancel</UButton>
      <UButton color="primary">Save changes</UButton>
    </div>
  </template>
</UCard>`
);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <!-- Basic -->
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">
        Simple card container. Any children are rendered in the default slot
        (the body region).
      </p>
      <CodeCollapsible
        :code="`<UCard>
  <p>Card content goes here.</p>
</UCard>`"
      >
        <UCard variant="outline" class="max-w-[420px]">
          <p
            style="margin: 0; font-size: 14px;"
          >
            Card content goes here.
          </p>
        </UCard>
      </CodeCollapsible>
    </section>

    <!-- Title prop -->
    <section class="example-section">
      <h3>Title</h3>
      <p class="demo-description">
        Use the <code>title</code> prop as a shorthand for a header title.
      </p>
      <CodeCollapsible
        :code="`<UCard title=&quot;Card with title&quot; class=&quot;w-full&quot;>
  <p>Body content.</p>
</UCard>`"
      >
        <UCard
          title="Card with title"
          variant="outline"
          class="max-w-[420px]"
        >
          <p
            style="margin: 0; font-size: 14px;"
          >
            Body content.
          </p>
        </UCard>
      </CodeCollapsible>
    </section>

    <!-- Description prop -->
    <section class="example-section">
      <h3>Description</h3>
      <p class="demo-description">
        Combine <code>title</code> and <code>description</code> props for a
        full header without writing the <code>#header</code> slot.
      </p>
      <CodeCollapsible
        :code="`<UCard
  title=&quot;Card with description&quot;
  description=&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&quot;
  class=&quot;w-full&quot;
>
  <p>Body content.</p>
</UCard>`"
      >
        <UCard
          title="Card with description"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          variant="outline"
          class="max-w-[420px]"
        >
          <p
            style="margin: 0; font-size: 14px;"
          >
            Body content.
          </p>
        </UCard>
      </CodeCollapsible>
    </section>

    <!-- Header & footer slots -->
    <section class="example-section">
      <h3>With Header &amp; Footer</h3>
      <p class="demo-description">
        Full-featured card using the <code>#header</code>, default, and
        <code>#footer</code> slots for titles, body text, and action buttons.
      </p>
      <CodeCollapsible
        :code="`<UCard>
  <template #header>
    <h3>Card Title</h3>
    <p>Card description or subtitle</p>
  </template>

  <p>Main content area with body text.</p>

  <template #footer>
    <div class=&quot;flex gap-2&quot;>
      <UButton variant=&quot;ghost&quot;>Cancel</UButton>
      <UButton color=&quot;primary&quot;>Save changes</UButton>
    </div>
  </template>
</UCard>`"
      >
        <UCard variant="outline" class="max-w-[420px]">
          <template #header>
            <h3
              style="margin: 0; font-size: 15px; font-weight: 600;"
            >
              Card Title
            </h3>
            <p
              style="margin: 4px 0 0; font-size: 13px;"
            >
              Card description or subtitle
            </p>
          </template>
          <p
            style="margin: 0; font-size: 14px;"
          >
            Main content area with body text.
          </p>
          <template #footer>
            <div class="flex gap-2">
              <UButton variant="ghost">Cancel</UButton>
              <UButton color="primary">Save changes</UButton>
            </div>
          </template>
        </UCard>
      </CodeCollapsible>
    </section>

    <!-- Variant (reactive selector) -->
    <section class="example-section">
      <h3>Variant</h3>
      <p class="demo-description">
        Four visual styles: <code>solid</code>, <code>outline</code> (Mizu
        default), <code>soft</code>, and <code>subtle</code>.
      </p>
      <CodeCollapsible :code="variantCode">
        <div class="demo-col">
          <div class="chip-row">
            <UButton
              v-for="v in variants"
              :key="v"
              :color="selectedVariant === v ? 'primary' : undefined"
              :label="v"
              :variant="selectedVariant === v ? 'soft' : 'outline'"
              size="sm"
              @click="selectedVariant = v"
            />
          </div>
          <UCard
            :variant="selectedVariant"
            :ui="selectedVariant === 'solid' ? { root: 'text-inverted', title: 'text-inverted', description: 'text-inverted', body: 'text-inverted', header: 'text-inverted', footer: 'text-inverted' } : undefined"
            class="max-w-[420px]"
          >
            <template #header>
              <h3
                :class="selectedVariant === 'solid' ? 'text-inverted' : ''"
                style="margin: 0; font-size: 15px; font-weight: 600;"
              >
                {{ selectedVariant.charAt(0).toUpperCase() + selectedVariant.slice(1) }} variant
              </h3>
            </template>
            <p
              :class="selectedVariant === 'solid' ? 'text-inverted' : ''"
              style="margin: 0; font-size: 14px;"
            >
              Card content goes here.
            </p>
            <template #footer>
              <div class="flex gap-2">
                <UButton
                  variant="ghost"
                  :color="selectedVariant === 'solid' ? 'neutral' : 'primary'"
                >Cancel</UButton>
                <UButton color="primary">Save changes</UButton>
              </div>
            </template>
          </UCard>
        </div>
      </CodeCollapsible>
    </section>

    <!-- Custom UI -->
    <section class="example-section">
      <h3>Custom UI</h3>
      <p class="demo-description">
        Override slot classes via the <code>ui</code> prop. This example
        removes the default rounded corners and tightens padding.
      </p>
      <CodeCollapsible
        :code="`<UCard
  title=&quot;Custom card&quot;
  variant=&quot;outline&quot;
  :ui=&quot;{ root: 'rounded-none', header: 'p-2', body: 'p-2 sm:p-3', footer: 'p-2' }&quot;
>
  <p>Body content.</p>
</UCard>`"
      >
        <UCard
          title="Custom card"
          variant="outline"
          :ui="{
            root: 'rounded-none',
            header: 'p-2',
            body: 'p-2 sm:p-3',
            footer: 'p-2',
          }"
          class="max-w-[420px]"
        >
          <p
            style="margin: 0; font-size: 14px;"
          >
            Body content.
          </p>
        </UCard>
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 12px;
}
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
