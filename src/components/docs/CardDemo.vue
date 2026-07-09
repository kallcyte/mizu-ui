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
import CodeCollapsible from "./CodeCollapsible.vue";

const compositionCode = `<MizuCard>
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
</MizuCard>`;

const headerOnlyCode = `<MizuCard>
  <MizuCardHeader>
    <MizuCardTitle>Simple Card</MizuCardTitle>
    <MizuCardDescription>A card with only header content.</MizuCardDescription>
  </MizuCardHeader>
</MizuCard>`;

const contentOnlyCode = `<MizuCard>
  <MizuCardContent>
    <p class="card-text">A card with only content, no header or footer.</p>
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
    <p class="card-text">The action area is positioned in the top-right of the header.</p>
  </MizuCardContent>
</MizuCard>`;

const withImageCode = `<MizuCard>
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
</MizuCard>`;

const compactCode = `<MizuCard spacing="compact">
  <MizuCardHeader>
    <MizuCardTitle>Compact Card</MizuCardTitle>
    <MizuCardDescription>Uses the compact spacing variant.</MizuCardDescription>
  </MizuCardHeader>
  <MizuCardContent>
    <p class="card-text">Tighter padding for dense layouts.</p>
  </MizuCardContent>
</MizuCard>`;

const comfortableCode = `<MizuCard spacing="comfortable">
  <MizuCardHeader>
    <MizuCardTitle>Spacious Card</MizuCardTitle>
    <MizuCardDescription>Uses the comfortable spacing variant.</MizuCardDescription>
  </MizuCardHeader>
  <MizuCardContent>
    <p class="card-text">More breathing room for content.</p>
  </MizuCardContent>
</MizuCard>`;
</script>

<template>
  <div class="card-examples">
    <section class="example-section">
      <h3>Composition</h3>
      <CodeCollapsible :code="compositionCode">
        <MizuCard>
          <MizuCardHeader>
            <MizuCardTitle>Project Status</MizuCardTitle>
            <MizuCardDescription>Current progress and status of the project.</MizuCardDescription>
            <MizuCardAction>
              <MizuTag variant="success">Active</MizuTag>
            </MizuCardAction>
          </MizuCardHeader>
          <MizuCardContent>
            <p class="card-text">
              This card demonstrates the full composition pattern with header, content, and footer
              sections.
            </p>
          </MizuCardContent>
          <MizuCardFooter>
            <MizuButton variant="primary" size="md">View Details</MizuButton>
            <MizuButton variant="ghost" size="md">Dismiss</MizuButton>
          </MizuCardFooter>
        </MizuCard>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Header Only</h3>
      <CodeCollapsible :code="headerOnlyCode">
        <MizuCard>
          <MizuCardHeader>
            <MizuCardTitle>Simple Card</MizuCardTitle>
            <MizuCardDescription>A card with only header content.</MizuCardDescription>
          </MizuCardHeader>
        </MizuCard>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Content Only</h3>
      <CodeCollapsible :code="contentOnlyCode">
        <MizuCard>
          <MizuCardContent>
            <p class="card-text">A card with only content, no header or footer.</p>
          </MizuCardContent>
        </MizuCard>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Action</h3>
      <CodeCollapsible :code="withActionCode">
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
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Image</h3>
      <CodeCollapsible :code="withImageCode">
        <MizuCard>
          <MizuCardImage src="https://placecats.com/800/400" alt="Cute kitten" />
          <MizuCardHeader>
            <MizuCardTitle>Whiskers</MizuCardTitle>
            <MizuCardDescription>A fluffy feline companion.</MizuCardDescription>
          </MizuCardHeader>
          <MizuCardContent>
            <p class="card-text">
              Cats are independent, curious, and make wonderful pets. This card demonstrates an
              image at the top.
            </p>
          </MizuCardContent>
          <MizuCardFooter>
            <MizuButton variant="accent" size="md">Adopt Me</MizuButton>
          </MizuCardFooter>
        </MizuCard>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Compact Spacing</h3>
      <CodeCollapsible :code="compactCode">
        <MizuCard spacing="compact">
          <MizuCardHeader>
            <MizuCardTitle>Compact Card</MizuCardTitle>
            <MizuCardDescription>Uses the compact spacing variant.</MizuCardDescription>
          </MizuCardHeader>
          <MizuCardContent>
            <p class="card-text">Tighter padding for dense layouts.</p>
          </MizuCardContent>
        </MizuCard>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Comfortable Spacing</h3>
      <CodeCollapsible :code="comfortableCode">
        <MizuCard spacing="comfortable">
          <MizuCardHeader>
            <MizuCardTitle>Spacious Card</MizuCardTitle>
            <MizuCardDescription>Uses the comfortable spacing variant.</MizuCardDescription>
          </MizuCardHeader>
          <MizuCardContent>
            <p class="card-text">More breathing room for content.</p>
          </MizuCardContent>
        </MizuCard>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.card-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.card-examples :deep(*) {
  margin: 0;
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

.card-text {
  font-size: var(--mizu-font-size-body);
  color: var(--mizu-color-foreground-primary);
  margin: 0;
}
</style>
