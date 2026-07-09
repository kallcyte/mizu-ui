import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuSwitch from "../../components/MizuSwitch.vue";

describe("MizuSwitch", () => {
  it("renders the switch root", () => {
    const wrapper = mount(MizuSwitch, {
      props: { modelValue: false },
    });
    expect(wrapper.find(".mizu-switch").exists()).toBe(true);
  });

  it("renders the switch thumb", () => {
    const wrapper = mount(MizuSwitch, {
      props: { modelValue: false },
    });
    expect(wrapper.find(".mizu-switch__thumb").exists()).toBe(true);
  });

  it("renders label when label prop is set", () => {
    const wrapper = mount(MizuSwitch, {
      props: { modelValue: false, label: "Enable notifications" },
    });
    expect(wrapper.find(".mizu-switch__label").text()).toBe("Enable notifications");
  });

  it("does not render label when not set", () => {
    const wrapper = mount(MizuSwitch, {
      props: { modelValue: false },
    });
    expect(wrapper.find(".mizu-switch__label").exists()).toBe(false);
    expect(wrapper.find(".mizu-switch-wrapper--no-label").exists()).toBe(true);
  });

  it("applies checked class when modelValue matches trueValue", () => {
    const wrapper = mount(MizuSwitch, {
      props: { modelValue: true },
    });
    expect(wrapper.find(".mizu-switch").classes()).toContain("mizu-switch--checked");
  });

  it("does not apply checked class when modelValue is false", () => {
    const wrapper = mount(MizuSwitch, {
      props: { modelValue: false },
    });
    expect(wrapper.find(".mizu-switch").classes()).not.toContain("mizu-switch--checked");
  });

  it("applies disabled class when disabled prop is true", () => {
    const wrapper = mount(MizuSwitch, {
      props: { modelValue: false, disabled: true },
    });
    expect(wrapper.find(".mizu-switch").classes()).toContain("mizu-switch--disabled");
    expect(wrapper.find(".mizu-switch-wrapper--disabled").exists()).toBe(true);
  });

  it("applies size class based on size prop", () => {
    const wrapper = mount(MizuSwitch, {
      props: { modelValue: false, size: "lg" },
    });
    expect(wrapper.find(".mizu-switch").classes()).toContain("mizu-switch--lg");
  });

  it("emits update:modelValue on click", async () => {
    const wrapper = mount(MizuSwitch, {
      props: { modelValue: false },
    });
    await wrapper.find(".mizu-switch").trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  });
});
