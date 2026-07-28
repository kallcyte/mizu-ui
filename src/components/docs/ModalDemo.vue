<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicOpen = ref(false);
const descOpen = ref(false);
const fullscreenOpen = ref(false);
const scrollableOpen = ref(false);
const dismissibleOpen = ref(false);
const nestedFirstOpen = ref(false);
const nestedSecondOpen = ref(false);
const footerOpen = ref(false);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A simple modal with title, body, and footer. The trigger button goes in the default slot.</p>
      <CodeCollapsible :code="`<UModal v-model:open=&quot;open&quot; title=&quot;Edit Profile&quot;>
  <UButton label=&quot;Open Modal&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #body>
    <div class=&quot;h-48 rounded-lg bg-[var(--color-surface-muted)] flex items-center justify-center&quot;>
      <p class=&quot;text-muted text-sm&quot;>Body content</p>
    </div>
  </template>
  <template #footer>
    <UButton variant=&quot;ghost&quot; label=&quot;Cancel&quot; @click=&quot;open = false&quot; />
    <UButton color=&quot;primary&quot; label=&quot;Save&quot; @click=&quot;open = false&quot; />
  </template>
</UModal>`">
        <UModal v-model:open="basicOpen" title="Edit Profile">
          <UButton label="Open Modal" color="neutral" variant="subtle" />
          <template #body>
            <div class="h-48 rounded-lg bg-[var(--color-surface-muted)] flex items-center justify-center">
              <p class="text-muted text-sm">Body content</p>
            </div>
          </template>
          <template #footer>
            <UButton variant="ghost" label="Cancel" @click="basicOpen = false" />
            <UButton color="primary" label="Save" @click="basicOpen = false" />
          </template>
        </UModal>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Description</h3>
      <p class="demo-description">Use <code>title</code> and <code>description</code> props together for contextual dialogs.</p>
      <CodeCollapsible :code="`<UModal v-model:open=&quot;open&quot; title=&quot;Delete Account&quot; description=&quot;This action cannot be undone.&quot;>
  <UButton label=&quot;Open&quot; color=&quot;error&quot; variant=&quot;subtle&quot; />
  <template #body>
    <div class=&quot;h-48 rounded-lg bg-[var(--color-surface-muted)] flex items-center justify-center&quot;>
      <p class=&quot;text-muted text-sm&quot;>Delete account confirmation content</p>
    </div>
  </template>
  <template #footer>
    <UButton variant=&quot;ghost&quot; label=&quot;Cancel&quot; @click=&quot;open = false&quot; />
    <UButton color=&quot;error&quot; label=&quot;Delete&quot; @click=&quot;open = false&quot; />
  </template>
</UModal>`">
        <UModal v-model:open="descOpen" title="Delete Account" description="This action cannot be undone. All your data will be permanently removed.">
          <UButton label="Open" color="error" variant="subtle" />
          <template #body>
            <div class="h-48 rounded-lg bg-[var(--color-surface-muted)] flex items-center justify-center">
              <p class="text-muted text-sm">Delete account confirmation content</p>
            </div>
          </template>
          <template #footer>
            <UButton variant="ghost" label="Cancel" @click="descOpen = false" />
            <UButton color="error" label="Delete" @click="descOpen = false" />
          </template>
        </UModal>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Fullscreen</h3>
      <p class="demo-description">The <code>fullscreen</code> prop makes the modal fill the entire viewport.</p>
      <CodeCollapsible :code="`<UModal v-model:open=&quot;open&quot; title=&quot;Welcome&quot; fullscreen>
  <UButton label=&quot;Fullscreen&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #body>
    <div class=&quot;h-full rounded-lg bg-[var(--color-surface-muted)] flex items-center justify-center&quot;>
      <p class=&quot;text-muted&quot;>Fullscreen body content</p>
    </div>
  </template>
  <template #footer>
    <UButton variant=&quot;ghost&quot; label=&quot;Cancel&quot; @click=&quot;open = false&quot; />
    <UButton color=&quot;primary&quot; label=&quot;Confirm&quot; @click=&quot;open = false&quot; />
  </template>
</UModal>`">
        <UModal v-model:open="fullscreenOpen" title="Welcome" fullscreen>
          <UButton label="Fullscreen" color="neutral" variant="subtle" />
          <template #body>
            <div class="h-full rounded-lg bg-[var(--color-surface-muted)] flex items-center justify-center">
              <p class="text-muted text-sm">Fullscreen body content</p>
            </div>
          </template>
          <template #footer>
            <UButton variant="ghost" label="Cancel" @click="fullscreenOpen = false" />
            <UButton color="primary" label="Confirm" @click="fullscreenOpen = false" />
          </template>
        </UModal>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Scrollable</h3>
      <p class="demo-description">The <code>scrollable</code> prop lets content scroll within the overlay.</p>
      <CodeCollapsible :code="`<UModal v-model:open=&quot;open&quot; title=&quot;Terms of Service&quot; scrollable>
  <UButton label=&quot;Scrollable Modal&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #body>
    <div class=&quot;flex flex-col gap-2&quot;>
      <p v-for=&quot;i in 20&quot; :key=&quot;i&quot; class=&quot;text-sm text-muted&quot;>Section {{ i }}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </template>
  <template #footer>
    <UButton variant=&quot;ghost&quot; label=&quot;Decline&quot; @click=&quot;open = false&quot; />
    <UButton color=&quot;primary&quot; label=&quot;Accept&quot; @click=&quot;open = false&quot; />
  </template>
