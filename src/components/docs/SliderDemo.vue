<script setup lang="ts">
import { ref } from "vue";
import { TooltipProvider } from "reka-ui";
import CodeCollapsible from "./CodeCollapsible.vue";

const volume = ref(50);
const brightness = ref(70);
const range = ref([25, 75]);
const inverted = ref(30);
const minMax = ref(25);
const stepped = ref(50);
const vertical = ref(50);
const colorValue = ref(50);
const sized = ref(50);
const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
</script>

<template>
  <TooltipProvider>
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
        <h3>Min / Max</h3>
        <p class="demo-description">Use the <code>min</code> and <code>max</code> props to constrain the slider between 0 and 50.</p>
        <CodeCollapsible :code="`<USlider v-model=&quot;minMax&quot; :min=&quot;0&quot; :max=&quot;50&quot; />`">
          <div class="demo-col">
            <USlider v-model="minMax" :min="0" :max="50" />
            <p class="mizu-demo-value">Value: {{ minMax }}</p>
          </div>
        </CodeCollapsible>
      </section>

      <section class="example-section">
        <h3>Step</h3>
        <p class="demo-description">Use the <code>step</code> prop to snap the slider to increments of 10.</p>
        <CodeCollapsible :code="`<USlider v-model=&quot;stepped&quot; :step=&quot;10&quot; />`">
          <div class="demo-col">
            <USlider v-model="stepped" :step="10" />
            <p class="mizu-demo-value">Value: {{ stepped }}</p>
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
        <h3>Orientation</h3>
        <p class="demo-description">Use the <code>orientation</code> prop to render a vertical slider. A height class is required for vertical layout.</p>
        <CodeCollapsible :code="`<USlider v-model=&quot;vertical&quot; orientation=&quot;vertical&quot; class=&quot;h-48&quot; />`">
          <div class="demo-row">
            <USlider v-model="vertical" orientation="vertical" class="h-48" />
            <p class="mizu-demo-value">Value: {{ vertical }}</p>
          </div>
        </CodeCollapsible>
      </section>

      <section class="example-section">
        <h3>Color</h3>
        <p class="demo-description">Use the <code>color</code> prop to change the fill color of the slider track and thumb ring.</p>
        <CodeCollapsible :code="colors.map(c => `<USlider v-model=&quot;colorValue&quot; color=&quot;${c}&quot; />`).join('\n')">
          <div class="demo-col">
            <USlider
              v-for="c in colors"
              :key="c"
              v-model="colorValue"
              :color="c"
            />
            <p class="mizu-demo-value">Value: {{ colorValue }}</p>
          </div>
        </CodeCollapsible>
      </section>

      <section class="example-section">
        <h3>Size</h3>
        <p class="demo-description">Use the <code>size</code> prop to control the track height and thumb diameter.</p>
        <CodeCollapsible :code="`<USlider v-model=&quot;sized&quot; size=&quot;xl&quot; />`">
          <div class="demo-col">
            <USlider v-model="sized" size="xl" />
            <p class="mizu-demo-value">Value: {{ sized }}</p>
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
  </TooltipProvider>
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
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.mizu-demo-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
