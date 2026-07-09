<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const value = ref("");
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UEditor v-slot=&quot;{ editor }&quot; v-model=&quot;value&quot; placeholder=&quot;Write something...&quot;>
  <UEditorDragHandle :editor=&quot;editor&quot; />
</UEditor>`">
        <div class="demo-col">
          <UEditor v-slot="{ editor }" v-model="value" placeholder="Write something, then hover near block edges to see the drag handle...">
            <UEditorDragHandle :editor="editor" />
          </UEditor>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Icon</h3>
      <CodeCollapsible :code="`<UEditor v-slot=&quot;{ editor }&quot; v-model=&quot;value&quot;>
  <UEditorDragHandle :editor=&quot;editor&quot; icon=&quot;i-lucide-move&quot; />
</UEditor>`">
        <div class="demo-col">
          <UEditor v-slot="{ editor }" v-model="value" placeholder="Hover to see the custom drag handle icon...">
            <UEditorDragHandle :editor="editor" icon="i-lucide-move" />
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
