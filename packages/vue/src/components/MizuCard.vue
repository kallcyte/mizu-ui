<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface CardProps {
  size?: "default" | "sm";
}

const props = withDefaults(defineProps<CardProps>(), {
  size: "default",
});

const attrs = useAttrs();

const cardClasses = computed(() => {
  const classes = [
    "bp-card",
    `bp-card--${props.size}`,
  ];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<style>
@reference "../index.css";

.bp-card {
  @apply rounded-lg border transition-colors duration-200;
  background-color: var(--bp-color-surface-base);
  border-color: var(--bp-color-foreground-tertiary);
}

.bp-card--default {
  @apply p-0;
}

.bp-card--sm {
  @apply p-0;
}
</style>
