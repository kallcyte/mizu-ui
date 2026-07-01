<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface DashItem {
  label: string;
  value?: string;
  highlighted?: boolean;
}

export interface DashListProps {
  items?: DashItem[];
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

const props = withDefaults(defineProps<DashListProps>(), {
  items: () => [],
  size: "md",
  orientation: "vertical",
});

const attrs = useAttrs();

const listClasses = computed(() => {
  const classes = ["mizu-dashlist", `mizu-dashlist--${props.size}`, `mizu-dashlist--${props.orientation}`];

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});
</script>

<template>
  <dl :class="listClasses">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['mizu-dashlist__row', { 'mizu-dashlist__row--highlighted': item.highlighted }]"
    >
      <dt class="mizu-dashlist__label">{{ item.label }}</dt>
      <dd class="mizu-dashlist__value">{{ item.value }}</dd>
    </div>
  </dl>
</template>

<style>
@reference "../index.css";

.mizu-dashlist {
  @apply m-0 p-0;
  list-style: none;
}

.mizu-dashlist--vertical {
  @apply flex flex-col;
}

.mizu-dashlist--horizontal {
  @apply flex flex-row flex-wrap;
}

.mizu-dashlist__row {
  @apply flex items-baseline;
}

.mizu-dashlist--vertical .mizu-dashlist__row {
  @apply flex-col;
  gap: 2px;
  padding: 8px 0;
}

.mizu-dashlist--vertical .mizu-dashlist__row + .mizu-dashlist__row {
  border-top: 1px solid var(--color-surface-muted);
}

.mizu-dashlist--horizontal .mizu-dashlist__row {
  @apply flex-row items-center;
  gap: 8px;
  padding: 4px 16px 4px 0;
}

.mizu-dashlist__label {
  @apply font-medium m-0;
  color: var(--color-foreground-secondary);
}

.mizu-dashlist__value {
  @apply m-0;
  color: var(--color-foreground-primary);
}

.mizu-dashlist--sm .mizu-dashlist__label { @apply text-[11px]; }
.mizu-dashlist--sm .mizu-dashlist__value { @apply text-[12px]; }

.mizu-dashlist--md .mizu-dashlist__label { @apply text-[12px]; }
.mizu-dashlist--md .mizu-dashlist__value { @apply text-[13px]; }

.mizu-dashlist--lg .mizu-dashlist__label { @apply text-[13px]; }
.mizu-dashlist--lg .mizu-dashlist__value { @apply text-[15px]; }

.mizu-dashlist__row--highlighted .mizu-dashlist__value {
  color: var(--color-brand-primary);
  font-weight: 600;
}

.mizu-dashlist--vertical.mizu-dashlist--sm .mizu-dashlist__row { padding: 6px 0; }
.mizu-dashlist--vertical.mizu-dashlist--lg .mizu-dashlist__row { padding: 10px 0; }
</style>
