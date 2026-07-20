<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const checked = ref(true);
const indeterminate = ref("indeterminate");
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>States</h3>
      <p class="demo-description">
        Demonstrates the four states: checked, unchecked, required, and indeterminate using
        <code>v-model</code> and <code>default-value</code>.
      </p>
      <CodeCollapsible
        :code="`<UCheckbox v-model=&quot;checked&quot; label=&quot;Accept terms&quot; />
<UCheckbox label=&quot;Unchecked&quot; />
<UCheckbox label=&quot;Required — agree to continue&quot; required />
<UCheckbox :default-value=&quot;indeterminate&quot; label=&quot;Indeterminate&quot; />`"
      >
        <div class="demo-col">
          <UCheckbox v-model="checked" label="Accept terms" />
          <UCheckbox label="Unchecked" />
          <UCheckbox label="Required — agree to continue" required />
          <UCheckbox :default-value="indeterminate" label="Indeterminate" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indeterminate</h3>
      <p class="demo-description">
        Set the checkbox to an indeterminate state by passing
        <code>default-value=&quot;indeterminate&quot;</code>.
      </p>
      <CodeCollapsible
        :code="`<UCheckbox :default-value=&quot;indeterminate&quot; label=&quot;Indeterminate&quot; />`"
      >
        <div class="demo-col">
          <UCheckbox :default-value="indeterminate" label="Indeterminate" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Description</h3>
      <p class="demo-description">
        Adds a supporting description below the label using the <code>description</code> prop for
        additional context.
      </p>
      <CodeCollapsible
        :code="`<UCheckbox label=&quot;Subscribe&quot; description=&quot;Receive product updates and tips.&quot; />`"
      >
        <div class="demo-col">
          <UCheckbox label="Subscribe" description="Receive product updates and tips." />
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
        :code="`<UCheckbox color=&quot;primary&quot; default-value label=&quot;Primary&quot; />
<UCheckbox color=&quot;secondary&quot; default-value label=&quot;Secondary&quot; />
<UCheckbox color=&quot;success&quot; default-value label=&quot;Success&quot; />
<UCheckbox color=&quot;info&quot; default-value label=&quot;Info&quot; />
<UCheckbox color=&quot;warning&quot; default-value label=&quot;Warning&quot; />
<UCheckbox color=&quot;error&quot; default-value label=&quot;Error&quot; />
<UCheckbox color=&quot;neutral&quot; default-value label=&quot;Neutral&quot; />`"
      >
        <div class="demo-col">
          <UCheckbox color="primary" default-value label="Primary" />
          <UCheckbox color="secondary" default-value label="Secondary" />
          <UCheckbox color="success" default-value label="Success" />
          <UCheckbox color="info" default-value label="Info" />
          <UCheckbox color="warning" default-value label="Warning" />
          <UCheckbox color="error" default-value label="Error" />
          <UCheckbox color="neutral" default-value label="Neutral" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <p class="demo-description">
        Use the <code>icon</code> prop to customize the checkmark icon when the checkbox is checked.
      </p>
      <CodeCollapsible
        :code="`<UCheckbox icon=&quot;i-lucide-heart&quot; default-value label=&quot;Heart icon&quot; />`"
      >
        <div class="demo-col">
          <UCheckbox icon="i-lucide-heart" default-value label="Heart icon" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indeterminate Icon</h3>
      <p class="demo-description">
        Use the <code>indeterminate-icon</code> prop to customize the icon shown in the
        indeterminate state.
      </p>
      <CodeCollapsible
        :code="`<UCheckbox :default-value=&quot;indeterminate&quot; indeterminate-icon=&quot;i-lucide-plus&quot; label=&quot;Plus indeterminate&quot; />`"
      >
        <div class="demo-col">
          <UCheckbox
            :default-value="indeterminate"
            indeterminate-icon="i-lucide-plus"
            label="Plus indeterminate"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">
        Three size options used in Mizu: <code>sm</code>, <code>md</code>, and <code>lg</code>.
      </p>
      <CodeCollapsible
        :code="`<UCheckbox size=&quot;sm&quot; default-value label=&quot;Small&quot; />
<UCheckbox size=&quot;md&quot; default-value label=&quot;Medium&quot; />
<UCheckbox size=&quot;lg&quot; default-value label=&quot;Large&quot; />`"
      >
        <div class="demo-col">
          <UCheckbox size="sm" default-value label="Small" />
          <UCheckbox size="md" default-value label="Medium" />
          <UCheckbox size="lg" default-value label="Large" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Card Variant</h3>
      <p class="demo-description">
        Card-styled checkboxes with <code>variant="card"</code> and descriptions for richer
        selection UI.
      </p>
      <CodeCollapsible
        :code="`<UCheckbox color=&quot;primary&quot; variant=&quot;card&quot; default-value label=&quot;Primary&quot; description=&quot;This is a primary card checkbox.&quot; />
<UCheckbox color=&quot;neutral&quot; variant=&quot;card&quot; label=&quot;Neutral&quot; description=&quot;This is a neutral card checkbox.&quot; />
<UCheckbox color=&quot;error&quot; variant=&quot;card&quot; default-value label=&quot;Error&quot; description=&quot;This is an error card checkbox.&quot; />`"
      >
        <div class="demo-col">
          <UCheckbox
            color="primary"
            variant="card"
            default-value
            label="Primary"
            description="This is a primary card checkbox."
          />
          <UCheckbox
            color="neutral"
            variant="card"
            label="Neutral"
            description="This is a neutral card checkbox."
          />
          <UCheckbox
            color="error"
            variant="card"
            default-value
            label="Error"
            description="This is an error card checkbox."
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indicator Position</h3>
      <p class="demo-description">
        Control the indicator placement with the <code>indicator</code> prop:
        <code>start</code> (default), <code>end</code>, or <code>hidden</code>.
      </p>
      <CodeCollapsible
        :code="`<UCheckbox indicator=&quot;start&quot; variant=&quot;card&quot; default-value label=&quot;Start (default)&quot; />
<UCheckbox indicator=&quot;end&quot; variant=&quot;card&quot; default-value label=&quot;End&quot; />
<UCheckbox indicator=&quot;hidden&quot; variant=&quot;card&quot; default-value label=&quot;Hidden&quot; />`"
      >
        <div class="demo-col max-w-xs">
          <UCheckbox indicator="start" variant="card" default-value label="Start (default)" />
          <UCheckbox indicator="end" variant="card" default-value label="End" />
          <UCheckbox indicator="hidden" variant="card" default-value label="Hidden" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">
        Disabled states for checked, unchecked, and indeterminate checkboxes, preventing user
        interaction.
      </p>
      <CodeCollapsible
        :code="`<UCheckbox disabled label=&quot;Checked — disabled&quot; :default-value=&quot;true&quot; />
<UCheckbox disabled label=&quot;Unchecked — disabled&quot; />
<UCheckbox disabled :default-value=&quot;indeterminate&quot; label=&quot;Indeterminate — disabled&quot; />`"
      >
        <div class="demo-col">
          <UCheckbox disabled label="Checked — disabled" :default-value="true" />
          <UCheckbox disabled label="Unchecked — disabled" />
          <UCheckbox disabled :default-value="indeterminate" label="Indeterminate — disabled" />
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
