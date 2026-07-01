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
    :class="['mizu-slider__track', attrs.class]"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </SliderTrack>
</template>

<style>
.mizu-slider__track {
  all: revert;
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  background-color: var(--color-surface-muted);
  font-family: inherit;
}

.mizu-slider--horizontal .mizu-slider__track {
  width: 100%;
}

.mizu-slider--vertical .mizu-slider__track {
  width: 100%;
}

.mizu-slider--sm .mizu-slider__track {
  height: 4px;
}

.mizu-slider--md .mizu-slider__track {
  height: 6px;
}

.mizu-slider--lg .mizu-slider__track {
  height: 8px;
}
</style>
