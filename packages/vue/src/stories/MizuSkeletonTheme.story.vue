<script setup lang="ts">
import MizuSkeletonTheme from "../components/MizuSkeletonTheme.vue";
</script>

<template>
  <Story title="MizuSkeletonTheme" :layout="{ type: 'single', width: 600 }">
    <Variant title="Default">
      <MizuSkeletonTheme>
        <div class="flex flex-col gap-3">
          <div class="h-4 w-3/4 rounded bg-surface-muted" />
          <div class="h-4 w-full rounded bg-surface-muted" />
          <div class="h-4 w-1/2 rounded bg-surface-muted" />
        </div>
      </MizuSkeletonTheme>
    </Variant>

    <Variant title="Custom Dimensions">
      <div class="flex flex-col gap-6">
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">
            Custom width / height / radius
          </p>
          <MizuSkeletonTheme width="200" height="16" radius="4">
            <div class="h-4 w-[200px] rounded bg-surface-muted" />
          </MizuSkeletonTheme>
        </div>
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">
            Circle with custom colors
          </p>
          <MizuSkeletonTheme
            base-color="#e2e8f0"
            highlight-color="#f1f5f9"
            width="48"
            height="48"
            radius="9999"
          >
            <div class="w-12 h-12 rounded-full" style="background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)" />
          </MizuSkeletonTheme>
        </div>
      </div>
    </Variant>

    <Variant title="Animation">
      <div class="flex flex-col gap-6">
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">
            Default animation (shimmer)
          </p>
          <MizuSkeletonTheme :enable-animation="true" :animation-duration="1.5">
            <div class="flex flex-col gap-3">
              <div class="h-4 w-3/4 rounded bg-surface-muted" />
              <div class="h-4 w-full rounded bg-surface-muted" />
            </div>
          </MizuSkeletonTheme>
        </div>
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">
            Disabled animation
          </p>
          <MizuSkeletonTheme :enable-animation="false">
            <div class="flex flex-col gap-3">
              <div class="h-4 w-3/4 rounded bg-surface-muted" />
              <div class="h-4 w-full rounded bg-surface-muted" />
            </div>
          </MizuSkeletonTheme>
        </div>
      </div>
    </Variant>
  </Story>
</template>
