<script setup lang="ts">
import { ref, computed } from "vue";
import {
  MizuAlertDialogRoot,
  MizuAlertDialogPortal,
  MizuAlertDialogOverlay,
  MizuAlertDialogContent,
  MizuAlertDialogTitle,
  MizuAlertDialogDescription,
  MizuAlertDialogAction,
  MizuAlertDialogCancel,
  MizuAlertDialogTrigger,
} from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicOpen = ref(false);
const destructiveOpen = ref(false);
const formOpen = ref(false);
const deleteAccountInput = ref("");
const isDeleteAccountValid = computed(() => deleteAccountInput.value === "delete");

const basicCode = `<MizuAlertDialogRoot v-model:open="open">
  <MizuAlertDialogTrigger as-child>
    <button variant="primary" size="md" class="w-max">Delete Invoice</button>
  </MizuAlertDialogTrigger>
  <MizuAlertDialogPortal>
    <MizuAlertDialogOverlay />
    <MizuAlertDialogContent>
      <div class="demo-header">
        <MizuAlertDialogTitle>Confirm Deletion</MizuAlertDialogTitle>
      </div>
      <div class="demo-body">
        <MizuAlertDialogDescription>
          Are you sure you want to delete this invoice? This action cannot be undone.
        </MizuAlertDialogDescription>
      </div>
      <div class="demo-footer">
        <MizuAlertDialogCancel as-child>
          <button variant="ghost" size="md" class="w-max">Cancel</button>
        </MizuAlertDialogCancel>
        <MizuAlertDialogAction as-child>
          <button variant="primary" size="md" class="w-max">Delete</button>
        </MizuAlertDialogAction>
      </div>
    </MizuAlertDialogContent>
  </MizuAlertDialogPortal>
</MizuAlertDialogRoot>`;

const destructiveCode = `<MizuAlertDialogRoot v-model:open="open" @update:open="(v: boolean) => { if (v) deleteAccountInput = '' }">
  <MizuAlertDialogTrigger as-child>
    <button variant="error" size="md" class="w-max">Delete Account</button>
  </MizuAlertDialogTrigger>
  <MizuAlertDialogPortal>
    <MizuAlertDialogOverlay />
    <MizuAlertDialogContent>
      <div class="demo-header">
        <MizuAlertDialogTitle>Delete Account</MizuAlertDialogTitle>
        <MizuAlertDialogDescription>
          This permanently removes your account and all associated data. Type <strong>delete</strong> to confirm.
        </MizuAlertDialogDescription>
      </div>
      <div class="demo-body">
        <input
          v-model="deleteAccountInput"
          label='Type "delete" to confirm'
          placeholder="delete"
        />
      </div>
      <div class="demo-footer">
        <MizuAlertDialogCancel as-child>
          <button variant="ghost" size="md" class="w-max">Cancel</button>
        </MizuAlertDialogCancel>
        <MizuAlertDialogAction as-child>
          <button variant="error" size="md" class="w-max" :disabled="!isDeleteAccountValid">Delete Account</button>
        </MizuAlertDialogAction>
      </div>
    </MizuAlertDialogContent>
  </MizuAlertDialogPortal>
</MizuAlertDialogRoot>`;

const contentCode = `<MizuAlertDialogRoot v-model:open="open">
  <MizuAlertDialogTrigger as-child>
    <button variant="primary" size="md" class="w-max">Discard Changes</button>
  </MizuAlertDialogTrigger>
  <MizuAlertDialogPortal>
    <MizuAlertDialogOverlay />
    <MizuAlertDialogContent>
      <div class="demo-header">
        <MizuAlertDialogTitle>Discard unsaved changes?</MizuAlertDialogTitle>
        <MizuAlertDialogDescription>
          You have unsaved changes that will be lost if you leave this page.
        </MizuAlertDialogDescription>
      </div>
      <div class="demo-body">
        <ul class="changes-list">
          <li>Updated invoice #INV-2026-0042 line items</li>
          <li>Modified client billing address</li>
          <li>Added new tax rate (9.5%)</li>
        </ul>
      </div>
      <div class="demo-footer">
        <MizuAlertDialogCancel as-child>
          <button variant="primary" size="md" class="w-max">Keep Editing</button>
        </MizuAlertDialogCancel>
        <MizuAlertDialogAction as-child>
          <button variant="ghost" size="md" class="w-max">Discard</button>
        </MizuAlertDialogAction>
      </div>
    </MizuAlertDialogContent>
  </MizuAlertDialogPortal>
</MizuAlertDialogRoot>`;
</script>

