<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const isPlaying = ref(false);
const dotRefs = ref<(HTMLElement | null)[]>([]);

interface EasingItem {
  name: string;
  cssValue: string;
  token: string;
  delay: number;
}

const easings: EasingItem[] = [
  { name: "Default (ease-out)", cssValue: "ease-out", token: "var(--ease-default)", delay: 0 },
  { name: "Exit (ease-in)", cssValue: "ease-in", token: "var(--ease-exit)", delay: 80 },
  {
    name: "Interaction (ease-in-out)",
    cssValue: "ease-in-out",
    token: "var(--ease-interaction)",
    delay: 160,
  },
  {
    name: "Emphasized (out-back)",
    cssValue: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    token: "var(--ease-emphasized)",
    delay: 240,
  },
  {
    name: "Entrance (decelerated)",
    cssValue: "cubic-bezier(0.16, 1, 0.3, 1)",
    token: "var(--ease-entrance)",
    delay: 320,
  },
];

function setRef(el: HTMLElement | null, i: number) {
  dotRefs.value[i] = el;
}

function play() {
  if (isPlaying.value) return;
  isPlaying.value = true;

  const maxDelay = Math.max(...easings.map((e) => e.delay));

  easings.forEach((easing, i) => {
    const el = dotRefs.value[i];
    if (!el) return;

    // Cancel any previous animation (snaps dot back to start instantly)
    el.getAnimations().forEach((a) => a.cancel());

    // Compute the maximum translation so the dot reaches the right edge
    const track = el.parentElement!;
    const dotW = 24;
    const padding = 4; // 2px each side
    const maxX = track.clientWidth - dotW - padding;

    el.animate([{ transform: "translateX(0)" }, { transform: `translateX(${maxX}px)` }], {
      duration: 1000,
      delay: easing.delay,
      easing: easing.cssValue,
      fill: "forwards",
    });
  });

  // Re-enable button after the slowest animation finishes
  setTimeout(() => {
    isPlaying.value = false;
  }, maxDelay + 1000);
}

const usageCode = `/* CSS custom properties */
.my-element {
  transition: transform 300ms var(--ease-emphasized);
  animation: slideIn 400ms var(--ease-entrance);
}

/* In @keyframes */
@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* In JavaScript / TypeScript */
import { EASE_EMPHASIZED } from '@mizu/tokens';

/* Accordion example */
.mizu-accordion__content[data-state="open"] {
  animation: slideDown 200ms var(--ease-emphasized);
}`;
</script>

<template>
  <div class="easing-examples">
    <section class="example-section">
      <h3>Easing Curves</h3>
      <CodeCollapsible :code="usageCode">
        <div class="easing-list">
          <div v-for="(easing, i) in easings" :key="easing.name" class="easing-row">
            <div class="easing-head">
              <strong class="easing-name">{{ easing.name }}</strong>
              <code class="easing-token">{{ easing.token }}</code>
              <code class="easing-value">{{ easing.cssValue }}</code>
            </div>
            <div class="easing-track">
              <div :ref="(el: any) => setRef(el, i)" class="easing-dot" />
            </div>
          </div>
        </div>
        <button class="play-button" :disabled="isPlaying" @click="play">
          {{ isPlaying ? "Animating..." : "Play All" }}
        </button>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.easing-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.easing-examples :deep(*) {
  margin: 0;
}

.example-section {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.example-section h3 {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}

.easing-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.easing-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.easing-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  flex-wrap: wrap;
}

.easing-name {
  color: var(--sl-color-text);
  font-weight: 600;
  min-width: 185px;
}

.easing-token {
  font-size: 11px;
  font-family: var(--font-family-mono);
  color: var(--sl-color-gray-5);
  background: var(--sl-color-gray-2);
  padding: 1px 6px;
  border-radius: 3px;
}

.easing-value {
  font-size: 11px;
  font-family: var(--font-family-mono);
  color: var(--sl-color-gray-4);
}

.easing-track {
  position: relative;
  height: 28px;
  background: var(--sl-color-gray-2);
  border-radius: 6px;
  overflow: hidden;
}

.easing-dot {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-brand-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.play-button {
  font-family: var(--font-family-sans);
  font-size: 13px;
  padding: 8px 20px;
  background: var(--color-brand-primary);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: fit-content;
  transition: background 200ms ease-in-out;
}
.play-button:hover:not(:disabled) {
  background: var(--color-brand-primary-hover);
}
.play-button:disabled {
  opacity: 0.6;
  cursor: default;
}

:global(html[data-theme="dark"]) .easing-examples {
  background: transparent;
}
:global(html[data-theme="dark"]) .easing-token {
  background: var(--sl-color-gray-3);
  color: var(--sl-color-gray-6);
}
:global(html[data-theme="dark"]) .easing-value {
  color: var(--sl-color-gray-5);
}
:global(html[data-theme="dark"]) .easing-track {
  background: var(--sl-color-gray-3);
}
</style>
