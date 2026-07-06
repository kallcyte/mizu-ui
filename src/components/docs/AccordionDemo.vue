<script setup lang="ts">
import { ref } from "vue";
import {
  MizuAccordionRoot,
  MizuAccordionItem,
  MizuAccordionHeader,
  MizuAccordionTrigger,
  MizuAccordionContent,
} from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const singleValue = ref("item-1");
const multipleValue = ref(["item-1"]);

const singleCode = `<MizuAccordionRoot type="single" collapsible>
  <MizuAccordionItem value="item-1">
    <MizuAccordionHeader>
      <MizuAccordionTrigger>What is Mizu Design System?</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      Mizu is a multi-framework design system built on DTCG tokens. It provides Vue components via Reka UI and will expand to React via shadcn/ui.
    </MizuAccordionContent>
  </MizuAccordionItem>
  <MizuAccordionItem value="item-2">
    <MizuAccordionHeader>
      <MizuAccordionTrigger>Which frameworks are supported?</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      Currently Vue 3 with Reka UI primitives. React support via shadcn/ui + ReUI is planned.
    </MizuAccordionContent>
  </MizuAccordionItem>
  <MizuAccordionItem value="item-3">
    <MizuAccordionHeader>
      <MizuAccordionTrigger>Is it production ready?</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      The library is in pre-1.0 development. Components are functional but APIs may change between minor versions.
    </MizuAccordionContent>
  </MizuAccordionItem>
</MizuAccordionRoot>`;

const controlledCode = `<MizuAccordionRoot v-model="singleValue" type="single" collapsible>
  <MizuAccordionItem value="item-1">
    <MizuAccordionHeader>
      <MizuAccordionTrigger>Account Settings</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      Manage your account preferences, email, and password settings.
    </MizuAccordionContent>
  </MizuAccordionItem>
  <MizuAccordionItem value="item-2">
    <MizuAccordionHeader>
      <MizuAccordionTrigger>Notifications</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      Configure which notifications you receive and their delivery method.
    </MizuAccordionContent>
  </MizuAccordionItem>
  <MizuAccordionItem value="item-3">
    <MizuAccordionHeader>
      <MizuAccordionTrigger>Privacy &amp; Security</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      Review your privacy settings, connected apps, and security audit log.
    </MizuAccordionContent>
  </MizuAccordionItem>
</MizuAccordionRoot>`;

const multipleCode = `<MizuAccordionRoot v-model="multipleValue" type="multiple">
  <MizuAccordionItem value="item-1">
    <MizuAccordionHeader>
      <MizuAccordionTrigger>Getting Started</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      Install via pnpm: <code>pnpm add @mizu/vue</code>. Then import components from <code>@mizu/vue</code> and the stylesheet from <code>@mizu/vue/style.css</code>.
    </MizuAccordionContent>
  </MizuAccordionItem>
  <MizuAccordionItem value="item-2">
    <MizuAccordionHeader>
      <MizuAccordionTrigger>Token System</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      Mizu uses DTCG tokens as a single source of truth, exported as CSS custom properties via <code>@mizu/tokens</code>.
    </MizuAccordionContent>
  </MizuAccordionItem>
  <MizuAccordionItem value="item-3">
    <MizuAccordionHeader>
      <MizuAccordionTrigger>Component Patterns</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      Each component wraps a Reka UI primitive, accepts a <code>class</code> prop for Tailwind overrides, and uses Mizu token classes directly.
    </MizuAccordionContent>
  </MizuAccordionItem>
</MizuAccordionRoot>`;

const disabledCode = `<MizuAccordionRoot type="single" collapsible>
  <MizuAccordionItem value="item-1">
    <MizuAccordionHeader>
      <MizuAccordionTrigger>Available Plan</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      You are currently on the Pro plan. Upgrade to Enterprise for advanced features.
    </MizuAccordionContent>
  </MizuAccordionItem>
  <MizuAccordionItem value="item-2" disabled>
    <MizuAccordionHeader>
      <MizuAccordionTrigger>Billing History (disabled)</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      Billing history is not available in your current plan.
    </MizuAccordionContent>
  </MizuAccordionItem>
  <MizuAccordionItem value="item-3">
    <MizuAccordionHeader>
      <MizuAccordionTrigger>Team Members</MizuAccordionTrigger>
    </MizuAccordionHeader>
    <MizuAccordionContent>
      Manage your team members and their roles and permissions.
    </MizuAccordionContent>
  </MizuAccordionItem>
</MizuAccordionRoot>`;
</script>

