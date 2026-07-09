<script setup lang="ts">
import { MizuSkeleton } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-examples">
    <section class="example-section">
      <h3>Variants</h3>
      <CodeCollapsible
        :code="`<!-- Text line -->
<MizuSkeleton class=&quot;h-3.5 w-full rounded-md&quot; />

<div class=&quot;flex gap-3 items-center&quot;>
  <!-- Circle avatar -->
  <MizuSkeleton class=&quot;size-12 rounded-full shrink-0&quot; />

  <!-- Rectangular card -->
  <MizuSkeleton class=&quot;h-30 w-50 rounded-md shrink-0&quot; />
</div>`"
      >
        <div class="demo-col">
          <MizuSkeleton class="h-3.5 w-full rounded-md" />
          <div class="flex gap-3 items-center">
            <MizuSkeleton class="size-12 rounded-full shrink-0" />
            <MizuSkeleton class="h-30 w-50 rounded-md shrink-0" />
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multi-line Text</h3>
      <CodeCollapsible
        :code="`<div class=&quot;flex flex-col gap-2&quot;>
  <MizuSkeleton class=&quot;h-3.5 w-full rounded-md&quot; />
  <MizuSkeleton class=&quot;h-3.5 w-full rounded-md&quot; />
  <MizuSkeleton class=&quot;h-3.5 w-3/5 rounded-md&quot; />
</div>`"
      >
        <div class="flex flex-col gap-2">
          <MizuSkeleton class="h-3.5 w-full rounded-md" />
          <MizuSkeleton class="h-3.5 w-full rounded-md" />
          <MizuSkeleton class="h-3.5 w-3/5 rounded-md" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Animations</h3>
      <CodeCollapsible
        :code="`<!-- Shimmer (default) -->
<MizuSkeleton class=&quot;h-4 w-48 rounded-md&quot; />

<!-- Pulse -->
<MizuSkeleton animation=&quot;pulse&quot; class=&quot;h-4 w-48 rounded-md&quot; />

<!-- None -->
<MizuSkeleton animation=&quot;none&quot; class=&quot;h-4 w-48 rounded-md&quot; />`"
      >
        <div class="demo-col">
          <MizuSkeleton class="h-4 w-48 rounded-md" />
          <MizuSkeleton animation="pulse" class="h-4 w-48 rounded-md" />
          <MizuSkeleton animation="none" class="h-4 w-48 rounded-md" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Content Loading</h3>
      <CodeCollapsible
        :code="`<div class=&quot;flex items-center gap-4&quot;>
  <MizuSkeleton class=&quot;size-12 rounded-full shrink-0&quot; />
  <div class=&quot;flex flex-col gap-2 flex-1&quot;>
    <MizuSkeleton class=&quot;h-3.5 w-full rounded-md max-w-40&quot; />
    <MizuSkeleton class=&quot;h-3.5 w-full rounded-md max-w-60&quot; />
  </div>
</div>`"
      >
        <div class="demo-row items-center">
          <MizuSkeleton class="size-12 rounded-full shrink-0" />
          <div class="flex flex-col gap-2 flex-1">
            <MizuSkeleton class="h-3.5 w-full rounded-md max-w-40" />
            <MizuSkeleton class="h-3.5 w-full rounded-md max-w-60" />
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Profile Card</h3>
      <CodeCollapsible
        :code="`<div class=&quot;p-5 rounded-xl border border-surface-muted bg-surface-base&quot;>
  <div class=&quot;flex items-center gap-4 mb-4&quot;>
    <!-- Avatar -->
    <MizuSkeleton class=&quot;size-16 rounded-full shrink-0&quot; />
    <div class=&quot;flex flex-col gap-2&quot;>
      <!-- Name -->
      <MizuSkeleton class=&quot;h-4 w-32 rounded-md&quot; />
      <!-- Handle -->
      <MizuSkeleton class=&quot;h-3.5 w-24 rounded-md&quot; />
    </div>
  </div>
  <div class=&quot;flex flex-col gap-2&quot;>
    <!-- Bio lines -->
    <MizuSkeleton class=&quot;h-3.5 w-full rounded-md&quot; />
    <MizuSkeleton class=&quot;h-3.5 w-4/5 rounded-md&quot; />
  </div>
</div>`"
      >
        <div class="p-5 rounded-xl border border-surface-muted bg-surface-base">
          <div class="flex items-center gap-4 mb-4">
            <MizuSkeleton class="size-16 rounded-full shrink-0" />
            <div class="flex flex-col gap-2">
              <MizuSkeleton class="h-4 w-32 rounded-md" />
              <MizuSkeleton class="h-3.5 w-24 rounded-md" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <MizuSkeleton class="h-3.5 w-full rounded-md" />
            <MizuSkeleton class="h-3.5 w-4/5 rounded-md" />
          </div>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.demo-examples {
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.example-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.example-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}
.demo-col {
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 12px;
}
.demo-row {
  display: flex;
  gap: 16px;
}
</style>
