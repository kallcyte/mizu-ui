<script setup lang="ts">
import { ref } from "vue";
import {
  MizuDialogRoot, MizuDialogPortal, MizuDialogOverlay, MizuDialogContent,
  MizuDialogHeader, MizuDialogBody, MizuDialogFooter, MizuDialogTitle,
  MizuDialogDescription, MizuDialogClose, MizuDialogTrigger, MizuButton,
} from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const sizesCode = `<MizuDialogRoot v-model:open="open">
  <MizuDialogTrigger as-child>
    <MizuButton variant="outline" size="md">Small (400px)</MizuButton>
  </MizuDialogTrigger>
  <MizuDialogPortal>
    <MizuDialogOverlay />
    <MizuDialogContent size="sm">
      <MizuDialogClose />
      <MizuDialogHeader>
        <MizuDialogTitle>Small Dialog</MizuDialogTitle>
      </MizuDialogHeader>
      <MizuDialogBody>
        <p>size="sm" (400px max-width).</p>
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuButton variant="primary" size="md" @click="open = false">Close</MizuButton>
      </MizuDialogFooter>
    </MizuDialogContent>
  </MizuDialogPortal>
</MizuDialogRoot>

<MizuDialogRoot v-model:open="open">
  <MizuDialogTrigger as-child>
    <MizuButton variant="outline" size="md">Large (700px)</MizuButton>
  </MizuDialogTrigger>
  <MizuDialogPortal>
    <MizuDialogOverlay />
    <MizuDialogContent size="lg">
      <MizuDialogClose />
      <MizuDialogHeader>
        <MizuDialogTitle>Large Dialog</MizuDialogTitle>
      </MizuDialogHeader>
      <MizuDialogBody>
        <p>size="lg" (700px max-width).</p>
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuButton variant="primary" size="md" @click="open = false">Close</MizuButton>
      </MizuDialogFooter>
    </MizuDialogContent>
  </MizuDialogPortal>
</MizuDialogRoot>`;

const fullscreenCode = `<MizuDialogRoot v-model:open="open">
  <MizuDialogTrigger as-child>
    <MizuButton variant="accent" size="md">Open Fullscreen</MizuButton>
  </MizuDialogTrigger>
  <MizuDialogPortal>
    <MizuDialogOverlay />
    <MizuDialogContent fullscreen>
      <MizuDialogHeader>
        <MizuDialogTitle>Fullscreen Dialog</MizuDialogTitle>
        <MizuDialogDescription>Fills the entire viewport.</MizuDialogDescription>
      </MizuDialogHeader>
      <MizuDialogBody>
        <p>Uses fullscreen prop.</p>
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuButton variant="ghost" size="md" @click="open = false">Cancel</MizuButton>
        <MizuButton variant="primary" size="md" @click="open = false">Save</MizuButton>
      </MizuDialogFooter>
    </MizuDialogContent>
  </MizuDialogPortal>
</MizuDialogRoot>`;

const nonDismissibleCode = `<MizuDialogRoot v-model:open="open">
  <MizuDialogTrigger as-child>
    <MizuButton variant="warning" size="md">Must Use Buttons</MizuButton>
  </MizuDialogTrigger>
  <MizuDialogPortal>
    <MizuDialogOverlay />
    <MizuDialogContent :dismissible="false">
      <MizuDialogHeader>
        <MizuDialogTitle>Terms of Service</MizuDialogTitle>
        <MizuDialogDescription>Click-outside and Escape disabled.</MizuDialogDescription>
      </MizuDialogHeader>
      <MizuDialogBody>
        <p>:dismissible="false". No close button, no escape.</p>
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuButton variant="ghost" size="md" @click="open = false">Decline</MizuButton>
        <MizuButton variant="primary" size="md" @click="open = false">Accept</MizuButton>
      </MizuDialogFooter>
    </MizuDialogContent>
  </MizuDialogPortal>
</MizuDialogRoot>`;

const noTransitionCode = `<MizuDialogRoot v-model:open="open">
  <MizuDialogTrigger as-child>
    <MizuButton variant="outline" size="md">Instant Open</MizuButton>
  </MizuDialogTrigger>
  <MizuDialogPortal>
    <MizuDialogOverlay :transition="false" />
    <MizuDialogContent :transition="false">
      <MizuDialogClose />
      <MizuDialogHeader>
        <MizuDialogTitle>Instant Dialog</MizuDialogTitle>
      </MizuDialogHeader>
      <MizuDialogBody>
        <p>No animations — :transition="false".</p>
      </MizuDialogBody>
      <MizuDialogFooter>
        <MizuButton variant="primary" size="md" @click="open = false">Close</MizuButton>
      </MizuDialogFooter>
    </MizuDialogContent>
  </MizuDialogPortal>
</MizuDialogRoot>`;

const fullscreenOpen = ref(false);
const nonDismissibleOpen = ref(false);
const sizeSmOpen = ref(false);
const sizeLgOpen = ref(false);
const noTransitionOpen = ref(false);
</script>

