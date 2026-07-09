<script setup lang="ts">
import { ref, computed } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const inputValue = ref("");
const emailValue = ref("");
const passwordValue = ref("");
const clearableValue = ref("");
const copyValue = ref("Copy this text");
const copyDone = ref(false);
const showPassword = ref(false);
const passwordStrengthValue = ref("");
const charLimitValue = ref("");
const floatingLabelValue = ref("");
const formFieldValue = ref("");
const requiredFieldValue = ref("");
const fieldGroupLeft = ref("");
const fieldGroupRight = ref("");

const countries = [
  { code: "+1", label: "+1" },
  { code: "+44", label: "+44" },
  { code: "+81", label: "+81" },
];

const charCount = computed(() => charLimitValue.value.length);

const passwordStrength = computed(() => {
  const v = passwordStrengthValue.value;
  if (!v) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (v.length >= 6) score++;
  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["#DC2626", "#F59E0B", "#F59E0B", "#16A34A", "#16A34A"];
  const idx = Math.min(score, 4);
  return { score: idx + 1, label: labels[idx], color: colors[idx] };
});

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(copyValue.value);
    copyDone.value = true;
    setTimeout(() => { copyDone.value = false; }, 2000);
  } catch { /* clipboard unavailable */ }
}

// â”€â”€ Code block strings â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const sizesCode = `<UInput size="sm" placeholder="Small input" />
<UInput size="md" placeholder="Medium input" />
<UInput size="lg" placeholder="Large input" />`;

const typeCode = `<UInput type="text" placeholder="Text input" />
<UInput type="password" placeholder="Password" />
<UInput type="number" placeholder="Number" />
<UInput type="file" />`;

const placeholderCode = `<UInput placeholder="Enter your name" />`;

const colorCode = `<UInput color="primary" placeholder="Primary" highlight />
<UInput color="secondary" placeholder="Secondary" highlight />
<UInput color="success" placeholder="Success" highlight />
<UInput color="error" placeholder="Error" highlight />
<UInput color="warning" placeholder="Warning" highlight />
<UInput color="info" placeholder="Info" highlight />
<UInput color="neutral" placeholder="Neutral" highlight />`;

const variantCode = `<UInput variant="outline" placeholder="Outline" />
<UInput variant="soft" placeholder="Soft" />
<UInput variant="subtle" placeholder="Subtle" />
<UInput variant="ghost" placeholder="Ghost" />
<UInput variant="none" placeholder="None" />`;

const iconCode = `<UInput icon="i-ph-magnifying-glass" placeholder="Search..." />
<UInput icon="i-ph-envelope" placeholder="Email" trailing />
<UInput leading-icon="i-ph-user" trailing-icon="i-ph-check" placeholder="Username" />`;

const loadingCode = `<UInput loading placeholder="Loading..." />
<UInput loading icon="i-ph-envelope" placeholder="Loading..." />`;

const disabledCode = `<UInput disabled placeholder="Disabled input" />`;

const clearableCode = `<UInput v-model="value" placeholder="Type something...">
  <template #trailing>
    <UButton
      v-if="value"
      icon="i-ph-x"
      size="xs"
      variant="link"
      color="neutral"
      @click="value = ''"
    />
  </template>
</UInput>`;

const copyCode = `<UInput v-model="value" readonly>
  <template #trailing>
    <UButton
      :icon="copied ? 'i-ph-check' : 'i-ph-copy'"
      size="xs"
      variant="link"
      color="neutral"
      @click="copyToClipboard"
    />
  </template>
</UInput>`;

const passwordToggleCode = `<UInput :type="show ? 'text' : 'password'" placeholder="Password">
  <template #trailing>
    <UButton
      :icon="show ? 'i-ph-eye-slash' : 'i-ph-eye'"
      size="xs"
      variant="link"
      color="neutral"
      @click="show = !show"
    />
  </template>
</UInput>`;

const passwordStrengthCode = `<UInput v-model="password" type="password" placeholder="Password" />
<UProgress
  :model-value="strength.score"
  :max="5"
  :color="strength.score > 3 ? 'success' : strength.score > 1 ? 'warning' : 'error'"
