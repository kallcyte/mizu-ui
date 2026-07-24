<script setup lang="ts">
import { ref } from "vue";
import { useTemplateRef, onMounted, onBeforeUnmount } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const baseItems = [
  { title: "Address", description: "Add your address here", icon: "i-lucide-house" },
  { title: "Shipping", description: "Set your preferred shipping method", icon: "i-lucide-truck" },
  { title: "Checkout", description: "Confirm your order", icon: "i-lucide-credit-card" },
];

const basicItems = [
  { title: "Account", description: "Create your account" },
  { title: "Profile", description: "Set up your profile" },
  { title: "Confirm", description: "Review and submit" },
];

// Items with content (inline content prop)
const contentItems = [
  { title: "Address", description: "Add your address here", icon: "i-lucide-house", content: "This is the address step content." },
  { title: "Shipping", description: "Set your preferred shipping method", icon: "i-lucide-truck", content: "This is the shipping step content." },
  { title: "Checkout", description: "Confirm your order", icon: "i-lucide-credit-card", content: "This is the checkout step content." },
];

// Vertical items
const verticalItems = [
  { title: "Cart", description: "Review your items", icon: "i-lucide-shopping-cart" },
  { title: "Shipping", description: "Enter delivery address", icon: "i-lucide-truck" },
  { title: "Payment", description: "Choose payment method", icon: "i-lucide-credit-card" },
  { title: "Done", description: "Order confirmed", icon: "i-lucide-check" },
];

// With controls
const controlsItems = [...baseItems];
const stepper = useTemplateRef("stepper");
const stepperStep = ref(0);

// Control active item (auto-advance)
const autoItems = [...baseItems];
const autoStep = ref(0);
let autoInterval: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  autoInterval = setInterval(() => {
    autoStep.value = (autoStep.value + 1) % autoItems.length;
  }, 2000);
});
onBeforeUnmount(() => {
  if (autoInterval) clearInterval(autoInterval);
});

// Disabled item
const disabledItems = [
  { title: "Address", description: "Add your address here", icon: "i-lucide-house" },
  { title: "Shipping", description: "Unavailable in your region", icon: "i-lucide-truck", disabled: true },
  { title: "Checkout", description: "Confirm your order", icon: "i-lucide-credit-card" },
];

// Custom slot
const customSlotItems = [
  { slot: "address" as const, title: "Address", description: "Add your address here", icon: "i-lucide-house" },
  { slot: "shipping" as const, title: "Shipping", description: "Set your preferred shipping method", icon: "i-lucide-truck" },
  { slot: "checkout" as const, title: "Checkout", description: "Confirm your order", icon: "i-lucide-credit-card" },
];

// Reactive selectors
const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
const selectedColor = ref<string>("primary");

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const selectedSize = ref<string>("md");

const selectedOrientation = ref<"horizontal" | "vertical">("horizontal");
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <!-- Basic -->
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A step-by-step wizard. Use <code>:items</code> to define step titles and descriptions. Click a step to jump to it.</p>
      <CodeCollapsible :code="`<UStepper :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <UStepper :items="basicItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Items with content -->
    <section class="example-section">
      <h3>Items with Content</h3>
      <p class="demo-description">Use the <code>content</code> field on each item to render inline content for the active step.</p>
      <CodeCollapsible :code="`<UStepper :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <UStepper :items="contentItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- With icons -->
    <section class="example-section">
      <h3>With Icons</h3>
      <p class="demo-description">Add an <code>icon</code> to each step item to render an icon inside the indicator instead of the step number.</p>
      <CodeCollapsible :code="`<UStepper :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <UStepper :items="baseItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Color -->
    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Sets the color of the active and completed step indicators. Defaults to <code>primary</code>.</p>
      <CodeCollapsible :code="`<UStepper color=&quot;${selectedColor}&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
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
          <UStepper :color="selectedColor" :items="baseItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Size -->
    <section class="example-section">
      <h3>Size</h3>
      <p class="demo-description">Controls the size of the step indicators and labels. Defaults to <code>md</code>.</p>
      <CodeCollapsible :code="`<UStepper size=&quot;${selectedSize}&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
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
          <UStepper :size="selectedSize" :items="baseItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Orientation -->
    <section class="example-section">
      <h3>Orientation</h3>
      <p class="demo-description">Set <code>orientation="vertical"</code> for a sidebar-style progress indicator. Defaults to <code>horizontal</code>.</p>
      <CodeCollapsible :code="`<UStepper orientation=&quot;${selectedOrientation}&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <div class="chip-row">
            <UButton
              :label="'horizontal'"
              :variant="selectedOrientation === 'horizontal' ? 'soft' : 'ghost'"
              size="sm"
              @click="selectedOrientation = 'horizontal'"
            />
            <UButton
              :label="'vertical'"
              :variant="selectedOrientation === 'vertical' ? 'soft' : 'ghost'"
              size="sm"
              @click="selectedOrientation = 'vertical'"
            />
          </div>
          <UStepper :orientation="selectedOrientation" :items="baseItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Vertical -->
    <section class="example-section">
      <h3>Vertical</h3>
      <p class="demo-description">A vertical stepper is ideal for long-form flows like checkout, where you want to see all steps at once.</p>
      <CodeCollapsible :code="`<UStepper orientation=&quot;vertical&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <UStepper orientation="vertical" :items="verticalItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Disabled -->
    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Set <code>disabled: true</code> on individual items to prevent them from being selected, or pass <code>disabled</code> on the root to disable the entire stepper.</p>
      <CodeCollapsible :code="`<UStepper :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <UStepper :items="disabledItems" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- With controls -->
    <section class="example-section">
      <h3>With Controls</h3>
      <p class="demo-description">Use a template ref to access <code>prev()</code>, <code>next()</code>, <code>hasPrev</code>, and <code>hasNext</code> for programmatic navigation.</p>
      <CodeCollapsible :code="`<UStepper ref=&quot;stepper&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />
