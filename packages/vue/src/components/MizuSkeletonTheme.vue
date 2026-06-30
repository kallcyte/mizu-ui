<script setup lang="ts">
import { provide } from "vue";
import {
  SKELETON_THEME_KEY,
  type SkeletonThemeProps,
} from "./skeleton-types";

const props = withDefaults(defineProps<SkeletonThemeProps>(), {
  width: undefined,
  height: undefined,
  radius: undefined,
  baseColor: undefined,
  highlightColor: undefined,
  animationDuration: undefined,
  animationDirection: undefined,
  enableAnimation: undefined,
  customHighlightBackground: undefined,
});

provide(SKELETON_THEME_KEY, props);
</script>

<template>
  <slot />
</template>
