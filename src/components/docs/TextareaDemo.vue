<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const desc = ref("");
const bioValue = ref("");
const feedbackValue = ref("");
const feedbackError = ref("");
const feedbackTouched = ref(false);
const autoresizeValue = ref("This is a long text that will autoresize the height of the Textarea.");
const autoresizeMaxValue = ref("This is a long text that will autoresize the height of the Textarea with a maximum of 4 rows.");

function validateFeedback() {
  feedbackTouched.value = true;
  feedbackError.value = feedbackValue.value.trim() ? "" : "Feedback is required";
}
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Usage</h3>
      <CodeCollapsible :code="`<script setup lang=&quot;ts&quot;>
const value = ref('')
<\/script>

<template>
  <UTextarea class=&quot;w-full&quot; v-model=&quot;value&quot; />
</template>`">
        <div class="demo-col">
          <UTextarea class="w-full" v-model="desc" placeholder="Write something..." />
          <p v-if="desc" class="mizu-value">Value: {{ desc }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Rows</h3>
      <CodeCollapsible code="<UTextarea class=&quot;w-full&quot; :rows=&quot;12&quot; />">
        <div class="demo-col">
          <UTextarea class="w-full" :rows="12" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Placeholder</h3>
      <CodeCollapsible code="<UTextarea class=&quot;w-full&quot; placeholder=&quot;Type something...&quot; />">
        <div class="demo-col">
          <UTextarea class="w-full" placeholder="Type something..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Autoresize</h3>
      <CodeCollapsible :code="`<script setup lang=&quot;ts&quot;>
const value = ref('This is a long text...')
<\/script>

<template>
  <UTextarea class=&quot;w-full&quot; v-model=&quot;value&quot; autoresize />
</template>`">
        <div class="demo-col">
          <UTextarea class="w-full" v-model="autoresizeValue" autoresize />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Max Rows</h3>
      <CodeCollapsible :code="`<UTextarea class=&quot;w-full&quot; v-model=&quot;value&quot; :maxrows=&quot;4&quot; autoresize />`">
        <div class="demo-col">
          <UTextarea class="w-full" v-model="autoresizeMaxValue" :maxrows="4" autoresize />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <CodeCollapsible :code="`<UTextarea class=&quot;w-full&quot; color=&quot;primary&quot; placeholder=&quot;Primary&quot; highlight />
<UTextarea class=&quot;w-full&quot; color=&quot;secondary&quot; placeholder=&quot;Secondary&quot; highlight />
<UTextarea class=&quot;w-full&quot; color=&quot;success&quot; placeholder=&quot;Success&quot; highlight />
<UTextarea class=&quot;w-full&quot; color=&quot;error&quot; placeholder=&quot;Error&quot; highlight />
<UTextarea class=&quot;w-full&quot; color=&quot;warning&quot; placeholder=&quot;Warning&quot; highlight />
<UTextarea class=&quot;w-full&quot; color=&quot;info&quot; placeholder=&quot;Info&quot; highlight />
<UTextarea class=&quot;w-full&quot; color=&quot;neutral&quot; placeholder=&quot;Neutral&quot; highlight />`">
        <div class="demo-col">
          <UTextarea class="w-full" color="primary" placeholder="Primary" highlight />
          <UTextarea class="w-full" color="secondary" placeholder="Secondary" highlight />
          <UTextarea class="w-full" color="success" placeholder="Success" highlight />
          <UTextarea class="w-full" color="error" placeholder="Error" highlight />
          <UTextarea class="w-full" color="warning" placeholder="Warning" highlight />
          <UTextarea class="w-full" color="info" placeholder="Info" highlight />
          <UTextarea class="w-full" color="neutral" placeholder="Neutral" highlight />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variant</h3>
      <CodeCollapsible :code="`<UTextarea class=&quot;w-full&quot; variant=&quot;outline&quot; placeholder=&quot;Outline&quot; />
<UTextarea class=&quot;w-full&quot; variant=&quot;soft&quot; placeholder=&quot;Soft&quot; />
<UTextarea class=&quot;w-full&quot; variant=&quot;subtle&quot; placeholder=&quot;Subtle&quot; />
<UTextarea class=&quot;w-full&quot; variant=&quot;ghost&quot; placeholder=&quot;Ghost&quot; />
<UTextarea class=&quot;w-full&quot; variant=&quot;none&quot; placeholder=&quot;None&quot; />`">
        <div class="demo-col">
          <UTextarea class="w-full" variant="outline" placeholder="Outline" />
          <UTextarea class="w-full" variant="soft" placeholder="Soft" />
          <UTextarea class="w-full" variant="subtle" placeholder="Subtle" />
          <UTextarea class="w-full" variant="ghost" placeholder="Ghost" />
          <UTextarea class="w-full" variant="none" placeholder="None" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Size</h3>
      <CodeCollapsible :code="`<UTextarea class=&quot;w-full&quot; size=&quot;sm&quot; placeholder=&quot;SM&quot; />
