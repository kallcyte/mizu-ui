<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { createHead } from "@unhead/vue/client";
import CodeCollapsible from "./CodeCollapsible.vue";

// Provide unhead context so UBanner's useHead() resolves when this
// demo runs inside a `client:only="vue"` Astro island.
const head = createHead();
const instance = getCurrentInstance();
if (instance) {
  instance.appContext.provides["usehead"] = head;
  instance.appContext.config.globalProperties.$head = head;
  instance.appContext.config.globalProperties.$unhead = head;
}
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Title</h3>
      <p class="demo-description">Simple banner with title text for displaying important messages at the top of pages.</p>
      <CodeCollapsible :code="`<UBanner title=&quot;This is a banner with an important message.&quot; />`">
        <div class="demo-row demo-row--block">
          <UBanner title="This is a banner with an important message." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icon</h3>
      <p class="demo-description">Add a leading icon for visual context and improved accessibility.</p>
      <CodeCollapsible :code="`<UBanner icon=&quot;i-lucide-info&quot; title=&quot;This is a banner with an icon.&quot; />`">
        <div class="demo-row demo-row--block">
          <UBanner icon="i-lucide-info" title="This is a banner with an icon." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <p class="demo-description">Semantic color variants for different message types: primary, success, warning, error, and neutral.</p>
      <CodeCollapsible :code="`<UBanner color=&quot;primary&quot; icon=&quot;i-lucide-info&quot; title=&quot;Primary banner&quot; />
<UBanner color=&quot;success&quot; icon=&quot;i-lucide-check-circle&quot; title=&quot;Success banner&quot; />
<UBanner color=&quot;warning&quot; icon=&quot;i-lucide-alert-triangle&quot; title=&quot;Warning banner&quot; />
<UBanner color=&quot;error&quot; icon=&quot;i-lucide-x-circle&quot; title=&quot;Error banner&quot; />
<UBanner color=&quot;neutral&quot; icon=&quot;i-lucide-info&quot; title=&quot;Neutral banner&quot; />`">
        <div class="demo-row demo-row--block demo-row--stacked">
          <UBanner color="primary" icon="i-lucide-info" title="Primary banner" />
          <UBanner color="success" icon="i-lucide-check-circle" title="Success banner" />
          <UBanner color="warning" icon="i-lucide-alert-triangle" title="Warning banner" />
          <UBanner color="error" icon="i-lucide-x-circle" title="Error banner" />
          <UBanner color="neutral" icon="i-lucide-info" title="Neutral banner" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Closable</h3>
      <p class="demo-description">Add a dismiss button with the <code>close</code> prop so users can hide the banner. Without an <code>id</code>, the close is session-only; add an <code>id</code> to persist the dismiss state in <code>localStorage</code>.</p>
      <CodeCollapsible :code="`<UBanner title=&quot;This is a closable banner. Click the X to dismiss.&quot; close />`">
        <div class="demo-row demo-row--block">
          <UBanner title="This is a closable banner. Click the X to dismiss." close />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Actions</h3>
      <p class="demo-description">Add interactive action buttons using the <code>:actions</code> prop for banners requiring user input.</p>
      <CodeCollapsible :code="`<UBanner
  icon=&quot;i-lucide-info&quot;
  title=&quot;This is a banner with actions.&quot;
  :actions=&quot;[{ label: 'Action 1', variant: 'outline' }, { label: 'Action 2' }]&quot;
/>`">
        <div class="demo-row demo-row--block">
          <UBanner
            icon="i-lucide-info"
            title="This is a banner with actions."
            :actions="[{ label: 'Action 1', variant: 'outline' }, { label: 'Action 2' }]"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Link</h3>
      <p class="demo-description">Turn the banner into a clickable link using the <code>to</code> and <code>target</code> props.</p>
      <CodeCollapsible :code="`<UBanner to=&quot;https://example.com&quot; target=&quot;_blank&quot; title=&quot;Click here to learn more.&quot; color=&quot;primary&quot; />`">
        <div class="demo-row demo-row--block">
          <UBanner to="https://example.com" target="_blank" title="Click here to learn more." color="primary" />
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
  background: var(--color-surface-muted, #F3F4F6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 16px;
}
.demo-row--block {
  flex-direction: column;
  align-items: stretch;
}
.demo-row--stacked {
  gap: 8px;
}
</style>
