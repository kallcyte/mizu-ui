<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const items = ["System", "Light", "Dark"];
const value = ref<string[]>(["System"]);

const objectItems = [
  { label: "System", description: "Follow the system preference.", value: "system" },
  { label: "Light", description: "Always use light mode.", value: "light" },
  { label: "Dark", description: "Always use dark mode.", value: "dark" },
];
const objectValue = ref<string[]>(["system"]);

const horizontalItems = ["Backlog", "Todo", "In Progress", "Done"];
const horizontalValue = ref<string[]>(["Backlog"]);

const fruits = ["Apple", "Banana", "Blueberry"];
const selectedFruits = ref<string[]>(["Apple"]);
const selectAllModel = ref<any>(false);

</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UCheckboxGroup
  v-model=&quot;value&quot;
  :items=&quot;['System', 'Light', 'Dark']&quot;
/>`">
        <div class="demo-col">
          <UCheckboxGroup v-model="value" :items="items" />
          <p v-if="value.length" class="mizu-select-value">Selected: {{ value.join(", ") }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indeterminate Select-All</h3>
      <CodeCollapsible :code="`<UCheckbox
  :model-value=&quot;selected.length ? (selected.length === 3 ? true : 'indeterminate') : false&quot;
  label=&quot;Select all&quot;
/>
<UCheckboxGroup
  v-model=&quot;selected&quot;
  :items=&quot;['Apple', 'Banana', 'Blueberry']&quot;
  class=&quot;ms-6&quot;
/>`">
        <div class="demo-col">
          <UCheckbox
            :model-value="selectedFruits.length ? (selectedFruits.length === fruits.length ? true : 'indeterminate' as const) : false"
            @update:model-value="(val: any) => { if (val === true) selectedFruits = [...fruits]; else selectedFruits = []; }"
            label="Select all"
          />
          <UCheckboxGroup v-model="selectedFruits" :items="fruits" class="ms-6" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Objects</h3>
      <CodeCollapsible :code="`<UCheckboxGroup
  v-model=&quot;value&quot;
  :items=&quot;[{ label: 'System', description: 'Follow the system preference.', value: 'system' }, ...]&quot;
/>`">
        <div class="demo-col">
          <UCheckboxGroup v-model="objectValue" :items="objectItems" />
          <p v-if="objectValue.length" class="mizu-select-value">Selected: {{ objectValue.join(", ") }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Legend</h3>
      <CodeCollapsible :code="`<UCheckboxGroup legend=&quot;Theme&quot; :default-value=&quot;['System']&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <UCheckboxGroup legend="Theme" :default-value="['System']" :items="items" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Required with Helper Text</h3>
      <CodeCollapsible :code="`<UFormField help=&quot;Select how you want to be notified.&quot; class=&quot;w-full&quot;>
  <UCheckboxGroup required legend=&quot;Channels&quot; :default-value=&quot;['Email']&quot; :items=&quot;['Email', 'SMS', 'Push']&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField help="Select how you want to be notified." class="w-full">
            <UCheckboxGroup required legend="Channels" :default-value="['Email']" :items="['Email', 'SMS', 'Push']" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <CodeCollapsible :code="`<UCheckboxGroup color=&quot;primary&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />
<UCheckboxGroup color=&quot;neutral&quot; :default-value=&quot;['System']&quot; :items=&quot;items&quot; />`">
        <div class="demo-col">
          <UCheckboxGroup color="primary" :default-value="['System']" :items="items" />
          <UCheckboxGroup color="neutral" :default-value="['System']" :items="items" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Horizontal Orientation</h3>
      <CodeCollapsible :code="`<UCheckboxGroup orientation=&quot;horizontal&quot; :default-value=&quot;['Backlog']&quot; :items=&quot;['Backlog', 'Todo', 'In Progress', 'Done']&quot; />`">
        <div class="demo-col">
          <UCheckboxGroup orientation="horizontal" v-model="horizontalValue" :items="horizontalItems" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Card Variant</h3>
      <CodeCollapsible :code="`<UCheckboxGroup color=&quot;primary&quot; variant=&quot;card&quot; :default-value=&quot;['System']&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <UCheckboxGroup color="primary" variant="card" :default-value="['System']" :items="items" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indicator End</h3>
      <CodeCollapsible :code="`<UCheckboxGroup indicator=&quot;end&quot; variant=&quot;card&quot; :default-value=&quot;['System']&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <UCheckboxGroup indicator="end" variant="card" :default-value="['System']" :items="items" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<UCheckboxGroup disabled :default-value=&quot;['System']&quot; :items=&quot;['System', 'Light', 'Dark']&quot; />`">
        <div class="demo-col">
          <UCheckboxGroup disabled :default-value="['System']" :items="items" />
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
  width: 100%;
  gap: 12px;
}
.mizu-select-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
