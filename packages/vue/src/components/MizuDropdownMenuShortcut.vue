<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface DropdownMenuShortcutProps {
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<DropdownMenuShortcutProps>(), {
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const shortcutClasses = computed(() => {
  const classes = ["mizu-dropdown-menu__shortcut"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <span :class="shortcutClasses">
    <slot />
  </span>
</template>

<style>
.mizu-dropdown-menu__shortcut {
  all: revert;
  display: flex;
  margin-left: auto;
  gap: 4px;
  font-size: 12px;
  font-family: inherit;
  letter-spacing: 0.05em;
  color: var(--color-foreground-muted);
  pointer-events: none;
  margin-top: 0;
}
</style>
