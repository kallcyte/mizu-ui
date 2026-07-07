import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuToggleGroupRoot from "../../components/MizuToggleGroupRoot.vue";

describe("MizuToggleGroupRoot", () => {
  it("renders with default props", () => {
    const wrapper = mount(MizuToggleGroupRoot, {
      slots: { default: '<button>Toggle</button>' },
    });
    expect(wrapper.classes()).toContain("mizu-toggle-group");
  });

  it("renders slot content", () => {
    const wrapper = mount(MizuToggleGroupRoot, {
      slots: { default: '<span class="toggle-item">A</span><span class="toggle-item">B</span>' },
    });
    expect(wrapper.findAll(".toggle-item").length).toBe(2);
  });

  it("accepts type single by default", () => {
    const wrapper = mount(MizuToggleGroupRoot, {
      slots: { default: "<button>Item</button>" },
    });
    expect(wrapper.classes()).toContain("mizu-toggle-group");
  });

  it("accepts type multiple", () => {
    const wrapper = mount(MizuToggleGroupRoot, {
      props: { type: "multiple" },
      slots: { default: "<button>A</button><button>B</button>" },
    });
    expect(wrapper.classes()).toContain("mizu-toggle-group");
  });

  it("applies data-size attribute", () => {
    const wrapper = mount(MizuToggleGroupRoot, {
      slots: { default: "<button>Item</button>" },
    });
    expect(wrapper.attributes("data-size")).toBe("md");
  });

  it("sets data-size to sm", () => {
    const wrapper = mount(MizuToggleGroupRoot, {
      props: { size: "sm" },
      slots: { default: "<button>Item</button>" },
    });
    expect(wrapper.attributes("data-size")).toBe("sm");
  });

  it("sets data-size to lg", () => {
    const wrapper = mount(MizuToggleGroupRoot, {
      props: { size: "lg" },
      slots: { default: "<button>Item</button>" },
    });
    expect(wrapper.attributes("data-size")).toBe("lg");
  });

  it("accepts disabled prop", () => {
    const wrapper = mount(MizuToggleGroupRoot, {
      props: { disabled: true },
      slots: { default: "<button>Item</button>" },
    });
    expect(wrapper.classes()).toContain("mizu-toggle-group");
  });

  it("accepts modelValue for controlled mode", () => {
    const wrapper = mount(MizuToggleGroupRoot, {
      props: { modelValue: "a" },
      slots: { default: "<button>Item</button>" },
    });
    expect(wrapper.classes()).toContain("mizu-toggle-group");
  });
});
