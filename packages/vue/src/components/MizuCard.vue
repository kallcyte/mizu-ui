<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface CardProps {
  spacing?: "compact" | "default" | "comfortable";
}

const props = withDefaults(defineProps<CardProps>(), {
  spacing: "default",
});

const attrs = useAttrs();

const cardClasses = computed(() => {
  const classes = [
    "bp-card",
    `bp-card--spacing-${props.spacing}`,
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
  @apply rounded-md border transition-colors duration-200 overflow-hidden;
  background-color: var(--color-surface-base);
  border-color: var(--color-foreground-tertiary);
  --bp-card-px: 16px;
  --bp-card-py: 16px;
  --bp-card-gap: 6px;
}

.bp-card--spacing-compact {
  --bp-card-px: 12px;
  --bp-card-py: 12px;
  --bp-card-gap: 4px;
}

.bp-card--spacing-comfortable {
  --bp-card-px: 24px;
  --bp-card-py: 24px;
  --bp-card-gap: 8px;
}
</style>
