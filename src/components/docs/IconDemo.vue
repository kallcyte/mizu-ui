<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Renders an icon using the <code>name</code> prop in <code>i-{collection}-{name}</code> format, powered by Iconify.</p>
      <CodeCollapsible :code="`<UIcon name=&quot;i-lucide-lightbulb&quot; class=&quot;size-5&quot; />`">
        <div class="demo-row">
          <UIcon name="i-lucide-lightbulb" class="size-5" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Controls icon dimensions with Tailwind sizing classes like <code>size-4</code>, <code>size-5</code>, <code>size-6</code>, and <code>size-8</code>.</p>
      <CodeCollapsible :code="`<UIcon name=&quot;i-lucide-star&quot; class=&quot;size-4&quot; />
<UIcon name=&quot;i-lucide-star&quot; class=&quot;size-5&quot; />
<UIcon name=&quot;i-lucide-star&quot; class=&quot;size-6&quot; />
<UIcon name=&quot;i-lucide-star&quot; class=&quot;size-8&quot; />`">
        <div class="demo-row">
          <UIcon name="i-lucide-star" class="size-4" />
          <UIcon name="i-lucide-star" class="size-5" />
          <UIcon name="i-lucide-star" class="size-6" />
          <UIcon name="i-lucide-star" class="size-8" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon Collections</h3>
      <p class="demo-description">Supports multiple icon sets including Lucide, Phosphor, and Simple Icons via the Iconify prefix-based name format.</p>
      <CodeCollapsible :code="`<UIcon name=&quot;i-lucide-heart&quot; class=&quot;size-5&quot; />
<UIcon name=&quot;i-ph-smiley&quot; class=&quot;size-5&quot; />
<UIcon name=&quot;i-simple-icons-nuxtdotjs&quot; class=&quot;size-5&quot; />`">
        <div class="demo-row">
          <UIcon name="i-lucide-heart" class="size-5" />
          <UIcon name="i-ph-smiley" class="size-5" />
          <UIcon name="i-simple-icons-nuxtdotjs" class="size-5" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>CSS Mode</h3>
      <p class="demo-description">Uses the <code>mode="css"</code> prop to render icons via CSS background instead of inline SVG, useful for performance and caching.</p>
      <CodeCollapsible :code="`<UIcon name=&quot;i-lucide-zap&quot; mode=&quot;css&quot; class=&quot;size-5&quot; />`">
        <div class="demo-row">
          <UIcon name="i-lucide-zap" mode="css" class="size-5" />
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
  gap: 12px;
}
</style>
