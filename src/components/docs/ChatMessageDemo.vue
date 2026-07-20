<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const userParts = ref([{ type: "text" as const, text: "Can you explain how Vue reactivity works?" }]);
const assistantParts = ref([
  { type: "text" as const, text: "Vue reactivity is built on Proxies that track property access and trigger updates when values change. When you use `ref()` or `reactive()`, Vue wraps your data so it can intercept reads and writes automatically." },
]);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>User Message</h3>
      <p class="demo-description">Right-aligned user message with soft variant and optional avatar.</p>
      <CodeCollapsible :code="`<UChatMessage
  id=&quot;msg-1&quot;
  role=&quot;user&quot;
  :parts=&quot;[{ type: 'text', text: 'Can you explain how Vue reactivity works?' }]&quot;
  side=&quot;right&quot;
  variant=&quot;soft&quot;
/>`">
        <div class="demo-row demo-chat-row">
          <UChatMessage
            id="msg-1"
            role="user"
            :parts="userParts"
            side="right"
            variant="soft"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Assistant Message</h3>
      <p class="demo-description">Left-aligned assistant message with default subtle styling.</p>
      <CodeCollapsible :code="`<UChatMessage
  id=&quot;msg-2&quot;
  role=&quot;assistant&quot;
  :parts=&quot;[{ type: 'text', text: 'Vue reactivity is built on Proxies...' }]&quot;
  side=&quot;left&quot;
/>`">
        <div class="demo-row demo-chat-row">
          <UChatMessage
            id="msg-2"
            role="assistant"
            :parts="assistantParts"
            side="left"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Avatar</h3>
      <p class="demo-description">Display user avatar alongside the message using the <code>:avatar</code> prop.</p>
      <CodeCollapsible :code="`<UChatMessage
  id=&quot;msg-3&quot;
  role=&quot;user&quot;
  :parts=&quot;parts&quot;
  side=&quot;right&quot;
  variant=&quot;soft&quot;
  avatar=&quot;{ src: 'https://i.pravatar.cc/80', alt: 'User' }&quot;
/>`">
        <div class="demo-row demo-chat-row">
          <UChatMessage
            id="msg-3"
            role="user"
            :parts="userParts"
            side="right"
            variant="soft"
            :avatar="{ src: 'https://i.pravatar.cc/80?img=1', alt: 'User' }"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Compact</h3>
      <p class="demo-description">Reduce padding and spacing with the <code>compact</code> prop for dense chat layouts.</p>
      <CodeCollapsible :code="`<UChatMessage
  id=&quot;msg-4&quot;
  role=&quot;assistant&quot;
  :parts=&quot;parts&quot;
  compact
/>`">
        <div class="demo-row demo-chat-row">
          <UChatMessage
            id="msg-4"
            role="assistant"
            :parts="[{ type: 'text', text: 'Short reply in compact mode.' }]"
            compact
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
  max-width: 480px;
}
</style>
