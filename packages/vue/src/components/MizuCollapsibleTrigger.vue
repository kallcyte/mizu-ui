<script setup lang="ts">
import { computed } from "vue";
import { CollapsibleTrigger } from "reka-ui";

export interface CollapsibleTriggerProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<CollapsibleTriggerProps>(), {
  asChild: undefined,
  as: undefined,
});

const triggerClass = computed(() => {
  // When asChild is true, the class is forwarded to the child element
  // (e.g., MizuButton), which has its own styling. Skip the class to
  // avoid overriding the child's background, border, and other styles.
  return props.asChild ? undefined : "mizu-collapsible__trigger";
});
</script>

<template>
  <CollapsibleTrigger
    :class="triggerClass"
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

