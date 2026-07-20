<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const quantity = ref(1);
const percentage = ref(50);
const customStep = ref(0);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A simple number input with increment and decrement buttons managed via <code>v-model</code>.</p>
      <CodeCollapsible :code="`<UInputNumber v-model=&quot;quantity&quot; />`">
        <div class="demo-col">
          <UInputNumber v-model="quantity" />
          <p class="mizu-demo-value">Value: {{ quantity }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Min / Max / Step</h3>
      <p class="demo-description">Constrains the valid range with <code>min</code> and <code>max</code>, and controls step increments with <code>step</code>.</p>
      <CodeCollapsible :code="`<UInputNumber v-model=&quot;percentage&quot; :min=&quot;0&quot; :max=&quot;100&quot; :step=&quot;5&quot; />`">
        <div class="demo-col">
          <UInputNumber v-model="percentage" :min="0" :max="100" :step="5" />
          <p class="mizu-demo-value">Value: {{ percentage }}%</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Increment / Decrement</h3>
      <p class="demo-description">Customize the appearance of the +/- buttons using the <code>increment</code> and <code>decrement</code> props.</p>
      <CodeCollapsible :code="`<UInputNumber
  v-model=&quot;customStep&quot;
  :step=&quot;10&quot;
  :increment=&quot;{ color: 'neutral', variant: 'solid', size: 'xs' }&quot;
  :decrement=&quot;{ color: 'neutral', variant: 'solid', size: 'xs' }&quot;
/>`">
        <div class="demo-col">
          <UInputNumber
            v-model="customStep"
            :step="10"
            :increment="{ color: 'neutral', variant: 'solid', size: 'xs' }"
            :decrement="{ color: 'neutral', variant: 'solid', size: 'xs' }"
          />
          <p class="mizu-demo-value">Value: {{ customStep }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With FormField</h3>
      <p class="demo-description">Integrates with UFormField for consistent label, helper text, and error display.</p>
      <CodeCollapsible :code="`<UFormField label=&quot;Quantity&quot; help=&quot;Enter a number between 1 and 99.&quot;>
  <UInputNumber v-model=&quot;quantity&quot; :min=&quot;1&quot; :max=&quot;99&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Quantity" help="Enter a number between 1 and 99.">
            <UInputNumber v-model="quantity" :min="1" :max="99" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Prevents user interaction with a muted appearance.</p>
      <CodeCollapsible :code="`<UInputNumber disabled :default-value=&quot;42&quot; />`">
        <div class="demo-col">
          <UInputNumber disabled :default-value="42" />
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
  max-width: 280px;
}
.mizu-demo-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
