<script setup lang="ts">
import { computed } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const;

const groupMax = computed(() => `<UAvatarGroup :max="3">
  <UAvatar src="https://i.pravatar.cc/120?img=1" alt="User 1" />
  <UAvatar src="https://i.pravatar.cc/120?img=2" alt="User 2" />
  <UAvatar src="https://i.pravatar.cc/120?img=3" alt="User 3" />
  <UAvatar src="https://i.pravatar.cc/120?img=4" alt="User 4" />
  <UAvatar src="https://i.pravatar.cc/120?img=5" alt="User 5" />
</UAvatarGroup>`);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Default</h3>
      <p class="demo-description">
        Groups multiple avatars with overlapping spacing. Pass any <code>UAvatar</code> children inside <code>UAvatarGroup</code>.
      </p>
      <CodeCollapsible
        :code="`<UAvatarGroup>
  <UAvatar src=&quot;https://i.pravatar.cc/120?img=1&quot; alt=&quot;User 1&quot; />
  <UAvatar src=&quot;https://i.pravatar.cc/120?img=2&quot; alt=&quot;User 2&quot; />
  <UAvatar src=&quot;https://i.pravatar.cc/120?img=3&quot; alt=&quot;User 3&quot; />
  <UAvatar src=&quot;https://i.pravatar.cc/120?img=4&quot; alt=&quot;User 4&quot; />
</UAvatarGroup>`"
      >
        <div class="demo-row">
          <UAvatarGroup>
            <UAvatar src="https://i.pravatar.cc/120?img=1" alt="User 1" />
            <UAvatar src="https://i.pravatar.cc/120?img=2" alt="User 2" />
            <UAvatar src="https://i.pravatar.cc/120?img=3" alt="User 3" />
            <UAvatar src="https://i.pravatar.cc/120?img=4" alt="User 4" />
          </UAvatarGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">
        The group's <code>size</code> prop applies to all child avatars. Same 9 sizes as <code>UAvatar</code> (3xs through 3xl).
      </p>
      <CodeCollapsible
        :code="`<UAvatarGroup size=&quot;3xs&quot;>...</UAvatarGroup>
<UAvatarGroup size=&quot;2xs&quot;>...</UAvatarGroup>
<UAvatarGroup size=&quot;xs&quot;>...</UAvatarGroup>
<UAvatarGroup size=&quot;sm&quot;>...</UAvatarGroup>
<UAvatarGroup size=&quot;md&quot;>...</UAvatarGroup>
<UAvatarGroup size=&quot;lg&quot;>...</UAvatarGroup>
<UAvatarGroup size=&quot;xl&quot;>...</UAvatarGroup>
<UAvatarGroup size=&quot;2xl&quot;>...</UAvatarGroup>
<UAvatarGroup size=&quot;3xl&quot;>...</UAvatarGroup>`"
      >
        <div class="demo-row demo-row-wrap">
          <div v-for="s in sizes" :key="s" class="demo-cell">
            <UAvatarGroup :size="s">
              <UAvatar src="https://i.pravatar.cc/120?img=1" alt="User" />
              <UAvatar src="https://i.pravatar.cc/120?img=2" alt="User" />
              <UAvatar src="https://i.pravatar.cc/120?img=3" alt="User" />
            </UAvatarGroup>
            <span class="demo-label">{{ s }}</span>
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Truncated (Max)</h3>
      <p class="demo-description">
        Pass <code>:max</code> to limit the visible avatars. Excess avatars collapse into a <code>+N</code> indicator.
      </p>
      <CodeCollapsible :code="groupMax">
        <div class="demo-row demo-row-stack">
          <UAvatarGroup :max="3">
            <UAvatar src="https://i.pravatar.cc/120?img=1" alt="User 1" />
            <UAvatar src="https://i.pravatar.cc/120?img=2" alt="User 2" />
            <UAvatar src="https://i.pravatar.cc/120?img=3" alt="User 3" />
            <UAvatar src="https://i.pravatar.cc/120?img=4" alt="User 4" />
            <UAvatar src="https://i.pravatar.cc/120?img=5" alt="User 5" />
          </UAvatarGroup>
          <UAvatarGroup :max="2">
            <UAvatar src="https://i.pravatar.cc/120?img=1" alt="User 1" />
            <UAvatar src="https://i.pravatar.cc/120?img=2" alt="User 2" />
            <UAvatar src="https://i.pravatar.cc/120?img=3" alt="User 3" />
            <UAvatar src="https://i.pravatar.cc/120?img=4" alt="User 4" />
          </UAvatarGroup>
          <UAvatarGroup :max="4">
            <UAvatar src="https://i.pravatar.cc/120?img=1" alt="User 1" />
            <UAvatar src="https://i.pravatar.cc/120?img=2" alt="User 2" />
            <UAvatar src="https://i.pravatar.cc/120?img=3" alt="User 3" />
            <UAvatar src="https://i.pravatar.cc/120?img=4" alt="User 4" />
            <UAvatar src="https://i.pravatar.cc/120?img=5" alt="User 5" />
            <UAvatar src="https://i.pravatar.cc/120?img=6" alt="User 6" />
          </UAvatarGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">
        The group's <code>color</code> prop tints the fallback background/text for avatars without images. Individual avatars can override it.
      </p>
      <CodeCollapsible
        :code="`<UAvatarGroup color=&quot;primary&quot;>
  <UAvatar alt=&quot;User 1&quot; />
  <UAvatar alt=&quot;User 2&quot; />
  <UAvatar alt=&quot;User 3&quot; />
