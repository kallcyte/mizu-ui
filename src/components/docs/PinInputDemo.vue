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
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
