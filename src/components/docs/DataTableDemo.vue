<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, h } from "vue";
import { MizuDataTable } from "@mizu/vue";
import type { ColumnDef } from "@tanstack/vue-table";
import CodeCollapsible from "./CodeCollapsible.vue";

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
}

const allInvoices: Invoice[] = [
  { id: "INV-001", customer: "Acme Corp", amount: 1250.0, status: "paid", date: "2026-06-01" },
  { id: "INV-002", customer: "Globex Inc", amount: 890.5, status: "pending", date: "2026-06-03" },
  { id: "INV-003", customer: "Initech", amount: 2100.0, status: "overdue", date: "2026-05-15" },
  { id: "INV-004", customer: "Umbrella Co", amount: 450.75, status: "paid", date: "2026-06-05" },
  {
    id: "INV-005",
    customer: "Stark Industries",
    amount: 5600.0,
    status: "paid",
    date: "2026-06-07",
  },
  {
    id: "INV-006",
    customer: "Wayne Enterprises",
    amount: 3200.0,
    status: "pending",
    date: "2026-06-08",
  },
  { id: "INV-007", customer: "Oscorp", amount: 780.25, status: "paid", date: "2026-06-09" },
  { id: "INV-008", customer: "Cyberdyne", amount: 1950.0, status: "overdue", date: "2026-05-20" },
  {
    id: "INV-009",
    customer: "Massive Dynamic",
    amount: 4100.0,
    status: "paid",
    date: "2026-06-10",
  },
  { id: "INV-010", customer: "Hooli", amount: 670.5, status: "pending", date: "2026-06-11" },
  { id: "INV-011", customer: "Pied Piper", amount: 2890.0, status: "paid", date: "2026-06-12" },
  { id: "INV-012", customer: "Soylent Corp", amount: 1120.75, status: "paid", date: "2026-06-13" },
];

const columns: ColumnDef<Invoice, unknown>[] = [
  { accessorKey: "id", header: "Invoice" },
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return status.charAt(0).toUpperCase() + status.slice(1);
    },
  },
  { accessorKey: "date", header: "Date" },
];

const page1 = ref(1);
const page2 = ref(1);

// Multi-line cells demo
interface Contact {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "inactive";
  notes: string;
}

const contacts: Contact[] = [
  {
    name: "Sarah Chen",
    email: "sarah@acme.com",
    phone: "+1 555-0101",
    role: "Engineering Lead",
    status: "active",
    notes: "Primary technical contact for API integration project. Prefers email communication.",
  },
  {
    name: "Marcus Johnson",
    email: "marcus@globex.com",
    phone: "+1 555-0102",
    role: "Product Manager",
    status: "active",
    notes: "Oversees the ERP migration initiative.",
  },
  {
    name: "Elena Rodriguez",
    email: "elena@initech.com",
    phone: "+1 555-0103",
    role: "Finance Director",
    status: "inactive",
    notes: "On leave until Q3.",
  },
  {
    name: "James Wilson",
    email: "james@umbrella.co",
    phone: "+1 555-0104",
    role: "Operations Manager",
    status: "active",
    notes: "Manages warehouse logistics and supply chain.",
  },
];

const contactColumns: ColumnDef<Contact, unknown>[] = [
  {
    accessorKey: "name",
    header: "Contact",
    cell: ({ row }) => {
      const contact = row.original;
      return h("div", { class: "contact-cell" }, [
        h("div", { class: "contact-name" }, contact.name),
        h("div", { class: "contact-email" }, contact.email),
      ]);
    },
  },
  {
    accessorKey: "role",
    header: "Role & Phone",
    cell: ({ row }) => {
      const contact = row.original;
      return h("div", { class: "contact-cell" }, [
        h("div", { class: "contact-role" }, contact.role),
        h("div", { class: "contact-phone" }, contact.phone),
      ]);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return h("span", { class: "status-tag", style: `color: var(--color-feedback-${status === "active" ? "success" : "warning"}-base)` }, status);
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string;
      return h("span", { class: "contact-notes" }, notes);
    },
  },
];

