<script setup lang="ts">
import { ref } from "vue";
import { TooltipProvider } from "reka-ui";

const switchValue = ref(true);
const rating = ref(4);
const toastOpen = ref(true);
const selectedTab = ref("tab1");
const bannerVisible = ref(true);
const todoA = ref(true);
const todoB = ref(true);
const todoC = ref(false);
const modalOpen = ref(false);

const components = [
  { href: "/components/element/alert", name: "Alert", desc: "Inline feedback banner." },
  { href: "/components/element/avatar", name: "Avatar", desc: "User image with fallback." },
  { href: "/components/element/badge", name: "Badge", desc: "Status or category labels." },
  { href: "/components/element/banner", name: "Banner", desc: "Top-site announcement bar." },
  { href: "/components/element/button", name: "Button", desc: "Action with variants & states." },
  { href: "/components/element/card", name: "Card", desc: "Container with slots." },
  { href: "/components/forms/checkbox", name: "Checkbox", desc: "Toggle for multiple options." },
  { href: "/components/element/chip", name: "Chip", desc: "Small numeric indicator." },
  { href: "/components/forms/input", name: "Input", desc: "Text field with icons." },
  { href: "/components/element/progress", name: "Progress", desc: "Task completion bar." },
  { href: "/components/forms/radio-group", name: "RadioGroup", desc: "Single-select from options." },
  { href: "/components/element/tabs", name: "Tabs", desc: "Switch between panels." },
  { href: "/components/data/accordion", name: "Accordion", desc: "Collapsible content panels." },
  { href: "/components/forms/switch", name: "Switch", desc: "Toggle a setting on/off." },
  { href: "/components/forms/slider", name: "Slider", desc: "Pick a numeric range." },
  { href: "/components/overlay/tooltip", name: "Tooltip", desc: "Hover/focus hint." },
  { href: "/components/overlay/toast", name: "Toast", desc: "Non-disruptive notification." },
  { href: "/components/element/skeleton", name: "Skeleton", desc: "Loading placeholder." },
  { href: "/components/forms/input-rating", name: "InputRating", desc: "Star rating selector." },
  { href: "/components/overlay/modal", name: "Modal", desc: "Focused dialog task." },
];
</script>

