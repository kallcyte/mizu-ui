import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuBreadcrumb from "../../components/MizuBreadcrumb.vue";

describe("MizuBreadcrumb", () => {
  const defaultItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Button" },
  ];

  it("renders navigation element", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems },
    });
    expect(wrapper.find("nav").exists()).toBe(true);
    expect(wrapper.classes()).toContain("mizu-breadcrumb");
  });

  it("renders ordered list", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems },
    });
    expect(wrapper.find("ol").exists()).toBe(true);
    expect(wrapper.find("ol").classes()).toContain("mizu-breadcrumb__list");
  });

  it("renders all items with correct labels", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems },
    });
    const links = wrapper.findAll(".mizu-breadcrumb__link");
    expect(links.length).toBe(3);
    expect(links[0].text()).toBe("Home");
    expect(links[1].text()).toBe("Components");
    expect(links[2].text()).toBe("Button");
  });

  it("renders non-last items as anchor elements", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems },
    });
    const links = wrapper.findAll(".mizu-breadcrumb__link");
    expect(links[0].element.tagName).toBe("A");
    expect(links[1].element.tagName).toBe("A");
    expect(links[0].attributes("href")).toBe("/");
    expect(links[1].attributes("href")).toBe("/components");
  });

  it("renders last item as span with aria-current", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems },
    });
    const links = wrapper.findAll(".mizu-breadcrumb__link");
    const last = links[2];
    expect(last.element.tagName).toBe("SPAN");
    expect(last.classes()).toContain("mizu-breadcrumb__link--current");
    expect(last.attributes("aria-current")).toBe("page");
  });

  it("renders separators between items", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems },
    });
    const separators = wrapper.findAll(".mizu-breadcrumb__separator");
    expect(separators.length).toBe(2);
    expect(separators[0].text()).toBe("/");
    expect(separators[1].text()).toBe("/");
  });

  it("uses custom separator character", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems, separator: ">" },
    });
    const separators = wrapper.findAll(".mizu-breadcrumb__separator");
    expect(separators[0].text()).toBe(">");
  });

  it("applies md size class by default", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems },
    });
    expect(wrapper.classes()).toContain("mizu-breadcrumb--md");
  });

  it("applies sm size class", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems, size: "sm" },
    });
    expect(wrapper.classes()).toContain("mizu-breadcrumb--sm");
  });

  it("applies lg size class", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems, size: "lg" },
    });
    expect(wrapper.classes()).toContain("mizu-breadcrumb--lg");
  });

  it("sets aria-label on nav", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems },
    });
    expect(wrapper.find("nav").attributes("aria-label")).toBe("Breadcrumb");
  });

  it("separators have aria-hidden", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: defaultItems },
    });
    wrapper.findAll(".mizu-breadcrumb__separator").forEach((sep) => {
      expect(sep.attributes("aria-hidden")).toBe("true");
    });
  });

  it("renders non-current item with href", () => {
    const wrapper = mount(MizuBreadcrumb, {
      props: { items: [{ label: "Link", href: "/custom-path" }, { label: "Current" }] },
    });
    expect(wrapper.find("a").attributes("href")).toBe("/custom-path");
  });
});