</UModal>`">
        <UModal v-model:open="scrollableOpen" title="Terms of Service" scrollable>
          <UButton label="Scrollable Modal" color="neutral" variant="subtle" />
          <template #body>
            <div class="flex flex-col gap-2">
              <p v-for="i in 20" :key="i" class="text-sm text-muted">Section {{ i }}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </template>
          <template #footer>
            <UButton variant="ghost" label="Decline" @click="scrollableOpen = false" />
            <UButton color="primary" label="Accept" @click="scrollableOpen = false" />
          </template>
        </UModal>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Non-Dismissible</h3>
      <p class="demo-description">Setting <code>:dismissible=&quot;false&quot;</code> prevents close via click-outside or Escape.</p>
      <CodeCollapsible :code="`<UModal v-model:open=&quot;open&quot; title=&quot;Confirm Action&quot; :dismissible=&quot;false&quot;>
  <UButton label=&quot;Non-Dismissible&quot; color=&quot;warning&quot; variant=&quot;subtle&quot; />
  <template #body>
    <div class=&quot;h-48 rounded-lg bg-[var(--color-surface-muted)] flex items-center justify-center&quot;>
      <p class=&quot;text-muted text-sm&quot;>You must explicitly choose an option to close.</p>
    </div>
  </template>
  <template #footer>
    <UButton label=&quot;Cancel&quot; variant=&quot;ghost&quot; @click=&quot;open = false&quot; />
    <UButton label=&quot;Confirm&quot; color=&quot;primary&quot; @click=&quot;open = false&quot; />
  </template>
</UModal>`">
        <UModal v-model:open="dismissibleOpen" title="Confirm Action" :dismissible="false">
          <UButton label="Non-Dismissible" color="warning" variant="subtle" />
          <template #body>
            <div class="h-48 rounded-lg bg-[var(--color-surface-muted)] flex items-center justify-center">
              <p class="text-muted text-sm">You must explicitly choose an option to close.</p>
            </div>
          </template>
          <template #footer>
            <UButton variant="ghost" label="Cancel" @click="dismissibleOpen = false" />
            <UButton color="primary" label="Confirm" @click="dismissibleOpen = false" />
          </template>
        </UModal>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Nested</h3>
      <p class="demo-description">Modals can be nested within each other for multi-step workflows.</p>
      <CodeCollapsible :code="`<UModal v-model:open=&quot;first&quot; title=&quot;First Modal&quot;>
  <UButton label=&quot;Open First&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; />
  <template #footer>
    <UButton variant=&quot;outline&quot; label=&quot;Close&quot; @click=&quot;first = false&quot; />
    <UModal v-model:open=&quot;second&quot; title=&quot;Second Modal&quot;>
      <UButton label=&quot;Open Second&quot; color=&quot;primary&quot; />
      <template #footer>
        <UButton variant=&quot;outline&quot; label=&quot;Close&quot; @click=&quot;second = false&quot; />
      </template>
    </UModal>
  </template>
</UModal>`">
        <UModal v-model:open="nestedFirstOpen" title="First Modal">
          <UButton label="Open First" color="neutral" variant="subtle" />
          <template #footer>
            <UButton variant="outline" label="Close" @click="nestedFirstOpen = false" />
            <UModal v-model:open="nestedSecondOpen" title="Second Modal">
              <UButton label="Open Second" color="primary" />
              <template #footer>
                <UButton variant="outline" label="Close" @click="nestedSecondOpen = false" />
              </template>
            </UModal>
          </template>
        </UModal>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Footer Slot</h3>
      <p class="demo-description">Use <code>#footer</code> for action buttons. The slot exposes a <code>{ close }</code> function.</p>
      <CodeCollapsible :code="`<UModal v-model:open=&quot;open&quot; title=&quot;Edit Profile&quot; description=&quot;Make changes below.&quot;>
  <UButton label=&quot;Open&quot; color=&quot;primary&quot; variant=&quot;subtle&quot; />
  <template #body>
    <UInput placeholder=&quot;Your name&quot; />
    <UInput placeholder=&quot;Email&quot; type=&quot;email&quot; />
  </template>
  <template #footer=&quot;{ close }&quot;>
    <UButton label=&quot;Cancel&quot; variant=&quot;outline&quot; @click=&quot;close&quot; />
    <UButton label=&quot;Save&quot; color=&quot;primary&quot; />
  </template>
</UModal>`">
        <UModal v-model:open="footerOpen" title="Edit Profile" description="Make changes to your profile below.">
          <UButton label="Open" color="primary" variant="subtle" />
          <template #body>
            <div class="flex flex-col gap-3">
              <UInput placeholder="Your name" />
              <UInput placeholder="Email" type="email" />
            </div>
          </template>
          <template #footer="{ close }">
            <UButton label="Cancel" variant="outline" @click="close" />
            <UButton label="Save" color="primary" />
          </template>
        </UModal>
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
</style>
