<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A shimmer loading indicator that animates through text content while a response is being generated.</p>
      <CodeCollapsible :code="`<UChatShimmer text=&quot;Generating a response based on your query...&quot; />`">
        <div class="demo-row">
          <UChatShimmer text="Generating a response based on your query..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Duration</h3>
      <p class="demo-description">Control the animation cycle length with the <code>duration</code> prop in seconds.</p>
      <CodeCollapsible :code="`<UChatShimmer text=&quot;Loading...&quot; :duration=&quot;4&quot; />`">
        <div class="demo-row">
          <UChatShimmer text="Processing your request, this may take a moment..." :duration="4" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Spread</h3>
      <p class="demo-description">Adjust how many characters shimmer at once using the <code>spread</code> prop.</p>
      <CodeCollapsible :code="`<UChatShimmer text=&quot;Thinking...&quot; :spread=&quot;4&quot; />`">
        <div class="demo-row">
          <UChatShimmer text="Thinking..." :spread="4" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Long Text</h3>
      <p class="demo-description">The shimmer gracefully handles longer text strings, animating through multi-sentence content.</p>
      <CodeCollapsible :code="`<UChatShimmer text=&quot;Analyzing the codebase to find relevant examples and constructing a detailed, well-structured response that covers all edge cases and provides actionable recommendations for your specific use case.&quot; />`">
        <div class="demo-row">
          <UChatShimmer text="Analyzing the codebase to find relevant examples and constructing a detailed, well-structured response that covers all edge cases and provides actionable recommendations for your specific use case." />
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
  align-items: flex-start;
  gap: 8px;
}
</style>
