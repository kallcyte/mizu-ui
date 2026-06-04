<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface CardImageProps {
  src: string;
  alt?: string;
}

const props = withDefaults(defineProps<CardImageProps>(), {
  alt: "",
});

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["bp-card-image"];
  if (attrs.class) result.push(attrs.class as string);
  return result.join(" ");
});
</script>

<template>
  <div :class="classes">
    <img :src="props.src" :alt="props.alt" />
  </div>
</template>

<style>
@reference "../index.css";

.bp-card-image {
  @apply overflow-hidden;
  line-height: 0;
}

.bp-card-image img {
  @apply w-full object-cover;
  display: block;
  aspect-ratio: 2 / 1;
}
</style>
