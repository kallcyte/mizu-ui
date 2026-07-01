<script setup lang="ts">
import { useAttrs } from "vue";
import { SliderThumb } from "reka-ui";

export interface SliderThumbProps {
  asChild?: boolean;
  as?: string;
}

defineProps<SliderThumbProps>();

const attrs = useAttrs();
</script>

<template>
  <SliderThumb
    :class="['bp-slider__thumb', attrs.class]"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </SliderThumb>
</template>

<style>
.bp-slider__thumb {
  all: revert;
  display: block;
  border-radius: 9999px;
  background-color: var(--color-brand-accent);
  border: 2px solid var(--color-surface-base);
  outline: none;
  cursor: pointer;
  transition: box-shadow 200ms ease-in-out;
  font-family: inherit;
}

.bp-slider--sm .bp-slider__thumb {
  width: 14px;
  height: 14px;
}

.bp-slider--md .bp-slider__thumb {
  width: 18px;
  height: 18px;
}

.bp-slider--lg .bp-slider__thumb {
  width: 22px;
  height: 22px;
}

.bp-slider__thumb:hover {
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-brand-accent) 25%, transparent);
}

.bp-slider__thumb:focus-visible {
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-brand-accent) 25%, transparent);
}

.bp-slider__thumb[data-disabled] {
  background-color: var(--color-foreground-tertiary);
  cursor: not-allowed;
  box-shadow: none;
}
</style>
