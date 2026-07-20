<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A simple horizontal separator line for dividing content sections.</p>
      <CodeCollapsible code="<USeparator />">
        <div class="demo-row demo-row--col">
          <USeparator />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Types</h3>
      <p class="demo-description">Three line types via the <code>type</code> prop: solid, dashed, and dotted.</p>
      <CodeCollapsible :code="`<USeparator type=&quot;solid&quot; />
<USeparator type=&quot;dashed&quot; />
<USeparator type=&quot;dotted&quot; />`">
        <div class="demo-row demo-row--col" style="gap: 16px;">
          <USeparator type="solid" />
          <USeparator type="dashed" />
          <USeparator type="dotted" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Five size variants via the <code>size</code> prop: xs, sm, md (default), lg, and xl.</p>
      <CodeCollapsible :code="`<USeparator size=&quot;xs&quot; />
<USeparator size=&quot;sm&quot; />
<USeparator size=&quot;md&quot; />
<USeparator size=&quot;lg&quot; />
<USeparator size=&quot;xl&quot; />`">
        <div class="demo-row demo-row--col" style="gap: 16px;">
          <USeparator size="xs" />
          <USeparator size="sm" />
          <USeparator size="md" />
          <USeparator size="lg" />
          <USeparator size="xl" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <p class="demo-description">Color variants via the <code>color</code> prop: primary, neutral, and success for visual emphasis.</p>
      <CodeCollapsible :code="`<USeparator color=&quot;primary&quot; />
<USeparator color=&quot;neutral&quot; />
<USeparator color=&quot;success&quot; />`">
        <div class="demo-row demo-row--col" style="gap: 16px;">
          <USeparator color="primary" />
          <USeparator color="neutral" />
          <USeparator color="success" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Label</h3>
      <p class="demo-description">A separator with a text label using the <code>label</code> prop, commonly used for section breaks.</p>
      <CodeCollapsible :code="`<USeparator label=&quot;Hello World&quot; />`">
        <div class="demo-row">
          <USeparator label="Hello World" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Label Position</h3>
      <p class="demo-description">Position the label at start, center (default), or end of the separator line using the <code>position</code> prop.</p>
      <CodeCollapsible :code="`<USeparator position=&quot;start&quot; label=&quot;Start&quot; />
<USeparator position=&quot;center&quot; label=&quot;Center&quot; />
<USeparator position=&quot;end&quot; label=&quot;End&quot; />`">
        <div class="demo-row demo-row--col" style="gap: 16px;">
          <USeparator position="start" label="Start" />
          <USeparator position="center" label="Center" />
          <USeparator position="end" label="End" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icon</h3>
      <p class="demo-description">Replace the label with an icon using the <code>icon</code> prop for a decorative visual separator.</p>
      <CodeCollapsible :code="`<USeparator icon=&quot;i-simple-icons-nuxtdotjs&quot; />`">
        <div class="demo-row">
          <USeparator icon="i-simple-icons-nuxtdotjs" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Vertical Orientation</h3>
      <p class="demo-description">A vertical separator using <code>orientation="vertical"</code> for dividing inline elements like toolbar sections.</p>
      <CodeCollapsible :code="`<div class=&quot;flex items-center gap-4 h-12&quot;>
  <span>Left</span>
  <USeparator orientation=&quot;vertical&quot; />
  <span>Right</span>
</div>`">
        <div class="demo-row" style="align-items: center;">
          <span class="text-sm">Left</span>
          <USeparator orientation="vertical" class="h-8" />
          <span class="text-sm">Right</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Avatar</h3>
      <p class="demo-description">An avatar-based separator using the <code>avatar</code> prop for user-profile-style visual breaks.</p>
      <CodeCollapsible :code="`<USeparator :avatar=&quot;{ src: 'https://github.com/nuxt.png' }&quot; />`">
        <div class="demo-row">
          <USeparator :avatar="{ src: 'https://github.com/nuxt.png' }" />
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
.demo-row--col {
  flex-direction: column;
  align-items: stretch;
}
</style>
