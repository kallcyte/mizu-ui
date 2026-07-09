<script setup lang="ts">
import MizuButton from "../components/MizuButton.vue";
</script>

<template>
  <Story title="Button" :layout="{ type: 'single', width: 400 }">
    <Variant
      title="Variants"
      :description="'primary | accent | ghost | outline | success | warning | error | info'"
    >
      <div class="flex flex-wrap gap-3 items-center">
        <MizuButton variant="primary">Primary</MizuButton>
        <MizuButton variant="accent">Accent</MizuButton>
        <MizuButton variant="ghost">Ghost</MizuButton>
        <MizuButton variant="outline">Outline</MizuButton>
        <MizuButton variant="success">Success</MizuButton>
        <MizuButton variant="warning">Warning</MizuButton>
        <MizuButton variant="error">Error</MizuButton>
        <MizuButton variant="info">Info</MizuButton>
      </div>
    </Variant>

    <Variant title="Sizes" :description="'sm | md | lg'">
      <div class="flex flex-wrap gap-3 items-center">
        <MizuButton size="sm">Small</MizuButton>
        <MizuButton size="md">Medium</MizuButton>
        <MizuButton size="lg">Large</MizuButton>
      </div>
    </Variant>

    <Variant title="Outline Variants">
      <div class="flex flex-wrap gap-3 items-center">
        <MizuButton variant="outline-success">Success</MizuButton>
        <MizuButton variant="outline-warning">Warning</MizuButton>
        <MizuButton variant="outline-error">Error</MizuButton>
        <MizuButton variant="outline-info">Info</MizuButton>
      </div>
    </Variant>

    <Variant title="States">
      <div class="flex flex-wrap gap-3 items-center">
        <MizuButton disabled>Disabled</MizuButton>
        <MizuButton loading>Loading</MizuButton>
      </div>
    </Variant>
  </Story>
</template>
