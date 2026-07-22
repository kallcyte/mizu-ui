<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const openClose = ref(true);
const openCustomClose = ref(true);
const openCloseIcon = ref(true);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Simple alert with title and description for inline notifications.</p>
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; description=&quot;You can change the primary color in your app config.&quot; />`">
        <div class="demo-row">
          <UAlert title="Heads up!" description="You can change the primary color in your app config." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Title Only</h3>
      <p class="demo-description">An alert with just a <code>title</code> and no description for compact messages.</p>
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; />`">
        <div class="demo-row">
          <UAlert title="Heads up!" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
      <p class="demo-description">Semantic color variants: primary, secondary, success, info, warning, error, and neutral.</p>
      <CodeCollapsible :code="`<UAlert color=&quot;primary&quot; title=&quot;Primary&quot; description=&quot;A primary alert.&quot; />
<UAlert color=&quot;secondary&quot; title=&quot;Secondary&quot; description=&quot;A secondary alert.&quot; />
<UAlert color=&quot;success&quot; title=&quot;Success&quot; description=&quot;A success alert.&quot; />
<UAlert color=&quot;info&quot; title=&quot;Info&quot; description=&quot;An info alert.&quot; />
<UAlert color=&quot;warning&quot; title=&quot;Warning&quot; description=&quot;A warning alert.&quot; />
<UAlert color=&quot;error&quot; title=&quot;Error&quot; description=&quot;An error alert.&quot; />
<UAlert color=&quot;neutral&quot; title=&quot;Neutral&quot; description=&quot;A neutral alert.&quot; />`">
        <div class="demo-row demo-row--wrap demo-row--col">
          <UAlert
            v-for="c in ['primary','secondary','success','info','warning','error','neutral']"
            :key="c"
            :color="c as any"
            :title="c.charAt(0).toUpperCase() + c.slice(1)"
            :description="`A ${c} alert message.`"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variants</h3>
      <p class="demo-description">Four visual variants: solid for emphasis, outline for subtlety, soft for medium prominence, and subtle for minimal visual weight.</p>
      <CodeCollapsible :code="`<UAlert variant=&quot;solid&quot; title=&quot;Solid&quot; description=&quot;A solid alert.&quot; />
