<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const value = ref("");

const emojis = [
  { name: "Smile", emoji: "😊", shortcodes: [":smile:", ":happy:"], tags: ["happy", "face"] },
  { name: "Heart", emoji: "❤️", shortcodes: [":heart:", ":love:"], tags: ["love"] },
  { name: "Rocket", emoji: "🚀", shortcodes: [":rocket:", ":launch:"], tags: ["space", "launch"] },
  { name: "Party", emoji: "🎉", shortcodes: [":party:", ":tada:"], tags: ["celebration"] },
  { name: "Fire", emoji: "🔥", shortcodes: [":fire:", ":hot:"], tags: ["hot", "trending"] },
  { name: "Star", emoji: "⭐", shortcodes: [":star:"], tags: ["favorite"] },
  { name: "Check", emoji: "✅", shortcodes: [":check:", ":done:"], tags: ["complete"] },
  { name: "Thumbs Up", emoji: "👍", shortcodes: [":+1:", ":thumbsup:"], tags: ["approve"] },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UEditor v-slot=&quot;{ editor }&quot; v-model=&quot;value&quot;>
  <UEditorEmojiMenu :editor=&quot;editor&quot; :items=&quot;emojis&quot; />
</UEditor>`">
        <div class="demo-col">
          <UEditor v-slot="{ editor }" v-model="value" placeholder="Type : to pick an emoji...">
            <UEditorEmojiMenu :editor="editor" :items="emojis" />
          </UEditor>
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 8px;
}
</style>
