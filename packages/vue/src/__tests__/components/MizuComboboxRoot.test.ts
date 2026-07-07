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

  describe("items API", () => {
    const items = [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
    ];

    it("renders combobox anchor with input and trigger when items prop is provided", () => {
      const wrapper = mount(MizuComboboxRoot, {
        props: { items },
      });
      expect(wrapper.find(".mizu-combobox__anchor").exists()).toBe(true);
      expect(wrapper.find(".mizu-combobox__input").exists()).toBe(true);
      expect(wrapper.find(".mizu-combobox__trigger").exists()).toBe(true);
    });

    it("renders placeholder text in the input", () => {
      const wrapper = mount(MizuComboboxRoot, {
        props: { items, placeholder: "Pick a fruit..." },
      });
      const input = wrapper.find(".mizu-combobox__input");
      expect(input.attributes("placeholder")).toBe("Pick a fruit...");
    });

    it("renders item labels in the dropdown viewport", () => {
      const wrapper = mount(MizuComboboxRoot, {
        props: { items, defaultOpen: true },
        attachTo: document.body,
        global: {
          stubs: {
            MizuComboboxPortal: {
              inheritAttrs: false,
              template: '<div class="mizu-combobox-portal-stub"><slot /></div>',
            },
          },
        },
      });
      expect(wrapper.text()).toContain("Apple");
      expect(wrapper.text()).toContain("Banana");
      expect(wrapper.text()).toContain("Cherry");
    });

    it("renders check indicator on selected items", () => {
      const wrapper = mount(MizuComboboxRoot, {
        props: { items, modelValue: "apple", defaultOpen: true },
        attachTo: document.body,
        global: {
          stubs: {
            MizuComboboxPortal: {
              inheritAttrs: false,
              template: '<div class="mizu-combobox-portal-stub"><slot /></div>',
            },
          },
        },
      });
      expect(wrapper.find(".mizu-combobox__item-indicator").exists()).toBe(true);
    });

    it("renders grouped items with labels", () => {
      const groupedItems = [
        { value: "apple", label: "Apple", group: "Fruits" },
        { value: "carrot", label: "Carrot", group: "Vegetables" },
      ];
      const wrapper = mount(MizuComboboxRoot, {
        props: { items: groupedItems, defaultOpen: true },
        attachTo: document.body,
        global: {
          stubs: {
            MizuComboboxPortal: {
              inheritAttrs: false,
              template: '<div class="mizu-combobox-portal-stub"><slot /></div>',
            },
          },
        },
      });
      expect(wrapper.find(".mizu-combobox__label").exists()).toBe(true);
    });

    it("renders error state on anchor when error prop is true", () => {
      const wrapper = mount(MizuComboboxRoot, {
        props: { items, error: true },
      });
      expect(wrapper.find(".mizu-combobox__anchor--error").exists()).toBe(true);
    });

    it("renders helper text when helperText prop is set", () => {
      const wrapper = mount(MizuComboboxRoot, {
        props: { items, helperText: "Select a fruit" },
      });
      expect(wrapper.find(".mizu-combobox__helper").exists()).toBe(true);
      expect(wrapper.find(".mizu-combobox__helper").text()).toBe("Select a fruit");
    });

    it("falls back to composition mode when no items prop", () => {
      const wrapper = mount(MizuComboboxRoot, {
        slots: { default: "Manual content" },
      });
      expect(wrapper.text()).toContain("Manual content");
      expect(wrapper.find(".mizu-combobox__anchor").exists()).toBe(false);
    });
  });
});
