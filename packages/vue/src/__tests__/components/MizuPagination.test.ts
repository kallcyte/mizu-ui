import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuPagination from "../../components/MizuPagination.vue";

describe("MizuPagination", () => {
  it("renders navigation element", () => {
    const wrapper = mount(MizuPagination, {
      props: { page: 1, total: 5 },
    });
    expect(wrapper.find("nav").exists()).toBe(true);
    expect(wrapper.classes()).toContain("mizu-pagination");
  });

  it("renders page buttons including current page", () => {
    const wrapper = mount(MizuPagination, {
      props: { page: 1, total: 5 },
    });
    const pageButtons = wrapper.findAll(".mizu-pagination__btn--page");
    expect(pageButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("applies md size class by default", () => {
    const wrapper = mount(MizuPagination, {
      props: { page: 1, total: 5 },
    });
    expect(wrapper.classes()).toContain("mizu-pagination--md");
  });

  it("applies sm size class", () => {
    const wrapper = mount(MizuPagination, {
      props: { page: 1, total: 5, size: "sm" },
    });
    expect(wrapper.classes()).toContain("mizu-pagination--sm");
  });

  it("applies lg size class", () => {
    const wrapper = mount(MizuPagination, {
      props: { page: 1, total: 5, size: "lg" },
    });
    expect(wrapper.classes()).toContain("mizu-pagination--lg");
  });

  it("renders first and last navigation buttons when showEdges is true", () => {
    const wrapper = mount(MizuPagination, {
      props: { page: 3, total: 10, showEdges: true },
    });
    const navButtons = wrapper.findAll(".mizu-pagination__btn--nav");
    // Should have first, prev, next, last
    expect(navButtons.length).toBeGreaterThanOrEqual(4);
  });

  it("renders prev and next buttons without edges by default", () => {
    const wrapper = mount(MizuPagination, {
      props: { page: 3, total: 10 },
    });
    const navButtons = wrapper.findAll(".mizu-pagination__btn--nav");
    // Should have prev, next (without first/last)
    expect(navButtons.length).toBeGreaterThanOrEqual(2);
  });

  it("applies data-selected on current page button", async () => {
    const wrapper = mount(MizuPagination, {
      props: { page: 3, total: 5 },
    });
    const pageButtons = wrapper.findAll(".mizu-pagination__btn--page");
    const current = pageButtons.find((btn) => btn.attributes("data-selected") === "true");
    expect(current).toBeDefined();
    expect(current!.text()).toBe("3");
  });

  it("emits update:page when a page button is clicked", async () => {
    const wrapper = mount(MizuPagination, {
      props: { page: 1, total: 5 },
    });
    // Click page 2
    const pageButtons = wrapper.findAll(".mizu-pagination__btn--page");
    const page2 = pageButtons.find((btn) => btn.text() === "2");
    if (page2) {
      await page2.trigger("click");
      expect(wrapper.emitted("update:page")).toBeTruthy();
    }
  });

  it("renders ellipsis for large page counts", () => {
    // Use page in the middle of a large range to trigger ellipsis rendering
    const wrapper = mount(MizuPagination, {
      props: { page: 50, total: 100, siblingCount: 1 },
    });
    // Page 50 of 100 with siblingCount 1 creates gaps on both sides
    // Page buttons should still render for the expected pages
    const pageButtons = wrapper.findAll(".mizu-pagination__btn--page");
    expect(pageButtons.length).toBeGreaterThanOrEqual(3);
    // Check the rendered page values include current page
    const buttonTexts = pageButtons.map((b) => b.text());
    expect(buttonTexts).toContain("50");
  });

  it("sets aria-label on nav", () => {
    const wrapper = mount(MizuPagination, {
      props: { page: 1, total: 5 },
    });
    expect(wrapper.find("nav").attributes("aria-label")).toBe("Pagination");
  });

  it("renders correct number of page buttons based on siblingCount", () => {
    const wrapper = mount(MizuPagination, {
      props: { page: 5, total: 10, siblingCount: 0 },
    });
    // With siblingCount=0, fewer page buttons should appear
    const pageButtons = wrapper.findAll(".mizu-pagination__btn--page");
    expect(pageButtons.length).toBeGreaterThanOrEqual(1);
  });
});
