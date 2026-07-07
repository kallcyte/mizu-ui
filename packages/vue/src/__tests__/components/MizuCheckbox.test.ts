import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuCheckbox from "../../components/MizuCheckbox.vue";

describe("MizuCheckbox", () => {
  it("renders the checkbox root", () => {
    const wrapper = mount(MizuCheckbox, {
      props: { modelValue: false },
    });
    expect(wrapper.find(".mizu-checkbox").exists()).toBe(true);
  });

  it("renders label when label prop is set", () => {
    const wrapper = mount(MizuCheckbox, {
      props: { modelValue: false, label: "Accept terms" },
    });
    expect(wrapper.find(".mizu-checkbox__label").text()).toBe("Accept terms");
  });

  it("does not render label wrapper when label is not set", () => {
    const wrapper = mount(MizuCheckbox, {
      props: { modelValue: false },
    });
    expect(wrapper.find(".mizu-checkbox__label").exists()).toBe(false);
    expect(wrapper.find(".mizu-checkbox-wrapper--no-label").exists()).toBe(true);
  });

  it("applies disabled class when disabled prop is true", () => {
    const wrapper = mount(MizuCheckbox, {
      props: { modelValue: false, disabled: true },
    });
    expect(wrapper.find(".mizu-checkbox").classes()).toContain("mizu-checkbox--disabled");
    expect(wrapper.find(".mizu-checkbox-wrapper--disabled").exists()).toBe(true);
  });

  it("applies checked class when checked", () => {
    const wrapper = mount(MizuCheckbox, {
      props: { modelValue: true },
    });
    expect(wrapper.find(".mizu-checkbox").classes()).toContain("mizu-checkbox--checked");
  });

  it("applies indeterminate class when modelValue is indeterminate", () => {
    const wrapper = mount(MizuCheckbox, {
      props: { modelValue: "indeterminate" as any },
    });
    expect(wrapper.find(".mizu-checkbox").classes()).toContain("mizu-checkbox--indeterminate");
  });

  it("applies size class based on size prop", () => {
    const wrapper = mount(MizuCheckbox, {
      props: { modelValue: false, size: "lg" },
    });
    expect(wrapper.find(".mizu-checkbox").classes()).toContain("mizu-checkbox--lg");
  });

  it("renders the indicator with check icon when checked", () => {
    const wrapper = mount(MizuCheckbox, {
      props: { modelValue: true },
    });
    expect(wrapper.find(".mizu-checkbox__indicator").exists()).toBe(true);
    // Should render check SVG path (not indeterminate rect)
    expect(wrapper.find(".mizu-checkbox__icon path").exists()).toBe(true);
  });

  it("renders indeterminate icon when indeterminate", () => {
    const wrapper = mount(MizuCheckbox, {
      props: { modelValue: "indeterminate" as any },
    });
    expect(wrapper.find(".mizu-checkbox__indicator").exists()).toBe(true);
    // Should render the rect for indeterminate
    expect(wrapper.find(".mizu-checkbox__icon rect").exists()).toBe(true);
  });

  it("emits update:modelValue on click", async () => {
    const wrapper = mount(MizuCheckbox, {
      props: { modelValue: false },
    });
    await wrapper.find(".mizu-checkbox").trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  });
});
