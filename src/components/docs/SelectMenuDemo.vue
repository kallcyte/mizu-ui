<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const singleValue = ref("");
const objectValue = ref<{ label: string; code: string } | null>(null);
const countryValue = ref("");
const multiValue = ref<string[]>([]);
const searchValue = ref("");
const creatableValue = ref("");
const requiredValue = ref("");
const requiredError = ref("");
const requiredTouched = ref(false);

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

function validateRequired() {
  requiredTouched.value = true;
  requiredError.value = requiredValue.value ? "" : "Role is required";
}
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Usage</h3>
      <p class="demo-description">Basic select menu with v-model and an array of string items. Click to open a dropdown menu for selection.</p>
      <CodeCollapsible :code="`<script setup lang=&quot;ts&quot;>
const items = ['Backlog', 'Todo', 'In Progress', 'Done']
const value = ref('Backlog')
<\/script>

<template>
  <USelectMenu v-model=&quot;value&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />
</template>`">
        <div class="demo-col">
          <USelectMenu class="w-full" v-model="singleValue" :items="items" placeholder="Select status" />
          <p v-if="singleValue" class="mizu-value">Selected: {{ singleValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Items (objects)</h3>
      <p class="demo-description">Use object items with a custom <code>value-key</code> prop to specify which property holds the unique identifier.</p>
      <CodeCollapsible :code="`<script setup lang=&quot;ts&quot;>
const items = [
  { label: 'United States', code: 'US' },
  { label: 'Canada', code: 'CA' },
]
<\/script>

<template>
  <USelectMenu v-model=&quot;value&quot; value-key=&quot;code&quot; :items=&quot;items&quot; class=&quot;w-full&quot; placeholder=&quot;Select country&quot; />
</template>`">
        <div class="demo-col">
          <USelectMenu class="w-full"
            v-model="countryValue"
            value-key="code"
            :items="objectItems"
            placeholder="Select country"
          />
          <p v-if="countryValue" class="mizu-value">Code: {{ countryValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Placeholder</h3>
      <p class="demo-description">The <code>placeholder</code> prop shows provisional text when no value is selected.</p>
      <CodeCollapsible code="<USelectMenu class=&quot;w-full&quot; :items=&quot;['Option 1', 'Option 2']&quot; placeholder=&quot;Choose an option...&quot; />">
        <div class="demo-col">
          <USelectMenu class="w-full" :items="['Option 1', 'Option 2']" placeholder="Choose an option..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Semantic color variants: primary, success, error, and neutral for visual differentiation.</p>
      <CodeCollapsible :code="`<USelectMenu class=&quot;w-full&quot; color=&quot;primary&quot; :items=&quot;items&quot; placeholder=&quot;Primary&quot; />
<USelectMenu class=&quot;w-full&quot; color=&quot;success&quot; :items=&quot;items&quot; placeholder=&quot;Success&quot; />
<USelectMenu class=&quot;w-full&quot; color=&quot;error&quot; :items=&quot;items&quot; placeholder=&quot;Error&quot; />
<USelectMenu class=&quot;w-full&quot; color=&quot;neutral&quot; :items=&quot;items&quot; placeholder=&quot;Neutral&quot; />`">
        <div class="demo-col">
          <USelectMenu class="w-full" color="primary" :items="items" placeholder="Primary" />
          <USelectMenu class="w-full" color="success" :items="items" placeholder="Success" />
          <USelectMenu class="w-full" color="error" :items="items" placeholder="Error" />
          <USelectMenu class="w-full" color="neutral" :items="items" placeholder="Neutral" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variant</h3>
      <p class="demo-description">Style variants via the <code>variant</code> prop: outline, soft, subtle, ghost, and none for different visual weights.</p>
      <CodeCollapsible :code="`<USelectMenu class=&quot;w-full&quot; variant=&quot;outline&quot; :items=&quot;items&quot; placeholder=&quot;Outline&quot; />
