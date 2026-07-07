<script setup lang="ts">
import { ref } from "vue";
import { MizuAlert, MizuButton } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const closableVisible = ref(true);
const successVisible = ref(true);
const warningVisible = ref(true);
const infoVisible = ref(true);

const variantsCode = `<MizuAlert variant="success">
  Your changes have been saved successfully.
</MizuAlert>
<MizuAlert variant="error">
  We were unable to process your request. Please try again.
</MizuAlert>
<MizuAlert variant="warning">
  Your subscription will expire in 3 days. Renew now to avoid service interruption.
</MizuAlert>
<MizuAlert variant="info">
  A new version of the application is available. Refresh to update.
</MizuAlert>`;

const withTitleCode = `<MizuAlert variant="success" title="Payment received">
  Your invoice #1234 has been paid in full. A receipt has been emailed to you.
</MizuAlert>
<MizuAlert variant="error" title="Connection lost">
  Unable to reach the server. Your work has been saved locally and will sync when the connection is restored.
</MizuAlert>
<MizuAlert variant="warning" title="Storage almost full">
  You have used 95% of your storage quota. Upgrade your plan or delete old files.
</MizuAlert>
<MizuAlert variant="info" title="Tip">
  You can use keyboard shortcuts to navigate faster. Press ? to see all available shortcuts.
</MizuAlert>`;

const closableCode = `<MizuAlert
  variant="info"
  title="New feature available"
  closable
  @close="closableVisible = false"
>
  Try our new dashboard layout. You can switch back at any time from settings.
</MizuAlert>`;

const withoutIconCode = `<MizuAlert variant="success" :default-icon="false">
  Compact alert with no icon.
</MizuAlert>
<MizuAlert variant="error" :default-icon="false">
  Another compact alert.
</MizuAlert>`;

const withCustomIconCode = `<MizuAlert variant="success">
  <template #icon>
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
      <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="currentColor" />
    </svg>
  </template>
  Featured highlight with a custom star icon.
</MizuAlert>
<MizuAlert variant="info">
  <template #icon>
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
      <path d="M3 8H13M3 4H13M3 12H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  </template>
  Custom icon slot works with any icon library.
</MizuAlert>`;

const closableAllVariantsCode = `<MizuAlert variant="success" closable @close="successVisible = false">
  Success dismissible.
</MizuAlert>
<MizuAlert variant="warning" closable @close="warningVisible = false">
  Warning dismissible.
</MizuAlert>
<MizuAlert variant="info" closable @close="infoVisible = false">
  Info dismissible.
</MizuAlert>`;
</script>

<template>
  <div class="alert-examples">
    <section class="example-section">
      <h3>Variants</h3>
      <CodeCollapsible :code="variantsCode">
        <div class="alert-stack">
          <MizuAlert variant="success">
            Your changes have been saved successfully.
          </MizuAlert>
          <MizuAlert variant="error">
            We were unable to process your request. Please try again.
          </MizuAlert>
          <MizuAlert variant="warning">
            Your subscription will expire in 3 days. Renew now to avoid service interruption.
          </MizuAlert>
          <MizuAlert variant="info">
            A new version of the application is available. Refresh to update.
          </MizuAlert>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Title</h3>
      <CodeCollapsible :code="withTitleCode">
        <div class="alert-stack">
          <MizuAlert variant="success" title="Payment received">
            Your invoice #1234 has been paid in full. A receipt has been emailed to you.
          </MizuAlert>
          <MizuAlert variant="error" title="Connection lost">
            Unable to reach the server. Your work has been saved locally and will sync when the connection is restored.
          </MizuAlert>
          <MizuAlert variant="warning" title="Storage almost full">
            You have used 95% of your storage quota. Upgrade your plan or delete old files.
          </MizuAlert>
          <MizuAlert variant="info" title="Tip">
            You can use keyboard shortcuts to navigate faster. Press ? to see all available shortcuts.
          </MizuAlert>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Closable</h3>
      <CodeCollapsible :code="closableCode">
        <div class="alert-stack">
          <MizuAlert
            v-if="closableVisible"
            variant="info"
            title="New feature available"
            closable
            @close="closableVisible = false"
          >
            Try our new dashboard layout. You can switch back at any time from settings.
          </MizuAlert>
          <MizuButton
            v-if="!closableVisible"
            variant="outline"
            size="sm"
            @click="closableVisible = true"
          >
            Reset
          </MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Without Icon</h3>
      <CodeCollapsible :code="withoutIconCode">
        <div class="alert-stack">
          <MizuAlert variant="success" :default-icon="false">
            Compact alert with no icon.
          </MizuAlert>
          <MizuAlert variant="error" :default-icon="false">
            Another compact alert.
          </MizuAlert>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Custom Icon</h3>
      <CodeCollapsible :code="withCustomIconCode">
        <div class="alert-stack">
          <MizuAlert variant="success">
            <template #icon>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="currentColor" />
              </svg>
            </template>
            Featured highlight with a custom star icon.
          </MizuAlert>
          <MizuAlert variant="info">
            <template #icon>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <path d="M3 8H13M3 4H13M3 12H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </template>
            Custom icon slot works with any icon library.
          </MizuAlert>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Closable All Variants</h3>
      <CodeCollapsible :code="closableAllVariantsCode">
        <div class="alert-stack">
          <MizuAlert
            v-if="successVisible"
            variant="success"
            closable
            @close="successVisible = false"
          >
            Success dismissible.
          </MizuAlert>
          <MizuAlert
            v-if="warningVisible"
            variant="warning"
            closable
            @close="warningVisible = false"
          >
            Warning dismissible.
          </MizuAlert>
          <MizuAlert
            v-if="infoVisible"
            variant="info"
            closable
            @close="infoVisible = false"
          >
            Info dismissible.
          </MizuAlert>
          <MizuButton
            v-if="!successVisible && !warningVisible && !infoVisible"
            variant="outline"
            size="sm"
            @click="successVisible = true; warningVisible = true; infoVisible = true"
          >
            Reset
          </MizuButton>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.alert-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.alert-examples :deep(*) {
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

.alert-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
