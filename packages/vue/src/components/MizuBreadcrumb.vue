<script setup lang="ts">
import { computed, useAttrs, type Component } from "vue";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: Component;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "/" | ">" | "·" | Component;
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: "/",
  size: "md",
});

const attrs = useAttrs();

const breadcrumbClasses = computed(() => {
  const classes = ["mizu-breadcrumb", `mizu-breadcrumb--${props.size}`];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const isCurrent = (index: number): boolean => {
  return index === props.items.length - 1;
};

const isComponent = computed(() => {
  return typeof props.separator === "object" && props.separator !== null;
});
</script>

<template>
  <nav :class="breadcrumbClasses" aria-label="Breadcrumb">
    <ol class="mizu-breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="mizu-breadcrumb__item"
      >
        <span v-if="isCurrent(index)" class="mizu-breadcrumb__link mizu-breadcrumb__link--current" aria-current="page">
          <component :is="item.icon" v-if="item.icon" :aria-hidden="!!item.label" class="mizu-breadcrumb__icon" />
          <template v-if="item.label">{{ item.label }}</template>
        </span>
        <a v-else :href="item.href || '#'" class="mizu-breadcrumb__link">
          <component :is="item.icon" v-if="item.icon" :aria-hidden="!!item.label" class="mizu-breadcrumb__icon" />
          <template v-if="item.label">{{ item.label }}</template>
        </a>
        <span v-if="!isCurrent(index)" class="mizu-breadcrumb__separator" aria-hidden="true">
          <component :is="separator" v-if="isComponent" />
          <template v-else>{{ separator }}</template>
        </span>
      </li>
    </ol>
  </nav>
</template>

<style>
@reference "../index.css";

.mizu-breadcrumb {
  @apply inline-flex;
}

.mizu-breadcrumb__list {
  @apply flex items-center flex-wrap list-none m-0 p-0;
}

.mizu-breadcrumb__item {
  @apply inline-flex items-center;
}

.mizu-breadcrumb__link {
  @apply inline-flex items-center no-underline transition-colors duration-150;
  color: var(--color-foreground-secondary);
}
.mizu-breadcrumb__link:hover:not(.mizu-breadcrumb__link--current) {
  color: var(--color-brand-primary);
}

.mizu-breadcrumb__link--current {
  color: var(--color-foreground-primary);
  font-weight: 500;
  cursor: default;
}

.mizu-breadcrumb__icon {
  @apply shrink-0;
}

.mizu-breadcrumb__separator {
  @apply inline-flex items-center shrink-0;
  color: var(--color-foreground-tertiary);
  user-select: none;
}

/* Sizes */
.mizu-breadcrumb--sm .mizu-breadcrumb__link {
  @apply text-xs;
}
.mizu-breadcrumb--sm .mizu-breadcrumb__icon {
  @apply w-3 h-3;
}
.mizu-breadcrumb--sm .mizu-breadcrumb__separator {
  @apply text-xs;
  margin: 0 4px;
}

.mizu-breadcrumb--md .mizu-breadcrumb__link {
  @apply text-sm;
}
.mizu-breadcrumb--md .mizu-breadcrumb__icon {
  @apply w-4 h-4;
}
.mizu-breadcrumb--md .mizu-breadcrumb__separator {
  @apply text-sm;
  margin: 0 6px;
}

.mizu-breadcrumb--lg .mizu-breadcrumb__link {
  @apply text-base;
}
.mizu-breadcrumb--lg .mizu-breadcrumb__icon {
  @apply w-5 h-5;
}
.mizu-breadcrumb--lg .mizu-breadcrumb__separator {
  @apply text-base;
  margin: 0 8px;
}
</style>
