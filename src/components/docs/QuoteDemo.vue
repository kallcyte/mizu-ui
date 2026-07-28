<script setup lang="ts">
import { MizuQuote } from "@mizu-ui/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

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
  Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.
</MizuQuote>`;

const multiParagraphCode = `<MizuQuote accent cite="APA Style">
  <p>A block quote is a paraphrase or direct quotation that is longer than 40 words. It should be formatted as a freestanding block of text that does not use quotation marks.</p>
  <p>Block quotes should start on a new line and be indented from the left margin.</p>
</MizuQuote>`;
</script>

<template>
  <div class="quote-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Standard quote with left border indicator for simple citations.</p>
      <CodeCollapsible :code="basicCode">
        <MizuQuote>
          Design is not just what it looks like and feels like. Design is how it works.
        </MizuQuote>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Cite</h3>
      <p class="demo-description">Quote with attribution footer showing the author or source.</p>
      <CodeCollapsible :code="citeCode">
        <MizuQuote cite="Steve Jobs">
          Innovation distinguishes between a leader and a follower.
        </MizuQuote>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Accent Variant</h3>
      <p class="demo-description">Accent styling with Hub ycp border and subtle background for emphasis.</p>
      <CodeCollapsible :code="accentCode">
        <MizuQuote accent> The best design is the simplest one that works. </MizuQuote>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Accent With Cite</h3>
      <p class="demo-description">Accent variant combined with attribution for prominent quotations.</p>
      <CodeCollapsible :code="accentCiteCode">
        <MizuQuote accent cite="Albert Einstein">
          Imagination is more important than knowledge. Knowledge is limited. Imagination encircles
          the world.
        </MizuQuote>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multi-paragraph</h3>
      <p class="demo-description">Multi-paragraph quotes with proper spacing and formatting for longer citations.</p>
      <CodeCollapsible :code="multiParagraphCode">
        <MizuQuote accent cite="APA Style">
          <p>
            A block quote is a paraphrase or direct quotation that is longer than 40 words. It
            should be formatted as a freestanding block of text that does not use quotation marks.
          </p>
          <p>Block quotes should start on a new line and be indented from the left margin.</p>
        </MizuQuote>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.quote-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.quote-examples :deep(*) {
  margin: 0;
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
</style>
