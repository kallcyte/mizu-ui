<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Internal Link</h3>
      <p class="demo-description">Navigates within the app using the <code>to</code> prop for client-side routing.</p>
      <CodeCollapsible :code="`<ULink to=&quot;/components/navigation/link&quot;>
  Go to Link page
</ULink>`">
        <div class="demo-col">
          <ULink to="/components/navigation/link">
            Go to Link page
          </ULink>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>External Link</h3>
      <p class="demo-description">Opens external URLs in a new tab with the <code>href</code> and <code>target</code> props.</p>
      <CodeCollapsible :code="`<ULink href=&quot;https://github.com&quot; target=&quot;_blank&quot;>
  GitHub &amp;rarr;
</ULink>`">
        <div class="demo-col">
          <ULink href="https://github.com" target="_blank">
            GitHub &rarr;
          </ULink>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Prevents navigation with a muted appearance using the <code>disabled</code> prop.</p>
      <CodeCollapsible :code="`<ULink to=&quot;/dashboard&quot; disabled>
  Dashboard
</ULink>`">
        <div class="demo-col">
          <ULink to="/dashboard" disabled>
            Dashboard
          </ULink>
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 8px;
}
</style>
