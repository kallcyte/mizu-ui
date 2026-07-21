<script setup lang="ts">
import { ref, h, resolveComponent, useTemplateRef, onMounted, onUnmounted, nextTick } from "vue";
import type { TableColumn, TableRow } from "@nuxt/ui";
import { getPaginationRowModel, getGroupedRowModel } from "@tanstack/vue-table";
import type { TableMeta, Row, Cell, GroupingOptions } from "@tanstack/vue-table";
import Sortable from "sortablejs";
import CodeCollapsible from "./CodeCollapsible.vue";

type SectionKey =
  | "basic"
  | "columns"
  | "loading"
  | "sorting"
  | "caption"
  | "empty"
  | "selection"
  | "expandable"
  | "pagination"
  | "column-filters"
  | "slots"
  | "row-actions"
  | "row-select-event"
  | "row-hover-event"
  | "row-context-menu"
  | "footer"
  | "span"
  | "visibility"
  | "global-filter"
  | "column-pinning"
  | "row-pinning"
  | "grouped"
  | "fetched"
  | "tree"
  | "scroll"
  | "drag-drop"
  | "virtualize"
  | "infinite-scroll"
  | "meta"
  | "sticky";

const props = defineProps<{ section?: SectionKey }>();
const show = (key: SectionKey) => !props.section || props.section === key;

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");
const UCheckbox = resolveComponent("UCheckbox");
const UDropdownMenu = resolveComponent("UDropdownMenu");

type Person = {
  id: number;
  name: string;
  title: string;
  email: string;
  role: string;
  status: "active" | "inactive";
};

const people: Person[] = [
  { id: 1, name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay@example.com", role: "Member", status: "active" },
  { id: 2, name: "Courtney Henry", title: "Designer", email: "courtney@example.com", role: "Admin", status: "active" },
  { id: 3, name: "Tom Cook", title: "Product Manager", email: "tom@example.com", role: "Member", status: "inactive" },
  { id: 4, name: "Whitney Francis", title: "Back-end Developer", email: "whitney@example.com", role: "Member", status: "active" },
  { id: 5, name: "Leonard Krasner", title: "Senior Designer", email: "leonard@example.com", role: "Admin", status: "inactive" },
  { id: 6, name: "Floyd Miles", title: "Front-end Developer", email: "floyd@example.com", role: "Member", status: "active" },
  { id: 7, name: "Emily Selman", title: "VP, User Experience", email: "emily@example.com", role: "Admin", status: "active" },
  { id: 8, name: "Kristin Watson", title: "Director of Product", email: "kristin@example.com", role: "Member", status: "inactive" },
];

// === Basic ===
const basicColumns: TableColumn<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];
const basicCode = `<UTable :data="people" :columns="columns" class="flex-1" />`;

// === Columns ===
const columns: TableColumn<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "email",
    header: ({ column }: any) => h(UButton, {
      color: "neutral", variant: "ghost", label: "Email",
      icon: column.getIsSorted() ? (column.getIsSorted() === "asc" ? "i-lucide-arrow-up-narrow-wide" : "i-lucide-arrow-down-wide-narrow") : "i-lucide-arrow-up-down",
      class: "-mx-2.5",
      onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
    }),
  },
  {
    accessorKey: "role", header: "Role",
    cell: ({ row }: any) => h(UBadge, { color: row.getValue("role") === "Admin" ? "primary" : "neutral", variant: "subtle", class: "capitalize" }, () => row.getValue("role")),
  },
  {
    accessorKey: "status", header: "Status",
    cell: ({ row }: any) => {
      const s = row.getValue("status") as string;
      return h("span", { class: `inline-flex items-center gap-1.5 before:size-1.5 before:rounded-full ${s === "active" ? "text-success before:bg-success" : "text-muted before:bg-muted"}` }, s.charAt(0).toUpperCase() + s.slice(1));
    },
  },
];
const columnsCode = `<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

const columns: TableColumn<Person>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'title', header: 'Title' },
  {
    accessorKey: 'email',
    header: ({ column }) => h(UButton, {
      color: 'neutral', variant: 'ghost', label: 'Email',
      icon: column.getIsSorted()
        ? (column.getIsSorted() === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow')
        : 'i-lucide-arrow-up-down',
      class: '-mx-2.5',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    })
      },
      {
        accessorKey: 'role', header: 'Role',
        cell: ({ row }) => h(UBadge, { color: row.getValue('role') === 'Admin' ? 'primary' : 'neutral', variant: 'subtle', class: 'capitalize' }, () => row.getValue('role'))
      },
      {
        accessorKey: 'status', header: 'Status',
        cell: ({ row }) => {
          const s = row.getValue('status') as string
          return h('span', {
            class: \`inline-flex items-center gap-1.5 before:size-1.5 before:rounded-full \${s === 'active' ? 'text-success before:bg-success' : 'text-muted before:bg-muted'}\`
          }, s.charAt(0).toUpperCase() + s.slice(1))
        }
      }
    ]
    </` + `script>

    <template>
      <UTable :data="data" :columns="columns" class="flex-1" />
    </template>`;

// === Loading / Sorting / Caption / Empty ===
const sortCode = `<UTable :data="data" :sorting="[{ id: 'name', desc: false }]" class="flex-1" />`;
const loadingCode = `<UTable :data="data" loading loading-color="primary" loading-animation="carousel" class="flex-1" />`;
const captionCode = `<UTable :data="data" caption="Team members" class="flex-1" />`;
const emptyCode = `<UTable :data="[]" empty="No results found." class="flex-1" />`;

