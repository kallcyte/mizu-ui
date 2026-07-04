<script setup lang="ts">
import { ref, computed } from "vue";
import {
  MizuDialogRoot,
  MizuDialogPortal,
  MizuDialogOverlay,
  MizuDialogContent,
  MizuDialogHeader,
  MizuDialogBody,
  MizuDialogFooter,
  MizuDialogTitle,
  MizuDialogDescription,
  MizuDialogClose,
  MizuDialogTrigger,
  MizuButton,
  MizuInput,
  MizuTag,
} from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const basicOpen = ref(false);
const shorthandOpen = ref(false);
const formOpen = ref(false);
const scrollOpen = ref(false);
const sizedOpen = ref(false);
const closeIconOpen = ref(false);
const complexOpen = ref(false);
const deleteInput = ref("");
const isDeleteValid = computed(() => deleteInput.value === "delete");

const basicCode = `<MizuDialogRoot v-model:open="basicOpen">
  <MizuDialogTrigger as-child>
    <MizuButton variant="accent" size="md">Open Dialog</MizuButton>
  </MizuDialogTrigger>
  <MizuDialogPortal>
    <MizuDialogOverlay />
    <MizuDialogContent>
      <MizuDialogHeader>
        <MizuDialogTitle>Confirm Deletion</MizuDialogTitle>
      </MizuDialogHeader>
      <MizuDialogBody>
        <MizuDialogDescription>
          Are you sure you want to delete this invoice?
        </MizuDialogDescription>
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuButton variant="ghost" size="md" @click="basicOpen = false">Cancel</MizuButton>
        <MizuButton variant="accent" size="md" @click="basicOpen = false">Delete</MizuButton>
      </MizuDialogFooter>
    </MizuDialogContent>
  </MizuDialogPortal>
</MizuDialogRoot>`;

const shorthandCode = `<MizuDialogRoot
  v-model:open="shorthandOpen"
  title="Confirm Deletion"
  description="This action cannot be undone."
>
  <MizuButton variant="accent" size="md">Shorthand Dialog</MizuButton>
  <template #body>
    <p>Custom body content with named slots.</p>
  </template>
  <template #footer="{ close }">
    <MizuButton variant="ghost" size="md" @click="close">Cancel</MizuButton>
    <MizuButton variant="accent" size="md" @click="close">Delete</MizuButton>
  </template>
</MizuDialogRoot>`;

const closeIconCode = `<MizuDialogRoot v-model:open="closeIconOpen">
  <MizuDialogTrigger as-child>
    <MizuButton variant="accent" size="md">Open with Close Icon</MizuButton>
  </MizuDialogTrigger>
  <MizuDialogPortal>
    <MizuDialogOverlay />
    <MizuDialogContent>
      <MizuDialogClose />
      <MizuDialogHeader>
        <MizuDialogTitle>Notification Settings</MizuDialogTitle>
        <MizuDialogDescription>Configure your email notification preferences.</MizuDialogDescription>
      </MizuDialogHeader>
      <MizuDialogBody>
        <p>Use MizuDialogClose for an X icon close button.</p>
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuButton variant="primary" size="md" @click="closeIconOpen = false">Save Changes</MizuButton>
      </MizuDialogFooter>
    </MizuDialogContent>
  </MizuDialogPortal>
</MizuDialogRoot>`;

const confirmCode = `<MizuDialogRoot v-model:open="formOpen">
  <MizuDialogTrigger as-child>
    <MizuButton variant="accent" size="md">Delete Invoice</MizuButton>
  </MizuDialogTrigger>
  <MizuDialogPortal>
    <MizuDialogOverlay />
    <MizuDialogContent>
      <MizuDialogHeader>
        <MizuDialogTitle>Delete Invoice</MizuDialogTitle>
        <MizuDialogDescription>
          Type <strong>delete</strong> to confirm.
        </MizuDialogDescription>
      </MizuDialogHeader>
      <MizuDialogBody>
        <MizuInput
          v-model="deleteInput"
          label='Type "delete" to confirm'
          placeholder="delete"
        />
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuButton variant="ghost" size="md" @click="formOpen = false">Cancel</MizuButton>
        <MizuButton variant="error" size="md" :disabled="!isDeleteValid" @click="formOpen = false">Delete</MizuButton>
      </MizuDialogFooter>
    </MizuDialogContent>
  </MizuDialogPortal>
</MizuDialogRoot>`;

