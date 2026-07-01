<script setup lang="ts">
import { DatePickerGridRow } from "reka-ui";

defineProps();
</script>

<template>
  <DatePickerGridRow>
    <slot />
  </DatePickerGridRow>
</template>
