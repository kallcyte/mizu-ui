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
      <CodeCollapsible :code="basicCode">
        <UUser name="John Doe" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Description</h3>
      <CodeCollapsible :code="withDescCode">
        <UUser name="John Doe" description="Software Engineer" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Avatar</h3>
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
