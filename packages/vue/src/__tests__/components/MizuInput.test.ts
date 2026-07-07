import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuInput from "../../components/MizuInput.vue";

describe("MizuInput", () => {
  it("renders an input element", () => {
    const wrapper = mount(MizuInput);
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("applies the default size class", () => {
    const wrapper = mount(MizuInput);
    expect(wrapper.find("input").classes()).toContain("mizu-input--md");
  });

  it("applies the specified size class", () => {
    const wrapper = mount(MizuInput, { props: { size: "sm" } });
    expect(wrapper.find("input").classes()).toContain("mizu-input--sm");
  });

  // --- helperText ---

  it("renders helper text below the input", () => {
    const wrapper = mount(MizuInput, {
      props: { helperText: "Please enter a valid email", error: true },
    });
    const helper = wrapper.find(".mizu-input-helper");
    expect(helper.exists()).toBe(true);
    expect(helper.text()).toBe("Please enter a valid email");
  });

  it("applies error class on helper when error prop is true", () => {
    const wrapper = mount(MizuInput, {
      props: { helperText: "Something went wrong", error: true },
    });
    const helper = wrapper.find(".mizu-input-helper");
    expect(helper.classes()).toContain("mizu-input-helper--error");
  });

  it("does not render helper span when helperText is empty", () => {
    const wrapper = mount(MizuInput, { props: { helperText: undefined } });
    expect(wrapper.find(".mizu-input-helper").exists()).toBe(false);
  });

  // --- error state ---

  it("applies error class on input when error prop is true", () => {
    const wrapper = mount(MizuInput, { props: { error: true } });
    expect(wrapper.find("input").classes()).toContain("mizu-input--error");
  });

  it("does not apply error class when error prop is false", () => {
    const wrapper = mount(MizuInput, { props: { error: false } });
    expect(wrapper.find("input").classes()).not.toContain("mizu-input--error");
  });

  // --- label ---

  it("renders a label when label prop is provided", () => {
    const wrapper = mount(MizuInput, { props: { label: "Email" } });
    expect(wrapper.find(".mizu-input-label").exists()).toBe(true);
    expect(wrapper.find(".mizu-input-label").text()).toContain("Email");
  });

  it("does not render label when label prop is not provided", () => {
    const wrapper = mount(MizuInput, { props: { label: undefined } });
    expect(wrapper.find(".mizu-input-label").exists()).toBe(false);
  });

  it("shows required indicator when required prop is true", () => {
    const wrapper = mount(MizuInput, { props: { label: "Email", required: true } });
    expect(wrapper.find(".mizu-input-label__required").exists()).toBe(true);
  });

  // --- disabled ---

  it("disables the input when disabled prop is true", () => {
    const wrapper = mount(MizuInput, { props: { disabled: true } });
    expect(wrapper.find("input").attributes("disabled")).toBeDefined();
  });

  it("applies disabled class when disabled prop is true", () => {
    const wrapper = mount(MizuInput, { props: { disabled: true } });
    expect(wrapper.find("input").classes()).toContain("mizu-input--disabled");
  });

  // --- v-model ---

  it("updates modelValue on input event", async () => {
    const wrapper = mount(MizuInput, {
      props: {
        modelValue: "",
        "onUpdate:modelValue": (e: string) => wrapper.setProps({ modelValue: e }),
      },
    });
    await wrapper.find("input").setValue("hello");
    expect(wrapper.props("modelValue")).toBe("hello");
  });

  // --- aria attributes ---

  it("sets aria-invalid when error is true", () => {
    const wrapper = mount(MizuInput, { props: { error: true } });
    expect(wrapper.find("input").attributes("aria-invalid")).toBe("true");
  });

  it("sets aria-describedby when helperText is provided", () => {
    const wrapper = mount(MizuInput, {
      props: { helperText: "Helpful text", name: "test" },
    });
    const input = wrapper.find("input");
    expect(input.attributes("aria-describedby")).toBe("mizu-input-test-helper");
  });

  it("sets aria-disabled when disabled is true", () => {
    const wrapper = mount(MizuInput, { props: { disabled: true } });
    expect(wrapper.find("input").attributes("aria-disabled")).toBe("true");
  });

  it("sets aria-required when required is true", () => {
    const wrapper = mount(MizuInput, { props: { required: true } });
    expect(wrapper.find("input").attributes("aria-required")).toBe("true");
  });
});
