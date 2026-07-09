<script setup lang="ts">
import { ref, computed } from "vue";
import { MizuSliderRoot, MizuSliderTrack, MizuSliderRange, MizuSliderThumb } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicCode = `<MizuSliderRoot v-model="basicValue" class="slider-root">
  <MizuSliderTrack>
    <MizuSliderRange />
  </MizuSliderTrack>
  <MizuSliderThumb />
</MizuSliderRoot>`;

const rangeCode = `<MizuSliderRoot v-model="rangeValue" class="slider-root">
  <MizuSliderTrack>
    <MizuSliderRange />
  </MizuSliderTrack>
  <MizuSliderThumb />
  <MizuSliderThumb />
</MizuSliderRoot>`;

const stepsCode = `<MizuSliderRoot v-model="steppedValue" :min="0" :max="10" :step="2" class="slider-root">
  <MizuSliderTrack>
    <MizuSliderRange />
  </MizuSliderTrack>
  <MizuSliderThumb />
</MizuSliderRoot>`;

const sizesCode = `<div class="slider-stack">
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
</div>`;

const verticalCode = `<div class="vertical-container">
  <MizuSliderRoot v-model="verticalValue" orientation="vertical" class="slider-root-vertical">
    <MizuSliderTrack>
      <MizuSliderRange />
    </MizuSliderTrack>
    <MizuSliderThumb />
  </MizuSliderRoot>
  <p class="demo-hint">Value: {{ verticalValue }}</p>
</div>`;

const disabledCode = `<MizuSliderRoot v-model="disabledValue" disabled class="slider-root">
  <MizuSliderTrack>
    <MizuSliderRange />
  </MizuSliderTrack>
  <MizuSliderThumb />
</MizuSliderRoot>`;

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
  <div class="slider-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <MizuSliderRoot v-model="basicValue" class="slider-root">
          <MizuSliderTrack>
            <MizuSliderRange />
          </MizuSliderTrack>
          <MizuSliderThumb />
        </MizuSliderRoot>
        <p class="demo-hint">Value: {{ basicValue }}</p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Range</h3>
      <CodeCollapsible :code="rangeCode">
        <MizuSliderRoot v-model="rangeValue" class="slider-root">
          <MizuSliderTrack>
            <MizuSliderRange />
          </MizuSliderTrack>
          <MizuSliderThumb />
          <MizuSliderThumb />
        </MizuSliderRoot>
        <p class="demo-hint">Value: {{ rangeValue[0] }} - {{ rangeValue[1] }}</p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Steps</h3>
      <CodeCollapsible :code="stepsCode">
        <MizuSliderRoot v-model="steppedValue" :min="0" :max="10" :step="2" class="slider-root">
          <MizuSliderTrack>
            <MizuSliderRange />
          </MizuSliderTrack>
          <MizuSliderThumb />
        </MizuSliderRoot>
        <p class="demo-hint">Value: {{ steppedValue }} (step: 2)</p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
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
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Vertical</h3>
      <CodeCollapsible :code="verticalCode">
        <div class="vertical-container">
          <MizuSliderRoot
            v-model="verticalValue"
            orientation="vertical"
            class="slider-root-vertical"
          >
            <MizuSliderTrack>
              <MizuSliderRange />
            </MizuSliderTrack>
            <MizuSliderThumb />
          </MizuSliderRoot>
          <p class="demo-hint">Value: {{ verticalValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="disabledCode">
        <MizuSliderRoot v-model="disabledValue" disabled class="slider-root">
          <MizuSliderTrack>
            <MizuSliderRange />
          </MizuSliderTrack>
          <MizuSliderThumb />
        </MizuSliderRoot>
        <p class="demo-hint">Value: {{ disabledValue }}</p>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.slider-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.slider-examples :deep(*) {
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
