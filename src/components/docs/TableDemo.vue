<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";

const people = [
  { id: 1, name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
  { id: 2, name: "Courtney Henry", title: "Designer", email: "courtney.henry@example.com", role: "Admin" },
  { id: 3, name: "Tom Cook", title: "Product Manager", email: "tom.cook@example.com", role: "Member" },
  { id: 4, name: "Whitney Francis", title: "Back-end Developer", email: "whitney.francis@example.com", role: "Member" },
  { id: 5, name: "Leonard Krasner", title: "Senior Designer", email: "leonard.krasner@example.com", role: "Admin" },
];

const columns = [
  { header: "Name", accessorKey: "name" },
  { header: "Title", accessorKey: "title" },
  { header: "Email", accessorKey: "email" },
  { header: "Role", accessorKey: "role" },
];

const basicCode = `<UTable :data="people" :columns="columns" />`;

const sortableCode = `<UTable
  :data="people"
  :columns="[
    { header: 'Name', accessorKey: 'name' },
    { header: 'Title', accessorKey: 'title' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role' },
  ]"
  :sorting="[{ id: 'name', desc: false }]"
/>`;

const captionCode = `<UTable :data="people" :columns="columns" caption="Team members" />`;

const emptyCode = `<UTable :data="[]" :columns="columns" empty="No results found." />`;

const loadingCode = `<UTable :data="people" :columns="columns" loading />`;

const selectableCode = `<UTable
  :data="people"
  :columns="columns"
  :row-selection-options="{
    enableRowSelection: true,
  }"
/>`;
</script>

<template>
  <div class="table-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <div class="demo-row">
          <UTable :data="people" :columns="columns" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Sorting</h3>
      <CodeCollapsible :code="sortableCode">
        <div class="demo-row">
          <UTable
            :data="people"
            :columns="[
              { header: 'Name', accessorKey: 'name' },
              { header: 'Title', accessorKey: 'title' },
              { header: 'Email', accessorKey: 'email' },
              { header: 'Role', accessorKey: 'role' },
            ]"
            :sorting="[{ id: 'name', desc: false }]"
            class="w-full"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Caption</h3>
      <CodeCollapsible :code="captionCode">
        <div class="demo-row">
          <UTable :data="people" :columns="columns" caption="Team members" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Empty State</h3>
      <CodeCollapsible :code="emptyCode">
        <div class="demo-row">
          <UTable :data="[]" :columns="columns" empty="No results found." class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <CodeCollapsible :code="loadingCode">
        <div class="demo-row">
          <UTable :data="people" :columns="columns" loading class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Selection</h3>
      <CodeCollapsible :code="selectableCode">
        <div class="demo-row">
          <UTable
            :data="people"
            :columns="columns"
            :row-selection-options="{ enableRowSelection: true }"
            class="w-full"
          />
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.table-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.table-examples :deep(*) {
  margin: 0;
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
.demo-row {
  all: revert;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
</style>
