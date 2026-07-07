import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuTextarea from "../../components/MizuTextarea.vue";

describe("MizuTextarea", () => {
  it("renders the textarea element", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "" },
    });
    expect(wrapper.find("textarea").exists()).toBe(true);
  });

  it("applies error class when error prop is true", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "", error: true },
    });
    expect(wrapper.find(".mizu-textarea").classes()).toContain("mizu-textarea--error");
  });

  it("applies disabled class when disabled prop is true", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "", disabled: true },
    });
    expect(wrapper.find(".mizu-textarea").classes()).toContain("mizu-textarea--disabled");
    expect(wrapper.find("textarea").attributes("disabled")).toBeDefined();
  });

  it("renders helper text with error class", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "", helperText: "Error message", error: true },
    });
    const helper = wrapper.find(".mizu-textarea-helper");
    expect(helper.exists()).toBe(true);
    expect(helper.text()).toBe("Error message");
    expect(helper.classes()).toContain("mizu-textarea-helper--error");
  });

  it("renders helper text without error class", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "", helperText: "Optional hint" },
    });
    expect(wrapper.find(".mizu-textarea-helper").classes()).not.toContain(
      "mizu-textarea-helper--error"
    );
  });

  it("does not render helper span when helperText is empty", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "", helperText: "" },
    });
    expect(wrapper.find(".mizu-textarea-helper").exists()).toBe(false);
  });

  it("renders label when label prop is provided", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "", label: "Description" },
    });
    expect(wrapper.find(".mizu-textarea-label").text()).toContain("Description");
  });

  it("renders required indicator", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "", label: "Description", required: true },
    });
    expect(wrapper.find(".mizu-textarea-label__required").exists()).toBe(true);
  });

  it("applies size class based on size prop", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "", size: "lg" },
    });
    expect(wrapper.find(".mizu-textarea").classes()).toContain("mizu-textarea--lg");
  });

  it("sets rows attribute", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "", rows: 5 },
    });
    expect(wrapper.find("textarea").attributes("rows")).toBe("5");
  });

  it("defaults to 3 rows", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "" },
    });
    expect(wrapper.find("textarea").attributes("rows")).toBe("3");
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "" },
    });
    const textarea = wrapper.find("textarea");
    await textarea.setValue("hello world");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["hello world"]);
  });

  it("emits focus and blur events", async () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "" },
    });
    const textarea = wrapper.find("textarea");
    await textarea.trigger("focus");
    expect(wrapper.emitted("focus")).toBeTruthy();
    await textarea.trigger("blur");
    expect(wrapper.emitted("blur")).toBeTruthy();
  });

  it("sets aria-invalid when error is true", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "", error: true },
    });
    expect(wrapper.find("textarea").attributes("aria-invalid")).toBe("true");
  });

  it("sets aria-describedby when helperText is provided", () => {
    const wrapper = mount(MizuTextarea, {
      props: { modelValue: "", helperText: "Help", name: "test" },
    });
    expect(wrapper.find("textarea").attributes("aria-describedby")).toBe(
      "mizu-textarea-test-helper"
    );
  });
});