// === Row Selection ===
const selectColumns: TableColumn<Person>[] = [
  {
    id: "select",
    header: ({ table }: any) => h(UCheckbox, {
      modelValue: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
      "onUpdate:modelValue": (v: any) => table.toggleAllPageRowsSelected(!!v),
      "aria-label": "Select all",
    }),
    cell: ({ row }: any) => h(UCheckbox, {
      modelValue: row.getIsSelected(),
      "onUpdate:modelValue": (v: any) => row.toggleSelected(!!v),
      "aria-label": "Select row",
    }),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];
const rowSelection = ref({});
const selectionCode = `<script setup lang="ts">
import { h, resolveComponent, ref, useTemplateRef } from 'vue'
const UCheckbox = resolveComponent('UCheckbox')
const table = useTemplateRef('table')
const rowSelection = ref({})
const columns = [
  {
    id: 'select',
    header: ({ table }) => h(UCheckbox, {
      modelValue: table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
      'onUpdate:modelValue': (v) => table.toggleAllPageRowsSelected(!!v)
    }),
    cell: ({ row }) => h(UCheckbox, {
      modelValue: row.getIsSelected(),
      'onUpdate:modelValue': (v) => row.toggleSelected(!!v)
    })
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' }
]
</` + `script>

<template>
  <UTable ref="table" v-model:row-selection="rowSelection" :data="data" :columns="columns" class="flex-1" />
  <div class="text-sm text-muted px-4 pb-4">{{ table?.tableApi?.getFilteredSelectedRowModel().rows.length }} row(s) selected</div>
</template>`;

// === Expandable Rows ===
const expandColumns: TableColumn<Person>[] = [
  {
    id: "expand",
    cell: ({ row }: any) => h(UButton, {
      color: "neutral", variant: "ghost", icon: "i-lucide-chevron-down", square: true,
      "aria-label": "Expand",
      ui: { leadingIcon: ["transition-transform", row.getIsExpanded() ? "duration-200 rotate-180" : ""] },
      onClick: () => row.toggleExpanded(),
    }),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];
const expanded = ref({});
const expandCode = `<script setup lang="ts">
import { h, resolveComponent, ref } from 'vue'
const UButton = resolveComponent('UButton')
const columns = [
  {
    id: 'expand',
    cell: ({ row }) => h(UButton, {
      color: 'neutral', variant: 'ghost', icon: 'i-lucide-chevron-down', square: true,
      onClick: () => row.toggleExpanded()
    })
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' }
]
const expanded = ref({})
</` + `script>

<template>
  <UTable v-model:expanded="expanded" :data="data" :columns="columns" class="flex-1">
    <template #expanded="{ row }">
      <div class="px-4 py-2 text-sm text-muted">ID: {{ row.original.id }} | Title: {{ row.original.title }}</div>
    </template>
  </UTable>
</template>`;

// === Pagination ===
const paginatedData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  date: new Date(2024, 2, 11 - Math.floor(i / 3), 15 - i, 30).toISOString(),
  email: `user${i + 1}@example.com`,
  amount: Math.round(Math.random() * 900 + 100),
}));
const pagination = ref({ pageIndex: 0, pageSize: 5 });
const paginationTableRef = useTemplateRef("paginationTableRef");
const globalFilter = ref("");

const paginationCode = `<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'

const table = useTemplateRef('table')
const pagination = ref({ pageIndex: 0, pageSize: 5 })
</` + `script>

<template>
  <UTable ref="table" v-model:pagination="pagination" :data="data" :columns="columns"
    :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }" class="flex-1" />
  <div class="flex justify-end border-t pt-4 px-4">
    <UPagination
      :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
      :items-per-page="table?.tableApi?.getState().pagination.pageSize"
      :total="table?.tableApi?.getFilteredRowModel().rows.length"
      @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
  </div>
</template>`;

// === Column Filters ===
const filterTableRef = useTemplateRef("filterTableRef");
const emailFilter = ref("");
const columnFiltersCode = `<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
const table = useTemplateRef('table')
const filter = ref('')
</` + `script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <div class="flex px-4 py-3.5 border-b">
      <UInput v-model="filter" class="max-w-sm" placeholder="Filter emails..."
        @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)" />
    </div>
    <UTable ref="table" :data="data" :columns="columns" />
  </div>
</template>`;

// === Slots ===
const slotsCode = `<UTable :data="data" :columns="columns" class="flex-1">
  <template #name-cell="{ row }">
    <div class="flex items-center gap-3">
      <span class="size-10 rounded-full bg-elevated flex items-center justify-center text-sm font-medium">{{ row.original.name.charAt(0) }}</span>
      <div><p class="font-medium">{{ row.original.name }}</p><p class="text-xs text-muted">{{ row.original.title }}</p></div>
    </div>
  </template>
  <template #email-cell="{ row }">
    <span class="lowercase text-xs">{{ row.original.email }}</span>
  </template>
</UTable>`;

// === Row Actions ===
const actionColumns: TableColumn<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  {
    id: "actions",
    meta: { class: { td: "text-right" } },
    cell: ({ row }: any) => h(UDropdownMenu, {
      content: { align: "end" },
      items: [{ type: "label", label: "Actions" }, { label: "Copy name", onSelect() { navigator.clipboard.writeText(row.original.name); } }, { type: "separator" }, { label: "View profile" }],
      "aria-label": "Actions dropdown",
    }, () => h(UButton, { icon: "i-lucide-ellipsis-vertical", color: "neutral", variant: "ghost", "aria-label": "Actions dropdown" })),
  },
];
const rowActionsCode = `<script setup lang="ts">
import { h, resolveComponent } from 'vue'
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'email', header: 'Email' },
  {
    id: 'actions', meta: { class: { td: 'text-right' } },
    cell: ({ row }) => h(UDropdownMenu, {
      content: { align: 'end' },
      items: [
        { type: 'label', label: 'Actions' },
        { label: 'Copy name', onSelect() { navigator.clipboard.writeText(row.original.name) } },
        { type: 'separator' },
        { label: 'View profile' }
      ],
      'aria-label': 'Actions dropdown'
    }, () => h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost', 'aria-label': 'Actions dropdown' }))
  }
]
</` + `script>

<template>
  <UTable :data="data" :columns="columns" class="flex-1" />
</template>`;

// === Row Select Event ===
const selectEventMessage = ref("");
function onSelect(e: Event, row: TableRow<Person>) {
  selectEventMessage.value = `Clicked: ${row.original.name}`;
}
const rowSelectEventCode = `<UTable :data="data" :columns="columns" class="flex-1" @select="onSelect">
  ...
</UTable>
<!-- handler: onSelect(event: Event, row: TableRow<Person>) => row.toggleSelected() -->`;

// === Row Hover Event ===
const hoverMsg = ref("");
function onHover(e: Event, row: TableRow<Person> | null) {
  hoverMsg.value = row ? `Hovering: ${row.original.name}` : "";
}
const rowHoverEventCode = `<UTable :data="data" :columns="columns" class="flex-1" @hover="onHover">
  ...
</UTable>`;

