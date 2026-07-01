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
  const classes = ["bp-breadcrumb", `bp-breadcrumb--${props.size}`];
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
    <ol class="bp-breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="bp-breadcrumb__item"
      >
        <span v-if="isCurrent(index)" class="bp-breadcrumb__link bp-breadcrumb__link--current" aria-current="page">
          <component :is="item.icon" v-if="item.icon" :aria-hidden="!!item.label" class="bp-breadcrumb__icon" />
          <template v-if="item.label">{{ item.label }}</template>
        </span>
        <a v-else :href="item.href || '#'" class="bp-breadcrumb__link">
          <component :is="item.icon" v-if="item.icon" :aria-hidden="!!item.label" class="bp-breadcrumb__icon" />
          <template v-if="item.label">{{ item.label }}</template>
        </a>
        <span v-if="!isCurrent(index)" class="bp-breadcrumb__separator" aria-hidden="true">
          <component :is="separator" v-if="isComponent" />
          <template v-else>{{ separator }}</template>
        </span>
      </li>
    </ol>
  </nav>
</template>

<style>
@reference "../index.css";

.bp-breadcrumb {
  @apply inline-flex;
}

.bp-breadcrumb__list {
  @apply flex items-center flex-wrap list-none m-0 p-0;
}

.bp-breadcrumb__item {
  @apply inline-flex items-center;
}

.bp-breadcrumb__link {
  @apply inline-flex items-center no-underline transition-colors duration-150;
  color: var(--color-foreground-secondary);
}
.bp-breadcrumb__link:hover:not(.bp-breadcrumb__link--current) {
  color: var(--color-brand-primary);
}

.bp-breadcrumb__link--current {
  color: var(--color-foreground-primary);
  font-weight: 500;
  cursor: default;
}

.bp-breadcrumb__icon {
  @apply shrink-0;
}

.bp-breadcrumb__separator {
  @apply inline-flex items-center shrink-0;
  color: var(--color-foreground-tertiary);
  user-select: none;
}

/* Sizes */
.bp-breadcrumb--sm .bp-breadcrumb__link {
  @apply text-xs;
}
.bp-breadcrumb--sm .bp-breadcrumb__icon {
  @apply w-3 h-3;
}
.bp-breadcrumb--sm .bp-breadcrumb__separator {
  @apply text-xs;
  margin: 0 4px;
}

.bp-breadcrumb--md .bp-breadcrumb__link {
  @apply text-sm;
}
.bp-breadcrumb--md .bp-breadcrumb__icon {
  @apply w-4 h-4;
}
.bp-breadcrumb--md .bp-breadcrumb__separator {
  @apply text-sm;
  margin: 0 6px;
}

.bp-breadcrumb--lg .bp-breadcrumb__link {
  @apply text-base;
}
.bp-breadcrumb--lg .bp-breadcrumb__icon {
  @apply w-5 h-5;
}
.bp-breadcrumb--lg .bp-breadcrumb__separator {
  @apply text-base;
  margin: 0 8px;
}
</style>
