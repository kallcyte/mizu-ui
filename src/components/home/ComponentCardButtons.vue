<script setup lang="ts">
import { BlueprintButton } from "@blueprint/vue";
import { ArrowRight, Plus } from "@lucide/vue";
import "@blueprint/vue/style.css";
</script>

<template>
  <div class="flex gap-1.5 flex-wrap items-center">
    <BlueprintButton size="sm" variant="primary">Get Started</BlueprintButton>
    <BlueprintButton size="sm" variant="accent">
      Learn More
      <template #trailing-icon><ArrowRight class="w-3.5 h-3.5" /></template>
    </BlueprintButton>
    <BlueprintButton size="sm" variant="ghost">Cancel</BlueprintButton>
    <BlueprintButton size="sm" variant="outline">
      <template #leading-icon><Plus class="w-3.5 h-3.5" /></template>
      Add Item
    </BlueprintButton>
  </div>
</template>
