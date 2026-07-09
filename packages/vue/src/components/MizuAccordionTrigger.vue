<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AccordionTrigger } from "reka-ui";

export interface AccordionTriggerProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<AccordionTriggerProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const triggerClasses = computed(() => {
  const classes = ["mizu-accordion__trigger"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <AccordionTrigger :class="triggerClasses" :as-child="asChild" :as="as">
    <span class="mizu-accordion__trigger-content">
      <slot />
    </span>
    <slot name="trailing-icon">
      <svg
        class="mizu-accordion__chevron"
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
    </slot>
  </AccordionTrigger>
</template>

<style>
.mizu-accordion__trigger {
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

.mizu-accordion__trigger:hover {
  background-color: var(--color-surface-subtle);
}

.mizu-accordion__trigger:focus-visible {
  outline: 2px solid var(--color-brand-ycp);
  outline-offset: -2px;
}

.mizu-accordion__trigger[data-disabled] {
  color: var(--color-foreground-tertiary);
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.mizu-accordion__trigger-content {
  flex: 1;
  min-width: 0;
}

.mizu-accordion__chevron {
  flex-shrink: 0;
  color: var(--color-foreground-secondary);
  transition: transform 200ms ease;
}

.mizu-accordion__trigger[data-state="open"] .mizu-accordion__chevron {
  transform: rotate(180deg);
}
</style>
