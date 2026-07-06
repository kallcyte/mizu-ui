<script setup lang="ts">
import { ref } from "vue";
import {
  MizuCollapsibleRoot,
  MizuCollapsibleTrigger,
  MizuCollapsibleContent,
  MizuButton,
} from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const isOpen = ref(false);

const basicCode = `<MizuCollapsibleRoot>
  <MizuCollapsibleTrigger as-child>
    <MizuButton variant="primary">Show more</MizuButton>
  </MizuCollapsibleTrigger>
  <MizuCollapsibleContent>
    This content can be collapsed and expanded. Click the trigger above to toggle visibility.
  </MizuCollapsibleContent>
</MizuCollapsibleRoot>`;

const controlledCode = `<MizuCollapsibleRoot v-model:open="isOpen">
  <MizuCollapsibleTrigger as-child>
    <MizuButton variant="primary">Toggle details</MizuButton>
  </MizuCollapsibleTrigger>
  <MizuCollapsibleContent>
    This collapsible is controlled via v-model. The state is reflected above.
  </MizuCollapsibleContent>
</MizuCollapsibleRoot>`;

const defaultOpenCode = `<MizuCollapsibleRoot :default-open="true">
  <MizuCollapsibleTrigger as-child>
    <MizuButton variant="primary">Initially expanded</MizuButton>
  </MizuCollapsibleTrigger>
  <MizuCollapsibleContent>
    This collapsible starts in the open state using the defaultOpen prop.
  </MizuCollapsibleContent>
</MizuCollapsibleRoot>`;

const disabledCode = `<MizuCollapsibleRoot disabled>
  <MizuCollapsibleTrigger as-child>
    <MizuButton variant="primary">Disabled collapsible</MizuButton>
  </MizuCollapsibleTrigger>
  <MizuCollapsibleContent>
    This content cannot be shown because the collapsible is disabled.
  </MizuCollapsibleContent>
</MizuCollapsibleRoot>`;

const buttonVariantsCode = `<MizuCollapsibleRoot>
  <MizuCollapsibleTrigger as-child>
    <MizuButton variant="primary">Primary</MizuButton>
  </MizuCollapsibleTrigger>
  <MizuCollapsibleContent>Using primary variant button.</MizuCollapsibleContent>
</MizuCollapsibleRoot>
<MizuCollapsibleRoot>
  <MizuCollapsibleTrigger as-child>
    <MizuButton variant="ghost">Ghost</MizuButton>
  </MizuCollapsibleTrigger>
  <MizuCollapsibleContent>Using ghost variant button.</MizuCollapsibleContent>
</MizuCollapsibleRoot>
<MizuCollapsibleRoot>
  <MizuCollapsibleTrigger as-child>
    <MizuButton variant="outline">Outline</MizuButton>
  </MizuCollapsibleTrigger>
  <MizuCollapsibleContent>Using outline variant button.</MizuCollapsibleContent>
</MizuCollapsibleRoot>`;

const richContentCode = `<MizuCollapsibleRoot>
  <MizuCollapsibleTrigger as-child>
    <MizuButton variant="primary">Show details</MizuButton>
  </MizuCollapsibleTrigger>
  <MizuCollapsibleContent>
    <p style="margin: 0 0 8px 0;">Collapsibles can contain any content:</p>
    <ul style="margin: 0; padding-left: 20px;">
      <li>Text and paragraphs</li>
      <li>Lists and tables</li>
      <li>Forms and inputs</li>
      <li>Other components</li>
    </ul>
  </MizuCollapsibleContent>
</MizuCollapsibleRoot>`;

const backgroundCode = `<MizuCollapsibleRoot>
  <MizuCollapsibleTrigger as-child>
    <MizuButton variant="primary">Show details</MizuButton>
  </MizuCollapsibleTrigger>
  <MizuCollapsibleContent background="#FAFAFA">
    This content panel has a visible background.
  </MizuCollapsibleContent>
</MizuCollapsibleRoot>`;

const partialCollapseCode = `<MizuCollapsibleRoot>
  <MizuCollapsibleTrigger as-child>
    <MizuButton variant="primary">Show more</MizuButton>
  </MizuCollapsibleTrigger>
  <MizuCollapsibleContent collapsed-height="80px">
    <p style="margin: 0 0 8px 0;">This content is partially visible when collapsed.</p>
    <p style="margin: 0 0 8px 0;">The collapsedHeight prop keeps the panel at 80px tall</p>
    <p style="margin: 0 0 8px 0;">so users can see a preview of the content.</p>
    <p style="margin: 0 0 8px 0;">Click "Show more" to expand and read the full text.</p>
    <p style="margin: 0;">This is useful for "show more/less" patterns.</p>
  </MizuCollapsibleContent>
</MizuCollapsibleRoot>`;
</script>

