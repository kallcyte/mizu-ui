<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { MizuSkeleton, MizuSkeletonTheme, MizuButton, MizuAvatar, MizuCard, MizuCardHeader, MizuCardContent } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const loading = ref(true);
const user = ref<{ name: string; role: string; bio: string } | null>(null);
const elapsed = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

onUnmounted(() => {
    if (timer) clearInterval(timer);
});

const list = [
    { id: 1, title: "Quarterly product review", size: 32 },
    { id: 2, title: "Design tokens audit", size: 56 },
    { id: 3, title: "Release v0.13 planning", size: 41 },
    { id: 4, title: "Marketing copy round 2", size: 28 },
];

function simulate() {
    return new Promise<void>((resolve) => {
        loading.value = true;
        elapsed.value = 0;
        user.value = null;
        timer = setInterval(() => {
            elapsed.value = Math.round((elapsed.value + 0.1) * 10) / 10;
        }, 100);
        setTimeout(() => {
            if (timer) clearInterval(timer);
            timer = null;
            loading.value = false;
            user.value = {
                name: "Jane Doe",
                role: "Senior Designer",
                bio: "Product designer focused on tokens, accessibility, and dense interfaces.",
            };
            resolve();
        }, 1500);
    });
}

const variantsCode = `<MizuSkeleton variant="text" />
<MizuSkeleton variant="circle" :width="48" :height="48" />
<MizuSkeleton variant="rect" :width="120" :height="64" />`;

const sizesCode = `<MizuSkeleton variant="text" :width="80" :lines="1" />
<MizuSkeleton variant="text" :width="200" :lines="2" />
<MizuSkeleton variant="text" :width="320" :lines="4" />`;

const dimensionsCode = `<MizuSkeleton variant="rect" :width="200" :height="100" :radius="12" />
<MizuSkeleton variant="circle" :width="80" :height="80" />
<MizuSkeleton variant="rect" :width="280" :height="20" :radius="10" />`;

const animationCode = `<MizuSkeleton variant="rect" :width="100" :height="20" animation="shimmer" />
<MizuSkeleton variant="rect" :width="100" :height="20" animation="pulse" />
<MizuSkeleton variant="rect" :width="100" :height="20" animation="none" />`;

const cardPlaceholderCode = `<MizuCard>
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
</MizuCard>`;

const multiLineCode = `<MizuSkeleton variant="text" :lines="5" />`;

const loadingCode = `<MizuCard>
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
</MizuCard>`;

const themeCode = `<MizuSkeleton variant="rect" :width="80" :height="48" :radius="8" />
<MizuSkeleton variant="text" :width="160" :lines="2" />

<MizuSkeletonTheme base-color="brand-primary" highlight-color="brand-primary-subtle">
  <MizuSkeleton variant="rect" :width="80" :height="48" :radius="8" />
  <MizuSkeleton variant="text" :width="160" :lines="2" />
</MizuSkeletonTheme>

<MizuSkeletonTheme base-color="brand-primary" highlight-color="brand-primary-subtle">
  <MizuSkeleton variant="rect" :width="80" :height="48" :radius="8" />
  <MizuSkeleton variant="text" :width="160" :lines="2" base-color="feedback-success-base" />
</MizuSkeletonTheme>`;

const listCode = `<div v-for="item in list" :key="item.id">
  <MizuSkeleton variant="circle" :width="36" :height="36" />
  <MizuSkeleton variant="text" :width="\`\${item.size}%\`" :lines="1" />
</div>`;
</script>

