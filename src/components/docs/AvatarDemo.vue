<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Three size variants: sm (24px), md (32px, default), and lg (40px).</p>
      <CodeCollapsible :code="`<UAvatar size=&quot;sm&quot; src=&quot;...&quot; alt=&quot;User&quot; />
<UAvatar size=&quot;md&quot; src=&quot;...&quot; alt=&quot;User&quot; />
<UAvatar size=&quot;lg&quot; src=&quot;...&quot; alt=&quot;User&quot; />`">
        <div class="demo-row">
          <UAvatar size="sm" text="SM" alt="User" />
          <UAvatar size="md" text="MD" alt="User" />
          <UAvatar size="lg" text="LG" alt="User" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Image</h3>
      <p class="demo-description">Display user images with the <code>src</code> prop. Falls back to initials if the image fails to load.</p>
      <CodeCollapsible :code="`<UAvatar src=&quot;https://i.pravatar.cc/80&quot; alt=&quot;User&quot; />`">
        <div class="demo-row">
          <UAvatar src="https://i.pravatar.cc/80?img=1" alt="User" />
          <UAvatar src="https://i.pravatar.cc/80?img=2" alt="User" />
          <UAvatar src="https://i.pravatar.cc/80?img=3" alt="User" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Fallback</h3>
      <p class="demo-description">When no image is provided, avatars display text initials or a generic user icon based on the <code>text</code> prop.</p>
      <CodeCollapsible :code="`<UAvatar alt=&quot;John Doe&quot; />
<UAvatar alt=&quot;Jane&quot; text=&quot;JD&quot; />`">
        <div class="demo-row">
          <UAvatar text="JD" alt="John Doe" />
          <UAvatar text="AB" alt="User" />
          <UAvatar text="XY" alt="User" />
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
  color: var(--sl-color-text);
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
  background: var(--color-surface-muted, #F3F4F6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
