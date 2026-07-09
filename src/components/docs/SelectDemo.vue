<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const selected = ref("");
const options = ["Option 1", "Option 2", "Option 3"];
const countryValue = ref("");
const requiredCountryValue = ref("");
const countries = ["United States", "Canada", "United Kingdom", "Australia"];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="`<USelect size=&quot;sm&quot; :items=&quot;['Small']&quot; />
<USelect size=&quot;md&quot; :items=&quot;['Medium']&quot; />
<USelect size=&quot;lg&quot; :items=&quot;['Large']&quot; />`">
        <div class="demo-col">
          <USelect size="sm" :items="['Small']" placeholder="Select size sm..." />
          <USelect size="md" :items="['Medium']" placeholder="Select size md..." />
          <USelect size="lg" :items="['Large']" placeholder="Select size lg..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Items</h3>
      <CodeCollapsible :code="`<USelect :items=&quot;['Option 1', 'Option 2', 'Option 3']&quot; v-model=&quot;selected&quot; />`">
        <div class="demo-col">
          <USelect v-model="selected" :items="options" placeholder="Select an option..." />
          <p v-if="selected" class="mizu-select-value">Selected: {{ selected }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<USelect disabled :items=&quot;['Disabled']&quot; />`">
        <div class="demo-col">
          <USelect disabled :items="['Disabled']" placeholder="Disabled" />
        </div>
      </CodeCollapsible>
    </section>
    <section class="example-section">
      <h3>With label and help text</h3>
      <CodeCollapsible :code="`<UFormField label=&quot;Country&quot; help=&quot;Select your country of residence&quot;>
  <USelect :items=&quot;['United States', 'Canada', 'United Kingdom']&quot; placeholder=&quot;Choose a country&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Country" help="Select your country of residence" class="w-full">
            <USelect v-model="countryValue" :items="countries" placeholder="Choose a country" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Required field</h3>
      <CodeCollapsible :code="`<UFormField class=&quot;w-full&quot;>
  <template #label>
    Role <span class=&quot;text-red-500&quot;>*</span>
  </template>
  <USelect :items=&quot;['Admin', 'Editor', 'Viewer']&quot; placeholder=&quot;Select a role&quot; required />
</UFormField>`">
        <div class="demo-col">
          <UFormField class="w-full">
            <template #label>
              Role <span class="text-red-500">*</span>
            </template>
            <USelect v-model="requiredCountryValue" :items="['Admin', 'Editor', 'Viewer']" placeholder="Select a role" required />
          </UFormField>
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
  gap: 8px;
  max-width: 280px;
}

.mizu-select-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
