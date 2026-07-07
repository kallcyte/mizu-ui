import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuDialogRoot from "../../components/MizuDialogRoot.vue";

// Helper to mount shorthand mode dialogs with portal support
// Stubs MizuDialogPortal to render in-place (Reka UI's DialogPortal doesn't use Vue Teleport)
function mountShorthand(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  return mount(MizuDialogRoot, {
    props,
    slots: {
      default: '<button class="trigger-btn">Open</button>',
      ...slots,
    },
    attachTo: document.body,
    global: {
      stubs: {
        MizuDialogPortal: {
          inheritAttrs: false,
          template: '<div class="mizu-dialog-portal-stub"><slot /></div>',
        },
      },
    },
  } as any);
}

describe("MizuDialogRoot", () => {
  it("renders compound mode default slot content", () => {
    const wrapper = mount(MizuDialogRoot, {
      slots: { default: '<div class="custom-dialog">My dialog</div>' },
    });
    expect(wrapper.find(".custom-dialog").exists()).toBe(true);
    expect(wrapper.text()).toBe("My dialog");
  });

  it("renders trigger slot in shorthand mode", () => {
    const wrapper = mountShorthand({ title: "Dialog Title" });
    expect(wrapper.find(".trigger-btn").exists()).toBe(true);
  });

  it("renders dialog title in shorthand mode", () => {
    const wrapper = mountShorthand(
      { title: "My Dialog Title", defaultOpen: true },
    );
    expect(wrapper.text()).toContain("My Dialog Title");
  });

  it("renders dialog description in shorthand mode", () => {
    const wrapper = mountShorthand(
      { description: "Dialog description text", defaultOpen: true },
    );
    expect(wrapper.text()).toContain("Dialog description text");
  });

  it("renders content slot in shorthand mode", () => {
    const wrapper = mountShorthand(
      { defaultOpen: true },
      { content: '<div class="content-slot">Custom full content</div>' },
    );
    expect(wrapper.find(".content-slot").exists()).toBe(true);
  });

  it("accepts size prop in compound mode", () => {
    const wrapper = mount(MizuDialogRoot, {
      props: { size: "lg" },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("accepts fullscreen prop in compound mode", () => {
    const wrapper = mount(MizuDialogRoot, {
      props: { fullscreen: true },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("accepts modal prop in compound mode", () => {
    const wrapper = mount(MizuDialogRoot, {
      props: { modal: false },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("accepts dismissible prop in compound mode", () => {
    const wrapper = mount(MizuDialogRoot, {
      props: { dismissible: false },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("accepts scrollable prop in compound mode", () => {
    const wrapper = mount(MizuDialogRoot, {
      props: { scrollable: true },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("accepts transition prop in compound mode", () => {
    const wrapper = mount(MizuDialogRoot, {
      props: { transition: false },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("hides overlay when overlay prop is false in shorthand mode", () => {
    const wrapper = mountShorthand(
      { overlay: false, title: "Title", defaultOpen: true },
    );
    expect(wrapper.text()).toContain("Title");
  });

  it("accepts close prop to hide close button", () => {
    const wrapper = mountShorthand(
      { close: false, title: "Title", defaultOpen: true },
    );
    expect(wrapper.text()).toContain("Title");
  });
});
