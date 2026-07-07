import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import MizuButton from "../../components/MizuButton.vue";

describe("MizuButton", () => {
  it("renders as a button element", () => {
    const wrapper = mount(MizuButton);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("applies base button class", () => {
    const wrapper = mount(MizuButton);
    expect(wrapper.find("button").classes()).toContain("mizu-button");
  });

  // --- variant classes ---

  it.each([
    "primary",
    "accent",
    "ghost",
    "outline",
    "success",
    "warning",
    "error",
    "info",
  ] as const)("applies variant class mizu-%s", (variant) => {
    const wrapper = mount(MizuButton, { props: { variant } });
    expect(wrapper.find("button").classes()).toContain(`mizu-${variant}`);
  });

  it.each(["outline-success", "outline-warning", "outline-error", "outline-info"] as const)(
    "applies variant class mizu-%s",
    (variant) => {
      const wrapper = mount(MizuButton, { props: { variant } });
      expect(wrapper.find("button").classes()).toContain(`mizu-${variant}`);
    }
  );

  // --- size classes ---

  it.each(["sm", "md", "lg"] as const)("applies size class for size=%s", (size) => {
    const wrapper = mount(MizuButton, { props: { size } });
    expect(wrapper.find("button").classes()).toContain(`mizu-button--${size}`);
  });

  // --- disabled ---

  it("disables the button when disabled prop is true", () => {
    const wrapper = mount(MizuButton, { props: { disabled: true } });
    expect(wrapper.find("button").attributes("disabled")).toBeDefined();
  });

  it("applies disabled class when disabled prop is true", () => {
    const wrapper = mount(MizuButton, { props: { disabled: true } });
    expect(wrapper.find("button").classes()).toContain("mizu-button--disabled");
  });

  it("sets aria-disabled when disabled prop is true", () => {
    const wrapper = mount(MizuButton, { props: { disabled: true } });
    expect(wrapper.find("button").attributes("aria-disabled")).toBe("true");
  });

  // --- loading ---

  it("shows a spinner when loading prop is true", () => {
    const wrapper = mount(MizuButton, { props: { loading: true } });
    expect(wrapper.find(".mizu-spinner").exists()).toBe(true);
  });

  it("applies loading class when loading prop is true", () => {
    const wrapper = mount(MizuButton, { props: { loading: true } });
    expect(wrapper.find("button").classes()).toContain("mizu-button--loading");
  });

  it("sets aria-busy when loading prop is true", () => {
    const wrapper = mount(MizuButton, { props: { loading: true } });
    expect(wrapper.find("button").attributes("aria-busy")).toBe("true");
  });

  it("disables the button when loading prop is true", () => {
    const wrapper = mount(MizuButton, { props: { loading: true } });
    expect(wrapper.find("button").attributes("disabled")).toBeDefined();
  });

  it("renders slot content alongside the spinner when loading", () => {
    const wrapper = mount(MizuButton, {
      props: { loading: true },
      slots: { default: "Submit" },
    });
    expect(wrapper.find(".mizu-spinner").exists()).toBe(true);
    expect(wrapper.text()).toContain("Submit");
  });

  // --- default slot ---

  it("renders slot content when not loading", () => {
    const wrapper = mount(MizuButton, {
      slots: { default: "Click me" },
    });
    expect(wrapper.text()).toContain("Click me");
  });

  // --- icon slots ---

  it("renders leading-icon slot", () => {
    const wrapper = mount(MizuButton, {
      slots: { "leading-icon": '<span class="test-icon">L</span>' },
    });
    expect(wrapper.find(".test-icon").exists()).toBe(true);
  });

  it("renders trailing-icon slot", () => {
    const wrapper = mount(MizuButton, {
      slots: { "trailing-icon": '<span class="test-icon">T</span>' },
    });
    expect(wrapper.find(".test-icon").exists()).toBe(true);
  });

  // --- block ---

  it("applies block class when block prop is true", () => {
    const wrapper = mount(MizuButton, { props: { block: true } });
    expect(wrapper.find("button").classes()).toContain("mizu-button--block");
  });

  // --- square ---

  it("applies square class when square prop is true", () => {
    const wrapper = mount(MizuButton, { props: { square: true } });
    expect(wrapper.find("button").classes()).toContain("mizu-button--square");
  });

  // --- type ---

  it("sets type attribute to button by default", () => {
    const wrapper = mount(MizuButton);
    expect(wrapper.find("button").attributes("type")).toBe("button");
  });

  it("sets type attribute from prop", () => {
    const wrapper = mount(MizuButton, { props: { type: "submit" } });
    expect(wrapper.find("button").attributes("type")).toBe("submit");
  });

  // --- click handler ---

  it("emits click when clicked and not disabled", async () => {
    const onClick = vi.fn();
    const wrapper = mount(MizuButton, {
      attrs: { onClick },
    });
    await wrapper.find("button").trigger("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not emit click when disabled", async () => {
    const onClick = vi.fn();
    const wrapper = mount(MizuButton, {
      props: { disabled: true },
      attrs: { onClick },
    });
    await wrapper.find("button").trigger("click");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not emit click when loading", async () => {
    const onClick = vi.fn();
    const wrapper = mount(MizuButton, {
      props: { loading: true },
      attrs: { onClick },
    });
    await wrapper.find("button").trigger("click");
    expect(onClick).not.toHaveBeenCalled();
  });

  // --- border class for outline variants ---

  it("applies bordered class for outline variant", () => {
    const wrapper = mount(MizuButton, { props: { variant: "outline" } });
    expect(wrapper.find("button").classes()).toContain("mizu-button--bordered");
  });

  it("applies bordered class for outline-success variant", () => {
    const wrapper = mount(MizuButton, { props: { variant: "outline-success" } });
    expect(wrapper.find("button").classes()).toContain("mizu-button--bordered");
  });

  it("does not apply bordered class for primary variant", () => {
    const wrapper = mount(MizuButton, { props: { variant: "primary" } });
    expect(wrapper.find("button").classes()).not.toContain("mizu-button--bordered");
  });

  // --- CSS variables ---

  it("sets CSS custom properties for the variant colors", () => {
    const wrapper = mount(MizuButton, { props: { variant: "primary" } });
    const button = wrapper.find("button").element;
    expect(button.style.getPropertyValue("--mizu-btn-bg")).toBeTruthy();
    expect(button.style.getPropertyValue("--mizu-btn-text")).toBeTruthy();
    expect(button.style.getPropertyValue("--mizu-btn-border")).toBeTruthy();
  });
});
