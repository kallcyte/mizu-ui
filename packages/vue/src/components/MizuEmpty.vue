<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface EmptyProps {
  /** Heading text */
  title?: string;
  /** Body text */
  description?: string;
}

const props = withDefaults(defineProps<EmptyProps>(), {
  title: undefined,
  description: undefined,
});

const attrs = useAttrs();
const slots = defineSlots<{
  icon?: () => unknown;
  action?: () => unknown;
}>();

const hasIcon = computed(() => !!slots.icon);
const hasAction = computed(() => !!slots.action);

const emptyClasses = computed(() => {
  const classes = ["mizu-empty"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <div :class="emptyClasses">
    <div v-if="hasIcon" class="mizu-empty__icon">
      <slot name="icon" />
    </div>
    <h3 v-if="title" class="mizu-empty__title">{{ title }}</h3>
    <p v-if="description" class="mizu-empty__description">{{ description }}</p>
    <div v-if="hasAction" class="mizu-empty__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style>
@reference "../index.css";

.mizu-empty {
  @apply flex flex-col items-center justify-center text-center py-12 px-6;
}

.mizu-empty__icon {
  @apply mb-4 text-[var(--color-foreground-tertiary)];
}
.mizu-empty__icon svg { @apply w-12 h-12; }

.mizu-empty__title {
  @apply text-base font-semibold text-[var(--color-foreground-primary)] mb-2;
}

.mizu-empty__description {
  @apply text-sm text-[var(--color-foreground-secondary)] max-w-sm mb-4;
}

.mizu-empty__action {
  @apply mt-2;
}
</style>
