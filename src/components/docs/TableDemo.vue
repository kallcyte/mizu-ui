<script setup lang="ts">
import { ref, h, resolveComponent, useTemplateRef, onMounted, nextTick } from "vue";
import type { TableColumn, TableRow } from "@nuxt/ui";
import { getPaginationRowModel, getGroupedRowModel } from "@tanstack/vue-table";
import Sortable from "sortablejs";
import CodeCollapsible from "./CodeCollapsible.vue";

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
    cell: ({ row }) => h(UBadge, { color: 'primary', variant: 'subtle', class: 'capitalize' }, () => row.getValue('role'))
  },
  {
    accessorKey: 'status', header: 'Status',
    cell: ({ row }) => {
      const s = row.getValue('status') as string
      return h('span', { class: s === 'active' ? 'text-success' : 'text-muted' }, s)
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
  <UTable ref="table" v-model:row-selection="rowSelection" :data="data" :columns="columns" />
  <div class="text-sm text-muted">{{ table?.tableApi?.getFilteredSelectedRowModel().rows.length }} row(s) selected</div>
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
      <div class="px-4 py-2 text-sm text-muted">Details for {{ row.original.name }}</div>
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
const paginationTableRef = useTemplateRef("paginationTable");
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
const filterTableRef = useTemplateRef("filterTable");
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
      items: [{ type: 'label', label: 'Actions' }, { label: 'Copy name', onSelect() { navigator.clipboard.writeText(row.original.name) } }],
      'aria-label': 'Actions dropdown'
    }, () => h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost' }))
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
import type { ContextMenuItem, TableRow } from '@nuxt/ui'
const items = ref<ContextMenuItem[]>([])
function onContextmenu(_e: Event, row: TableRow<Person>) {
  items.value = [{ label: 'Copy name', onSelect() { navigator.clipboard.writeText(row.original.name) } }]
}
</` + `script>

<template>
  <UContextMenu :items="items">
    <UTable :data="data" :columns="columns" class="flex-1" @contextmenu="onContextmenu" />
  </UContextMenu>
</template>`;

// === Global Filter ===
const globalFilterVal = ref("");
const globalFilterCode = `<UTable v-model:global-filter="globalFilter" :data="data" :columns="columns" class="flex-1" />
<UInput v-model="globalFilter" class="max-w-sm" placeholder="Search all columns..." />`;

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
const spanColumns: TableColumn<Person>[] = [
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "title", header: "Profile",
    meta: { colspan: { td: 2 } },
    cell: ({ row }: any) => h("div", { class: "flex flex-col gap-0.5" }, [h("span", { class: "font-medium" }, row.getValue("title")), h("span", { class: "text-xs text-muted lowercase" }, (row.original as Person).email)]),
  },
  { accessorKey: "email", header: "Email (hidden)" },
];
const spanCode = `// Column 2 spans across Column 3 via meta.colspan
{
  accessorKey: 'title',
  header: 'Profile',           // ← shown in header
  meta: { colspan: { td: 2 } },  // the cell occupies 2 columns
  cell: ({ row }) => h('div', { class: 'flex flex-col gap-0.5' }, [
    h('span', { class: 'font-medium' }, row.getValue('title')),
    h('span', { class: 'text-xs text-muted lowercase' }, row.original.email)
  ])
},
{
  accessorKey: 'email',
  header: 'Email (hidden)',    // ← header still shown, td hidden by span
}`;

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
  { id: "extra2", header: "Department", cell: () => "Engineering", size: 150 },
];
const colPinningState = ref({ left: ["id", "name"], right: [] });
const colPinningCode = `<script setup lang="ts">
import type { ColumnPinningState } from '@tanstack/vue-table'
const columnPinning = ref<ColumnPinningState>({ left: ['id', 'name'], right: [] })
</` + `script>

<template>
  <UTable v-model:column-pinning="columnPinning" :data="data" :columns="columns"
    class="flex-1 overflow-x-auto" :style="{ maxWidth: '400px' }" />
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
type PaymentItem = { account_id: string; name: string; status: string; email: string; amount: number };
const groupedData: PaymentItem[] = [
  { account_id: "A1", name: "James Anderson", status: "paid", email: "james@example.com", amount: 594 },
  { account_id: "A2", name: "Mia White", status: "failed", email: "mia@example.com", amount: 276 },
  { account_id: "A1", name: "William Brown", status: "refunded", email: "william@example.com", amount: 315 },
  { account_id: "A2", name: "Emma Davis", status: "paid", email: "emma@example.com", amount: 529 },
  { account_id: "A1", name: "Ethan Harris", status: "paid", email: "ethan@example.com", amount: 639 },
];
const groupedCols: TableColumn<PaymentItem>[] = [
  {
    id: "title", header: "Item",
    cell: ({ row }: any) => row.getIsGrouped()
      ? h("span", { class: "font-medium" }, `Group: ${row.getValue("title") || row.groupingColumnId}`)
      : h("span", {}, row.original.name),
  },
  { accessorKey: "email", header: "Email", aggregationFn: "uniqueCount", cell: ({ row }: any) => row.getIsGrouped() ? `${row.getValue("email")} customers` : row.getValue("email") },
  {
    accessorKey: "amount", header: "Amount",
    meta: { class: { th: "text-right", td: "text-right font-medium" } },
    cell: ({ row }: any) => !row.getIsGrouped() ? `$${row.getValue("amount")}` : `$${row.subRows.reduce((s: number, r: any) => s + r.original.amount, 0)}`,
    aggregationFn: "sum",
  },
];
const groupingOp = ref({ groupedColumnMode: "remove" as const, getGroupedRowModel: getGroupedRowModel() });
const groupedCode = `<script setup lang="ts">
import { getGroupedRowModel } from '@tanstack/vue-table'

const columns = [
  { id: 'title', header: 'Item', cell: ({ row }) => row.getIsGrouped() ? \`Group: \${row.groupingColumnId}\` : row.original.name },
  { accessorKey: 'email', header: 'Email', aggregationFn: 'uniqueCount', cell: ({ row }) => row.getIsGrouped() ? \`\${row.getValue('email')} customers\` : row.getValue('email') },
  { accessorKey: 'amount', header: 'Amount', aggregationFn: 'sum', cell: ({ row }) => row.getIsGrouped() ? \`$\${row.subRows.reduce((s, r) => s + r.original.amount, 0)}\` : \`$\${row.getValue('amount')}\` }
]

const options = ref({ groupedColumnMode: 'remove', getGroupedRowModel: getGroupedRowModel() })
</` + `script>

<template>
  <UTable :data="data" :columns="columns" :grouping="['account_id']"
    :grouping-options="options" class="flex-1" />
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
    id: "tree",
    header: "Name",
    cell: ({ row }: any) => {
      const indent = { paddingLeft: `${row.depth * 1.5}rem` };
      if (row.getCanExpand()) {
        return h("div", { class: "flex items-center gap-1", style: indent }, [
          h(UButton, {
            color: "neutral", variant: "ghost", icon: row.getIsExpanded() ? "i-lucide-chevron-down" : "i-lucide-chevron-right",
            square: true, size: "xs",
            ui: { leadingIcon: ["transition-transform", row.getIsExpanded() ? "duration-200 rotate-0" : ""] },
            onClick: () => row.toggleExpanded(),
          }),
          h("span", { class: "font-medium" }, row.getValue("name")),
        ]);
      }
      return h("span", { class: "font-medium", style: indent }, row.getValue("name"));
    },
  },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email", cell: ({ row }: any) => h("span", { class: "lowercase text-xs" }, row.getValue("email")) },
];
const treeData = ref([
  { id: 1, name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay@example.com", subRows: [
    { id: 2, name: "Courtney Henry", title: "Designer", email: "courtney@example.com" },
    { id: 3, name: "Tom Cook", title: "Product Manager", email: "tom@example.com" },
  ]},
  { id: 4, name: "Whitney Francis", title: "Back-end Developer", email: "whitney@example.com", subRows: [
    { id: 5, name: "Leonard Krasner", title: "Senior Designer", email: "leonard@example.com" },
  ]},
]);
const treeCode = `const data = [
  { id: 1, name: 'Parent', title: 'Lead', email: 'parent@ex.com', subRows: [
    { id: 2, name: 'Child 1', title: 'Dev', email: 'child1@ex.com' },
    { id: 3, name: 'Child 2', title: 'Design', email: 'child2@ex.com' }
  ]},
  { id: 4, name: 'Sibling', title: 'PM', email: 'sib@ex.com', subRows: [...] }
]

// Use row.getCanExpand() + row.depth + row.toggleExpanded()
<UTable :data="data" :columns="columns" class="flex-1" />`;

// === External Scroll ===
const scrollCols: TableColumn<Person>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];
const scrollCode = `<div class="overflow-x-auto max-w-xs">
  <UTable :data="data" :columns="columns" class="flex-1" />
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
</` + `script>

<template>
  <UTable ref="table" :data="data" :columns="columns" class="flex-1" />
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

// === Infinite Scroll ===
const infScrollCode = `<script setup lang="ts">
import { ref } from 'vue'

const data = ref([])
const page = ref(0)

async function onFetch({ pageIndex }: { pageIndex: number }) {
  const res = await fetch(\`/api/data?page=\${pageIndex}\`)
  const newRows = await res.json()
  data.value = pageIndex === 0 ? newRows : [...data.value, ...newRows]
}
</` + `script>

<template>
  <div style="max-height:320px;overflow-y:auto">
    <UTable :data="data" :columns="columns"
      :fetch-options="{ onFetch }" class="flex-1" />
  </div>
</template>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <!-- 1. Basic -->
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Render tabular data by passing <code>:data</code> and <code>:columns</code>. Each column uses an <code>accessorKey</code> to map to data fields.</p>
      <CodeCollapsible :code="basicCode">
        <div class="demo-row"><UTable :data="people" :columns="basicColumns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 2. Columns -->
    <section class="example-section">
      <h3>Columns</h3>
      <p class="demo-description">Use Vue's <code>h()</code> render function and <code>resolveComponent</code> to render custom cells with badges, sortable button headers, and status indicators.</p>
      <CodeCollapsible :code="columnsCode">
        <div class="demo-row"><UTable :data="people" :columns="columns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 3. Loading -->
    <section class="example-section">
      <h3>Loading</h3>
      <p class="demo-description">Show a loading state with a progress bar using <code>loading</code>, <code>loading-color</code>, and <code>loading-animation</code>. The loading bar renders below the header while data is visible underneath.</p>
      <CodeCollapsible :code="loadingCode">
        <div class="demo-row"><UTable :data="people" :columns="basicColumns" loading loading-color="primary" loading-animation="carousel" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 4. Sorting -->
    <section class="example-section">
      <h3>Sorting</h3>
      <p class="demo-description">Enable sorting with <code>:sorting</code> (or <code>v-model:sorting</code>) to set initial sort state.</p>
      <CodeCollapsible :code="sortCode">
        <div class="demo-row"><UTable :data="people" :columns="basicColumns" :sorting="[{ id: 'name', desc: false }]" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 5. Caption -->
    <section class="example-section">
      <h3>Caption</h3>
      <p class="demo-description">Add a <code>caption</code> prop to display a descriptive title above the table. It renders as an HTML <code>&lt;caption&gt;</code> element for screen readers and visual context.</p>
      <CodeCollapsible :code="captionCode">
        <div class="demo-row"><UTable :data="people" :columns="basicColumns" caption="Team members" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 6. Empty State -->
    <section class="example-section">
      <h3>Empty State</h3>
      <p class="demo-description">Display a custom message when no data is available using the <code>empty</code> prop.</p>
      <CodeCollapsible :code="emptyCode">
        <div class="demo-row"><UTable :data="[]" :columns="basicColumns" empty="No results found." class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 7. Row Selection -->
    <section class="example-section">
      <h3>Row Selection</h3>
      <p class="demo-description">Add checkboxes to each row using TanStack Table's row selection API with custom <code>h()</code> header/cell renderers.</p>
      <CodeCollapsible :code="selectionCode">
        <div class="demo-row"><UTable v-model:row-selection="rowSelection" :data="people" :columns="selectColumns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 8. Expandable Rows -->
    <section class="example-section">
      <h3>Expandable Rows</h3>
      <p class="demo-description">Toggle expandable row content using the <code>#expanded</code> slot and a button in the column cell.</p>
      <CodeCollapsible :code="expandCode">
        <div class="demo-row">
          <UTable v-model:expanded="expanded" :data="people" :columns="expandColumns" class="flex-1">
            <template #expanded="{ row }">
              <div class="px-4 py-2 text-sm text-muted transition-all duration-200 ease-in-out">ID: {{ (row.original as Person).id }} | Title: {{ (row.original as Person).title }}</div>
            </template>
          </UTable>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 9. Pagination -->
    <section class="example-section">
      <h3>Pagination</h3>
      <p class="demo-description">Combine <code>UTable</code> with <code>UPagination</code>, using <code>getPaginationRowModel</code> from TanStack Table.</p>
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
    <section class="example-section">
      <h3>Column Filters</h3>
      <p class="demo-description">Filter rows by a specific column using the table API's <code>setFilterValue</code> with a <code>ref</code> bound to the input and the table ref.</p>
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
    <section class="example-section">
      <h3>Slots</h3>
      <p class="demo-description">Customize individual cells using named templates like <code>#name-cell</code> and <code>#email-cell</code> for rich row content.</p>
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
    <section class="example-section">
      <h3>Row Actions</h3>
      <p class="demo-description">Add a <code>UDropdownMenu</code> per row for contextual actions using a custom <code>actions</code> column with <code>h()</code>.</p>
      <CodeCollapsible :code="rowActionsCode">
        <div class="demo-row"><UTable :data="people" :columns="actionColumns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 13. Row Select Event -->
    <section class="example-section">
      <h3>Row Select Event</h3>
      <p class="demo-description">Use <code>@select</code> to make rows clickable. The handler receives <code>Event</code> and <code>TableRow</code>.</p>
      <CodeCollapsible :code="rowSelectEventCode">
        <div class="demo-col">
          <UTable :data="people" :columns="basicColumns" class="flex-1" @select="onSelect" />
          <span class="demo-result" v-if="selectEventMessage">{{ selectEventMessage }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 14. Row Hover Event -->
    <section class="example-section">
      <h3>Row Hover Event</h3>
      <p class="demo-description">Use <code>@hover</code> to track mouse hover on rows. Receives <code>Event</code> and <code>TableRow | null</code>.</p>
      <CodeCollapsible :code="rowHoverEventCode">
        <div class="demo-col">
          <UTable :data="people" :columns="basicColumns" class="flex-1" @hover="onHover" />
          <span class="demo-result" v-if="hoverMsg">{{ hoverMsg }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 15. Row Context Menu -->
    <section class="example-section">
      <h3>Row Context Menu</h3>
      <p class="demo-description">Wrap the table in <code>UContextMenu</code> and use <code>@contextmenu</code> to show row actions on right-click.</p>
      <CodeCollapsible :code="rowCtxCode">
        <div class="demo-row">
          <UContextMenu :items="ctxMenuItems">
            <UTable :data="people" :columns="basicColumns" class="flex-1" @contextmenu="onContextmenu" />
          </UContextMenu>
        </div>
      </CodeCollapsible>
    </section>

    <!-- 16. Column Footer -->
    <section class="example-section">
      <h3>Column Footer</h3>
      <p class="demo-description">Use the <code>footer</code> property on column definitions to render summary information below the table body.</p>
      <CodeCollapsible :code="footerCode">
        <div class="demo-row"><UTable :data="people" :columns="footerColumns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 17. Column Span -->
    <section class="example-section">
      <h3>Column Span</h3>
      <p class="demo-description">Use <code>meta.colspan</code> or <code>meta.rowspan</code> to merge cells across columns or rows.</p>
      <CodeCollapsible :code="spanCode">
        <div class="demo-row"><UTable :data="people" :columns="spanColumns" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 18. Column Visibility -->
    <section class="example-section">
      <h3>Column Visibility</h3>
      <p class="demo-description">Let users toggle column visibility using the table API's <code>toggleVisibility</code> with a dropdown menu.</p>
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
    <section class="example-section">
      <h3>Global Filter</h3>
      <p class="demo-description">Use <code>v-model:global-filter</code> to search across all columns simultaneously.</p>
      <CodeCollapsible :code="globalFilterCode">
        <div class="demo-col">
          <UInput v-model="globalFilterVal" class="max-w-sm" placeholder="Search all columns..." />
          <UTable v-model:global-filter="globalFilterVal" :data="people" :columns="basicColumns" class="flex-1" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 20. Column Pinning -->
    <section class="example-section">
      <h3>Column Pinning</h3>
      <p class="demo-description">Pin columns to the left or right using <code>v-model:column-pinning</code> so they stay visible during horizontal scroll. ID and Name are pinned left — scroll to see the effect.</p>
      <CodeCollapsible :code="colPinningCode">
        <div class="demo-row" style="overflow-x:auto;max-width:100%;">
          <UTable ref="pinColTableRef" v-model:column-pinning="colPinningState" :data="people" :columns="colPinningCols" class="flex-1" style="min-width:900px" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 21. Row Pinning -->
    <section class="example-section">
      <h3>Row Pinning</h3>
      <p class="demo-description">Pin rows to the top or bottom using <code>v-model:row-pinning</code> with <code>get-row-id</code>.</p>
      <CodeCollapsible :code="rowPinningCode">
        <div class="demo-row">
          <UTable ref="rowPinTableRef" v-model:row-pinning="rowPinning" :data="people" :columns="rowPinCols" :get-row-id="(row: Person) => row.id" class="flex-1 h-80" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 22. Grouped Rows -->
    <section class="example-section">
      <h3>Grouped Rows</h3>
      <p class="demo-description">Group rows by a column value using <code>:grouping</code> and <code>getGroupedRowModel</code>. Aggregated values show counts and sums per group.</p>
      <CodeCollapsible :code="groupedCode">
        <div class="demo-row">
          <UTable :data="groupedData" :columns="groupedCols" :grouping="['account_id']" :grouping-options="groupingOp" class="flex-1" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 23. Fetched Data -->
    <section class="example-section">
      <h3>Fetched Data</h3>
      <p class="demo-description">Load data asynchronously with <code>loading</code> state. The table clears data and shows a loading bar during fetch, then populates once the request completes.</p>
      <CodeCollapsible :code="fetchCode">
        <div class="demo-col">
          <UButton label="Load Data" @click="loadData" :loading="fetchLoading" class="mb-4" />
          <UTable ref="fetchTableRef" :data="fetchedData" :columns="basicColumns" class="flex-1" :loading="fetchLoading" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 24. Tree Data -->
    <section class="example-section">
      <h3>Tree Data</h3>
      <p class="demo-description">Render hierarchical data by adding <code>subRows</code> to data objects. Use <code>row.depth</code> for indentation.</p>
      <CodeCollapsible :code="treeCode">
        <div class="demo-row"><UTable :data="treeData" :columns="treeCols" class="flex-1" /></div>
      </CodeCollapsible>
    </section>

    <!-- 25. External Scroll -->
    <section class="example-section">
      <h3>External Scroll</h3>
      <p class="demo-description">Wrap the table in a scrollable container with <code>overflow-x-auto</code> for horizontal scrolling.</p>
      <CodeCollapsible :code="scrollCode">
        <div class="demo-row" style="overflow-x:auto;max-width:320px;">
          <UTable :data="people" :columns="scrollCols" class="flex-1" style="min-width:500px" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 26. Drag & Drop -->
    <section class="example-section">
      <h3>Drag &amp; Drop</h3>
      <p class="demo-description">Enable row reordering using <code>SortableJS</code> attached to the table's <code>&lt;tbody&gt;</code>. Drag the grab handle (&#x2630;) to reorder rows.</p>
      <CodeCollapsible :code="dndCode">
        <div class="demo-col">
          <UTable ref="dndTableRef" :data="dndData" :columns="dndCols" class="flex-1" />
          <UButton size="xs" variant="outline" label="Shuffle" @click="shuffle" class="w-fit" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 27. Virtualize -->
    <section class="example-section">
      <h3>Virtualize</h3>
      <p class="demo-description">Use the <code>virtualize</code> prop with a fixed height container for efficient rendering of thousands of rows.</p>
      <CodeCollapsible :code="virtualizeCode">
        <div class="demo-row">
          <UTable :data="virtualData" :columns="virtualCols" virtualize class="flex-1 h-80" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- 28. Infinite Scroll -->
    <section class="example-section">
      <h3>Infinite Scroll</h3>
      <p class="demo-description">Load more rows as the user scrolls using <code>fetch-options</code> with an <code>onFetch</code> callback. The table grows dynamically as new pages are fetched from the API.</p>
      <CodeCollapsible :code="infScrollCode">
        <div class="demo-col">
          <p class="text-xs text-muted">Mock: <b>{{ virtualData.length }}</b> rows loaded (simulates a fetched dataset). In production, replace with <code>onFetch</code> callback.</p>
          <div style="max-height:320px;overflow-y:auto" class="border rounded-md">
            <UTable :data="virtualData" :columns="virtualCols" class="flex-1" />
          </div>
        </div>
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
