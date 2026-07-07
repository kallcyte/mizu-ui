<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["mizu-card-header"];
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
@reference "../index.css";

.mizu-card-header {
  @apply relative flex flex-col;
  padding: var(--mizu-card-py) var(--mizu-card-px);
  gap: var(--mizu-card-gap);
  background-color: var(--color-surface-subtle);
  border-bottom: 1px solid var(--color-surface-muted);
}
</style>
