<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const reasoningOpen = ref(false);
const reasoningText = ref("Analyzing the query requires breaking it down into several steps. First, we identify the key entities mentioned. Then, we cross-reference them against the knowledge base. Finally, we synthesize a response that addresses the user's intent while maintaining factual accuracy. The confidence score for this reasoning chain is 94%.");
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UChatReasoning text=&quot;Analyzing the query...&quot; />`">
        <div class="demo-row">
          <UChatReasoning text="Analyzing the query requires breaking it down into several steps. First, we identify the key entities mentioned." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Streaming</h3>
      <CodeCollapsible :code="`<UChatReasoning text=&quot;Thinking...&quot; streaming />`">
        <div class="demo-row">
          <UChatReasoning text="Thinking through the problem step by step..." streaming />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Default Open</h3>
      <CodeCollapsible :code="`<UChatReasoning default-open text=&quot;Reasoning steps...&quot; />`">
        <div class="demo-row">
          <UChatReasoning default-open :text="reasoningText" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Controlled with v-model</h3>
      <CodeCollapsible :code="`<UChatReasoning v-model:open=&quot;open&quot; :text=&quot;text&quot; />`">
        <div class="demo-col">
          <UButton :label="reasoningOpen ? 'Close reasoning' : 'Open reasoning'" size="xs" color="neutral" variant="subtle" @click="reasoningOpen = !reasoningOpen" />
          <UChatReasoning v-model:open="reasoningOpen" :text="reasoningText" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<UChatReasoning disabled text=&quot;Locked reasoning...&quot; />`">
        <div class="demo-row">
          <UChatReasoning disabled text="This reasoning panel is locked and cannot be expanded." />
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
  align-items: flex-start;
  gap: 8px;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 8px;
}
</style>
