<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { TabsList } from "reka-ui";

export type TabsColor = "primary" | "accent" | "error" | "success" | "warning" | "info" | "neutral";

export interface TabsListProps {
  loop?: boolean;
  asChild?: boolean;
  as?: string;
  variant?: "underline" | "button";
  size?: "sm" | "md" | "lg";
  color?: TabsColor;
}

const props = withDefaults(defineProps<TabsListProps>(), {
  loop: true,
  asChild: undefined,
  as: undefined,
  variant: "underline",
  size: "md",
  color: "primary",
});

const attrs = useAttrs();

const listClasses = computed(() => {
  const classes = ["mizu-tabs__list"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <TabsList
    :class="listClasses"
    :data-variant="variant"
    :data-size="size"
    :data-color="color"
    :loop="loop"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </TabsList>
</template>

<style>
.mizu-tabs__list {
  all: revert;
  display: flex;
  gap: 2px;
  border-bottom: 1px solid var(--color-surface-muted);
  font-family: inherit;
}

.mizu-tabs__list[data-variant="button"] {
  gap: 8px;
  border-bottom: none;
  background-color: var(--color-surface-muted);
  border-radius: 8px;
  padding: 8px;
}

.mizu-tabs__list[data-variant="button"][data-size="sm"] {
  gap: 4px;
  border-radius: 6px;
  padding: 4px;
}

.mizu-tabs__list[data-variant="button"][data-size="lg"] {
  gap: 8px;
  border-radius: 8px;
  padding: 8px;
}

.mizu-tabs__list[data-orientation="vertical"] {
  flex-direction: column;
  border-bottom: none;
  border-right: 1px solid var(--color-surface-muted);
}

.mizu-tabs__list[data-orientation="vertical"][data-variant="button"] {
  border-right: none;
  align-items: stretch;
}

/* Color variants */
.mizu-tabs__list[data-color="primary"] {
  --mizu-tabs-color: var(--color-brand-primary);
}
.mizu-tabs__list[data-color="accent"] {
  --mizu-tabs-color: var(--color-brand-ycp);
}
.mizu-tabs__list[data-color="error"] {
  --mizu-tabs-color: var(--color-feedback-error-base);
}
.mizu-tabs__list[data-color="success"] {
  --mizu-tabs-color: var(--color-feedback-success-base);
}
.mizu-tabs__list[data-color="warning"] {
  --mizu-tabs-color: var(--color-feedback-warning-base);
}
.mizu-tabs__list[data-color="info"] {
  --mizu-tabs-color: var(--color-feedback-info-base);
}
.mizu-tabs__list[data-color="neutral"] {
  --mizu-tabs-color: var(--color-brand-neutral);
}
</style>
