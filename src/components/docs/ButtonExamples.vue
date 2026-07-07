<script setup lang="ts">
import { ref } from "vue";
import { MizuButton } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";
import {
  Plus,
  ArrowRight,
  X,
  Check,
  Save,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
} from "@lucide/vue";

const loading = ref(false);
const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

const simulateAsync = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
};

const primaryCode = `<MizuButton variant="primary">
  Submit
</MizuButton>`;

const accentCode = `<MizuButton variant="accent">
  Learn More
</MizuButton>`;

const ghostCode = `<MizuButton variant="ghost">
  Cancel
</MizuButton>`;

const outlineCode = `<MizuButton variant="outline">
  Save Draft
</MizuButton>`;

const withIconCode = `<MizuButton>
  <template #leading-icon>
    <Plus />
  </template>
  Add Item
</MizuButton>

<MizuButton variant="accent">
  Save
  <template #trailing-icon>
    <ArrowRight />
  </template>
</MizuButton>`;

const disabledCode = `<MizuButton variant="primary" disabled>
  Primary
</MizuButton>
<MizuButton variant="accent" disabled>
  Accent
</MizuButton>
<MizuButton variant="ghost" disabled>
  Ghost
</MizuButton>
<MizuButton variant="outline" disabled>
  Outline
</MizuButton>`;

const loadingCode = `<MizuButton
  variant="primary"
  :loading="isSubmitting"
  @click="handleSubmit"
>
  Submitting
</MizuButton>`;

const sizesCode = `<MizuButton variant="primary" size="sm">
  Small
</MizuButton>
<MizuButton variant="primary" size="md">
  Medium
</MizuButton>
<MizuButton variant="primary" size="lg">
  Large
</MizuButton>`;

const feedbackCode = `<MizuButton variant="success">
  <template #leading-icon><CheckCircle /></template>
  Success
</MizuButton>
<MizuButton variant="warning">
  <template #leading-icon><AlertTriangle /></template>
  Warning
</MizuButton>
<MizuButton variant="error">
  <template #leading-icon><XCircle /></template>
  Error
</MizuButton>
<MizuButton variant="info">
  <template #leading-icon><Info /></template>
  Info
</MizuButton>

<!-- Outline feedback variants -->
<MizuButton variant="outline-success">
  <template #leading-icon><CheckCircle /></template>
  Success
</MizuButton>
<MizuButton variant="outline-warning">
  <template #leading-icon><AlertTriangle /></template>
  Warning
</MizuButton>
<MizuButton variant="outline-error">
  <template #leading-icon><XCircle /></template>
  Error
</MizuButton>
<MizuButton variant="outline-info">
  <template #leading-icon><Info /></template>
  Info
</MizuButton>`;

const blockCode = `<MizuButton variant="primary" block>
  Full Width Primary
</MizuButton>
<MizuButton variant="outline" block>
  Full Width Outline
</MizuButton>
<MizuButton variant="ghost" block>
  Full Width Ghost
</MizuButton>`;

const squareCode = `<MizuButton variant="primary" square size="sm">
  <template #leading-icon><Plus /></template>
</MizuButton>
<MizuButton variant="accent" square size="md">
  <template #leading-icon><Plus /></template>
</MizuButton>
<MizuButton variant="outline" square size="lg">
  <template #leading-icon><Plus /></template>
</MizuButton>
<MizuButton variant="ghost" square size="md">
  <template #leading-icon><X /></template>
</MizuButton>`;

const loadingAutoCode = `<MizuButton variant="primary" loading-auto @click="simulateAsync">
  <template #leading-icon><Save /></template>
  Save (2s delay)
</MizuButton>
<MizuButton variant="success" loading-auto @click="simulateAsync">
  <template #leading-icon><Check /></template>
  Confirm
</MizuButton>`;
</script>

