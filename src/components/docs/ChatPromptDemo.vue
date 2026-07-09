<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const prompt = ref("");
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic Prompt</h3>
      <CodeCollapsible :code="`<UChatPrompt
  v-model=&quot;prompt&quot;
  placeholder=&quot;Ask a question...&quot;
/>`">
        <div class="demo-row demo-chat-row">
          <UChatPrompt
            v-model="prompt"
            placeholder="Ask a question..."
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variants</h3>
      <CodeCollapsible :code="`<UChatPrompt variant=&quot;soft&quot; placeholder=&quot;Soft variant...&quot; />
<UChatPrompt variant=&quot;subtle&quot; placeholder=&quot;Subtle variant...&quot; />`">
        <div class="demo-row demo-chat-row">
          <UChatPrompt variant="soft" placeholder="Soft variant..." />
          <UChatPrompt variant="subtle" placeholder="Subtle variant..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<UChatPrompt
  v-model=&quot;prompt&quot;
  placeholder=&quot;Chat is disabled...&quot;
  disabled
/>`">
        <div class="demo-row demo-chat-row">
          <UChatPrompt
            v-model="prompt"
            placeholder="Chat is disabled..."
            disabled
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icon</h3>
      <CodeCollapsible :code="`<UChatPrompt
  v-model=&quot;prompt&quot;
  placeholder=&quot;Type your message...&quot;
  icon=&quot;i-lucide-message-circle&quot;
/>`">
        <div class="demo-row demo-chat-row">
          <UChatPrompt
            v-model="prompt"
            placeholder="Type your message..."
            icon="i-lucide-message-circle"
          />
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