// === Row Context Menu ===
const ctxMenuItems = ref<any[]>([]);
function onContextmenu(_e: Event, row: TableRow<Person>) {
  ctxMenuItems.value = [
    { type: "label", label: "Actions" },
    { label: `Copy "${row.original.name}"`, onSelect() { navigator.clipboard.writeText(row.original.name); } },
    { label: "View profile" },
  ];
}
const rowCtxCode = `<script setup lang="ts">
import { ref } from 'vue'
import type { ContextMenuItem, TableRow } from '@nuxt/ui'
const items = ref<ContextMenuItem[]>([])
function onContextmenu(_e: Event, row: TableRow<Person>) {
  items.value = [
    { type: 'label', label: 'Actions' },
    { label: \`Copy "\${row.original.name}"\`, onSelect() { navigator.clipboard.writeText(row.original.name) } },
    { label: 'View profile' }
  ]
}
</` + `script>

<template>
  <UContextMenu :items="items">
    <UTable :data="data" :columns="columns" class="flex-1" @contextmenu="onContextmenu" />
  </UContextMenu>
</template>`;

// === Global Filter ===
const globalFilterVal = ref("");
const globalFilterCode = `<UInput v-model="globalFilter" class="max-w-sm" placeholder="Search all columns..." />
<UTable v-model:global-filter="globalFilter" :data="data" :columns="columns" class="flex-1" />`;

// === Column Footer ===
const footerColumns: TableColumn<Person>[] = [
  { accessorKey: "name", header: "Name", footer: () => `${people.length} people` },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role", footer: () => `${people.filter(p => p.role === "Admin").length} admins` },
];
const footerCode = `const columns = [
  { accessorKey: 'name', header: 'Name', footer: () => \`\${data.length} people\` },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role', footer: () => \`\${data.filter(p => p.role === 'Admin').length} admins\` }
]
<UTable :data="data" :columns="columns" class="flex-1" />`;

// === Column Span ===
type Product = {
  category: string;
  name: string;
  price: number;
  stock: number;
};

const products = ref<Product[]>([
  { category: "Electronics", name: "Laptop", price: 999, stock: 45 },
  { category: "Electronics", name: "Phone", price: 699, stock: 120 },
  { category: "Electronics", name: "Tablet", price: 499, stock: 78 },
  { category: "Clothing", name: "T-Shirt", price: 29, stock: 200 },
  { category: "Clothing", name: "Jeans", price: 59, stock: 150 },
]);

function getCategoryRowSpan(cell: Cell<Product, unknown>) {
  const category = cell.row.original.category;
  const rows = cell.getContext().table.getRowModel().rows;
  const rowIndex = rows.findIndex((r: (typeof rows)[number]) => r.id === cell.row.id);
  if (rowIndex > 0 && rows[rowIndex - 1]!.original.category === category) return "1";
  let span = 1;
  for (let i = rowIndex + 1; i < rows.length; i++) {
    if (rows[i]!.original.category === category) span++;
    else break;
  }
  return `${span}`;
}

function getCategoryClass(cell: Cell<Product, unknown>) {
  const category = cell.row.original.category;
  const rows = cell.getContext().table.getRowModel().rows;
  const rowIndex = rows.findIndex((r: (typeof rows)[number]) => r.id === cell.row.id);
  if (rowIndex > 0 && rows[rowIndex - 1]!.original.category === category) return "hidden";
  return "font-medium align-middle border-r border-default";
}

const spanColumns: TableColumn<Product>[] = [
  {
    accessorKey: "category",
    header: "Category",
    meta: {
      rowspan: { td: getCategoryRowSpan },
      class: { td: getCategoryClass },
    },
  },
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "price",
    header: "Price",
    meta: { class: { th: "text-right", td: "text-right" } },
    cell: ({ row }) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(row.getValue("price")),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    meta: { class: { th: "text-right", td: "text-right" } },
  },
];

const spanCode = `import type { TableColumn } from '@nuxt/ui'
import type { Cell } from '@tanstack/vue-table'

type Product = {
  category: string
  name: string
  price: number
  stock: number
}

const data = ref<Product[]>([
  { category: 'Electronics', name: 'Laptop', price: 999, stock: 45 },
  { category: 'Electronics', name: 'Phone', price: 699, stock: 120 },
  { category: 'Electronics', name: 'Tablet', price: 499, stock: 78 },
  { category: 'Clothing', name: 'T-Shirt', price: 29, stock: 200 },
  { category: 'Clothing', name: 'Jeans', price: 59, stock: 150 }
])

function getCategoryRowSpan(cell: Cell<Product, unknown>) {
  const category = cell.row.original.category
  const rows = cell.getContext().table.getRowModel().rows
  const rowIndex = rows.findIndex(r => r.id === cell.row.id)
  if (rowIndex > 0 && rows[rowIndex - 1].original.category === category) return '1'
  let span = 1
  for (let i = rowIndex + 1; i < rows.length; i++) {
    if (rows[i].original.category === category) span++
    else break
  }
  return \`\${span}\`
}

function getCategoryClass(cell: Cell<Product, unknown>) {
  const category = cell.row.original.category
  const rows = cell.getContext().table.getRowModel().rows
  const rowIndex = rows.findIndex(r => r.id === cell.row.id)
  if (rowIndex > 0 && rows[rowIndex - 1].original.category === category) return 'hidden'
  return 'font-medium align-middle border-r border-default'
}

const columns: TableColumn<Product>[] = [
  {
    accessorKey: 'category',
    header: 'Category',
    meta: {
      rowspan: { td: getCategoryRowSpan },
      class: { td: getCategoryClass }
    }
  },
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'price',
    header: 'Price',
    meta: { class: { th: 'text-right', td: 'text-right' } },
    cell: ({ row }) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.getValue('price'))
  },
  { accessorKey: 'stock', header: 'Stock', meta: { class: { th: 'text-right', td: 'text-right' } } }
  ]

  const data = ref<Product[]>([
    { category: 'Electronics', name: 'Laptop', price: 999, stock: 45 },
    { category: 'Electronics', name: 'Phone', price: 699, stock: 120 },
    { category: 'Electronics', name: 'Tablet', price: 499, stock: 78 },
    { category: 'Clothing', name: 'T-Shirt', price: 29, stock: 200 },
    { category: 'Clothing', name: 'Jeans', price: 59, stock: 150 }
  ])
  </` + `script>

  <template>
    <UTable :data="data" :columns="columns" class="flex-1" />
  </template>`;

// === Column Visibility ===
const visColumns: TableColumn<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email", enableHiding: true },
  { accessorKey: "role", header: "Role", enableHiding: true },
];
const visTableRef = useTemplateRef("visTableRef");
const visibilityCode = `<script setup lang="ts">
const table = useTemplateRef('table')
</` + `script>

<template>
  <UDropdownMenu
    :items="table?.tableApi?.getAllColumns().filter(c => c.getCanHide()).map(c => ({
      label: c.id, type: 'checkbox', checked: c.getIsVisible(),
      onUpdateChecked: (v) => table?.tableApi?.getColumn(c.id)?.toggleVisibility(!!v),
      onSelect: (e) => e.preventDefault()
    }))"
    :content="{ align: 'end' }">
    <UButton label="Columns" color="neutral" variant="outline" trailing-icon="i-lucide-chevron-down" />
  </UDropdownMenu>
  <UTable ref="table" :data="data" :columns="columns" class="flex-1" />
</template>`;

