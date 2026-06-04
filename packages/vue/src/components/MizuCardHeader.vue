<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["bp-card-header"];
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

.bp-card-header {
  @apply relative flex flex-col;
  padding: var(--bp-card-py) var(--bp-card-px);
  gap: var(--bp-card-gap);
  background-color: var(--color-surface-subtle);
  border-bottom: 1px solid color-mix(in srgb, var(--color-foreground-tertiary) 25%, transparent);
}
</style>
