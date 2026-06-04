<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["bp-card-title"];
  if (attrs.class) result.push(attrs.class as string);
  return result.join(" ");
});
</script>

<template>
  <h3 :class="classes">
    <slot />
  </h3>
</template>

<style>
@reference "../index.css";

.bp-card .bp-card-title {
  @apply font-semibold m-0;
  font-size: var(--font-size-h3) !important;
  line-height: var(--line-height-h3) !important;
  letter-spacing: var(--letter-spacing-tight, -0.03em) !important;
  color: var(--color-foreground-primary) !important;
}
</style>