// === Column Pinning ===
const pinColTableRef = useTemplateRef("pinColTableRef");
const colPinningCols: TableColumn<Person>[] = [
  { accessorKey: "id", header: "ID", size: 50 },
  { accessorKey: "name", header: "Name", size: 150 },
  { accessorKey: "title", header: "Title", size: 200 },
  { accessorKey: "email", header: "Email", size: 250 },
  { accessorKey: "role", header: "Role", size: 100 },
  { accessorKey: "status", header: "Status", size: 100 },
  { id: "extra1", header: "Notes", cell: () => "—", size: 150 },
  {
    id: "extra2",
    header: "Department",
    cell: () => "Engineering",
    size: 150,
    meta: {
      class: {
        th: "bg-white/80 backdrop-blur shadow-xl",
        td: "bg-white/80 backdrop-blur shadow-xl",
      },
    },
  },
];
const colPinningState = ref({ left: ["id", "name"], right: ["extra2"] });
const colPinningCode = `<script setup lang="ts">
import type { ColumnPinningState } from '@tanstack/vue-table'
const columnPinning = ref<ColumnPinningState>({ left: ['id', 'name'], right: ['extra2'] })
</` + `script>

<template>
  <div style="overflow-x:auto;border:1px solid var(--ui-border);border-radius:6px;">
    <UTable
      v-model:column-pinning="columnPinning"
      :data="data"
      :columns="columns"
      class="flex-1"
    />
  </div>
</template>`;

