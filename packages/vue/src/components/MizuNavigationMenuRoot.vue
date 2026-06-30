<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NavigationMenuRoot } from "reka-ui";

export interface NavigationMenuRootProps {
  modelValue?: string;
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  delayDuration?: number;
  skipDelayDuration?: number;
  disableClickTrigger?: boolean;
  disableHoverTrigger?: boolean;
  disablePointerLeaveClose?: boolean;
  unmountOnHide?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<NavigationMenuRootProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  orientation: "horizontal",
  dir: undefined,
  delayDuration: 200,
  skipDelayDuration: 300,
  disableClickTrigger: false,
  disableHoverTrigger: false,
  disablePointerLeaveClose: false,
  unmountOnHide: false,
  asChild: undefined,
  as: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const c = ["bp-nav-menu", `bp-nav-menu--${props.orientation}`];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <NavigationMenuRoot
    :class="rootClasses"
    :model-value="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :dir="dir"
    :delay-duration="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    :disable-click-trigger="disableClickTrigger"
    :disable-hover-trigger="disableHoverTrigger"
    :disable-pointer-leave-close="disablePointerLeaveClose"
    :unmount-on-hide="unmountOnHide"
    :as-child="asChild"
    :as="as"
    @update:model-value="(v: any) => emit('update:modelValue', v)"
  >
    <slot />
  </NavigationMenuRoot>
</template>

<style>
.bp-nav-menu {
  all: revert;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  z-index: 1;
}

.bp-nav-menu--vertical {
  flex-direction: column;
  align-items: flex-start;
}
</style>
