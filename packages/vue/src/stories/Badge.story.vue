<script setup lang="ts">
import MizuBadge from "../components/MizuBadge.vue";
import MizuButton from "../components/MizuButton.vue";
</script>

<template>
  <Story title="Badge" :layout="{ type: 'single', width: 400 }">
    <Variant title="Variants" :description="'primary | accent | success | warning | error | info'">
      <div class="flex flex-wrap gap-3 items-center">
        <MizuBadge variant="primary">Primary</MizuBadge>
        <MizuBadge variant="accent">Accent</MizuBadge>
        <MizuBadge variant="success">Success</MizuBadge>
        <MizuBadge variant="warning">Warning</MizuBadge>
        <MizuBadge variant="error">Error</MizuBadge>
        <MizuBadge variant="info">Info</MizuBadge>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="flex flex-wrap gap-3 items-center">
        <MizuBadge size="sm">Small</MizuBadge>
        <MizuBadge size="md">Medium</MizuBadge>
      </div>
    </Variant>

    <Variant title="Dot Variant">
      <div class="flex flex-wrap gap-3 items-center">
        <MizuBadge variant="error" dot />
        <MizuBadge variant="success" dot />
        <MizuBadge variant="warning" dot />
        <MizuBadge variant="info" dot />
      </div>
    </Variant>

    <Variant title="Number Badge">
      <div class="flex flex-wrap gap-3 items-center">
        <MizuBadge :count="3">Notifications</MizuBadge>
        <MizuBadge :count="150">Messages</MizuBadge>
        <MizuBadge :count="0" show-zero>Empty</MizuBadge>
      </div>
    </Variant>
  </Story>
</template>
