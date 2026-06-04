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
  @apply p-5;
}

.bp-card-content > * {
  @apply text-[15px] font-normal leading-relaxed;
  color: var(--bp-color-foreground-primary);
}
</style>
