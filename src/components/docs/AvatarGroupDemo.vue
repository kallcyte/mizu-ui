<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Default</h3>
      <p class="demo-description">Groups multiple avatars together with overlapping layout and consistent spacing.</p>
      <CodeCollapsible :code="`<UAvatarGroup>
  <UAvatar src=&quot;https://i.pravatar.cc/80?img=1&quot; alt=&quot;User&quot; />
  <UAvatar src=&quot;https://i.pravatar.cc/80?img=2&quot; alt=&quot;User&quot; />
  <UAvatar src=&quot;https://i.pravatar.cc/80?img=3&quot; alt=&quot;User&quot; />
</UAvatarGroup>`">
        <div class="demo-row">
          <UAvatarGroup>
            <UAvatar src="https://i.pravatar.cc/80?img=1" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=2" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=3" alt="User" />
          </UAvatarGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Three size variants for all avatars in the group: sm, md (default), and lg.</p>
      <CodeCollapsible :code="`<UAvatarGroup size=&quot;sm&quot;>
  <UAvatar src=&quot;...&quot; alt=&quot;User&quot; />
  <UAvatar src=&quot;...&quot; alt=&quot;User&quot; />
  <UAvatar src=&quot;...&quot; alt=&quot;User&quot; />
</UAvatarGroup>
<UAvatarGroup size=&quot;md&quot;>...</UAvatarGroup>
<UAvatarGroup size=&quot;lg&quot;>...</UAvatarGroup>`">
        <div class="demo-row">
          <UAvatarGroup size="sm">
            <UAvatar src="https://i.pravatar.cc/80?img=1" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=2" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=3" alt="User" />
          </UAvatarGroup>
          <UAvatarGroup size="md">
            <UAvatar src="https://i.pravatar.cc/80?img=1" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=2" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=3" alt="User" />
          </UAvatarGroup>
          <UAvatarGroup size="lg">
            <UAvatar src="https://i.pravatar.cc/80?img=1" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=2" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=3" alt="User" />
          </UAvatarGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Truncated (Max)</h3>
      <p class="demo-description">Limit the number of visible avatars using the <code>:max</code> prop. Excess avatars show a count badge.</p>
      <CodeCollapsible :code="`<UAvatarGroup :max=&quot;3&quot;>
  <UAvatar src=&quot;...&quot; alt=&quot;User&quot; />
  <UAvatar src=&quot;...&quot; alt=&quot;User&quot; />
  <UAvatar src=&quot;...&quot; alt=&quot;User&quot; />
  <UAvatar src=&quot;...&quot; alt=&quot;User&quot; />
  <UAvatar src=&quot;...&quot; alt=&quot;User&quot; />
</UAvatarGroup>`">
        <div class="demo-row">
          <UAvatarGroup :max="3">
            <UAvatar src="https://i.pravatar.cc/80?img=1" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=2" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=3" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=4" alt="User" />
            <UAvatar src="https://i.pravatar.cc/80?img=5" alt="User" />
          </UAvatarGroup>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Override the fallback color for avatars without images using the <code>color</code> prop.</p>
      <CodeCollapsible :code="`<UAvatarGroup color=&quot;primary&quot;>
  <UAvatar alt=&quot;User&quot; />
  <UAvatar alt=&quot;User&quot; />
  <UAvatar alt=&quot;User&quot; />
</UAvatarGroup>`">
        <div class="demo-row">
          <UAvatarGroup color="neutral">
            <UAvatar alt="User" />
            <UAvatar alt="User" />
            <UAvatar alt="User" />
          </UAvatarGroup>
          <UAvatarGroup color="primary">
            <UAvatar alt="User" />
            <UAvatar alt="User" />
            <UAvatar alt="User" />
          </UAvatarGroup>
          <UAvatarGroup color="secondary">
            <UAvatar alt="User" />
            <UAvatar alt="User" />
            <UAvatar alt="User" />
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
  gap: 24px;
}
</style>
