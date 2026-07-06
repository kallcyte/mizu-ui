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
  MizuDialogHeader,
  MizuDialogBody,
  MizuDialogFooter,
  MizuButton,
  MizuInput,
} from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const basicOpen = ref(false);
const destructiveOpen = ref(false);
const formOpen = ref(false);
const deleteAccountInput = ref("");
const isDeleteAccountValid = computed(() => deleteAccountInput.value === "delete");

const basicCode = `<MizuAlertDialogRoot v-model:open="open">
  <MizuAlertDialogTrigger as-child>
    <MizuButton variant="primary" size="md" class="w-max">Delete Invoice</MizuButton>
  </MizuAlertDialogTrigger>
  <MizuAlertDialogPortal>
    <MizuAlertDialogOverlay />
    <MizuAlertDialogContent>
      <MizuDialogHeader>
        <MizuAlertDialogTitle>Confirm Deletion</MizuAlertDialogTitle>
      </MizuDialogHeader>
      <MizuDialogBody>
        <MizuAlertDialogDescription>
          Are you sure you want to delete this invoice? This action cannot be undone.
        </MizuAlertDialogDescription>
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuAlertDialogCancel as-child>
          <MizuButton variant="ghost" size="md" class="w-max">Cancel</MizuButton>
        </MizuAlertDialogCancel>
        <MizuAlertDialogAction as-child>
          <MizuButton variant="primary" size="md" class="w-max">Delete</MizuButton>
        </MizuAlertDialogAction>
      </MizuDialogFooter>
    </MizuAlertDialogContent>
  </MizuAlertDialogPortal>
</MizuAlertDialogRoot>`;

const destructiveCode = `<MizuAlertDialogRoot v-model:open="open" @update:open="(v: boolean) => { if (v) deleteAccountInput = '' }">
  <MizuAlertDialogTrigger as-child>
    <MizuButton variant="error" size="md" class="w-max">Delete Account</MizuButton>
  </MizuAlertDialogTrigger>
  <MizuAlertDialogPortal>
    <MizuAlertDialogOverlay />
    <MizuAlertDialogContent>
      <MizuDialogHeader>
        <MizuAlertDialogTitle>Delete Account</MizuAlertDialogTitle>
        <MizuAlertDialogDescription>
          This permanently removes your account and all associated data. Type <strong>delete</strong> to confirm.
        </MizuAlertDialogDescription>
      </MizuDialogHeader>
      <MizuDialogBody>
        <MizuInput
          v-model="deleteAccountInput"
          label='Type "delete" to confirm'
          placeholder="delete"
        />
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuAlertDialogCancel as-child>
          <MizuButton variant="ghost" size="md" class="w-max">Cancel</MizuButton>
        </MizuAlertDialogCancel>
        <MizuAlertDialogAction as-child>
          <MizuButton variant="error" size="md" class="w-max" :disabled="!isDeleteAccountValid">Delete Account</MizuButton>
        </MizuAlertDialogAction>
      </MizuDialogFooter>
    </MizuAlertDialogContent>
  </MizuAlertDialogPortal>
</MizuAlertDialogRoot>`;

const contentCode = `<MizuAlertDialogRoot v-model:open="open">
  <MizuAlertDialogTrigger as-child>
    <MizuButton variant="primary" size="md" class="w-max">Discard Changes</MizuButton>
  </MizuAlertDialogTrigger>
  <MizuAlertDialogPortal>
    <MizuAlertDialogOverlay />
    <MizuAlertDialogContent>
      <MizuDialogHeader>
        <MizuAlertDialogTitle>Discard unsaved changes?</MizuAlertDialogTitle>
        <MizuAlertDialogDescription>
          You have unsaved changes that will be lost if you leave this page.
        </MizuAlertDialogDescription>
      </MizuDialogHeader>
      <MizuDialogBody>
        <ul class="changes-list">
          <li>Updated invoice #INV-2026-0042 line items</li>
          <li>Modified client billing address</li>
          <li>Added new tax rate (9.5%)</li>
        </ul>
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuAlertDialogCancel as-child>
          <MizuButton variant="primary" size="md" class="w-max">Keep Editing</MizuButton>
        </MizuAlertDialogCancel>
        <MizuAlertDialogAction as-child>
          <MizuButton variant="ghost" size="md" class="w-max">Discard</MizuButton>
        </MizuAlertDialogAction>
      </MizuDialogFooter>
    </MizuAlertDialogContent>
  </MizuAlertDialogPortal>
</MizuAlertDialogRoot>`;
</script>

