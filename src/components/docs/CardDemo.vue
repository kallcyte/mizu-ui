<script setup lang="ts">
import {
    MizuCard,
    MizuCardHeader,
    MizuCardTitle,
    MizuCardDescription,
    MizuCardAction,
    MizuCardContent,
    MizuCardFooter,
    MizuCardImage,
    MizuButton,
    MizuTag,
} from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const compositionCode = `<MizuCard>
  <MizuCardHeader>
    <MizuCardTitle>Project Status</MizuCardTitle>
    <MizuCardDescription>Current progress and status of the project.</MizuCardDescription>
    <MizuCardAction>
      <MizuTag variant="success">Active</MizuTag>
    </MizuCardAction>
  </MizuCardHeader>
  <MizuCardContent>
    <p>This card demonstrates the full composition pattern.</p>
  </MizuCardContent>
  <MizuCardFooter>
    <MizuButton variant="primary" size="md">View Details</MizuButton>
    <MizuButton variant="ghost" size="md">Dismiss</MizuButton>
  </MizuCardFooter>
</MizuCard>`;

const headerOnlyCode = `<MizuCard>
  <MizuCardHeader>
    <MizuCardTitle>Simple Card</MizuCardTitle>
    <MizuCardDescription>A card with only header content.</MizuCardDescription>
  </MizuCardHeader>
</MizuCard>`;

const contentOnlyCode = `<MizuCard>
  <MizuCardContent>
    <p>A card with only content, no header or footer.</p>
  </MizuCardContent>
</MizuCard>`;

const withActionCode = `<MizuCard>
  <MizuCardHeader>
    <MizuCardTitle>Featured Item</MizuCardTitle>
    <MizuCardDescription>This card has an action button in the header.</MizuCardDescription>
    <MizuCardAction>
      <MizuButton variant="accent" size="md">Take Action</MizuButton>
    </MizuCardAction>
  </MizuCardHeader>
  <MizuCardContent>
    <p>The action area is positioned in the top-right of the header.</p>
  </MizuCardContent>
</MizuCard>`;

const withImageCode = `<MizuCard>
  <MizuCardImage src="https://placecats.com/800/400" alt="Cute kitten" />
  <MizuCardHeader>
    <MizuCardTitle>Whiskers</MizuCardTitle>
    <MizuCardDescription>A fluffy feline companion.</MizuCardDescription>
  </MizuCardHeader>
  <MizuCardContent>
    <p>Cats are independent, curious, and make wonderful pets.</p>
  </MizuCardContent>
  <MizuCardFooter>
    <MizuButton variant="accent" size="md">Adopt Me</MizuButton>
  </MizuCardFooter>
</MizuCard>`;

const compactCode = `<MizuCard spacing="compact">
  <MizuCardHeader>
    <MizuCardTitle>Compact Card</MizuCardTitle>
    <MizuCardDescription>Uses the compact spacing variant.</MizuCardDescription>
  </MizuCardHeader>
  <MizuCardContent>
    <p>Tighter padding for dense layouts.</p>
  </MizuCardContent>
</MizuCard>`;

const comfortableCode = `<MizuCard spacing="comfortable">
  <MizuCardHeader>
    <MizuCardTitle>Spacious Card</MizuCardTitle>
    <MizuCardDescription>Uses the comfortable spacing variant.</MizuCardDescription>
  </MizuCardHeader>
  <MizuCardContent>
    <p>More breathing room for content.</p>
  </MizuCardContent>
</MizuCard>`;
import DemoTabs from "./DemoTabs.vue";
</script>

