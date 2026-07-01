<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["mizu-card-content"];
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

.mizu-card-content {
  padding: var(--mizu-card-py) var(--mizu-card-px);
  background-color: var(--color-surface-base);
}

.mizu-card .mizu-card-content > * {
  @apply font-normal;
  font-size: var(--font-size-body) !important;
  line-height: var(--line-height-body) !important;
  color: var(--color-foreground-primary) !important;
}
</style>
