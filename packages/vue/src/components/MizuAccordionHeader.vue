<script setup lang="ts">
import { useAttrs } from "vue";
import { AccordionHeader } from "reka-ui";

export interface AccordionHeaderProps {
  as?: string;
  asChild?: boolean;
}

const props = withDefaults(defineProps<AccordionHeaderProps>(), {
  as: "h3",
  asChild: undefined,
});

const attrs = useAttrs();
</script>

<template>
  <AccordionHeader :as="as" :as-child="asChild" :class="attrs.class">
    <slot />
  </AccordionHeader>
</template>
