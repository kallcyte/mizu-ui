<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["bp-card-content"];
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

.bp-card-content {
  padding: var(--bp-card-py) var(--bp-card-px);
  background-color: var(--bp-color-surface-base);
}

.bp-card .bp-card-content > * {
  @apply font-normal;
  font-size: var(--bp-font-size-body) !important;
  line-height: var(--bp-line-height-body) !important;
  color: var(--bp-color-foreground-primary) !important;
}
</style>
