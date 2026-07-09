<script setup lang="ts">
type Animation = "shimmer" | "pulse" | "none";

const props = withDefaults(
  defineProps<{
    /**
     * Animation style.
     * - `shimmer`: sweeping highlight overlay (default)
     * - `pulse`: opacity fade via animate-pulse
     * - `none`: static placeholder at reduced opacity
     */
    animation?: Animation;
  }>(),
  { animation: "shimmer" }
);
</script>

<template>
  <div
    class="bg-surface-muted mizu-skel-base"
    :class="[animation === 'pulse' ? 'animate-pulse' : animation === 'none' ? 'opacity-50' : 'skel-shimmer']"
    aria-hidden="true"
  />
</template>

<style scoped>
.skel-shimmer {
  position: relative;
  overflow: hidden;
}
.skel-shimmer::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.45) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: skel-shimmer-anim 1.5s ease-in-out infinite;
  pointer-events: none;
}
@keyframes skel-shimmer-anim {
  100% {
    transform: translateX(100%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .skel-shimmer {
    animation: none !important;
  }
  .skel-shimmer::after {
    animation: none !important;
  }
}
</style>

<style>
@layer components {
  .mizu-skel-base {
    border-radius: 0.375rem;
  }
}

[data-theme="dark"] .skel-shimmer::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 100%
  );
}
</style>
