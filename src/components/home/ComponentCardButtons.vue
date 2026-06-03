<script setup lang="ts">
import { NagiButton } from "@nagi/vue";
import { ArrowRight, Plus } from "@lucide/vue";
import "@nagi/vue/style.css";
</script>

<template>
  <div class="flex gap-1.5 flex-wrap items-center">
    <NagiButton size="sm" variant="primary">Get Started</NagiButton>
    <NagiButton size="sm" variant="accent">
      Learn More
      <template #trailing-icon><ArrowRight class="w-3.5 h-3.5" /></template>
    </NagiButton>
    <NagiButton size="sm" variant="ghost">Cancel</NagiButton>
    <NagiButton size="sm" variant="outline">
      <template #leading-icon><Plus class="w-3.5 h-3.5" /></template>
      Add Item
    </NagiButton>
  </div>
</template>
