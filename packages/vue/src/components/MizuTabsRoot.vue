<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { TabsRoot } from "reka-ui";

export interface TabsRootProps {
  modelValue?: string;
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  activationMode?: "automatic" | "manual";
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<TabsRootProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  orientation: "horizontal",
  activationMode: "automatic",
  asChild: undefined,
  as: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["bp-tabs"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <TabsRoot
    :class="rootClasses"
    :model-value="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :activation-mode="activationMode"
    :as-child="asChild"
    :as="as"
    @update:model-value="(v: string) => emit('update:modelValue', v)"
  >
    <slot />
  </TabsRoot>
</template>
