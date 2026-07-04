<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface KbdProps {
  /** Key or keys to display */
  keys?: string | string[];
  /** Size */
  size?: "sm" | "md";
}

const props = withDefaults(defineProps<KbdProps>(), {
  keys: undefined,
  size: "md",
});

const attrs = useAttrs();

const keysArray = computed(() => {
  if (!props.keys) return [];
  return Array.isArray(props.keys) ? props.keys : [props.keys];
});

const kbdClasses = computed(() => {
  const classes = ["mizu-kbd", `mizu-kbd--${props.size}`];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <kbd :class="kbdClasses">
    <template v-for="(key, index) in keysArray" :key="index">
      <span v-if="index > 0" class="mizu-kbd__separator">+</span>
      <span class="mizu-kbd__key">{{ key }}</span>
    </template>
  </kbd>
</template>

<style>
@reference "../index.css";

.mizu-kbd {
  @apply inline-flex items-center gap-[2px] font-mono select-none;
  background-color: var(--color-surface-muted);
  color: var(--color-foreground-primary);
  border: 1px solid var(--color-surface-base);
  border-bottom-width: 2px;
}

.mizu-kbd--sm {
  height: 20px;
  padding: 0 4px;
  font-size: 11px;
  border-radius: 4px;
}

.mizu-kbd--md {
  height: 24px;
  padding: 0 6px;
  font-size: 12px;
  border-radius: 4px;
}

.mizu-kbd__key {
  @apply inline-flex items-center justify-center font-medium;
}

.mizu-kbd__separator {
  @apply text-[var(--color-foreground-tertiary)] mx-[2px] font-normal;
}
</style>
