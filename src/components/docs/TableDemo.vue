<script setup lang="ts">
import { ref, h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import CodeCollapsible from "./CodeCollapsible.vue";

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");
const UCheckbox = resolveComponent("UCheckbox");

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

const basicColumns: TableColumn<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];

const columns: TableColumn<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "email",
    header: ({ column }) => h(UButton, {
      color: "neutral",
      variant: "ghost",
      label: "Email",
      icon: column.getIsSorted() ? (column.getIsSorted() === "asc" ? "i-lucide-arrow-up-narrow-wide" : "i-lucide-arrow-down-wide-narrow") : "i-lucide-arrow-up-down",
      class: "-mx-2.5",
      onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
    }),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => h(UBadge, {
      color: row.getValue("role") === "Admin" ? "primary" : "neutral",
      variant: "subtle",
      class: "capitalize",
    }, () => row.getValue("role")),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.getValue("status") as string;
      return h("span", {
        class: `inline-flex items-center gap-1.5 before:size-1.5 before:rounded-full ${s === "active" ? "text-success before:bg-success" : "text-muted before:bg-muted"}`,
      }, s.charAt(0).toUpperCase() + s.slice(1));
    },
  },
];

const selectColumns: TableColumn<Person>[] = [
  {
    id: "select",
    header: ({ table }) => h(UCheckbox, {
      modelValue: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
      "onUpdate:modelValue": (value: boolean | "indeterminate") => table.toggleAllPageRowsSelected(!!value),
      "aria-label": "Select all",
    }),
    cell: ({ row }) => h(UCheckbox, {
      modelValue: row.getIsSelected(),
      "onUpdate:modelValue": (value: boolean | "indeterminate") => row.toggleSelected(!!value),
      "aria-label": "Select row",
    }),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];

const expandColumns: TableColumn<Person>[] = [
  {
    id: "expand",
    cell: ({ row }) => h(UButton, {
      color: "neutral",
      variant: "ghost",
      icon: "i-lucide-chevron-down",
      square: true,
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

const rowSelection = ref({});
const expanded = ref({});

const paginatedData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  title: ["Developer", "Designer", "Manager", "Lead"][i % 4],
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : "Member",
  status: i % 5 === 0 ? "inactive" : "active",
})) as Person[];

const pagination = ref({ pageIndex: 0, pageSize: 10 });

const basicCode = `<UTable :data="people" :columns="columns" class="flex-1" />`;

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
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => h(UBadge, { color: 'primary', variant: 'subtle', class: 'capitalize' }, () => row.getValue('role'))
  },
  {
    accessorKey: 'status',
    header: 'Status',
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

const loadingCode = `<UTable :data="people" loading loading-color="primary" loading-animation="carousel" class="flex-1" />`;

const sortCode = `<UTable
  :data="people"
  :sorting="[{ id: 'name', desc: false }]"
  class="flex-1"
/>`;

const captionCode = `<UTable :data="people" caption="Team members" class="flex-1" />`;

const emptyCode = `<UTable :data="[]" empty="No results found." class="flex-1" />`;

const selectionCode = `<script setup lang="ts">
import { ref, h, resolveComponent, useTemplateRef } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UCheckbox = resolveComponent('UCheckbox')

const columns: TableColumn<Person>[] = [
  {
    id: 'select',
    header: ({ table }) => h(UCheckbox, {
      modelValue: table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
      'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
      'aria-label': 'Select all'
    }),
    cell: ({ row }) => h(UCheckbox, {
      modelValue: row.getIsSelected(),
      'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
      'aria-label': 'Select row'
    })
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' }
]

const table = useTemplateRef('table')
const rowSelection = ref({})
</` + `script>

<template>
  <div class="flex-1 w-full">
    <UTable ref="table" v-model:row-selection="rowSelection" :data="data" :columns="columns" />
    <div class="px-4 py-3.5 border-t text-sm text-muted">
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length }} of
      {{ table?.tableApi?.getFilteredRowModel().rows.length }} row(s) selected
    </div>
  </div>
</template>`;

const expandCode = `<script setup lang="ts">
import { ref, h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UButton = resolveComponent('UButton')

const columns: TableColumn<Person>[] = [
  {
    id: 'expand',
    cell: ({ row }) => h(UButton, {
      color: 'neutral', variant: 'ghost', icon: 'i-lucide-chevron-down',
      square: true, 'aria-label': 'Expand',
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
      <div class="px-4 py-2 text-sm text-muted">
        ID: {{ row.original.id }} | Title: {{ row.original.title }}
      </div>
    </template>
  </UTable>
</template>`;

const paginationCode = `<UTable
  v-model:pagination="pagination"
  :data="data"
  :columns="columns"
  :pagination-options="{ pageCount: 5 }"
  class="flex-1"
/>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Render tabular data by passing <code>:data</code> and <code>:columns</code>. Each column uses an <code>accessorKey</code> to map to data fields.</p>
      <CodeCollapsible :code="basicCode">
        <div class="demo-row">
          <UTable :data="people" :columns="basicColumns" class="flex-1" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Columns</h3>
      <p class="demo-description">Use Vue's <code>h()</code> render function and <code>resolveComponent</code> to render custom cells with badges, buttons, and formatted content.</p>
      <CodeCollapsible :code="columnsCode">
        <div class="demo-row">
          <UTable :data="people" :columns="columns" class="flex-1" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <p class="demo-description">Show a loading skeleton overlay with the <code>loading</code> prop while data is being fetched.</p>
      <CodeCollapsible :code="loadingCode">
        <div class="demo-row">
          <UTable :data="people" :columns="basicColumns" loading loading-color="primary" loading-animation="carousel" class="flex-1" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sorting</h3>
      <p class="demo-description">Enable sorting with the <code>:sorting</code> prop, providing an array of <code>{ id, desc }</code> objects to set initial sort state.</p>
      <CodeCollapsible :code="sortCode">
        <div class="demo-row">
          <UTable :data="people" :columns="basicColumns" :sorting="[{ id: 'name', desc: false }]" class="flex-1" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Caption</h3>
      <p class="demo-description">Add a descriptive <code>caption</code> above the table for accessibility and context.</p>
      <CodeCollapsible :code="captionCode">
        <div class="demo-row">
          <UTable :data="people" :columns="basicColumns" caption="Team members" class="flex-1" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Empty State</h3>
      <p class="demo-description">Display a custom message when no data is available using the <code>empty</code> prop.</p>
      <CodeCollapsible :code="emptyCode">
        <div class="demo-row">
          <UTable :data="[]" :columns="basicColumns" empty="No results found." class="flex-1" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Row Selection</h3>
      <p class="demo-description">Enable row checkboxes using TanStack Table's row selection API with custom header and cell renderers.</p>
      <CodeCollapsible :code="selectionCode">
        <div class="demo-col">
          <UTable ref="selectTable" v-model:row-selection="rowSelection" :data="people" :columns="selectColumns" class="flex-1" />
          <span class="demo-result">

          </span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Expandable Rows</h3>
      <p class="demo-description">Toggle expandable row content using the <code>#expanded</code> slot and a button in the column cell.</p>
      <CodeCollapsible :code="expandCode">
        <div class="demo-row">
          <UTable v-model:expanded="expanded" :data="people" :columns="expandColumns" class="flex-1">
            <template #expanded="{ row }">
              <div class="px-4 py-2 text-sm text-muted">
                ID: {{ (row.original as Person).id }} | Title: {{ (row.original as Person).title }}
              </div>
            </template>
          </UTable>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Pagination</h3>
      <p class="demo-description">Use <code>v-model:pagination</code> for controlled page navigation with the <code>pagination-options</code> prop and a large dataset.</p>
      <CodeCollapsible :code="paginationCode">
        <div class="demo-col">
          <UTable v-model:pagination="pagination" :data="paginatedData" :columns="[{ accessorKey: 'id', header: 'ID' }, { accessorKey: 'name', header: 'Name' }, { accessorKey: 'title', header: 'Title' }, { accessorKey: 'email', header: 'Email' }, { accessorKey: 'role', header: 'Role' }]" :pagination-options="{ pageCount: 5 }" class="flex-1" />
          <span class="demo-result">Page {{ pagination.pageIndex + 1 }} of 5</span>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.demo-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.example-section {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.example-section h3 {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}
.demo-description {
  font-size: 13px;
  color: var(--sl-color-text-light);
  margin: 0;
  line-height: 1.5;
}
.demo-description code {
  font-size: 12px;
  background: var(--color-surface-muted, #F3F4F6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  overflow-x: auto;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-x: auto;
}
.demo-result {
  font-size: 13px;
  color: var(--color-foreground-secondary, #4B5563);
}
</style>
