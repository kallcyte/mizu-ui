<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

const props = withDefaults(defineProps<DividerProps>(), {
  orientation: "horizontal",
  label: undefined,
});

const attrs = useAttrs();

const dividerClasses = computed(() => {
  const classes = ["bp-divider", `bp-divider--${props.orientation}`];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <div v-if="orientation === 'vertical'" role="separator" :class="dividerClasses" :aria-orientation="orientation" />
  <div v-else-if="label" :class="dividerClasses" role="separator">
    <span class="bp-divider__label">{{ label }}</span>
  </div>
  <hr v-else :class="dividerClasses" role="separator" :aria-label="label">
</template>

<style>
@reference "../index.css";

.bp-divider--horizontal {
  @apply block w-full border-0;
  border-top: 1px solid var(--color-surface-muted);
  margin: 0;
}

.bp-divider--horizontal[role="separator"] {
  @apply flex items-center;
  border-top: 1px solid var(--color-surface-muted);
  height: auto;
  overflow: visible;
}

.bp-divider--horizontal[role="separator"]::before,
.bp-divider--horizontal[role="separator"]::after {
  content: "";
  flex: 1;
  border-top: 1px solid var(--color-surface-muted);
}

.bp-divider--horizontal[role="separator"]::before {
  margin-right: 12px;
}

.bp-divider--horizontal[role="separator"]::after {
  margin-left: 12px;
}

.bp-divider__label {
  @apply text-xs whitespace-nowrap;
  color: var(--color-foreground-tertiary);
}

.bp-divider--vertical {
  @apply inline-block;
  width: 1px;
  align-self: stretch;
  background-color: var(--color-surface-muted);
  margin: 0;
}
</style>
