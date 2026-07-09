<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UCollapsible class=&quot;flex flex-col gap-2 w-48&quot;>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; trailing-icon=&quot;i-lucide-chevron-down&quot; block />
  <template #content>
    <Placeholder class=&quot;h-48&quot; />
  </template>
</UCollapsible>`">
        <div class="demo-row">
          <UCollapsible class="flex flex-col gap-2 w-56">
            <UButton label="Toggle content" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
            <template #content>
              <div class="rounded-md border border-dashed p-4 text-center text-sm text-foreground-secondary">
                Collapsible content
              </div>
            </template>
          </UCollapsible>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Default Open</h3>
      <CodeCollapsible :code="`<UCollapsible default-open class=&quot;flex flex-col gap-2 w-48&quot;>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; trailing-icon=&quot;i-lucide-chevron-down&quot; block />
  <template #content>
    <Placeholder class=&quot;h-48&quot; />
  </template>
</UCollapsible>`">
        <div class="demo-row">
          <UCollapsible default-open class="flex flex-col gap-2 w-56">
            <UButton label="Initially open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
            <template #content>
              <div class="rounded-md border border-dashed p-4 text-center text-sm text-foreground-secondary">
                This content is visible by default
              </div>
            </template>
          </UCollapsible>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="`<UCollapsible disabled class=&quot;flex flex-col gap-2 w-48&quot;>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; trailing-icon=&quot;i-lucide-chevron-down&quot; block />
  <template #content>
    <Placeholder class=&quot;h-48&quot; />
  </template>
</UCollapsible>`">
        <div class="demo-row">
          <UCollapsible disabled class="flex flex-col gap-2 w-56">
            <UButton label="Disabled" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
            <template #content>
              <div class="rounded-md border border-dashed p-4 text-center text-sm text-foreground-secondary">
                Cannot be toggled
              </div>
            </template>
          </UCollapsible>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Keep Mounted</h3>
      <CodeCollapsible :code="`<UCollapsible :unmount-on-hide=&quot;false&quot; class=&quot;flex flex-col gap-2 w-48&quot;>
  <UButton label=&quot;Open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; trailing-icon=&quot;i-lucide-chevron-down&quot; block />
  <template #content>
    <Placeholder class=&quot;h-48&quot; />
  </template>
</UCollapsible>`">
        <div class="demo-row">
          <UCollapsible :unmount-on-hide="false" class="flex flex-col gap-2 w-56">
            <UButton label="Keep mounted" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
            <template #content>
              <div class="rounded-md border border-dashed p-4 text-center text-sm text-foreground-secondary">
                Content stays in DOM when closed
              </div>
            </template>
          </UCollapsible>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>v-model Controlled</h3>
      <CodeCollapsible :code="`<UCollapsible v-model=&quot;open&quot; class=&quot;flex flex-col gap-2 w-48&quot;>
  <UButton label=&quot;Toggle&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; block />
  <template #content>
    <Placeholder class=&quot;h-48&quot; />
  </template>
</UCollapsible>`">
        <div class="demo-row">
          <div>
            <!-- This is purely for demo display -->
          </div>
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
  align-items: flex-start;
  gap: 8px;
}
</style>
