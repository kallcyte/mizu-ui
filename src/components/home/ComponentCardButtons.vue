<script setup lang="ts">
import { MizunagiButton } from "@mizunagi/vue";
import { ArrowRight, Plus } from "@lucide/vue";
import "@mizunagi/vue/style.css";
</script>

<template>
  <div class="flex gap-1.5 flex-wrap items-center">
    <MizunagiButton size="sm" variant="primary">Get Started</MizunagiButton>
    <MizunagiButton size="sm" variant="accent">
      Learn More
      <template #trailing-icon><ArrowRight class="w-3.5 h-3.5" /></template>
    </MizunagiButton>
    <MizunagiButton size="sm" variant="ghost">Cancel</MizunagiButton>
    <MizunagiButton size="sm" variant="outline">
      <template #leading-icon><Plus class="w-3.5 h-3.5" /></template>
      Add Item
    </MizunagiButton>
  </div>
</template>
