<script setup lang="ts">
import MizuSkeleton from "../components/MizuSkeleton.vue";
</script>

<template>
  <Story title="MizuSkeleton" :layout="{ type: 'single', width: 600 }">
    <Variant title="Animations">
      <div class="flex flex-col gap-6">
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">Shimmer (default)</p>
          <MizuSkeleton class="h-4 w-48 rounded-md" />
        </div>
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">Pulse</p>
          <MizuSkeleton animation="pulse" class="h-4 w-48 rounded-md" />
        </div>
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">None</p>
          <MizuSkeleton animation="none" class="h-4 w-48 rounded-md" />
        </div>
      </div>
    </Variant>

    <Variant title="Shapes">
      <div class="flex flex-col gap-6">
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">Text line</p>
          <MizuSkeleton class="h-3.5 w-full rounded-md max-w-80" />
        </div>
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">Circle (avatar)</p>
          <MizuSkeleton class="size-12 rounded-full" />
        </div>
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">Rectangle (card)</p>
          <MizuSkeleton class="h-30 w-50 rounded-md" />
        </div>
      </div>
    </Variant>

    <Variant title="Multi-line Text">
      <div class="flex flex-col gap-2 max-w-sm">
        <MizuSkeleton class="h-3.5 w-full rounded-md" />
        <MizuSkeleton class="h-3.5 w-full rounded-md" />
        <MizuSkeleton class="h-3.5 w-3/5 rounded-md" />
      </div>
    </Variant>
  </Story>
</template>
