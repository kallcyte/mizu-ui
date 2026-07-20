<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const messages = ref([
  { role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?" },
]);

const prompt = ref("");

function sendMessage() {
  if (!prompt.value.trim()) return;
  messages.value.push({ role: "user", content: prompt.value });
  prompt.value = "";
  setTimeout(() => {
    messages.value.push({ role: "assistant", content: "Thanks for your message! I'm processing your request." });
  }, 500);
}
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Full chat interface container with message area and prompt slot for building conversational UIs.</p>
      <CodeCollapsible :code="`<UChatPalette>
  <template #default>
    <div class=&quot;flex flex-col gap-2&quot;>
      <p>Assistant: Hello! How can I help?</p>
    </div>
  </template>
  <template #prompt>
    <UInput placeholder=&quot;Type a message...&quot; />
  </template>
</UChatPalette>`">
        <div class="demo-col">
          <UChatPalette class="min-h-[200px]">
            <div class="flex flex-col gap-3">
              <div
                v-for="(msg, i) in messages"
                :key="i"
                :class="[
                  'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                  msg.role === 'assistant'
                    ? 'self-start bg-surface-muted text-foreground-primary'
                    : 'self-end bg-primary text-primary-foreground',
                ]"
              >
                {{ msg.content }}
              </div>
            </div>
            <template #prompt>
              <div class="flex gap-2 mt-3">
                <UInput
                  v-model="prompt"
                  placeholder="Type a message..."
                  class="flex-1"
                  @keyup.enter="sendMessage"
                />
                <UButton label="Send" size="sm" @click="sendMessage" />
              </div>
            </template>
          </UChatPalette>
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
