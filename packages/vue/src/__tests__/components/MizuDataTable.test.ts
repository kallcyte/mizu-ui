import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createColumnHelper } from "@tanstack/vue-table";
import MizuDataTable from "../../components/MizuDataTable.vue";
import type { ColumnDef } from "@tanstack/vue-table";

interface User {
  id: number;
  name: string;
  email: string;
}

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("id", { header: "ID" }),
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("email", { header: "Email" }),
] as ColumnDef<User, unknown>[];

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@test.com" },
  { id: 2, name: "Bob", email: "bob@test.com" },
  { id: 3, name: "Charlie", email: "charlie@test.com" },
];

describe("MizuDataTable", () => {
  it("renders table with columns and data", () => {
      const wrapper = mount(MizuDataTable as any, {
        props: { columns, data },
      });
    expect(wrapper.find(".mizu-data-table").exists()).toBe(true);
    expect(wrapper.find(".mizu-data-table__table").exists()).toBe(true);
    expect(wrapper.find(".mizu-data-table__thead").exists()).toBe(true);
    expect(wrapper.find(".mizu-data-table__tbody").exists()).toBe(true);
  });

  it("renders column headers", () => {
      const wrapper = mount(MizuDataTable as any, {
        props: { columns, data },
      });
    const headers = wrapper.findAll(".mizu-data-table__th");
    expect(headers.length).toBeGreaterThanOrEqual(3);
    expect(headers[0].text()).toBe("ID");
    expect(headers[1].text()).toBe("Name");
    expect(headers[2].text()).toBe("Email");
  });

  it("renders data rows", () => {
      const wrapper = mount(MizuDataTable as any, {
        props: { columns, data },
      });
    const rows = wrapper.findAll(".mizu-data-table__row");
    expect(rows.length).toBe(3);
  });

  it("shows loading state with spinner", () => {
      const wrapper = mount(MizuDataTable as any, {
        props: { columns, data, loading: true },
      });
    expect(wrapper.classes()).toContain("mizu-data-table--loading");
    expect(wrapper.find(".mizu-data-table__spinner").exists()).toBe(true);
    expect(wrapper.text()).toContain("Loading...");
  });

  it("shows empty text when no data", () => {
      const wrapper = mount(MizuDataTable as any, {
        props: { columns, data: [], emptyText: "No records found" },
      });
    expect(wrapper.find(".mizu-data-table__empty").exists()).toBe(true);
    expect(wrapper.text()).toContain("No records found");
  });

  it("renders footer with pagination", () => {
      const wrapper = mount(MizuDataTable as any, {
        props: { columns, data, paginated: true, pageSize: 2 },
      });
    expect(wrapper.find(".mizu-data-table__footer").exists()).toBe(true);
    // UPagination renders a <nav> element
    expect(wrapper.find(".mizu-data-table__footer nav").exists()).toBe(true);
  });

  it("hides pagination inside footer when paginated is false", () => {
      const wrapper = mount(MizuDataTable as any, {
        props: { columns, data, paginated: false },
      });
    // Footer still renders when there are rows and not loading
    expect(wrapper.find(".mizu-data-table__footer").exists()).toBe(true);
    // But pagination component inside should not render
    expect(wrapper.find(".mizu-data-table__footer nav").exists()).toBe(false);
  });

  it("renders selectable checkboxes when selectable is true", () => {
      const wrapper = mount(MizuDataTable as any, {
        props: { columns, data, selectable: true },
      });
    expect(wrapper.find(".mizu-data-table__th--select").exists()).toBe(true);
    expect(wrapper.find(".mizu-data-table__td--select").exists()).toBe(true);
  });

  it("shows selection count in footer when selectable", () => {
      const wrapper = mount(MizuDataTable as any, {
        props: { columns, data, selectable: true, paginated: false },
      });
    expect(wrapper.find(".mizu-data-table__selection-info").exists()).toBe(true);
    expect(wrapper.text()).toContain("row(s) selected");
  });

  it("applies sortable classes on header columns", () => {
      const wrapper = mount(MizuDataTable as any, {
        props: { columns, data, sortable: true },
      });
    const sortableHeaders = wrapper.findAll(".mizu-data-table__th--sortable");
    expect(sortableHeaders.length).toBeGreaterThanOrEqual(3);
  });

  it("disables sorting when sortable is false", () => {
      const wrapper = mount(MizuDataTable as any, {
        props: { columns, data, sortable: false },
      });
    expect(wrapper.find(".mizu-data-table__th--sortable").exists()).toBe(false);
  });
});
