<script setup lang="ts">
import { computed, useAttrs } from "vue";
import MizuAvatar from "./MizuAvatar.vue";

export interface AvatarGroupItem {
  src?: string;
  alt?: string;
  fallback?: string;
}

export interface AvatarGroupProps {
  /** Array of avatar items */
  items?: AvatarGroupItem[];
  /** Max visible before +N overflow indicator */
  max?: number;
  /** Avatar size */
  size?: "sm" | "md" | "lg" | "xl";
}

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  items: () => [],
  max: 5,
  size: "md",
});

const attrs = useAttrs();

const visibleItems = computed(() => props.items.slice(0, props.max));
const overflowCount = computed(() => Math.max(0, props.items.length - props.max));

const groupClasses = computed(() => {
  const classes = ["mizu-avatar-group", `mizu-avatar-group--${props.size}`];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <div :class="groupClasses" role="group">
    <MizuAvatar
      v-for="(item, index) in visibleItems"
      :key="index"
      :src="item.src"
      :alt="item.alt"
      :name="item.fallback"
      :size="size"
      class="mizu-avatar-group__avatar"
    />
    <span v-if="overflowCount > 0" class="mizu-avatar-group__overflow">
      +{{ overflowCount }}
    </span>
  </div>
</template>

<style>
@reference "../index.css";

.mizu-avatar-group {
  @apply inline-flex items-center;
}

.mizu-avatar-group__avatar {
  @apply border-2 border-[var(--color-surface-base)];
}

.mizu-avatar-group__avatar:not(:first-child) {
  margin-left: -8px;
}
.mizu-avatar-group--sm .mizu-avatar-group__avatar:not(:first-child) { margin-left: -6px; }
.mizu-avatar-group--lg .mizu-avatar-group__avatar:not(:first-child) { margin-left: -10px; }
.mizu-avatar-group--xl .mizu-avatar-group__avatar:not(:first-child) { margin-left: -12px; }

.mizu-avatar-group__overflow {
  @apply inline-flex items-center justify-center rounded-full bg-[var(--color-surface-muted)] text-[var(--color-foreground-secondary)] font-medium select-none shrink-0 border-2 border-[var(--color-surface-base)];
  margin-left: -8px;
}
.mizu-avatar-group--sm .mizu-avatar-group__overflow { width: 24px; height: 24px; font-size: 10px; margin-left: -6px; }
.mizu-avatar-group--md .mizu-avatar-group__overflow { width: 32px; height: 32px; font-size: 12px; }
.mizu-avatar-group--lg .mizu-avatar-group__overflow { width: 40px; height: 40px; font-size: 14px; margin-left: -10px; }
.mizu-avatar-group--xl .mizu-avatar-group__overflow { width: 56px; height: 56px; font-size: 18px; margin-left: -12px; }
</style>
