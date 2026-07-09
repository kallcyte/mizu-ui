<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const singleValue = ref("");
const objectValue = ref<{ label: string; code: string } | null>(null);
const countryValue = ref("");
const multiValue = ref<string[]>([]);
const searchValue = ref("");

const items = ["Backlog", "Todo", "In Progress", "Done"];

const objectItems = [
  { label: "United States", code: "US" },
  { label: "Canada", code: "CA" },
  { label: "United Kingdom", code: "UK" },
  { label: "Australia", code: "AU" },
];

const countries = [
  { label: "+1", code: "+1" },
  { label: "+44", code: "+44" },
  { label: "+81", code: "+81" },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="`<USelectMenu size=&quot;sm&quot; :items=&quot;['SM']&quot; />
<USelectMenu size=&quot;md&quot; :items=&quot;['MD']&quot; />
<USelectMenu size=&quot;lg&quot; :items=&quot;['LG']&quot; />`">
        <div class="demo-col">
          <USelectMenu size="sm" :items="['SM']" placeholder="Size SM" />
          <USelectMenu size="md" :items="['MD']" placeholder="Size MD" />
          <USelectMenu size="lg" :items="['LG']" placeholder="Size LG" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<USelectMenu
  v-model=&quot;value&quot;
  :items=&quot;['Backlog', 'Todo', 'In Progress', 'Done']&quot;
  placeholder=&quot;Select status&quot;
/>`">
        <div class="demo-col">
          <USelectMenu v-model="singleValue" :items="items" placeholder="Select status" />
          <p v-if="singleValue" class="mizu-select-value">Selected: {{ singleValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With objects and value-key</h3>
      <CodeCollapsible :code="`<USelectMenu
  v-model=&quot;value&quot;
  value-key=&quot;code&quot;
  :items=&quot;[{ label: 'United States', code: 'US' }, ...]&quot;
  placeholder=&quot;Select country&quot;
/>`">
        <div class="demo-col">
          <USelectMenu
            v-model="countryValue"
            value-key="code"
            :items="objectItems"
            placeholder="Select country"
          />
          <p v-if="countryValue" class="mizu-select-value">Code: {{ countryValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple</h3>
      <CodeCollapsible :code="`<USelectMenu
  v-model=&quot;value&quot;
  :items=&quot;['Backlog', 'Todo', 'In Progress', 'Done']&quot;
  multiple
  placeholder=&quot;Select statuses&quot;
/>`">
        <div class="demo-col">
          <USelectMenu v-model="multiValue" :items="items" multiple placeholder="Select statuses" />
          <p v-if="multiValue.length" class="mizu-select-value">Selected: {{ multiValue.join(", ") }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Searchable</h3>
      <CodeCollapsible :code="`<USelectMenu
  v-model=&quot;value&quot;
  :items=&quot;['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']&quot;
  placeholder=&quot;Search fruit...&quot;
/>`">
        <div class="demo-col">
          <USelectMenu v-model="searchValue" :items="['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']" placeholder="Search fruit..." />
          <p v-if="searchValue" class="mizu-select-value">Picked: {{ searchValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<USelectMenu disabled placeholder=&quot;Disabled&quot; :items=&quot;['Option 1']&quot; />`">
        <div class="demo-col">
          <USelectMenu disabled placeholder="Disabled" :items="['Option 1']" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With label and help text</h3>
      <CodeCollapsible :code="`<UFormField label=&quot;Country&quot; help=&quot;Select your country of residence&quot; class=&quot;w-full&quot;>
  <USelectMenu class=&quot;w-full&quot; :items=&quot;['United States', 'Canada', 'United Kingdom']&quot; placeholder=&quot;Choose a country&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Country" help="Select your country of residence" class="w-full">
            <USelectMenu class="w-full" :items="['United States', 'Canada', 'United Kingdom']" placeholder="Choose a country" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Within a FieldGroup</h3>
      <CodeCollapsible :code="`<UFieldGroup>
  <USelectMenu
    :items=&quot;countries&quot;
    value-key=&quot;code&quot;
    placeholder=&quot;+1&quot;
    size=&quot;md&quot;
  />
  <UInput placeholder=&quot;Phone number&quot; />
</UFieldGroup>`">
        <div class="demo-col" style="max-width: 360px">
          <UFieldGroup>
            <USelectMenu
              :items="countries"
              value-key="code"
              placeholder="+1"
              size="md"
            />
            <UInput placeholder="Phone number" />
          </UFieldGroup>
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
.mizu-select-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
