import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuSliderRoot from "../../components/MizuSliderRoot.vue";

describe("MizuSliderRoot", () => {
  it("renders with default props", () => {
    const wrapper = mount(MizuSliderRoot, {
      slots: { default: '<div class="slider-track">Track</div>' },
    });
    expect(wrapper.classes()).toContain("mizu-slider");
  });

  it("renders slot content", () => {
    const wrapper = mount(MizuSliderRoot, {
      slots: { default: '<div class="slider-thumb">Thumb</div>' },
    });
    expect(wrapper.find(".slider-thumb").exists()).toBe(true);
  });

  it("applies md size class by default", () => {
    const wrapper = mount(MizuSliderRoot, {
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-slider--md");
  });

  it("applies sm size class", () => {
    const wrapper = mount(MizuSliderRoot, {
      props: { size: "sm" },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-slider--sm");
  });

  it("applies lg size class", () => {
    const wrapper = mount(MizuSliderRoot, {
      props: { size: "lg" },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-slider--lg");
  });

  it("applies horizontal orientation class by default", () => {
    const wrapper = mount(MizuSliderRoot, {
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-slider--horizontal");
  });

  it("applies vertical orientation class", () => {
    const wrapper = mount(MizuSliderRoot, {
      props: { orientation: "vertical" },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-slider--vertical");
  });

  it("applies disabled class when disabled", () => {
    const wrapper = mount(MizuSliderRoot, {
      props: { disabled: true },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-slider--disabled");
  });

  it("accepts min/max values", () => {
    const wrapper = mount(MizuSliderRoot, {
      props: { min: 0, max: 200 },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-slider");
  });

  it("accepts step value", () => {
    const wrapper = mount(MizuSliderRoot, {
      props: { step: 5 },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-slider");
  });

  it("accepts modelValue", () => {
    const wrapper = mount(MizuSliderRoot, {
      props: { modelValue: 50 },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-slider");
  });

  it("accepts range modelValue as array", () => {
    const wrapper = mount(MizuSliderRoot, {
      props: { modelValue: [20, 80] },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-slider");
  });

  it("accepts inverted prop", () => {
    const wrapper = mount(MizuSliderRoot, {
      props: { inverted: true },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toContain("mizu-slider");
  });
});
