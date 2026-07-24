<script setup lang="ts">
import { ref } from 'vue'
import CodeCollapsible from "./CodeCollapsible.vue";

// Basic
const basicItems = [
  { label: "Account", icon: "i-lucide-user" },
  { label: "Password", icon: "i-lucide-lock" },
];

// Items with content
const contentItems = [
  { label: "Account", icon: "i-lucide-user", content: "This is the account content." },
  { label: "Password", icon: "i-lucide-lock", content: "This is the password content." },
];

// With route query (use a hash-based fake route so it works in Astro docs)
const routeTab = ref<string>("account");
const routeQueryItems = [
  { label: "Account", icon: "i-lucide-user", value: "account" },
  { label: "Password", icon: "i-lucide-lock", value: "password" },
];

// Reactive selectors
const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
const selectedColor = ref<string>("primary");

const variants = ["pill", "link"] as const;
const selectedVariant = ref<string>("pill");

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const selectedSize = ref<string>("md");

const orientations = ["horizontal", "vertical"] as const;
const selectedOrientation = ref<string>("horizontal");

// Control active item
const activeIndex = ref<string>("0");

// Custom slot state
const slotItems = [
  { label: "Account", icon: "i-lucide-user", slot: "account" as const },
  { label: "Password", icon: "i-lucide-lock", slot: "password" as const },
];
const slotState = ref({
  name: "Benjamin Canac",
  username: "benjamincanac",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Bottom tab bar items
const bottomBarItems = [
  { label: "Home", icon: "i-lucide-house" },
  { label: "Activity", icon: "i-lucide-activity" },
  { label: "Settings", icon: "i-lucide-settings" },
  { label: "Profile", icon: "i-lucide-user" },
];
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <!-- Basic -->
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Switch between panels with <code>:items</code>. Each item shows a label and optional icon.</p>
      <CodeCollapsible :code="`<UTabs :items=&quot;items&quot; />`">
        <div class="demo-col">
          <UTabs :items="basicItems" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Items with content -->
    <section class="example-section">
      <h3>Items with Content</h3>
      <p class="demo-description">Set the <code>content</code> property on each item to render the panel below the triggers without a slot.</p>
      <CodeCollapsible :code="`<UTabs :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <UTabs :items="contentItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Content -->
    <section class="example-section">
      <h3>Toggle Only</h3>
      <p class="demo-description">Set <code>:content="false"</code> to render a control-only tabs without panels (useful for router-driven content).</p>
      <CodeCollapsible :code="`<UTabs :content=&quot;false&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col">
          <UTabs :content="false" :items="contentItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Unmount -->
    <section class="example-section">
      <h3>Unmount on Hide</h3>
      <p class="demo-description">Set <code>:unmount-on-hide="false"</code> to keep all panels mounted so internal state survives tab switches.</p>
      <CodeCollapsible :code="`<UTabs :unmount-on-hide=&quot;false&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <UTabs :unmount-on-hide="false" :items="contentItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- With Icons -->
    <section class="example-section">
      <h3>With Icons</h3>
      <p class="demo-description">Add an <code>icon</code> property to each item for visual cue.</p>
      <CodeCollapsible :code="`<UTabs :items=&quot;items&quot; />`">
        <div class="demo-col">
          <UTabs :items="basicItems" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Color -->
    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Sets the color of the active tab indicator. Defaults to <code>primary</code>.</p>
      <CodeCollapsible :code="`<UTabs color=&quot;${selectedColor}&quot; :content=&quot;false&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <div class="chip-row">
            <UButton
              v-for="c in colors"
              :key="c"
              :label="c"
              :color="c"
              :variant="selectedColor === c ? 'soft' : 'ghost'"
              size="sm"
              @click="selectedColor = c"
            />
          </div>
          <UTabs :color="selectedColor" :content="false" :items="basicItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Variant -->
    <section class="example-section">
      <h3>Variant</h3>
      <p class="demo-description">Changes the visual style. Defaults to <code>pill</code>.</p>
      <CodeCollapsible :code="`<UTabs variant=&quot;${selectedVariant}&quot; :content=&quot;false&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <div class="chip-row">
            <UButton
              v-for="v in variants"
              :key="v"
              :label="v"
              :variant="selectedVariant === v ? 'soft' : 'ghost'"
              size="sm"
              @click="selectedVariant = v"
            />
          </div>
          <UTabs :variant="selectedVariant" :content="false" :items="basicItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Size -->
    <section class="example-section">
      <h3>Size</h3>
      <p class="demo-description">Controls the trigger size. Defaults to <code>md</code>.</p>
      <CodeCollapsible :code="`<UTabs size=&quot;${selectedSize}&quot; variant=&quot;pill&quot; :content=&quot;false&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <div class="chip-row">
            <UButton
              v-for="s in sizes"
              :key="s"
              :label="s"
              :variant="selectedSize === s ? 'soft' : 'ghost'"
              size="sm"
              @click="selectedSize = s"
            />
          </div>
          <UTabs :size="selectedSize" variant="pill" :content="false" :items="basicItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Orientation -->
    <section class="example-section">
      <h3>Orientation</h3>
      <p class="demo-description">Set <code>orientation="vertical"</code> for sidebar-style tab navigation. Defaults to <code>horizontal</code>.</p>
      <CodeCollapsible :code="`<UTabs orientation=&quot;${selectedOrientation}&quot; variant=&quot;pill&quot; :content=&quot;false&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <div class="chip-row">
            <UButton
              v-for="o in orientations"
              :key="o"
              :label="o"
              :variant="selectedOrientation === o ? 'soft' : 'ghost'"
              size="sm"
              @click="selectedOrientation = o"
            />
          </div>
          <UTabs :orientation="selectedOrientation" variant="pill" :content="false" :items="basicItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Disabled -->
    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Prevent selection of specific tabs by setting <code>disabled: true</code> on individual items.</p>
      <CodeCollapsible :code="`<UTabs :items=&quot;items&quot; />`">
        <div class="demo-col">
          <UTabs :items="[{ label: 'Account', icon: 'i-lucide-user' }, { label: 'Billing', icon: 'i-lucide-credit-card', disabled: true }, { label: 'Security', icon: 'i-lucide-shield' }]" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Control active item -->
    <section class="example-section">
      <h3>Control Active Item</h3>
      <p class="demo-description">Use <code>v-model</code> with the item's <code>value</code> (or its index as a string by default) for controlled state. Use <code>value-key</code> to match by a different field.</p>
      <CodeCollapsible :code="`<UTabs v-model=&quot;active&quot; :content=&quot;false&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <UTabs v-model="activeIndex" :content="false" :items="basicItems" class="w-full" />
          <div class="text-xs text-muted">active = <code>{{ activeIndex }}</code></div>
        </div>
      </CodeCollapsible>
    </section>

    <!-- With route query -->
    <section class="example-section">
      <h3>With Route Query</h3>
      <p class="demo-description">Bind the active value to a URL query parameter — useful for deep-linking and SSR-friendly tab navigation.</p>
      <CodeCollapsible :code="`<UTabs v-model=&quot;active&quot; :content=&quot;false&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <UTabs v-model="routeTab" :content="false" :items="routeQueryItems" class="w-full" />
          <div class="text-xs text-muted">current tab = <code>{{ routeTab }}</code></div>
        </div>
      </CodeCollapsible>
    </section>

    <!-- With content slot -->
    <section class="example-section">
      <h3>With Content Slot</h3>
      <p class="demo-description">Customize the active panel with the <code>#content</code> slot. The slot exposes <code>item</code>, <code>index</code>, and <code>ui</code>.</p>
      <CodeCollapsible :code="`<UTabs :items=&quot;items&quot; class=&quot;w-full&quot;>
  <template #content=&quot;{ item }&quot;>
    <p>This is the {{ '{{' }} item.label {{ '}}' }} tab.</p>
  </template>
</UTabs>`">
        <div class="demo-col demo-col-wide">
          <UTabs :items="basicItems" class="w-full">
            <template #content="{ item }">
              <p>This is the {{ item.label }} tab.</p>
            </template>
          </UTabs>
        </div>
      </CodeCollapsible>
    </section>

    <!-- With custom slot -->
    <section class="example-section">
      <h3>With Custom Slot</h3>
      <p class="demo-description">Use the <code>slot</code> property on an item to replace both the trigger and content with a named slot. Each named item slot receives the item as a prop.</p>
      <CodeCollapsible :code="`<UTabs :items=&quot;items&quot; variant=&quot;link&quot; :ui=&quot;{ trigger: 'grow' }&quot; class=&quot;gap-4 w-full&quot;>
  <template #account=&quot;{ item }&quot;>#account slot</template>
  <template #password=&quot;{ item }&quot;>#password slot</template>
</UTabs>`">
        <div class="demo-col demo-col-wide">
          <UTabs :items="slotItems" variant="link" :ui="{ trigger: 'grow' }" class="gap-4 w-full">
            <template #account>
              <div class="flex flex-col gap-2">
                <p class="text-muted">Make changes to your account here.</p>
                <UInput v-model="slotState.name" placeholder="Name" icon="i-lucide-user" class="w-full" />
                <UInput v-model="slotState.username" placeholder="Username" icon="i-lucide-at-sign" class="w-full" />
              </div>
            </template>
            <template #password>
              <div class="flex flex-col gap-2">
                <p class="text-muted">Change your password here.</p>
                <UInput v-model="slotState.currentPassword" type="password" placeholder="Current password" class="w-full" />
                <UInput v-model="slotState.newPassword" type="password" placeholder="New password" class="w-full" />
              </div>
            </template>
          </UTabs>
        </div>
      </CodeCollapsible>
    </section>

    <!-- With bottom tab bar -->
    <section class="example-section">
      <h3>Bottom Tab Bar</h3>
      <p class="demo-description">Use the <code>:ui</code> prop to transform the tabs into a mobile-style bottom tab bar with icons and small labels.</p>
      <CodeCollapsible :code="`<UTabs
  :items=&quot;items&quot;
  :content=&quot;false&quot;
  :ui=&quot;{
    list: 'justify-around w-full',
    trigger: 'grow flex-col gap-1 py-1',
    label: 'text-[10px]/3'
  }&quot;
  class=&quot;w-full&quot;
/>`">
        <div class="demo-col demo-col-wide">
          <UTabs
            :items="bottomBarItems"
            :content="false"
            :ui="{
              list: 'justify-around w-full',
              trigger: 'grow flex-col gap-1 py-1',
              label: 'text-[10px]/3'
            }"
            class="w-full"
          />
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
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 8px;
}
.demo-col-wide {
  width: 100%;
  max-width: 560px;
}
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chip {
  all: unset;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: var(--color-surface-muted, #F3F4F6);
  color: var(--sl-color-text-light);
  border: 1px solid transparent;
  transition: all 0.15s;
}
.chip:hover {
  background: var(--color-surface-muted-hover, #E5E7EB);
}
.chip--active {
  background: var(--sl-color-text-accent);
  color: var(--sl-color-bg);
  border-color: var(--sl-color-text-accent);
}
</style>