<template>
  <div class="button-examples">
    <section class="example-section">
      <h3>Primary</h3>
      <CodeCollapsible :code="primaryCode">
        <div class="button-row">
          <MizuButton variant="primary">Submit</MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Accent</h3>
      <CodeCollapsible :code="accentCode">
        <div class="button-row">
          <MizuButton variant="accent">Learn More</MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Ghost</h3>
      <CodeCollapsible :code="ghostCode">
        <div class="button-row">
          <MizuButton variant="ghost">Cancel</MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Outline</h3>
      <CodeCollapsible :code="outlineCode">
        <div class="button-row">
          <MizuButton variant="outline">Save Draft</MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icon</h3>
      <CodeCollapsible :code="withIconCode">
        <div class="button-row">
          <MizuButton variant="primary">
            <template #leading-icon>
              <Plus />
            </template>
            Add Item
          </MizuButton>
          <MizuButton variant="accent">
            Save
            <template #trailing-icon>
              <ArrowRight />
            </template>
          </MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="disabledCode">
        <div class="button-row">
          <MizuButton variant="primary" disabled>Primary</MizuButton>
          <MizuButton variant="accent" disabled>Accent</MizuButton>
          <MizuButton variant="ghost" disabled>Ghost</MizuButton>
          <MizuButton variant="outline" disabled>Outline</MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <CodeCollapsible :code="loadingCode">
        <div class="button-row">
          <MizuButton
            variant="primary"
            :loading="loading"
            @click="handleClick"
          >
            {{ loading ? "Loading..." : "Click me" }}
          </MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="button-row">
          <MizuButton variant="primary" size="sm">Small</MizuButton>
          <MizuButton variant="primary" size="md">Medium</MizuButton>
          <MizuButton variant="primary" size="lg">Large</MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Feedback Variants</h3>
      <CodeCollapsible :code="feedbackCode">
        <div class="button-row">
          <MizuButton variant="success">
            <template #leading-icon><CheckCircle /></template>
            Success
          </MizuButton>
          <MizuButton variant="warning">
            <template #leading-icon><AlertTriangle /></template>
            Warning
          </MizuButton>
          <MizuButton variant="error">
            <template #leading-icon><XCircle /></template>
            Error
          </MizuButton>
          <MizuButton variant="info">
            <template #leading-icon><Info /></template>
            Info
          </MizuButton>
        </div>
        <div class="button-row" style="margin-top: 8px">
          <MizuButton variant="outline-success">
            <template #leading-icon><CheckCircle /></template>
            Success
          </MizuButton>
          <MizuButton variant="outline-warning">
            <template #leading-icon><AlertTriangle /></template>
            Warning
          </MizuButton>
          <MizuButton variant="outline-error">
            <template #leading-icon><XCircle /></template>
            Error
          </MizuButton>
          <MizuButton variant="outline-info">
            <template #leading-icon><Info /></template>
            Info
          </MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Block (Full Width)</h3>
      <CodeCollapsible :code="blockCode">
        <div class="button-row" style="flex-direction: column; width: 100%;">
          <MizuButton variant="primary" block>Full Width Primary</MizuButton>
          <MizuButton variant="outline" block>Full Width Outline</MizuButton>
          <MizuButton variant="ghost" block>Full Width Ghost</MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Square (Icon Only)</h3>
      <CodeCollapsible :code="squareCode">
        <div class="button-row">
          <MizuButton variant="primary" square size="sm">
            <template #leading-icon><Plus /></template>
          </MizuButton>
          <MizuButton variant="accent" square size="md">
            <template #leading-icon><Plus /></template>
          </MizuButton>
          <MizuButton variant="outline" square size="lg">
            <template #leading-icon><Plus /></template>
          </MizuButton>
          <MizuButton variant="ghost" square size="md">
            <template #leading-icon><X /></template>
          </MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading Auto</h3>
      <p class="example-hint">The <code>loading-auto</code> prop automatically sets <code>loading=true</code> while the <code>@click</code> handler's returned promise is pending.</p>
      <CodeCollapsible :code="loadingAutoCode">
        <div class="button-row">
          <MizuButton variant="primary" loading-auto @click="simulateAsync">
            <template #leading-icon><Save /></template>
            Save (2s delay)
          </MizuButton>
          <MizuButton variant="success" loading-auto @click="simulateAsync">
            <template #leading-icon><Check /></template>
            Confirm
          </MizuButton>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style>
.button-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.button-examples :deep(*) {
  margin: 0;
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

.example-hint {
  all: revert;
  font-size: 13px;
  color: var(--color-foreground-secondary);
  line-height: 1.5;
}

.example-hint code {
  font-size: 12px;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--color-surface-subtle);
  color: var(--color-foreground-primary);
  font-family: "JetBrains Mono", "Fira Code", monospace;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 0;
}
</style>
