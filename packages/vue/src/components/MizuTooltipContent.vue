<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { TooltipPortal, TooltipContent, TooltipArrow } from "reka-ui";

export interface TooltipContentProps {
  variant?: "light" | "dark";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | Element[] | null;
  collisionPadding?: number;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
  arrowPadding?: number;
  showArrow?: boolean;
}

const props = withDefaults(defineProps<TooltipContentProps>(), {
  variant: "light",
  side: "top",
  sideOffset: 2,
  align: "center",
  alignOffset: 0,
  avoidCollisions: true,
  collisionBoundary: null,
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: false,
  arrowPadding: 0,
  showArrow: true,
});

const attrs = useAttrs();

const contentClasses = computed(() => {
  const classes = ["bp-tooltip__content", `bp-tooltip__content--${props.side}`, `bp-tooltip__content--${props.variant}`];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const contentStyle = computed(() => {
  return attrs.style as string | Record<string, string> | undefined;
});
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      :class="contentClasses"
      :style="contentStyle"
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
      :collision-boundary="collisionBoundary"
      :collision-padding="collisionPadding"
      :sticky="sticky"
      :hide-when-detached="hideWhenDetached"
      :arrow-padding="arrowPadding"
    >
      <slot />
      <TooltipArrow v-if="showArrow" class="bp-tooltip__arrow" :width="10" :height="5" />
    </TooltipContent>
  </TooltipPortal>
</template>

<style>
.bp-tooltip__content--light {
  --tooltip-bg: #fff;
  --tooltip-color: #1b1b1d;
  --tooltip-arrow-fill: #fff;
  --tooltip-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.12), 0 2px 4px -2px rgba(0, 0, 0, 0.08);
}

.bp-tooltip__content--dark {
  --tooltip-bg: #1b1b1d;
  --tooltip-color: #f1f5f9;
  --tooltip-arrow-fill: #1b1b1d;
  --tooltip-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.bp-tooltip__content {
  all: revert;
  z-index: 50;
  border-radius: 6px;
  padding: 6px 10px;
  margin-top: 0;
  font-size: 12px;
  font-family: inherit;
  width: max-content;
  text-align: left;
  background-color: var(--tooltip-bg);
  color: var(--tooltip-color);
  box-shadow: var(--tooltip-shadow);
  line-height: 1.4;
  transform-origin: var(--reka-tooltip-content-transform-origin);
}

.bp-tooltip__content * {
  margin: 0;
}

.bp-tooltip__arrow {
  fill: var(--tooltip-arrow-fill);
}

/* Open animations - applied via data-state */
.bp-tooltip__content[data-state="delayed-open"],
.bp-tooltip__content[data-state="instant-open"] {
  animation: tooltipSlideIn 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.bp-tooltip__content[data-side="top"][data-state="delayed-open"],
.bp-tooltip__content[data-side="top"][data-state="instant-open"] {
  animation-name: tooltipSlideInFromTop;
}

.bp-tooltip__content[data-side="bottom"][data-state="delayed-open"],
.bp-tooltip__content[data-side="bottom"][data-state="instant-open"] {
  animation-name: tooltipSlideInFromBottom;
}

.bp-tooltip__content[data-side="left"][data-state="delayed-open"],
.bp-tooltip__content[data-side="left"][data-state="instant-open"] {
  animation-name: tooltipSlideInFromLeft;
}

.bp-tooltip__content[data-side="right"][data-state="delayed-open"],
.bp-tooltip__content[data-side="right"][data-state="instant-open"] {
  animation-name: tooltipSlideInFromRight;
}

@keyframes tooltipSlideInFromTop {
  from {
    opacity: 0;
    translate: 0 -6px;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes tooltipSlideInFromBottom {
  from {
    opacity: 0;
    translate: 0 6px;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes tooltipSlideInFromLeft {
  from {
    opacity: 0;
    translate: -6px;
  }
  to {
    opacity: 1;
    translate: 0;
  }
}

@keyframes tooltipSlideInFromRight {
  from {
    opacity: 0;
    translate: 6px;
  }
  to {
    opacity: 1;
    translate: 0;
  }
}
</style>
