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
  const classes = ["bp-dashlist", `bp-dashlist--${props.size}`, `bp-dashlist--${props.orientation}`];

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});
</script>

<template>
  <dl :class="listClasses">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['bp-dashlist__row', { 'bp-dashlist__row--highlighted': item.highlighted }]"
    >
      <dt class="bp-dashlist__label">{{ item.label }}</dt>
      <dd class="bp-dashlist__value">{{ item.value }}</dd>
    </div>
  </dl>
</template>

<style>
@reference "../index.css";

.bp-dashlist {
  @apply m-0 p-0;
  list-style: none;
}

.bp-dashlist--vertical {
  @apply flex flex-col;
}

.bp-dashlist--horizontal {
  @apply flex flex-row flex-wrap;
}

.bp-dashlist__row {
  @apply flex items-baseline;
}

.bp-dashlist--vertical .bp-dashlist__row {
  @apply flex-col;
  gap: 2px;
  padding: 8px 0;
}

.bp-dashlist--vertical .bp-dashlist__row + .bp-dashlist__row {
  border-top: 1px solid var(--color-surface-muted);
}

.bp-dashlist--horizontal .bp-dashlist__row {
  @apply flex-row items-center;
  gap: 8px;
  padding: 4px 16px 4px 0;
}

.bp-dashlist__label {
  @apply font-medium m-0;
  color: var(--color-foreground-secondary);
}

.bp-dashlist__value {
  @apply m-0;
  color: var(--color-foreground-primary);
}

.bp-dashlist--sm .bp-dashlist__label { @apply text-[11px]; }
.bp-dashlist--sm .bp-dashlist__value { @apply text-[12px]; }

.bp-dashlist--md .bp-dashlist__label { @apply text-[12px]; }
.bp-dashlist--md .bp-dashlist__value { @apply text-[13px]; }

.bp-dashlist--lg .bp-dashlist__label { @apply text-[13px]; }
.bp-dashlist--lg .bp-dashlist__value { @apply text-[15px]; }

.bp-dashlist__row--highlighted .bp-dashlist__value {
  color: var(--color-brand-primary);
  font-weight: 600;
}

.bp-dashlist--vertical.bp-dashlist--sm .bp-dashlist__row { padding: 6px 0; }
.bp-dashlist--vertical.bp-dashlist--lg .bp-dashlist__row { padding: 10px 0; }
</style>
