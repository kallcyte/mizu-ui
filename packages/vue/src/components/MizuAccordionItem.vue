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
    :class="attrs.class"
  >
    <slot />
  </AccordionItem>
</template>
