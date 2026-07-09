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
      <CodeCollapsible :code="`<USlider v-model=&quot;volume&quot; />`">
        <div class="demo-col">
          <USlider v-model="volume" />
          <p class="mizu-demo-value">Value: {{ volume }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Tooltip</h3>
      <CodeCollapsible :code="`<USlider v-model=&quot;brightness&quot; tooltip />`">
        <div class="demo-col">
          <USlider v-model="brightness" tooltip />
          <p class="mizu-demo-value">Value: {{ brightness }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Range (Multiple Thumbs)</h3>
      <CodeCollapsible :code="`<USlider v-model=&quot;range&quot; :min-steps-between-thumbs=&quot;5&quot; />`">
        <div class="demo-col">
          <USlider v-model="range" :min-steps-between-thumbs="5" />
          <p class="mizu-demo-value">Range: {{ range[0] }} – {{ range[1] }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Inverted</h3>
      <CodeCollapsible :code="`<USlider v-model=&quot;inverted&quot; inverted />`">
        <div class="demo-col">
          <USlider v-model="inverted" inverted />
          <p class="mizu-demo-value">Value: {{ inverted }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 8px;
  max-width: 320px;
}
.mizu-demo-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
