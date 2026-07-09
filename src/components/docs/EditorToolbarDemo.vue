<script setup lang="ts">
import { ref } from "vue";
import type { EditorToolbarItem } from "@nuxt/ui";
import CodeCollapsible from "./CodeCollapsible.vue";

const value = ref(
  "<h2>Toolbar Demo</h2>\n<p>Select some <strong>text</strong> to format it, or use the toolbar buttons below.</p>",
);

const items: EditorToolbarItem[] = [
  { kind: "mark", mark: "bold", icon: "i-lucide-bold" },
  { kind: "mark", mark: "italic", icon: "i-lucide-italic" },
  { kind: "mark", mark: "strike", icon: "i-lucide-strikethrough" },
  { kind: "mark", mark: "code", icon: "i-lucide-code" },
  { kind: "heading", level: 1, icon: "i-lucide-heading-1" },
  { kind: "heading", level: 2, icon: "i-lucide-heading-2" },
  { kind: "blockquote", icon: "i-lucide-quote" },
  { kind: "bulletList", icon: "i-lucide-list" },
  { kind: "orderedList", icon: "i-lucide-list-ordered" },
  { kind: "codeBlock", icon: "i-lucide-code-xml" },
  { kind: "horizontalRule", icon: "i-lucide-minus" },
  { kind: "undo", icon: "i-lucide-undo" },
  { kind: "redo", icon: "i-lucide-redo" },
];

const toolbarCode = `const items: EditorToolbarItem[] = [
  { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold' },
  { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic' },
  { kind: 'mark', mark: 'strike', icon: 'i-lucide-strikethrough' },
  { kind: 'mark', mark: 'code', icon: 'i-lucide-code' },
  { kind: 'heading', level: 1, icon: 'i-lucide-heading-1' },
  { kind: 'heading', level: 2, icon: 'i-lucide-heading-2' },
  { kind: 'blockquote', icon: 'i-lucide-quote' },
  { kind: 'bulletList', icon: 'i-lucide-list' },
  { kind: 'orderedList', icon: 'i-lucide-list-ordered' },
  { kind: 'codeBlock', icon: 'i-lucide-code-xml' },
  { kind: 'horizontalRule', icon: 'i-lucide-minus' },
  { kind: 'undo', icon: 'i-lucide-undo' },
  { kind: 'redo', icon: 'i-lucide-redo' },
]

<UEditor v-slot="{ editor }" v-model="value">
  <UEditorToolbar :editor="editor" :items="items" />
</UEditor>`;

const bubbleCode = `<UEditor v-slot="{ editor }" v-model="value">
  <UEditorToolbar :editor="editor" :items="items" layout="bubble" />
</UEditor>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Fixed toolbar</h3>
      <CodeCollapsible :code="toolbarCode">
        <div class="demo-col">
          <UEditor v-slot="{ editor }" v-model="value" class="w-full min-h-36">
            <UEditorToolbar :editor="editor" :items="items" />
          </UEditor>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Bubble toolbar (select text)</h3>
      <CodeCollapsible :code="bubbleCode">
        <div class="demo-col">
          <UEditor
            v-slot="{ editor }"
            v-model="value"
            placeholder="Select text to see the bubble toolbar..."
            class="w-full min-h-36"
          >
            <UEditorToolbar :editor="editor" :items="items" layout="bubble" />
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
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
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
