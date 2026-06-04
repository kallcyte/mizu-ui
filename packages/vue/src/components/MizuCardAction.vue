<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["bp-card-action"];
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

.bp-card-action {
  position: absolute;
  right: var(--bp-card-px);
  top: var(--bp-card-py);
  @apply flex items-center;
}
</style>