// Infinite scroll demo
const PAGE_SIZE = 5;
const infiniteData = ref<Invoice[]>(allInvoices.slice(0, PAGE_SIZE));
const infiniteLoading = ref(false);
const sentinel = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

const hasMore = computed(() => infiniteData.value.length < allInvoices.length);

function loadMore() {
  if (infiniteLoading.value || !hasMore.value) return;
  infiniteLoading.value = true;
  setTimeout(() => {
    const nextItems = allInvoices.slice(
      infiniteData.value.length,
      infiniteData.value.length + PAGE_SIZE
    );
    infiniteData.value = [...infiniteData.value, ...nextItems];
    infiniteLoading.value = false;
  }, 800);
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !infiniteLoading.value) {
        loadMore();
      }
    },
    { threshold: 0.1 }
  );
  if (sentinel.value) observer.observe(sentinel.value);
});

onUnmounted(() => {
  observer?.disconnect();
});

const basicCode = `<MizuDataTable
  :columns="columns"
  :data="allInvoices"
  v-model:page="page"
  :page-size="5"
/>`;

const selectionCode = `<MizuDataTable
  :columns="columns"
  :data="allInvoices"
  v-model:page="page"
  :page-size="5"
  :selectable="true"
/>`;

const infiniteCode = `<MizuDataTable
  :columns="columns"
  :data="infiniteData"
  :paginated="false"
/>`;

const multiLineCellsCode = `<MizuDataTable
  :columns="contactColumns"
  :data="contacts"
  :paginated="false"
/>`;

const loadingCode = `<MizuDataTable
  :columns="columns"
  :data="[]"
  :loading="true"
/>`;

const emptyCode = `<MizuDataTable
  :columns="columns"
  :data="[]"
  empty-text="No invoices found"
/>`;
</script>

<template>
  <div class="data-table-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <MizuDataTable v-model:page="page1" :columns="columns" :data="allInvoices" :page-size="5" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Selection</h3>
      <CodeCollapsible :code="selectionCode">
        <MizuDataTable
          v-model:page="page2"
          :columns="columns"
          :data="allInvoices"
          :page-size="5"
          :selectable="true"
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Infinite Scroll</h3>
      <CodeCollapsible :code="infiniteCode">
        <div class="infinite-scroll-wrapper">
          <MizuDataTable :columns="columns" :data="infiniteData" :paginated="false" />
          <div ref="sentinel" class="infinite-scroll-sentinel">
            <template v-if="infiniteLoading">
              <div class="infinite-spinner"></div>
              <span>Loading more...</span>
            </template>
            <template v-else-if="!hasMore">
              <span>No more data</span>
            </template>
          </div>
        </div>
        <p class="scroll-hint">Scroll down to load more rows</p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multi-line Cells</h3>
      <CodeCollapsible :code="multiLineCellsCode">
        <MizuDataTable :columns="contactColumns" :data="contacts" :paginated="false" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <CodeCollapsible :code="loadingCode">
        <MizuDataTable :columns="columns" :data="[]" :loading="true" />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Empty</h3>
      <CodeCollapsible :code="emptyCode">
        <MizuDataTable :columns="columns" :data="[]" empty-text="No invoices found" />
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.data-table-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.data-table-examples :deep(*) {
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

.infinite-scroll-wrapper {
  max-height: 300px;
  overflow-y: auto;
}

.infinite-scroll-sentinel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-size: 12px;
  color: var(--sl-color-text-light);
}

.infinite-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--sl-color-gray-5);
  border-top-color: var(--sl-color-accent);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.scroll-hint {
  font-size: 12px;
  color: var(--sl-color-text-light);
  text-align: center;
  font-style: italic;
}
</style>

<style>
/* Unscoped styles for content rendered via h() inside the table */
.contact-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.contact-name {
  font-weight: 600;
  color: var(--color-foreground-primary);
}
.contact-email {
  font-size: 12px;
  color: var(--color-foreground-tertiary);
}
.contact-role {
  font-weight: 600;
  color: var(--color-foreground-primary);
}
.contact-phone {
  font-size: 12px;
  color: var(--color-foreground-tertiary);
}
.contact-notes {
  font-size: 13px;
  color: var(--color-foreground-secondary);
  line-height: 1.4;
}
</style>