<template>
  <div class="alert-dialog-examples">
    <section class="example-section">
      <h3>Basic Confirmation</h3>
      <CodeCollapsible :code="basicCode">
        <MizuAlertDialogRoot v-model:open="basicOpen">
          <MizuAlertDialogTrigger as-child>
            <button variant="primary" size="md" class="w-max">Delete Invoice</button>
          </MizuAlertDialogTrigger>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent>
              <div class="demo-header">
                <MizuAlertDialogTitle>Confirm Deletion</MizuAlertDialogTitle>
              </div>
              <div class="demo-body">
                <MizuAlertDialogDescription>
                  Are you sure you want to delete this invoice? This action cannot be undone.
                </MizuAlertDialogDescription>
              </div>
              <div class="demo-footer">
                <MizuAlertDialogCancel as-child>
                  <button variant="ghost" size="md" class="w-max">Cancel</button>
                </MizuAlertDialogCancel>
                <MizuAlertDialogAction as-child>
                  <button variant="primary" size="md" class="w-max">Delete</button>
                </MizuAlertDialogAction>
              </div>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Destructive Action</h3>
      <CodeCollapsible :code="destructiveCode">
        <MizuAlertDialogRoot
          v-model:open="destructiveOpen"
          @update:open="
            (v: boolean) => {
              if (v) deleteAccountInput = '';
            }
          "
        >
          <MizuAlertDialogTrigger as-child>
            <button variant="error" size="md" class="w-max">Delete Account</button>
          </MizuAlertDialogTrigger>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent>
              <div class="demo-header">
                <MizuAlertDialogTitle>Delete Account</MizuAlertDialogTitle>
                <MizuAlertDialogDescription>
                  This permanently removes your account and all associated data. Type
                  <strong>delete</strong> to confirm.
                </MizuAlertDialogDescription>
              </div>
              <div class="demo-body">
                <input
                  v-model="deleteAccountInput"
                  label='Type "delete" to confirm'
                  placeholder="delete"
                />
              </div>
              <div class="demo-footer">
                <MizuAlertDialogCancel as-child>
                  <button variant="ghost" size="md" class="w-max">Cancel</button>
                </MizuAlertDialogCancel>
                <MizuAlertDialogAction as-child>
                  <button
                    variant="error"
                    size="md"
                    class="w-max"
                    :disabled="!isDeleteAccountValid"
                    >Delete Account</button
                  >
                </MizuAlertDialogAction>
              </div>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Additional Content</h3>
      <CodeCollapsible :code="contentCode">
        <MizuAlertDialogRoot v-model:open="formOpen">
          <MizuAlertDialogTrigger as-child>
            <button variant="primary" size="md" class="w-max">Discard Changes</button>
          </MizuAlertDialogTrigger>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent>
              <div class="demo-header">
                <MizuAlertDialogTitle>Discard unsaved changes?</MizuAlertDialogTitle>
                <MizuAlertDialogDescription>
                  You have unsaved changes that will be lost if you leave this page.
                </MizuAlertDialogDescription>
              </div>
              <div class="demo-body">
                <ul class="changes-list">
                  <li>Updated invoice #INV-2026-0042 line items</li>
                  <li>Modified client billing address</li>
                  <li>Added new tax rate (9.5%)</li>
                </ul>
              </div>
              <div class="demo-footer">
                <MizuAlertDialogCancel as-child>
                  <button variant="primary" size="md" class="w-max">Keep Editing</button>
                </MizuAlertDialogCancel>
                <MizuAlertDialogAction as-child>
                  <button variant="ghost" size="md" class="w-max">Discard</button>
                </MizuAlertDialogAction>
              </div>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.alert-dialog-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.alert-dialog-examples :deep(*) {
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

.changes-list {
  margin: 0;
  padding-left: 20px;
  font-size: 14px;
  color: var(--color-foreground-primary);
}

.changes-list li {
  padding: 4px 0;
}
</style>
