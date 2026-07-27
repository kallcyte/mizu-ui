<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";

const slides = [
  { title: "Slide 1", color: "bg-blue-500" },
  { title: "Slide 2", color: "bg-green-500" },
  { title: "Slide 3", color: "bg-purple-500" },
  { title: "Slide 4", color: "bg-amber-500" },
  { title: "Slide 5", color: "bg-rose-500" },
  { title: "Slide 6", color: "bg-cyan-500" },
];

const logoSlides = [
  { name: "GitHub", icon: "i-simple-icons-github" },
  { name: "Discord", icon: "i-simple-icons-discord" },
  { name: "Slack", icon: "i-simple-icons-slack" },
  { name: "Figma", icon: "i-simple-icons-figma" },
  { name: "Vercel", icon: "i-simple-icons-vercel" },
  { name: "Linear", icon: "i-simple-icons-linear" },
];

const basicCode = `<UCarousel :items="slides" class="w-full max-w-lg">
  <template #default="{ item }">
    <div class="h-40 rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
      {{ item.title }}
    </div>
  </template>
</UCarousel>`;

const orientationCode = `<UCarousel :items="slides" orientation="vertical" class="h-80 w-full max-w-xs">
  <template #default="{ item }">
    <div class="h-full rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
      {{ item.title }}
    </div>
  </template>
</UCarousel>`;

const arrowsCode = `<UCarousel :items="slides" arrows class="w-full max-w-lg">
  <template #default="{ item }">
    <div class="h-40 rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
      {{ item.title }}
    </div>
  </template>
</UCarousel>`;

const dotsCode = `<UCarousel :items="slides" dots class="w-full max-w-lg">
  <template #default="{ item }">
    <div class="h-40 rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
      {{ item.title }}
    </div>
  </template>
</UCarousel>`;

const prevNextCode = `<UCarousel :items="slides" arrows :prev="{ color: 'secondary', variant: 'soft' }" :next="{ color: 'secondary', variant: 'soft' }" class="w-full max-w-lg">
  <template #default="{ item }">
    <div class="h-40 rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
      {{ item.title }}
    </div>
  </template>
</UCarousel>`;

const autoplayCode = `<UCarousel :items="logos" autoplay :autoplay="{ delay: 2000 }" class="w-full max-w-lg">
  <template #default="{ item }">
    <div class="h-32 rounded-xl bg-surface-subtle flex items-center justify-center gap-2">
      <UIcon :name="item.icon" class="size-8" />
      <span class="font-medium">{{ item.name }}</span>
    </div>
  </template>
</UCarousel>`;

const loopCode = `<UCarousel :items="slides" arrows loop class="w-full max-w-lg">
  <template #default="{ item }">
    <div class="h-40 rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
      {{ item.title }}
    </div>
  </template>
</UCarousel>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Simple horizontal carousel with swipe navigation using the default item template.</p>
      <CodeCollapsible :code="basicCode">
        <UCarousel :items="slides" class="w-full max-w-lg">
          <template #default="{ item }">
            <div class="h-40 rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
              {{ item.title }}
            </div>
          </template>
        </UCarousel>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Vertical Orientation</h3>
      <p class="demo-description">Scroll vertically by setting <code>orientation="vertical"</code> for side-scrolling content.</p>
      <CodeCollapsible :code="orientationCode">
        <UCarousel :items="slides" orientation="vertical" class="h-80 w-full max-w-xs">
          <template #default="{ item }">
            <div class="h-full rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
              {{ item.title }}
            </div>
          </template>
        </UCarousel>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Arrows</h3>
      <p class="demo-description">Enable previous and next arrow buttons with the <code>arrows</code> prop.</p>
      <CodeCollapsible :code="arrowsCode">
        <UCarousel :items="slides" arrows class="w-full max-w-lg">
          <template #default="{ item }">
            <div class="h-40 rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
              {{ item.title }}
            </div>
          </template>
        </UCarousel>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Dots</h3>
      <p class="demo-description">Add dot indicators below the carousel using the <code>dots</code> prop.</p>
      <CodeCollapsible :code="dotsCode">
        <UCarousel :items="slides" dots class="w-full max-w-lg">
          <template #default="{ item }">
            <div class="h-40 rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
              {{ item.title }}
            </div>
          </template>
        </UCarousel>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Prev/Next Buttons</h3>
      <p class="demo-description">Customize arrow button appearance with the <code>:prev</code> and <code>:next</code> props.</p>
      <CodeCollapsible :code="prevNextCode">
        <UCarousel :items="slides" arrows :prev="{ color: 'secondary', variant: 'soft' }" :next="{ color: 'secondary', variant: 'soft' }" class="w-full max-w-lg">
          <template #default="{ item }">
            <div class="h-40 rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
              {{ item.title }}
            </div>
          </template>
        </UCarousel>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Autoplay</h3>
      <p class="demo-description">Automatically advance slides with configurable delay using <code>autoplay</code> and <code>:autoplay</code>.</p>
      <CodeCollapsible :code="autoplayCode">
        <UCarousel :items="logoSlides" :autoplay="{ delay: 2000 }" class="w-full max-w-lg">
          <template #default="{ item }">
            <div class="h-32 rounded-xl bg-surface-subtle flex items-center justify-center gap-2">
              <UIcon :name="item.icon" class="size-8" />
              <span class="font-medium">{{ item.name }}</span>
            </div>
          </template>
        </UCarousel>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loop</h3>
      <p class="demo-description">Enable infinite looping so the carousel wraps around when reaching the start or end using the <code>loop</code> prop.</p>
      <CodeCollapsible :code="loopCode">
        <UCarousel :items="slides" arrows loop class="w-full max-w-lg">
          <template #default="{ item }">
            <div class="h-40 rounded-xl flex items-center justify-center text-white text-lg font-semibold" :class="item.color">
              {{ item.title }}
            </div>
          </template>
        </UCarousel>
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