// === Row Pinning ===
const rowPinTableRef = useTemplateRef("rowPinTableRef");
const rowPinCols: TableColumn<Person>[] = [
  {
    id: "pin",
    cell: ({ row }: any) => h(UButton, {
      icon: "i-lucide-star",
      color: row.getIsPinned() ? "primary" : "neutral",
      variant: "ghost",
      "aria-label": row.getIsPinned() ? "Unpin" : "Pin",
      onClick: () => row.getIsPinned() ? row.pin(false) : row.pin("top"),
    }),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];
const rowPinning = ref<{ top: number[]; bottom: number[] }>({ top: [1, 3], bottom: [] });
const rowPinningCode = `<script setup lang="ts">
import type { RowPinningState } from '@tanstack/table-core'
const rowPinning = ref<RowPinningState>({ top: ['2', '4'], bottom: [] })
</` + `script>

<template>
  <UTable v-model:row-pinning="rowPinning" :data="data" :columns="columns"
    :get-row-id="(row) => row.id" class="flex-1 h-96" />
</template>`;

// === Grouped Rows ===
type Account = { id: string; name: string };
type PaymentStatus = "paid" | "failed" | "refunded";
type Payment = { id: string; date: string; status: PaymentStatus; email: string; amount: number; account: Account };

const getColorByStatus = (status: PaymentStatus): "success" | "error" | "neutral" =>
  ({ paid: "success", failed: "error", refunded: "neutral" }[status]);

const groupedData = ref<Payment[]>([
  { id: "4600", date: "2024-03-11T15:30:00", status: "paid", email: "james.anderson@example.com", amount: 594, account: { id: "1", name: "Account 1" } },
  { id: "4599", date: "2024-03-11T10:10:00", status: "failed", email: "mia.white@example.com", amount: 276, account: { id: "2", name: "Account 2" } },
  { id: "4598", date: "2024-03-11T08:50:00", status: "refunded", email: "william.brown@example.com", amount: 315, account: { id: "1", name: "Account 1" } },
  { id: "4597", date: "2024-03-10T19:45:00", status: "paid", email: "emma.davis@example.com", amount: 529, account: { id: "2", name: "Account 2" } },
  { id: "4596", date: "2024-03-10T15:55:00", status: "paid", email: "ethan.harris@example.com", amount: 639, account: { id: "1", name: "Account 1" } },
]);

const groupedCols: TableColumn<Payment>[] = [
  { id: "title", header: "Item" },
  { id: "account_id", accessorKey: "account.id" },
  { accessorKey: "id", header: "#", cell: ({ row }: { row: Row<Payment> }) => row.getIsGrouped() ? `${row.getValue("id")} records` : `#${row.getValue("id")}`, aggregationFn: "count" },
  { accessorKey: "date", header: "Date", cell: ({ row }: { row: Row<Payment> }) => row.getIsGrouped() ? null : new Date(row.getValue("date")).toLocaleString("en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false }), aggregationFn: "max" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "email", header: "Email", meta: { class: { td: "w-full" } }, cell: ({ row }: { row: Row<Payment> }) => row.getIsGrouped() ? `${row.getValue("email")} customers` : row.getValue("email"), aggregationFn: "uniqueCount" },
  { accessorKey: "amount", header: "Amount", meta: { class: { th: "text-right", td: "text-right font-medium" } }, cell: ({ row }: { row: Row<Payment> }) => row.getIsGrouped() ? null : new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(Number.parseFloat(row.getValue("amount"))), aggregationFn: "sum" },
];

const groupingOp = ref<GroupingOptions>({ groupedColumnMode: "remove", getGroupedRowModel: getGroupedRowModel() });

const groupedCode = `import { ref } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { getGroupedRowModel } from '@tanstack/vue-table'
import type { GroupingOptions } from '@tanstack/vue-table'

type Account = { id: string; name: string }
type PaymentStatus = 'paid' | 'failed' | 'refunded'
type Payment = {
  id: string; date: string; status: PaymentStatus
  email: string; amount: number; account: Account
}

const groupedData = ref<Payment[]>([/* ...records */])

const groupedCols: TableColumn<Payment>[] = [
  { id: 'title', header: 'Item' },
  { id: 'account_id', accessorKey: 'account.id' },
  { accessorKey: 'id', header: '#', cell: ({ row }) => row.getIsGrouped() ? \`\${row.getValue('id')} records\` : \`#\${row.getValue('id')}\`, aggregationFn: 'count' },
  { accessorKey: 'date', header: 'Date', cell: ({ row }) => row.getIsGrouped() ? null : new Date(row.getValue('date')).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }), aggregationFn: 'max' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'email', header: 'Email', meta: { class: { td: 'w-full' } }, cell: ({ row }) => row.getIsGrouped() ? \`\${row.getValue('email')} customers\` : row.getValue('email'), aggregationFn: 'uniqueCount' },
  { accessorKey: 'amount', header: 'Amount', meta: { class: { th: 'text-right', td: 'text-right font-medium' } }, cell: ({ row }) => row.getIsGrouped() ? null : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(Number.parseFloat(row.getValue('amount'))), aggregationFn: 'sum' },
]

const groupingOp = ref<GroupingOptions>({ groupedColumnMode: 'remove', getGroupedRowModel: getGroupedRowModel() })
</` + `script>

<template>
  <UTable :data="groupedData" :columns="groupedCols" :grouping="['account_id', 'status']" :grouping-options="groupingOp" :ui="{ root: 'min-w-full', td: 'empty:p-0' }" class="flex-1">
    <template #title-cell="{ row }">
      <div v-if="row.getIsGrouped()" class="flex items-center">
        <span class="inline-block" :style="{ width: \`calc(\${row.depth} * 1rem)\` }" />
        <UButton variant="outline" color="neutral" class="mr-2" size="xs" :icon="row.getIsExpanded() ? 'i-lucide-minus' : 'i-lucide-plus'" @click="row.toggleExpanded()" />
        <strong v-if="row.groupingColumnId === 'account_id'">{{ row.original.account.name }}</strong>
        <UBadge v-else-if="row.groupingColumnId === 'status'" :color="getColorByStatus(row.original.status)" class="capitalize" variant="subtle">
          {{ row.original.status }}
        </UBadge>
      </div>
    </template>
  </UTable>
</template>`;

// === Fetch Data ===
const fetchedData = ref<Person[]>([]);
const fetchLoading = ref(false);
const fetchTableRef = useTemplateRef("fetchTableRef");
function loadData() {
  fetchLoading.value = true;
  fetchedData.value = [];
  setTimeout(() => {
    fetchedData.value = people.slice(0, 3);
    fetchLoading.value = false;
  }, 1500);
}
const fetchCode = `<script setup lang="ts">
const data = ref([])
const loading = ref(false)
async function loadData() {
  loading.value = true
  data.value = await fetch('/api/people').then(r => r.json())
  loading.value = false
}
</` + `script>

<template>
  <UButton label="Load Data" @click="loadData" :loading="loading" class="mb-4" />
  <UTable :data="data" :columns="columns" class="flex-1" />
</template>`;

// === Tree Data ===
const treeCols: TableColumn<any>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }: any) => h("div", {
      style: { paddingLeft: `${row.depth}rem` },
      class: "flex items-center gap-2",
    }, [
      h(UButton, {
        color: "neutral",
        variant: "outline",
        size: "xs",
        icon: row.getIsExpanded() ? "i-lucide-minus" : "i-lucide-plus",
        class: !row.getCanExpand() && "invisible",
        ui: { base: "p-0 rounded-sm", leadingIcon: "size-4" },
        onClick: row.getToggleExpandedHandler(),
      }),
      h("span", { class: "font-medium" }, row.getValue("name")),
    ]),
  },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email", cell: ({ row }: any) => h("span", { class: "lowercase text-xs" }, row.getValue("email")) },
];
type TreeNode = { id: number; name: string; title: string; email: string; children?: TreeNode[] };
const treeData = ref<TreeNode[]>([
  {
    id: 1, name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay@example.com",
    children: [
      { id: 2, name: "Courtney Henry", title: "Designer", email: "courtney@example.com" },
      {
        id: 3, name: "Tom Cook", title: "Product Manager", email: "tom@example.com",
        children: [
          { id: 8, name: "Joe Bloggs", title: "Sub-designer", email: "joe@example.com" },
        ],
      },
    ],
  },
  {
    id: 4, name: "Whitney Francis", title: "Back-end Developer", email: "whitney@example.com",
    children: [
      { id: 5, name: "Leonard Krasner", title: "Senior Designer", email: "leonard@example.com" },
    ],
  },
  { id: 6, name: "Floyd Miles", title: "Principal Designer", email: "floyd@example.com" },
]);
const treeCode = `<script setup lang="ts">
const data = [
  { id: 1, name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay@example.com',
    children: [
      { id: 2, name: 'Courtney Henry', title: 'Designer', email: 'courtney@example.com' },
      { id: 3, name: 'Tom Cook', title: 'Product Manager', email: 'tom@example.com',
        children: [
          { id: 8, name: 'Joe Bloggs', title: 'Sub-designer', email: 'joe@example.com' },
        ]
      },
    ]
  },
  { id: 4, name: 'Whitney Francis', title: 'Back-end Developer', email: 'whitney@example.com',
    children: [
      { id: 5, name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard@example.com' },
    ]
  },
  { id: 6, name: 'Floyd Miles', title: 'Principal Designer', email: 'floyd@example.com' },
]

const columns = [{
  id: 'name', header: 'Name',
  cell: ({ row }) => h('div', {
    style: { paddingLeft: \`\${row.depth}rem\` }, class: 'flex items-center gap-2'
  }, [
    h(resolveComponent('UButton'), {
      color: 'neutral', variant: 'outline', size: 'xs',
      icon: row.getIsExpanded() ? 'i-lucide-minus' : 'i-lucide-plus',
      class: !row.getCanExpand() && 'invisible',
      ui: { base: 'p-0 rounded-sm', leadingIcon: 'size-4' },
      onClick: row.getToggleExpandedHandler(),
    }),
    h('span', { class: 'font-medium' }, row.getValue('name')),
  ])
}]
</` + `script>

<template>
  <UTable
    :data="data"
    :columns="columns"
    :get-sub-rows="(row) => row.children"
    class="flex-1"
    :ui="{
      base: 'border-separate border-spacing-0',
      tbody: '[&>tr]:last:[&>td]:border-b-0',
      tr: 'group',
      td: 'empty:p-0 group-has-[td:not(:empty)]:border-b border-default'
    }"
  />
</template>`;

// === External Scroll ===
const scrollCols: TableColumn<Person>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];
const scrollCode = `<div style="overflow-x:auto;max-width:320px;">
  <UTable :data="data" :columns="columns" class="flex-1" style="min-width:500px" />
</div>`;