/>`;

const charLimitCode = `<UInput v-model="bio" placeholder="Bio" :maxlength="100">
  <template #trailing>
    <span class="text-xs text-dimmed">{{ bio.length }}/100</span>
  </template>
</UInput>`;

const keyboardShortcutCode = `<UInput placeholder="Search...">
  <template #trailing>
    <UKbd>⌘K</UKbd>
  </template>
</UInput>`;

const maskCode = `<!-- Install maska: pnpm add maska -->
<script setup>
import { vMaska } from 'maska';
<\/script>

<UInput v-model="value" v-maska="'###-###-####'" placeholder="123-456-7890" />`;

const floatingLabelCode = `<UInput placeholder="Full name">
  <template #default>
    <label class="text-sm text-dimmed">Full name</label>
  </template>
</UInput>`;

const formFieldCode = `<UFormField label="Email" help="Enter your email address" class="w-full">
  <UInput class="w-full" placeholder="you@example.com" />
</UFormField>`;


const requiredFieldCode = `<UFormField class="w-full">
  <template #label>
    Full name <span class="text-red-500">*</span>
  </template>
  <UInput class="w-full" placeholder="Enter your full name" required />
</UFormField>`;
const fieldGroupCode = `<UFieldGroup>
  <UInput placeholder="First name" />
  <UInput placeholder="Last name" />
</UFieldGroup>`;

const phoneNumberCode = `<UFieldGroup>
  <USelectMenu
    :items="countries"
    value-key="code"
    placeholder="+1"
    size="md"
  />
  <UInput placeholder="Phone number" />
