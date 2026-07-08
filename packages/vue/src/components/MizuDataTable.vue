<script setup lang="ts" generic="T">
import { computed, useAttrs, ref, h, resolveComponent, useTemplateRef, watch, type Ref } from "vue";
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  FlexRender,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type RowSelectionState,
  type ColumnFiltersState,
  type VisibilityState,
  type ColumnPinningState,
  type RowPinningState,
  type ExpandedState,
  type GroupingState,
  type Cell,
  type Row,
  type Column,
} from "@tanstack/vue-table";
// UCheckbox and UPagination are auto-imported by @nuxt/ui/vite (autoImport: true)

// ── Types ──────────────────────────────────────────────────────────

export interface TableMetaClass<T> {
  th?: string;
  td?: string;
}

export interface TableColumnStyle {
  th?: Record<string, string>;
  td?: Record<string, string>;
}

export interface TableColumnMeta<T> {
  class?: TableMetaClass<T>;
  style?: TableColumnStyle;
  colspan?: { td?: number | ((cell: Cell<T, unknown>) => number) };
  rowspan?: { td?: number | string | ((cell: Cell<T, unknown>) => number | string) };
}

export interface TableColumn<T> {
  accessorKey?: string;
  id?: string;
  header?: string | ((props: any) => any);
  footer?: string | ((props: any) => any);
  cell?: (props: any) => any;
  meta?: TableColumnMeta<T>;
  size?: number;
  enableSorting?: boolean;
  enableHiding?: boolean;
  [key: string]: unknown;
}

export interface TableMeta<T> {
  class?: {
    tr?: string | ((row: Row<T>) => string);
  };
}

export interface PaginationOptions {
  getPaginationRowModel: ReturnType<typeof getPaginationRowModel>;
}

// ── Props ──────────────────────────────────────────────────────────

const props = withDefaults(
  defineProps<{
    data: T[];
    columns?: TableColumn<T>[];
    caption?: string;
    meta?: TableMeta<T>;
    loading?: boolean;
    loadingColor?: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
    loadingAnimation?: "carousel" | "carousel-inverse" | "swing" | "elastic";
    sticky?: boolean | "header" | "footer";
    empty?: string;
    // v-model state props
    sorting?: SortingState;
    pagination?: PaginationState;
    rowSelection?: RowSelectionState;
    columnVisibility?: VisibilityState;
    columnFilters?: ColumnFiltersState;
    globalFilter?: string;
    columnPinning?: ColumnPinningState;
    rowPinning?: RowPinningState;
    expanded?: ExpandedState;
    grouping?: GroupingState;
    // Options
    sortingOptions?: Record<string, unknown>;
    paginationOptions?: PaginationOptions;
    groupingOptions?: Record<string, unknown>;
    expandedOptions?: Record<string, unknown>;
    visibilityOptions?: Record<string, unknown>;
    columnFiltersOptions?: Record<string, unknown>;
    globalFilterOptions?: Record<string, unknown>;
    columnPinningOptions?: Record<string, unknown>;
    rowPinningOptions?: Record<string, unknown>;
    getRowId?: (originalRow: T, index: number, parent?: Row<T>) => string;
    getSubRows?: (originalRow: T, index: number) => T[];
    virtualize?: boolean;
    // Legacy props (kept for backward compat)
    sortable?: boolean;
    selectable?: boolean;
    paginated?: boolean;
    pageSize?: number;
    page?: number;
    totalRows?: number;
    emptyText?: string;
  }>(),
  {
    loading: false,
    loadingColor: "primary",
    loadingAnimation: "carousel",
    sticky: false,
    empty: "No data available",
    sortable: true,
    selectable: false,
    paginated: true,
    pageSize: 10,
    page: 1,
    emptyText: undefined,
    sorting: () => [],
  }
);

// ── Emits ──────────────────────────────────────────────────────────

