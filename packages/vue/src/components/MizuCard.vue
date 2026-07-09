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
  const classes = ["mizu-card", `mizu-card--spacing-${props.spacing}`];
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

.mizu-card {
  @apply rounded-md border transition-colors duration-200 overflow-hidden;
  background-color: var(--color-surface-base);
  border-color: var(--color-surface-muted);
  --mizu-card-px: 16px;
  --mizu-card-py: 16px;
  --mizu-card-gap: 6px;
}

.mizu-card--spacing-compact {
  --mizu-card-px: 12px;
  --mizu-card-py: 12px;
  --mizu-card-gap: 4px;
}

.mizu-card--spacing-comfortable {
  --mizu-card-px: 24px;
  --mizu-card-py: 24px;
  --mizu-card-gap: 8px;
}
</style>
