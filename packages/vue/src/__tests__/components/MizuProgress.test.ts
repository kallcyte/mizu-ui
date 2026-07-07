import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuProgress from "../../components/MizuProgress.vue";

describe("MizuProgress", () => {
  it("renders the progress element", () => {
    const wrapper = mount(MizuProgress, {
      props: { modelValue: 50 },
    });
    expect(wrapper.find(".mizu-progress").exists()).toBe(true);
  });

  it("sets the progress value via transform translate", () => {
    const wrapper = mount(MizuProgress, {
      props: { modelValue: 75 },
    });
    const indicator = wrapper.find(".mizu-progress__indicator");
    // Uses translateX(-25%) for 75% progress (100 - 75 = 25)
    expect(indicator.attributes("style")).toContain("translateX(-25%");
  });

  it("renders null modelValue as indeterminate", () => {
    const wrapper = mount(MizuProgress, {
      props: { modelValue: null },
    });
    const indicator = wrapper.find(".mizu-progress__indicator");
    expect(indicator.attributes("style")).toBeUndefined();
  });

  it("renders with default values", () => {
    const wrapper = mount(MizuProgress, {
      props: { modelValue: 50 },
    });
    const progress = wrapper.find(".mizu-progress");
    expect(progress.classes()).toContain("mizu-progress--md");
    expect(progress.classes()).toContain("mizu-progress--primary");
  });

  it("applies size class", () => {
    const wrapper = mount(MizuProgress, {
      props: { modelValue: 50, size: "sm" },
    });
    const progress = wrapper.find(".mizu-progress");
    expect(progress.classes()).toContain("mizu-progress--sm");
  });

  it("applies variant class", () => {
    const wrapper = mount(MizuProgress, {
      props: { modelValue: 50, variant: "success" },
    });
    const progress = wrapper.find(".mizu-progress");
    expect(progress.classes()).toContain("mizu-progress--success");
  });
});
