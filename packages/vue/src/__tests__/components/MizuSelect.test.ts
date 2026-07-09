import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuSelect from "../../components/MizuSelect.vue";

const options = [
  { value: "option-1", label: "Option 1" },
  { value: "option-2", label: "Option 2" },
  { value: "option-3", label: "Option 3", disabled: true },
];

describe("MizuSelect", () => {
  it("renders the select element", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", options },
    });
    expect(wrapper.find("select").exists()).toBe(true);
  });

  it("renders options from the options prop", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", options, placeholder: "Select" },
    });
    const renderedOptions = wrapper.findAll("option");
    // 3 options + 1 placeholder = 4
    expect(renderedOptions.length).toBe(4);
    expect(renderedOptions[1].text()).toBe("Option 1");
    expect(renderedOptions[2].text()).toBe("Option 2");
    expect(renderedOptions[3].text()).toBe("Option 3");
  });

  it("disables specific option items", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", options, placeholder: "Select" },
    });
    const renderedOptions = wrapper.findAll("option");
    expect(renderedOptions[3].attributes("disabled")).toBeDefined();
  });

  it("renders placeholder as first disabled hidden option", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", options, placeholder: "Select something" },
    });
    const placeholder = wrapper.find("option[disabled][hidden]");
    expect(placeholder.exists()).toBe(true);
    expect(placeholder.text()).toBe("Select something");
  });

  it("applies error class when error prop is true", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", error: true },
    });
    expect(wrapper.find(".mizu-select").classes()).toContain("mizu-select--error");
  });

  it("applies disabled class when disabled prop is true", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", disabled: true },
    });
    expect(wrapper.find(".mizu-select").classes()).toContain("mizu-select--disabled");
    expect(wrapper.find("select").attributes("disabled")).toBeDefined();
  });

  it("renders helper text with error class", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", helperText: "Please select a value", error: true },
    });
    const helper = wrapper.find(".mizu-select-helper");
    expect(helper.exists()).toBe(true);
    expect(helper.text()).toBe("Please select a value");
    expect(helper.classes()).toContain("mizu-select-helper--error");
  });

  it("renders helper text without error class", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", helperText: "Optional hint" },
    });
    const helper = wrapper.find(".mizu-select-helper");
    expect(helper.classes()).not.toContain("mizu-select-helper--error");
  });

  it("does not render helper span when helperText is empty", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", helperText: "" },
    });
    expect(wrapper.find(".mizu-select-helper").exists()).toBe(false);
  });

  it("renders label when label prop is provided", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", label: "Choose one" },
    });
    expect(wrapper.find(".mizu-select-label").text()).toContain("Choose one");
  });

  it("renders required indicator", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", label: "Choose one", required: true },
    });
    expect(wrapper.find(".mizu-select-label__required").exists()).toBe(true);
  });

  it("applies size class based on size prop", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", size: "lg" },
    });
    expect(wrapper.find(".mizu-select").classes()).toContain("mizu-select--lg");
  });

  it("emits update:modelValue on change", async () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", options },
    });
    const select = wrapper.find("select");
    await select.setValue("option-2");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["option-2"]);
  });

  it("emits focus and blur events", async () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "" },
    });
    const select = wrapper.find("select");
    await select.trigger("focus");
    expect(wrapper.emitted("focus")).toBeTruthy();
    await select.trigger("blur");
    expect(wrapper.emitted("blur")).toBeTruthy();
  });

  it("sets aria-invalid when error is true", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", error: true },
    });
    expect(wrapper.find("select").attributes("aria-invalid")).toBe("true");
  });

  it("sets aria-describedby when helperText is provided", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "", helperText: "Help", name: "test" },
    });
    expect(wrapper.find("select").attributes("aria-describedby")).toBe("mizu-select-test-helper");
  });

  it("renders chevron icon", () => {
    const wrapper = mount(MizuSelect, {
      props: { modelValue: "" },
    });
    expect(wrapper.find(".mizu-select-chevron").exists()).toBe(true);
  });
});
