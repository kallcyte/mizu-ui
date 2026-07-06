<script setup lang="ts">
import { ref } from "vue";
import {
  MizuDrawerRoot,
  MizuDrawerPortal,
  MizuDrawerOverlay,
  MizuDrawerContent,
  MizuDrawerHeader,
  MizuDrawerBody,
  MizuDrawerFooter,
  MizuDrawerTitle,
  MizuDrawerDescription,
  MizuDrawerClose,
  MizuDrawerTrigger,
  MizuButton,
  MizuSelect,
} from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const rightOpen = ref(false);
const leftOpen = ref(false);
const topOpen = ref(false);
const bottomOpen = ref(false);
const sizedOpen = ref(false);
const nonDismissibleOpen = ref(false);
const navOpen = ref(false);

const selectedSize = ref("md");
const sizeOptions = [
  { label: "sm", value: "sm" },
  { label: "md", value: "md" },
  { label: "lg", value: "lg" },
  { label: "xl", value: "xl" },
  { label: "full", value: "full" },
];

const rightCode = `<MizuDrawerRoot v-model:open="open">
  <MizuDrawerTrigger as-child>
    <MizuButton variant="accent" size="md" class="w-max">Open Right Drawer</MizuButton>
  </MizuDrawerTrigger>
  <MizuDrawerPortal>
    <MizuDrawerOverlay />
    <MizuDrawerContent side="right">
      <MizuDrawerClose />
      <MizuDrawerHeader>
        <MizuDrawerTitle>Right Drawer</MizuDrawerTitle>
        <MizuDrawerDescription>This drawer slides in from the right edge.</MizuDrawerDescription>
      </MizuDrawerHeader>
      <MizuDrawerBody>
        <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
          Drawers are great for side panels, filter menus, and supplementary content. They slide over the main content
          without fully blocking the page.
        </p>
      </MizuDrawerBody>
      <MizuDrawerFooter>
        <MizuButton variant="ghost" size="md" class="w-max" @click="open = false">Cancel</MizuButton>
        <MizuButton variant="accent" size="md" class="w-max" @click="open = false">Save</MizuButton>
      </MizuDrawerFooter>
    </MizuDrawerContent>
  </MizuDrawerPortal>
</MizuDrawerRoot>`;

const leftCode = `<MizuDrawerRoot v-model:open="open">
  <MizuDrawerTrigger as-child>
    <MizuButton variant="accent" size="md" class="w-max">Open Left Drawer</MizuButton>
  </MizuDrawerTrigger>
  <MizuDrawerPortal>
    <MizuDrawerOverlay />
    <MizuDrawerContent side="left">
      <MizuDrawerClose />
      <MizuDrawerHeader>
        <MizuDrawerTitle>Navigation</MizuDrawerTitle>
        <MizuDrawerDescription>Left-side panels are commonly used for navigation.</MizuDrawerDescription>
      </MizuDrawerHeader>
      <MizuDrawerBody>
        <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
          Set <code>side="left"</code> to mount the drawer on the left edge. Ideal for mobile nav menus,
          chat sidebars, and settings panels.
        </p>
      </MizuDrawerBody>
      <MizuDrawerFooter>
        <MizuButton variant="accent" size="md" class="w-max" @click="open = false">Close</MizuButton>
      </MizuDrawerFooter>
    </MizuDrawerContent>
  </MizuDrawerPortal>
</MizuDrawerRoot>`;

const topCode = `<MizuDrawerRoot v-model:open="open">
  <MizuDrawerTrigger as-child>
    <MizuButton variant="accent" size="md" class="w-max">Open Top Drawer</MizuButton>
  </MizuDrawerTrigger>
  <MizuDrawerPortal>
    <MizuDrawerOverlay />
    <MizuDrawerContent side="top">
      <MizuDrawerClose />
      <MizuDrawerHeader>
        <MizuDrawerTitle>Notifications</MizuDrawerTitle>
        <MizuDrawerDescription>Drawers can also slide in from the top.</MizuDrawerDescription>
      </MizuDrawerHeader>
      <MizuDrawerBody>
        <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
          Top drawers are useful for notification panels, search overlays, and announcement banners.
          Set <code>side="top"</code> to mount from the top edge.
        </p>
      </MizuDrawerBody>
      <MizuDrawerFooter>
        <MizuButton variant="ghost" size="md" class="w-max" @click="open = false">Dismiss</MizuButton>
        <MizuButton variant="accent" size="md" class="w-max" @click="open = false">View All</MizuButton>
      </MizuDrawerFooter>
    </MizuDrawerContent>
  </MizuDrawerPortal>
</MizuDrawerRoot>`;