<UTextarea class=&quot;w-full&quot; size=&quot;md&quot; placeholder=&quot;MD&quot; />
<UTextarea class=&quot;w-full&quot; size=&quot;lg&quot; placeholder=&quot;LG&quot; />`">
        <div class="demo-col">
          <UTextarea class="w-full" size="sm" placeholder="SM" />
          <UTextarea class="w-full" size="md" placeholder="MD" />
          <UTextarea class="w-full" size="lg" placeholder="LG" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <CodeCollapsible :code="`<UTextarea class=&quot;w-full&quot; icon=&quot;i-ph-magnifying-glass&quot; placeholder=&quot;Search...&quot; />
<UTextarea class=&quot;w-full&quot; icon=&quot;i-ph-envelope&quot; placeholder=&quot;Email&quot; trailing />
<UTextarea class=&quot;w-full&quot; leading-icon=&quot;i-ph-pencil&quot; trailing-icon=&quot;i-ph-check&quot; placeholder=&quot;Notes&quot; />`">
        <div class="demo-col">
          <UTextarea class="w-full" icon="i-ph-magnifying-glass" placeholder="Search..." />
          <UTextarea class="w-full" icon="i-ph-envelope" placeholder="Email" trailing />
          <UTextarea class="w-full" leading-icon="i-ph-pencil" trailing-icon="i-ph-check" placeholder="Notes" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Avatar</h3>
      <CodeCollapsible :code="`<UTextarea class=&quot;w-full&quot; :avatar=&quot;{ src: 'https://github.com/nuxt.png', size: '2xs' }&quot; placeholder=&quot;Username&quot; />`">
        <div class="demo-col">
          <UTextarea class="w-full" :avatar="{ src: 'https://github.com/nuxt.png', size: '2xs' }" placeholder="Username" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <CodeCollapsible :code="`<UTextarea class=&quot;w-full&quot; loading placeholder=&quot;Loading...&quot; />
<UTextarea class=&quot;w-full&quot; loading icon=&quot;i-ph-envelope&quot; placeholder=&quot;Loading...&quot; />`">
        <div class="demo-col">
          <UTextarea class="w-full" loading placeholder="Loading..." />
          <UTextarea class="w-full" loading icon="i-ph-envelope" placeholder="Loading..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading Icon</h3>
      <CodeCollapsible :code="`<UTextarea class=&quot;w-full&quot; loading loading-icon=&quot;i-ph-spinner-gap&quot; placeholder=&quot;Loading...&quot; />
<UTextarea class=&quot;w-full&quot; loading loading-icon=&quot;i-ph-circle-notch&quot; placeholder=&quot;Custom spinner...&quot; />`">
        <div class="demo-col">
          <UTextarea class="w-full" loading loading-icon="i-ph-spinner-gap" placeholder="Loading..." />
          <UTextarea class="w-full" loading loading-icon="i-ph-circle-notch" placeholder="Custom spinner..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible code="<UTextarea class=&quot;w-full&quot; disabled placeholder=&quot;Disabled textarea&quot; />">
        <div class="demo-col">
          <UTextarea class="w-full" disabled placeholder="Disabled textarea" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With label and help</h3>
      <CodeCollapsible :code="`<UFormField label=&quot;Bio&quot; help=&quot;Tell us about yourself&quot;>
  <UTextarea class=&quot;w-full&quot; placeholder=&quot;Write a short bio...&quot; rows=&quot;3&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Bio" help="Tell us about yourself" class="w-full">
            <UTextarea class="w-full" v-model="bioValue" placeholder="Write a short bio..." rows="3" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Required field</h3>
      <CodeCollapsible :code="`<UFormField class=&quot;w-full&quot; :error=&quot;error || undefined&quot; :help=&quot;touched && !error ? 'Looks good!' : undefined&quot;>
  <template #label>
    Feedback <span class=&quot;text-red-500&quot;>*</span>
  </template>
  <UTextarea class=&quot;w-full&quot;
    v-model=&quot;value&quot;
    placeholder=&quot;Your feedback helps us improve&quot;
    rows=&quot;3&quot;
    :highlight=&quot;!!error&quot;
    @blur=&quot;validate&quot;
    @input=&quot;error = ''&quot;
  />
</UFormField>`">
        <div class="demo-col">
          <UFormField class="w-full" :error="feedbackError || undefined" :help="feedbackTouched && !feedbackError ? 'Looks good!' : undefined">
            <template #label>
              Feedback <span class="text-red-500">*</span>
            </template>
            <UTextarea class="w-full"
              v-model="feedbackValue"
              placeholder="Your feedback helps us improve"
              rows="3"
              :highlight="!!feedbackError"
              @blur="validateFeedback"
              @input="feedbackError = ''"
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
  max-width: 400px;
}
.mizu-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
