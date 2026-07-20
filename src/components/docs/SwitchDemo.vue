<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const on = ref(true);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>States</h3>
      <p class="demo-description">
        Demonstrates checked and unchecked states using <code>v-model</code> and
        <code>default-value</code>.
      </p>
      <CodeCollapsible
        :code="`<USwitch v-model=&quot;on&quot; label=&quot;Enable notifications&quot; />
<USwitch label=&quot;Checked&quot; :default-value=&quot;true&quot; />
<USwitch label=&quot;Unchecked&quot; />`"
      >
        <div class="demo-col">
          <USwitch v-model="on" label="Enable notifications" />
          <USwitch label="Checked" :default-value="true" />
          <USwitch label="Unchecked" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Required</h3>
      <p class="demo-description">
        Use the <code>required</code> prop to add an asterisk next to the label.
      </p>
      <CodeCollapsible :code="`<USwitch required label=&quot;Accept terms&quot; />`">
        <div class="demo-col">
          <USwitch required label="Accept terms" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Description</h3>
      <p class="demo-description">
        Use the <code>description</code> prop to add secondary text below the label.
      </p>
      <CodeCollapsible
        :code="`<USwitch label=&quot;Subscribe&quot; description=&quot;Receive product updates and tips.&quot; />`"
      >
        <div class="demo-col">
          <USwitch label="Subscribe" description="Receive product updates and tips." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icons</h3>
      <p class="demo-description">
        Use <code>checked-icon</code> and <code>unchecked-icon</code> to display icons inside the
        thumb.
      </p>
      <CodeCollapsible
        :code="`<USwitch
  checked-icon=&quot;i-lucide-check&quot;
  unchecked-icon=&quot;i-lucide-x&quot;
  default-value
  label=&quot;With icons&quot;
/>`"
      >
        <div class="demo-col">
          <USwitch
            checked-icon="i-lucide-check"
            unchecked-icon="i-lucide-x"
            default-value
            label="With icons"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <p class="demo-description">
        Use the <code>loading</code> prop to show a spinner on the thumb while the state change is
        being processed.
      </p>
      <CodeCollapsible
        :code="`<USwitch loading default-value label=&quot;Loading&quot; />
<USwitch loading label=&quot;Loading unchecked&quot; />`"
      >
        <div class="demo-col">
          <USwitch loading default-value label="Loading" />
          <USwitch loading label="Loading unchecked" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading Icon</h3>
      <p class="demo-description">
        Use the <code>loading-icon</code> prop to customize the loading spinner icon.
      </p>
      <CodeCollapsible
        :code="`<USwitch loading loading-icon=&quot;i-lucide-loader&quot; default-value label=&quot;Custom loading icon&quot; />`"
      >
        <div class="demo-col">
          <USwitch
            loading
            loading-icon="i-lucide-loader"
            default-value
            label="Custom loading icon"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <p class="demo-description">
        Seven color variants available: primary, secondary, success, info, warning, error, and
        neutral.
      </p>
      <CodeCollapsible
        :code="`<USwitch color=&quot;primary&quot; default-value label=&quot;Primary&quot; />
<USwitch color=&quot;secondary&quot; default-value label=&quot;Secondary&quot; />
<USwitch color=&quot;success&quot; default-value label=&quot;Success&quot; />
<USwitch color=&quot;info&quot; default-value label=&quot;Info&quot; />
<USwitch color=&quot;warning&quot; default-value label=&quot;Warning&quot; />
<USwitch color=&quot;error&quot; default-value label=&quot;Error&quot; />
<USwitch color=&quot;neutral&quot; default-value label=&quot;Neutral&quot; />`"
      >
        <div class="demo-col">
          <USwitch color="primary" default-value label="Primary" />
          <USwitch color="secondary" default-value label="Secondary" />
          <USwitch color="success" default-value label="Success" />
          <USwitch color="info" default-value label="Info" />
          <USwitch color="warning" default-value label="Warning" />
          <USwitch color="error" default-value label="Error" />
          <USwitch color="neutral" default-value label="Neutral" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">
        Three size options used in Mizu: <code>sm</code>, <code>md</code>, and <code>lg</code>.
      </p>
      <CodeCollapsible
        :code="`<USwitch size=&quot;sm&quot; default-value label=&quot;Small&quot; />
<USwitch size=&quot;md&quot; default-value label=&quot;Medium&quot; />
<USwitch size=&quot;lg&quot; default-value label=&quot;Large&quot; />`"
      >
        <div class="demo-col">
          <USwitch size="sm" default-value label="Small" />
          <USwitch size="md" default-value label="Medium" />
          <USwitch size="lg" default-value label="Large" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">
        Use the <code>disabled</code> prop to prevent interaction. Works in both checked and
        unchecked states.
      </p>
      <CodeCollapsible
        :code="`<USwitch disabled label=&quot;Disabled — on&quot; :default-value=&quot;true&quot; />
<USwitch disabled label=&quot;Disabled — off&quot; />`"
      >
        <div class="demo-col">
          <USwitch disabled label="Disabled — on" :default-value="true" />
          <USwitch disabled label="Disabled — off" />
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
  background: var(--color-surface-muted, #f3f4f6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
}
</style>
