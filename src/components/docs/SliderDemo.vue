<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const volume = ref(50);
const brightness = ref(70);
const range = ref([25, 75]);
const inverted = ref(30);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A simple slider bound with v-model, supporting numeric values from 0 to 100 by default.</p>
      <CodeCollapsible :code="`<USlider v-model=&quot;volume&quot; />`">
        <div class="demo-col">
          <USlider v-model="volume" />
          <p class="mizu-demo-value">Value: {{ volume }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Tooltip</h3>
      <p class="demo-description">Use the <code>tooltip</code> prop to display the current value as a tooltip above the slider thumb.</p>
      <CodeCollapsible :code="`<USlider v-model=&quot;brightness&quot; tooltip />`">
        <div class="demo-col">
          <USlider v-model="brightness" tooltip />
          <p class="mizu-demo-value">Value: {{ brightness }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Range (Multiple Thumbs)</h3>
      <p class="demo-description">A range slider with two thumbs for selecting a min/max range, with <code>min-steps-between-thumbs</code> to enforce a minimum gap.</p>
      <CodeCollapsible :code="`<USlider v-model=&quot;range&quot; :min-steps-between-thumbs=&quot;5&quot; />`">
        <div class="demo-col">
          <USlider v-model="range" :min-steps-between-thumbs="5" />
          <p class="mizu-demo-value">Range: {{ range[0] }} – {{ range[1] }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Inverted</h3>
      <p class="demo-description">An inverted slider using the <code>inverted</code> prop, where the track fills from the right end of the range.</p>
      <CodeCollapsible :code="`<USlider v-model=&quot;inverted&quot; inverted />`">
        <div class="demo-col">
          <USlider v-model="inverted" inverted />
          <p class="mizu-demo-value">Value: {{ inverted }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">A disabled slider via the <code>disabled</code> prop, preventing user interaction and showing a muted appearance.</p>
      <CodeCollapsible :code="`<USlider disabled :default-value=&quot;40&quot; />`">
        <div class="demo-col">
          <USlider disabled :default-value="40" />
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  max-width: 320px;
}
.mizu-demo-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
