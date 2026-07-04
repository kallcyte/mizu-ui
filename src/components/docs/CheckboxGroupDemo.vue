<script setup lang="ts">
import { ref } from "vue";
import { MizuCheckboxGroup } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const notifications = ref(["email"]);
const notificationOptions = [
  { value: "email", label: "Email notifications" },
  { value: "sms", label: "SMS notifications" },
  { value: "push", label: "Push notifications" },
];

const roles = ref(["admin"]);
const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
  { value: "guest", label: "Guest (read-only)", disabled: true },
];

const horizontal = ref(["option1", "option3"]);
const horizontalOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

const basicCode = `<MizuCheckboxGroup
  v-model="notifications"
  :options="notificationOptions"
  legend="Notification preferences"
/>`;

const disabledOptionCode = `<MizuCheckboxGroup
  v-model="roles"
  :options="roleOptions"
  legend="Assign roles"
/>`;

const horizontalCode = `<MizuCheckboxGroup
  v-model="horizontal"
  :options="horizontalOptions"
  orientation="horizontal"
  legend="Select options"
/>`;
</script>

<template>
  <div class="checkbox-group-demo not-content">
    <div class="demo-section">
      <h3>Basic (Vertical)</h3>
      <DemoTabs :code="basicCode">
      <MizuCheckboxGroup
        v-model="notifications"
        :options="notificationOptions"
        legend="Notification preferences"
      />
      <p class="demo-value">Selected: {{ notifications.join(', ') || 'none' }}</p>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>With Disabled Option</h3>
      <DemoTabs :code="disabledOptionCode">
      <MizuCheckboxGroup
        v-model="roles"
        :options="roleOptions"
        legend="Assign roles"
      />
      <p class="demo-value">Selected: {{ roles.join(', ') || 'none' }}</p>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Horizontal Layout</h3>
      <DemoTabs :code="horizontalCode">
      <MizuCheckboxGroup
        v-model="horizontal"
        :options="horizontalOptions"
        orientation="horizontal"
        legend="Select options"
      />
      <p class="demo-value">Selected: {{ horizontal.join(', ') || 'none' }}</p>
      </DemoTabs>
    </div>
  </div>
</template>

<style scoped>
.checkbox-group-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
  background: transparent;
}
.checkbox-group-demo :deep(*) { margin: 0; }
.demo-section { display: flex; flex-direction: column; gap: 12px; }
.demo-section h3 { font-size: 14px; font-weight: 600; color: var(--sl-color-text); margin-bottom: 0; }
.demo-section > p { margin-top: 0; }
.demo-value {
  font-size: 12px;
  color: var(--sl-color-text-light);
  font-family: monospace;
  margin-top: 8px;
}
</style>
