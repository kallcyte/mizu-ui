<script setup lang="ts">
import { ref } from "vue";
import { MizuTextarea, MizuButton } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const basic = ref("");
const withPlaceholder = ref("");
const withLabel = ref("This is some pre-filled content.");

const sizeSm = ref("");
const sizeMd = ref("");
const sizeLg = ref("");

const errorValue = ref("");
const disabledValue = ref("Disabled textarea content");
const rowsValue = ref("");

const feedback = ref("");
const notes = ref("");
const bio = ref("");

function handleSubmit() {
  alert(`Feedback: ${feedback.value}\nBio: ${bio.value}`);
}

const basicCode = `<MizuTextarea v-model="basic" />
<MizuTextarea v-model="withPlaceholder" placeholder="Enter your message..." />
<MizuTextarea v-model="withLabel" label="Description" />`;

const sizesCode = `<MizuTextarea v-model="sizeSm" size="sm" label="Small" placeholder="Small textarea" />
<MizuTextarea v-model="sizeMd" size="md" label="Medium" placeholder="Medium textarea" />
<MizuTextarea v-model="sizeLg" size="lg" label="Large" placeholder="Large textarea" />`;

const statesCode = `<MizuTextarea v-model="errorValue" label="With Error" error helper-text="This field has an error" />
<MizuTextarea v-model="disabledValue" label="Disabled" disabled />
<MizuTextarea v-model="rowsValue" label="Custom Rows (5)" :rows="5" placeholder="5 rows tall" />`;

const formCode = `<MizuTextarea
  v-model="feedback"
  label="Feedback"
  placeholder="Tell us what you think..."
  helper-text="Your feedback helps us improve"
  required
/>
<MizuTextarea
  v-model="bio"
  label="Short Bio"
  placeholder="A brief description about yourself"
  :rows="4"
/>
<MizuButton size="sm" @click="handleSubmit">Submit</MizuButton>`;
</script>

<template>
  <div class="textarea-demo not-content">
    <DemoTabs :code="basicCode">
      <div class="demo-section">
        <h3>Basic</h3>
        <div class="textarea-stack">
          <MizuTextarea v-model="basic" />
          <MizuTextarea v-model="withPlaceholder" placeholder="Enter your message..." />
          <MizuTextarea v-model="withLabel" label="Description" />
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="sizesCode">
      <div class="demo-section">
        <h3>Sizes</h3>
        <div class="textarea-stack">
          <MizuTextarea v-model="sizeSm" size="sm" label="Small" placeholder="Small textarea" />
          <MizuTextarea v-model="sizeMd" size="md" label="Medium" placeholder="Medium textarea" />
          <MizuTextarea v-model="sizeLg" size="lg" label="Large" placeholder="Large textarea" />
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="statesCode">
      <div class="demo-section">
        <h3>States</h3>
        <div class="textarea-stack">
          <MizuTextarea v-model="errorValue" label="With Error" error helper-text="This field has an error" />
          <MizuTextarea v-model="disabledValue" label="Disabled" disabled />
          <MizuTextarea v-model="rowsValue" label="Custom Rows (5)" :rows="5" placeholder="5 rows tall" />
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="formCode">
      <div class="demo-section">
        <h3>Form Example</h3>
        <div class="textarea-stack">
          <MizuTextarea
            v-model="feedback"
            label="Feedback"
            placeholder="Tell us what you think..."
            helper-text="Your feedback helps us improve"
            required
          />
          <MizuTextarea
            v-model="bio"
            label="Short Bio"
            placeholder="A brief description about yourself"
            :rows="4"
          />
          <div>
            <MizuButton size="sm" @click="handleSubmit">Submit</MizuButton>
          </div>
        </div>
      </div>
    </DemoTabs>
  </div>
</template>

<style scoped>
.textarea-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: transparent;

  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
}

.textarea-demo :deep(*) {
  margin: 0;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.textarea-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}
</style>
