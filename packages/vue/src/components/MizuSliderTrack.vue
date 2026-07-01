<script setup lang="ts">
import { useAttrs } from "vue";
import { SliderTrack } from "reka-ui";

export interface SliderTrackProps {
  asChild?: boolean;
  as?: string;
}

defineProps<SliderTrackProps>();

const attrs = useAttrs();
</script>

<template>
  <SliderTrack
    :class="['bp-slider__track', attrs.class]"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </SliderTrack>
</template>

<style>
.bp-slider__track {
  all: revert;
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  background-color: var(--color-surface-muted);
  font-family: inherit;
}

.bp-slider--horizontal .bp-slider__track {
  width: 100%;
}

.bp-slider--vertical .bp-slider__track {
  width: 100%;
}

.bp-slider--sm .bp-slider__track {
  height: 4px;
}

.bp-slider--md .bp-slider__track {
  height: 6px;
}

.bp-slider--lg .bp-slider__track {
  height: 8px;
}
</style>
