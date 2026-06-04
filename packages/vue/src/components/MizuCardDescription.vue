<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["bp-card-description"];
  if (attrs.class) result.push(attrs.class as string);
  return result.join(" ");
});
</script>

<template>
  <p :class="classes">
    <slot />
  </p>
</template>

<style>
@reference "../index.css";

.bp-card .bp-card-description {
  @apply font-normal m-0;
  font-size: var(--font-size-caption) !important;
  line-height: var(--line-height-caption) !important;
  color: var(--color-foreground-tertiary) !important;
}
</style>
