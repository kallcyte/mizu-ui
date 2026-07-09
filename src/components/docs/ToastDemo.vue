<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const toasts = ref<{ id: number; title: string; description: string; color: string }[]>([]);
let nextId = 0;

function addToast(color: string) {
  const id = nextId++;
  toasts.value.push({
    id,
    title: color === "success" ? "Success" : color === "error" ? "Error" : "Info",
    description: `This is a ${color} toast notification.`,
    color,
  });
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 5000);
}
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Colors</h3>
      <CodeCollapsible :code="`<UToast
  v-for=&quot;toast in toasts&quot;
  :key=&quot;toast.id&quot;
  :title=&quot;toast.title&quot;
  :description=&quot;toast.description&quot;
  :color=&quot;toast.color&quot;
/>`">
        <div class="demo-row">
          <UButton label="Success Toast" color="success" @click="addToast('success')" />
          <UButton label="Error Toast" color="error" @click="addToast('error')" />
          <UButton label="Info Toast" color="info" @click="addToast('info')" />
        </div>
        <UToast
          v-for="toast in toasts"
          :key="toast.id"
          :title="toast.title"
          :description="toast.description"
          :color="toast.color"
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Actions</h3>
      <CodeCollapsible :code="`<UToast
  title=&quot;File saved&quot;
  description=&quot;Your changes have been saved.&quot;
  color=&quot;primary&quot;
  :actions=&quot;[{ label: 'Undo', color: 'neutral', variant: 'ghost' }]&quot;
/>`">
        <div class="demo-row">
          <UButton label="Toast with Action" @click="addToast('primary')" />
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