<template>
    <div class="card-demo not-content">
        <div class="demo-section">
            <h3>Composition</h3>
            <DemoTabs :code="compositionCode">
            <MizuCard>
                <MizuCardHeader>
                    <MizuCardTitle>Project Status</MizuCardTitle>
                    <MizuCardDescription>Current progress and status of the project.</MizuCardDescription>
                    <MizuCardAction>
                        <MizuTag variant="success">Active</MizuTag>
                    </MizuCardAction>
                </MizuCardHeader>
                <MizuCardContent>
                    <p class="card-text">This card demonstrates the full composition pattern with header, content, and footer sections.</p>
                </MizuCardContent>
                <MizuCardFooter>
                    <MizuButton variant="primary" size="md">View Details</MizuButton>
                    <MizuButton variant="ghost" size="md">Dismiss</MizuButton>
                </MizuCardFooter>
            </MizuCard>
            </DemoTabs>
        </div>

        <div class="demo-section">
            <h3>Header Only</h3>
            <DemoTabs :code="headerOnlyCode">
            <MizuCard>
                <MizuCardHeader>
                    <MizuCardTitle>Simple Card</MizuCardTitle>
                    <MizuCardDescription>A card with only header content.</MizuCardDescription>
                </MizuCardHeader>
            </MizuCard>
            </DemoTabs>
        </div>

        <div class="demo-section">
            <h3>Content Only</h3>
            <DemoTabs :code="contentOnlyCode">
            <MizuCard>
                <MizuCardContent>
                    <p class="card-text">A card with only content, no header or footer.</p>
                </MizuCardContent>
            </MizuCard>
            </DemoTabs>
        </div>

        <div class="demo-section">
            <h3>With Action</h3>
            <DemoTabs :code="withActionCode">
            <MizuCard>
                <MizuCardHeader>
                    <MizuCardTitle>Featured Item</MizuCardTitle>
                    <MizuCardDescription>This card has an action button in the header.</MizuCardDescription>
                    <MizuCardAction>
                        <MizuButton variant="accent" size="md">Take Action</MizuButton>
                    </MizuCardAction>
                </MizuCardHeader>
                <MizuCardContent>
                    <p class="card-text">The action area is positioned in the top-right of the header.</p>
                </MizuCardContent>
            </MizuCard>
            </DemoTabs>
        </div>

        <div class="demo-section">
            <h3>With Image</h3>
            <DemoTabs :code="withImageCode">
            <MizuCard>
                <MizuCardImage src="https://placecats.com/800/400" alt="Cute kitten" />
                <MizuCardHeader>
                    <MizuCardTitle>Whiskers</MizuCardTitle>
                    <MizuCardDescription>A fluffy feline companion.</MizuCardDescription>
                </MizuCardHeader>
                <MizuCardContent>
                    <p class="card-text">Cats are independent, curious, and make wonderful pets. This card demonstrates an image at the top.</p>
                </MizuCardContent>
                <MizuCardFooter>
                    <MizuButton variant="accent" size="md">Adopt Me</MizuButton>
                </MizuCardFooter>
            </MizuCard>
            </DemoTabs>
        </div>

        <div class="demo-section">
            <h3>Compact Spacing</h3>
            <DemoTabs :code="compactCode">
            <MizuCard spacing="compact">
                <MizuCardHeader>
                    <MizuCardTitle>Compact Card</MizuCardTitle>
                    <MizuCardDescription>Uses the compact spacing variant.</MizuCardDescription>
                </MizuCardHeader>
                <MizuCardContent>
                    <p class="card-text">Tighter padding for dense layouts.</p>
                </MizuCardContent>
            </MizuCard>
            </DemoTabs>
        </div>

        <div class="demo-section">
            <h3>Comfortable Spacing</h3>
            <DemoTabs :code="comfortableCode">
            <MizuCard spacing="comfortable">
                <MizuCardHeader>
                    <MizuCardTitle>Spacious Card</MizuCardTitle>
                    <MizuCardDescription>Uses the comfortable spacing variant.</MizuCardDescription>
                </MizuCardHeader>
                <MizuCardContent>
                    <p class="card-text">More breathing room for content.</p>
                </MizuCardContent>
            </MizuCard>
            </DemoTabs>
        </div>
    </div>
</template>

<style scoped>
.card-demo {
    all: revert;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0;
    background: transparent;
}

/* Reset Starlight global styles inside demo */
.card-demo :deep(*) {
    margin: 0;
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
    font-size: 14px;
    font-weight: 600;
    color: var(--sl-color-text);
    margin: 0;
}

.card-text {
    font-size: var(--mizu-font-size-body);
    color: var(--mizu-color-foreground-primary);
    margin: 0;
}
</style>
