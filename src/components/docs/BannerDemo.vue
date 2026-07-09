<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Title</h3>
      <CodeCollapsible :code="`<UBanner title=&quot;This is a banner with an important message.&quot; />`">
        <div class="demo-row demo-row--block">
          <UBanner title="This is a banner with an important message." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icon</h3>
      <CodeCollapsible :code="`<UBanner icon=&quot;i-lucide-info&quot; title=&quot;This is a banner with an icon.&quot; />`">
        <div class="demo-row demo-row--block">
          <UBanner icon="i-lucide-info" title="This is a banner with an icon." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
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
      <CodeCollapsible :code="`<UBanner id=&quot;demo&quot; title=&quot;This is a closable banner.&quot; close />`">
        <div class="demo-row demo-row--block">
          <UBanner id="demo-close" title="This is a closable banner. Click the X to dismiss." close />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Actions</h3>
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
  color: var(--sl-color-text);
  margin: 0;
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
