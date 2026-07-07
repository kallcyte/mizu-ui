import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuAccordionRoot from "../../components/MizuAccordionRoot.vue";

describe("MizuAccordionRoot", () => {
  it("renders with default props", () => {
    const wrapper = mount(MizuAccordionRoot, {
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-accordion");
  });

  it("renders composition mode slot content when no items prop", () => {
    const wrapper = mount(MizuAccordionRoot, {
      slots: { default: '<div class="custom-content">Manual accordion</div>' },
    });
    expect(wrapper.find(".custom-content").exists()).toBe(true);
    expect(wrapper.text()).toBe("Manual accordion");
  });

  it("renders items with Mizu class names in items API mode", () => {
    const items = [
      { label: "Section 1", value: "s1", content: "Content 1" },
      { label: "Section 2", value: "s2", content: "Content 2" },
    ];
    const wrapper = mount(MizuAccordionRoot, {
      props: { items },
    });
    expect(wrapper.findAll(".mizu-accordion__item").length).toBe(2);
    expect(wrapper.findAll(".mizu-accordion__trigger").length).toBe(2);
  });

  it("renders item labels in items API mode", () => {
    const items = [
      { label: "Section 1", value: "s1" },
      { label: "Section 2", value: "s2" },
    ];
    const wrapper = mount(MizuAccordionRoot, {
      props: { items },
    });
    const labels = wrapper.findAll(".mizu-accordion__label");
    expect(labels.length).toBe(2);
    expect(labels[0].text()).toBe("Section 1");
    expect(labels[1].text()).toBe("Section 2");
  });

  it("renders item content when item is open via modelValue", () => {
    const items = [
      { label: "Section 1", value: "s1", content: "Content body" },
    ];
    const wrapper = mount(MizuAccordionRoot, {
      props: { items, modelValue: "s1" },
    });
    // AccordionContent renders when the item is open
    expect(wrapper.find(".mizu-accordion__body-text").exists()).toBe(true);
    expect(wrapper.find(".mizu-accordion__body-text").text()).toBe("Content body");
  });

  it("renders disabled item in items API mode", () => {
    const items = [
      { label: "Active", value: "a1" },
      { label: "Disabled", value: "d1", disabled: true },
    ];
    const wrapper = mount(MizuAccordionRoot, {
      props: { items },
    });
    const triggers = wrapper.findAll(".mizu-accordion__trigger");
    expect(triggers[1].attributes("disabled")).toBeDefined();
  });

  it("accepts type single by default", () => {
    const wrapper = mount(MizuAccordionRoot, {
      props: { items: [{ label: "Item", value: "i1" }] },
    });
    expect(wrapper.classes()).toContain("mizu-accordion");
  });

  it("renders horizontal orientation class", () => {
    const wrapper = mount(MizuAccordionRoot, {
      props: {
        orientation: "horizontal",
        items: [{ label: "Item", value: "i1" }],
      },
    });
    expect(wrapper.classes()).toContain("mizu-accordion--horizontal");
  });

  it("generates value from index when no value provided", () => {
    const items = [{ label: "First" }, { label: "Second" }];
    const wrapper = mount(MizuAccordionRoot, {
      props: { items },
    });
    expect(wrapper.findAll(".mizu-accordion__item").length).toBe(2);
  });
});
