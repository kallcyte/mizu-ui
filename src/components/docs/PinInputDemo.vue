<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const pin = ref<string[]>([]);
const maskedPin = ref<string[]>([]);

const basicCode = `<UPinInput
  v-model="pin"
  :length="5"
  placeholder="·"
/>`;

const maskedCode = `<UPinInput
  v-model="maskedPin"
  :length="6"
  mask
  otp
  placeholder="·"
/>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic pin input</h3>
      <p class="demo-description">A 5-character pin input with <code>v-model</code> binding and a custom placeholder character for each digit.</p>
      <CodeCollapsible :code="basicCode">
        <div class="demo-row">
          <UPinInput
            v-model="pin"
            :length="5"
            placeholder="·"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Masked OTP input</h3>
      <p class="demo-description">A 6-character OTP input with <code>mask</code> for hidden characters and <code>otp</code> for autocomplete support.</p>
      <CodeCollapsible :code="maskedCode">
        <div class="demo-row">
          <UPinInput
            v-model="maskedPin"
            :length="6"
            mask
            otp
            placeholder="·"
          />
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
.demo-description {
  font-size: 13px;
  color: var(--sl-color-text-light);
  margin: 0;
  line-height: 1.5;
}
.demo-description code {
  font-size: 12px;
  background: var(--color-surface-muted, #F3F4F6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
