<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NavigationMenuSub } from "reka-ui";

export interface NavigationMenuSubProps {
  modelValue?: string;
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<NavigationMenuSubProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  orientation: "horizontal",
  asChild: undefined,
  as: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const attrs = useAttrs();

const subClasses = computed(() => {
  const c = ["NavigationMenuSub"];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <NavigationMenuSub
    :class="subClasses"
    :model-value="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :as-child="asChild"
    :as="as"
    @update:model-value="(v: any) => emit('update:modelValue', v)"
  >
    <slot />
  </NavigationMenuSub>
</template>

<style>
.NavigationMenuSub {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: inherit;
}
</style>