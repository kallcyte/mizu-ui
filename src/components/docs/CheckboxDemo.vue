<script setup lang="ts">
import { computed, ref } from "vue";
import { MizuCheckbox, MizuButton } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicUnchecked = ref(false);
const basicChecked = ref(false);
const withLabelChecked = ref(true);
const disabledUnchecked = ref(false);
const disabledChecked = ref(true);

const sizeSm = ref(false);
const sizeMd = ref(true);
const sizeLg = ref(false);

const stateUnchecked = ref(false);
const stateChecked = ref(true);
const stateIndeterminate = ref("indeterminate" as boolean | "indeterminate");
const stateDisabled = ref(false);
const stateDisabledChecked = ref(true);

const formTerms = ref(false);
const formNewsletter = ref(false);
const formUpdates = ref(false);

const selectAllState = ref<boolean | "indeterminate">("indeterminate");

const emailEnabled = ref(true);
const smsEnabled = ref(false);
const pushEnabled = ref(true);
const channelRefs = [emailEnabled, smsEnabled, pushEnabled];

const selectedCount = computed(
    () => channelRefs.filter((c) => c.value === true).length,
);
const allChannelsSelected = computed(
    () => selectedCount.value === channelRefs.length,
);
const someChannelsSelected = computed(() => selectedCount.value > 0);

const channelsParentState = computed<boolean | "indeterminate">({
    get() {
        if (allChannelsSelected.value) return true;
        if (someChannelsSelected.value) return "indeterminate";
        return false;
    },
    set(value) {
        const next = value === true;
        for (const c of channelRefs) c.value = next;
    },
});

const customString = ref("no");
const customNumber = ref(0);

const keepSignedIn = ref(true);
const agreeToTerms = ref(false);

const acceptTermsTrue = computed(() => customString.value === "yes");
const permissionValue = computed(() => customNumber.value);

function toggleIndeterminate() {
    selectAllState.value =
        selectAllState.value === "indeterminate" ? false : "indeterminate";
}

const basicCode = `<MizuCheckbox v-model="checked" />
<MizuCheckbox v-model="checked" label="Subscribe" />
<MizuCheckbox v-model="checked" label="Remember me" />
<MizuCheckbox v-model="checked" disabled label="Disabled unchecked" />
<MizuCheckbox v-model="checked" disabled label="Disabled checked" />`;

const sizesCode = `<MizuCheckbox v-model="checked" size="sm" label="Small (16px)" />
<MizuCheckbox v-model="checked" size="md" label="Medium (18px)" />
<MizuCheckbox v-model="checked" size="lg" label="Large (20px)" />`;

const statesCode = `<MizuCheckbox v-model="checked" label="Unchecked" />
<MizuCheckbox v-model="checked" label="Checked" />
<MizuCheckbox v-model="value" label="Indeterminate" />
<MizuCheckbox v-model="checked" disabled label="Disabled" />
<MizuCheckbox v-model="checked" disabled label="Disabled & checked" />`;

const formLabelsCode = `<MizuCheckbox
  v-model="formTerms"
  required
  label="I accept the terms and conditions"
/>
<MizuCheckbox
  v-model="formNewsletter"
  required
  label="Subscribe to the newsletter"
/>
<MizuCheckbox
  v-model="formUpdates"
  label="Receive product updates by email"
/>`;

const indeterminateCode = `<MizuCheckbox
  v-model="selectAllState"
  label="Select all items in this list"
/>
<p class="demo-text">State: <code>{{ selectAllState }}</code></p>
<MizuButton size="sm" variant="outline" @click="toggleIndeterminate">
  Toggle Indeterminate
</MizuButton>`;

const selectAllCode = `<MizuCheckbox
  v-model="channelsParentState"
  label="Notification preferences"
/>
<div class="checkbox-children">
  <MizuCheckbox v-model="emailEnabled" label="EMAIL" />
  <MizuCheckbox v-model="smsEnabled" label="SMS" />
  <MizuCheckbox v-model="pushEnabled" label="PUSH" />
</div>
<p class="demo-text">
  Selected: <code>{{ selectedCount }}</code> of
  <code>{{ channelRefs.length }}</code>
</p>`;

const customValuesCode = `<MizuCheckbox
  v-model="customString"
  true-value="yes"
  false-value="no"
  label="Accept terms"
/>
<p class="demo-text">
  Value: <code>{{ customString }}</code> (resolved boolean: <code>{{ acceptTermsTrue }}</code>)
</p>
<MizuCheckbox
  v-model="customNumber"
  :true-value="1"
  :false-value="0"
  label="Grant permission"
/>
<p class="demo-text">
  Value: <code>{{ customNumber }}</code>
</p>`;

