<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const value = ref("");
const objectValue = ref("");
const countryValue = ref("");
const requiredValue = ref("");
const requiredError = ref("");
const requiredTouched = ref(false);
const multipleValue = ref([]);
const searchableValue = ref("");

const items = ["Backlog", "Todo", "In Progress", "Done"];
const countries = ["United States", "Canada", "United Kingdom", "Australia"];
const objectItems = [
  { label: "Backlog", value: "backlog" },
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];

function validateRequired() {
  requiredTouched.value = true;
  requiredError.value = requiredValue.value ? "" : "Role is required";
}
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Usage</h3>
      <CodeCollapsible :code="`<script setup lang=&quot;ts&quot;>
const items = ['Backlog', 'Todo', 'In Progress', 'Done']
const value = ref('Backlog')
<\/script>

<template>
  <USelect v-model=&quot;value&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />
</template>`">
        <div class="demo-col">
          <USelect v-model="value" :items="items" class="w-full" placeholder="Select a status..." />
          <p v-if="value" class="mizu-value">Selected: {{ value }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Items (objects)</h3>
      <CodeCollapsible :code="`<script setup lang=&quot;ts&quot;>
import type { SelectItem } from '@nuxt/ui'
const items: SelectItem[] = [
  { label: 'Backlog', value: 'backlog' },
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
]
<\/script>

<template>
  <USelect v-model=&quot;value&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />
</template>`">
        <div class="demo-col">
          <USelect v-model="objectValue" :items="objectItems" class="w-full" placeholder="Select a status..." />
          <p v-if="objectValue" class="mizu-value">Value: {{ objectValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Placeholder</h3>
      <CodeCollapsible code="<USelect :items=&quot;['Option 1', 'Option 2']&quot; class=&quot;w-full&quot; placeholder=&quot;Choose an option...&quot; />">
        <div class="demo-col">
          <USelect :items="['Option 1', 'Option 2']" class="w-full" placeholder="Choose an option..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <CodeCollapsible :code="`<USelect color=&quot;primary&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Primary&quot; />
<USelect color=&quot;success&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Success&quot; />
<USelect color=&quot;error&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Error&quot; />
<USelect color=&quot;neutral&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Neutral&quot; />`">
        <div class="demo-col">
          <USelect color="primary" :items="items" class="w-full" placeholder="Primary" />
          <USelect color="success" :items="items" class="w-full" placeholder="Success" />
          <USelect color="error" :items="items" class="w-full" placeholder="Error" />
          <USelect color="neutral" :items="items" class="w-full" placeholder="Neutral" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variant</h3>
      <CodeCollapsible :code="`<USelect variant=&quot;outline&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Outline&quot; />
<USelect variant=&quot;soft&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Soft&quot; />
<USelect variant=&quot;subtle&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Subtle&quot; />
<USelect variant=&quot;ghost&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Ghost&quot; />
<USelect variant=&quot;none&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;None&quot; />`">
        <div class="demo-col">
          <USelect variant="outline" :items="items" class="w-full" placeholder="Outline" />
          <USelect variant="soft" :items="items" class="w-full" placeholder="Soft" />
          <USelect variant="subtle" :items="items" class="w-full" placeholder="Subtle" />
          <USelect variant="ghost" :items="items" class="w-full" placeholder="Ghost" />
          <USelect variant="none" :items="items" class="w-full" placeholder="None" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Size</h3>
      <CodeCollapsible :code="`<USelect size=&quot;sm&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;SM&quot; />
<USelect size=&quot;md&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;MD&quot; />
<USelect size=&quot;lg&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;LG&quot; />`">
        <div class="demo-col">
          <USelect size="sm" :items="items" class="w-full" placeholder="SM" />
          <USelect size="md" :items="items" class="w-full" placeholder="MD" />
          <USelect size="lg" :items="items" class="w-full" placeholder="LG" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <CodeCollapsible :code="`<USelect icon=&quot;i-ph-magnifying-glass&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Search...&quot; />
