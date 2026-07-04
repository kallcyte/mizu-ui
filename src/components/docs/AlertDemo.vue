<script setup lang="ts">
import { ref } from "vue";
import { MizuAlert } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

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
  Your subscription will expire in 3 days.
</MizuAlert>
<MizuAlert variant="info">
  A new version of the application is available.
</MizuAlert>`;

const withTitleCode = `<MizuAlert variant="success" title="Payment received">
  Your invoice #1234 has been paid in full.
</MizuAlert>
<MizuAlert variant="error" title="Connection lost">
  Unable to reach the server.
</MizuAlert>`;

const closableCode = `<MizuAlert
  variant="info"
  title="New feature available"
  closable
  @close="closableVisible = false"
>
  Try our new dashboard layout.
</MizuAlert>`;

const withoutIconCode = `<MizuAlert variant="success" :default-icon="false">
  Compact alert with no icon.
</MizuAlert>`;

const withCustomIconCode = `<MizuAlert variant="success">
  <template #icon>
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
      <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="currentColor" />
    </svg>
  </template>
  Featured highlight with a custom star icon.
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
    <div class="alert-demo not-content">
        <DemoTabs :code="variantsCode">
        <div class="demo-section">
            <h3>Variants</h3>
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
        </div>
        </DemoTabs>

        <DemoTabs :code="withTitleCode">
        <div class="demo-section">
            <h3>With Title</h3>
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
        </div>
        </DemoTabs>

        <DemoTabs :code="closableCode">
        <div class="demo-section">
            <h3>Closable</h3>
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
        </div>
        </DemoTabs>

        <DemoTabs :code="withoutIconCode">
        <div class="demo-section">
            <h3>Without Icon</h3>
            <div class="alert-stack">
                <MizuAlert variant="success" :default-icon="false">
                    Compact alert with no icon.
                </MizuAlert>
                <MizuAlert variant="error" :default-icon="false">
                    Another compact alert.
                </MizuAlert>
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="withCustomIconCode">
        <div class="demo-section">
            <h3>With Custom Icon</h3>
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
        </div>
        </DemoTabs>

        <DemoTabs :code="closableAllVariantsCode">
        <div class="demo-section">
            <h3>Closable All Variants</h3>
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
        </div>
        </DemoTabs>
    </div>
</template>

<style scoped>
.alert-demo {
    all: revert;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    background: transparent;

    border: 1px solid var(--color-surface-muted);
    border-radius: 8px;
}

.alert-demo :deep(*) {
    margin: 0;
}

.demo-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.demo-section h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--sl-color-text);
    margin-bottom: 0;
    margin-top: 0;
}
.demo-section > div {
  margin-top: 0;
}

.alert-stack {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
