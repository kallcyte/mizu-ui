<script setup lang="ts">
import { useAttrs } from "vue";
import { AccordionItem } from "reka-ui";

export interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  disabled: false,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();
</script>

<template>
  <AccordionItem
    :value="value"
    :disabled="disabled"
    :as-child="asChild"
    :as="as"
    :class="['mizu-accordion__item', attrs.class].filter(Boolean).join(' ')"
  >
    <slot />
  </AccordionItem>
</template>

<style>
.mizu-accordion__item {
  all: revert;
  border-bottom: 1px solid var(--color-surface-muted);
}

.mizu-accordion__item:last-child {
  border-bottom: none;
}

.mizu-accordion--horizontal .mizu-accordion__item {
  border-bottom: none;
  border-right: 1px solid var(--color-surface-muted);
}

.mizu-accordion--horizontal .mizu-accordion__item:last-child {
  border-right: none;
}
</style>
