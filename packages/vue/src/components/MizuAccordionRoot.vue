<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AccordionRoot } from "reka-ui";

export interface AccordionRootProps {
  modelValue?: string | string[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "vertical" | "horizontal";
  unmountOnHide?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<AccordionRootProps>(), {
  modelValue: undefined,
  type: "single",
  collapsible: false,
  disabled: false,
  dir: undefined,
  orientation: "vertical",
  unmountOnHide: true,
  asChild: undefined,
  as: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | string[] | undefined];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["bp-accordion"];
  if (props.orientation === "horizontal") classes.push("bp-accordion--horizontal");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <AccordionRoot
    :class="rootClasses"
    :model-value="modelValue"
    :type="type"
    :collapsible="collapsible"
    :disabled="disabled"
    :dir="dir"
    :orientation="orientation"
    :unmount-on-hide="unmountOnHide"
    :as-child="asChild"
    :as="as"
    @update:model-value="(v: string | string[] | undefined) => emit('update:modelValue', v)"
  >
    <slot />
  </AccordionRoot>
</template>

<style>
.bp-accordion {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  font-family: inherit;
}

.bp-accordion--horizontal {
  flex-direction: row;
}

.bp-accordion[data-orientation="vertical"] > :not(:last-child) {
  border-bottom: 1px solid var(--color-surface-muted);
}
</style>