</UFieldGroup>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="demo-col">
          <UInput size="sm" placeholder="Small input" />
          <UInput size="md" placeholder="Medium input" />
          <UInput size="lg" placeholder="Large input" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Type</h3>
      <CodeCollapsible :code="typeCode">
        <div class="demo-col">
          <UInput type="text" placeholder="Text input" />
          <UInput type="password" placeholder="Password" />
          <UInput type="number" placeholder="Number" />
          <UInput type="file" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Placeholder</h3>
      <CodeCollapsible :code="placeholderCode">
        <div class="demo-col">
          <UInput v-model="inputValue" placeholder="Enter your name" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <CodeCollapsible :code="colorCode">
        <div class="demo-col">
          <UInput color="primary" placeholder="Primary" highlight />
          <UInput color="secondary" placeholder="Secondary" highlight />
          <UInput color="success" placeholder="Success" highlight />
          <UInput color="error" placeholder="Error" highlight />
          <UInput color="warning" placeholder="Warning" highlight />
          <UInput color="info" placeholder="Info" highlight />
          <UInput color="neutral" placeholder="Neutral" highlight />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variant</h3>
      <CodeCollapsible :code="variantCode">
        <div class="demo-col">
          <UInput variant="outline" placeholder="Outline" />
          <UInput variant="soft" placeholder="Soft" />
          <UInput variant="subtle" placeholder="Subtle" />
          <UInput variant="ghost" placeholder="Ghost" />
          <UInput variant="none" placeholder="None" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <CodeCollapsible :code="iconCode">
        <div class="demo-col">
          <UInput icon="i-ph-magnifying-glass" placeholder="Search..." />
          <UInput icon="i-ph-envelope" placeholder="Email" trailing />
          <UInput leading-icon="i-ph-user" trailing-icon="i-ph-check" placeholder="Username" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <CodeCollapsible :code="loadingCode">
        <div class="demo-col">
          <UInput loading placeholder="Loading..." />
          <UInput loading icon="i-ph-envelope" placeholder="Loading..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="disabledCode">
        <div class="demo-col">
          <UInput disabled placeholder="Disabled input" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With clear button</h3>
      <CodeCollapsible :code="clearableCode">
        <div class="demo-col">
          <UInput v-model="clearableValue" placeholder="Type something...">
            <template #trailing>
              <UButton
                v-if="clearableValue"
                icon="i-ph-x"
                size="xs"
                variant="link"
                color="neutral"
                @click="clearableValue = ''"
              />
            </template>
          </UInput>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With copy button</h3>
      <CodeCollapsible :code="copyCode">
        <div class="demo-col">
          <UInput v-model="copyValue" readonly>
            <template #trailing>
              <UButton
                :icon="copyDone ? 'i-ph-check' : 'i-ph-copy'"
                size="xs"
                variant="link"
                color="neutral"
                @click="handleCopy"
              />
            </template>
          </UInput>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With password toggle</h3>
      <CodeCollapsible :code="passwordToggleCode">
        <div class="demo-col">
          <UInput
            v-model="passwordValue"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
          >
            <template #trailing>
              <UButton
                :icon="showPassword ? 'i-ph-eye-slash' : 'i-ph-eye'"
                size="xs"
                variant="link"
                color="neutral"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With password strength indicator</h3>
      <CodeCollapsible :code="passwordStrengthCode">
        <div class="demo-col">
          <UInput v-model="passwordStrengthValue" type="password" placeholder="Password" />
          <UProgress
            v-if="passwordStrengthValue"
            :model-value="passwordStrength.score"
            :max="5"
            :color="passwordStrength.score > 3 ? 'success' : passwordStrength.score > 1 ? 'warning' : 'error'"
            size="sm"
          />
          <span v-if="passwordStrengthValue" class="text-xs" :style="{ color: passwordStrength.color }">{{ passwordStrength.label }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With character limit</h3>
      <CodeCollapsible :code="charLimitCode">
        <div class="demo-col">
          <UInput v-model="charLimitValue" placeholder="Bio" :maxlength="100">
            <template #trailing>
              <span class="text-xs text-dimmed">{{ charCount }}/100</span>
            </template>
          </UInput>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With keyboard shortcut</h3>
      <CodeCollapsible :code="keyboardShortcutCode">
        <div class="demo-col">
          <UInput placeholder="Search...">
            <template #trailing>
              <UKbd>⌘K</UKbd>
            </template>
          </UInput>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With mask</h3>
      <CodeCollapsible :code="maskCode" />
    </section>

    <section class="example-section">
      <h3>With floating label</h3>
      <CodeCollapsible :code="floatingLabelCode">
        <div class="demo-col">
          <div class="demo-float-label" :class="{ active: floatingLabelValue }">
            <UInput v-model="floatingLabelValue" placeholder=" " />
            <label class="demo-float-label-text">Full name</label>
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With label and helper text</h3>
      <CodeCollapsible :code="formFieldCode">
        <div class="demo-col">
          <UFormField label="Email" help="Enter your email address" class="w-full">
            <UInput v-model="formFieldValue" class="w-full" placeholder="you@example.com" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Required field</h3>
      <CodeCollapsible :code="requiredFieldCode">
        <div class="demo-col">
          <UFormField class="w-full">
            <template #label>
              Full name <span class="text-red-500">*</span>
            </template>
            <UInput v-model="requiredFieldValue" class="w-full" placeholder="Enter your full name" required />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Within a FieldGroup</h3>
      <CodeCollapsible :code="fieldGroupCode">
        <div class="demo-col">
          <UFieldGroup>
            <UInput v-model="fieldGroupLeft" placeholder="First name" />
            <UInput v-model="fieldGroupRight" placeholder="Last name" />
          </UFieldGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>As a phone number input</h3>
      <CodeCollapsible :code="phoneNumberCode">
        <div class="demo-col">
          <UFieldGroup>
            <USelectMenu
              :items="countries"
              value-key="code"
              placeholder="+1"
              size="md"
            />
            <UInput placeholder="Phone number" />
          </UFieldGroup>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.demo-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 8px;
  max-width: 320px;
}

/* === Floating Label (custom CSS pattern) === */
.demo-float-label {
  position: relative;
}
.demo-float-label-text {
  position: absolute;
  top: 50%;
  left: 10px;
  z-index: 1;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--color-foreground-tertiary, #9CA3AF);
  transition: all 150ms;
  pointer-events: none;
  background: var(--color-surface-base, #fff);
  padding: 0 4px;
}
.demo-float-label:focus-within .demo-float-label-text,
.demo-float-label.active .demo-float-label-text {
  top: 0;
  transform: translateY(-50%) scale(0.8);
  color: var(--color-brand-primary, #0070F2);
}
</style>