const bottomCode = `<MizuDrawerRoot v-model:open="open">
  <MizuDrawerTrigger as-child>
    <MizuButton variant="accent" size="md" class="w-max">Open Bottom Drawer</MizuButton>
  </MizuDrawerTrigger>
  <MizuDrawerPortal>
    <MizuDrawerOverlay />
    <MizuDrawerContent side="bottom">
      <MizuDrawerClose />
      <MizuDrawerHeader>
        <MizuDrawerTitle>Bottom Sheet</MizuDrawerTitle>
        <MizuDrawerDescription>Commonly used for mobile action sheets and filters.</MizuDrawerDescription>
      </MizuDrawerHeader>
      <MizuDrawerBody>
        <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
          Bottom drawers are the standard mobile pattern for action sheets, sort/filter panels, and
          sharing options. Use <code>side="bottom"</code>.
        </p>
      </MizuDrawerBody>
      <MizuDrawerFooter>
        <MizuButton variant="accent" size="md" class="w-max" @click="open = false">Done</MizuButton>
      </MizuDrawerFooter>
    </MizuDrawerContent>
  </MizuDrawerPortal>
</MizuDrawerRoot>`;

const sizeCode = `<MizuSelect v-model="selectedSize" :options="sizeOptions" placeholder="md" size="sm" style="width: 120px;" />
<MizuDrawerRoot v-model:open="sizedOpen">
  <MizuDrawerTrigger as-child>
    <MizuButton variant="accent" size="md" class="w-max">Open {{ selectedSize }} Drawer</MizuButton>
  </MizuDrawerTrigger>
  <MizuDrawerPortal>
    <MizuDrawerOverlay />
    <MizuDrawerContent :size="(selectedSize as 'sm' | 'md' | 'lg' | 'xl' | 'full')">
      <MizuDrawerClose />
      <MizuDrawerHeader>
        <MizuDrawerTitle>Size: {{ selectedSize }}</MizuDrawerTitle>
        <MizuDrawerDescription>
          {{ selectedSize === 'full' ? 'Full-viewport drawer' : \`Width: \${({ sm: '24rem', md: '28rem', lg: '32rem', xl: '36rem' } as Record<string, string>)[selectedSize]}\` }}
        </MizuDrawerDescription>
      </MizuDrawerHeader>
      <MizuDrawerBody>
        <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
          Drawers support five sizes: <code>sm</code>, <code>md</code> (default), <code>lg</code>, <code>xl</code>, and <code>full</code>.
          Sizes control width for left/right drawers and height for top/bottom drawers.
        </p>
      </MizuDrawerBody>
      <MizuDrawerFooter>
        <MizuButton variant="accent" size="md" class="w-max" @click="sizedOpen = false">Close</MizuButton>
      </MizuDrawerFooter>
    </MizuDrawerContent>
  </MizuDrawerPortal>
</MizuDrawerRoot>`;

const nonDismissibleCode = `<MizuDrawerRoot v-model:open="open">
  <MizuDrawerTrigger as-child>
    <MizuButton variant="accent" size="md" class="w-max">Open Non-Dismissible</MizuButton>
  </MizuDrawerTrigger>
  <MizuDrawerPortal>
    <MizuDrawerOverlay />
    <MizuDrawerContent :dismissible="false">
      <MizuDrawerHeader>
        <MizuDrawerTitle>Important Action Required</MizuDrawerTitle>
        <MizuDrawerDescription>This drawer cannot be dismissed by clicking outside or pressing Escape.</MizuDrawerDescription>
      </MizuDrawerHeader>
      <MizuDrawerBody>
        <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
          When <code>:dismissible="false"</code>, the close button is hidden and the drawer stays open
          until the user explicitly clicks an action button in the footer. Use this for critical flows
          that require a deliberate choice.
        </p>
      </MizuDrawerBody>
      <MizuDrawerFooter>
        <MizuButton variant="accent" size="md" class="w-max" @click="open = false">I Understand</MizuButton>
      </MizuDrawerFooter>
    </MizuDrawerContent>
  </MizuDrawerPortal>
</MizuDrawerRoot>`;