<USelect icon=&quot;i-ph-envelope&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Email&quot; trailing-icon=&quot;i-ph-check&quot; />`">
        <div class="demo-col">
          <USelect icon="i-ph-magnifying-glass" :items="items" class="w-full" placeholder="Search..." />
          <USelect icon="i-ph-envelope" :items="items" class="w-full" placeholder="Email" trailing-icon="i-ph-check" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Avatar</h3>
      <CodeCollapsible :code="`<USelect :avatar=&quot;{ src: 'https://github.com/nuxt.png', size: '2xs' }&quot; class=&quot;w-full&quot; placeholder=&quot;User&quot; />`">
        <div class="demo-col">
          <USelect :avatar="{ src: 'https://github.com/nuxt.png', size: '2xs' }" class="w-full" placeholder="User" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <CodeCollapsible :code="`<USelect loading :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Loading...&quot; />`">
        <div class="demo-col">
          <USelect loading :items="items" class="w-full" placeholder="Loading..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Checkmarked</h3>
      <CodeCollapsible :code="`<USelect checkmarked :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Select a status...&quot; />`">
        <div class="demo-col">
          <USelect checkmarked :items="items" class="w-full" placeholder="Select a status..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple</h3>
      <CodeCollapsible :code="`<script setup lang=&quot;ts&quot;>
const items = ['Backlog', 'Todo', 'In Progress', 'Done']
const value = ref([])
<\/script>

<template>
  <USelect v-model=&quot;value&quot; :items=&quot;items&quot; class=&quot;w-full&quot; multiple placeholder=&quot;Select statuses...&quot; />
</template>`">
        <div class="demo-col">
          <USelect v-model="multipleValue" :items="items" class="w-full" multiple placeholder="Select statuses..." />
          <p v-if="multipleValue.length" class="mizu-value">Selected: {{ multipleValue.join(", ") }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Searchable</h3>
      <CodeCollapsible :code="`<USelectMenu v-model=&quot;value&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Search...&quot; />`">
        <div class="demo-col">
          <USelectMenu v-model="searchableValue" :items="countries" class="w-full" placeholder="Search a country..." />
          <p v-if="searchableValue" class="mizu-value">Selected: {{ searchableValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible code="<USelect disabled :items=&quot;['Option']&quot; class=&quot;w-full&quot; placeholder=&quot;Disabled&quot; />">
        <div class="demo-col">
          <USelect disabled :items="['Option']" class="w-full" placeholder="Disabled" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With label and help</h3>
      <CodeCollapsible :code="`<UFormField label=&quot;Country&quot; help=&quot;Select your country of residence&quot;>
  <USelect class=&quot;w-full&quot; :items=&quot;countries&quot; placeholder=&quot;Choose a country&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Country" help="Select your country of residence">
            <USelect v-model="countryValue" class="w-full" :items="countries" placeholder="Choose a country" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Required field</h3>
      <CodeCollapsible :code="`<UFormField :error=&quot;error || undefined&quot; :help=&quot;touched && !error ? 'Looks good!' : undefined&quot;>
  <template #label>
    Role <span class=&quot;text-red-500&quot;>*</span>
  </template>
  <USelect
    v-model=&quot;value&quot;
    class=&quot;w-full&quot;
    :items=&quot;['Admin', 'Editor', 'Viewer']&quot;
    placeholder=&quot;Select a role&quot;
    @blur=&quot;validate&quot;
    @update:model-value=&quot;error = ''&quot;
  />
</UFormField>`">
        <div class="demo-col">
          <UFormField :error="requiredError || undefined" :help="requiredTouched && !requiredError ? 'Looks good!' : undefined">
            <template #label>
              Role <span class="text-red-500">*</span>
            </template>
            <USelect
              v-model="requiredValue"
              class="w-full"
              :items="['Admin', 'Editor', 'Viewer']"
              placeholder="Select a role"
              @blur="validateRequired"
              @update:model-value="requiredError = ''"
            />
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
  width: 100%;
  gap: 8px;
  max-width: 360px;
}
.mizu-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
