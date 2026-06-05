<script setup lang="ts">
import { MizuQuote } from "@mizu/vue";
</script>

<template>
  <div class="quote-demo">
    <div class="demo-section">
      <h3>Basic</h3>
      <MizuQuote>
        Design is not just what it looks like and feels like. Design is how it works.
      </MizuQuote>
    </div>

    <div class="demo-section">
      <h3>With Cite</h3>
      <MizuQuote cite="Steve Jobs">
        Innovation distinguishes between a leader and a follower.
      </MizuQuote>
    </div>

    <div class="demo-section">
      <h3>Accent Variant</h3>
      <MizuQuote accent>
        The best design is the simplest one that works.
      </MizuQuote>
    </div>

    <div class="demo-section">
      <h3>Accent With Cite</h3>
      <MizuQuote accent cite="Albert Einstein">
        Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.
      </MizuQuote>
    </div>

    <div class="demo-section">
      <h3>Multi-paragraph</h3>
      <MizuQuote accent cite="APA Style">
        <p>A block quote is a paraphrase or direct quotation that is longer than 40 words. It should be formatted as a freestanding block of text that does not use quotation marks.</p>
        <p>Block quotes should start on a new line and be indented from the left margin.</p>
      </MizuQuote>
    </div>
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
  background: var(--sl-color-gray-2);
  border-radius: 8px;
}
.quote-demo :deep(*) { margin: 0; }

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin-bottom: 0;
}
</style>