const loginFormCode = `<MizuCheckbox
  v-model="keepSignedIn"
  label="Keep me signed in on this device"
/>
<MizuCheckbox
  v-model="agreeToTerms"
  required
  label="I agree to the Terms of Service and Privacy Policy"
/>`;
</script>

<template>
  <div class="checkbox-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <div class="checkbox-stack">
          <MizuCheckbox v-model="basicUnchecked" />
          <MizuCheckbox v-model="basicChecked" label="Subscribe" />
          <MizuCheckbox v-model="withLabelChecked" label="Remember me" />
          <MizuCheckbox v-model="disabledUnchecked" disabled label="Disabled unchecked" />
          <MizuCheckbox v-model="disabledChecked" disabled label="Disabled checked" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="checkbox-stack">
          <MizuCheckbox v-model="sizeSm" size="sm" label="Small (16px)" />
          <MizuCheckbox v-model="sizeMd" size="md" label="Medium (18px)" />
          <MizuCheckbox v-model="sizeLg" size="lg" label="Large (20px)" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>States</h3>
      <CodeCollapsible :code="statesCode">
        <div class="checkbox-stack">
          <MizuCheckbox v-model="stateUnchecked" label="Unchecked" />
          <MizuCheckbox v-model="stateChecked" label="Checked" />
          <MizuCheckbox v-model="stateIndeterminate" label="Indeterminate" />
          <MizuCheckbox v-model="stateDisabled" disabled label="Disabled" />
          <MizuCheckbox v-model="stateDisabledChecked" disabled label="Disabled & checked" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Form Labels</h3>
      <CodeCollapsible :code="formLabelsCode">
        <div class="checkbox-stack">
          <MizuCheckbox
            v-model="formTerms"
            required
            label="I accept the terms and conditions"
          />
          <MizuCheckbox
            v-model="formNewsletter"
            required
            label="Subscribe to the newsletter"
          />
          <MizuCheckbox
            v-model="formUpdates"
            label="Receive product updates by email"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Indeterminate</h3>
      <CodeCollapsible :code="indeterminateCode">
        <div class="checkbox-stack">
          <MizuCheckbox
            v-model="selectAllState"
            label="Select all items in this list"
          />
          <p class="demo-text">
            State: <code>{{ selectAllState }}</code>
          </p>
          <MizuButton size="sm" variant="outline" @click="toggleIndeterminate">
            Toggle Indeterminate
          </MizuButton>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Select All with Children</h3>
      <CodeCollapsible :code="selectAllCode">
        <div class="checkbox-stack">
          <MizuCheckbox
            v-model="channelsParentState"
            label="Notification preferences"
          />
          <div class="checkbox-children">
            <MizuCheckbox
              v-model="emailEnabled"
              label="EMAIL"
            />
            <MizuCheckbox
              v-model="smsEnabled"
              label="SMS"
            />
            <MizuCheckbox
              v-model="pushEnabled"
              label="PUSH"
            />
          </div>
          <p class="demo-text">
            Selected: <code>{{ selectedCount }}</code> of
            <code>{{ channelRefs.length }}</code>
          </p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Values</h3>
      <CodeCollapsible :code="customValuesCode">
        <div class="checkbox-stack">
          <MizuCheckbox
            v-model="customString"
            true-value="yes"
            false-value="no"
            label="Accept terms"
          />
          <p class="demo-text">
            Value: <code>{{ customString }}</code> (resolved boolean: <code>{{ acceptTermsTrue }}</code>)
          </p>
          <MizuCheckbox
            v-model="customNumber"
            :true-value="1"
            :false-value="0"
            label="Grant permission"
          />
          <p class="demo-text">
            Value: <code>{{ customNumber }}</code>
          </p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Login Form Example</h3>
      <CodeCollapsible :code="loginFormCode">
        <div class="checkbox-stack">
          <MizuCheckbox
            v-model="keepSignedIn"
            label="Keep me signed in on this device"
          />
          <MizuCheckbox
            v-model="agreeToTerms"
            required
            label="I agree to the Terms of Service and Privacy Policy"
          />
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.checkbox-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.checkbox-examples :deep(*) {
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

.checkbox-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.checkbox-children {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 24px;
  border-left: 1px solid var(--sl-color-gray-4);
  margin-left: 4px;
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
