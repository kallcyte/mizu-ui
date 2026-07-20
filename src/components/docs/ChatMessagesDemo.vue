<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const messages = ref([
  { id: "1", role: "user" as const, parts: [{ type: "text" as const, text: "What's the weather like today?" }] },
  { id: "2", role: "assistant" as const, parts: [{ type: "text" as const, text: "I don't have access to real-time weather data, but I can help you find a weather service or explain how to check it yourself." }] },
  { id: "3", role: "user" as const, parts: [{ type: "text" as const, text: "Thanks, that would be helpful." }] },
]);

const status = ref("ready" as const);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic Message List</h3>
      <p class="demo-description">Render a list of chat messages with alternating user and assistant roles.</p>
      <CodeCollapsible :code="`<UChatMessages
  :messages=&quot;messages&quot;
  status=&quot;ready&quot;
/>`">
        <div class="demo-row demo-chat-row">
          <UChatMessages
            :messages="messages"
            :status="status"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Streaming Status</h3>
      <p class="demo-description">Show a loading indicator when the assistant is generating a response using the <code>status</code> prop.</p>
      <CodeCollapsible :code="`<UChatMessages
  :messages=&quot;messages&quot;
  status=&quot;streaming&quot;
/>`">
        <div class="demo-row demo-chat-row">
          <UChatMessages
            :messages="messages"
            status="streaming"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Custom User/Assistant Props</h3>
      <p class="demo-description">Customize individual message styling with <code>:user</code> and <code>:assistant</code> prop objects.</p>
      <CodeCollapsible :code="`<UChatMessages
  :messages=&quot;messages&quot;
  :user=&quot;{ variant: 'soft', color: 'primary' }&quot;
  :assistant=&quot;{ variant: 'subtle' }&quot;
/>`">
        <div class="demo-row demo-chat-row">
          <UChatMessages
            :messages="messages"
            :status="status"
            :user="{ variant: 'soft', color: 'primary' }"
            :assistant="{ variant: 'subtle' }"
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
.demo-chat-row {
  all: revert;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  max-width: 520px;
}
</style>
