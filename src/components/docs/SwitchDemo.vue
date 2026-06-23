<script setup lang="ts">
import { ref } from "vue";
import { MizuSwitch } from "@mizu/vue";

const basic = ref(true);
const unchecked = ref(false);
const withLabel = ref(true);
const disabledUnchecked = ref(false);
const disabledChecked = ref(true);

const sizeSm = ref(true);
const sizeMd = ref(true);
const sizeLg = ref(true);

const notifications = ref(true);
const darkMode = ref(false);
const autoSave = ref(true);

const customYes = ref("yes");
</script>

<template>
  <div class="switch-demo">
    <div class="demo-section">
      <h3>Basic</h3>
      <div class="switch-stack">
        <MizuSwitch v-model="basic" />
        <MizuSwitch v-model="unchecked" label="Notifications" />
        <MizuSwitch v-model="withLabel" label="Enable dark mode" />
        <MizuSwitch v-model="disabledUnchecked" disabled label="Disabled" />
        <MizuSwitch v-model="disabledChecked" disabled label="Disabled & checked" />
      </div>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <div class="switch-stack">
        <MizuSwitch v-model="sizeSm" size="sm" label="Small" />
        <MizuSwitch v-model="sizeMd" size="md" label="Medium" />
        <MizuSwitch v-model="sizeLg" size="lg" label="Large" />
      </div>
    </div>

    <div class="demo-section">
      <h3>Settings Example</h3>
      <div class="switch-stack">
        <MizuSwitch v-model="notifications" label="Push notifications" />
        <MizuSwitch v-model="darkMode" label="Dark mode" />
        <MizuSwitch v-model="autoSave" label="Auto-save" />
      </div>
    </div>

    <div class="demo-section">
      <h3>Custom Values</h3>
      <div class="switch-stack">
        <MizuSwitch
          v-model="customYes"
          true-value="yes"
          false-value="no"
          label="Custom values (yes/no)"
        />
        <p class="demo-text">Value: <code>{{ customYes }}</code></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.switch-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: var(--sl-color-gray-2);
  border-radius: 8px;
}

.switch-demo :deep(*) {
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

.switch-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.demo-text {
  font-size: 12px;
  color: var(--sl-color-text);
  margin: 0;
}

.demo-text code {
  background: var(--sl-color-gray-3);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: var(--sl-font-mono);
  font-size: 12px;
}
</style>
