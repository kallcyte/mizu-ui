import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuInput from "../../components/MizuInput.vue";

describe("MizuInput", () => {
  it("renders the input element", () => {
    const wrapper = mount(MizuInput, {
      props: { modelValue: "" },
    });
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("renders helper text below the input", () => {
    const wrapper = mount(MizuInput, {
      props: { helperText: "Please enter a valid email", error: true, modelValue: "" },
    });
    const helper = wrapper.find(".mizu-input-helper");
    expect(helper.exists()).toBe(true);
    expect(helper.text()).toBe("Please enter a valid email");
    expect(helper.classes()).toContain("mizu-input-helper--error");
  });

  it("renders helper text without error style when error is false", () => {
    const wrapper = mount(MizuInput, {
      props: { helperText: "Optional hint", modelValue: "" },
    });
    const helper = wrapper.find(".mizu-input-helper");
    expect(helper.exists()).toBe(true);
    expect(helper.classes()).not.toContain("mizu-input-helper--error");
  });

  it("does not render helper span when helperText is empty", () => {
    const wrapper = mount(MizuInput, {
      props: { helperText: "", modelValue: "" },
    });
    expect(wrapper.find(".mizu-input-helper").exists()).toBe(false);
  });

  it("applies error class to input when error prop is true", () => {
    const wrapper = mount(MizuInput, {
      props: { error: true, modelValue: "" },
    });
    const input = wrapper.find(".mizu-input");
    expect(input.classes()).toContain("mizu-input--error");
  });

  it("does not apply error class when error prop is false", () => {
    const wrapper = mount(MizuInput, {
      props: { error: false, modelValue: "" },
    });
    const input = wrapper.find(".mizu-input");
    expect(input.classes()).not.toContain("mizu-input--error");
  });

  it("applies disabled class to input when disabled prop is true", () => {
    const wrapper = mount(MizuInput, {
      props: { disabled: true, modelValue: "" },
    });
    const input = wrapper.find(".mizu-input");
    expect(input.classes()).toContain("mizu-input--disabled");
    expect(input.attributes("disabled")).toBeDefined();
  });

  it("renders the label when label prop is provided", () => {
    const wrapper = mount(MizuInput, {
      props: { label: "Email", modelValue: "" },
    });
    const label = wrapper.find(".mizu-input-label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toContain("Email");
  });

  it("renders required indicator asterisk", () => {
    const wrapper = mount(MizuInput, {
      props: { label: "Email", required: true, modelValue: "" },
    });
    const required = wrapper.find(".mizu-input-label__required");
    expect(required.exists()).toBe(true);
    expect(required.text()).toBe("*");
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(MizuInput, {
      props: { modelValue: "" },
    });
    const input = wrapper.find("input");
    await input.setValue("hello");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["hello"]);
  });

  it("emits focus and blur events", async () => {
    const wrapper = mount(MizuInput, {
      props: { modelValue: "" },
    });
    const input = wrapper.find("input");

    await input.trigger("focus");
    expect(wrapper.emitted("focus")).toBeTruthy();

    await input.trigger("blur");
    expect(wrapper.emitted("blur")).toBeTruthy();
  });

  it("applies size class based on size prop", () => {
    const wrapper = mount(MizuInput, {
      props: { size: "lg", modelValue: "" },
    });
    const input = wrapper.find(".mizu-input");
    expect(input.classes()).toContain("mizu-input--lg");
  });

  it("sets aria-invalid when error is true", () => {
    const wrapper = mount(MizuInput, {
      props: { error: true, modelValue: "" },
    });
    const input = wrapper.find("input");
    expect(input.attributes("aria-invalid")).toBe("true");
  });

  it("sets aria-describedby when helperText is provided", () => {
    const wrapper = mount(MizuInput, {
      props: { helperText: "Some help", modelValue: "", name: "test" },
    });
    const input = wrapper.find("input");
    expect(input.attributes("aria-describedby")).toBe("mizu-input-test-helper");
  });

  it("renders leading icon slot", () => {
    const wrapper = mount(MizuInput, {
      props: { modelValue: "" },
      slots: { "leading-icon": '<span class="leading-icon-slot">L</span>' },
    });
    expect(wrapper.find(".leading-icon-slot").exists()).toBe(true);
    expect(wrapper.find(".mizu-input-icon--leading").exists()).toBe(true);
  });

  it("renders trailing icon slot", () => {
    const wrapper = mount(MizuInput, {
      props: { modelValue: "" },
      slots: { "trailing-icon": '<span class="trailing-icon-slot">T</span>' },
    });
    expect(wrapper.find(".trailing-icon-slot").exists()).toBe(true);
    expect(wrapper.find(".mizu-input-icon--trailing").exists()).toBe(true);
  });

  it("shows password toggle button when showPassword is true and type is password", () => {
    const wrapper = mount(MizuInput, {
      props: { showPassword: true, type: "password", modelValue: "" },
    });
    expect(wrapper.find(".mizu-input-password-toggle").exists()).toBe(true);
  });

  it("does not show password toggle when type is not password", () => {
    const wrapper = mount(MizuInput, {
      props: { showPassword: true, type: "text", modelValue: "" },
    });
    expect(wrapper.find(".mizu-input-password-toggle").exists()).toBe(false);
  });
});
