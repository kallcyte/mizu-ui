<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { TooltipRoot } from "reka-ui";

export interface TooltipProps {
  open?: boolean;
  defaultOpen?: boolean;
  delayDuration?: number;
  disableHoverableContent?: boolean;
  disableClosingTrigger?: boolean;
  disabled?: boolean;
  ignoreNonKeyboardFocus?: boolean;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  open: undefined,
  defaultOpen: false,
  delayDuration: undefined,
  disableHoverableContent: undefined,
  disableClosingTrigger: undefined,
  disabled: undefined,
  ignoreNonKeyboardFocus: undefined,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["mizu-tooltip"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <TooltipRoot
    :class="rootClasses"
    :open="open"
    :default-open="defaultOpen"
    :delay-duration="delayDuration"
    :disable-hoverable-content="disableHoverableContent"
    :disable-closing-trigger="disableClosingTrigger"
    :disabled="disabled"
    :ignore-non-keyboard-focus="ignoreNonKeyboardFocus"
    @update:open="(value) => emit('update:open', value)"
  >
    <slot />
  </TooltipRoot>
</template>