const emit = defineEmits<{
  "update:sorting": [value: SortingState];
  "update:pagination": [value: PaginationState];
  "update:rowSelection": [value: RowSelectionState];
  "update:columnVisibility": [value: VisibilityState];
  "update:columnFilters": [value: ColumnFiltersState];
  "update:globalFilter": [value: string];
  "update:columnPinning": [value: ColumnPinningState];
  "update:rowPinning": [value: RowPinningState];
  "update:expanded": [value: ExpandedState];
  "update:grouping": [value: GroupingState];
  "update:page": [value: number];
  sortingChange: [value: SortingState];
  rowSelect: [value: RowSelectionState];
  select: [e: Event, row: Row<T>];
  hover: [e: Event, row: Row<T> | null];
  contextmenu: [e: Event, row: Row<T>];
}>();

const attrs = useAttrs();

// ── Auto-columns ───────────────────────────────────────────────────

const resolvedColumns = computed<ColumnDef<T, unknown>[]>(() => {
  if (props.columns && props.columns.length > 0) {
    return props.columns.map((c) => {
      const result: Record<string, unknown> = { ...c };
      // Remove meta/footer from column defs (stored separately)
      delete result.meta;
      delete result.footer;
      return result as unknown as ColumnDef<T, unknown>;
    });
  }
  if (!props.data || props.data.length === 0) return [];
  const first = props.data[0] as Record<string, unknown>;
  return Object.keys(first).map(
    (key) =>
      ({
        accessorKey: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
      }) as ColumnDef<T, unknown>
  );
});

// ── Original columns (with meta) for access ───────────────────────

function getColumnMeta(columnId: string): TableColumnMeta<T> | undefined {
  if (!props.columns) return undefined;
  const col = props.columns.find((c) => c.id === columnId || c.accessorKey === columnId);
  return col?.meta;
}

function hasColumnFooter(): boolean {
  if (!props.columns) return false;
  return props.columns.some((c) => c.footer !== undefined);
}

function getColumnFooter(columnId: string): TableColumn<T>["footer"] {
  if (!props.columns) return undefined;
  const col = props.columns.find((c) => c.id === columnId || c.accessorKey === columnId);
  return col?.footer;
}

// ── Internal state (used when v-model not provided) ───────────────

const internalSorting = ref<SortingState>([]);
const internalPagination = ref<PaginationState>({ pageIndex: 0, pageSize: props.pageSize });
const internalRowSelection = ref<RowSelectionState>({});
const internalColumnFilters = ref<ColumnFiltersState>([]);
const internalGlobalFilter = ref("");
const internalColumnVisibility = ref<VisibilityState>({});
const internalColumnPinning = ref<ColumnPinningState>({ left: [], right: [] });
const internalRowPinning = ref<RowPinningState>({ top: [], bottom: [] });
const internalExpanded = ref<ExpandedState>({});
const internalGrouping = ref<GroupingState>([]);

// ── Reactive defaults from legacy props ───────────────────────────

const defaultSortable = computed(() => props.sortable);
const defaultSelectable = computed(() => props.selectable);
const defaultPaginated = computed(() => props.paginated);

// ── Selection column ──────────────────────────────────────────────

const selectionColumn: ColumnDef<T, unknown> = {
  id: "select",
  header: ({ table }) =>
    h(resolveComponent("UCheckbox"), {
      modelValue:
        table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"),
      "onUpdate:modelValue": (value: boolean | "indeterminate" | string | number | null) =>
        table.toggleAllPageRowsSelected(!!value),
    }),
  cell: ({ row }) =>
    h(resolveComponent("UCheckbox"), {
      modelValue: row.getIsSelected(),
      "onUpdate:modelValue": (value: boolean | "indeterminate" | string | number | null) =>
        row.toggleSelected(!!value),
    }),
  enableSorting: false,
  enableHiding: false,
};

const allColumns = computed(() => {
  if (props.selectable) {
    return [selectionColumn, ...resolvedColumns.value];
  }
  return resolvedColumns.value;
});

// ── Sorting state ─────────────────────────────────────────────────

const sortingRef = ref<SortingState>(props.sorting ?? []);
watch(
  () => props.sorting,
  (val: SortingState) => {
    if (val !== undefined) sortingRef.value = val;
  }
);

// ── Pagination from legacy props ──────────────────────────────────

const legacyPagination = computed<PaginationState>(() => ({
  pageIndex: (props.page ?? 1) - 1,
  pageSize: props.pageSize ?? 10,
}));

// ── Table instance ────────────────────────────────────────────────

