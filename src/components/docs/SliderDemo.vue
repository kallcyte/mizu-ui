<script setup lang="ts">
import { ref, computed } from "vue";
import {
  MizuSliderRoot,
  MizuSliderTrack,
  MizuSliderRange,
  MizuSliderThumb,
} from "@mizu/vue";

const basicValue = ref<number>(50);
const rangeValue = ref<number[]>([20, 80]);
const steppedValue = ref<number>(5);
const smValue = ref<number>(40);
const mdValue = ref<number>(60);
const lgValue = ref<number>(70);
const verticalValue = ref<number>(30);
const disabledValue = ref<number>(50);
</script>

<template>
  <div class="slider-demo">
    <div class="demo-section">
      <h3>Basic</h3>
      <MizuSliderRoot v-model="basicValue" class="slider-root">
        <MizuSliderTrack>
          <MizuSliderRange />
        </MizuSliderTrack>
        <MizuSliderThumb />
      </MizuSliderRoot>
      <p class="demo-hint">Value: {{ basicValue }}</p>
    </div>

    <div class="demo-section">
      <h3>Range</h3>
      <MizuSliderRoot v-model="rangeValue" class="slider-root">
        <MizuSliderTrack>
          <MizuSliderRange />
        </MizuSliderTrack>
        <MizuSliderThumb />
        <MizuSliderThumb />
      </MizuSliderRoot>
      <p class="demo-hint">Value: {{ rangeValue[0] }} - {{ rangeValue[1] }}</p>
    </div>

    <div class="demo-section">
      <h3>Steps</h3>
      <MizuSliderRoot v-model="steppedValue" :min="0" :max="10" :step="2" class="slider-root">
        <MizuSliderTrack>
          <MizuSliderRange />
        </MizuSliderTrack>
        <MizuSliderThumb />
      </MizuSliderRoot>
      <p class="demo-hint">Value: {{ steppedValue }} (step: 2)</p>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <div class="slider-stack">
        <div class="slider-row">
          <span class="slider-label">sm</span>
          <MizuSliderRoot v-model="smValue" size="sm" class="slider-root">
            <MizuSliderTrack>
              <MizuSliderRange />
            </MizuSliderTrack>
            <MizuSliderThumb />
          </MizuSliderRoot>
          <span class="slider-value">{{ smValue }}</span>
        </div>
        <div class="slider-row">
          <span class="slider-label">md</span>
          <MizuSliderRoot v-model="mdValue" size="md" class="slider-root">
            <MizuSliderTrack>
              <MizuSliderRange />
            </MizuSliderTrack>
            <MizuSliderThumb />
          </MizuSliderRoot>
          <span class="slider-value">{{ mdValue }}</span>
        </div>
        <div class="slider-row">
          <span class="slider-label">lg</span>
          <MizuSliderRoot v-model="lgValue" size="lg" class="slider-root">
            <MizuSliderTrack>
              <MizuSliderRange />
            </MizuSliderTrack>
            <MizuSliderThumb />
          </MizuSliderRoot>
          <span class="slider-value">{{ lgValue }}</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>Vertical</h3>
      <div class="vertical-container">
        <MizuSliderRoot v-model="verticalValue" orientation="vertical" class="slider-root-vertical">
          <MizuSliderTrack>
            <MizuSliderRange />
          </MizuSliderTrack>
          <MizuSliderThumb />
        </MizuSliderRoot>
        <p class="demo-hint">Value: {{ verticalValue }}</p>
      </div>
    </div>

    <div class="demo-section">
      <h3>Disabled</h3>
      <MizuSliderRoot v-model="disabledValue" disabled class="slider-root">
        <MizuSliderTrack>
          <MizuSliderRange />
        </MizuSliderTrack>
        <MizuSliderThumb />
      </MizuSliderRoot>
      <p class="demo-hint">Value: {{ disabledValue }}</p>
    </div>
  </div>
</template>

<style scoped>
.slider-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: var(--sl-color-gray-2);
  border-radius: 8px;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 0;
}

.demo-section > * {
  margin-top: 0;
}

.demo-section h3 {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin-bottom: 0;
  margin-top: 0;
}

.slider-root {
  max-width: 300px;
}

.slider-root-vertical {
  height: 200px;
}

.demo-hint {
  all: revert;
  font-size: 12px;
  color: var(--sl-color-text);
  margin: 0;
}

.slider-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--sl-color-text);
  width: 24px;
  flex-shrink: 0;
}

.slider-value {
  font-size: 12px;
  color: var(--sl-color-text);
  width: 32px;
  flex-shrink: 0;
  text-align: right;
}

.slider-row .slider-root {
  flex: 1;
  max-width: 240px;
}

.vertical-container {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
</style>