<USelectMenu class=&quot;w-full&quot; variant=&quot;soft&quot; :items=&quot;items&quot; placeholder=&quot;Soft&quot; />
<USelectMenu class=&quot;w-full&quot; variant=&quot;subtle&quot; :items=&quot;items&quot; placeholder=&quot;Subtle&quot; />
<USelectMenu class=&quot;w-full&quot; variant=&quot;ghost&quot; :items=&quot;items&quot; placeholder=&quot;Ghost&quot; />
<USelectMenu class=&quot;w-full&quot; variant=&quot;none&quot; :items=&quot;items&quot; placeholder=&quot;None&quot; />`">
        <div class="demo-col">
          <USelectMenu class="w-full" variant="outline" :items="items" placeholder="Outline" />
          <USelectMenu class="w-full" variant="soft" :items="items" placeholder="Soft" />
          <USelectMenu class="w-full" variant="subtle" :items="items" placeholder="Subtle" />
          <USelectMenu class="w-full" variant="ghost" :items="items" placeholder="Ghost" />
          <USelectMenu class="w-full" variant="none" :items="items" placeholder="None" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Size</h3>
      <p class="demo-description">Three sizes: sm for compact UIs, md as default, and lg for prominent inputs.</p>
      <CodeCollapsible :code="`<USelectMenu class=&quot;w-full&quot; size=&quot;sm&quot; :items=&quot;items&quot; placeholder=&quot;SM&quot; />
<USelectMenu class=&quot;w-full&quot; size=&quot;md&quot; :items=&quot;items&quot; placeholder=&quot;MD&quot; />
<USelectMenu class=&quot;w-full&quot; size=&quot;lg&quot; :items=&quot;items&quot; placeholder=&quot;LG&quot; />`">
        <div class="demo-col">
          <USelectMenu class="w-full" size="sm" :items="items" placeholder="SM" />
          <USelectMenu class="w-full" size="md" :items="items" placeholder="MD" />
          <USelectMenu class="w-full" size="lg" :items="items" placeholder="LG" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <p class="demo-description">Leading and trailing icons via the <code>icon</code> and <code>trailing-icon</code> props for visual cues on the trigger button.</p>
      <CodeCollapsible :code="`<USelectMenu class=&quot;w-full&quot; icon=&quot;i-ph-magnifying-glass&quot; :items=&quot;items&quot; placeholder=&quot;Search...&quot; />
<USelectMenu class=&quot;w-full&quot; icon=&quot;i-ph-envelope&quot; :items=&quot;items&quot; placeholder=&quot;Email&quot; trailing-icon=&quot;i-ph-check&quot; />`">
        <div class="demo-col">
          <USelectMenu class="w-full" icon="i-ph-magnifying-glass" :items="items" placeholder="Search..." />
          <USelectMenu class="w-full" icon="i-ph-envelope" :items="items" placeholder="Email" trailing-icon="i-ph-check" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Avatar</h3>
      <p class="demo-description">Display an avatar on the trigger button using the <code>avatar</code> prop with a <code>src</code> and <code>size</code>.</p>
      <CodeCollapsible :code="`<USelectMenu class=&quot;w-full&quot; :avatar=&quot;{ src: 'https://github.com/nuxt.png', size: '2xs' }&quot; placeholder=&quot;User&quot; />`">
        <div class="demo-col">
          <USelectMenu class="w-full" :avatar="{ src: 'https://github.com/nuxt.png', size: '2xs' }" placeholder="User" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <p class="demo-description">A loading state via the <code>loading</code> prop that shows a spinner while options are being fetched.</p>
      <CodeCollapsible :code="`<USelectMenu class=&quot;w-full&quot; loading :items=&quot;items&quot; placeholder=&quot;Loading...&quot; />`">
        <div class="demo-col">
          <USelectMenu class="w-full" loading :items="items" placeholder="Loading..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Checkmarked</h3>
      <p class="demo-description">Use the <code>checkmarked</code> prop to show a checkmark next to the selected item in the dropdown.</p>
      <CodeCollapsible :code="`<USelectMenu class=&quot;w-full&quot; checkmarked :items=&quot;items&quot; placeholder=&quot;Select a status...&quot; />`">
        <div class="demo-col">
          <USelectMenu class="w-full" checkmarked :items="items" placeholder="Select a status..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Clearable</h3>
      <p class="demo-description">The <code>clear</code> prop adds a clear button to reset the selected value back to empty.</p>
      <CodeCollapsible :code="`<USelectMenu class=&quot;w-full&quot; clear v-model=&quot;value&quot; :items=&quot;items&quot; placeholder=&quot;Select...&quot; />`">
        <div class="demo-col">
          <USelectMenu class="w-full" clear v-model="singleValue" :items="items" placeholder="Select..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple</h3>
      <p class="demo-description">Multi-select mode using the <code>multiple</code> prop, allowing selection of several values at once.</p>
      <CodeCollapsible :code="`<script setup lang=&quot;ts&quot;>
