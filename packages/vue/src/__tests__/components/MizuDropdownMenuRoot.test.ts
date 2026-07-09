import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuDropdownMenuRoot from "../../components/MizuDropdownMenuRoot.vue";

// Helper to create a wrapper that works around fragment rendering
// Stubs MizuDropdownMenuPortal to render in-place (Reka UI's DropdownMenuPortal doesn't use Vue Teleport)
function mountWithBody(options: Record<string, unknown> = {}) {
  return mount(MizuDropdownMenuRoot, {
    ...options,
    attachTo: document.body,
    global: {
      stubs: {
        MizuDropdownMenuPortal: {
          inheritAttrs: false,
          template: '<div class="mizu-dropdown-menu-portal-stub"><slot /></div>',
        },
      },
    },
  } as any);
}

describe("MizuDropdownMenuRoot", () => {
  it("renders composition mode slot content when no items prop", () => {
    const wrapper = mount(MizuDropdownMenuRoot, {
      slots: { default: '<div class="custom-menu">Manual menu</div>' },
    });
    expect(wrapper.find(".custom-menu").exists()).toBe(true);
    expect(wrapper.text()).toBe("Manual menu");
  });

  it("renders dropdown menu items in items API mode", () => {
    const items = [
      { type: "item" as const, label: "Profile" },
      { type: "item" as const, label: "Settings" },
    ];
    const wrapper = mountWithBody({
      props: { items, defaultOpen: true },
    });
    expect(wrapper.find(".mizu-dropdown-menu__item").exists()).toBe(true);
  });

  it("renders item labels in items API mode", () => {
    const items = [
      { type: "item" as const, label: "Profile" },
      { type: "item" as const, label: "Logout" },
    ];
    const wrapper = mountWithBody({
      props: { items, defaultOpen: true },
    });
    expect(wrapper.text()).toContain("Profile");
    expect(wrapper.text()).toContain("Logout");
  });

  it("renders separator type in items API mode", () => {
    const items = [
      { type: "item" as const, label: "Edit" },
      { type: "separator" as const },
      { type: "item" as const, label: "Delete" },
    ];
    const wrapper = mountWithBody({
      props: { items, defaultOpen: true },
    });
    expect(wrapper.find(".mizu-dropdown-menu__separator").exists()).toBe(true);
  });

  it("renders label type in items API mode", () => {
    const items = [
      { type: "label" as const, label: "Section Title" },
    ];
    const wrapper = mountWithBody({
      props: { items, defaultOpen: true },
    });
    expect(wrapper.find(".mizu-dropdown-menu__label").exists()).toBe(true);
    expect(wrapper.find(".mizu-dropdown-menu__label").text()).toBe("Section Title");
  });

  it("renders shortcut text when provided", () => {
    const items = [
      { type: "item" as const, label: "Copy", shortcut: "Ctrl+C" },
    ];
    const wrapper = mountWithBody({
      props: { items, defaultOpen: true },
    });
    expect(wrapper.find(".mizu-dropdown-menu__shortcut").exists()).toBe(true);
    expect(wrapper.find(".mizu-dropdown-menu__shortcut").text()).toBe("Ctrl+C");
  });

  it("accepts defaultOpen prop in composition mode", () => {
    const wrapper = mount(MizuDropdownMenuRoot, {
      props: { defaultOpen: true },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toContain("Content");
  });

  it("accepts open prop for controlled mode in composition mode", () => {
    const wrapper = mount(MizuDropdownMenuRoot, {
      props: { open: true },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toContain("Content");
  });

  it("accepts modal prop in composition mode", () => {
    const wrapper = mount(MizuDropdownMenuRoot, {
      props: { modal: false },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toContain("Content");
  });
});
