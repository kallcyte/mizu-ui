import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuButton from "../../components/MizuButton.vue";

describe("MizuButton", () => {
  it("renders button element", () => {
    const wrapper = mount(MizuButton, {
      slots: { default: "Click me" },
    });
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.text()).toBe("Click me");
  });

  it("applies primary variant class by default", () => {
    const wrapper = mount(MizuButton, {
      slots: { default: "Click" },
    });
    expect(wrapper.classes()).toContain("mizu-primary");
  });

  it("applies variant class based on variant prop", () => {
    const wrapper = mount(MizuButton, {
      props: { variant: "outline" },
      slots: { default: "Click" },
    });
    expect(wrapper.classes()).toContain("mizu-outline");
  });

  it("applies accent variant class", () => {
    const wrapper = mount(MizuButton, {
      props: { variant: "accent" },
      slots: { default: "Click" },
    });
    expect(wrapper.classes()).toContain("mizu-accent");
  });

  it("applies ghost variant class", () => {
    const wrapper = mount(MizuButton, {
      props: { variant: "ghost" },
      slots: { default: "Click" },
    });
    expect(wrapper.classes()).toContain("mizu-ghost");
  });

  it("applies size class based on size prop", () => {
    const wrapper = mount(MizuButton, {
      props: { size: "sm" },
      slots: { default: "Click" },
    });
    expect(wrapper.classes()).toContain("mizu-button--sm");
  });

  it("applies md size by default", () => {
    const wrapper = mount(MizuButton, {
      slots: { default: "Click" },
    });
    expect(wrapper.classes()).toContain("mizu-button--md");
  });

  it("is disabled when disabled prop is true", () => {
    const wrapper = mount(MizuButton, {
      props: { disabled: true },
      slots: { default: "Click" },
    });
    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
    expect(wrapper.classes()).toContain("mizu-button--disabled");
  });

  it("shows loading state when loading prop is true", () => {
    const wrapper = mount(MizuButton, {
      props: { loading: true },
      slots: { default: "Loading" },
    });
    // Should show spinner
    expect(wrapper.find(".mizu-spinner").exists()).toBe(true);
    expect(wrapper.classes()).toContain("mizu-button--loading");
    // Button should be disabled while loading
    expect(wrapper.find("button").attributes("disabled")).toBeDefined();
  });

  it("shows label alongside spinner when loading with content", () => {
    const wrapper = mount(MizuButton, {
      props: { loading: true },
      slots: { default: "Saving..." },
    });
    expect(wrapper.find(".mizu-spinner").exists()).toBe(true);
    expect(wrapper.find(".mizu-button__label").exists()).toBe(true);
    expect(wrapper.find(".mizu-button__label").text()).toBe("Saving...");
  });

  it("sets aria-busy when loading", () => {
    const wrapper = mount(MizuButton, {
      props: { loading: true },
      slots: { default: "Click" },
    });
    expect(wrapper.find("button").attributes("aria-busy")).toBe("true");
  });

  it("does not show leading icon wrapper when slot is empty", () => {
    const wrapper = mount(MizuButton, {
      slots: { default: "Click" },
    });
    expect(wrapper.find(".mizu-icon-wrapper").exists()).toBe(false);
  });

  it("renders leading icon slot", () => {
    const wrapper = mount(MizuButton, {
      slots: {
        default: "Click",
        "leading-icon": '<span class="leading-icon">+</span>',
      },
    });
    expect(wrapper.find(".leading-icon").exists()).toBe(true);
  });

  it("renders trailing icon slot", () => {
    const wrapper = mount(MizuButton, {
      slots: {
        default: "Click",
        "trailing-icon": '<span class="trailing-icon">></span>',
      },
    });
    expect(wrapper.find(".trailing-icon").exists()).toBe(true);
  });

  it("applies block class when block prop is true", () => {
    const wrapper = mount(MizuButton, {
      props: { block: true },
      slots: { default: "Full Width" },
    });
    expect(wrapper.classes()).toContain("mizu-button--block");
  });

  it("applies square class when square prop is true", () => {
    const wrapper = mount(MizuButton, {
      props: { square: true },
      slots: { default: "X" },
    });
    expect(wrapper.classes()).toContain("mizu-button--square");
  });

  it("sets type attribute based on type prop", () => {
    const wrapper = mount(MizuButton, {
      props: { type: "submit" },
      slots: { default: "Submit" },
    });
    expect(wrapper.find("button").attributes("type")).toBe("submit");
  });

  it("defaults to type button", () => {
    const wrapper = mount(MizuButton, {
      slots: { default: "Click" },
    });
    expect(wrapper.find("button").attributes("type")).toBe("button");
  });

  it("applies bordered class for outline variants", () => {
    const wrapper = mount(MizuButton, {
      props: { variant: "outline" },
      slots: { default: "Click" },
    });
    expect(wrapper.classes()).toContain("mizu-button--bordered");
  });

  it("applies bordered class for outline-success variant", () => {
    const wrapper = mount(MizuButton, {
      props: { variant: "outline-success" },
      slots: { default: "Click" },
    });
    expect(wrapper.classes()).toContain("mizu-button--bordered");
  });

  it("renders with CSS custom properties for variant colors", () => {
    const wrapper = mount(MizuButton, {
      props: { variant: "primary" },
      slots: { default: "Click" },
    });
    const button = wrapper.find("button");
    expect(button.attributes("style")).toContain("--mizu-btn-bg");
  });
});
