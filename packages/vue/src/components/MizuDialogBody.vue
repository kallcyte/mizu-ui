<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["mizu-dialog__body"];
  if (attrs.class) result.push(attrs.class as string);
  return result.join(" ");
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style>
.mizu-dialog__body {
  flex: 1;
  overflow-y: auto;
  max-height: 60vh;
  padding: 16px;
}

/* Fullscreen dialog — body fills available space without constraint */
.mizu-dialog__content--fullscreen .mizu-dialog__body,
.mizu-alert-dialog__content--fullscreen .mizu-dialog__body {
  max-height: none;
}</style>
