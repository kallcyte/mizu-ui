<script setup lang="ts">
import { computed, useAttrs, type Component } from "vue";
import { DialogRoot, DialogTrigger } from "reka-ui";
import MizuDialogPortal from "./MizuDialogPortal.vue";
import MizuDialogOverlay from "./MizuDialogOverlay.vue";
import MizuDialogContent from "./MizuDialogContent.vue";
import MizuDialogClose from "./MizuDialogClose.vue";
import MizuDialogTitle from "./MizuDialogTitle.vue";
import MizuDialogDescription from "./MizuDialogDescription.vue";
import MizuDialogHeader from "./MizuDialogHeader.vue";
import MizuDialogBody from "./MizuDialogBody.vue";
import MizuDialogFooter from "./MizuDialogFooter.vue";

export interface DialogProps {
  /** Controlled open state — use with v-model:open */
  open?: boolean;
  /** Initial open state for uncontrolled usage */
  defaultOpen?: boolean;
  /** When true, blocks interaction outside the dialog */
  modal?: boolean;
  /** Dialog title text — enables shorthand mode */
  title?: string;
  /** Dialog description text — shown below the title in shorthand mode */
  description?: string;
  /** Show overlay backdrop. Defaults to true. */
  overlay?: boolean;
  /** Show close button. true = default X icon, false = hidden. Defaults to true. */
  close?: boolean;
  /** Custom icon component for the close button */
  closeIcon?: Component;
  /** Slot-level CSS class overrides. Keys match slot names: overlay, content, header, body, footer, title, description, close. */
  ui?: {
    overlay?: string;
    content?: string;
    header?: string;
    body?: string;
    footer?: string;
    title?: string;
    description?: string;
    close?: string;
  };
  /** Keep dialog DOM mounted when closed. Defaults to true (unmounts on hide). */
  unmountOnHide?: boolean;
  /** Dialog takes full viewport in shorthand mode */
  fullscreen?: boolean;
  /** When false, prevents close on click-outside / Escape */
  dismissible?: boolean;
  /** Content scrolls within the overlay */
  scrollable?: boolean;
  /** Enable/disable enter/leave animations */
  transition?: boolean;
  /** Dialog width size */
  size?: "sm" | "md" | "lg" | "xl";
}

const props = withDefaults(defineProps<DialogProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
  title: undefined,
  description: undefined,
  overlay: true,
  close: true,
  closeIcon: undefined,
  ui: undefined,
  unmountOnHide: true,
  fullscreen: false,
  dismissible: true,
  scrollable: false,
  transition: true,
  size: "md",
});

const emit = defineEmits<{
  "update:open": [value: boolean];
  /** Fires when user attempts to close a non-dismissible dialog */
  "close:prevent": [];
}>();

const attrs = useAttrs();

const slots = defineSlots<{
  default?: (props: { open?: boolean }) => unknown;
  trigger?: (props: { open?: boolean }) => unknown;
  content?: (props: { close: () => void }) => unknown;
  header?: (props: { close: () => void }) => unknown;
  body?: (props: { close: () => void }) => unknown;
  footer?: (props: { close: () => void }) => unknown;
  title?: () => unknown;
  description?: () => unknown;
  close?: (props: { ui: { close: string } }) => unknown;
}>();

const rootClasses = computed(() => {
  const classes = ["mizu-dialog"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

// Shorthand mode active when title, description, or content slots are used
const isShorthand = computed(() =>
  !!(props.title || props.description || slots.content || slots.header || slots.body || slots.footer),
);

const hasHeader = computed(() =>
  !!(props.title || props.description || slots.title || slots.description),
);

function close() {
  emit("update:open", false);
}

function handleEscapeKeyDown(e: KeyboardEvent) {
  if (!props.dismissible) {
    e.preventDefault();
    emit("close:prevent");
  }
}

function handlePointerDownOutside(e: unknown) {
  if (!props.dismissible) {
    (e as Event).preventDefault();
    emit("close:prevent");
  }
}
</script>

<template>
  <DialogRoot
    :class="rootClasses"
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    @update:open="(value) => emit('update:open', value)"
  >
    <!-- Compound mode: full slot passthrough (backward compatible) -->
    <slot v-if="!isShorthand" />

    <!-- Shorthand mode: internal structure rendering -->
    <template v-else>
      <DialogTrigger as-child>
        <slot :open="open" />
      </DialogTrigger>

      <MizuDialogPortal :force-mount="!unmountOnHide">
        <MizuDialogOverlay
          v-if="overlay"
          :transition="transition"
          :force-mount="!unmountOnHide"
          :class="ui?.overlay"
        />

        <MizuDialogContent
          :fullscreen="fullscreen"
          :dismissible="dismissible"
          :scrollable="scrollable"
          :transition="transition"
          :size="size"
          :force-mount="!unmountOnHide"
          :class="ui?.content"
          @escape-key-down="handleEscapeKeyDown"
          @pointer-down-outside="handlePointerDownOutside"
        >
          <!-- Close button -->
          <slot name="close" :ui="{ close: 'mizu-dialog__close' }">
            <MizuDialogClose
              v-if="close !== false"
              :close-icon="closeIcon"
              :class="ui?.close"
            />
          </slot>

          <!-- Full content override -->
          <slot name="content" :close="close" />

          <!-- Default layout: header + body + footer -->
          <template v-if="!slots.content">
            <MizuDialogHeader v-if="hasHeader" :class="ui?.header">
              <slot name="title">
                <MizuDialogTitle v-if="title" :class="ui?.title">{{ title }}</MizuDialogTitle>
              </slot>
              <slot name="description">
                <MizuDialogDescription v-if="description" :class="ui?.description">{{ description }}</MizuDialogDescription>
              </slot>
            </MizuDialogHeader>

            <MizuDialogBody :class="ui?.body">
              <slot name="body" :close="close" />
            </MizuDialogBody>

            <MizuDialogFooter v-if="slots.footer" :class="ui?.footer">
              <slot name="footer" :close="close" />
            </MizuDialogFooter>
          </template>
        </MizuDialogContent>
      </MizuDialogPortal>
    </template>
  </DialogRoot>
</template>
