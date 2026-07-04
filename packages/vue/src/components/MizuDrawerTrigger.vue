<script setup lang="ts">
import { DialogTrigger } from "reka-ui";

export interface DrawerTriggerProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DrawerTriggerProps>(), {
  asChild: undefined,
  as: undefined,
});
</script>

<template>
  <DialogTrigger
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </DialogTrigger>
</template>
