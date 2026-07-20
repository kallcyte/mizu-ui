<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Three size presets: small, medium, and large for keyboard key badges.</p>
      <CodeCollapsible :code="`<UKbd size=&quot;sm&quot;>Ctrl</UKbd>
<UKbd size=&quot;md&quot;>K</UKbd>
<UKbd size=&quot;lg&quot;>Cmd</UKbd>`">
        <div class="demo-row">
          <UKbd size="sm">Ctrl</UKbd>
          <UKbd size="md">K</UKbd>
          <UKbd size="lg">Cmd</UKbd>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Combinations</h3>
      <p class="demo-description">Compose multiple Kbd components with plus separators for keyboard shortcuts.</p>
      <CodeCollapsible :code="`<UKbd>Ctrl</UKbd> + <UKbd>K</UKbd>`">
        <div class="demo-row">
          <UKbd>Ctrl</UKbd>
          <span>+</span>
          <UKbd>K</UKbd>
        </div>
        <div class="demo-row" style="margin-top: 8px;">
          <UKbd>Cmd</UKbd>
          <span>+</span>
          <UKbd>Shift</UKbd>
          <span>+</span>
          <UKbd>P</UKbd>
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
  gap: 6px;
}
</style>
