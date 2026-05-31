<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false);

const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <div class="button-demo">
    <div class="demo-section">
      <h3>Variants</h3>
      <div class="button-row">
        <button class="bp-button bp-button--primary">Primary</button>
        <button class="bp-button bp-button--accent">Accent</button>
        <button class="bp-button bp-button--ghost">Ghost</button>
        <button class="bp-button bp-button--outline">Outline</button>
      </div>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <div class="button-row">
        <button class="bp-button bp-button--primary bp-button--sm">Small</button>
        <button class="bp-button bp-button--primary bp-button--md">Medium</button>
        <button class="bp-button bp-button--primary bp-button--lg">Large</button>
      </div>
    </div>

    <div class="demo-section">
      <h3>States</h3>
      <div class="button-row">
        <button class="bp-button bp-button--primary" disabled>Disabled</button>
        <button class="bp-button bp-button--primary" :class="{ 'bp-button--loading': loading }" @click="handleClick">
          <svg v-if="loading" class="bp-spinner" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25" />
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" opacity="0.75" />
          </svg>
          {{ loading ? 'Loading...' : 'Click me' }}
        </button>
      </div>
    </div>

    <div class="demo-section">
      <h3>With Icons</h3>
      <div class="button-row">
        <button class="bp-button bp-button--primary">
          <svg class="bp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Item
        </button>
        <button class="bp-button bp-button--accent">
          Save
          <svg class="bp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: var(--sl-color-gray-2);
  border-radius: 8px;
}

.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin-bottom: 12px;
  margin-top: 0;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.bp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--sl-font);
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  border: none;
  text-decoration: none;
}

.bp-button:focus {
  outline: 2px solid var(--sl-color-accent);
  outline-offset: 2px;
}

.bp-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Sizes */
.bp-button--sm {
  height: 32px;
  padding: 6px 12px;
  font-size: 13px;
}

.bp-button--md {
  height: 40px;
  padding: 10px 16px;
  font-size: 15px;
}

.bp-button--lg {
  height: 48px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
}

/* Variants */
.bp-button--primary {
  background-color: #001C44;
  color: #FFFFFF;
}

.bp-button--primary:hover:not(:disabled) {
  background-color: #001536;
}

.bp-button--accent {
  background-color: #007FFF;
  color: #FFFFFF;
}

.bp-button--accent:hover:not(:disabled) {
  background-color: #0066CC;
}

.bp-button--ghost {
  background-color: transparent;
  color: var(--sl-color-text);
}

.bp-button--ghost:hover:not(:disabled) {
  background-color: var(--sl-color-gray-3);
}

.bp-button--outline {
  background-color: transparent;
  color: var(--sl-color-text);
  border: 1px solid var(--sl-color-hairline-shade);
}

.bp-button--outline:hover:not(:disabled) {
  background-color: var(--sl-color-gray-3);
  border-color: var(--sl-color-accent);
  color: var(--sl-color-accent);
}

/* Loading state */
.bp-button--loading {
  pointer-events: none;
  opacity: 0.8;
}

.bp-spinner {
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.bp-icon {
  width: 20px;
  height: 20px;
}
</style>
