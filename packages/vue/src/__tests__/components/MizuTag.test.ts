import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuTag from "../../components/MizuTag.vue";

describe("MizuTag", () => {
  it("renders with default variant", () => {
    const wrapper = mount(MizuTag, {
      slots: { default: "React" },
    });
    expect(wrapper.find(".mizu-tag").exists()).toBe(true);
    expect(wrapper.classes()).toContain("mizu-tag--primary");
    expect(wrapper.text()).toBe("React");
  });

  it("applies variant class", () => {
    const wrapper = mount(MizuTag, {
      props: { variant: "success" },
      slots: { default: "Done" },
    });
    expect(wrapper.classes()).toContain("mizu-tag--success");
  });

  it("shows close button when closable is true", () => {
    const wrapper = mount(MizuTag, {
      props: { closable: true },
      slots: { default: "Dismissable" },
    });
    expect(wrapper.find(".mizu-tag__close").exists()).toBe(true);
    expect(wrapper.classes()).toContain("mizu-tag--closable");
  });

  it("emits close when close button is clicked", async () => {
    const wrapper = mount(MizuTag, {
      props: { closable: true },
      slots: { default: "Dismissable" },
    });
    await wrapper.find(".mizu-tag__close").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("sets CSS custom properties", () => {
    const wrapper = mount(MizuTag, {
      props: { variant: "accent" },
      slots: { default: "Tag" },
    });
    const style = wrapper.find(".mizu-tag").attributes("style");
    expect(style).toContain("--mizu-tag-bg");
    expect(style).toContain("--mizu-tag-text");
    expect(style).toContain("--mizu-tag-border");
  });
});
