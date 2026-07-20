<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const rating = ref(3);
const halfRating = ref(2.5);
const hoverRating = ref(0);

const basicCode = `<UInputRating
  v-model="rating"
/>`;

const halfStepCode = `<UInputRating
  v-model="rating"
  :step="0.5"
/>`;

const hoverableCode = `<UInputRating
  v-model="rating"
  hoverable
  clearable
/>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic rating</h3>
      <p class="demo-description">A 5-star rating input with <code>v-model</code> binding for numeric values.</p>
      <CodeCollapsible :code="basicCode">
        <div class="demo-row">
          <UInputRating
            v-model="rating"
          />
          <span class="rating-value">{{ rating }} / 5</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Half-step rating</h3>
      <p class="demo-description">Allows half-star precision using <code>step="0.5"</code> for more granular ratings.</p>
      <CodeCollapsible :code="halfStepCode">
        <div class="demo-row">
          <UInputRating
            v-model="halfRating"
            :step="0.5"
          />
          <span class="rating-value">{{ halfRating }} / 5</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Hoverable and clearable</h3>
      <p class="demo-description">Enables hover preview with <code>hoverable</code> and reset capability with <code>clearable</code>.</p>
      <CodeCollapsible :code="hoverableCode">
        <div class="demo-row">
          <UInputRating
            v-model="hoverRating"
            hoverable
            clearable
          />
          <span class="rating-value">{{ hoverRating || "Click to rate" }}</span>
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
.rating-value {
  font-size: 13px;
  color: var(--color-foreground-secondary, #4B5563);
}
</style>
