<script setup lang="ts">
import { ref } from "vue";
import {
  MizuCollapsibleRoot,
  MizuCollapsibleTrigger,
  MizuCollapsibleContent,
  MizuButton,
} from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

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
  <div class="collapsible-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <MizuCollapsibleRoot>
          <MizuCollapsibleTrigger as-child>
            <MizuButton variant="primary">Show more</MizuButton>
          </MizuCollapsibleTrigger>
          <MizuCollapsibleContent>
            This content can be collapsed and expanded. Click the trigger above to toggle
            visibility.
          </MizuCollapsibleContent>
        </MizuCollapsibleRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Controlled (v-model)</h3>
      <p class="demo-hint">Currently open: {{ isOpen }}</p>
      <CodeCollapsible :code="controlledCode">
        <MizuCollapsibleRoot v-model:open="isOpen">
          <MizuCollapsibleTrigger as-child>
            <MizuButton variant="primary">Toggle details</MizuButton>
          </MizuCollapsibleTrigger>
          <MizuCollapsibleContent>
            This collapsible is controlled via v-model. The state is reflected above.
          </MizuCollapsibleContent>
        </MizuCollapsibleRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Default open</h3>
      <CodeCollapsible :code="defaultOpenCode">
        <MizuCollapsibleRoot :default-open="true">
          <MizuCollapsibleTrigger as-child>
            <MizuButton variant="primary">Initially expanded</MizuButton>
          </MizuCollapsibleTrigger>
          <MizuCollapsibleContent>
            This collapsible starts in the open state using the defaultOpen prop.
          </MizuCollapsibleContent>
        </MizuCollapsibleRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="disabledCode">
        <MizuCollapsibleRoot disabled>
          <MizuCollapsibleTrigger as-child>
            <MizuButton variant="primary">Disabled collapsible</MizuButton>
          </MizuCollapsibleTrigger>
          <MizuCollapsibleContent>
            This content cannot be shown because the collapsible is disabled.
          </MizuCollapsibleContent>
        </MizuCollapsibleRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Button variants</h3>
      <CodeCollapsible :code="buttonVariantsCode">
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
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Background</h3>
      <CodeCollapsible :code="backgroundCode">
        <MizuCollapsibleRoot>
          <MizuCollapsibleTrigger as-child>
            <MizuButton variant="primary">Show details</MizuButton>
          </MizuCollapsibleTrigger>
          <MizuCollapsibleContent background="#FAFAFA">
            This content panel has a visible background.
          </MizuCollapsibleContent>
        </MizuCollapsibleRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Partial collapse</h3>
      <CodeCollapsible :code="partialCollapseCode">
        <MizuCollapsibleRoot>
          <MizuCollapsibleTrigger as-child>
            <MizuButton variant="primary">Show more</MizuButton>
          </MizuCollapsibleTrigger>
          <MizuCollapsibleContent collapsed-height="80px">
            <p style="margin: 0 0 8px 0">This content is partially visible when collapsed.</p>
            <p style="margin: 0 0 8px 0">The collapsedHeight prop keeps the panel at 80px tall</p>
            <p style="margin: 0 0 8px 0">so users can see a preview of the content.</p>
            <p style="margin: 0 0 8px 0">Click "Show more" to expand and read the full text.</p>
            <p style="margin: 0">This is useful for "show more/less" patterns.</p>
          </MizuCollapsibleContent>
        </MizuCollapsibleRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Rich content</h3>
      <CodeCollapsible :code="richContentCode">
        <MizuCollapsibleRoot>
          <MizuCollapsibleTrigger as-child>
            <MizuButton variant="primary">Show details</MizuButton>
          </MizuCollapsibleTrigger>
          <MizuCollapsibleContent>
            <p style="margin: 0 0 8px 0">Collapsibles can contain any content:</p>
            <ul style="margin: 0; padding-left: 20px">
              <li>Text and paragraphs</li>
              <li>Lists and tables</li>
              <li>Forms and inputs</li>
              <li>Other components</li>
            </ul>
          </MizuCollapsibleContent>
        </MizuCollapsibleRoot>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.collapsible-examples {
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.collapsible-examples :deep(*) {
  margin: 0;
}

.example-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.example-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}

.demo-hint {
  font-size: 13px;
  color: var(--color-foreground-muted);
  margin: 0;
}

.button-variants-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