</UAvatarGroup>

<UAvatarGroup color=&quot;secondary&quot;>
  <UAvatar alt=&quot;User 1&quot; />
  <UAvatar alt=&quot;User 2&quot; />
  <UAvatar alt=&quot;User 3&quot; />
</UAvatarGroup>`"
      >
        <div class="demo-row demo-row-stack">
          <UAvatarGroup color="primary">
            <UAvatar alt="User 1" />
            <UAvatar alt="User 2" />
            <UAvatar alt="User 3" />
          </UAvatarGroup>
          <UAvatarGroup color="secondary">
            <UAvatar alt="User 1" />
            <UAvatar alt="User 2" />
            <UAvatar alt="User 3" />
          </UAvatarGroup>
          <UAvatarGroup color="success">
            <UAvatar alt="User 1" />
            <UAvatar alt="User 2" />
            <UAvatar alt="User 3" />
          </UAvatarGroup>
          <UAvatarGroup color="info">
            <UAvatar alt="User 1" />
            <UAvatar alt="User 2" />
            <UAvatar alt="User 3" />
          </UAvatarGroup>
          <UAvatarGroup color="warning">
            <UAvatar alt="User 1" />
            <UAvatar alt="User 2" />
            <UAvatar alt="User 3" />
          </UAvatarGroup>
          <UAvatarGroup color="error">
            <UAvatar alt="User 1" />
            <UAvatar alt="User 2" />
            <UAvatar alt="User 3" />
          </UAvatarGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Falbacks & Icons</h3>
      <p class="demo-description">
        Mix <code>src</code>, <code>text</code>, and <code>icon</code> avatars in the same group.
      </p>
      <CodeCollapsible
        :code="`<UAvatarGroup>
  <UAvatar src=&quot;https://i.pravatar.cc/120?img=1&quot; alt=&quot;User 1&quot; />
  <UAvatar text=&quot;JS&quot; alt=&quot;Jane Smith&quot; />
  <UAvatar icon=&quot;i-lucide-user-plus&quot; alt=&quot;Add user&quot; />
  <UAvatar alt=&quot;Mike Johnson&quot; />
</UAvatarGroup>`"
      >
        <div class="demo-row">
          <UAvatarGroup>
            <UAvatar src="https://i.pravatar.cc/120?img=1" alt="User 1" />
            <UAvatar text="JS" alt="Jane Smith" />
            <UAvatar icon="i-lucide-user-plus" alt="Add user" />
            <UAvatar alt="Mike Johnson" />
          </UAvatarGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Status Chips</h3>
      <p class="demo-description">
        Each child avatar can carry its own <code>chip</code> for individual status indication.
      </p>
      <CodeCollapsible
        :code="`<UAvatarGroup>
  <UAvatar src=&quot;...&quot; alt=&quot;User 1&quot; chip-color=&quot;success&quot; />
  <UAvatar src=&quot;...&quot; alt=&quot;User 2&quot; chip-color=&quot;warning&quot; chip-position=&quot;top-right&quot; />
  <UAvatar src=&quot;...&quot; alt=&quot;User 3&quot; chip-color=&quot;error&quot; />
  <UAvatar src=&quot;...&quot; alt=&quot;User 4&quot; />
</UAvatarGroup>`"
      >
        <div class="demo-row">
          <UAvatarGroup>
            <UAvatar src="https://i.pravatar.cc/120?img=5" alt="User 1" chip-color="success" />
            <UAvatar src="https://i.pravatar.cc/120?img=6" alt="User 2" chip-color="warning" chip-position="top-right" />
            <UAvatar src="https://i.pravatar.cc/120?img=7" alt="User 3" chip-color="error" />
            <UAvatar src="https://i.pravatar.cc/120?img=8" alt="User 4" />
          </UAvatarGroup>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.demo-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
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
  color: inherit;
  margin: 0;
}
.demo-description {
  font-size: 13px;
  color: var(--sl-color-text-light);
  margin: 0;
  line-height: 1.5;
}
.demo-description code {
  font-size: 12px;
  background: var(--color-surface-muted, #f3f4f6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 16px;
}
.demo-row-wrap {
  flex-wrap: wrap;
  gap: 16px;
}
.demo-row-stack {
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.demo-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.demo-label {
  font-size: 11px;
  color: var(--sl-color-text-light);
  font-family: ui-monospace, SFMono-Regular, monospace;
}
</style>