<UButton :disabled=&quot;!stepper?.hasPrev&quot; @click=&quot;stepper?.prev()&quot;>Prev</UButton>
<UButton :disabled=&quot;!stepper?.hasNext&quot; @click=&quot;stepper?.next()&quot;>Next</UButton>`">
        <div class="demo-col demo-col-wide">
          <UStepper ref="stepper" :items="controlsItems" class="w-full" />
          <div class="flex gap-2 justify-between">
            <UButton
              leading-icon="i-lucide-arrow-left"
              :disabled="!stepper?.hasPrev"
              @click="stepper?.prev()"
            >Prev</UButton>
            <UButton
              trailing-icon="i-lucide-arrow-right"
              :disabled="!stepper?.hasNext"
              @click="stepper?.next()"
            >Next</UButton>
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <!-- Control active item -->
    <section class="example-section">
      <h3>Control Active Item</h3>
      <p class="demo-description">Use <code>v-model</code> with an item's <code>value</code> (or its index) to control the active step externally. Use <code>value-key</code> to match by a different field.</p>
      <CodeCollapsible :code="`<UStepper v-model=&quot;active&quot; :items=&quot;items&quot; class=&quot;w-full&quot; />`">
        <div class="demo-col demo-col-wide">
          <UStepper v-model="autoStep" :items="autoItems" class="w-full" />
          <div class="text-xs text-muted">auto-advancing — active = <code>{{ autoStep }}</code></div>
        </div>
      </CodeCollapsible>
    </section>

    <!-- With content slot -->
    <section class="example-section">
      <h3>With Content Slot</h3>
      <p class="demo-description">Customize the active step's content with the <code>#content</code> slot. The slot exposes <code>item</code>.</p>
      <CodeCollapsible :code="`<UStepper :items=&quot;items&quot; class=&quot;w-full&quot;>
  <template #content=&quot;{ item }&quot;>
    <Placeholder class=&quot;aspect-video&quot;>{{ item?.title }}</Placeholder>
  </template>
</UStepper>`">
        <div class="demo-col demo-col-wide">
          <UStepper :items="baseItems" class="w-full">
            <template #content="{ item }">
              <div class="aspect-video flex items-center justify-center border border-dashed border-surface-muted rounded-md text-sm text-foreground-secondary">
                This is the <code class="mx-1">{{ item?.title }}</code> step.
              </div>
            </template>
          </UStepper>
        </div>
      </CodeCollapsible>
    </section>

    <!-- With custom slot -->
    <section class="example-section">
      <h3>With Custom Slot</h3>
      <p class="demo-description">Use the <code>slot</code> property on an item to fully replace that step's content with a named slot. Use the same slot name on a <code>#{item.slot}</code> template.</p>
      <CodeCollapsible :code="`<UStepper :items=&quot;items&quot; class=&quot;w-full&quot;>
  <template #address>Address content</template>
  <template #shipping>Shipping content</template>
  <template #checkout>Checkout content</template>
</UStepper>`">
        <div class="demo-col demo-col-wide">
          <UStepper :items="customSlotItems" class="w-full">
            <template #address>
              <div class="aspect-video flex items-center justify-center border border-dashed border-surface-muted rounded-md text-sm">Address panel</div>
            </template>
            <template #shipping>
              <div class="aspect-video flex items-center justify-center border border-dashed border-surface-muted rounded-md text-sm">Shipping panel</div>
            </template>
            <template #checkout>
              <div class="aspect-video flex items-center justify-center border border-dashed border-surface-muted rounded-md text-sm">Checkout panel</div>
            </template>
          </UStepper>
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
  max-width: 720px;
}
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
