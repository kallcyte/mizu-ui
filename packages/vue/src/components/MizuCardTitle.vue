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

.bp-card-title {
  @apply text-[15px] font-semibold leading-[1.3] tracking-tight m-0;
  color: var(--bp-color-foreground-primary);
}
</style>