<template>
  <div class="accordion-demo not-content">
    <!-- Single type (default) -->
    <div class="demo-section">
      <h3>Single (default)</h3>
      <DemoTabs :code="singleCode">
        <MizuAccordionRoot type="single" collapsible>
          <MizuAccordionItem value="item-1">
            <MizuAccordionHeader>
              <MizuAccordionTrigger>What is Mizu Design System?</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              Mizu is a multi-framework design system built on DTCG tokens. It provides Vue components via Reka UI and will expand to React via shadcn/ui.
            </MizuAccordionContent>
          </MizuAccordionItem>
          <MizuAccordionItem value="item-2">
            <MizuAccordionHeader>
              <MizuAccordionTrigger>Which frameworks are supported?</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              Currently Vue 3 with Reka UI primitives. React support via shadcn/ui + ReUI is planned.
            </MizuAccordionContent>
          </MizuAccordionItem>
          <MizuAccordionItem value="item-3">
            <MizuAccordionHeader>
              <MizuAccordionTrigger>Is it production ready?</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              The library is in pre-1.0 development. Components are functional but APIs may change between minor versions.
            </MizuAccordionContent>
          </MizuAccordionItem>
        </MizuAccordionRoot>
      </DemoTabs>
    </div>

    <!-- v-model controlled -->
    <div class="demo-section">
      <h3>Controlled (v-model)</h3>
      <p class="demo-hint">Currently open: {{ singleValue }}</p>
      <DemoTabs :code="controlledCode">
        <MizuAccordionRoot v-model="singleValue" type="single" collapsible>
          <MizuAccordionItem value="item-1">
            <MizuAccordionHeader>
              <MizuAccordionTrigger>Account Settings</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              Manage your account preferences, email, and password settings.
            </MizuAccordionContent>
          </MizuAccordionItem>
          <MizuAccordionItem value="item-2">
            <MizuAccordionHeader>
              <MizuAccordionTrigger>Notifications</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              Configure which notifications you receive and their delivery method.
            </MizuAccordionContent>
          </MizuAccordionItem>
          <MizuAccordionItem value="item-3">
            <MizuAccordionHeader>
              <MizuAccordionTrigger>Privacy &amp; Security</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              Review your privacy settings, connected apps, and security audit log.
            </MizuAccordionContent>
          </MizuAccordionItem>
        </MizuAccordionRoot>
      </DemoTabs>
    </div>

    <!-- Multiple type -->
    <div class="demo-section">
      <h3>Multiple (type="multiple")</h3>
      <p class="demo-hint">Currently open: {{ multipleValue }}</p>
      <DemoTabs :code="multipleCode">
        <MizuAccordionRoot v-model="multipleValue" type="multiple">
          <MizuAccordionItem value="item-1">
            <MizuAccordionHeader>
              <MizuAccordionTrigger>Getting Started</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              Install via pnpm: <code>pnpm add @mizu/vue</code>. Then import components from <code>@mizu/vue</code> and the stylesheet from <code>@mizu/vue/style.css</code>.
            </MizuAccordionContent>
          </MizuAccordionItem>
          <MizuAccordionItem value="item-2">
            <MizuAccordionHeader>
              <MizuAccordionTrigger>Token System</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              Mizu uses DTCG tokens as a single source of truth, exported as CSS custom properties via <code>@mizu/tokens</code>.
            </MizuAccordionContent>
          </MizuAccordionItem>
          <MizuAccordionItem value="item-3">
            <MizuAccordionHeader>
              <MizuAccordionTrigger>Component Patterns</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              Each component wraps a Reka UI primitive, accepts a <code>class</code> prop for Tailwind overrides, and uses Mizu token classes directly.
            </MizuAccordionContent>
          </MizuAccordionItem>
        </MizuAccordionRoot>
      </DemoTabs>
    </div>

    <!-- Disabled items -->
    <div class="demo-section">
      <h3>Disabled items</h3>
      <DemoTabs :code="disabledCode">
        <MizuAccordionRoot type="single" collapsible>
          <MizuAccordionItem value="item-1">
            <MizuAccordionHeader>
              <MizuAccordionTrigger>Available Plan</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              You are currently on the Pro plan. Upgrade to Enterprise for advanced features.
            </MizuAccordionContent>
          </MizuAccordionItem>
          <MizuAccordionItem value="item-2" disabled>
            <MizuAccordionHeader>
              <MizuAccordionTrigger>Billing History (disabled)</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              Billing history is not available in your current plan.
            </MizuAccordionContent>
          </MizuAccordionItem>
          <MizuAccordionItem value="item-3">
            <MizuAccordionHeader>
              <MizuAccordionTrigger>Team Members</MizuAccordionTrigger>
            </MizuAccordionHeader>
            <MizuAccordionContent>
              Manage your team members and their roles and permissions.
            </MizuAccordionContent>
          </MizuAccordionItem>
        </MizuAccordionRoot>
      </DemoTabs>
    </div>
  </div>
</template>

<style scoped>
.accordion-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
  background: transparent;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-section > * {
  margin-top: 0;
}

.demo-section h3 {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}

.demo-hint {
  font-size: 13px;
  color: var(--color-foreground-muted);
  margin: 0;
}
</style>
