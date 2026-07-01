<script setup lang="ts">
import { ComboboxGroup } from "reka-ui";

defineProps();
</script>

<template>
  <ComboboxGroup>
    <slot />
  </ComboboxGroup>
</template>
