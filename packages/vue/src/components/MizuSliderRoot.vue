<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SliderRoot } from "reka-ui";

export interface SliderRootProps {
  modelValue?: number | number[];
  defaultValue?: number | number[];
  min?: number;
  max?: number;
  step?: number;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  as?: string;
  dir?: "ltr" | "rtl";
  inverted?: boolean;
}

const props = withDefaults(defineProps<SliderRootProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  min: 0,
  max: 100,
  step: 1,
  orientation: "horizontal",
  disabled: false,
  size: "md",
  asChild: undefined,
  as: undefined,
  dir: undefined,
  inverted: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: number | number[]];
}>();

const attrs = useAttrs();

function toArray(value: number | number[] | undefined): number[] | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

function fromArray(value: number[] | undefined): number | number[] | undefined {
  if (value === undefined) return undefined;
  return value.length === 1 ? value[0] : value;
}

const rekaModelValue = computed(() => toArray(props.modelValue));
const rekaDefaultValue = computed(() => toArray(props.defaultValue));

const rootClasses = computed(() => {
  const classes = [
    "bp-slider",
    `bp-slider--${props.size}`,
    `bp-slider--${props.orientation}`,
  ];
  if (props.disabled) classes.push("bp-slider--disabled");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

function handleUpdate(v: number[] | undefined) {
  emit("update:modelValue", fromArray(v) ?? 0);
}
</script>

<template>
  <SliderRoot
    :class="rootClasses"
    :model-value="rekaModelValue"
    :default-value="rekaDefaultValue"
    :min="min"
    :max="max"
    :step="step"
    :orientation="orientation"
    :disabled="disabled"
    :dir="dir"
    :inverted="inverted"
    :as-child="asChild"
    :as="as"
    @update:model-value="handleUpdate"
  >
    <slot />
  </SliderRoot>
</template>

<style>
.bp-slider {
  all: revert;
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  font-family: inherit;
}

.bp-slider--horizontal {
  width: 100%;
  height: 20px;
}

.bp-slider--vertical {
  flex-direction: column;
  width: 20px;
  height: 100%;
  min-height: 200px;
}

.bp-slider--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
