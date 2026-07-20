<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const currentStep = ref(0);

const steps = [
  { title: "Account", description: "Create your account" },
  { title: "Profile", description: "Set up your profile" },
  { title: "Confirm", description: "Review and submit" },
];

const verticalSteps = [
  { title: "Cart", description: "Review your items" },
  { title: "Shipping", description: "Enter delivery address" },
  { title: "Payment", description: "Choose payment method" },
  { title: "Done", description: "Order confirmed" },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Horizontal (Linear)</h3>
      <p class="demo-description">A step-by-step wizard with <code>v-model:step</code> for linear progression. Use <code>:items</code> to define step titles and descriptions.</p>
      <CodeCollapsible :code="`<UStepper
  :items=&quot;[
    { title: 'Account', description: 'Create your account' },
    { title: 'Profile', description: 'Set up your profile' },
    { title: 'Confirm', description: 'Review and submit' },
  ]&quot;
  v-model:step=&quot;currentStep&quot;
>
  <template #content>
    <div class=&quot;p-4 border rounded-md&quot;>
      Step {{ currentStep + 1 }} content
    </div>
  </template>
</UStepper>`">
        <div class="demo-col">
          <UStepper v-model:step="currentStep" :items="steps">
            <template #content="{ index }">
              <div class="p-4 border border-surface-muted rounded-md text-sm text-foreground-secondary">
                Step {{ index + 1 }} content — {{ steps[index].description }}
              </div>
            </template>
          </UStepper>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Vertical</h3>
      <p class="demo-description">Display steps in a vertical list using <code>orientation="vertical"</code>. Ideal for timelines or checklists.</p>
      <CodeCollapsible :code="`<UStepper
  :items=&quot;steps&quot;
  orientation=&quot;vertical&quot;
/>`">
        <div class="demo-col">
          <UStepper :items="verticalSteps" orientation="vertical" />
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
  width: max-content;
  gap: 8px;
}
</style>
