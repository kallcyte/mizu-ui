<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";

const icons = [
  { name: "i-simple-icons-github", label: "GitHub" },
  { name: "i-simple-icons-discord", label: "Discord" },
  { name: "i-simple-icons-slack", label: "Slack" },
  { name: "i-simple-icons-figma", label: "Figma" },
  { name: "i-simple-icons-vercel", label: "Vercel" },
  { name: "i-simple-icons-linear", label: "Linear" },
  { name: "i-simple-icons-notion", label: "Notion" },
  { name: "i-simple-icons-supabase", label: "Supabase" },
];

const basicCode = `<UMarquee>
  <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-slack" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-figma" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-vercel" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-linear" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-notion" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-supabase" class="size-10 shrink-0" />
</UMarquee>`;

const pauseCode = `<UMarquee pause-on-hover>
  <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
  <!-- ... -->
</UMarquee>`;

const reverseCode = `<UMarquee reverse>
  <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
  <!-- ... -->
</UMarquee>`;

const verticalCode = `<UMarquee orientation="vertical" class="h-48">
  <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
  <!-- ... -->
</UMarquee>`;

const repeatCode = `<UMarquee :repeat="2">
  <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
  <!-- ... -->
</UMarquee>`;

const noOverlayCode = `<UMarquee :overlay="false">
  <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
  <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
  <!-- ... -->
</UMarquee>`;

const textCode = `<UMarquee pause-on-hover class="py-2">
  <span class="text-sm font-medium whitespace-nowrap">New features shipped</span>
  <UIcon name="i-ph-sparkle" class="size-4 shrink-0" />
  <span class="text-sm font-medium whitespace-nowrap">Performance improved by 40%</span>
  <UIcon name="i-ph-sparkle" class="size-4 shrink-0" />
  <span class="text-sm font-medium whitespace-nowrap">Dark mode now available</span>
  <UIcon name="i-ph-sparkle" class="size-4 shrink-0" />
  <span class="text-sm font-medium whitespace-nowrap">New integrations added</span>
  <UIcon name="i-ph-sparkle" class="size-4 shrink-0" />
</UMarquee>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Default horizontal marquee that continuously scrolls child content from right to left.</p>
      <CodeCollapsible :code="basicCode">
        <UMarquee>
          <UIcon v-for="icon in icons" :key="icon.name" :name="icon.name" class="size-10 shrink-0" />
        </UMarquee>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Pause on Hover</h3>
      <p class="demo-description">The <code>pause-on-hover</code> prop pauses the scroll animation when the user hovers over the marquee.</p>
      <CodeCollapsible :code="pauseCode">
        <UMarquee pause-on-hover>
          <UIcon v-for="icon in icons" :key="icon.name" :name="icon.name" class="size-10 shrink-0" />
        </UMarquee>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Reverse</h3>
      <p class="demo-description">The <code>reverse</code> prop reverses the scroll direction so content moves from left to right.</p>
      <CodeCollapsible :code="reverseCode">
        <UMarquee reverse>
          <UIcon v-for="icon in icons" :key="icon.name" :name="icon.name" class="size-10 shrink-0" />
        </UMarquee>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Vertical</h3>
      <p class="demo-description">Setting <code>orientation="vertical"</code> creates an upward-scrolling vertical marquee.</p>
      <CodeCollapsible :code="verticalCode">
        <UMarquee orientation="vertical" class="h-48">
          <UIcon v-for="icon in icons" :key="icon.name" :name="icon.name" class="size-10 shrink-0" />
        </UMarquee>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Repeat</h3>
      <p class="demo-description">The <code>:repeat</code> prop controls how many times the content set is duplicated before scrolling.</p>
      <CodeCollapsible :code="repeatCode">
        <UMarquee :repeat="2">
          <UIcon v-for="icon in icons" :key="icon.name" :name="icon.name" class="size-10 shrink-0" />
        </UMarquee>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>No Overlay</h3>
      <p class="demo-description">Setting <code>:overlay="false"</code> removes the fade gradient edges on the sides of the marquee.</p>
      <CodeCollapsible :code="noOverlayCode">
        <UMarquee :overlay="false">
          <UIcon v-for="icon in icons" :key="icon.name" :name="icon.name" class="size-10 shrink-0" />
        </UMarquee>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Text Marquee</h3>
      <p class="demo-description">Using text and icon children together for announcement-style tickers, with <code>pause-on-hover</code> for readability.</p>
      <CodeCollapsible :code="textCode">
        <UMarquee pause-on-hover class="py-2">
          <span class="text-sm font-medium whitespace-nowrap">New features shipped</span>
          <UIcon name="i-ph-sparkle" class="size-4 shrink-0" />
          <span class="text-sm font-medium whitespace-nowrap">Performance improved by 40%</span>
          <UIcon name="i-ph-sparkle" class="size-4 shrink-0" />
          <span class="text-sm font-medium whitespace-nowrap">Dark mode now available</span>
          <UIcon name="i-ph-sparkle" class="size-4 shrink-0" />
          <span class="text-sm font-medium whitespace-nowrap">New integrations added</span>
          <UIcon name="i-ph-sparkle" class="size-4 shrink-0" />
        </UMarquee>
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
</style>
