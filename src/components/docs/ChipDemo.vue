<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Three size options: <code>sm</code>, <code>md</code>, and <code>lg</code>, demonstrated with a notification badge on a mail button.</p>
      <CodeCollapsible :code="`<UChip size=&quot;sm&quot; text=&quot;5&quot;>
  <UButton icon=&quot;i-lucide-mail&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UChip>
<UChip size=&quot;md&quot; text=&quot;5&quot;>
  <UButton icon=&quot;i-lucide-mail&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UChip>
<UChip size=&quot;lg&quot; text=&quot;5&quot;>
  <UButton icon=&quot;i-lucide-mail&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UChip>`">
        <div class="demo-row">
          <UChip size="sm" text="5">
            <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
          <UChip size="md" text="5">
            <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
          <UChip size="lg" text="5">
            <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <p class="demo-description">Four color variants: <code>primary</code>, <code>secondary</code>, <code>success</code>, and <code>error</code> for different semantic contexts.</p>
      <CodeCollapsible :code="`<UChip color=&quot;primary&quot; text=&quot;5&quot;>
  <UButton icon=&quot;i-lucide-mail&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UChip>
<UChip color=&quot;success&quot; text=&quot;5&quot;>
  <UButton icon=&quot;i-lucide-mail&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UChip>
<UChip color=&quot;error&quot; text=&quot;5&quot;>
  <UButton icon=&quot;i-lucide-mail&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UChip>`">
        <div class="demo-row">
          <UChip color="primary" text="5">
            <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
          <UChip color="secondary" text="5">
            <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
          <UChip color="success" text="5">
            <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
          <UChip color="error" text="5">
            <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Positions</h3>
      <p class="demo-description">Four corner positions: <code>top-right</code>, <code>top-left</code>, <code>bottom-right</code>, and <code>bottom-left</code> using the <code>position</code> prop.</p>
      <CodeCollapsible :code="`<UChip position=&quot;top-right&quot; text=&quot;5&quot;>
  <UButton icon=&quot;i-lucide-mail&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UChip>
<UChip position=&quot;top-left&quot; text=&quot;5&quot;>
  <UButton icon=&quot;i-lucide-mail&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UChip>
<UChip position=&quot;bottom-right&quot; text=&quot;5&quot;>
  <UButton icon=&quot;i-lucide-mail&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UChip>
<UChip position=&quot;bottom-left&quot; text=&quot;5&quot;>
  <UButton icon=&quot;i-lucide-mail&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
</UChip>`">
        <div class="demo-row">
          <UChip position="top-right" text="5">
            <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
          <UChip position="top-left" text="5">
            <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
          <UChip position="bottom-right" text="5">
            <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
          <UChip position="bottom-left" text="5">
            <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Inset</h3>
      <p class="demo-description">Overlaps an avatar with the <code>inset</code> prop for notification badges on user images.</p>
      <CodeCollapsible :code="`<UChip inset text=&quot;3&quot;>
  <UAvatar src=&quot;https://i.pravatar.cc/80&quot; alt=&quot;User&quot; />
</UChip>
<UChip inset text=&quot;5&quot; color=&quot;primary&quot;>
  <UAvatar src=&quot;https://i.pravatar.cc/80&quot; alt=&quot;User&quot; />
</UChip>
<UChip inset text=&quot;99+&quot; color=&quot;error&quot; size=&quot;lg&quot;>
  <UAvatar src=&quot;https://i.pravatar.cc/80&quot; alt=&quot;User&quot; />
</UChip>`">
        <div class="demo-row">
          <UChip inset text="3">
            <UAvatar src="https://i.pravatar.cc/80?img=1" alt="User" />
          </UChip>
          <UChip inset text="5" color="primary">
            <UAvatar src="https://i.pravatar.cc/80?img=2" alt="User" />
          </UChip>
          <UChip inset text="99+" color="error" size="lg">
            <UAvatar src="https://i.pravatar.cc/80?img=3" alt="User" />
          </UChip>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Standalone</h3>
      <p class="demo-description">Chips rendered without a slotted element using the <code>standalone</code> prop for independent badge display.</p>
      <CodeCollapsible :code="`<UChip standalone text=&quot;4&quot; />
<UChip standalone text=&quot;99+&quot; color=&quot;primary&quot; />
<UChip standalone color=&quot;error&quot; />`">
        <div class="demo-row">
          <UChip standalone text="4" />
          <UChip standalone text="99+" color="primary" />
          <UChip standalone color="error" />
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
  gap: 16px;
}
</style>
