<script setup lang="ts">
import { useAttrs } from "vue";
import { SliderRange } from "reka-ui";

export interface SliderRangeProps {
  asChild?: boolean;
  as?: string;
}

defineProps<SliderRangeProps>();

const attrs = useAttrs();
</script>

<template>
  <SliderRange
    :class="['mizu-slider__range', attrs.class]"
    :as-child="asChild"
    :as="as"
  />
</template>

<style>
.mizu-slider__range {
  all: revert;
  position: absolute;
  height: 100%;
  border-radius: 9999px;
  background-color: var(--color-brand-accent);
  font-family: inherit;
}
</style>
