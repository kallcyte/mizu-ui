<script setup lang="ts">
import MizuDataTable from "../components/MizuDataTable.vue";
import type { TableColumn } from "../components/MizuDataTable.vue";

interface Person {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const data: Person[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Dave Brown", email: "dave@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Eve Davis", email: "eve@example.com", role: "Admin", status: "Active" },
  { id: 6, name: "Frank Miller", email: "frank@example.com", role: "Viewer", status: "Inactive" },
  { id: 7, name: "Grace Wilson", email: "grace@example.com", role: "Editor", status: "Active" },
  { id: 8, name: "Hank Taylor", email: "hank@example.com", role: "Viewer", status: "Active" },
  { id: 9, name: "Ivy Anderson", email: "ivy@example.com", role: "Admin", status: "Inactive" },
  { id: 10, name: "Jack Thomas", email: "jack@example.com", role: "Editor", status: "Active" },
  { id: 11, name: "Kate Jackson", email: "kate@example.com", role: "Viewer", status: "Active" },
  { id: 12, name: "Leo Martinez", email: "leo@example.com", role: "Editor", status: "Inactive" },
];

const columns: TableColumn<Person>[] = [
  { accessorKey: "name", header: "Name", enableSorting: true },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role", enableSorting: true },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }: any) => {
      const value = getValue();
      const color = value === "Active" ? "#16a34a" : "#dc2626";
      return `<span style="color:${color};font-weight:500">${value}</span>`;
    },
  },
];
</script>

<template>
  <Story title="MizuDataTable" :layout="{ type: 'single', width: 900 }">
    <Variant title="Basic">
      <MizuDataTable :data="data" :columns="columns" :page-size="5" />
    </Variant>

    <Variant title="Sortable">
      <MizuDataTable :data="data" :columns="columns" :page-size="12" :sortable="true" :paginated="false" />
    </Variant>

    <Variant title="Selectable">
      <MizuDataTable
        :data="data"
        :columns="columns"
        :selectable="true"
        :page-size="12"
        :paginated="false"
      />
    </Variant>

    <Variant title="Caption & Empty">
      <div class="flex flex-col gap-6">
        <div>
          <p class="text-xs font-semibold text-gray-500 mb-2">With Caption</p>
          <MizuDataTable
            :data="data.slice(0, 3)"
            :columns="columns"
            caption="Team Members"
            :page-size="5"
            :sortable="false"
          />
        </div>
        <div>
          <p class="text-xs font-semibold text-gray-500 mb-2">Empty State</p>
          <MizuDataTable
            :data="[]"
            :columns="columns"
            empty="No team members found."
          />
        </div>
      </div>
    </Variant>

    <Variant title="Loading">
      <MizuDataTable
        :data="[]"
        :columns="columns"
        :loading="true"
        loading-color="primary"
        loading-animation="carousel"
      />
    </Variant>

    <Variant title="Sticky Header">
      <div class="h-[300px] overflow-auto">
        <MizuDataTable
          :data="data"
          :columns="columns"
          sticky="header"
          :page-size="12"
        />
      </div>
    </Variant>
  </Story>
</template>