<UAlert variant=&quot;outline&quot; title=&quot;Outline&quot; description=&quot;An outline alert.&quot; />
<UAlert variant=&quot;soft&quot; title=&quot;Soft&quot; description=&quot;A soft alert.&quot; />
<UAlert variant=&quot;subtle&quot; title=&quot;Subtle&quot; description=&quot;A subtle alert.&quot; />`">
        <div class="demo-row demo-row--wrap demo-row--col">
          <UAlert variant="solid" title="Solid" description="A solid alert." />
          <UAlert variant="outline" title="Outline" description="An outline alert." color="neutral" />
          <UAlert variant="soft" title="Soft" description="A soft alert." />
          <UAlert variant="subtle" title="Subtle" description="A subtle alert." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icon</h3>
      <p class="demo-description">Add a leading icon for visual context using the <code>icon</code> prop.</p>
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; description=&quot;You can change the primary color.&quot; icon=&quot;i-lucide-terminal&quot; />`">
        <div class="demo-row">
          <UAlert title="Heads up!" description="You can change the primary color." icon="i-lucide-terminal" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Avatar</h3>
      <p class="demo-description">Display a user avatar alongside the alert content using the <code>:avatar</code> prop.</p>
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; description=&quot;A user avatar alert.&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; :avatar=&quot;{ src: 'https://github.com/nuxt.png' }&quot; />`">
        <div class="demo-row">
          <UAlert title="Heads up!" description="A user avatar alert." color="neutral" variant="subtle" :avatar="{ src: 'https://github.com/nuxt.png' }" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Close</h3>
      <p class="demo-description">Add a dismiss button with the <code>close</code> prop to let users hide the alert. Use <code>v-if</code> with <code>@update:open</code> to control visibility.</p>
      <CodeCollapsible :code="`<UAlert v-if=&quot;open&quot; title=&quot;Heads up!&quot; description=&quot;Dismiss this alert.&quot; color=&quot;neutral&quot; variant=&quot;outline&quot; close @update:open=&quot;open = false&quot; />`">
        <div class="demo-row demo-row--wrap">
          <UAlert v-if="openClose" title="Heads up!" description="Dismiss this alert." color="neutral" variant="outline" close @update:open="openClose = false" />
          <UButton v-if="!openClose" label="Show alert" color="neutral" variant="outline" size="xs" @click="openClose = true" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Close</h3>
      <p class="demo-description">Customize the close button appearance by passing <code>ButtonProps</code> to the <code>close</code> prop.</p>
      <CodeCollapsible :code="`<UAlert v-if=&quot;open&quot; title=&quot;Heads up!&quot; description=&quot;Custom close button.&quot; color=&quot;neutral&quot; variant=&quot;outline&quot; :close=&quot;{ color: 'primary', variant: 'outline', class: 'rounded-full' }&quot; @update:open=&quot;open = false&quot; />`">
        <div class="demo-row demo-row--wrap">
          <UAlert v-if="openCustomClose" title="Heads up!" description="Custom close button." color="neutral" variant="outline" :close="{ color: 'primary', variant: 'outline', class: 'rounded-full' }" @update:open="openCustomClose = false" />
          <UButton v-if="!openCustomClose" label="Show alert" color="neutral" variant="outline" size="xs" @click="openCustomClose = true" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Close Icon</h3>
      <p class="demo-description">Replace the default close icon with a custom <code>close-icon</code> from Iconify.</p>
      <CodeCollapsible :code="`<UAlert v-if=&quot;open&quot; title=&quot;Heads up!&quot; description=&quot;Custom close icon.&quot; color=&quot;neutral&quot; variant=&quot;outline&quot; close close-icon=&quot;i-lucide-arrow-right&quot; @update:open=&quot;open = false&quot; />`">
        <div class="demo-row demo-row--wrap">
          <UAlert v-if="openCloseIcon" title="Heads up!" description="Custom close icon." color="neutral" variant="outline" close close-icon="i-lucide-arrow-right" @update:open="openCloseIcon = false" />
          <UButton v-if="!openCloseIcon" label="Show alert" color="neutral" variant="outline" size="xs" @click="openCloseIcon = true" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Actions</h3>
      <p class="demo-description">Add interactive action buttons using the <code>:actions</code> prop for alerts that require user response.</p>
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; description=&quot;You can change the primary color.&quot; color=&quot;neutral&quot; variant=&quot;outline&quot; :actions=&quot;[{ label: 'Action 1' }, { label: 'Action 2', color: 'neutral', variant: 'subtle' }]&quot; />`">
        <div class="demo-row">
          <UAlert
            title="Heads up!"
            description="You can change the primary color."
            color="neutral"
            variant="outline"
            :actions="[{ label: 'Action 1' }, { label: 'Action 2', color: 'neutral', variant: 'subtle' }]"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Orientation</h3>
      <p class="demo-description">Switch between vertical (default) and horizontal layout using the <code>orientation</code> prop.</p>
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; description=&quot;Horizontal layout.&quot; color=&quot;neutral&quot; variant=&quot;outline&quot; orientation=&quot;horizontal&quot; :actions=&quot;[{ label: 'Action 1' }, { label: 'Action 2', color: 'neutral', variant: 'subtle' }]&quot; />`">
        <div class="demo-row">
          <UAlert
            title="Heads up!"
            description="Horizontal layout."
            color="neutral"
            variant="outline"
            orientation="horizontal"
            :actions="[{ label: 'Action 1' }, { label: 'Action 2', color: 'neutral', variant: 'subtle' }]"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom <code>class</code></h3>
      <p class="demo-description">Override base styles using the <code>class</code> prop for custom styling.</p>
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; description=&quot;Rounded corners removed.&quot; class=&quot;rounded-none&quot; />`">
        <div class="demo-row">
          <UAlert title="Heads up!" description="Rounded corners removed." class="rounded-none" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom <code>ui</code></h3>
      <p class="demo-description">Override slot styles using the <code>:ui</code> prop for granular control of individual parts.</p>
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; description=&quot;Larger icon via ui prop.&quot; icon=&quot;i-lucide-rocket&quot; :ui=&quot;{ icon: 'size-11' }&quot; />`">
        <div class="demo-row">
          <UAlert title="Heads up!" description="Larger icon via ui prop." icon="i-lucide-rocket" :ui="{ icon: 'size-11' }" />
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
  align-items: flex-start;
  gap: 8px;
}
.demo-row--wrap {
  flex-wrap: wrap;
}
.demo-row--col {
  flex-direction: column;
  align-items: stretch;
}
</style>
