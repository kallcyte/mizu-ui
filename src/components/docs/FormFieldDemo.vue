<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const email = ref("");
const emailError = ref("");
const username = ref("");
const bio = ref("");
const horizontalName = ref("");

function validateEmail(val: string) {
  if (val && !val.includes("@")) {
    emailError.value = "Please enter a valid email address.";
  } else {
    emailError.value = "";
  }
}
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Wraps a form control with an accessible label using the <code>label</code> prop for structured form field display.</p>
      <CodeCollapsible :code="`<UFormField label=&quot;Email&quot;>
  <UInput placeholder=&quot;Enter your email&quot; class=&quot;w-full&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Email">
            <UInput v-model="email" placeholder="Enter your email" class="w-full" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Description &amp; Required</h3>
      <p class="demo-description">Adds a <code>description</code> below the label and a <code>required</code> indicator for mandatory form fields.</p>
      <CodeCollapsible :code="`<UFormField label=&quot;Username&quot; description=&quot;Pick a unique name.&quot; required>
  <UInput placeholder=&quot;Enter username&quot; class=&quot;w-full&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Username" description="Pick a unique name visible to others." required>
            <UInput v-model="username" placeholder="Enter username" class="w-full" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Error State</h3>
      <p class="demo-description">Displays an error message via the <code>:error</code> prop for inline validation feedback on user input.</p>
      <CodeCollapsible :code="`<UFormField label=&quot;Email&quot; :error=&quot;error&quot;>
  <UInput placeholder=&quot;Enter your email&quot; class=&quot;w-full&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField
            label="Email"
            :error="emailError || undefined"
          >
            <UInput
              placeholder="Enter your email"
              class="w-full"
              @update:model-value="(val: string) => validateEmail(val)"
            />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Help &amp; Hint</h3>
      <p class="demo-description">Combines the <code>help</code> prop for detailed guidance text and the <code>hint</code> prop for supplementary label annotations like "Optional".</p>
      <CodeCollapsible :code="`<UFormField label=&quot;Bio&quot; hint=&quot;Optional&quot; help=&quot;Tell us a bit about yourself.&quot; size=&quot;lg&quot;>
  <UTextarea placeholder=&quot;Tell us about yourself&quot; class=&quot;w-full&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Bio" hint="Optional" help="Tell us a bit about yourself." size="lg">
            <UTextarea v-model="bio" placeholder="Tell us about yourself" class="w-full" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Horizontal Orientation</h3>
      <p class="demo-description">Uses <code>orientation="horizontal"</code> to place the label and input side-by-side instead of the default stacked layout.</p>
      <CodeCollapsible :code="`<UFormField label=&quot;Name&quot; orientation=&quot;horizontal&quot; class=&quot;w-full&quot;>
  <UInput placeholder=&quot;Your name&quot; class=&quot;w-full&quot; />
</UFormField>`">
        <div class="demo-col demo-col-wide">
          <UFormField label="Name" orientation="horizontal" class="w-full">
            <UInput v-model="horizontalName" placeholder="Your name" class="w-full" />
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
  max-width: 320px;
}
.demo-col-wide {
  max-width: 100%;
}
</style>
