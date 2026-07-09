<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const value = ref("");

const users = [
  { label: "Sarah Chen", avatar: { text: "SC" }, description: "sarah@example.com" },
  { label: "Marcus Rivera", avatar: { text: "MR" }, description: "marcus@example.com" },
  { label: "Aiko Tanaka", avatar: { text: "AT" }, description: "aiko@example.com" },
  { label: "David Kim", avatar: { text: "DK" }, description: "david@example.com" },
  { label: "Emma Wilson", avatar: { text: "EW" }, description: "emma@example.com" },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UEditor v-slot=&quot;{ editor }&quot; v-model=&quot;value&quot;>
  <UEditorMentionMenu :editor=&quot;editor&quot; :items=&quot;users&quot; />
</UEditor>`">
        <div class="demo-col">
          <UEditor v-slot="{ editor }" v-model="value" placeholder="Type @ to mention someone...">
            <UEditorMentionMenu :editor="editor" :items="users" />
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
