import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuComboboxRoot from "../../components/MizuComboboxRoot.vue";

describe("MizuComboboxRoot", () => {
  it("renders slot content", () => {
    const wrapper = mount(MizuComboboxRoot, {
      slots: { default: '<input class="combobox-input" placeholder="Search..." />' },
    });
    expect(wrapper.find(".combobox-input").exists()).toBe(true);
  });

  it("renders default slot text", () => {
    const wrapper = mount(MizuComboboxRoot, {
      slots: { default: "Options list" },
    });
    expect(wrapper.text()).toContain("Options");
  });

  it("accepts modelValue prop", () => {
    const wrapper = mount(MizuComboboxRoot, {
      props: { modelValue: "option-1" },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("accepts multiple prop", () => {
    const wrapper = mount(MizuComboboxRoot, {
      props: { multiple: true },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("accepts disabled prop", () => {
    const wrapper = mount(MizuComboboxRoot, {
      props: { disabled: true },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("accepts open prop for controlled mode", () => {
    const wrapper = mount(MizuComboboxRoot, {
      props: { open: true },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("accepts ignoreFilter prop", () => {
    const wrapper = mount(MizuComboboxRoot, {
      props: { ignoreFilter: true },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("accepts by prop for object comparison", () => {
    const wrapper = mount(MizuComboboxRoot, {
      props: { by: "id" },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });
});
