<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const singleFile = ref<File | null>(null);
const multipleFiles = ref<File[]>([]);

const basicCode = `<UFileUpload
  v-model="singleFile"
  label="Upload a file"
  description="Drag and drop or click to browse"
  icon="i-lucide-cloud-upload"
/>`;

const buttonCode = `<UFileUpload
  v-model="singleFile"
  variant="button"
  label="Choose file"
  icon="i-lucide-folder-open"
/>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Drop zone (area variant)</h3>
      <CodeCollapsible :code="basicCode">
        <div class="demo-col">
          <UFileUpload
            v-model="singleFile"
            label="Upload a file"
            description="Drag and drop or click to browse"
            icon="i-lucide-cloud-upload"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Button variant</h3>
      <CodeCollapsible :code="buttonCode">
        <div class="demo-row">
          <UFileUpload
            v-model="singleFile"
            variant="button"
            label="Choose file"
            icon="i-lucide-folder-open"
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  max-width: 400px;
}
</style>
