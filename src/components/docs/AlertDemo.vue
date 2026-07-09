<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; description=&quot;You can change the primary color in your app config.&quot; />`">
        <div class="demo-row">
          <UAlert title="Heads up!" description="You can change the primary color in your app config." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Colors</h3>
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
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; description=&quot;You can change the primary color.&quot; icon=&quot;i-lucide-terminal&quot; />`">
        <div class="demo-row">
          <UAlert title="Heads up!" description="You can change the primary color." icon="i-lucide-terminal" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Close</h3>
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; description=&quot;Dismiss this alert.&quot; color=&quot;neutral&quot; variant=&quot;outline&quot; close />`">
        <div class="demo-row">
          <UAlert title="Heads up!" description="Dismiss this alert." color="neutral" variant="outline" close />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Actions</h3>
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
      <h3>With Avatar</h3>
      <CodeCollapsible :code="`<UAlert title=&quot;Heads up!&quot; description=&quot;A user avatar alert.&quot; color=&quot;neutral&quot; variant=&quot;subtle&quot; :avatar=&quot;{ src: 'https://github.com/nuxt.png' }&quot; />`">
        <div class="demo-row">
          <UAlert title="Heads up!" description="A user avatar alert." color="neutral" variant="subtle" :avatar="{ src: 'https://github.com/nuxt.png' }" />
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
.demo-row--wrap {
  flex-wrap: wrap;
}
.demo-row--col {
  flex-direction: column;
  align-items: stretch;
}
</style>
