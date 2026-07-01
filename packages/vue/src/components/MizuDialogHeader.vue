<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["mizu-dialog__header"];
  if (attrs.class) result.push(attrs.class as string);
  return result.join(" ");
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style>
.mizu-dialog__header {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 16px;
  border-bottom: 1px solid var(--color-surface-muted);
}
</style>
