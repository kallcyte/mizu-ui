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
  const c = ["bp-nav-menu__sub", `bp-nav-menu__sub--${props.orientation}`];
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
.bp-nav-menu__sub {
  all: revert;
  position: relative;
  display: flex;
  font-family: inherit;
}

.bp-nav-menu__sub--horizontal {
  flex-direction: row;
}

.bp-nav-menu__sub--vertical {
  flex-direction: column;
}
</style>