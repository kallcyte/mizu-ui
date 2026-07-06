<script setup lang="ts">
import { computed, useAttrs, ref, onMounted, onUnmounted } from "vue";
import { CollapsibleContent } from "reka-ui";

export interface CollapsibleContentProps {
  forceMount?: boolean;
  asChild?: boolean;
  as?: string;
  /** Background color for the content panel. Accepts any valid CSS color value. */
  background?: string;
  /**
   * Height to maintain when collapsed (e.g. "100px", "50%").
   * Creates a "show more/less" pattern where content is partially visible.
   * Interactive elements within the collapsed area become inert for accessibility.
   */
  collapsedHeight?: string;
}

const props = withDefaults(defineProps<CollapsibleContentProps>(), {
  forceMount: undefined,
  asChild: undefined,
  as: undefined,
  background: "",
  collapsedHeight: undefined,
});

const attrs = useAttrs();

const contentRef = ref<HTMLElement | null>(null);
const isClosed = ref(false);

let observer: MutationObserver | null = null;

onMounted(() => {
  if (props.collapsedHeight && contentRef.value) {
    isClosed.value = contentRef.value.dataset.state === "closed";
    observer = new MutationObserver(() => {
      isClosed.value = contentRef.value?.dataset.state === "closed";
    });
    observer.observe(contentRef.value, { attributes: true, attributeFilter: ["data-state"] });
  }
});

onUnmounted(() => {
  observer?.disconnect();
});

const shouldForceMount = computed(() => {
  // When collapsedHeight is set, the content must stay in the DOM
  // so it remains visible at the collapsed size.
  return props.collapsedHeight ? true : (props.forceMount ?? undefined);
});

const contentClasses = computed(() => {
  const classes = ["mizu-collapsible__content"];
  if (props.collapsedHeight) classes.push("mizu-collapsible__content--partial");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const contentStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.background) style.background = props.background;
  if (props.collapsedHeight) style["--collapsed-height"] = props.collapsedHeight;
  return Object.keys(style).length > 0 ? style : undefined;
});
</script>

<template>
  <CollapsibleContent
    ref="contentRef"
    :class="contentClasses"
    :style="contentStyle"
    :force-mount="shouldForceMount"
    :as-child="asChild"
    :as="as"
    :inert="collapsedHeight && isClosed ? true : undefined"
  >
    <div class="mizu-collapsible__content-inner">
      <slot />
    </div>
  </CollapsibleContent>
</template>

<style>
.mizu-collapsible__content {
  all: revert;
  overflow: hidden;
  font-family: inherit;
  width: 100%;
  margin-top: 8px;
}

.mizu-collapsible__content[data-state="closed"] {
  animation: collapsibleSlideUp 200ms ease-out both;
}

.mizu-collapsible__content[data-state="open"] {
  animation: collapsibleSlideDown 200ms ease-out both;
}

/* Partial collapse: only animate height, no opacity fade */
.mizu-collapsible__content--partial[data-state="closed"] {
  animation: collapsibleSlideUpPartial 200ms ease-out both;
}

.mizu-collapsible__content--partial[data-state="open"] {
  animation: collapsibleSlideDownPartial 200ms ease-out both;
}

.mizu-collapsible__content-inner {
  padding: 16px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-foreground-secondary);
}

@keyframes collapsibleSlideDown {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }
}

@keyframes collapsibleSlideUp {
  from {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}

/* Partial collapse keyframes — no opacity transition */
@keyframes collapsibleSlideDownPartial {
  from {
    height: var(--collapsed-height);
  }
  to {
    height: var(--reka-collapsible-content-height);
  }
}

@keyframes collapsibleSlideUpPartial {
  from {
    height: var(--reka-collapsible-content-height);
  }
  to {
    height: var(--collapsed-height);
  }
}
</style>