<template>
  <div class="dialog-new-examples">
    <section class="example-section">
      <h3>Size Variants</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="button-row">
          <MizuDialogRoot v-model:open="sizeSmOpen">
            <MizuDialogTrigger as-child><MizuButton variant="outline" size="md" class="w-max">Small (400px)</MizuButton></MizuDialogTrigger>
            <MizuDialogPortal>
              <MizuDialogOverlay />
              <MizuDialogContent size="sm">
                <MizuDialogClose />
                <MizuDialogHeader><MizuDialogTitle>Small Dialog</MizuDialogTitle></MizuDialogHeader>
                <MizuDialogBody><p class="body-text"><code>size="sm"</code> (400px max-width).</p></MizuDialogBody>
                <MizuDialogFooter><MizuButton variant="primary" size="md" class="w-max" @click="sizeSmOpen = false">Close</MizuButton></MizuDialogFooter>
              </MizuDialogContent>
            </MizuDialogPortal>
          </MizuDialogRoot>
          <MizuDialogRoot v-model:open="sizeLgOpen">
            <MizuDialogTrigger as-child><MizuButton variant="outline" size="md" class="w-max">Large (700px)</MizuButton></MizuDialogTrigger>
            <MizuDialogPortal>
              <MizuDialogOverlay />
              <MizuDialogContent size="lg">
                <MizuDialogClose />
                <MizuDialogHeader><MizuDialogTitle>Large Dialog</MizuDialogTitle></MizuDialogHeader>
                <MizuDialogBody><p class="body-text"><code>size="lg"</code> (700px max-width).</p></MizuDialogBody>
                <MizuDialogFooter><MizuButton variant="primary" size="md" class="w-max" @click="sizeLgOpen = false">Close</MizuButton></MizuDialogFooter>
              </MizuDialogContent>
            </MizuDialogPortal>
          </MizuDialogRoot>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Fullscreen</h3>
      <CodeCollapsible :code="fullscreenCode">
        <MizuDialogRoot v-model:open="fullscreenOpen">
          <MizuDialogTrigger as-child><MizuButton variant="accent" size="md" class="w-max">Open Fullscreen</MizuButton></MizuDialogTrigger>
          <MizuDialogPortal>
            <MizuDialogOverlay />
            <MizuDialogContent fullscreen>
              <MizuDialogHeader>
                <MizuDialogTitle>Fullscreen Dialog</MizuDialogTitle>
                <MizuDialogDescription>Fills the entire viewport.</MizuDialogDescription>
              </MizuDialogHeader>
              <MizuDialogBody><p class="body-text">Uses <code>fullscreen</code> prop.</p></MizuDialogBody>
              <MizuDialogFooter>
                <MizuButton variant="ghost" size="md" class="w-max" @click="fullscreenOpen = false">Cancel</MizuButton>
                <MizuButton variant="primary" size="md" class="w-max" @click="fullscreenOpen = false">Save</MizuButton>
              </MizuDialogFooter>
            </MizuDialogContent>
          </MizuDialogPortal>
        </MizuDialogRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Non-Dismissible</h3>
      <CodeCollapsible :code="nonDismissibleCode">
        <MizuDialogRoot v-model:open="nonDismissibleOpen">
          <MizuDialogTrigger as-child><MizuButton variant="warning" size="md" class="w-max">Must Use Buttons</MizuButton></MizuDialogTrigger>
          <MizuDialogPortal>
            <MizuDialogOverlay />
            <MizuDialogContent :dismissible="false">
              <MizuDialogHeader>
                <MizuDialogTitle>Terms of Service</MizuDialogTitle>
                <MizuDialogDescription>Click-outside and Escape disabled.</MizuDialogDescription>
              </MizuDialogHeader>
              <MizuDialogBody><p class="body-text"><code>:dismissible="false"</code>. No close button, no escape.</p></MizuDialogBody>
              <MizuDialogFooter>
                <MizuButton variant="ghost" size="md" class="w-max" @click="nonDismissibleOpen = false">Decline</MizuButton>
                <MizuButton variant="primary" size="md" class="w-max" @click="nonDismissibleOpen = false">Accept</MizuButton>
              </MizuDialogFooter>
            </MizuDialogContent>
          </MizuDialogPortal>
        </MizuDialogRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>No Transition</h3>
      <CodeCollapsible :code="noTransitionCode">
        <MizuDialogRoot v-model:open="noTransitionOpen">
          <MizuDialogTrigger as-child><MizuButton variant="outline" size="md" class="w-max">Instant Open</MizuButton></MizuDialogTrigger>
          <MizuDialogPortal>
            <MizuDialogOverlay :transition="false" />
            <MizuDialogContent :transition="false">
              <MizuDialogClose />
              <MizuDialogHeader><MizuDialogTitle>Instant Dialog</MizuDialogTitle></MizuDialogHeader>
              <MizuDialogBody><p class="body-text">No animations — <code>:transition="false"</code>.</p></MizuDialogBody>
              <MizuDialogFooter><MizuButton variant="primary" size="md" class="w-max" @click="noTransitionOpen = false">Close</MizuButton></MizuDialogFooter>
            </MizuDialogContent>
          </MizuDialogPortal>
        </MizuDialogRoot>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.dialog-new-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.dialog-new-examples :deep(*) { margin: 0; }
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

.button-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; }
.body-text { font-size: 14px; color: var(--color-foreground-secondary); margin: 0; }
</style>
