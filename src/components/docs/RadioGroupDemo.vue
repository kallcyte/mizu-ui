<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const theme = ref("System");
const themes = ["System", "Light", "Dark"];

const plan = ref("startup");
const plans = [
  { label: "Pro", value: "pro", description: "Tailored for indie hackers, freelancers and solo founders." },
  { label: "Startup", value: "startup", description: "Best suited for small teams, startups and agencies." },
  { label: "Enterprise", value: "enterprise", description: "Ideal for larger teams and organizations." },
];

const size = ref("md");
const sizes = ["SM", "MD", "LG", "XL"];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<URadioGroup v-model=&quot;theme&quot; legend=&quot;Theme&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <URadioGroup v-model="theme" legend="Theme" :items="themes" />
          <p class="mizu-demo-value">Selected: {{ theme }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Card Variant with Descriptions</h3>
      <CodeCollapsible :code="`<URadioGroup v-model=&quot;plan&quot; variant=&quot;card&quot; :items=&quot;plans&quot; />`">
        <div class="demo-col">
          <URadioGroup v-model="plan" variant="card" :items="plans" />
          <p class="mizu-demo-value">Selected: {{ plan }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Horizontal Orientation</h3>
      <CodeCollapsible :code="`<URadioGroup v-model=&quot;size&quot; legend=&quot;Size&quot; orientation=&quot;horizontal&quot; :items=&quot;['SM', 'MD', 'LG', 'XL']&quot; />`">
        <div class="demo-col">
          <URadioGroup v-model="size" legend="Size" orientation="horizontal" :items="sizes" />
          <p class="mizu-demo-value">Selected: {{ size }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<URadioGroup disabled default-value=&quot;System&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <URadioGroup disabled default-value="System" :items="themes" />
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
  max-width: 400px;
}
.mizu-demo-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
