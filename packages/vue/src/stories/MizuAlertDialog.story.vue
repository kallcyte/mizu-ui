<script setup lang="ts">
import MizuAlertDialogRoot from "../components/MizuAlertDialogRoot.vue";
import MizuAlertDialogTrigger from "../components/MizuAlertDialogTrigger.vue";
import MizuAlertDialogPortal from "../components/MizuAlertDialogPortal.vue";
import MizuAlertDialogOverlay from "../components/MizuAlertDialogOverlay.vue";
import MizuAlertDialogContent from "../components/MizuAlertDialogContent.vue";
import MizuAlertDialogTitle from "../components/MizuAlertDialogTitle.vue";
import MizuAlertDialogDescription from "../components/MizuAlertDialogDescription.vue";
import MizuAlertDialogAction from "../components/MizuAlertDialogAction.vue";
import MizuAlertDialogCancel from "../components/MizuAlertDialogCancel.vue";
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <Story title="MizuAlertDialog" :layout="{ type: 'single', width: 800 }">
    <Variant title="Composition">
      <MizuAlertDialogRoot v-model:open="open">
        <MizuAlertDialogTrigger>
          <button class="px-4 py-2 rounded-md bg-brand-primary text-white text-sm font-medium cursor-pointer">
            Delete Account
          </button>
        </MizuAlertDialogTrigger>
        <MizuAlertDialogPortal>
          <MizuAlertDialogOverlay />
          <MizuAlertDialogContent>
            <MizuAlertDialogTitle>Are you sure?</MizuAlertDialogTitle>
            <MizuAlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </MizuAlertDialogDescription>
            <div class="flex justify-end gap-3 mt-4">
              <MizuAlertDialogCancel>
                <button class="px-4 py-2 rounded-md border border-surface-muted text-sm font-medium cursor-pointer">
                  Cancel
                </button>
              </MizuAlertDialogCancel>
              <MizuAlertDialogAction>
                <button class="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium cursor-pointer">
                  Delete
                </button>
              </MizuAlertDialogAction>
            </div>
          </MizuAlertDialogContent>
        </MizuAlertDialogPortal>
      </MizuAlertDialogRoot>
    </Variant>

    <Variant title="Sizes">
      <div class="flex flex-col gap-4">
        <MizuAlertDialogRoot default-open>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent size="sm">
              <MizuAlertDialogTitle>Small Dialog</MizuAlertDialogTitle>
              <MizuAlertDialogDescription>max-width: 400px</MizuAlertDialogDescription>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
        <MizuAlertDialogRoot default-open>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent size="md">
              <MizuAlertDialogTitle>Medium Dialog</MizuAlertDialogTitle>
              <MizuAlertDialogDescription>max-width: 500px</MizuAlertDialogDescription>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
        <MizuAlertDialogRoot default-open>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent size="lg">
              <MizuAlertDialogTitle>Large Dialog</MizuAlertDialogTitle>
              <MizuAlertDialogDescription>max-width: 700px</MizuAlertDialogDescription>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
        <MizuAlertDialogRoot default-open>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent size="xl">
              <MizuAlertDialogTitle>Extra Large Dialog</MizuAlertDialogTitle>
              <MizuAlertDialogDescription>max-width: 900px</MizuAlertDialogDescription>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
      </div>
    </Variant>

    <Variant title="States">
      <div class="flex flex-col gap-4">
        <MizuAlertDialogRoot default-open>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent fullscreen>
              <MizuAlertDialogTitle>Fullscreen Dialog</MizuAlertDialogTitle>
              <MizuAlertDialogDescription>No border, no shadow, covers the viewport.</MizuAlertDialogDescription>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
        <MizuAlertDialogRoot default-open>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent scrollable>
              <MizuAlertDialogTitle>Scrollable Dialog</MizuAlertDialogTitle>
              <MizuAlertDialogDescription>Content area is scrollable when content overflows.</MizuAlertDialogDescription>
              <div class="h-[200px] mt-3 flex items-center justify-center border border-dashed border-surface-muted rounded text-sm text-foreground-secondary">
                Tall content area
              </div>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
        <MizuAlertDialogRoot default-open>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent :dismissible="false">
              <MizuAlertDialogTitle>Not Dismissible</MizuAlertDialogTitle>
              <MizuAlertDialogDescription>Cannot close by clicking outside or pressing Escape.</MizuAlertDialogDescription>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
        <MizuAlertDialogRoot default-open>
          <MizuAlertDialogPortal>
            <MizuAlertDialogOverlay />
            <MizuAlertDialogContent :transition="false">
              <MizuAlertDialogTitle>No Transition</MizuAlertDialogTitle>
              <MizuAlertDialogDescription>Enter/leave animations disabled.</MizuAlertDialogDescription>
            </MizuAlertDialogContent>
          </MizuAlertDialogPortal>
        </MizuAlertDialogRoot>
      </div>
    </Variant>
  </Story>
</template>
