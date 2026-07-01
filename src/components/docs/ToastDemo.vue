<script setup lang="ts">
import { ref } from "vue";
import {
  MizuToastProvider,
  MizuButton,
  useToast,
} from "@mizu/vue";

type Position = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";

const position = ref<Position>("top-right");
</script>

<template>
  <MizuToastProvider :position="position">
    <div class="toast-demo">
      <div class="demo-section">
        <h3>Position</h3>
        <div class="button-row">
          <MizuButton
            v-for="pos in (['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as Position[])"
            :key="pos"
            :variant="position === pos ? 'accent' : 'outline'"
            size="md"
            class="w-max"
            @click="position = pos"
          >
            {{ pos }}
          </MizuButton>
        </div>
      </div>
      <ToastDemoInner />
    </div>
  </MizuToastProvider>
</template>

<script lang="ts">
import { defineComponent, h } from "vue";

const ToastDemoInner = defineComponent({
  setup() {
    const { addToast } = useToast();

    function showSuccess() {
      addToast({
        title: "Invoice saved",
        description: "Invoice #INV-2026-0042 has been saved successfully.",
        variant: "success",
      });
    }

    function showError() {
      addToast({
        title: "Payment failed",
        description: "Your payment could not be processed. Please try again.",
        variant: "error",
      });
    }

    function showWarning() {
      addToast({
        title: "Storage almost full",
        description: "You are using 85% of your allocated storage space.",
        variant: "warning",
      });
    }

    function showInfo() {
      addToast({
        title: "New update available",
        description: "Version 0.11.0 is ready to install.",
        variant: "info",
      });
    }

    function showWithAction() {
      addToast({
        title: "Changes discarded",
        description: "Your unsaved changes have been discarded.",
        variant: "warning",
        action: {
          label: "Undo",
          altText: "Undo discard changes",
          onClick: () => {
            addToast({
              title: "Changes restored",
              description: "Your changes have been restored successfully.",
              variant: "success",
            });
          },
        },
      });
    }

    function showLongDuration() {
      addToast({
        title: "Long toast",
        description: "This toast stays visible for 10 seconds.",
        duration: 10000,
        showTimer: true,
        variant: "info",
      });
    }

    function showTitleOnly() {
      addToast({
        title: "Changes saved successfully",
        variant: "success",
      });
    }

    function showDescriptionOnly() {
      addToast({
        description: "A new version is available. Refresh to update.",
        variant: "info",
      });
    }

    return () => h("div", { style: "display: contents;" }, [
      h("div", { class: "demo-section" }, [
        h("h3", "Variants"),
        h("div", { class: "button-row" }, [
          h(MizuButton, { variant: "success", size: "md", class: "w-max", onClick: showSuccess }, { default: () => "Success" }),
          h(MizuButton, { variant: "error", size: "md", class: "w-max", onClick: showError }, { default: () => "Error" }),
          h(MizuButton, { variant: "warning", size: "md", class: "w-max", onClick: showWarning }, { default: () => "Warning" }),
          h(MizuButton, { variant: "primary", size: "md", class: "w-max", onClick: showInfo }, { default: () => "Info" }),
        ]),
      ]),
      h("div", { class: "demo-section" }, [
        h("h3", "Content Variations"),
        h("div", { class: "button-row" }, [
          h(MizuButton, { variant: "outline", size: "md", class: "w-max", onClick: showTitleOnly }, { default: () => "Title Only" }),
          h(MizuButton, { variant: "outline", size: "md", class: "w-max", onClick: showDescriptionOnly }, { default: () => "Description Only" }),
        ]),
      ]),
      h("div", { class: "demo-section" }, [
        h("h3", "With Action"),
        h("div", { class: "button-row" }, [
          h(MizuButton, { variant: "accent", size: "md", class: "w-max", onClick: showWithAction }, { default: () => "Discard with Undo" }),
        ]),
      ]),
      h("div", { class: "demo-section" }, [
        h("h3", "Custom Duration"),
        h("div", { class: "button-row" }, [
          h(MizuButton, { variant: "ghost", size: "md", class: "w-max", onClick: showLongDuration }, { default: () => "10-second Toast" }),
        ]),
      ]),
    ]);
  },
});
</script>

<style>
.toast-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: var(--sl-color-gray-2);
  border-radius: 8px;
}

.toast-demo .demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toast-demo .demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin-bottom: 0;
}

.toast-demo .demo-section > div {
  margin-top: 0;
}

.toast-demo .button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
