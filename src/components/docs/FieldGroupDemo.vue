<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const countries = [
  { code: "+1", label: "+1" },
  { code: "+44", label: "+44" },
  { code: "+81", label: "+81" },
];

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
      <CodeCollapsible :code="`<UFieldGroup>
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; label=&quot;Button&quot; />
  <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; icon=&quot;i-ph-caret-down&quot; />
</UFieldGroup>`">
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
      <CodeCollapsible :code="`<UFieldGroup>
  <UInput placeholder=&quot;Enter token&quot; />
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; icon=&quot;i-ph-clipboard&quot; />
</UFieldGroup>`">
        <div class="demo-col">
          <UFieldGroup>
            <UInput placeholder="Enter token" />
            <UButton color="neutral" variant="subtle" icon="i-ph-clipboard" />
          </UFieldGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="`<UFieldGroup size=&quot;sm&quot;>
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
</UFieldGroup>`">
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
      <CodeCollapsible :code="`<UFieldGroup orientation=&quot;vertical&quot;>
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; label=&quot;Submit&quot; />
  <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; label=&quot;Cancel&quot; />
</UFieldGroup>`">
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
      <CodeCollapsible :code="`<UFieldGroup>
  <UInput placeholder=&quot;First name&quot; />
  <UInput placeholder=&quot;Last name&quot; />
</UFieldGroup>`">
        <div class="demo-col">
          <UFieldGroup>
            <UInput placeholder="First name" />
            <UInput placeholder="Last name" />
          </UFieldGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Phone number input</h3>
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
              v-model="phoneCode"
              :items="countries"
              value-key="code"
              placeholder="+1"
              size="md"
            />
            <UInput v-model="phoneNumber" placeholder="Phone number" />
          </UFieldGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With dropdown menu</h3>
      <CodeCollapsible :code="`<UFieldGroup>
  <UButton color=&quot;neutral&quot; variant=&quot;subtle&quot; label=&quot;Actions&quot; />
  <UDropdownMenu :items=&quot;[
    { label: 'Edit', icon: 'i-ph-pencil' },
    { label: 'Duplicate', icon: 'i-ph-copy' },
    { type: 'separator' },
    { label: 'Delete', icon: 'i-ph-trash', color: 'error' }
  ]&quot;>
    <UButton color=&quot;neutral&quot; variant=&quot;outline&quot; icon=&quot;i-ph-caret-down&quot; />
  </UDropdownMenu>
</UFieldGroup>`">
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
  max-width: 320px;
}
</style>
