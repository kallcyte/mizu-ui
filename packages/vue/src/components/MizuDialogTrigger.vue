<script setup lang="ts">
import { DialogTrigger } from "reka-ui";

export interface DialogTriggerProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DialogTriggerProps>(), {
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
