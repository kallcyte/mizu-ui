<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
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

const contentRef = ref<{ $el?: HTMLElement } | null>(null);
const isClosed = ref(false);

let observer: MutationObserver | null = null;

function getEl(): HTMLElement | null {
  // Reka UI renders CollapsibleContent as a single root element. When the
  // ref is bound to the component, Vue gives us the component instance,
  // and the underlying DOM element is exposed via the standard `$el` property.
  const instance = contentRef.value as unknown as { $el?: HTMLElement } | null;
  return instance?.$el ?? null;
}

onMounted(() => {
  if (!props.collapsedHeight) return;
  const el = getEl();
  if (!el) return;
  isClosed.value = el.dataset.state === "closed";
  observer = new MutationObserver(() => {
    const current = getEl();
    if (current) isClosed.value = current.dataset.state === "closed";
  });
  observer.observe(el, { attributes: true, attributeFilter: ["data-state"] });
});

onUnmounted(() => {
  observer?.disconnect();
});

const shouldForceMount = computed(() => {
  // When collapsedHeight is set, the content must stay in the DOM
  // so it remains visible at the collapsed size.
  if (props.collapsedHeight) return true;
  // Force-mount by default to prevent SSR/hydration mismatches.
  // Reka UI's unmountOnHide + Presence can cause DOM diff between
  // server and client, breaking context injection during hydration.
  return props.forceMount ?? true;
});

const contentClasses = computed(() => {
  const classes = ["mizu-collapsible__content"];
  if (props.collapsedHeight) classes.push("mizu-collapsible__content--partial");
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
