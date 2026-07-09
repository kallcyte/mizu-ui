<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Statuses</h3>
      <CodeCollapsible :code="`<UChatPromptSubmit status=&quot;ready&quot; />
<UChatPromptSubmit status=&quot;streaming&quot; />
<UChatPromptSubmit status=&quot;submitted&quot; />
<UChatPromptSubmit status=&quot;error&quot; />`">
        <div class="demo-row">
          <UChatPromptSubmit status="ready" />
          <UChatPromptSubmit status="streaming" />
          <UChatPromptSubmit status="submitted" />
          <UChatPromptSubmit status="error" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Icons per Status</h3>
      <CodeCollapsible :code="`<UChatPromptSubmit
  status=&quot;streaming&quot;
  streaming-icon=&quot;i-lucide-loader-circle&quot;
  streaming-color=&quot;info&quot;
/>`">
        <div class="demo-row">
          <UChatPromptSubmit
            status="streaming"
            streaming-icon="i-lucide-loader-circle"
            streaming-color="info"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Within a ChatPrompt</h3>
      <CodeCollapsible :code="`<UChatPrompt placeholder=&quot;Type a message...&quot;>
  <template #trailing>
    <UChatPromptSubmit status=&quot;ready&quot; />
  </template>
</UChatPrompt>`">
        <div class="demo-row demo-chat-row">
          <UChatPrompt placeholder="Type a message...">
            <template #trailing>
              <UChatPromptSubmit status="ready" />
            </template>
          </UChatPrompt>
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
  gap: 8px;
}
.demo-chat-row {
  all: revert;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  max-width: 480px;
}
</style>