const items = ['Backlog', 'Todo', 'In Progress', 'Done']
const value = ref([])
<\/script>

<template>
  <USelectMenu v-model=&quot;value&quot; :items=&quot;items&quot; class=&quot;w-full&quot; multiple placeholder=&quot;Select statuses&quot; />
</template>`">
        <div class="demo-col">
          <USelectMenu class="w-full" v-model="multiValue" :items="items" multiple placeholder="Select statuses" />
          <p v-if="multiValue.length" class="mizu-value">Selected: {{ multiValue.join(", ") }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Creatable</h3>
      <p class="demo-description">Allow users to create new items on the fly using the <code>create-item</code> prop with an <code>@create</code> event handler.</p>
      <CodeCollapsible :code="`<USelectMenu class=&quot;w-full&quot; v-model=&quot;value&quot; :items=&quot;items&quot; create-item placeholder=&quot;Type to create...&quot; @create=&quot;console.log(item)&quot; />`">
        <div class="demo-col">
          <USelectMenu class="w-full" v-model="creatableValue" :items="['Apple', 'Banana', 'Orange']" create-item placeholder="Type to create..." />
          <p v-if="creatableValue" class="mizu-value">Value: {{ creatableValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">A disabled select menu via the <code>disabled</code> prop, preventing user interaction.</p>
      <CodeCollapsible code="<USelectMenu class=&quot;w-full&quot; disabled placeholder=&quot;Disabled&quot; :items=&quot;['Option 1']&quot; />">
        <div class="demo-col">
          <USelectMenu class="w-full" disabled placeholder="Disabled" :items="['Option 1']" />
        </div>
      </CodeCollapsible>
    </section>


    <section class="example-section">
      <h3>Required field</h3>
      <p class="demo-description">Form validation with required indicator, error state, and blur validation using <code>UFormField</code>.</p>
      <CodeCollapsible :code="`<UFormField class=&quot;w-full&quot; :error=&quot;error || undefined&quot; :help=&quot;touched && !error ? 'Looks good!' : undefined&quot;>
  <template #label>
    Role <span class=&quot;text-red-500&quot;>*</span>
  </template>
  <USelectMenu
    class=&quot;w-full&quot;
    v-model=&quot;value&quot;
    :items=&quot;['Admin', 'Editor', 'Viewer']&quot;
    placeholder=&quot;Select a role&quot;
    @blur=&quot;validate&quot;
    @update:model-value=&quot;error = ''&quot;
  />
</UFormField>`">
        <div class="demo-col">
          <UFormField class="w-full" :error="requiredError || undefined" :help="requiredTouched && !requiredError ? 'Looks good!' : undefined">
            <template #label>
              Role <span class="text-red-500">*</span>
            </template>
            <USelectMenu
              class="w-full"
              v-model="requiredValue"
              :items="['Admin', 'Editor', 'Viewer']"
              placeholder="Select a role"
              @blur="validateRequired"
              @update:model-value="requiredError = ''"
            />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With label and help</h3>
      <p class="demo-description">Wrap the select menu in <code>UFormField</code> with <code>label</code> and <code>help</code> props for accessible form layout.</p>
      <CodeCollapsible :code="`<UFormField label=&quot;Country&quot; help=&quot;Select your country of residence&quot;>
  <USelectMenu class=&quot;w-full&quot; :items=&quot;countries&quot; placeholder=&quot;Choose a country&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Country" help="Select your country of residence" class="w-full">
            <USelectMenu class="w-full" :items="objectItems" placeholder="Choose a country" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Within a FieldGroup</h3>
      <p class="demo-description">Combine a select menu and an input inside a <code>UFieldGroup</code> for inline compound fields like phone numbers.</p>
      <CodeCollapsible :code="`<UFieldGroup>
  <USelectMenu
    :items=&quot;countries&quot;
    value-key=&quot;code&quot;
    placeholder=&quot;+1&quot;
    size=&quot;md&quot;
  />
  <UInput placeholder=&quot;Phone number&quot; />
</UFieldGroup>`">
        <div class="demo-col">
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
  max-width: 360px;
}
.mizu-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
