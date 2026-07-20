<script setup lang="ts">
import { TooltipProvider } from "reka-ui";
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <TooltipProvider>
    <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Wrap any element with <code>UTooltip</code> and pass <code>text</code> to show a tooltip on hover.</p>
      <CodeCollapsible :code="`<UTooltip text=&quot;More info&quot;>
  <UButton label=&quot;Hover me&quot; />
</UTooltip>`">
        <div class="demo-row">
          <UTooltip text="More info">
            <UButton label="Hover tooltip" />
          </UTooltip>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Positions</h3>
      <p class="demo-description">Control tooltip placement using the <code>:popper</code> prop with <code>placement</code> set to <code>top</code>, <code>right</code>, <code>bottom</code>, or <code>left</code>.</p>
      <CodeCollapsible :code="`<UTooltip text=&quot;Top&quot; :popper=&quot;{ placement: 'top' }&quot;>
  <UButton label=&quot;Top&quot; />
</UTooltip>`">
        <div class="demo-row">
          <UTooltip text="Top placement" :popper="{ placement: 'top' }">
            <UButton label="Top" />
          </UTooltip>
          <UTooltip text="Right placement" :popper="{ placement: 'right' }">
            <UButton label="Right" />
          </UTooltip>
          <UTooltip text="Bottom placement" :popper="{ placement: 'bottom' }">
            <UButton label="Bottom" />
          </UTooltip>
          <UTooltip text="Left placement" :popper="{ placement: 'left' }">
            <UButton label="Left" />
          </UTooltip>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</TooltipProvider>
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
  gap: 24px;
  flex-wrap: wrap;
}
</style>
