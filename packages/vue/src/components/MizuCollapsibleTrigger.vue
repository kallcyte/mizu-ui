<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { CollapsibleTrigger } from "reka-ui";

export interface CollapsibleTriggerProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<CollapsibleTriggerProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const triggerClasses = computed(() => {
  const classes = ["mizu-collapsible__trigger"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <CollapsibleTrigger
    :class="triggerClasses"
    :as-child="asChild"
    :as="as"
  >
    <span class="mizu-collapsible__trigger-content">
      <slot />
    </span>
    <svg
      class="mizu-collapsible__chevron"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </CollapsibleTrigger>
</template>

<style>
.mizu-collapsible__trigger {
  all: revert;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 16px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-foreground-primary);
  background: transparent;
  border: none;
  cursor: pointer;
  user-select: none;
  outline: none;
  text-align: left;
  position: relative;
}

.mizu-collapsible__trigger:hover {
  background-color: var(--color-surface-subtle);
}

.mizu-collapsible__trigger:focus-visible {
  outline: 2px solid var(--color-brand-accent);
  outline-offset: -2px;
}

.mizu-collapsible__trigger[data-disabled] {
  color: var(--color-foreground-tertiary);
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.mizu-collapsible__trigger-content {
  flex: 1;
  min-width: 0;
}

.mizu-collapsible__chevron {
  flex-shrink: 0;
  color: var(--color-foreground-secondary);
  transition: transform 200ms ease;
}

.mizu-collapsible__trigger[data-state="open"] .mizu-collapsible__chevron {
  transform: rotate(180deg);
}
</style>
