import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuTagsInput from "../../components/MizuTagsInput.vue";

describe("MizuTagsInput", () => {
  it("renders with default props", () => {
    const wrapper = mount(MizuTagsInput);
    expect(wrapper.find(".mizu-input-wrapper").exists()).toBe(true);
    expect(wrapper.find(".mizu-tags-input").exists()).toBe(true);
  });

  it("renders input field", () => {
    const wrapper = mount(MizuTagsInput);
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("input").attributes("type")).toBe("text");
  });

  it("renders placeholder text", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { placeholder: "Type a tag..." },
    });
    expect(wrapper.find("input").attributes("placeholder")).toBe("Type a tag...");
  });

  it("renders initial tags from modelValue", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { modelValue: ["vue", "react", "svelte"] },
    });
    const tags = wrapper.findAll(".mizu-tag");
    expect(tags.length).toBe(3);
    expect(tags[0].text()).toBe("vue");
    expect(tags[1].text()).toBe("react");
    expect(tags[2].text()).toBe("svelte");
  });

  it("renders MizuTag components with closable prop", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { modelValue: ["tag1", "tag2"] },
    });
    const tags = wrapper.findAll(".mizu-tag");
    expect(tags.length).toBe(2);
    expect(tags[0].classes()).toContain("mizu-tags-input__tag");
  });

  it("applies md size class by default on wrapper", () => {
    const wrapper = mount(MizuTagsInput);
    expect(wrapper.classes()).toContain("mizu-input-wrapper--md");
  });

  it("applies sm size class", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { size: "sm" },
    });
    expect(wrapper.classes()).toContain("mizu-input-wrapper--sm");
  });

  it("applies lg size class", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { size: "lg" },
    });
    expect(wrapper.classes()).toContain("mizu-input-wrapper--lg");
  });

  it("renders label when provided", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { label: "Technologies" },
    });
    const label = wrapper.find(".mizu-input-label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toContain("Technologies");
  });

  it("does not render label when not provided", () => {
    const wrapper = mount(MizuTagsInput);
    expect(wrapper.find(".mizu-input-label").exists()).toBe(false);
  });

  it("shows required asterisk when required", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { label: "Tags", required: true },
    });
    expect(wrapper.find(".mizu-input-label__required").exists()).toBe(true);
  });

  it("renders helper text when provided", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { helperText: "Press Enter to add a tag" },
    });
    expect(wrapper.find(".mizu-input-helper").exists()).toBe(true);
    expect(wrapper.find(".mizu-input-helper").text()).toBe("Press Enter to add a tag");
  });

  it("does not render helper text when empty", () => {
    const wrapper = mount(MizuTagsInput);
    expect(wrapper.find(".mizu-input-helper").exists()).toBe(false);
  });

  it("applies error class on container when error is true", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { error: true },
    });
    expect(wrapper.find(".mizu-tags-input").classes()).toContain("mizu-input--error");
  });

  it("applies error class on helper text when error is true", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { error: true, helperText: "Invalid tag" },
    });
    expect(wrapper.find(".mizu-input-helper").classes()).toContain("mizu-input-helper--error");
  });

  it("applies disabled state on container", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { disabled: true },
    });
    expect(wrapper.find(".mizu-tags-input").classes()).toContain("mizu-input--disabled");
  });

  it("disables input when disabled", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { disabled: true },
    });
    expect(wrapper.find("input").attributes("disabled")).toBeDefined();
  });

  it("applies tag variant to MizuTag components", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { modelValue: ["tag1"], tagVariant: "success" },
    });
    const tag = wrapper.find(".mizu-tag");
    expect(tag.classes()).toContain("mizu-tag--success");
  });

  it("has aria-disabled on container when disabled", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { disabled: true },
    });
    expect(wrapper.find(".mizu-tags-input").attributes("aria-disabled")).toBe("true");
  });

  it("has aria-required on container when required", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { required: true },
    });
    expect(wrapper.find(".mizu-tags-input").attributes("aria-required")).toBe("true");
  });

  it("has aria-invalid on container when error", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { error: true },
    });
    expect(wrapper.find(".mizu-tags-input").attributes("aria-invalid")).toBe("true");
  });

  it("assigns helper ID for aria-describedby", () => {
    const wrapper = mount(MizuTagsInput, {
      props: { helperText: "Helper", id: "my-tags" },
    });
    expect(wrapper.find(".mizu-tags-input").attributes("aria-describedby")).toBe("my-tags-helper");
  });
});
