<script setup lang="ts">
import { ref } from "vue";
import { MizuSkeleton, MizuSkeletonTheme, MizuAvatar, MizuCard, MizuCardHeader, MizuCardContent } from "@mizu/vue";

const loading = ref(true);
const user = ref<{ name: string; role: string; bio: string } | null>(null);

const list = [
    { id: 1, title: "Quarterly product review", size: 32 },
    { id: 2, title: "Design tokens audit", size: 56 },
    { id: 3, title: "Release v0.13 planning", size: 41 },
    { id: 4, title: "Marketing copy round 2", size: 28 },
];

function simulate() {
    loading.value = true;
    user.value = null;
    setTimeout(() => {
        loading.value = false;
        user.value = {
            name: "Jane Doe",
            role: "Senior Designer",
            bio: "Product designer focused on tokens, accessibility, and dense interfaces.",
        };
    }, 1500);
}
</script>

<template>
    <div class="skeleton-demo">
        <div class="demo-section">
            <h3>Variants</h3>
            <div class="row">
                <div class="col">
                    <span class="demo-label">Text</span>
                    <MizuSkeleton variant="text" />
                </div>
                <div class="col">
                    <span class="demo-label">Circle</span>
                    <MizuSkeleton variant="circle" :width="48" :height="48" />
                </div>
                <div class="col">
                    <span class="demo-label">Rect</span>
                    <MizuSkeleton variant="rect" :width="120" :height="64" />
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h3>Sizes</h3>
            <div class="stack">
                <MizuSkeleton variant="text" :lines="3" />
                <MizuSkeleton variant="text" :width="160" :lines="1" />
            </div>
        </div>

        <div class="demo-section">
            <h3>Custom Dimensions</h3>
            <div class="row gap-12 align-center">
                <MizuSkeleton variant="rect" :width="200" :height="100" :radius="12" />
                <MizuSkeleton variant="circle" :width="80" :height="80" />
                <MizuSkeleton variant="rect" :width="280" :height="20" :radius="10" />
            </div>
        </div>

        <div class="demo-section">

<h3>Animation</h3>
        <div class="row gap-12 align-center">
            <div class="col">
                <span class="demo-label">Shimmer</span>
                <MizuSkeleton variant="rect" :width="100" :height="20" animation="shimmer" />
            </div>
            <div class="col">
                <span class="demo-label">Pulse</span>
                <MizuSkeleton variant="rect" :width="100" :height="20" animation="pulse" />
            </div>
            <div class="col">
                <span class="demo-label">None</span>
                <MizuSkeleton variant="rect" :width="100" :height="20" animation="none" />
            </div>
        </div>
    </div>

        <div class="demo-section">
            <h3>In Card Placeholder</h3>
            <MizuCard>
                <MizuCardHeader>
                    <div class="profile-row">
                        <MizuSkeleton variant="circle" :width="48" :height="48" />
                        <div class="profile-lines">
                            <MizuSkeleton variant="text" :width="140" :lines="1" />
                            <MizuSkeleton variant="text" :width="100" :lines="1" />
                        </div>
                    </div>
                </MizuCardHeader>
                <MizuCardContent>
                    <MizuSkeleton variant="text" :lines="3" />
                </MizuCardContent>
            </MizuCard>
        </div>

        <div class="demo-section">
            <h3>Multi-line Text (lines prop)</h3>
            <div class="stack">
                <MizuSkeleton variant="text" :lines="5" />
            </div>
        </div>

        <div class="demo-section">
            <h3>Loading Wrapper</h3>
            <p class="demo-note">Use <code>loading</code> prop — skeleton wraps content, shows placeholder while loading, reveals content when ready.</p>
            <div class="row gap-12 align-center" style="margin-bottom: 12px;">
                <button type="button" class="trigger-btn" @click="simulate">Reload</button>
                <span class="demo-label">Click to simulate async load</span>
            </div>
            <MizuCard>
                <MizuCardHeader>
                    <div class="profile-row">
                        <MizuSkeleton :loading="loading || !user" variant="circle" :width="48" :height="48">
                            <MizuAvatar name="Jane Doe" size="lg" />
                        </MizuSkeleton>
                        <div class="profile-lines">
                            <MizuSkeleton :loading="loading || !user" variant="text" :width="140" :lines="1">
                                <h4>{{ user?.name }}</h4>
                            </MizuSkeleton>
                            <MizuSkeleton :loading="loading || !user" variant="text" :width="100" :lines="1">
                                <p>{{ user?.role }}</p>
                            </MizuSkeleton>
                        </div>
                    </div>
                </MizuCardHeader>
                <MizuCardContent>
                    <MizuSkeleton :loading="loading || !user" variant="text" :lines="3">
                        <p>{{ user?.bio }}</p>
                    </MizuSkeleton>
                </MizuCardContent>
            </MizuCard>
        </div>

        <div class="demo-section">
            <h3>Theme Provider</h3>
            <p class="demo-note"><code>MizuSkeletonTheme</code> sets defaults — customize <code>baseColor</code>, <code>highlightColor</code>, <code>animationDuration</code>, etc. for all child skeletons.</p>
            <div class="row gap-12 align-center">
                <MizuSkeletonTheme base-color="#dbeafe" highlight-color="#93c5fd">
                    <MizuSkeleton variant="rect" :width="120" :height="64" :radius="12" />
                </MizuSkeletonTheme>
                <MizuSkeletonTheme base-color="#dcfce7" highlight-color="#86efac" animation-direction="reverse">
                    <MizuSkeleton variant="rect" :width="120" :height="64" :radius="12" />
                </MizuSkeletonTheme>
                <MizuSkeletonTheme base-color="#fef3c7" highlight-color="#fcd34d" :animation-duration="0.8">
                    <MizuSkeleton variant="rect" :width="120" :height="64" :radius="12" />
                </MizuSkeletonTheme>
            </div>
        </div>

        <div class="demo-section">
            <h3>List Placeholders</h3>
            <div class="stack">
                <div v-for="item in list" :key="item.id" class="list-item">
                    <MizuSkeleton variant="circle" :width="36" :height="36" />
                    <div class="profile-lines" style="flex: 1;">
                        <MizuSkeleton variant="text" :width="`${item.size}%`" :lines="1" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.skeleton-demo {
    all: revert;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    background: var(--sl-color-gray-2);
    border-radius: 8px;
}

.skeleton-demo :deep(*) {
    margin: 0;
}

.demo-section {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.demo-section > * {
    margin-top: 0;
}

.demo-section h3 {
    all: revert;
    font-size: 14px;
    font-weight: 600;
    color: var(--sl-color-text);
    margin: 0;
}

.demo-label {
    font-size: 11px;
    font-weight: 500;
    color: var(--sl-color-text-light);
    margin: 0;
    display: block;
}

.row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 24px;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 80px;
}

.stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.gap-12 {
    gap: 12px;
}

.align-center {
    align-items: center;
}

.profile-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.profile-lines {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
}

.profile-lines h4,
.profile-lines p {
    margin: 0;
}

.list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
}

.demo-note { font-size: 12px; color: var(--sl-color-text-light); margin: 0; }
.demo-note code { font-size: 11px; }
.trigger-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 12px;
    background-color: var(--color-brand-primary);
    color: var(--color-foreground-inverse);
    border-color: var(--color-brand-primary);
}
</style>
