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
      <p class="demo-description">Render tabular data by passing <code>:data</code> and <code>:columns</code>. Each column uses an <code>accessorKey</code> to map to data fields.</p>
      <CodeCollapsible :code="basicCode">
        <div class="demo-row">
          <UTable :data="people" :columns="columns" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Sorting</h3>
      <p class="demo-description">Enable sorting with the <code>:sorting</code> prop, providing an array of <code>{ id, desc }</code> objects to set initial sort state.</p>
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
      <p class="demo-description">Add a descriptive <code>caption</code> above the table for accessibility and context.</p>
      <CodeCollapsible :code="captionCode">
        <div class="demo-row">
          <UTable :data="people" :columns="columns" caption="Team members" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Empty State</h3>
      <p class="demo-description">Display a custom message when no data is available using the <code>empty</code> prop.</p>
      <CodeCollapsible :code="emptyCode">
        <div class="demo-row">
          <UTable :data="[]" :columns="columns" empty="No results found." class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <p class="demo-description">Show a loading skeleton overlay with the <code>loading</code> prop while data is being fetched.</p>
      <CodeCollapsible :code="loadingCode">
        <div class="demo-row">
          <UTable :data="people" :columns="columns" loading class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Selection</h3>
      <p class="demo-description">Enable row checkboxes via <code>row-selection-options</code> with <code>enableRowSelection: true</code> for multi-select actions.</p>
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
}
</style>