const navCode = `<MizuDrawerRoot v-model:open="open">
  <MizuDrawerTrigger as-child>
    <MizuButton variant="accent" size="md" class="w-max">Open Navigation</MizuButton>
  </MizuDrawerTrigger>
  <MizuDrawerPortal>
    <MizuDrawerOverlay />
    <MizuDrawerContent side="left">
      <MizuDrawerClose />
      <MizuDrawerHeader>
        <MizuDrawerTitle>Mizu Design</MizuDrawerTitle>
        <MizuDrawerDescription>v0.14.0</MizuDrawerDescription>
      </MizuDrawerHeader>
      <MizuDrawerBody>
        <div class="nav-list">
          <a href="#" class="nav-item">Dashboard</a>
          <a href="#" class="nav-item nav-item--active">Components</a>
          <a href="#" class="nav-item">Tokens</a>
          <a href="#" class="nav-item">Documentation</a>
          <a href="#" class="nav-item">Settings</a>
        </div>
      </MizuDrawerBody>
      <MizuDrawerFooter>
        <MizuButton variant="ghost" size="md" class="w-max" @click="open = false">Close</MizuButton>
      </MizuDrawerFooter>
    </MizuDrawerContent>
  </MizuDrawerPortal>
</MizuDrawerRoot>`;
</script>

