<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ToggleGroupRoot } from "reka-ui";

export interface ToggleGroupRootProps {
  modelValue?: string | string[];
  defaultValue?: string | string[];
  type?: "single" | "multiple";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ToggleGroupRootProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  type: "single",
  disabled: false,
  size: "md",
  asChild: undefined,
  as: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const c = ["bp-toggle-group"];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <ToggleGroupRoot
    :class="rootClasses"
    :data-size="size"
    :model-value="modelValue"
    :default-value="defaultValue"
    :type="type"
    :disabled="disabled"
    :as-child="asChild"
    :as="as"
    @update:model-value="(v: any) => emit('update:modelValue', v)"
  >
    <slot />
  </ToggleGroupRoot>
</template>

<style>
.bp-toggle-group {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  border-radius: 6px;
  background-color: var(--color-surface-muted);
  padding: 3px;
  font-family: inherit;
}

.bp-toggle-group[data-size="sm"] {
  padding: 2px;
  border-radius: 4px;
}

.bp-toggle-group[data-size="lg"] {
  padding: 4px;
  border-radius: 8px;
}
</style>