const scrollableCode = `<MizuDialogRoot v-model:open="scrollOpen">
  <MizuDialogTrigger as-child>
    <MizuButton variant="accent" size="md">View Details</MizuButton>
  </MizuDialogTrigger>
  <MizuDialogPortal>
    <MizuDialogOverlay />
    <MizuDialogContent>
      <MizuDialogHeader>
        <MizuDialogTitle>Invoice #INV-2026-0042</MizuDialogTitle>
        <MizuDialogDescription>Full breakdown of charges.</MizuDialogDescription>
      </MizuDialogHeader>
      <MizuDialogBody style="max-height: 300px;">
        <!-- ... detail rows ... -->
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuButton variant="ghost" size="md" @click="scrollOpen = false">Close</MizuButton>
      </MizuDialogFooter>
    </MizuDialogContent>
  </MizuDialogPortal>
</MizuDialogRoot>`;

const customWidthCode = `<MizuDialogRoot v-model:open="sizedOpen">
  <MizuDialogTrigger as-child>
    <MizuButton variant="accent" size="md">Large Dialog</MizuButton>
  </MizuDialogTrigger>
  <MizuDialogPortal>
    <MizuDialogOverlay />
    <MizuDialogContent style="max-width: 600px;">
      <MizuDialogHeader>
        <MizuDialogTitle>Order Summary</MizuDialogTitle>
        <MizuDialogDescription>Review your order before submitting.</MizuDialogDescription>
      </MizuDialogHeader>
      <MizuDialogBody>
        <p>This dialog has max-width: 600px.</p>
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuButton variant="ghost" size="md" @click="sizedOpen = false">Cancel</MizuButton>
        <MizuButton variant="primary" size="md" @click="sizedOpen = false">Submit</MizuButton>
      </MizuDialogFooter>
    </MizuDialogContent>
  </MizuDialogPortal>
</MizuDialogRoot>`;

const complexCode = `<MizuDialogRoot v-model:open="complexOpen">
  <MizuDialogTrigger as-child>
    <MizuButton variant="accent" size="md">Project Settings</MizuButton>
  </MizuDialogTrigger>
  <MizuDialogPortal>
    <MizuDialogOverlay />
    <MizuDialogContent style="max-width: 560px;">
      <MizuDialogClose />
      <MizuDialogHeader>
        <MizuDialogTitle>Project Settings</MizuDialogTitle>
        <MizuDialogDescription>Manage project details.</MizuDialogDescription>
      </MizuDialogHeader>
      <MizuDialogBody style="max-height: 400px;">
        <MizuInput label="Project Name" placeholder="e.g. Mizu Design System" model-value="Mizu Design System" />
        <!-- ... team members, danger zone ... -->
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuButton variant="ghost" size="md" @click="complexOpen = false">Cancel</MizuButton>
        <MizuButton variant="primary" size="md" @click="complexOpen = false">Save Changes</MizuButton>
      </MizuDialogFooter>
    </MizuDialogContent>
  </MizuDialogPortal>
</MizuDialogRoot>`;
</script>