<template>
  <TooltipProvider>
    <div class="comp-showcase">
      <!-- Alert -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area w-full text-left">
          <UAlert
            title="Heads up!"
            description="Used for inline feedback."
            color="primary"
            variant="subtle"
            icon="i-lucide-info"
            class="w-full"
          />
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Alert</h4>
            <UButton
              to="/components/element/alert"
              variant="ghost"
              color="neutral"
              size="xs"
              trailing-icon="i-lucide-arrow-right"
            >
              View
            </UButton>
          </div>
          <p>Inline feedback banner.</p>
        </div>
      </div>

      <!-- Avatar -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area">
          <div class="centered flex -space-x-2">
            <UAvatar src="https://i.pravatar.cc/64?img=1" alt="User 1" class="ring-2 ring-surface-base" />
            <UAvatar src="https://i.pravatar.cc/64?img=2" alt="User 2" class="ring-2 ring-surface-base" />
            <UAvatar src="https://i.pravatar.cc/64?img=3" alt="User 3" class="ring-2 ring-surface-base" />
            <UAvatar text="+5" class="ring-2 ring-surface-base" />
          </div>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Avatar</h4>
            <UButton to="/components/element/avatar" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>User image with fallback.</p>
        </div>
      </div>

      <!-- Badge -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area">
          <div class="centered flex gap-2 flex-wrap">
            <UBadge color="primary">New</UBadge>
            <UBadge color="success" variant="subtle">Active</UBadge>
            <UBadge color="warning" variant="soft">Pending</UBadge>
            <UBadge color="error">Failed</UBadge>
          </div>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Badge</h4>
            <UButton to="/components/element/badge" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Status or category labels.</p>
        </div>
      </div>

      <!-- Banner -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area w-full">
          <UAlert
            v-if="bannerVisible"
            title="Scheduled maintenance Sunday at 02:00 UTC."
            icon="i-lucide-megaphone"
            color="neutral"
            variant="outline"
            close
            class="w-full"
            @update:open="bannerVisible = false"
          />
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Banner</h4>
            <UButton to="/components/element/banner" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Top-site announcement bar.</p>
        </div>
      </div>

      <!-- Button -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area">
          <div class="centered flex flex-wrap gap-2 items-center justify-center">
            <UButton color="primary" size="sm">Save</UButton>
            <UButton color="neutral" variant="outline" size="sm">Cancel</UButton>
            <UButton icon="i-lucide-plus" size="sm" />
            <UButton icon="i-lucide-trash" color="error" variant="ghost" size="sm" />
          </div>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Button</h4>
            <UButton to="/components/element/button" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Action with variants & states.</p>
        </div>
      </div>

      <!-- Card -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area w-full">
          <UCard variant="outline" class="w-full text-left">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-folder" class="size-4 text-brand-primary" />
                <h5 class="font-semibold m-0 text-[13px]">Project Atlas</h5>
              </div>
            </template>
            <p class="text-[12px] text-foreground-secondary m-0">12 open tasks · updated 2h ago</p>
            <template #footer>
              <div class="flex -space-x-1.5">
                <UAvatar size="2xs" src="https://i.pravatar.cc/32?img=11" />
                <UAvatar size="2xs" src="https://i.pravatar.cc/32?img=12" />
                <UAvatar size="2xs" text="+3" />
              </div>
            </template>
          </UCard>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Card</h4>
            <UButton to="/components/element/card" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Container with slots.</p>
        </div>
      </div>

      <!-- Checkbox -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area text-left">
          <div class="flex flex-col gap-2 text-[13px]">
            <UCheckbox v-model="todoA" label="Design tokens" />
            <UCheckbox v-model="todoB" label="Component docs" />
            <UCheckbox v-model="todoC" label="Release notes" />
          </div>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Checkbox</h4>
            <UButton to="/components/forms/checkbox" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Toggle for multiple options.</p>
        </div>
      </div>

      <!-- Chip -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area">
          <div class="centered flex items-center gap-4">
            <UChip color="primary" text="3">
              <UButton icon="i-lucide-mail" color="neutral" variant="subtle" />
            </UChip>
            <UChip color="success" text="12" size="md">
              <UButton icon="i-lucide-bell" color="neutral" variant="subtle" />
            </UChip>
            <UChip color="error" text="99+" size="md">
              <UButton icon="i-lucide-shopping-cart" color="neutral" variant="subtle" />
            </UChip>
          </div>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Chip</h4>
            <UButton to="/components/element/chip" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Small numeric indicator.</p>
        </div>
      </div>

      <!-- Input -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area w-full">
          <div class="w-full">
            <UInput model-value="hello@mizu-ui.com" icon="i-lucide-mail" placeholder="Email" />
            <p class="text-[11px] text-foreground-secondary mt-2 m-0">Standalone text input.</p>
          </div>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Input</h4>
            <UButton to="/components/forms/input" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Text field with icons.</p>
        </div>
      </div>

      <!-- Progress -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area w-full">
          <div class="w-full flex flex-col gap-2 items-center">
            <UProgress :value="65" color="primary" />
            <UProgress :value="40" color="success" status />
          </div>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Progress</h4>
            <UButton to="/components/element/progress" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Task completion bar.</p>
        </div>
      </div>

      <!-- RadioGroup -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area">
          <URadioGroup
            class="centered"
            model-value="primary"
            :items="[
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'Outline', value: 'outline' },
            ]"
            orientation="horizontal"
          />
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>RadioGroup</h4>
            <UButton to="/components/forms/radio-group" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Single-select from options.</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area w-full">
          <UTabs
            v-model="selectedTab"
            :items="[
              { label: 'Overview', value: 'tab1' },
              { label: 'Activity', value: 'tab2' },
              { label: 'Settings', value: 'tab3' },
            ]"
            class="w-full"
          />
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Tabs</h4>
            <UButton to="/components/element/tabs" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Switch between panels.</p>
        </div>
      </div>

      <!-- Accordion -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area w-full">
          <UAccordion
            :items="[
              { label: 'What is Mizu?', content: 'A design system layer on top of Nuxt UI.' },
              { label: 'How do I install it?', content: 'pnpm add @mizu-ui/vue' },
            ]"
            class="w-full"
          />
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Accordion</h4>
            <UButton to="/components/data/accordion" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Collapsible content panels.</p>
        </div>
      </div>

      <!-- Switch -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area text-left">
          <div class="flex flex-col gap-3 text-[13px]">
            <USwitch v-model="switchValue" label="Wi-Fi" />
            <USwitch model-value label="Bluetooth" />
          </div>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Switch</h4>
            <UButton to="/components/forms/switch" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Toggle a setting on/off.</p>
        </div>
      </div>

      <!-- Slider -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area w-full">
          <USlider :model-value="40" class="w-full" />
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Slider</h4>
            <UButton to="/components/forms/slider" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Pick a numeric range.</p>
        </div>
      </div>

      <!-- Tooltip -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area">
          <UTooltip text="Copied to clipboard">
            <UButton icon="i-lucide-copy" variant="outline" class="centered" />
          </UTooltip>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Tooltip</h4>
            <UButton to="/components/overlay/tooltip" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Hover/focus hint.</p>
        </div>
      </div>

      <!-- Toast -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area w-full text-left">
          <UAlert
            v-if="toastOpen"
            title="Saved"
            description="Your changes were saved."
            color="success"
            variant="subtle"
            icon="i-lucide-close"
            close
            class="w-full"
            @update:open="toastOpen = false"
          />
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Toast</h4>
            <UButton to="/components/overlay/toast" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Non-disruptive notification.</p>
        </div>
      </div>

      <!-- Skeleton -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area w-full">
          <div class="w-full flex flex-col gap-2">
            <USkeleton class="h-3 w-full" />
            <USkeleton class="h-3 w-full" />
            <USkeleton class="h-3 w-3/5" />
          </div>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Skeleton</h4>
            <UButton to="/components/element/skeleton" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Loading placeholder.</p>
        </div>
      </div>

      <!-- InputRating -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area">
          <UInputRating v-model="rating" class="centered" />
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>InputRating</h4>
            <UButton to="/components/forms/input-rating" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Star rating selector.</p>
        </div>
      </div>

      <!-- Modal -->
      <div class="comp-preview-card group">
        <div class="comp-preview-area">
          <UButton color="error" variant="outline" size="sm" class="centered" @click="modalOpen = true">Delete</UButton>
        </div>
        <div class="comp-preview-meta">
          <div class="comp-preview-meta-top">
            <h4>Modal</h4>
            <UButton to="/components/overlay/modal" variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">View</UButton>
          </div>
          <p>Focused dialog task.</p>
        </div>
      </div>

      <UModal v-model:open="modalOpen" title="Confirm delete" description="This action cannot be undone.">
        <template #footer>
          <UButton variant="ghost" color="neutral" @click="modalOpen = false">Cancel</UButton>
          <UButton color="error" @click="modalOpen = false">Delete</UButton>
        </template>
      </UModal>
    </div>
  </TooltipProvider>
</template>

<style scoped>
.comp-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
  margin-top: 24px;
}

.comp-preview-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 14px;
  border: 1px solid var(--color-surface-muted, #E5E7EB);
  background: #FFFFFF;
  color: #111827;
  transition:
    transform var(--duration-fast, 150ms) ease,
    box-shadow var(--duration-fast, 150ms) ease,
    border-color var(--duration-fast, 150ms) ease;
  overflow: hidden;
}

.comp-preview-card:hover {
  border-color: var(--color-brand-ycp, #0098C9);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
}

.comp-preview-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 140px;
  padding: 18px;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  color: #111827;
}

.comp-preview-area > .w-full {
  width: 100%;
}

.comp-preview-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  padding: 12px 14px 14px;
  text-align: left;
  color: #111827;
  margin-top: auto;
}

.comp-preview-meta-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
}

.comp-preview-meta h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.comp-preview-meta p {
  margin: 0;
  font-size: 12px;
  color: #6B7280;
  line-height: 1.4;
}

@media (max-width: 480px) {
  .comp-showcase {
    grid-template-columns: 1fr;
  }
}
</style>