<template>
  <div class="alert-dialog-demo not-content">
    <div class="demo-section">
      <h3>Basic Confirmation</h3>
      <DemoTabs :code="basicCode">
        <MizuAlertDialogRoot v-model:open="basicOpen">
          <MizuAlertDialogTrigger as-child>
            <MizuButton variant="primary" size="md" class="w-max">Delete Invoice</MizuButton>
          </MizuAlertDialogTrigger>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent>
              <MizuDialogHeader>
                <MizuAlertDialogTitle>Confirm Deletion</MizuAlertDialogTitle>
              </MizuDialogHeader>
              <MizuDialogBody>
                <MizuAlertDialogDescription>
                  Are you sure you want to delete this invoice? This action cannot be undone.
                </MizuAlertDialogDescription>
              </MizuDialogBody>
              <MizuDialogFooter>
                <MizuAlertDialogCancel as-child>
                  <MizuButton variant="ghost" size="md" class="w-max">Cancel</MizuButton>
                </MizuAlertDialogCancel>
                <MizuAlertDialogAction as-child>
                  <MizuButton variant="primary" size="md" class="w-max">Delete</MizuButton>
                </MizuAlertDialogAction>
              </MizuDialogFooter>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Destructive Action</h3>
      <DemoTabs :code="destructiveCode">
        <MizuAlertDialogRoot v-model:open="destructiveOpen" @update:open="(v: boolean) => { if (v) deleteAccountInput = '' }">
          <MizuAlertDialogTrigger as-child>
            <MizuButton variant="error" size="md" class="w-max">Delete Account</MizuButton>
          </MizuAlertDialogTrigger>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent>
              <MizuDialogHeader>
                <MizuAlertDialogTitle>Delete Account</MizuAlertDialogTitle>
                <MizuAlertDialogDescription>
                  This permanently removes your account and all associated data. Type <strong>delete</strong> to confirm.
                </MizuAlertDialogDescription>
              </MizuDialogHeader>
              <MizuDialogBody>
                <MizuInput
                  v-model="deleteAccountInput"
                  label='Type "delete" to confirm'
                  placeholder="delete"
                />
              </MizuDialogBody>
              <MizuDialogFooter>
                <MizuAlertDialogCancel as-child>
                  <MizuButton variant="ghost" size="md" class="w-max">Cancel</MizuButton>
                </MizuAlertDialogCancel>
                <MizuAlertDialogAction as-child>
                  <MizuButton variant="error" size="md" class="w-max" :disabled="!isDeleteAccountValid">Delete Account</MizuButton>
                </MizuAlertDialogAction>
              </MizuDialogFooter>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>With Additional Content</h3>
      <DemoTabs :code="contentCode">
        <MizuAlertDialogRoot v-model:open="formOpen">
          <MizuAlertDialogTrigger as-child>
            <MizuButton variant="primary" size="md" class="w-max">Discard Changes</MizuButton>
          </MizuAlertDialogTrigger>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent>
              <MizuDialogHeader>
                <MizuAlertDialogTitle>Discard unsaved changes?</MizuAlertDialogTitle>
                <MizuAlertDialogDescription>
                  You have unsaved changes that will be lost if you leave this page.
                </MizuAlertDialogDescription>
              </MizuDialogHeader>
              <MizuDialogBody>
                <ul class="changes-list">
                  <li>Updated invoice #INV-2026-0042 line items</li>
                  <li>Modified client billing address</li>
                  <li>Added new tax rate (9.5%)</li>
                </ul>
              </MizuDialogBody>
              <MizuDialogFooter>
                <MizuAlertDialogCancel as-child>
                  <MizuButton variant="primary" size="md" class="w-max">Keep Editing</MizuButton>
                </MizuAlertDialogCancel>
                <MizuAlertDialogAction as-child>
                  <MizuButton variant="ghost" size="md" class="w-max">Discard</MizuButton>
                </MizuAlertDialogAction>
              </MizuDialogFooter>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
      </DemoTabs>
    </div>
  </div>
</template>

<style scoped>
.alert-dialog-demo {
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