<template>
  <div class="dialog-demo not-content">
    <div class="demo-section">
      <h3>Basic</h3>
      <DemoTabs :code="basicCode">
      <MizuDialogRoot v-model:open="basicOpen">
        <MizuDialogTrigger as-child>
          <MizuButton variant="accent" size="md" class="w-max">Open Dialog</MizuButton>
        </MizuDialogTrigger>
        <MizuDialogPortal>
          <MizuDialogOverlay />
          <MizuDialogContent>
            <MizuDialogHeader>
              <MizuDialogTitle>Confirm Deletion</MizuDialogTitle>
            </MizuDialogHeader>
            <MizuDialogBody>
              <MizuDialogDescription>
                Are you sure you want to delete this invoice? This action cannot be undone.
              </MizuDialogDescription>
            </MizuDialogBody>
            <MizuDialogFooter>
              <MizuButton variant="ghost" size="md" class="w-max" @click="basicOpen = false">Cancel</MizuButton>
              <MizuButton variant="accent" size="md" class="w-max" @click="basicOpen = false">Delete</MizuButton>
            </MizuDialogFooter>
          </MizuDialogContent>
        </MizuDialogPortal>
      </MizuDialogRoot>
      </DemoTabs>
    </div>

        <div class="demo-section">
          <h3>Shorthand (title + slots)</h3>
          <DemoTabs :code="shorthandCode">
          <MizuDialogRoot
            v-model:open="shorthandOpen"
            title="Confirm Deletion"
            description="This action cannot be undone."
          >
            <MizuButton variant="accent" size="md" class="w-max">Shorthand Dialog</MizuButton>
            <template #body>
              <p class="body-text">
                The shorthand API uses <code>title</code> / <code>description</code> props and named
                slots (<code>#body</code>, <code>#footer</code>) instead of sub-components. The
                <code>#footer</code> slot receives <code>{ close }</code> scoped data.
              </p>
            </template>
            <template #footer="{ close }">
              <MizuButton variant="ghost" size="md" class="w-max" @click="close">Cancel</MizuButton>
              <MizuButton variant="accent" size="md" class="w-max" @click="close">Delete</MizuButton>
            </template>
          </MizuDialogRoot>
          </DemoTabs>
        </div>

        <div class="demo-section">
          <h3>Close Icon</h3>
      <DemoTabs :code="closeIconCode">
      <MizuDialogRoot v-model:open="closeIconOpen">
        <MizuDialogTrigger as-child>
          <MizuButton variant="accent" size="md" class="w-max">Open with Close Icon</MizuButton>
        </MizuDialogTrigger>
        <MizuDialogPortal>
          <MizuDialogOverlay />
          <MizuDialogContent>
            <MizuDialogClose />
            <MizuDialogHeader>
              <MizuDialogTitle>Notification Settings</MizuDialogTitle>
              <MizuDialogDescription>Configure your email notification preferences.</MizuDialogDescription>
            </MizuDialogHeader>
            <MizuDialogBody>
              <p class="body-text">
                Use <code>MizuDialogClose</code> for an X icon close button. It renders a close button
                at the top-right corner of the dialog content panel.
              </p>
            </MizuDialogBody>
            <MizuDialogFooter>
              <MizuButton variant="primary" size="md" class="w-max" @click="closeIconOpen = false">Save Changes</MizuButton>
            </MizuDialogFooter>
          </MizuDialogContent>
        </MizuDialogPortal>
      </MizuDialogRoot>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Confirm with Prompt</h3>
      <DemoTabs :code="confirmCode">
      <MizuDialogRoot v-model:open="formOpen" @update:open="(v: boolean) => { if (v) deleteInput = '' }">
        <MizuDialogTrigger as-child>
          <MizuButton variant="accent" size="md" class="w-max">Delete Invoice</MizuButton>
        </MizuDialogTrigger>
        <MizuDialogPortal>
          <MizuDialogOverlay />
          <MizuDialogContent>
            <MizuDialogHeader>
              <MizuDialogTitle>Delete Invoice</MizuDialogTitle>
              <MizuDialogDescription>
                This action permanently removes this invoice and all associated data. Type
                <strong>delete</strong> to confirm.
              </MizuDialogDescription>
            </MizuDialogHeader>
            <MizuDialogBody>
              <MizuInput
                v-model="deleteInput"
                label='Type "delete" to confirm'
                placeholder="delete"
              />
            </MizuDialogBody>
            <MizuDialogFooter>
              <MizuButton variant="ghost" size="md" class="w-max" @click="formOpen = false">Cancel</MizuButton>
              <MizuButton variant="error" size="md" class="w-max" :disabled="!isDeleteValid" @click="formOpen = false">Delete</MizuButton>
            </MizuDialogFooter>
          </MizuDialogContent>
        </MizuDialogPortal>
      </MizuDialogRoot>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Scrollable Content</h3>
      <DemoTabs :code="scrollableCode">
      <MizuDialogRoot v-model:open="scrollOpen">
        <MizuDialogTrigger as-child>
          <MizuButton variant="accent" size="md" class="w-max">View Details</MizuButton>
        </MizuDialogTrigger>
        <MizuDialogPortal>
          <MizuDialogOverlay />
          <MizuDialogContent>
            <MizuDialogHeader>
              <MizuDialogTitle>Invoice #INV-2026-0042</MizuDialogTitle>
              <MizuDialogDescription>
                Full breakdown of charges and payment terms.
              </MizuDialogDescription>
            </MizuDialogHeader>
            <MizuDialogBody style="max-height: 300px;">
              <div class="detail-row">
                <span class="detail-label">Item</span>
                <span class="detail-value">Enterprise License (Annual)</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Description</span>
                <span class="detail-value">Full-featured ERP platform including CRM, inventory, accounting, HR, and analytics modules.</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Quantity</span>
                <span class="detail-value">1</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Unit Price</span>
                <span class="detail-value">$24,000.00</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Subtotal</span>
                <span class="detail-value">$24,000.00</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Tax (8%)</span>
                <span class="detail-value">$1,920.00</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Discount</span>
                <span class="detail-value">-$2,400.00</span>
              </div>
              <div class="detail-row detail-total">
                <span class="detail-label">Total</span>
                <span class="detail-value">$23,520.00</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Status</span>
                <span class="detail-value">
                  <MizuTag variant="warning" size="sm">Pending</MizuTag>
                </span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Due Date</span>
                <span class="detail-value">Jul 15, 2026</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Payment Terms</span>
                <span class="detail-value">Net 30</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Billing Address</span>
                <span class="detail-value">123 Business Ave, Suite 400, San Francisco, CA 94105</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Notes</span>
                <span class="detail-value">Payment via wire transfer. Please reference invoice number in the payment memo.</span>
              </div>
            </MizuDialogBody>
            <MizuDialogFooter>
              <MizuButton variant="ghost" size="md" class="w-max" @click="scrollOpen = false">Close</MizuButton>
            </MizuDialogFooter>
          </MizuDialogContent>
        </MizuDialogPortal>
      </MizuDialogRoot>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Custom Width</h3>
      <DemoTabs :code="customWidthCode">
      <MizuDialogRoot v-model:open="sizedOpen">
        <MizuDialogTrigger as-child>
          <MizuButton variant="accent" size="md" class="w-max">Large Dialog</MizuButton>
        </MizuDialogTrigger>
        <MizuDialogPortal>
          <MizuDialogOverlay />
          <MizuDialogContent style="max-width: 600px;">
            <MizuDialogHeader>
              <MizuDialogTitle>Order Summary</MizuDialogTitle>
              <MizuDialogDescription>Review your order before submitting.</MizuDialogDescription>
            </MizuDialogHeader>
            <MizuDialogBody>
              <p class="body-text">
                The dialog width can be customized via the <code>style</code> prop on <code>MizuDialogContent</code>. This dialog has <code>max-width: 600px</code> instead of the default 450px.
              </p>
            </MizuDialogBody>
            <MizuDialogFooter>
              <MizuButton variant="ghost" size="md" class="w-max" @click="sizedOpen = false">Cancel</MizuButton>
              <MizuButton variant="primary" size="md" class="w-max" @click="sizedOpen = false">Submit Order</MizuButton>
            </MizuDialogFooter>
          </MizuDialogContent>
        </MizuDialogPortal>
      </MizuDialogRoot>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Complex Content</h3>
      <DemoTabs :code="complexCode">
      <MizuDialogRoot v-model:open="complexOpen">
        <MizuDialogTrigger as-child>
          <MizuButton variant="accent" size="md" class="w-max">Project Settings</MizuButton>
        </MizuDialogTrigger>
        <MizuDialogPortal>
          <MizuDialogOverlay />
          <MizuDialogContent style="max-width: 560px;">
            <MizuDialogClose />
            <MizuDialogHeader>
              <MizuDialogTitle>Project Settings</MizuDialogTitle>
              <MizuDialogDescription>Manage project details, team access, and advanced options.</MizuDialogDescription>
            </MizuDialogHeader>
            <MizuDialogBody style="max-height: 400px;">
              <section class="settings-section">
                <h4 class="settings-heading">General</h4>
                <MizuInput label="Project Name" placeholder="e.g. Mizu Design System" model-value="Mizu Design System" />
                <MizuInput label="Description" placeholder="Brief description of the project" model-value="Enterprise design system and component library" />
              </section>
              <div class="settings-divider" />
              <section class="settings-section">
                <h4 class="settings-heading">Team Members</h4>
                <div class="member-row">
                  <span class="member-name">Alice Chen</span>
                  <MizuTag variant="info" size="sm">Admin</MizuTag>
                </div>
                <div class="member-row">
                  <span class="member-name">Bob Martinez</span>
                  <MizuTag variant="primary" size="sm">Editor</MizuTag>
                </div>
                <div class="member-row">
                  <span class="member-name">Carol Johnson</span>
                  <MizuTag variant="warning" size="sm">Viewer</MizuTag>
                </div>
              </section>
              <div class="settings-divider" />
              <section class="settings-section">
                <h4 class="settings-heading">Danger Zone</h4>
                <p class="settings-hint">
                  Once you delete this project, there is no going back. Please be certain.
                </p>
                <MizuButton variant="error" size="md" class="w-max" @click="complexOpen = false">Delete Project</MizuButton>
              </section>
            </MizuDialogBody>
            <MizuDialogFooter>
              <MizuButton variant="ghost" size="md" class="w-max" @click="complexOpen = false">Cancel</MizuButton>
              <MizuButton variant="primary" size="md" class="w-max" @click="complexOpen = false">Save Changes</MizuButton>
            </MizuDialogFooter>
          </MizuDialogContent>
        </MizuDialogPortal>
      </MizuDialogRoot>
      </DemoTabs>
    </div>
  </div>
</template>

<style scoped>
.dialog-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
  background: transparent;
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
}

.demo-section > div {
  margin-top: 0;
}

.dialog-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-row {
  display: flex;
  gap: 12px;
}

.form-qty {
  flex: 0 0 100px;
}

.form-price {
  flex: 1;
}

.body-text {
  font-size: 14px;
  color: var(--color-foreground-secondary);
  margin: 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-surface-muted);
  font-size: 14px;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  color: var(--color-foreground-secondary);
  flex: 0 0 120px;
}

.detail-value {
  color: var(--color-foreground-primary);
  text-align: right;
}

.detail-total {
  border-top: 2px solid var(--color-foreground-primary);
  margin-top: 4px;
  padding-top: 12px;
  font-weight: 600;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.settings-heading {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-foreground-primary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.settings-hint {
  font-size: 13px;
  color: var(--color-foreground-secondary);
  margin: 0;
}

.settings-divider {
  height: 1px;
  background: var(--color-surface-muted);
  margin: 4px 0;
}

.member-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
}

.member-name {
  font-size: 14px;
  color: var(--color-foreground-primary);
}
</style>
