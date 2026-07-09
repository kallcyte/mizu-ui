import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuBadge from "../../components/MizuBadge.vue";

function getBadge(wrapper: ReturnType<typeof mount>) {
  return wrapper.find(".mizu-badge");
}

describe("MizuBadge", () => {
  it("renders with default variant and size", () => {
    const wrapper = mount(MizuBadge, {
      props: { value: "New" },
    });
    const badge = getBadge(wrapper);
    expect(badge.exists()).toBe(true);
    expect(badge.classes()).toContain("mizu-badge--error");
    expect(badge.classes()).toContain("mizu-badge--md");
    expect(badge.text()).toBe("New");
  });

  it("applies variant class", () => {
    const wrapper = mount(MizuBadge, {
      props: { variant: "primary", value: "1" },
    });
    expect(getBadge(wrapper).classes()).toContain("mizu-badge--primary");
  });

  it("applies size class", () => {
    const wrapper = mount(MizuBadge, {
      props: { size: "sm", value: "1" },
    });
    expect(getBadge(wrapper).classes()).toContain("mizu-badge--sm");
  });

  it("renders dot mode when dot is true", () => {
    const wrapper = mount(MizuBadge, {
      props: { dot: true },
    });
    expect(getBadge(wrapper).classes()).toContain("mizu-badge--dot");
  });

  it("renders count with max truncation", () => {
    const wrapper = mount(MizuBadge, {
      props: { count: 150, max: 99 },
    });
    expect(wrapper.text()).toBe("99+");
  });

  it("renders count without truncation when under max", () => {
    const wrapper = mount(MizuBadge, {
      props: { count: 42 },
    });
    expect(wrapper.text()).toBe("42");
  });

  it("hides badge when count is 0 and showZero is false", () => {
    const wrapper = mount(MizuBadge, {
      props: { count: 0 },
    });
    expect(wrapper.find(".mizu-badge").exists()).toBe(false);
  });

  it("shows badge when count is 0 and showZero is true", () => {
    const wrapper = mount(MizuBadge, {
      props: { count: 0, showZero: true },
    });
    expect(wrapper.find(".mizu-badge").exists()).toBe(true);
    expect(wrapper.text()).toBe("0");
  });

  it("renders inline by default", () => {
    const wrapper = mount(MizuBadge, {
      props: { value: "tag" },
    });
    expect(wrapper.classes()).not.toContain("mizu-badge--positioned");
  });

  it("renders in overlay mode when position is set and has children", () => {
    const wrapper = mount(MizuBadge, {
      props: { count: 1, position: "top-right" },
      slots: { default: '<span class="child">X</span>' },
    });
    expect(wrapper.find(".mizu-badge-wrapper").exists()).toBe(true);
    expect(wrapper.find(".child").exists()).toBe(true);
  });

  it("renders text content via default slot when no value/count", () => {
    const wrapper = mount(MizuBadge, {
      slots: { default: "Custom" },
    });
    expect(wrapper.text()).toBe("Custom");
  });

  it("renders value prop takes priority over count", () => {
    const wrapper = mount(MizuBadge, {
      props: { value: "VIP", count: 5 },
    });
    expect(wrapper.text()).toBe("VIP");
  });
});
