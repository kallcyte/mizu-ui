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

.bp-card-description {
  @apply text-[13px] font-normal leading-relaxed m-0;
  color: var(--bp-color-foreground-tertiary);
}
</style>