<template>
  <div class="drawer-demo not-content">
    <DemoTabs :code="rightCode">
      <div class="demo-section">
        <h3>Right Drawer</h3>
        <MizuDrawerRoot v-model:open="rightOpen">
          <MizuDrawerTrigger as-child>
            <MizuButton variant="accent" size="md" class="w-max">Open Right Drawer</MizuButton>
          </MizuDrawerTrigger>
          <MizuDrawerPortal>
            <MizuDrawerOverlay />
            <MizuDrawerContent side="right">
              <MizuDrawerClose />
              <MizuDrawerHeader>
                <MizuDrawerTitle>Right Drawer</MizuDrawerTitle>
                <MizuDrawerDescription>This drawer slides in from the right edge.</MizuDrawerDescription>
              </MizuDrawerHeader>
              <MizuDrawerBody>
                <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
                  Drawers are great for side panels, filter menus, and supplementary content. They slide over the main content
                  without fully blocking the page.
                </p>
              </MizuDrawerBody>
              <MizuDrawerFooter>
                <MizuButton variant="ghost" size="md" class="w-max" @click="rightOpen = false">Cancel</MizuButton>
                <MizuButton variant="accent" size="md" class="w-max" @click="rightOpen = false">Save</MizuButton>
              </MizuDrawerFooter>
            </MizuDrawerContent>
          </MizuDrawerPortal>
        </MizuDrawerRoot>
      </div>
    </DemoTabs>

    <DemoTabs :code="leftCode">
      <div class="demo-section">
        <h3>Left Drawer</h3>
        <MizuDrawerRoot v-model:open="leftOpen">
          <MizuDrawerTrigger as-child>
            <MizuButton variant="accent" size="md" class="w-max">Open Left Drawer</MizuButton>
          </MizuDrawerTrigger>
          <MizuDrawerPortal>
            <MizuDrawerOverlay />
            <MizuDrawerContent side="left">
              <MizuDrawerClose />
              <MizuDrawerHeader>
                <MizuDrawerTitle>Navigation</MizuDrawerTitle>
                <MizuDrawerDescription>Left-side panels are commonly used for navigation.</MizuDrawerDescription>
              </MizuDrawerHeader>
              <MizuDrawerBody>
                <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
                  Set <code>side="left"</code> to mount the drawer on the left edge. Ideal for mobile nav menus,
                  chat sidebars, and settings panels.
                </p>
              </MizuDrawerBody>
              <MizuDrawerFooter>
                <MizuButton variant="accent" size="md" class="w-max" @click="leftOpen = false">Close</MizuButton>
              </MizuDrawerFooter>
            </MizuDrawerContent>
          </MizuDrawerPortal>
        </MizuDrawerRoot>
      </div>
    </DemoTabs>

    <DemoTabs :code="topCode">
      <div class="demo-section">
        <h3>Top Drawer</h3>
        <MizuDrawerRoot v-model:open="topOpen">
          <MizuDrawerTrigger as-child>
            <MizuButton variant="accent" size="md" class="w-max">Open Top Drawer</MizuButton>
          </MizuDrawerTrigger>
          <MizuDrawerPortal>
            <MizuDrawerOverlay />
            <MizuDrawerContent side="top">
              <MizuDrawerClose />
              <MizuDrawerHeader>
                <MizuDrawerTitle>Notifications</MizuDrawerTitle>
                <MizuDrawerDescription>Drawers can also slide in from the top.</MizuDrawerDescription>
              </MizuDrawerHeader>
              <MizuDrawerBody>
                <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
                  Top drawers are useful for notification panels, search overlays, and announcement banners.
                  Set <code>side="top"</code> to mount from the top edge.
                </p>
              </MizuDrawerBody>
              <MizuDrawerFooter>
                <MizuButton variant="ghost" size="md" class="w-max" @click="topOpen = false">Dismiss</MizuButton>
                <MizuButton variant="accent" size="md" class="w-max" @click="topOpen = false">View All</MizuButton>
              </MizuDrawerFooter>
            </MizuDrawerContent>
          </MizuDrawerPortal>
        </MizuDrawerRoot>
      </div>
    </DemoTabs>

    <DemoTabs :code="bottomCode">
      <div class="demo-section">
        <h3>Bottom Drawer</h3>
        <MizuDrawerRoot v-model:open="bottomOpen">
          <MizuDrawerTrigger as-child>
            <MizuButton variant="accent" size="md" class="w-max">Open Bottom Drawer</MizuButton>
          </MizuDrawerTrigger>
          <MizuDrawerPortal>
            <MizuDrawerOverlay />
            <MizuDrawerContent side="bottom">
              <MizuDrawerClose />
              <MizuDrawerHeader>
                <MizuDrawerTitle>Bottom Sheet</MizuDrawerTitle>
                <MizuDrawerDescription>Commonly used for mobile action sheets and filters.</MizuDrawerDescription>
              </MizuDrawerHeader>
              <MizuDrawerBody>
                <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
                  Bottom drawers are the standard mobile pattern for action sheets, sort/filter panels, and
                  sharing options. Use <code>side="bottom"</code>.
                </p>
              </MizuDrawerBody>
              <MizuDrawerFooter>
                <MizuButton variant="accent" size="md" class="w-max" @click="bottomOpen = false">Done</MizuButton>
              </MizuDrawerFooter>
            </MizuDrawerContent>
          </MizuDrawerPortal>
        </MizuDrawerRoot>
      </div>
    </DemoTabs>

    <DemoTabs :code="sizeCode">
      <div class="demo-section">
        <h3>Size Variants</h3>
        <div class="size-row">
          <MizuSelect v-model="selectedSize" :options="sizeOptions" placeholder="md" size="sm" style="width: 120px;" />
          <MizuDrawerRoot v-model:open="sizedOpen">
            <MizuDrawerTrigger as-child>
              <MizuButton variant="accent" size="md" class="w-max">Open {{ selectedSize }} Drawer</MizuButton>
            </MizuDrawerTrigger>
            <MizuDrawerPortal>
              <MizuDrawerOverlay />
              <MizuDrawerContent :size="(selectedSize as 'sm' | 'md' | 'lg' | 'xl' | 'full')">
                <MizuDrawerClose />
                <MizuDrawerHeader>
                  <MizuDrawerTitle>Size: {{ selectedSize }}</MizuDrawerTitle>
                  <MizuDrawerDescription>
                    {{ selectedSize === 'full' ? 'Full-viewport drawer' : `Width: ${({ sm: '24rem', md: '28rem', lg: '32rem', xl: '36rem' } as Record<string, string>)[selectedSize]}` }}
                  </MizuDrawerDescription>
                </MizuDrawerHeader>
                <MizuDrawerBody>
                  <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
                    Drawers support five sizes: <code>sm</code>, <code>md</code> (default), <code>lg</code>, <code>xl</code>, and <code>full</code>.
                    Sizes control width for left/right drawers and height for top/bottom drawers.
                  </p>
                </MizuDrawerBody>
                <MizuDrawerFooter>
                  <MizuButton variant="accent" size="md" class="w-max" @click="sizedOpen = false">Close</MizuButton>
                </MizuDrawerFooter>
              </MizuDrawerContent>
            </MizuDrawerPortal>
          </MizuDrawerRoot>
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="nonDismissibleCode">
      <div class="demo-section">
        <h3>Non-Dismissible</h3>
        <MizuDrawerRoot v-model:open="nonDismissibleOpen">
          <MizuDrawerTrigger as-child>
            <MizuButton variant="accent" size="md" class="w-max">Open Non-Dismissible</MizuButton>
          </MizuDrawerTrigger>
          <MizuDrawerPortal>
            <MizuDrawerOverlay />
            <MizuDrawerContent :dismissible="false">
              <MizuDrawerHeader>
                <MizuDrawerTitle>Important Action Required</MizuDrawerTitle>
                <MizuDrawerDescription>This drawer cannot be dismissed by clicking outside or pressing Escape.</MizuDrawerDescription>
              </MizuDrawerHeader>
              <MizuDrawerBody>
                <p style="color: var(--color-foreground-secondary); font-size: 14px; line-height: 1.6; margin: 0;">
                  When <code>:dismissible="false"</code>, the close button is hidden and the drawer stays open
                  until the user explicitly clicks an action button in the footer. Use this for critical flows
                  that require a deliberate choice.
                </p>
              </MizuDrawerBody>
              <MizuDrawerFooter>
                <MizuButton variant="accent" size="md" class="w-max" @click="nonDismissibleOpen = false">I Understand</MizuButton>
              </MizuDrawerFooter>
            </MizuDrawerContent>
          </MizuDrawerPortal>
        </MizuDrawerRoot>
      </div>
    </DemoTabs>

    <DemoTabs :code="navCode">
      <div class="demo-section">
        <h3>Navigation Menu</h3>
        <MizuDrawerRoot v-model:open="navOpen">
          <MizuDrawerTrigger as-child>
            <MizuButton variant="accent" size="md" class="w-max">Open Navigation</MizuButton>
          </MizuDrawerTrigger>
          <MizuDrawerPortal>
            <MizuDrawerOverlay />
            <MizuDrawerContent side="left">
              <MizuDrawerClose />
              <MizuDrawerHeader>
                <MizuDrawerTitle>Mizu Design</MizuDrawerTitle>
                <MizuDrawerDescription>v0.14.0</MizuDrawerDescription>
              </MizuDrawerHeader>
              <MizuDrawerBody>
                <div class="nav-list">
                  <a href="#" class="nav-item">Dashboard</a>
                  <a href="#" class="nav-item nav-item--active">Components</a>
                  <a href="#" class="nav-item">Tokens</a>
                  <a href="#" class="nav-item">Documentation</a>
                  <a href="#" class="nav-item">Settings</a>
                </div>
              </MizuDrawerBody>
              <MizuDrawerFooter>
                <MizuButton variant="ghost" size="md" class="w-max" @click="navOpen = false">Close</MizuButton>
              </MizuDrawerFooter>
            </MizuDrawerContent>
          </MizuDrawerPortal>
        </MizuDrawerRoot>
      </div>
    </DemoTabs>
  </div>
</template>

<style scoped>
.drawer-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
  background: transparent;
}

.drawer-demo .demo-section {
  margin-top: 0;
}

.drawer-demo .demo-section > * {
  margin-top: 0;
}

.drawer-demo .demo-section h3 {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-foreground-primary);
  margin-bottom: 4px;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.size-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: -8px 0;
}

.nav-item {
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: var(--color-foreground-secondary);
  text-decoration: none;
  transition: background 150ms, color 150ms;
  margin: 0;
}

.nav-item:hover {
  background: var(--color-surface-subtle);
  color: var(--color-foreground-primary);
}

.nav-item--active {
  background: var(--color-surface-subtle);
  color: var(--color-brand-accent);
  font-weight: 500;
}
</style>
