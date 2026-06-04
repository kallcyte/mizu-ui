<script setup lang="ts">
import { MizuButton } from "@mizu/vue";
import { ArrowRight, Plus } from "@lucide/vue";
import "@mizu/vue/style.css";
</script>

<template>
  <div class="flex gap-1.5 flex-wrap items-center">
    <MizuButton size="sm" variant="primary">Get Started</MizuButton>
    <MizuButton size="sm" variant="accent">
      Learn More
      <template #trailing-icon><ArrowRight class="w-3.5 h-3.5" /></template>
    </MizuButton>
    <MizuButton size="sm" variant="ghost">Cancel</MizuButton>
    <MizuButton size="sm" variant="outline">
      <template #leading-icon><Plus class="w-3.5 h-3.5" /></template>
      Add Item
    </MizuButton>
  </div>
</template>
