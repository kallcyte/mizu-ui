<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const open = ref(false);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A collapsible panel that toggles content visibility with a smooth animation, using <code>UCollapsible</code> with a trigger button and content slot.</p>
      <CodeCollapsible :code="`<UCollapsible class=&quot;flex flex-col gap-2 w-56&quot;>
  <UButton label=&quot;Toggle content&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; trailing-icon=&quot;i-lucide-chevron-down&quot; block />
  <template #content>
    <div class=&quot;rounded-md border border-dashed border-surface-muted p-4 text-center text-sm text-foreground-secondary&quot;>
      Collapsible content
    </div>
  </template>
</UCollapsible>`">
        <div class="demo-row">
          <UCollapsible class="flex flex-col gap-2 w-56">
            <UButton label="Toggle content" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
            <template #content>
              <div class="rounded-md border border-dashed border-surface-muted p-4 text-center text-sm text-foreground-secondary">
                Collapsible content
              </div>
            </template>
          </UCollapsible>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Default Open</h3>
      <p class="demo-description">Start with the content already expanded using the <code>default-open</code> prop.</p>
      <CodeCollapsible :code="`<UCollapsible default-open class=&quot;flex flex-col gap-2 w-56&quot;>
  <UButton label=&quot;Initially open&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; trailing-icon=&quot;i-lucide-chevron-down&quot; block />
  <template #content>
    <div class=&quot;rounded-md border border-dashed border-surface-muted p-4 text-center text-sm text-foreground-secondary&quot;>
      This content is visible by default
    </div>
  </template>
</UCollapsible>`">
        <div class="demo-row">
          <UCollapsible default-open class="flex flex-col gap-2 w-56">
            <UButton label="Initially open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
            <template #content>
              <div class="rounded-md border border-dashed border-surface-muted p-4 text-center text-sm text-foreground-secondary">
                This content is visible by default
              </div>
            </template>
          </UCollapsible>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>v-model Controlled</h3>
      <p class="demo-description">Bind the open state with <code>v-model:open</code> for programmatic control. The toggle button is outside the collapsible so an external action drives the state.</p>
      <CodeCollapsible :code="`<script setup&gt;
const open = ref(false);
&lt;/script&gt;

<template>
  <UButton label=&quot;Toggle from outside&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; @click=&quot;open = !open&quot; />
  <UCollapsible v-model:open=&quot;open&quot; class=&quot;flex flex-col gap-2 w-56&quot;>
    <UButton label=&quot;Toggle from inside&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; trailing-icon=&quot;i-lucide-chevron-down&quot; block />
    <template #content>
      <div class=&quot;rounded-md border border-dashed border-surface-muted p-4 text-center text-sm text-foreground-secondary&quot;>
        Controlled content (open: {{ '{{' }} open {{ '}}' }})
      </div>
    </template>
  </UCollapsible>
</template>`">
        <div class="demo-row demo-col">
          <UButton label="Toggle from outside" color="primary" variant="subtle" @click="open = !open" />
          <UCollapsible v-model:open="open" class="flex flex-col gap-2 w-56">
            <UButton label="Toggle from inside" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
            <template #content>
              <div class="rounded-md border border-dashed border-surface-muted p-4 text-center text-sm text-foreground-secondary">
                Controlled content (open: {{ open }})
              </div>
            </template>
          </UCollapsible>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Prevent toggling by setting the <code>disabled</code> prop, which locks the collapsible in its current state.</p>
      <CodeCollapsible :code="`<UCollapsible disabled class=&quot;flex flex-col gap-2 w-56&quot;>
  <UButton label=&quot;Disabled&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; trailing-icon=&quot;i-lucide-chevron-down&quot; block />
  <template #content>
    <div class=&quot;rounded-md border border-dashed border-surface-muted p-4 text-center text-sm text-foreground-secondary&quot;>
      Cannot be toggled
    </div>
  </template>
</UCollapsible>`">
        <div class="demo-row">
          <UCollapsible disabled class="flex flex-col gap-2 w-56">
            <UButton label="Disabled" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
            <template #content>
              <div class="rounded-md border border-dashed border-surface-muted p-4 text-center text-sm text-foreground-secondary">
                Cannot be toggled
              </div>
            </template>
          </UCollapsible>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Keep Mounted</h3>
      <p class="demo-description">Keep content in the DOM when collapsed by setting <code>:unmount-on-hide="false"</code>, preserving component state (e.g. form input values, scroll position).</p>
      <CodeCollapsible :code="`<UCollapsible :unmount-on-hide=&quot;false&quot; class=&quot;flex flex-col gap-2 w-56&quot;>
  <UButton label=&quot;Keep mounted&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; trailing-icon=&quot;i-lucide-chevron-down&quot; block />
  <template #content>
    <div class=&quot;rounded-md border border-dashed border-surface-muted p-4 text-center text-sm text-foreground-secondary&quot;>
      Content stays in DOM when closed
    </div>
  </template>
</UCollapsible>`">
        <div class="demo-row">
          <UCollapsible :unmount-on-hide="false" class="flex flex-col gap-2 w-56">
            <UButton label="Keep mounted" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />
            <template #content>
              <div class="rounded-md border border-dashed border-surface-muted p-4 text-center text-sm text-foreground-secondary">
                Content stays in DOM when closed
              </div>
            </template>
          </UCollapsible>
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
  background: var(--color-surface-muted, #F3F4F6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.demo-col {
  flex-direction: column;
}
</style>
