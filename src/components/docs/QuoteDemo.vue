<script setup lang="ts">
import { MizuQuote } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const basicCode = `<MizuQuote>
  Design is not just what it looks like and feels like. Design is how it works.
</MizuQuote>`;

const citeCode = `<MizuQuote cite="Steve Jobs">
  Innovation distinguishes between a leader and a follower.
</MizuQuote>`;

const accentCode = `<MizuQuote accent>
  The best design is the simplest one that works.
</MizuQuote>`;

const accentCiteCode = `<MizuQuote accent cite="Albert Einstein">
  Imagination is more important than knowledge.
</MizuQuote>`;

const multiParagraphCode = `<MizuQuote accent cite="APA Style">
  <p>A block quote is a paraphrase or direct quotation that is longer than 40 words.</p>
  <p>Block quotes should start on a new line and be indented from the left margin.</p>
</MizuQuote>`;
</script>

<template>
  <div class="quote-demo not-content">
    <DemoTabs :code="basicCode">
      <div class="demo-section">
        <h3>Basic</h3>
        <MizuQuote>
          Design is not just what it looks like and feels like. Design is how it works.
        </MizuQuote>
      </div>
    </DemoTabs>

    <DemoTabs :code="citeCode">
      <div class="demo-section">
        <h3>With Cite</h3>
        <MizuQuote cite="Steve Jobs">
          Innovation distinguishes between a leader and a follower.
        </MizuQuote>
      </div>
    </DemoTabs>

    <DemoTabs :code="accentCode">
      <div class="demo-section">
        <h3>Accent Variant</h3>
        <MizuQuote accent>
          The best design is the simplest one that works.
        </MizuQuote>
      </div>
    </DemoTabs>

    <DemoTabs :code="accentCiteCode">
      <div class="demo-section">
        <h3>Accent With Cite</h3>
        <MizuQuote accent cite="Albert Einstein">
          Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.
        </MizuQuote>
      </div>
    </DemoTabs>

    <DemoTabs :code="multiParagraphCode">
      <div class="demo-section">
        <h3>Multi-paragraph</h3>
        <MizuQuote accent cite="APA Style">
          <p>A block quote is a paraphrase or direct quotation that is longer than 40 words. It should be formatted as a freestanding block of text that does not use quotation marks.</p>
          <p>Block quotes should start on a new line and be indented from the left margin.</p>
        </MizuQuote>
      </div>
    </DemoTabs>
  </div>
</template>

<style scoped>
.quote-demo {
  all: revert;
  font-family: var(--font-family-sans);
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: transparent;

  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
}
.quote-demo :deep(*) { margin: 0; }

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.demo-section > * {
  margin-top: 0;
}
.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}
</style>
