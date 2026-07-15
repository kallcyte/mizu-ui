<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const color = ref("#6366F1");
const hexColor = ref("#10B981");
const rgbColor = ref("rgb(99, 102, 241)");

const basicCode = `<UColorPicker v-model="color" />`;

const formatCode = `<UColorPicker v-model="hexColor" format="hex" />
<UColorPicker v-model="rgbColor" format="rgb" />`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic color picker</h3>
      <CodeCollapsible :code="basicCode">
        <div class="demo-row">
          <UColorPicker v-model="color" />
          <span class="demo-value">{{ color }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color formats</h3>
      <CodeCollapsible :code="formatCode">
        <div class="demo-col">
          <div class="demo-row">
            <UColorPicker v-model="hexColor" format="hex" />
            <span class="demo-value">{{ hexColor }}</span>
          </div>
          <div class="demo-row">
            <UColorPicker v-model="rgbColor" format="rgb" />
            <span class="demo-value">{{ rgbColor }}</span>
          </div>
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
}
.demo-value {
  font-size: 13px;
  color: var(--color-foreground-secondary, #4B5563);
}
</style>
