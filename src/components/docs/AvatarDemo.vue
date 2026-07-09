<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
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
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
