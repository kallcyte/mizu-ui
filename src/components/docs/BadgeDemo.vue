<script setup lang="ts">
import { MizuBadge, MizuAvatar } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const variantsCode = `<MizuBadge variant="primary" :count="1" />
<MizuBadge variant="accent" :count="2" />
<MizuBadge variant="success" :count="3" />
<MizuBadge variant="warning" :count="4" />
<MizuBadge variant="error" :count="5" />
<MizuBadge variant="info" :count="6" />`;

const sizesCode = `<MizuBadge size="sm" :count="5" />
<MizuBadge size="md" :count="5" />`;

const dotIndicatorCode = `<MizuBadge dot variant="success" size="sm" />
<MizuBadge dot variant="warning" size="sm" />
<MizuBadge dot variant="error" size="sm" />`;

const countOverflowCode = `<MizuBadge :count="5" />
<MizuBadge :count="42" />
<MizuBadge :count="99" />
<MizuBadge :count="150" />
<MizuBadge :count="1000" :max="999" />`;

const showZeroCode = `<MizuBadge :count="0" />
<MizuBadge :count="0" show-zero />`;

const positionedOnAvatarCode = `<div class="relative">
  <MizuAvatar name="Jane Doe" size="lg" />
  <MizuBadge dot variant="success" position="bottom-right" />
</div>`;

const textContentCode = `<MizuBadge variant="accent">New</MizuBadge>
<MizuBadge variant="success">Beta</MizuBadge>
<MizuBadge variant="error">Hot</MizuBadge>
<MizuBadge variant="info" size="sm">v2</MizuBadge>`;
</script>

<template>
    <div class="badge-demo not-content">
        <DemoTabs :code="variantsCode">
        <div class="demo-section">
            <h3>Variants</h3>
            <div class="badge-row">
                <div class="badge-item">
                    <MizuBadge variant="primary" :count="1" />
                    <span class="badge-label">Primary</span>
                </div>
                <div class="badge-item">
                    <MizuBadge variant="accent" :count="2" />
                    <span class="badge-label">Accent</span>
                </div>
                <div class="badge-item">
                    <MizuBadge variant="success" :count="3" />
                    <span class="badge-label">Success</span>
                </div>
                <div class="badge-item">
                    <MizuBadge variant="warning" :count="4" />
                    <span class="badge-label">Warning</span>
                </div>
                <div class="badge-item">
                    <MizuBadge variant="error" :count="5" />
                    <span class="badge-label">Error</span>
                </div>
                <div class="badge-item">
                    <MizuBadge variant="info" :count="6" />
                    <span class="badge-label">Info</span>
                </div>
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="sizesCode">
        <div class="demo-section">
            <h3>Sizes</h3>
            <div class="badge-row">
                <div class="badge-item">
                    <MizuBadge size="sm" :count="5" />
                    <span class="badge-label">Small</span>
                </div>
                <div class="badge-item">
                    <MizuBadge size="md" :count="5" />
                    <span class="badge-label">Medium</span>
                </div>
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="dotIndicatorCode">
        <div class="demo-section">
            <h3>Dot Indicator</h3>
            <div class="badge-row">
                <div class="badge-item">
                    <MizuBadge dot variant="success" size="sm" />
                    <span class="badge-label">Online</span>
                </div>
                <div class="badge-item">
                    <MizuBadge dot variant="warning" size="sm" />
                    <span class="badge-label">Away</span>
                </div>
                <div class="badge-item">
                    <MizuBadge dot variant="error" size="sm" />
                    <span class="badge-label">Offline</span>
                </div>
                <div class="badge-item">
                    <MizuBadge dot variant="info" size="md" />
                    <span class="badge-label">Larger dot</span>
                </div>
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="countOverflowCode">
        <div class="demo-section">
            <h3>Count Overflow</h3>
            <div class="badge-row">
                <div class="badge-item">
                    <MizuBadge :count="5" />
                    <span class="badge-label">5</span>
                </div>
                <div class="badge-item">
                    <MizuBadge :count="42" />
                    <span class="badge-label">42</span>
                </div>
                <div class="badge-item">
                    <MizuBadge :count="99" />
                    <span class="badge-label">99 (at max)</span>
                </div>
                <div class="badge-item">
                    <MizuBadge :count="150" />
                    <span class="badge-label">150 (overflows)</span>
                </div>
                <div class="badge-item">
                    <MizuBadge :count="1000" :max="999" />
                    <span class="badge-label">Custom max: 999+</span>
                </div>
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="showZeroCode">
        <div class="demo-section">
            <h3>Show Zero</h3>
            <div class="badge-row">
                <div class="badge-item">
                    <MizuBadge :count="0" />
                    <span class="badge-label">Hidden (default)</span>
                </div>
                <div class="badge-item">
                    <MizuBadge :count="0" show-zero />
                    <span class="badge-label">Visible</span>
                </div>
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="positionedOnAvatarCode">
        <div class="demo-section">
            <h3>Positioned on Avatar</h3>
            <p class="demo-hint">Wrap the target element and badge in a relative container.</p>
            <div class="badge-row">
                <div class="avatar-badge-wrapper">
                    <MizuAvatar name="Jane Doe" size="lg" />
                    <MizuBadge dot variant="success" position="bottom-right" />
                </div>
                <div class="avatar-badge-wrapper">
                    <MizuAvatar name="John Smith" size="lg" />
                    <MizuBadge :count="3" variant="error" position="top-right" />
                </div>
                <div class="avatar-badge-wrapper">
                    <MizuAvatar name="Alex Kim" size="lg" />
                    <MizuBadge :count="128" variant="accent" position="top-right" />
                </div>
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="textContentCode">
        <div class="demo-section">
            <h3>Text Content</h3>
            <div class="badge-row">
                <div class="badge-item">
                    <MizuBadge variant="accent">New</MizuBadge>
                    <span class="badge-label">Accent</span>
                </div>
                <div class="badge-item">
                    <MizuBadge variant="success">Beta</MizuBadge>
                    <span class="badge-label">Success</span>
                </div>
                <div class="badge-item">
                    <MizuBadge variant="error">Hot</MizuBadge>
                    <span class="badge-label">Error</span>
                </div>
                <div class="badge-item">
                    <MizuBadge variant="info" size="sm">v2</MizuBadge>
                    <span class="badge-label">Small</span>
                </div>
            </div>
        </div>
        </DemoTabs>
    </div>
</template>

<style scoped>
.badge-demo {
    all: revert;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    background: transparent;

    border: 1px solid var(--color-surface-muted);
    border-radius: 8px;
}

.badge-demo :deep(*) {
    margin: 0;
}

.demo-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.demo-section h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--sl-color-text);
    margin: 0;
}

.demo-section > div {
    margin-top: 0;
}

.demo-hint {
    font-size: 12px;
    color: var(--sl-color-text-light);
    margin: 0;
}

.badge-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    margin: 0;
    padding: 0;
}

.badge-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.badge-label {
    font-size: 12px;
    color: var(--sl-color-text-light);
}

.avatar-badge-wrapper {
    position: relative;
    display: inline-flex;
}
</style>
