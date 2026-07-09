<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const desc = ref("");
const bioValue = ref("");
const feedbackValue = ref("");
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="`<UTextarea size=&quot;sm&quot; placeholder=&quot;Small&quot; />
<UTextarea size=&quot;md&quot; placeholder=&quot;Medium&quot; />
<UTextarea size=&quot;lg&quot; placeholder=&quot;Large&quot; />`">
        <div class="demo-col">
          <UTextarea size="sm" placeholder="Small" />
          <UTextarea size="md" placeholder="Medium" />
          <UTextarea size="lg" placeholder="Large" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Value</h3>
      <CodeCollapsible :code="`<UTextarea v-model=&quot;value&quot; placeholder=&quot;Write something...&quot; />`">
        <div class="demo-col">
          <UTextarea v-model="desc" placeholder="Write something..." />
          <p v-if="desc" class="mizu-textarea-value">Value: {{ desc }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<UTextarea disabled placeholder=&quot;Disabled textarea&quot; />`">
        <div class="demo-col">
          <UTextarea disabled placeholder="Disabled textarea" />
        </div>
      </CodeCollapsible>
    </section>
    <section class="example-section">
      <h3>With label and help text</h3>
      <CodeCollapsible :code="`<UFormField label=&quot;Bio&quot; helper=&quot;Tell us about yourself&quot;>
  <UTextarea placeholder=&quot;Write a short bio...&quot; rows=&quot;3&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Bio" help="Tell us about yourself" class="w-full">
            <UTextarea v-model="bioValue" placeholder="Write a short bio..." rows="3" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Required field</h3>
      <CodeCollapsible :code="`<UFormField class=&quot;w-full&quot;>
  <template #label>
    Feedback <span class=&quot;text-red-500&quot;>*</span>
  </template>
  <UTextarea placeholder=&quot;Your feedback helps us improve&quot; rows=&quot;3&quot; required />
</UFormField>`">
        <div class="demo-col">
          <UFormField class="w-full">
            <template #label>
              Feedback <span class="text-red-500">*</span>
            </template>
            <UTextarea v-model="feedbackValue" placeholder="Your feedback helps us improve" rows="3" required />
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
  width: max-content;
  gap: 8px;
  max-width: 400px;
}

.mizu-textarea-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
