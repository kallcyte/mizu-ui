<script setup lang="ts" generic="T">
import { computed, useAttrs, ref, h } from "vue";
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  FlexRender,
  createColumnHelper,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type RowSelectionState,
} from "@tanstack/vue-table";
import MizuCheckbox from "./MizuCheckbox.vue";
import MizuPagination from "./MizuPagination.vue";

export interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  sortable?: boolean;
  selectable?: boolean;
  loading?: boolean;
  emptyText?: string;
  pageSize?: number;
  page?: number;
  totalRows?: number;
  paginated?: boolean;
}

const props = withDefaults(defineProps<DataTableProps<T>>(), {
  sortable: true,
  selectable: false,
  loading: false,
  emptyText: "No data available",
  pageSize: 10,
  page: 1,
  totalRows: undefined,
  paginated: true,
});

const emit = defineEmits<{
  "update:page": [value: number];
  sortingChange: [value: SortingState];
  rowSelect: [value: RowSelectionState];
}>();

const attrs = useAttrs();

const sorting = ref<SortingState>([]);
const rowSelection = ref<RowSelectionState>({});

const pagination = computed<PaginationState>(() => ({
  pageIndex: props.page - 1,
  pageSize: props.pageSize,
}));

const selectionColumn: ColumnDef<T, unknown> = {
  id: "select",
  header: ({ table }) =>
    h(MizuCheckbox, {
      modelValue: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"),
      "onUpdate:modelValue": (value: boolean | "indeterminate" | string | number | null) => table.toggleAllPageRowsSelected(value === true),
    }),
  cell: ({ row }) =>
    h(MizuCheckbox, {
      modelValue: row.getIsSelected(),
      "onUpdate:modelValue": (value: boolean | "indeterminate" | string | number | null) => row.toggleSelected(value === true),
    }),
  enableSorting: false,
  enableHiding: false,
};

const allColumns = computed(() => {
  if (props.selectable) {
    return [selectionColumn, ...props.columns];
  }
  return props.columns;
});

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return allColumns.value as ColumnDef<T, unknown>[];
  },
  state: {
    get sorting() {
      return sorting.value;
    },
    get pagination() {
      return pagination.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === "function" ? updater(sorting.value) : updater;
    emit("sortingChange", sorting.value);
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === "function" ? updater(rowSelection.value) : updater;
    emit("rowSelect", rowSelection.value);
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: props.sortable ? getSortedRowModel() : undefined,
  getPaginationRowModel: props.paginated ? getPaginationRowModel() : undefined,
  getFilteredRowModel: getFilteredRowModel(),
  enableSorting: props.sortable,
  enableRowSelection: props.selectable,
});

function handlePageChange(page: number) {
  emit("update:page", page);
}

