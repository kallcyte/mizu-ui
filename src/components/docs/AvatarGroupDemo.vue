<script setup lang="ts">
import { MizuAvatarGroup } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const smallGroup = [
  { src: "https://i.pravatar.cc/80?img=1", alt: "Alice", fallback: "A" },
  { src: "https://i.pravatar.cc/80?img=2", alt: "Bob", fallback: "B" },
  { src: "https://i.pravatar.cc/80?img=3", alt: "Carol", fallback: "C" },
];

const mediumGroup = [
  { src: "https://i.pravatar.cc/80?img=1", alt: "Alice", fallback: "A" },
  { src: "https://i.pravatar.cc/80?img=2", alt: "Bob", fallback: "B" },
  { src: "https://i.pravatar.cc/80?img=3", alt: "Carol", fallback: "C" },
  { src: "https://i.pravatar.cc/80?img=4", alt: "Dan", fallback: "D" },
  { src: "https://i.pravatar.cc/80?img=5", alt: "Eve", fallback: "E" },
];

const overflowGroup = [
  { src: "https://i.pravatar.cc/80?img=1", alt: "Alice", fallback: "A" },
  { src: "https://i.pravatar.cc/80?img=2", alt: "Bob", fallback: "B" },
  { src: "https://i.pravatar.cc/80?img=3", alt: "Carol", fallback: "C" },
  { src: "https://i.pravatar.cc/80?img=4", alt: "Dan", fallback: "D" },
  { src: "https://i.pravatar.cc/80?img=5", alt: "Eve", fallback: "E" },
  { src: "https://i.pravatar.cc/80?img=6", alt: "Frank", fallback: "F" },
  { src: "https://i.pravatar.cc/80?img=7", alt: "Grace", fallback: "G" },
  { src: "https://i.pravatar.cc/80?img=8", alt: "Hank", fallback: "H" },
];

const basicCode = `const items = [
  { src: "/alice.jpg", alt: "Alice", fallback: "A" },
  { src: "/bob.jpg", alt: "Bob", fallback: "B" },
  { src: "/carol.jpg", alt: "Carol", fallback: "C" },
];

<MizuAvatarGroup :items="items" :max="5" />`;

const overflowCode = `<MizuAvatarGroup :items="overflowGroup" :max="5" />`;

const sizesCode = `<MizuAvatarGroup :items="group" :max="4" size="sm" />
<MizuAvatarGroup :items="group" :max="4" size="md" />
<MizuAvatarGroup :items="group" :max="4" size="lg" />`;
</script>

<template>
  <div class="avatar-group-examples">
    <section class="example-section">
      <h3>Basic (3 users)</h3>
      <CodeCollapsible :code="basicCode">
        <MizuAvatarGroup :items="smallGroup" :max="5" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Medium (5 users)</h3>
      <CodeCollapsible :code="basicCode">
        <MizuAvatarGroup :items="mediumGroup" :max="5" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Overflow (8 users, max 5)</h3>
      <CodeCollapsible :code="overflowCode">
        <MizuAvatarGroup :items="overflowGroup" :max="5" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="size-row">
          <MizuAvatarGroup :items="mediumGroup" :max="4" size="sm" />
          <MizuAvatarGroup :items="mediumGroup" :max="4" size="md" />
          <MizuAvatarGroup :items="mediumGroup" :max="4" size="lg" />
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.avatar-group-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.avatar-group-examples :deep(*) { margin: 0; }
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
.size-row { display: flex; flex-direction: column; gap: 16px; margin: 0; padding: 0; }
</style>
