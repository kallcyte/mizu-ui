import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuDivider from "../../components/MizuDivider.vue";

describe("MizuDivider", () => {
  it("renders the divider element", () => {
    const wrapper = mount(MizuDivider);
    expect(wrapper.find(".mizu-divider").exists()).toBe(true);
  });

  it("renders label when provided", () => {
    const wrapper = mount(MizuDivider, {
      props: { label: "Section" },
    });
    expect(wrapper.text()).toContain("Section");
  });

  it("renders horizontal orientation by default", () => {
    const wrapper = mount(MizuDivider);
    expect(wrapper.classes()).toContain("mizu-divider--horizontal");
  });

  it("renders vertical orientation", () => {
    const wrapper = mount(MizuDivider, {
      props: { orientation: "vertical" },
    });
    expect(wrapper.classes()).toContain("mizu-divider--vertical");
  });
});