<template>
    <div class="skeleton-examples">
        <section class="example-section">
            <h3>Variants</h3>
            <CodeCollapsible :code="variantsCode">
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
            </CodeCollapsible>
        </section>

        <section class="example-section">
            <h3>Sizes</h3>
            <CodeCollapsible :code="sizesCode">
                <div class="stack">
                    <div class="size-row">
                        <span class="demo-label">Small (80px, 1 line)</span>
                        <MizuSkeleton variant="text" :width="80" :lines="1" />
                    </div>
                    <div class="size-row">
                        <span class="demo-label">Medium (200px, 2 lines)</span>
                        <MizuSkeleton variant="text" :width="200" :lines="2" />
                    </div>
                    <div class="size-row">
                        <span class="demo-label">Large (320px, 4 lines)</span>
                        <MizuSkeleton variant="text" :width="320" :lines="4" />
                    </div>
                </div>
            </CodeCollapsible>
        </section>

        <section class="example-section">
            <h3>Custom Dimensions</h3>
            <CodeCollapsible :code="dimensionsCode">
                <div class="row gap-12 align-center">
                    <MizuSkeleton variant="rect" :width="200" :height="100" :radius="12" />
                    <MizuSkeleton variant="circle" :width="80" :height="80" />
                    <MizuSkeleton variant="rect" :width="280" :height="20" :radius="10" />
                </div>
            </CodeCollapsible>
        </section>

        <section class="example-section">
            <h3>Animation</h3>
            <CodeCollapsible :code="animationCode">
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
            </CodeCollapsible>
        </section>

        <section class="example-section">
            <h3>In Card Placeholder</h3>
            <CodeCollapsible :code="cardPlaceholderCode">
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
            </CodeCollapsible>
        </section>

        <section class="example-section">
            <h3>Multi-line Text (lines prop)</h3>
            <CodeCollapsible :code="multiLineCode">
                <div class="stack">
                    <MizuSkeleton variant="text" :lines="5" />
                </div>
            </CodeCollapsible>
        </section>

        <section class="example-section">
            <h3>Loading Wrapper</h3>
            <CodeCollapsible :code="loadingCode">
                <p class="demo-note">Use <code>loading</code> prop — skeleton wraps content, shows placeholder while loading, reveals content when ready.</p>
                <div class="row gap-12 align-center" style="margin-bottom: 12px;">
                    <MizuButton type="button" size="sm" :loading-auto="true" @click="simulate">{{ loading ? `Loading... ${elapsed.toFixed(1)}s` : 'Reload' }}</MizuButton>
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
            </CodeCollapsible>
        </section>

        <section class="example-section">
            <h3>Theme Provider</h3>
            <CodeCollapsible :code="themeCode">
                <p class="demo-note"><code>MizuSkeletonTheme</code> sets default props for all child skeletons — avoids repeating <code>baseColor</code>, <code>highlightColor</code>, etc. on every instance. Individual skeletons can still override by setting the prop directly.</p>
                <div class="stack">
                    <div class="theme-group">
                        <span class="demo-label">No theme (default gray)</span>
                        <div class="row gap-12 align-center">
                            <MizuSkeleton variant="rect" :width="80" :height="48" :radius="8" />
                            <MizuSkeleton variant="text" :width="160" :lines="2" />
                        </div>
                    </div>
                    <div class="theme-group">
                        <span class="demo-label">With theme (both inherit)</span>
                        <MizuSkeletonTheme base-color="brand-primary" highlight-color="brand-primary-subtle">
                            <div class="row gap-12 align-center">
                                <MizuSkeleton variant="rect" :width="80" :height="48" :radius="8" />
                                <MizuSkeleton variant="text" :width="160" :lines="2" />
                            </div>
                        </MizuSkeletonTheme>
                    </div>
                    <div class="theme-group">
                        <span class="demo-label">Override one child</span>
                        <MizuSkeletonTheme base-color="brand-primary" highlight-color="brand-primary-subtle">
                            <div class="row gap-12 align-center">
                                <MizuSkeleton variant="rect" :width="80" :height="48" :radius="8" />
                                <MizuSkeleton variant="text" :width="160" :lines="2" base-color="feedback-success-base" />
                            </div>
                        </MizuSkeletonTheme>
                    </div>
                </div>
            </CodeCollapsible>
        </section>

        <section class="example-section">
            <h3>List Placeholders</h3>
            <CodeCollapsible :code="listCode">
                <div class="stack">
                    <div v-for="item in list" :key="item.id" class="list-item">
                        <MizuSkeleton variant="circle" :width="36" :height="36" />
                        <div class="profile-lines" style="flex: 1;">
                            <MizuSkeleton variant="text" :width="`${item.size}%`" :lines="1" />
                        </div>
                    </div>
                </div>
            </CodeCollapsible>
        </section>
    </div>
</template>

<style scoped>
.skeleton-examples {
    all: revert;
    display: flex;
    flex-direction: column;
    gap: 32px;
    font-family: inherit;
}

.skeleton-examples :deep(*) {
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

.size-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
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
</style>
