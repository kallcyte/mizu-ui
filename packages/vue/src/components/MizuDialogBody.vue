<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

const classes = computed(() => {
  const result = ["bp-dialog__body"];
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
.bp-dialog__body {
  flex: 1;
  overflow-y: auto;
  max-height: 60vh;
  padding: 16px;
}
</style>
