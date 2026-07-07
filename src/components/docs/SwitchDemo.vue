<script setup lang="ts">
import { ref } from "vue";
import { MizuSwitch } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

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

const basicCode = `<MizuSwitch v-model="basic" />
<MizuSwitch v-model="unchecked" label="Notifications" />
<MizuSwitch v-model="withLabel" label="Enable dark mode" />
<MizuSwitch v-model="disabledUnchecked" disabled label="Disabled" />
<MizuSwitch v-model="disabledChecked" disabled label="Disabled & checked" />`;

const sizesCode = `<MizuSwitch v-model="sizeSm" size="sm" label="Small" />
<MizuSwitch v-model="sizeMd" size="md" label="Medium" />
<MizuSwitch v-model="sizeLg" size="lg" label="Large" />`;

const settingsCode = `<MizuSwitch v-model="notifications" label="Push notifications" />
<MizuSwitch v-model="darkMode" label="Dark mode" />
<MizuSwitch v-model="autoSave" label="Auto-save" />`;

const customValuesCode = `<MizuSwitch
  v-model="customYes"
  true-value="yes"
  false-value="no"
  label="Custom values (yes/no)"
/>`;
</script>

<template>
  <div class="switch-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <div class="switch-stack">
          <MizuSwitch v-model="basic" />
          <MizuSwitch v-model="unchecked" label="Notifications" />
          <MizuSwitch v-model="withLabel" label="Enable dark mode" />
          <MizuSwitch v-model="disabledUnchecked" disabled label="Disabled" />
          <MizuSwitch v-model="disabledChecked" disabled label="Disabled & checked" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="switch-stack">
          <MizuSwitch v-model="sizeSm" size="sm" label="Small" />
          <MizuSwitch v-model="sizeMd" size="md" label="Medium" />
          <MizuSwitch v-model="sizeLg" size="lg" label="Large" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Settings Example</h3>
      <CodeCollapsible :code="settingsCode">
        <div class="switch-stack">
          <MizuSwitch v-model="notifications" label="Push notifications" />
          <MizuSwitch v-model="darkMode" label="Dark mode" />
          <MizuSwitch v-model="autoSave" label="Auto-save" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Values</h3>
      <CodeCollapsible :code="customValuesCode">
        <div class="switch-stack">
          <MizuSwitch
            v-model="customYes"
            true-value="yes"
            false-value="no"
            label="Custom values (yes/no)"
          />
          <p class="demo-text">Value: <code>{{ customYes }}</code></p>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.switch-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.switch-examples :deep(*) {
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
