<script setup lang="ts">
import { UUser } from "@nuxt/ui";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicCode = `<UUser name="John Doe" />`;

const withDescCode = `<UUser name="John Doe" description="Software Engineer" />`;

const avatarCode = `<UUser
  name="John Doe"
  description="Software Engineer"
  :avatar="{
    src: 'https://i.pravatar.cc/150?u=john-doe',
    loading: 'lazy',
    icon: 'i-lucide-image',
  }"
/>`;

const chipCode = `<UUser
  name="John Doe"
  description="Software Engineer"
  :avatar="{ src: 'https://i.pravatar.cc/150?u=john-doe' }"
  :chip="{ color: 'primary', position: 'top-right' }"
/>`;

const sizeCode = `<UUser name="John Doe" description="Engineer" :avatar="{ src: 'https://i.pravatar.cc/150?u=john-doe' }" size="sm" />
<UUser name="John Doe" description="Engineer" :avatar="{ src: 'https://i.pravatar.cc/150?u=john-doe' }" size="md" />
<UUser name="John Doe" description="Engineer" :avatar="{ src: 'https://i.pravatar.cc/150?u=john-doe' }" size="xl" />`;

const verticalCode = `<UUser
  name="John Doe"
  description="Software Engineer"
  orientation="vertical"
  :avatar="{ src: 'https://i.pravatar.cc/150?u=john-doe' }"
/>`;

const linkCode = `<UUser
  name="Benjamin Canac"
  description="Software Engineer"
  to="https://github.com/benjamincanac"
  target="_blank"
  :avatar="{ src: 'https://github.com/benjamincanac.png' }"
/>`;
</script>

<template>
  <div class="user-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Display a user with just a <code>name</code>. The component renders an avatar placeholder and name by default.</p>
      <CodeCollapsible :code="basicCode">
        <UUser name="John Doe" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Description</h3>
      <p class="demo-description">Add a subtitle below the name using the <code>description</code> prop for roles or extra info.</p>
      <CodeCollapsible :code="withDescCode">
        <UUser name="John Doe" description="Software Engineer" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Avatar</h3>
      <p class="demo-description">Supply a custom avatar image via the <code>:avatar</code> prop with <code>src</code>, <code>loading</code>, and fallback <code>icon</code>.</p>
      <CodeCollapsible :code="avatarCode">
        <UUser
          name="John Doe"
          description="Software Engineer"
          :avatar="{
            src: 'https://i.pravatar.cc/150?u=john-doe',
            loading: 'lazy',
            icon: 'i-lucide-image',
          }"
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Chip</h3>
      <p class="demo-description">Attach a status chip using <code>:chip</code> with <code>color</code> and <code>position</code> options like <code>top-right</code>.</p>
      <CodeCollapsible :code="chipCode">
        <UUser
          name="John Doe"
          description="Software Engineer"
          :avatar="{ src: 'https://i.pravatar.cc/150?u=john-doe' }"
          :chip="{ color: 'primary', position: 'top-right' }"
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Scale the user component with the <code>size</code> prop — available in <code>sm</code>, <code>md</code>, and <code>xl</code>.</p>
      <CodeCollapsible :code="sizeCode">
        <div class="user-grid">
          <div>
            <h4>Small</h4>
            <UUser name="John Doe" description="Engineer" :avatar="{ src: 'https://i.pravatar.cc/150?u=john-doe' }" size="sm" />
          </div>
          <div>
            <h4>Medium</h4>
            <UUser name="John Doe" description="Engineer" :avatar="{ src: 'https://i.pravatar.cc/150?u=john-doe' }" size="md" />
          </div>
          <div>
            <h4>Extra Large</h4>
            <UUser name="John Doe" description="Engineer" :avatar="{ src: 'https://i.pravatar.cc/150?u=john-doe' }" size="xl" />
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Vertical Orientation</h3>
      <p class="demo-description">Stack the avatar above the name with <code>orientation="vertical"</code> for profile-card layouts.</p>
      <CodeCollapsible :code="verticalCode">
        <UUser
          name="John Doe"
          description="Software Engineer"
          orientation="vertical"
          :avatar="{ src: 'https://i.pravatar.cc/150?u=john-doe' }"
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>As Link</h3>
      <p class="demo-description">Make the user component clickable by setting <code>to</code> and optional <code>target</code> props, turning it into a link.</p>
      <CodeCollapsible :code="linkCode">
        <UUser
          name="Benjamin Canac"
          description="Software Engineer"
          to="https://github.com/benjamincanac"
          target="_blank"
          :avatar="{ src: 'https://github.com/benjamincanac.png' }"
        />
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.user-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.user-examples :deep(*) {
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

.example-section h4 {
  font-size: 12px;
  font-weight: 500;
  color: var(--sl-color-text-light);
  margin-bottom: 8px;
  margin-top: 0;
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
</style>
