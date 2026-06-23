<script setup lang="ts">
import { computed, useAttrs } from "vue";
import {
  PaginationRoot,
  PaginationList,
  PaginationListItem,
  PaginationEllipsis,
  PaginationFirst,
  PaginationPrev,
  PaginationNext,
  PaginationLast,
} from "reka-ui";

export interface PaginationProps {
  page: number;
  total: number;
  siblingCount?: number;
  showEdges?: boolean;
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<PaginationProps>(), {
  siblingCount: 1,
  showEdges: false,
  size: "md",
});

const emit = defineEmits<{
  "update:page": [value: number];
}>();

const attrs = useAttrs();

const paginationClasses = computed(() => {
  const classes = ["bp-pagination", `bp-pagination--${props.size}`];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

function handlePageChange(page: number) {
  emit("update:page", page);
}
</script>

<template>
  <nav :class="paginationClasses" aria-label="Pagination">
    <PaginationRoot
      :page="page"
      :total="total"
      :sibling-count="siblingCount"
      :show-edges="showEdges"
      :items-per-page="1"
      @update:page="handlePageChange"
    >
      <PaginationList v-slot="{ items }" class="bp-pagination__list">
        <PaginationFirst class="bp-pagination__btn bp-pagination__btn--nav">
          <svg class="bp-pagination__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="11 17 6 12 11 7" />
            <polyline points="18 17 13 12 18 7" />
          </svg>
        </PaginationFirst>
        <PaginationPrev class="bp-pagination__btn bp-pagination__btn--nav">
          <svg class="bp-pagination__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </PaginationPrev>
        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            class="bp-pagination__btn bp-pagination__btn--page"
          >
            {{ item.value }}
          </PaginationListItem>
          <PaginationEllipsis
            v-else
            :key="item.type"
            :index="index"
            class="bp-pagination__ellipsis"
          >
            ...
          </PaginationEllipsis>
        </template>
        <PaginationNext class="bp-pagination__btn bp-pagination__btn--nav">
          <svg class="bp-pagination__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </PaginationNext>
        <PaginationLast class="bp-pagination__btn bp-pagination__btn--nav">
          <svg class="bp-pagination__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
        </PaginationLast>
      </PaginationList>
    </PaginationRoot>
  </nav>
</template>

<style>
@reference "../index.css";

.bp-pagination {
  @apply inline-flex;
}

.bp-pagination__list {
  @apply flex items-center list-none m-0 p-0;
}

.bp-pagination__btn {
  @apply inline-flex items-center justify-center cursor-pointer transition-colors duration-150;
  background: var(--color-surface-base);
  color: var(--color-foreground-secondary);
  border: 1px solid var(--color-surface-muted);
}
.bp-pagination__btn:hover:not(:disabled) {
  background: var(--color-surface-subtle);
  color: var(--color-foreground-primary);
}
.bp-pagination__btn:focus-visible {
  outline: 1px solid var(--color-brand-accent);
  outline-offset: 1px;
}
.bp-pagination__btn:disabled {
  @apply cursor-not-allowed;
  opacity: 0.4;
}

.bp-pagination__btn--page[data-selected="true"] {
  background: var(--color-brand-primary);
  color: var(--color-foreground-inverse);
  border-color: var(--color-brand-primary);
}

.bp-pagination__ellipsis {
  @apply inline-flex items-center justify-center;
  color: var(--color-foreground-tertiary);
}

.bp-pagination__icon {
  @apply shrink-0;
}

/* Sizes */
.bp-pagination--sm .bp-pagination__btn {
  @apply h-[28px] min-w-[28px] text-xs;
  padding: 0 6px;
  border-radius: 4px;
}
.bp-pagination--sm .bp-pagination__icon {
  @apply w-3 h-3;
}
.bp-pagination--sm .bp-pagination__ellipsis {
  @apply w-[28px] h-[28px] text-xs;
}

.bp-pagination--md .bp-pagination__btn {
  @apply h-[36px] min-w-[36px] text-sm;
  padding: 0 8px;
  border-radius: 6px;
}
.bp-pagination--md .bp-pagination__icon {
  @apply w-4 h-4;
}
.bp-pagination--md .bp-pagination__ellipsis {
  @apply w-[36px] h-[36px] text-sm;
}

.bp-pagination--lg .bp-pagination__btn {
  @apply h-[40px] min-w-[40px] text-base;
  padding: 0 10px;
  border-radius: 6px;
}
.bp-pagination--lg .bp-pagination__icon {
  @apply w-5 h-5;
}
.bp-pagination--lg .bp-pagination__ellipsis {
  @apply w-[40px] h-[40px] text-base;
}

/* Spacing between buttons */
.bp-pagination__btn + .bp-pagination__btn {
  margin-left: 4px;
}
.bp-pagination__btn + .bp-pagination__ellipsis {
  margin-left: 4px;
}
.bp-pagination__ellipsis + .bp-pagination__btn {
  margin-left: 4px;
}
</style>