const tableRootRef = useTemplateRef<HTMLDivElement>("tableRoot");

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return allColumns.value as ColumnDef<T, unknown>[];
  },
  state: {
    get sorting() {
      return props.sorting ?? internalSorting.value;
    },
    get pagination() {
      return props.pagination ?? (props.paginated === false ? undefined : legacyPagination.value);
    },
    get rowSelection() {
      return props.rowSelection ?? internalRowSelection.value;
    },
    get columnFilters() {
      return props.columnFilters ?? internalColumnFilters.value;
    },
    get globalFilter() {
      return props.globalFilter ?? internalGlobalFilter.value;
    },
    get columnVisibility() {
      return props.columnVisibility ?? internalColumnVisibility.value;
    },
    get columnPinning() {
      return props.columnPinning ?? internalColumnPinning.value;
    },
    get rowPinning() {
      return props.rowPinning ?? internalRowPinning.value;
    },
    get expanded() {
      return props.expanded ?? internalExpanded.value;
    },
    get grouping() {
      return props.grouping ?? internalGrouping.value;
    },
  },
  onSortingChange: (updater) => {
    const next = typeof updater === "function" ? updater(sortingRef.value) : updater;
    if (props.sorting !== undefined) {
      emit("update:sorting", next);
    } else {
      internalSorting.value = next;
    }
    emit("sortingChange", next);
  },
  onRowSelectionChange: (updater) => {
    const next =
      typeof updater === "function" ? updater(props.rowSelection ?? internalRowSelection.value) : updater;
    if (props.rowSelection !== undefined) {
      emit("update:rowSelection", next);
    } else {
      internalRowSelection.value = next;
    }
    emit("rowSelect", next);
  },
  onPaginationChange: (updater) => {
    if (props.pagination) return;
    const next = typeof updater === "function" ? updater(legacyPagination.value) : updater;
    if (props.paginated !== false) {
      emit("update:page", next.pageIndex + 1);
    }
  },
  onColumnFiltersChange: (updater) => {
    const next = typeof updater === "function" ? updater(props.columnFilters ?? internalColumnFilters.value) : updater;
    if (props.columnFilters !== undefined) {
      emit("update:columnFilters", next);
    } else {
      internalColumnFilters.value = next;
    }
  },
  onGlobalFilterChange: (updater) => {
    const next =
      typeof updater === "function" ? updater((props.globalFilter ?? internalGlobalFilter.value) as string) : updater;
    if (props.globalFilter !== undefined) {
      emit("update:globalFilter", next as string);
    } else {
      internalGlobalFilter.value = next as string;
    }
  },
  onColumnVisibilityChange: (updater) => {
    const next = typeof updater === "function"
      ? updater(props.columnVisibility ?? internalColumnVisibility.value)
      : updater;
    if (props.columnVisibility !== undefined) {
      emit("update:columnVisibility", next);
    } else {
      internalColumnVisibility.value = next;
    }
  },
  onColumnPinningChange: (updater) => {
    const next = typeof updater === "function"
      ? updater(props.columnPinning ?? internalColumnPinning.value)
      : updater;
    if (props.columnPinning !== undefined) {
      emit("update:columnPinning", next);
    } else {
      internalColumnPinning.value = next;
    }
  },
  onRowPinningChange: (updater) => {
    const next = typeof updater === "function" ? updater(props.rowPinning ?? internalRowPinning.value) : updater;
    if (props.rowPinning !== undefined) {
      emit("update:rowPinning", next);
    } else {
      internalRowPinning.value = next;
    }
  },
  onExpandedChange: (updater) => {
    const next = typeof updater === "function" ? updater(props.expanded ?? internalExpanded.value) : updater;
    if (props.expanded !== undefined) {
      emit("update:expanded", next);
    } else {
      internalExpanded.value = next;
    }
  },
  onGroupingChange: (updater) => {
    const next = typeof updater === "function" ? updater(props.grouping ?? internalGrouping.value) : updater;
    if (props.grouping !== undefined) {
      emit("update:grouping", next);
    } else {
      internalGrouping.value = next;
    }
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel:
    defaultSortable.value ? getSortedRowModel() : undefined,
  getPaginationRowModel: props.paginationOptions?.getPaginationRowModel
    ? props.paginationOptions.getPaginationRowModel
    : defaultPaginated.value ? getPaginationRowModel() : undefined,
  getFilteredRowModel: getFilteredRowModel(),
  enableSorting: defaultSortable.value,
  enableRowSelection: defaultSelectable.value,
  getRowId: props.getRowId,
  getSubRows: props.getSubRows,
  ...(props.sortingOptions || {}),
  ...(props.visibilityOptions || {}),
  ...(props.columnFiltersOptions || {}),
  ...(props.globalFilterOptions || {}),
  ...(props.columnPinningOptions || {}),
  ...(props.rowPinningOptions || {}),
  ...(props.expandedOptions || {}),
  ...(props.groupingOptions || {}),
});

