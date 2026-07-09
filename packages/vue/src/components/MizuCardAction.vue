<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["mizu-card-action"];
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

.mizu-card-action {
  position: absolute;
  right: var(--mizu-card-px);
  top: var(--mizu-card-py);
  @apply flex items-center;
}
</style>