// === Drag & Drop ===
const dndData = ref([...people.map((p, i) => ({ ...p, id: i + 1 }))]);
const dndCols: TableColumn<any>[] = [
  {
    id: "drag", header: "",
    cell: () => h("span", { class: "cursor-grab text-muted select-none", innerHTML: "&#x2630;" }),
    size: 30,
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
];
const dndTableRef = useTemplateRef("dndTableRef");
function shuffle() { dndData.value = [...dndData.value].sort(() => Math.random() - 0.5); }
onMounted(() => { loadInfScrollPage(true); });
onMounted(async () => {
  await nextTick();
  const el = dndTableRef.value?.$el?.querySelector("tbody");
  if (el) {
    Sortable.create(el as HTMLElement, {
      handle: ".cursor-grab",
      animation: 150,
      onEnd(evt) {
        if (evt.oldIndex == null || evt.newIndex == null) return;
        const items = [...dndData.value];
        const [moved] = items.splice(evt.oldIndex, 1);
        items.splice(evt.newIndex, 0, moved);
        dndData.value = items;
      },
    });
  }
});
const dndCode = `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Sortable from 'sortablejs'

const data = ref([...])
const tableRef = useTemplateRef('table')

onMounted(() => {
  const tbody = tableRef.value?.$el?.querySelector('tbody')
  if (tbody) {
    Sortable.create(tbody, {
      handle: '.cursor-grab',
      animation: 150,
      onEnd(evt) {
        const items = [...data.value]
        const [moved] = items.splice(evt.oldIndex!, 1)
        items.splice(evt.newIndex!, 0, moved)
        data.value = items
      }
    })
  }
})

function shuffle() {
  data.value = [...data.value].sort(() => Math.random() - 0.5)
}
</` + `script>

<template>
  <div class="flex flex-col gap-2">
    <UTable ref="table" :data="data" :columns="columns" class="flex-1" />
    <UButton size="xs" variant="outline" label="Shuffle" @click="shuffle" class="w-fit" />
  </div>
</template>`;

// === Virtualize ===
const virtualData = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  title: ["Developer", "Designer", "Manager"][i % 3],
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : "Member",
  status: "active",
}));
const virtualCols: TableColumn<any>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
];
const virtualizeCode = `<UTable :data="data" :columns="columns" virtualize class="flex-1 h-80" />`;

// === Meta (tr class) ===
const metaCols: TableColumn<Person>[] = [
  { accessorKey: "name", header: "Name", meta: { class: { th: "text-left font-semibold", td: "font-medium" } } },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
];
const metaData: TableMeta<Person> = {
  class: {
    tr: (row: Row<Person>) => {
      if (row.original.status === "inactive") return "opacity-60";
      return "";
    },
  },
};
const metaCode = `<script setup lang="ts">
import type { TableMeta, Row } from '@tanstack/vue-table'

const meta: TableMeta<Person> = {
  class: {
    tr: (row: Row<Person>) => row.original.status === 'inactive' ? 'opacity-60' : ''
  }
}
</` + `script>

<template>
  <UTable :data="data" :columns="columns" :meta="meta" class="flex-1" />
</template>`;

// === Sticky ===
const stickyCols: TableColumn<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];
const stickyCode = `<UTable sticky :data="data" :columns="columns" class="flex-1 max-h-[200px]" />`;

// === Infinite Scroll ===
const infScrollData = ref<any[]>([]);
const infScrollLoading = ref(false);
const infScrollPage = ref(0);
const infScrollTotal = ref(0);
const infScrollSentinel = ref<HTMLElement | null>(null);
let infScrollObserver: IntersectionObserver | null = null;

function loadInfScrollPage(reset = false) {
  if (infScrollLoading.value) return;
  infScrollLoading.value = true;
  if (reset) { infScrollData.value = []; infScrollPage.value = 0; }
  setTimeout(() => {
    const start = infScrollPage.value * 20;
    const newItems = Array.from({ length: 20 }, (_, i) => ({
      id: start + i + 1,
      name: `User ${start + i + 1}`,
      title: ["Developer", "Designer", "Manager"][(start + i) % 3],
      email: `user${start + i + 1}@example.com`,
      role: (start + i) % 3 === 0 ? "Admin" : "Member",
      status: "active",
    }));
    infScrollData.value = reset ? newItems : [...infScrollData.value, ...newItems];
    infScrollPage.value++;
    infScrollTotal.value = infScrollData.value.length;
    infScrollLoading.value = false;
  }, 600);
}

onMounted(() => {
  loadInfScrollPage(true);
  infScrollObserver = new IntersectionObserver(
    (entries) => { if (entries[0]?.isIntersecting) loadInfScrollPage(); },
    { rootMargin: "200px" }
  );
  nextTick(() => { if (infScrollSentinel.value) infScrollObserver?.observe(infScrollSentinel.value); });
});
onUnmounted(() => infScrollObserver?.disconnect());