const tableClasses = computed(() => {
  const classes = ["mizu-data-table"];
  if (props.loading) classes.push("mizu-data-table--loading");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const totalPages = computed(() => {
  return props.totalRows ? Math.ceil(props.totalRows / props.pageSize) : table.getPageCount();
});
</script>

<template>
  <div :class="tableClasses">
    <div class="mizu-data-table__wrapper">
      <table class="mizu-data-table__table">
        <thead class="mizu-data-table__thead">
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="mizu-data-table__th"
              :class="{
                'mizu-data-table__th--sortable': header.column.getCanSort(),
                'mizu-data-table__th--select': header.id === 'select',
              }"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <div v-if="header.id === 'select'" class="mizu-data-table__th-content">
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </div>
              <div v-else class="mizu-data-table__th-content">
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <span v-if="header.column.getCanSort()" class="mizu-data-table__sort-icon">
                  <svg v-if="header.column.getIsSorted() === 'asc'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  <svg v-else-if="header.column.getIsSorted() === 'desc'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mizu-data-table__sort-icon--inactive">
                    <polyline points="8 9 12 5 16 9" />
                    <polyline points="8 15 12 19 16 15" />
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="mizu-data-table__tbody">
          <template v-if="loading">
            <tr>
              <td :colspan="table.getAllColumns().length" class="mizu-data-table__loading">
                <div class="mizu-data-table__spinner">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" opacity="0.75" />
                  </svg>
                </div>
                <span>Loading...</span>
              </td>
            </tr>
          </template>
          <template v-else-if="table.getRowModel().rows.length === 0">
            <tr>
              <td :colspan="table.getAllColumns().length" class="mizu-data-table__empty">
                {{ emptyText }}
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              class="mizu-data-table__row"
              :class="{ 'mizu-data-table__row--selected': row.getIsSelected() }"
            >
              <td
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="mizu-data-table__td"
                :class="{ 'mizu-data-table__td--select': cell.column.id === 'select' }"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div v-if="!loading && table.getRowModel().rows.length > 0" class="mizu-data-table__footer">
      <div v-if="selectable" class="mizu-data-table__selection-info">
        {{ Object.keys(rowSelection).length }} row(s) selected
      </div>
      <MizuPagination
        v-if="paginated"
        :page="page"
        :total="totalPages"
        size="sm"
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>

<style>
@reference "../index.css";

.mizu-data-table {
  @apply flex flex-col;
  border: 1px solid var(--color-surface-muted);
  border-radius: 6px;
  overflow: hidden;
}

.mizu-data-table__wrapper {
  @apply overflow-x-auto;
}

.mizu-data-table__table {
  @apply w-full border-collapse;
}

.mizu-data-table__thead {
  background: var(--color-surface-subtle);
}

.mizu-data-table__th {
  @apply text-left text-xs font-semibold uppercase tracking-wider;
  padding: 10px 14px;
  color: var(--color-foreground-tertiary);
  border-bottom: 1px solid var(--color-surface-muted);
  white-space: nowrap;
  user-select: none;
}

.mizu-data-table__th--sortable {
  @apply cursor-pointer;
}
.mizu-data-table__th--sortable:hover {
  color: var(--color-foreground-primary);
}

.mizu-data-table__th-content {
  @apply inline-flex items-center gap-1.5;
}

.mizu-data-table__sort-icon {
  @apply inline-flex;
}
.mizu-data-table__sort-icon svg {
  @apply w-3.5 h-3.5;
}
.mizu-data-table__sort-icon--inactive {
  opacity: 0.3;
}

.mizu-data-table__tbody {
  background: var(--color-surface-base);
}

.mizu-data-table__row {
  border-bottom: 1px solid var(--color-surface-muted);
  transition: background-color 150ms;
}
.mizu-data-table__row:last-child {
  border-bottom: none;
}
.mizu-data-table__row:hover {
  background: var(--color-surface-subtle);
}
.mizu-data-table__row--selected {
  background: var(--color-brand-ycp-subtle);
}

.mizu-data-table__td {
  @apply text-sm;
  padding: 10px 14px;
  color: var(--color-foreground-primary);
  vertical-align: top;
}

.mizu-data-table__th--select,
.mizu-data-table__td--select {
  @apply w-[40px];
  text-align: center;
}

.mizu-data-table__loading,
.mizu-data-table__empty {
  @apply text-center;
  padding: 40px 14px;
  color: var(--color-foreground-tertiary);
}

.mizu-data-table__loading {
  @apply inline-flex items-center justify-center gap-2;
}

.mizu-data-table__spinner {
  @apply inline-flex;
}
.mizu-data-table__spinner svg {
  @apply w-5 h-5;
  animation: mizu-data-table-spin 1s linear infinite;
}

@keyframes mizu-data-table-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.mizu-data-table__footer {
  @apply flex items-center justify-between;
  padding: 10px 14px;
  border-top: 1px solid var(--color-surface-muted);
  background: var(--color-surface-subtle);
}

.mizu-data-table__selection-info {
  @apply text-xs;
  color: var(--color-foreground-secondary);
}

/* Loading state */
.mizu-data-table--loading {
  @apply pointer-events-none;
  opacity: 0.7;
}
</style>