// ── Sticky classes ────────────────────────────────────────────────

const isSticky = computed(() => !!props.sticky);

// ── Table root classes ────────────────────────────────────────────

const tableClasses = computed(() => {
  const classes = ["mizu-data-table", "w-full"];
  if (props.loading) classes.push("mizu-data-table--loading");
  if (isSticky.value) classes.push("mizu-data-table--sticky-header");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

// ── Loading animation classes ─────────────────────────────────────

const loadingBarClass = computed(() => {
  const color = props.loadingColor ?? "primary";
  const animation = props.loadingAnimation ?? "carousel";
  return `mizu-data-table__loading-bar mizu-data-table__loading-bar--${color} mizu-data-table__loading-bar--${animation}`;
});

// ── Row class resolver ────────────────────────────────────────────

function getRowClass(row: Row<T>): string {
  const metaTrClass = props.meta?.class?.tr;
  const trClass = typeof metaTrClass === "function" ? metaTrClass(row) : metaTrClass;
  const classes: string[] = ["mizu-data-table__row"];
  if (row.getIsSelected()) classes.push("mizu-data-table__row--selected");
  if (trClass) classes.push(trClass);
  return classes.join(" ");
}

// ── Cell class resolver ───────────────────────────────────────────

function getCellClass(cell: Cell<T, unknown>): string {
  const colMeta = getColumnMeta(cell.column.id);
  const classes: string[] = ["mizu-data-table__td"];
  if (cell.column.id === "select") classes.push("mizu-data-table__td--select");
  const metaClass = colMeta?.class?.td;
  if (metaClass) classes.push(metaClass);
  return classes.join(" ");
}

function getHeaderClass(column: Column<T, unknown>): string {
  const colMeta = getColumnMeta(column.id);
  const classes: string[] = ["mizu-data-table__th"];
  if (column.getCanSort()) classes.push("mizu-data-table__th--sortable");
  if (column.id === "select") classes.push("mizu-data-table__th--select");
  const metaClass = colMeta?.class?.th;
  if (metaClass) classes.push(metaClass);
  return classes.join(" ");
}

// ── Cell/Header style resolver ────────────────────────────────────

function getCellStyle(cell: Cell<T, unknown>): Record<string, string> {
  const colMeta = getColumnMeta(cell.column.id);
  return colMeta?.style?.td || {};
}

function getHeaderStyle(column: Column<T, unknown>): Record<string, string> {
  const colMeta = getColumnMeta(column.id);
  return colMeta?.style?.th || {};
}

function getColspan(cell: Cell<T, unknown>): number | undefined {
  const colMeta = getColumnMeta(cell.column.id);
  const span = colMeta?.colspan?.td;
  return typeof span === "function" ? span(cell) : span;
}

function getRowspan(cell: Cell<T, unknown>): number | undefined {
  const colMeta = getColumnMeta(cell.column.id);
  const span = colMeta?.rowspan?.td;
  if (typeof span === "function") {
    const result = span(cell);
    return typeof result === "string" ? parseInt(result, 10) : result;
  }
  if (typeof span === "string") return parseInt(span, 10);
  return span;
}

// ── Legacy pagination ─────────────────────────────────────────────

function handlePageChange(page: number) {
  if (props.pagination) return;
  emit("update:page", page);
}

const totalPages = computed(() => {
  const pageSize = props.pagination?.pageSize ?? props.pageSize ?? 10;
  return props.totalRows ? Math.ceil(props.totalRows / props.pageSize) : table.getPageCount();
});

// ── Row event handlers ────────────────────────────────────────────

function onRowClick(e: Event, row: Row<T>) {
  emit("select", e, row);
}

function onRowHover(e: Event, row: Row<T> | null) {
  emit("hover", e, row);
}

function onRowContextmenu(e: Event, row: Row<T>) {
  emit("contextmenu", e, row);
}

// ── Expose ────────────────────────────────────────────────────────

defineExpose({
  tableRef: tableRootRef,
  tableApi: table,
});

const emptyDisplay = computed(() => props.emptyText ?? props.empty);

// ── Row selection display count ───────────────────────────────────

const rowSelectionCount = computed(() => {
  const sel = props.rowSelection ?? internalRowSelection.value;
  return Object.keys(sel).length;
});

// ── Toggle sorting ───────────────────────────────────────────────

function toggleSorting(column: Column<T, unknown>) {
  column.toggleSorting(column.getIsSorted() === "asc");
}
</script>

<template>
  <div ref="tableRoot" :class="tableClasses">
    <!-- Loading bar (Nuxt UI style) -->
    <div v-if="loading" :class="loadingBarClass" />

    <div class="mizu-data-table__wrapper">
      <table class="mizu-data-table__table">
        <!-- Caption (must be inside <table> per HTML spec) -->
        <caption v-if="caption" class="mizu-data-table__caption">
          <slot name="caption">{{ caption }}</slot>
        </caption>
        <caption v-else-if="$slots.caption" class="mizu-data-table__caption">
          <slot name="caption" />
        </caption>
        <!-- Header -->
        <thead class="mizu-data-table__thead">
          <!-- Body-top slot (rendered inside thead to share sticky) -->
          <tr v-if="$slots['body-top']">
            <td :colspan="table.getAllColumns().length" class="p-0">
              <slot name="body-top" />
            </td>
          </tr>
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :class="getHeaderClass(header.column)"
              :style="getHeaderStyle(header.column)"
              :data-pinned="header.column.getIsPinned()"
              @click="header.column.getCanSort() && toggleSorting(header.column)"
            >
              <div class="mizu-data-table__th-content">
                <!-- Named slot: #<column>-header -->
                <slot
                  v-if="header.column.id !== 'select'"
                  :name="`${header.column.id}-header`"
                  :column="header.column"
                  :header="header"
                  :table="table"
                >
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                </slot>
                <div v-else class="mizu-data-table__th-content">
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                </div>
                <!-- Sort icon -->
                <span v-if="header.column.getCanSort()" class="mizu-data-table__sort-icon" :class="{ 'mizu-data-table__sort-icon--active': header.column.getIsSorted() }">
                  <svg
                    v-if="header.column.getIsSorted() === 'asc'"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="mizu-data-table__sort-icon-svg"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  <svg
                    v-else-if="header.column.getIsSorted() === 'desc'"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="mizu-data-table__sort-icon-svg"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <svg
                    v-else
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="mizu-data-table__sort-icon-svg"
                  >
                    <polyline points="8 9 12 5 16 9" />
                    <polyline points="8 15 12 19 16 15" />
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="mizu-data-table__tbody" :data-selectable="selectable">
          <!-- Loading state -->
          <template v-if="loading">
            <tr>
              <td :colspan="table.getAllColumns().length">
                <slot name="loading">
                  <div class="mizu-data-table__loading">
                    <div class="mizu-data-table__spinner">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                          opacity="0.25"
                        />
                        <path
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                          opacity="0.75"
                        />
                      </svg>
                    </div>
                    <span>Loading...</span>
                  </div>
                </slot>
              </td>
            </tr>
          </template>

          <!-- Empty state -->
          <template v-else-if="table.getRowModel().rows.length === 0">
            <tr>
              <td :colspan="table.getAllColumns().length">
                <slot name="empty">
                  <div class="mizu-data-table__empty">{{ emptyDisplay }}</div>
                </slot>
              </td>
            </tr>
          </template>

          <!-- Data rows -->
          <template v-else>
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <tr
                :class="getRowClass(row)"
                :data-selected="row.getIsSelected()"
                :data-pinned="row.getIsPinned()"
                @click="onRowClick($event, row)"
                @mouseenter="onRowHover($event, row)"
                @mouseleave="onRowHover($event, null)"
                @contextmenu.prevent="onRowContextmenu($event, row)"
              >
                <td
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  :class="getCellClass(cell)"
                  :style="getCellStyle(cell)"
                  :colspan="getColspan(cell)"
                  :rowspan="getRowspan(cell)"
                  :data-pinned="cell.column.getIsPinned()"
                >
                  <!-- Named slot: #<column>-cell -->
                  <slot
                    v-if="cell.column.id !== 'select'"
                    :name="`${cell.column.id}-cell`"
                    :cell="cell"
                    :column="cell.column"
                    :getValue="cell.getValue"
                    :row="row"
                    :table="table"
                  >
                    <FlexRender
                      :render="cell.column.columnDef.cell"
                      :props="cell.getContext()"
                    />
                  </slot>
                  <FlexRender
                    v-else
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </td>
              </tr>
              <!-- Expanded row -->
              <tr v-if="row.getIsExpanded()">
                <td :colspan="row.getVisibleCells().length" class="mizu-data-table__expanded-td">
                  <slot name="expanded" :row="row">
                    <pre class="mizu-data-table__expanded-code">{{ row.original }}</pre>
                  </slot>
                </td>
              </tr>
            </template>
          </template>
        </tbody>

        <!-- Footer (column footers) -->
        <tfoot v-if="hasColumnFooter()" class="mizu-data-table__tfoot">
          <tr>
            <th
              v-for="column in table.getAllLeafColumns()"
              :key="column.id"
              class="mizu-data-table__tf"
            >
              <slot
                v-if="column.id !== 'select'"
                :name="`${column.id}-footer`"
                :column="column"
                :table="table"
              >
                <template v-if="getColumnFooter(column.id)">
                  {{ typeof getColumnFooter(column.id) === 'function' ? (getColumnFooter(column.id) as Function)({ column }) : getColumnFooter(column.id) }}
                </template>
              </slot>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Body-bottom slot -->
    <div v-if="$slots['body-bottom']">
      <slot name="body-bottom" />
    </div>

    <!-- Pagination footer -->
    <div
      v-if="!loading && table.getRowModel().rows.length > 0"
      class="mizu-data-table__footer"
    >
      <div v-if="selectable" class="mizu-data-table__selection-info">
        {{ rowSelectionCount }} row(s) selected
      </div>
      <div v-else class="mizu-data-table__selection-info">
        {{ table.getFilteredRowModel().rows.length }} row(s)
      </div>
      <UPagination
        v-if="defaultPaginated"
        :page="props.pagination ? props.pagination.pageIndex + 1 : (props.page ?? 1)"
        :total="totalPages"
        size="sm"
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>

<style>
@reference "../index.css";

/* ── Root ────────────────────────────────────────────────────────── */
.mizu-data-table {
  @apply flex flex-col;
  border: 1px solid var(--color-surface-muted);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.mizu-data-table--sticky-header .mizu-data-table__thead {
  @apply sticky top-0 z-10;
  background: var(--color-surface-subtle);
}

/* ── Loading bar (Nuxt UI style) ─────────────────────────────────── */
.mizu-data-table__loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 20;
  opacity: 0;
  transition: opacity 0.2s;
}

.mizu-data-table--loading .mizu-data-table__loading-bar {
  opacity: 1;
}

/* Colors */
.mizu-data-table__loading-bar--primary { background: var(--color-brand-ycp); }
.mizu-data-table__loading-bar--secondary { background: var(--color-foreground-secondary); }
.mizu-data-table__loading-bar--success { background: var(--color-feedback-success); }
.mizu-data-table__loading-bar--info { background: var(--color-foreground-accent); }
.mizu-data-table__loading-bar--warning { background: var(--color-feedback-warning); }
.mizu-data-table__loading-bar--error { background: var(--color-feedback-error); }
.mizu-data-table__loading-bar--neutral { background: var(--color-foreground-tertiary); }

/* Animations */
.mizu-data-table__loading-bar--carousel {
  animation: mizu-table-carousel 2s ease-in-out infinite;
}

.mizu-data-table__loading-bar--carousel-inverse {
  animation: mizu-table-carousel-inverse 2s ease-in-out infinite;
}

.mizu-data-table__loading-bar--swing {
  animation: mizu-table-swing 2s ease-in-out infinite;
}

.mizu-data-table__loading-bar--elastic {
  animation: mizu-table-elastic 2s ease-in-out infinite;
}

@keyframes mizu-table-carousel {
  0% { left: 0; width: 0; }
  30% { left: 0; width: 40%; }
  50% { left: 60%; width: 0; }
  80% { left: 0; width: 0; }
  100% { left: 0; width: 0; }
}

@keyframes mizu-table-carousel-inverse {
  0% { right: 0; width: 0; left: auto; }
  30% { right: 0; width: 40%; left: auto; }
  50% { right: 60%; width: 0; left: auto; }
  80% { right: 0; width: 0; left: auto; }
  100% { right: 0; width: 0; left: auto; }
}

@keyframes mizu-table-swing {
  0% { left: 0; width: 0; }
  25% { left: 0; width: 50%; }
  50% { left: 50%; width: 0; }
  75% { left: 0; width: 0; }
  100% { left: 0; width: 0; }
}

@keyframes mizu-table-elastic {
  0% { left: 0; width: 0; }
  20% { left: 0; width: 30%; }
  35% { left: 0; width: 50%; }
  50% { left: 20%; width: 60%; }
  65% { left: 40%; width: 40%; }
  80% { left: 60%; width: 20%; }
  100% { left: 100%; width: 0; }
}

/* ── Caption ─────────────────────────────────────────────────────── */
.mizu-data-table__caption {
  @apply sr-only;
}

/* ── Wrapper ─────────────────────────────────────────────────────── */
.mizu-data-table__wrapper {
  @apply overflow-x-auto;
  width: 100%;
}

/* ── Table ───────────────────────────────────────────────────────── */
.mizu-data-table__table {
  border-collapse: collapse;
  width: 100%;
}

.mizu-data-table__table th:last-child,
.mizu-data-table__table td:last-child {
  width: 100%;
}

/* ── Thead ───────────────────────────────────────────────────────── */
.mizu-data-table__thead {
  width: 100%;
}

/* ── Th ──────────────────────────────────────────────────────────── */
.mizu-data-table__th {
  @apply text-left whitespace-nowrap select-none;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  padding: 10px 14px;
  color: var(--color-foreground-tertiary);
  border-bottom: 1px solid var(--color-surface-muted);
}

.mizu-data-table__th--sortable {
  @apply cursor-pointer;
}
.mizu-data-table__th--sortable:hover {
  color: var(--color-foreground-primary);
}

/* ── Th content ──────────────────────────────────────────────────── */
.mizu-data-table__th-content {
  @apply inline-flex items-center gap-1.5;
}

/* ── Sort icon ───────────────────────────────────────────────────── */
.mizu-data-table__sort-icon {
  @apply inline-flex;
  opacity: 0;
  transition: opacity 150ms;
}

.mizu-data-table__th:hover .mizu-data-table__sort-icon {
  opacity: 0.5;
}

.mizu-data-table__sort-icon-svg {
  @apply w-3.5 h-3.5;
}
.mizu-data-table__sort-icon--inactive {
  opacity: 0.3;
}

.mizu-data-table__th:hover .mizu-data-table__sort-icon--inactive {
  opacity: 0.5;
}

.mizu-data-table__sort-icon--active {
  opacity: 1 !important;
}

/* ── Tbody ───────────────────────────────────────────────────────── */
.mizu-data-table__tbody {
  background: var(--color-surface-base);
  width: 100%;
}

.mizu-data-table__tbody[data-selectable="true"] .mizu-data-table__row:hover {
  background: var(--color-surface-subtle);
}

.mizu-data-table__tbody[data-selectable="true"] .mizu-data-table__row {
  outline-color: var(--color-brand-ycp);
}

/* ── Pinned columns (sticky left/right) ─────────────────────────── */
.mizu-data-table__th[data-pinned="left"],
.mizu-data-table__td[data-pinned="left"] {
  @apply sticky left-0 z-[2];
  background: var(--color-surface-base);
}

.mizu-data-table__thead .mizu-data-table__th[data-pinned="left"] {
  background: var(--color-surface-subtle);
}

.mizu-data-table__th[data-pinned="right"],
.mizu-data-table__td[data-pinned="right"] {
  @apply sticky right-0 z-[2];
  background: var(--color-surface-base);
}

.mizu-data-table__thead .mizu-data-table__th[data-pinned="right"] {
  background: var(--color-surface-subtle);
}

.mizu-data-table__row[data-pinned] {
  box-shadow: inset 0 0 0 1px var(--color-brand-ycp-subtle);
}

/* ── Tr ──────────────────────────────────────────────────────────── */
/* ── Pinned columns (sticky left/right) ───────────────────────────── */
.mizu-data-table__th[data-pinned="left"],
.mizu-data-table__td[data-pinned="left"] {
  @apply sticky left-0 z-[2];
  background: var(--color-surface-base);
}

.mizu-data-table__thead .mizu-data-table__th[data-pinned="left"] {
  background: var(--color-surface-subtle);
}

.mizu-data-table__th[data-pinned="right"],
.mizu-data-table__td[data-pinned="right"] {
  @apply sticky right-0 z-[2];
  background: var(--color-surface-base);
}

.mizu-data-table__thead .mizu-data-table__th[data-pinned="right"] {
  background: var(--color-surface-subtle);
}

/* Pinned rows — subtle indicator */
.mizu-data-table__row[data-pinned] {
  box-shadow: inset 0 0 0 1px var(--color-brand-ycp-subtle);
}

/* ── Tr ──────────────────────────────────────────────────────────── */
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
.mizu-data-table__row[data-selected="true"] {
  cursor: default;
}

/* ── Td ──────────────────────────────────────────────────────────── */
.mizu-data-table__td {
  @apply text-sm;
  padding: 10px 14px;
  color: var(--color-foreground-primary);
  vertical-align: middle;
}

.mizu-data-table__th--select,
.mizu-data-table__td--select {
  @apply w-10;
  text-align: center;
}

/* ── Expanded ────────────────────────────────────────────────────── */
.mizu-data-table__expanded-td {
  padding: 0;
  background: var(--color-surface-subtle);
  border-bottom: 1px solid var(--color-surface-muted);
}

.mizu-data-table__expanded-code {
  padding: 12px 14px;
  @apply text-xs;
  color: var(--color-foreground-secondary);
  font-family: monospace;
  white-space: pre-wrap;
}

/* ── Tfoot ───────────────────────────────────────────────────────── */
.mizu-data-table__tf {
  @apply text-left text-xs font-semibold;
  padding: 10px 14px;
  color: var(--color-foreground-primary);
  border-top: 2px solid var(--color-surface-muted);
  background: var(--color-surface-subtle);
}

/* ── Loading / Empty ─────────────────────────────────────────────── */
.mizu-data-table__loading,
.mizu-data-table__empty {
  @apply text-center;
  padding: 40px 14px;
  color: var(--color-foreground-tertiary);
}

.mizu-data-table__loading {
  @apply inline-flex items-center justify-center gap-2;
}

/* ── Spinner ─────────────────────────────────────────────────────── */
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

/* ── Footer ──────────────────────────────────────────────────────── */
.mizu-data-table__footer {
  @apply flex items-center justify-between w-full;
  padding: 10px 14px;
  border-top: 1px solid var(--color-surface-muted);
  background: var(--color-surface-subtle);
}

.mizu-data-table__selection-info {
  @apply text-xs;
  color: var(--color-foreground-secondary);
}

/* ── Loading state ───────────────────────────────────────────────── */
.mizu-data-table--loading {
  @apply pointer-events-none;
  opacity: 0.7;
}

.mizu-data-table--loading .mizu-data-table__thead {
  position: relative;
}

.mizu-data-table--loading .mizu-data-table__thead::after {
  @apply absolute left-0 h-[2px];
  content: '';
  top: -2px;
  z-index: 20;
  background: var(--color-brand-ycp);
  animation: mizu-table-carousel 2s ease-in-out infinite;
}
</style>