<template>
  <div class="collapsible-demo not-content">
    <!-- Basic collapsible -->
    <div class="demo-section">
      <h3>Basic</h3>
      <DemoTabs :code="basicCode">
      <MizuCollapsibleRoot>
        <MizuCollapsibleTrigger as-child>
          <MizuButton variant="primary">Show more</MizuButton>
        </MizuCollapsibleTrigger>
        <MizuCollapsibleContent>
          This content can be collapsed and expanded. Click the trigger above to toggle visibility.
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
      </DemoTabs>
    </div>

    <!-- Controlled with v-model -->
    <div class="demo-section">
      <h3>Controlled (v-model)</h3>
      <p class="demo-hint">Currently open: {{ isOpen }}</p>
      <DemoTabs :code="controlledCode">
      <MizuCollapsibleRoot v-model:open="isOpen">
        <MizuCollapsibleTrigger as-child>
          <MizuButton variant="primary">Toggle details</MizuButton>
        </MizuCollapsibleTrigger>
        <MizuCollapsibleContent>
          This collapsible is controlled via v-model. The state is reflected above.
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
      </DemoTabs>
    </div>

    <!-- Default open -->
    <div class="demo-section">
      <h3>Default open</h3>
      <DemoTabs :code="defaultOpenCode">
      <MizuCollapsibleRoot :default-open="true">
        <MizuCollapsibleTrigger as-child>
          <MizuButton variant="primary">Initially expanded</MizuButton>
        </MizuCollapsibleTrigger>
        <MizuCollapsibleContent>
          This collapsible starts in the open state using the defaultOpen prop.
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
      </DemoTabs>
    </div>

    <!-- Disabled -->
    <div class="demo-section">
      <h3>Disabled</h3>
      <DemoTabs :code="disabledCode">
      <MizuCollapsibleRoot disabled>
        <MizuCollapsibleTrigger as-child>
          <MizuButton variant="primary">Disabled collapsible</MizuButton>
        </MizuCollapsibleTrigger>
        <MizuCollapsibleContent>
          This content cannot be shown because the collapsible is disabled.
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
      </DemoTabs>
    </div>

    <!-- Button variants -->
    <div class="demo-section">
      <h3>Button variants</h3>
      <DemoTabs :code="buttonVariantsCode">
      <div class="button-variants-row">
        <MizuCollapsibleRoot>
          <MizuCollapsibleTrigger as-child>
            <MizuButton variant="primary">Primary</MizuButton>
          </MizuCollapsibleTrigger>
          <MizuCollapsibleContent>Using primary variant button.</MizuCollapsibleContent>
        </MizuCollapsibleRoot>
        <MizuCollapsibleRoot>
          <MizuCollapsibleTrigger as-child>
            <MizuButton variant="ghost">Ghost</MizuButton>
          </MizuCollapsibleTrigger>
          <MizuCollapsibleContent>Using ghost variant button.</MizuCollapsibleContent>
        </MizuCollapsibleRoot>
        <MizuCollapsibleRoot>
          <MizuCollapsibleTrigger as-child>
            <MizuButton variant="outline">Outline</MizuButton>
          </MizuCollapsibleTrigger>
          <MizuCollapsibleContent>Using outline variant button.</MizuCollapsibleContent>
        </MizuCollapsibleRoot>
      </div>
      </DemoTabs>
    </div>

    <!-- Background -->
    <div class="demo-section">
      <h3>Background</h3>
      <DemoTabs :code="backgroundCode">
      <MizuCollapsibleRoot>
        <MizuCollapsibleTrigger as-child>
          <MizuButton variant="primary">Show details</MizuButton>
        </MizuCollapsibleTrigger>
        <MizuCollapsibleContent background="#FAFAFA">
          This content panel has a visible background.
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
      </DemoTabs>
    </div>

    <!-- Partial collapse -->
    <div class="demo-section">
      <h3>Partial collapse</h3>
      <DemoTabs :code="partialCollapseCode">
      <MizuCollapsibleRoot>
        <MizuCollapsibleTrigger as-child>
          <MizuButton variant="primary">Show more</MizuButton>
        </MizuCollapsibleTrigger>
        <MizuCollapsibleContent collapsed-height="80px">
          <p style="margin: 0 0 8px 0;">This content is partially visible when collapsed.</p>
          <p style="margin: 0 0 8px 0;">The collapsedHeight prop keeps the panel at 80px tall</p>
          <p style="margin: 0 0 8px 0;">so users can see a preview of the content.</p>
          <p style="margin: 0 0 8px 0;">Click "Show more" to expand and read the full text.</p>
          <p style="margin: 0;">This is useful for "show more/less" patterns.</p>
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
      </DemoTabs>
    </div>

    <!-- Nested content -->
    <div class="demo-section">
      <h3>Rich content</h3>
      <DemoTabs :code="richContentCode">
      <MizuCollapsibleRoot>
        <MizuCollapsibleTrigger as-child>
          <MizuButton variant="primary">Show details</MizuButton>
        </MizuCollapsibleTrigger>
        <MizuCollapsibleContent>
          <p style="margin: 0 0 8px 0;">Collapsibles can contain any content:</p>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Text and paragraphs</li>
            <li>Lists and tables</li>
            <li>Forms and inputs</li>
            <li>Other components</li>
          </ul>
        </MizuCollapsibleContent>
      </MizuCollapsibleRoot>
      </DemoTabs>
    </div>
  </div>
</template>

<style scoped>
.collapsible-demo { all: revert; }

.collapsible-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
  background: transparent;
}

.collapsible-demo .demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.collapsible-demo .demo-section > * {
  margin-top: 0;
}

.collapsible-demo .demo-section h3 {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}

.collapsible-demo .demo-hint {
  font-size: 13px;
  color: var(--color-foreground-muted);
  margin: 0;
}

.collapsible-demo .button-variants-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

</style>
