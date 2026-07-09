import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuCollapsibleRoot from "../../components/MizuCollapsibleRoot.vue";

describe("MizuCollapsibleRoot", () => {
  it("renders with default props", () => {
    const wrapper = mount(MizuCollapsibleRoot, {
      slots: { default: "Collapsible content" },
    });
    expect(wrapper.classes()).toContain("mizu-collapsible");
  });

  it("renders slot content", () => {
    const wrapper = mount(MizuCollapsibleRoot, {
      slots: { default: '<div class="inner">Content</div>' },
    });
    expect(wrapper.find(".inner").exists()).toBe(true);
    expect(wrapper.text()).toBe("Content");
  });

  it("renders multiple slot elements", () => {
    const wrapper = mount(MizuCollapsibleRoot, {
      slots: { default: '<span>First</span><span>Second</span>' },
    });
    expect(wrapper.findAll("span").length).toBe(2);
  });

  it("accepts defaultOpen prop", () => {
    const wrapper = mount(MizuCollapsibleRoot, {
      props: { defaultOpen: true },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-collapsible");
  });

  it("accepts disabled prop", () => {
    const wrapper = mount(MizuCollapsibleRoot, {
      props: { disabled: true },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-collapsible");
  });

  it("accepts open prop for controlled mode", () => {
    const wrapper = mount(MizuCollapsibleRoot, {
      props: { open: true },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-collapsible");
  });
});
