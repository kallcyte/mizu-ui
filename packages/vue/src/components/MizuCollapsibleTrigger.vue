<script setup lang="ts">
import { CollapsibleTrigger } from "reka-ui";

export interface CollapsibleTriggerProps {
  asChild?: boolean;
  as?: string;
}

withDefaults(defineProps<CollapsibleTriggerProps>(), {
  asChild: undefined,
  as: undefined,
});
</script>

<template>
  <CollapsibleTrigger
    class="mizu-collapsible__trigger"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </CollapsibleTrigger>
</template>

<style>
.mizu-collapsible__trigger {
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  font: inherit;
  color: inherit;
}
</style>

