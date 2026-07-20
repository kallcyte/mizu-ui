<script setup lang="ts">
import { ref } from "vue";
import type { EditorSuggestionMenuItem } from "@nuxt/ui";
import CodeCollapsible from "./CodeCollapsible.vue";

const value = ref("<p>Type <code>/</code> to open the suggestion menu and insert blocks.</p>");

const items: EditorSuggestionMenuItem[] = [
  { kind: "heading", level: 2, label: "Heading 2", description: "Large section heading", icon: "i-lucide-heading-2" },
  { kind: "heading", level: 3, label: "Heading 3", description: "Medium section heading", icon: "i-lucide-heading-3" },
  { kind: "bulletList", label: "Bullet List", description: "Create a simple bullet list", icon: "i-lucide-list" },
  { kind: "orderedList", label: "Ordered List", description: "Create a numbered list", icon: "i-lucide-list-ordered" },
  { kind: "blockquote", label: "Blockquote", description: "Insert a blockquote", icon: "i-lucide-quote" },
  { kind: "codeBlock", label: "Code Block", description: "Insert a code block", icon: "i-lucide-code-xml" },
  { kind: "horizontalRule", label: "Divider", description: "Insert a horizontal divider", icon: "i-lucide-minus" },
  { kind: "image", label: "Image", description: "Insert an image", icon: "i-lucide-image" },
];

const suggestionCode = `const items: EditorSuggestionMenuItem[] = [
  { kind: 'heading', level: 2, label: 'Heading 2', description: 'Large section heading', icon: 'i-lucide-heading-2' },
  { kind: 'heading', level: 3, label: 'Heading 3', description: 'Medium section heading', icon: 'i-lucide-heading-3' },
  { kind: 'bulletList', label: 'Bullet List', description: 'Create a simple bullet list', icon: 'i-lucide-list' },
  { kind: 'orderedList', label: 'Ordered List', description: 'Create a numbered list', icon: 'i-lucide-list-ordered' },
  { kind: 'blockquote', label: 'Blockquote', description: 'Insert a blockquote', icon: 'i-lucide-quote' },
  { kind: 'codeBlock', label: 'Code Block', description: 'Insert a code block', icon: 'i-lucide-code-xml' },
  { kind: 'horizontalRule', label: 'Divider', description: 'Insert a horizontal divider', icon: 'i-lucide-minus' },
  { kind: 'image', label: 'Image', description: 'Insert an image', icon: 'i-lucide-image' },
]

<UEditor v-slot="{ editor }" v-model="value">
  <UEditorSuggestionMenu :editor="editor" :items="items" />
</UEditor>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Suggestion menu (type "/")</h3>
      <p class="demo-description">Opens a slash-command suggestion menu when typing <code>/</code>, using <code>EditorSuggestionMenuItem[]</code> items with kinds like <code>heading</code>, <code>bulletList</code>, <code>blockquote</code>, and <code>codeBlock</code>.</p>
      <CodeCollapsible :code="suggestionCode">
        <div class="demo-col">
          <UEditor
            v-slot="{ editor }"
            v-model="value"
            placeholder="Type / to open the suggestion menu..."
            class="w-full min-h-40"
          >
            <UEditorSuggestionMenu :editor="editor" :items="items" />
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 8px;
}
</style>
