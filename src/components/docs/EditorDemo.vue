<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const htmlValue = ref(
  '<h1>Hello World</h1>\n<p>This is a <strong>rich text</strong> editor based on <em>TipTap</em>.</p>\n<blockquote><p>Supports markdown, HTML, and JSON content types.</p></blockquote>',
);

const jsonValue = ref({
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "JSON Content" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "This editor also accepts " },
        { type: "text", marks: [{ type: "code" }], text: "JSONContent" },
        { type: "text", text: " objects." },
      ],
    },
  ],
});

const placeholderValue = ref("");

const basicCode = `<UEditor v-model="htmlValue" class="w-full min-h-24" />`;

const jsonCode = `<UEditor v-model="jsonValue" content-type="json" class="w-full min-h-24" />`;

const placeholderCode = `<UEditor v-model="placeholderValue" placeholder="Start typing..." class="w-full min-h-16" />`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Rich text editor (HTML)</h3>
      <CodeCollapsible :code="basicCode">
        <div class="demo-col">
          <UEditor v-model="htmlValue" class="w-full min-h-36" />
          <div class="demo-editor-output">
            <strong>Output (HTML):</strong>
            <pre class="demo-pre">{{ htmlValue }}</pre>
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>JSON content type</h3>
      <CodeCollapsible :code="jsonCode">
        <div class="demo-col">
          <UEditor v-model="jsonValue" content-type="json" class="w-full min-h-28" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With placeholder</h3>
      <CodeCollapsible :code="placeholderCode">
        <div class="demo-col">
          <UEditor
            v-model="placeholderValue"
            placeholder="Start writing..."
            class="w-full min-h-20"
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 8px;
}
.demo-editor-output {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
}
.demo-pre {
  all: revert;
  font-family: "DM Mono", monospace;
  font-size: 11px;
  background: var(--sl-color-gray-6);
  padding: 8px;
  border-radius: 4px;
  margin-top: 4px;
  max-height: 120px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