const infScrollCode = `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const data = ref([])
const loading = ref(false)
const page = ref(0)
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

function loadMore() {
  if (loading.value) return
  loading.value = true
  setTimeout(() => {
    const newRows = Array.from({ length: 20 }, (_, i) => ({
      id: page.value * 20 + i + 1,
      name: \`User \${page.value * 20 + i + 1}\`,
      title: ['Developer', 'Designer', 'Manager'][i % 3],
      email: \`user\${page.value * 20 + i + 1}@example.com\`,
    }))
    data.value = [...data.value, ...newRows]
    page.value++
    loading.value = false
  }, 800)
}

onMounted(() => {
  loadMore()
  observer = new IntersectionObserver(
    (entries) => { if (entries[0]?.isIntersecting) loadMore() },
    { rootMargin: '200px' }
  )
  if (sentinel.value) observer.observe(sentinel.value)
})
onUnmounted(() => observer?.disconnect())
</` + `script>

<template>
  <div style="max-height:320px;overflow-y:auto" class="border rounded-md">
    <UTable :data="data" :columns="columns" class="flex-1" :loading="loading" />
    <div ref="sentinel" class="h-4" />
  </div>
</template>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <!-- 1. Basic -->
    <section v-if="show('basic')" class="example-section">
      <CodeCollapsible :code="basicCode">
        <div class="demo-row"><UTable :data="people" :columns="basicColumns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 2. Columns -->
    <section v-if="show('columns')" class="example-section">
      <CodeCollapsible :code="columnsCode">
        <div class="demo-row"><UTable :data="people" :columns="columns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 3. Loading -->
    <section v-if="show('loading')" class="example-section">
      <CodeCollapsible :code="loadingCode">
        <div class="demo-row"><UTable :data="people" :columns="basicColumns" loading loading-color="primary" loading-animation="carousel" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 4. Sorting -->
    <section v-if="show('sorting')" class="example-section">
      <CodeCollapsible :code="sortCode">
        <div class="demo-row"><UTable :data="people" :columns="basicColumns" :sorting="[{ id: 'name', desc: false }]" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 5. Caption -->
    <section v-if="show('caption')" class="example-section">
      <CodeCollapsible :code="captionCode">
        <div class="demo-row"><UTable :data="people" :columns="basicColumns" caption="Team members" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 6. Empty State -->
    <section v-if="show('empty')" class="example-section">
      <CodeCollapsible :code="emptyCode">
        <div class="demo-row"><UTable :data="[]" :columns="basicColumns" empty="No results found." class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 7. Row Selection -->
    <section v-if="show('selection')" class="example-section">
      <CodeCollapsible :code="selectionCode">
        <div class="demo-row"><UTable v-model:row-selection="rowSelection" :data="people" :columns="selectColumns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 8. Expandable Rows -->
    <section v-if="show('expandable')" class="example-section">
      <CodeCollapsible :code="expandCode">
        <div class="demo-row">
          <UTable v-model:expanded="expanded" :data="people" :columns="expandColumns" class="flex-1">
            <template #expanded="{ row }">
              <div class="px-4 py-2 text-sm text-muted">ID: {{ (row.original as Person).id }} | Title: {{ (row.original as Person).title }}</div>
            </template>
          </UTable>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 9. Pagination -->
    <section v-if="show('pagination')" class="example-section">
      <CodeCollapsible :code="paginationCode">
        <div class="demo-col">
          <div class="w-full space-y-4">
            <UTable ref="paginationTableRef" v-model:pagination="pagination" v-model:global-filter="globalFilter" :data="paginatedData" :columns="[{ accessorKey: 'id', header: '#', cell: ({ row }: any) => `#${row.getValue('id')}` }, { accessorKey: 'date', header: 'Date', cell: ({ row }: any) => new Date(row.getValue('date')).toLocaleDateString() }, { accessorKey: 'email', header: 'Email' }, { accessorKey: 'amount', header: 'Amount', meta: { class: { th: 'text-right', td: 'text-right font-medium' } }, cell: ({ row }: any) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(row.getValue('amount'))) }]" :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }" class="flex-1" />
            <div class="flex justify-end border-t pt-4 px-4">
              <UPagination :page="(paginationTableRef?.tableApi?.getState().pagination.pageIndex || 0) + 1" :items-per-page="paginationTableRef?.tableApi?.getState().pagination.pageSize" :total="paginationTableRef?.tableApi?.getFilteredRowModel().rows.length" @update:page="(p: number) => paginationTableRef?.tableApi?.setPageIndex(p - 1)" />
            </div>
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 10. Column Filters -->
    <section v-if="show('column-filters')" class="example-section">
      <CodeCollapsible :code="columnFiltersCode">
        <div class="demo-col">
          <div class="flex flex-col flex-1 w-full">
            <div class="flex px-4 py-3.5 border-b">
              <UInput v-model="emailFilter" class="max-w-sm" placeholder="Filter emails..." @update:model-value="filterTableRef?.tableApi?.getColumn('email')?.setFilterValue($event)" />
            </div>
            <UTable ref="filterTableRef" :data="people" :columns="[{ accessorKey: 'name', header: 'Name' }, { accessorKey: 'title', header: 'Title' }, { accessorKey: 'email', header: 'Email' }, { accessorKey: 'role', header: 'Role' }]" class="flex-1" />
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 11. Slots -->
    <section v-if="show('slots')" class="example-section">
      <CodeCollapsible :code="slotsCode">
        <div class="demo-row">
          <UTable :data="people" :columns="[{ accessorKey: 'name', header: 'Name' }, { accessorKey: 'email', header: 'Email' }, { accessorKey: 'role', header: 'Role' }]" class="flex-1">
            <template #name-cell="{ row }">
              <div class="flex items-center gap-3">
                <span class="size-10 rounded-full bg-elevated flex items-center justify-center text-sm font-medium">{{ (row.original as Person).name.charAt(0) }}</span>
                <div><p class="font-medium">{{ (row.original as Person).name }}</p><p class="text-xs text-muted">{{ (row.original as Person).title }}</p></div>
              </div>
            </template>
            <template #email-cell="{ row }"><span class="lowercase text-xs">{{ (row.original as Person).email }}</span></template>
          </UTable>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 12. Row Actions -->
    <section v-if="show('row-actions')" class="example-section">
      <CodeCollapsible :code="rowActionsCode">
        <div class="demo-row"><UTable :data="people" :columns="actionColumns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 13. Row Select Event -->
    <section v-if="show('row-select-event')" class="example-section">
      <CodeCollapsible :code="rowSelectEventCode">
        <div class="demo-col">
          <UTable :data="people" :columns="basicColumns" class="flex-1" @select="onSelect" />
          <span class="demo-result" v-if="selectEventMessage">{{ selectEventMessage }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 14. Row Hover Event -->
    <section v-if="show('row-hover-event')" class="example-section">
      <CodeCollapsible :code="rowHoverEventCode">
        <div class="demo-col">
          <UTable :data="people" :columns="basicColumns" class="flex-1" @hover="onHover" />
          <span class="demo-result" v-if="hoverMsg">{{ hoverMsg }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 15. Row Context Menu -->
    <section v-if="show('row-context-menu')" class="example-section">
      <CodeCollapsible :code="rowCtxCode">
        <div class="demo-row">
          <UContextMenu :items="ctxMenuItems">
            <UTable :data="people" :columns="basicColumns" class="flex-1" @contextmenu="onContextmenu" />
          </UContextMenu>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 16. Column Footer -->
    <section v-if="show('footer')" class="example-section">
      <CodeCollapsible :code="footerCode">
        <div class="demo-row"><UTable :data="people" :columns="footerColumns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 17. Column Span -->
    <section v-if="show('span')" class="example-section">
      <CodeCollapsible :code="spanCode">
        <div class="demo-row"><UTable :data="products" :columns="spanColumns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 18. Column Visibility -->
    <section v-if="show('visibility')" class="example-section">
      <CodeCollapsible :code="visibilityCode">
        <div class="demo-col">
          <div class="flex justify-end mb-2">
            <UDropdownMenu
              :items="visTableRef?.tableApi?.getAllColumns().filter((c: any) => c.getCanHide()).map((c: any) => ({
                label: c.id,
                type: 'checkbox' as const,
                checked: c.getIsVisible(),
                onUpdateChecked: (v: boolean) => visTableRef?.tableApi?.getColumn(c.id)?.toggleVisibility(!!v),
                onSelect: (e: Event) => e.preventDefault(),
              }))"
              :content="{ align: 'end' }">
              <UButton label="Columns" color="neutral" variant="outline" trailing-icon="i-lucide-chevron-down" />
            </UDropdownMenu>
          </div>
          <UTable ref="visTableRef" :data="people" :columns="visColumns" class="flex-1" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 19. Global Filter -->
    <section v-if="show('global-filter')" class="example-section">
      <CodeCollapsible :code="globalFilterCode">
        <div class="demo-col">
          <UInput v-model="globalFilterVal" class="max-w-sm" placeholder="Search all columns..." />
          <UTable v-model:global-filter="globalFilterVal" :data="people" :columns="basicColumns" class="flex-1" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 20. Column Pinning -->
    <section v-if="show('column-pinning')" class="example-section">
      <CodeCollapsible :code="colPinningCode">
        <div style="overflow-x:auto;border:1px solid var(--ui-border);border-radius:6px;">
          <UTable ref="pinColTableRef" v-model:column-pinning="colPinningState" :data="people" :columns="colPinningCols" class="flex-1" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 21. Row Pinning -->
    <section v-if="show('row-pinning')" class="example-section">
      <CodeCollapsible :code="rowPinningCode">
        <div class="demo-row">
          <UTable ref="rowPinTableRef" v-model:row-pinning="rowPinning" :data="people" :columns="rowPinCols" :get-row-id="(row: Person) => row.id" class="flex-1 h-80" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 22. Grouped Rows -->
    <section v-if="show('grouped')" class="example-section">
      <CodeCollapsible :code="groupedCode">
        <div class="demo-row">
          <UTable :data="groupedData" :columns="groupedCols" :grouping="['account_id', 'status']" :grouping-options="groupingOp" :ui="{ root: 'min-w-full', td: 'empty:p-0' }" class="flex-1">
            <template #title-cell="{ row }">
              <div v-if="row.getIsGrouped()" class="flex items-center">
                <span class="inline-block" :style="{ width: `calc(${row.depth} * 1rem)` }" />
                <UButton variant="outline" color="neutral" class="mr-2" size="xs" :icon="row.getIsExpanded() ? 'i-lucide-minus' : 'i-lucide-plus'" @click="row.toggleExpanded()" />
                <strong v-if="row.groupingColumnId === 'account_id'">{{ row.original.account.name }}</strong>
                <UBadge v-else-if="row.groupingColumnId === 'status'" :color="getColorByStatus(row.original.status)" class="capitalize" variant="subtle">
                  {{ row.original.status }}
                </UBadge>
              </div>
            </template>
          </UTable>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 23. Fetched Data -->
    <section v-if="show('fetched')" class="example-section">
      <CodeCollapsible :code="fetchCode">
        <div class="demo-col">
          <UButton label="Load Data" @click="loadData" :loading="fetchLoading" class="mb-4" />
          <UTable ref="fetchTableRef" :data="fetchedData" :columns="basicColumns" class="flex-1" :loading="fetchLoading" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 24. Tree Data -->
    <section v-if="show('tree')" class="example-section">
          <CodeCollapsible :code="treeCode">
            <div class="demo-row">
              <UTable
                :data="treeData"
                :columns="treeCols"
                :get-sub-rows="(row: any) => row.children"
                class="flex-1"
                :ui="{
                  base: 'border-separate border-spacing-0',
                  tbody: '[&>tr]:last:[&>td]:border-b-0',
                  tr: 'group',
                  td: 'empty:p-0 group-has-[td:not(:empty)]:border-b border-default'
                }"
              />
            </div>
          </CodeCollapsible>
        </section>

    <!-- 25. External Scroll -->
    <section v-if="show('scroll')" class="example-section">
      <CodeCollapsible :code="scrollCode">
        <div class="demo-row" style="overflow-x:auto;max-width:320px;">
          <UTable :data="people" :columns="scrollCols" class="flex-1" style="min-width:500px" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 26. Drag & Drop -->
    <section v-if="show('drag-drop')" class="example-section">
      <CodeCollapsible :code="dndCode">
        <div class="demo-col">
          <UTable ref="dndTableRef" :data="dndData" :columns="dndCols" class="flex-1" />
          <UButton size="xs" variant="outline" label="Shuffle" @click="shuffle" class="w-fit" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 27. Virtualize -->
    <section v-if="show('virtualize')" class="example-section">
      <CodeCollapsible :code="virtualizeCode">
        <div class="demo-row">
          <UTable :data="virtualData" :columns="virtualCols" virtualize class="flex-1 h-80" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 28. Infinite Scroll -->
    <section v-if="show('infinite-scroll')" class="example-section">
      <CodeCollapsible :code="infScrollCode">
        <div class="demo-col">
          <p class="text-xs text-muted">{{ infScrollTotal }} rows loaded</p>
          <div style="max-height:320px;overflow-y:auto" class="border rounded-md">
            <UTable :data="infScrollData" :columns="virtualCols" class="flex-1" :loading="infScrollLoading" />
            <div ref="infScrollSentinel" class="h-px" />
          </div>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 29. Meta (tr class) -->
    <section v-if="show('meta')" class="example-section">
      <CodeCollapsible :code="metaCode">
        <div class="demo-row"><UTable :data="people" :columns="metaCols" :meta="metaData" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 30. Sticky -->
    <section v-if="show('sticky')" class="example-section">
      <CodeCollapsible :code="stickyCode">
        <div class="demo-row"><UTable sticky :data="people" :columns="stickyCols" class="flex-1 max-h-[200px]" /></div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.demo-examples { all: revert; display: flex; flex-direction: column; gap: 32px; font-family: inherit; }
.example-section { all: revert; display: flex; flex-direction: column; gap: 12px; }
.example-section h3 { all: revert; font-size: 14px; font-weight: 600; color: var(--sl-color-text); margin: 0; }
.demo-description { font-size: 13px; color: var(--sl-color-text-light); margin: 0; line-height: 1.5; }
.demo-description code { font-size: 12px; background: var(--color-surface-muted, #F3F4F6); padding: 2px 6px; border-radius: 4px; }
.demo-row { all: revert; display: flex; align-items: flex-start; gap: 8px; overflow-x: auto; }
.demo-col { all: revert; display: flex; flex-direction: column; gap: 8px; overflow-x: auto; }
.demo-result { font-size: 13px; color: var(--color-foreground-secondary, #4B5563); }
</style>
