<script setup lang="ts">
import { ref } from "vue";
import type { RadioGroupItem } from "@nuxt/ui";
import CodeCollapsible from "./CodeCollapsible.vue";

const theme = ref("System");
const themes = ["System", "Light", "Dark"];

const plan = ref("startup");
const plans: RadioGroupItem[] = [
  { label: "Pro", value: "pro", description: "Tailored for indie hackers, freelancers and solo founders." },
  { label: "Startup", value: "startup", description: "Best suited for small teams, startups and agencies." },
  { label: "Enterprise", value: "enterprise", description: "Ideal for larger teams and organizations." },
];

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A simple radio group bound with v-model, using string items and a legend for accessibility.</p>
      <CodeCollapsible :code="`<URadioGroup v-model=&quot;theme&quot; legend=&quot;Theme&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <URadioGroup v-model="theme" legend="Theme" :items="themes" />
          <p class="mizu-demo-value">Selected: {{ theme }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Card Variant with Descriptions</h3>
      <p class="demo-description">Card-style radio group using the <code>variant="card"</code> prop, with label and description for each option.</p>
      <CodeCollapsible :code="`<URadioGroup v-model=&quot;plan&quot; variant=&quot;card&quot; :items=&quot;plans&quot; />`">
        <div class="demo-col">
          <URadioGroup v-model="plan" variant="card" :items="plans" />
          <p class="mizu-demo-value">Selected: {{ plan }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Table Variant</h3>
      <p class="demo-description">Use <code>variant="table"</code> to render each radio option as a full-width table row with connected borders.</p>
      <CodeCollapsible :code="`<URadioGroup :default-value=&quot;'System'&quot; variant=&quot;table&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <URadioGroup default-value="System" variant="table" :items="themes" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Use the <code>color</code> prop to change the color of the radio group's indicator.</p>
      <CodeCollapsible :code="colors.map(c => `<URadioGroup color=&quot;${c}&quot; :default-value=&quot;'System'&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`).join('\n')">
        <div class="demo-col">
          <URadioGroup
            v-for="c in colors"
            :key="c"
            :color="c"
            :default-value="'System'"
            :items="['System', 'Light', 'Dark']"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Size</h3>
      <p class="demo-description">Use the <code>size</code> prop to change the size of the radio group's indicator and text.</p>
      <CodeCollapsible :code="`<URadioGroup size=&quot;sm&quot; :default-value=&quot;'System'&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />
<URadioGroup size=&quot;md&quot; :default-value=&quot;'System'&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />
<URadioGroup size=&quot;lg&quot; :default-value=&quot;'System'&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <URadioGroup size="sm" :default-value="'System'" :items="['System', 'Light', 'Dark']" />
          <URadioGroup size="md" :default-value="'System'" :items="['System', 'Light', 'Dark']" />
          <URadioGroup size="lg" :default-value="'System'" :items="['System', 'Light', 'Dark']" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Horizontal Orientation</h3>
      <p class="demo-description">Radio group laid out horizontally using <code>orientation="horizontal"</code> instead of the default vertical layout.</p>
      <CodeCollapsible :code="`<URadioGroup orientation=&quot;horizontal&quot; variant=&quot;list&quot; :default-value=&quot;'System'&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <URadioGroup orientation="horizontal" variant="list" :default-value="'System'" :items="['System', 'Light', 'Dark']" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indicator Position</h3>
      <p class="demo-description">Use the <code>indicator</code> prop to position the radio indicator at <code>start</code> (default) or <code>end</code>.</p>
      <CodeCollapsible :code="`<URadioGroup indicator=&quot;end&quot; variant=&quot;card&quot; :default-value=&quot;'System'&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <URadioGroup indicator="end" variant="card" :default-value="'System'" :items="['System', 'Light', 'Dark']" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Legend</h3>
      <p class="demo-description">Use the <code>legend</code> prop to provide a heading for the radio group, rendered as a fieldset legend for accessibility.</p>
      <CodeCollapsible :code="`<URadioGroup legend=&quot;Theme&quot; :default-value=&quot;'System'&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <URadioGroup legend="Theme" :default-value="'System'" :items="['System', 'Light', 'Dark']" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Use the <code>disabled</code> prop to prevent user interaction with all radio options.</p>
      <CodeCollapsible :code="`<URadioGroup disabled :default-value=&quot;'System'&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <URadioGroup disabled :default-value="'System'" :items="['System', 'Light', 'Dark']" />
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
  gap: 8px;
  width: 100%;
  max-width: 320px;
}
.mizu-demo-value {
  font-size: 13px;
  color: var(--color-foreground-secondary, #4B5563);
}
</style>
