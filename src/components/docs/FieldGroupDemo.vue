<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const countries = [
  { code: "+1", label: "+1" },
  { code: "+44", label: "+44" },
  { code: "+81", label: "+81" },
];

const tokenValue = ref("");
const tokenCopied = ref(false);

async function copyToken() {
  try {
    await navigator.clipboard.writeText(tokenValue.value);
    tokenCopied.value = true;
    setTimeout(() => { tokenCopied.value = false; }, 2000);
  } catch { /* clipboard unavailable */ }
}

const phoneCode = ref("");
const phoneNumber = ref("");

const dropdownItems = [
  [{ label: "Edit", icon: "i-ph-pencil" }],
  [{ label: "Duplicate", icon: "i-ph-copy" }],
  [{ label: "Delete", icon: "i-ph-trash", color: "error" as const }],
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Groups adjacent elements like buttons or inputs with seamless borders, removing the outer radii between them.</p>
      <CodeCollapsible
        :code="`<UFieldGroup>
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; label=&quot;Button&quot; />
  <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; icon=&quot;i-ph-caret-down&quot; />
</UFieldGroup>`"
      >
        <div class="demo-col">
          <UFieldGroup>
            <UButton color="neutral" variant="subtle" label="Button" />
            <UButton color="neutral" variant="outline" icon="i-ph-caret-down" />
          </UFieldGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With input</h3>
      <p class="demo-description">Combine an input with a trailing button to create a cohesive input-action unit like a token copy field.</p>
      <CodeCollapsible
        :code="`<UFieldGroup>
  <UInput v-model=&quot;token&quot; class=&quot;flex-1&quot; placeholder=&quot;Enter token&quot; />
  <UButton
    :icon=&quot;copied ? 'i-ph-check' : 'i-ph-clipboard'&quot;
    color=&quot;neutral&quot;
    variant=&quot;subtle&quot;
    @click=&quot;copyToken&quot;
  />
</UFieldGroup>
<p v-if=&quot;copied&quot; class=&quot;text-xs text-green-600&quot;>
  \u2713 Text copied!
</p>`"
      >
        <div class="demo-col">
          <UFieldGroup>
            <UInput v-model="tokenValue" class="flex-1" placeholder="Enter token" />
            <UButton
              :icon="tokenCopied ? 'i-ph-check' : 'i-ph-clipboard'"
              color="neutral"
              variant="subtle"
              @click="copyToken"
            />
          </UFieldGroup>
          <p v-if="tokenCopied" class="text-xs" style="color: var(--color-feedback-success-base)">
            &#x2713; Text copied!
          </p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Supports <code>sm</code>, <code>md</code>, and <code>lg</code> sizes via the <code>size</code> prop to match the height of nested components.</p>
      <CodeCollapsible
        :code="`<UFieldGroup size=&quot;sm&quot;>
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; label=&quot;SM&quot; />
  <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; icon=&quot;i-ph-caret-down&quot; />
</UFieldGroup>

<UFieldGroup size=&quot;md&quot;>
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; label=&quot;MD&quot; />
  <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; icon=&quot;i-ph-caret-down&quot; />
</UFieldGroup>

<UFieldGroup size=&quot;lg&quot;>
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; label=&quot;LG&quot; />
  <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; icon=&quot;i-ph-caret-down&quot; />
</UFieldGroup>`"
      >
        <div class="demo-col">
          <UFieldGroup size="sm">
            <UButton color="neutral" variant="subtle" label="SM" />
            <UButton color="neutral" variant="outline" icon="i-ph-caret-down" />
          </UFieldGroup>
          <UFieldGroup size="md">
            <UButton color="neutral" variant="subtle" label="MD" />
            <UButton color="neutral" variant="outline" icon="i-ph-caret-down" />
          </UFieldGroup>
          <UFieldGroup size="lg">
            <UButton color="neutral" variant="subtle" label="LG" />
            <UButton color="neutral" variant="outline" icon="i-ph-caret-down" />
          </UFieldGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Vertical orientation</h3>
      <p class="demo-description">Use <code>orientation="vertical"</code> to stack elements vertically instead of the default horizontal layout.</p>
      <CodeCollapsible
        :code="`<UFieldGroup orientation=&quot;vertical&quot;>
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; label=&quot;Submit&quot; />
  <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; label=&quot;Cancel&quot; />
</UFieldGroup>`"
      >
        <div class="demo-col">
          <UFieldGroup orientation="vertical">
            <UButton color="neutral" variant="subtle" label="Submit" />
            <UButton color="neutral" variant="outline" label="Cancel" />
          </UFieldGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Input group (name fields)</h3>
      <p class="demo-description">Group multiple inputs together, such as first and last name fields, for a unified visual appearance.</p>
      <CodeCollapsible
        :code="`<UFieldGroup>
  <UInput class=&quot;flex-1&quot; placeholder=&quot;First name&quot; />
  <UInput class=&quot;flex-1&quot; placeholder=&quot;Last name&quot; />
</UFieldGroup>`"
      >
        <div class="demo-col">
          <UFieldGroup>
            <UInput class="flex-1" placeholder="First name" />
            <UInput class="flex-1" placeholder="Last name" />
          </UFieldGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Phone number input</h3>
      <p class="demo-description">Pair a <code>USelectMenu</code> for country code selection with a phone number input in a single grouped control.</p>
      <CodeCollapsible
        :code="`<UFieldGroup>
  <USelectMenu
    :items=&quot;countries&quot;
    value-key=&quot;code&quot;
    placeholder=&quot;+1&quot;
    size=&quot;md&quot;
  />
  <UInput class=&quot;flex-1&quot; placeholder=&quot;Phone number&quot; />
</UFieldGroup>`"
      >
        <div class="demo-col">
          <UFieldGroup>
            <USelectMenu
              v-model="phoneCode"
              :items="countries"
              value-key="code"
              placeholder="+1"
              size="md"
            />
            <UInput v-model="phoneNumber" class="flex-1" placeholder="Phone number" />
          </UFieldGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With dropdown menu</h3>
      <p class="demo-description">Attach a dropdown menu trigger to a button for contextual actions like edit, duplicate, or delete.</p>
      <CodeCollapsible
        :code="`<UFieldGroup>
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; label=&quot;Actions&quot; />
  <UDropdownMenu :items=&quot;[
    [{ label: 'Edit', icon: 'i-ph-pencil' }],
    [{ label: 'Duplicate', icon: 'i-ph-copy' }],
    [{ label: 'Delete', icon: 'i-ph-trash', color: 'error' }]
  ]&quot;>
    <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; icon=&quot;i-ph-caret-down&quot; />
  </UDropdownMenu>
</UFieldGroup>`"
      >
        <div class="demo-col">
          <UFieldGroup>
            <UButton color="neutral" variant="subtle" label="Actions" />
            <UDropdownMenu :items="dropdownItems">
              <UButton color="neutral" variant="outline" icon="i-ph-caret-down" />
            </UDropdownMenu>
          </UFieldGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With badge</h3>
      <p class="demo-description">Combine a button with a <code>UBadge</code> to show counts or status indicators inline within the group.</p>
      <CodeCollapsible
        :code="`<UFieldGroup>
  <UButton color=&quot;error&quot; variant=&quot;outline&quot; label=&quot;Notifications&quot; />
  <UBadge color=&quot;error&quot;>99+</UBadge>
</UFieldGroup>`"
      >
        <div class="demo-col">
          <UFieldGroup>
            <UButton color="error" variant="outline" label="Error" />
            <UBadge color="error" variant="solid">99+</UBadge>
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
  max-width: 320px;
}
</style>
