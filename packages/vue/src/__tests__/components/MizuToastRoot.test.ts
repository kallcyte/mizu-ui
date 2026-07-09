import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuToastRoot from "../../components/MizuToastRoot.vue";

// Stub the Reka UI ToastRoot component to avoid the ToastProvider dependency
const stubs = {
  ToastRoot: {
    inheritAttrs: false,
    name: "ToastRoot",
    template: '<div :class="$attrs.class" :style="$attrs.style"><slot /></div>',
  },
};

describe("MizuToastRoot", () => {
  it("renders with default props via slot", () => {
    const wrapper = mount(MizuToastRoot, {
      props: { defaultOpen: true },
      slots: { default: "Toast message" },
      global: { stubs },
    });
    expect(wrapper.text()).toContain("Toast message");
  });

  it("passes variant class to root element", () => {
    const wrapper = mount(MizuToastRoot, {
      props: { variant: "success", defaultOpen: true },
      slots: { default: "Success" },
      global: { stubs },
    });
    expect(wrapper.find(".mizu-toast--success").exists()).toBe(true);
  });

  it("applies warning variant class", () => {
    const wrapper = mount(MizuToastRoot, {
      props: { variant: "warning", defaultOpen: true },
      slots: { default: "Warning" },
      global: { stubs },
    });
    expect(wrapper.find(".mizu-toast--warning").exists()).toBe(true);
  });

  it("applies error variant class", () => {
    const wrapper = mount(MizuToastRoot, {
      props: { variant: "error", defaultOpen: true },
      slots: { default: "Error" },
      global: { stubs },
    });
    expect(wrapper.find(".mizu-toast--error").exists()).toBe(true);
  });

  it("applies info variant class", () => {
    const wrapper = mount(MizuToastRoot, {
      props: { variant: "info", defaultOpen: true },
      slots: { default: "Info" },
      global: { stubs },
    });
    expect(wrapper.find(".mizu-toast--info").exists()).toBe(true);
  });

  it("sets CSS custom properties for position-based slide animation", () => {
    const wrapper = mount(MizuToastRoot, {
      props: { position: "bottom-right", defaultOpen: true },
      slots: { default: "Toast" },
      global: { stubs },
    });
    const toastEl = wrapper.find(".mizu-toast");
    const style = toastEl.attributes("style");
    expect(style).toContain("--toast-slide-from-x");
    expect(style).toContain("--toast-slide-from-y");
  });

  it("sets slide from right by default", () => {
    const wrapper = mount(MizuToastRoot, {
      props: { position: "top-right", defaultOpen: true },
      slots: { default: "Toast" },
      global: { stubs },
    });
    const style = wrapper.find(".mizu-toast").attributes("style");
    expect(style).toContain("--toast-slide-from-x: 100%");
  });

  it("sets slide from left for top-left position", () => {
    const wrapper = mount(MizuToastRoot, {
      props: { position: "top-left", defaultOpen: true },
      slots: { default: "Toast" },
      global: { stubs },
    });
    const style = wrapper.find(".mizu-toast").attributes("style");
    expect(style).toContain("--toast-slide-from-x: -100%");
  });

  it("sets slide from center for top-center position", () => {
    const wrapper = mount(MizuToastRoot, {
      props: { position: "top-center", defaultOpen: true },
      slots: { default: "Toast" },
      global: { stubs },
    });
    const style = wrapper.find(".mizu-toast").attributes("style");
    expect(style).toContain("--toast-slide-from-x: 0");
  });

  it("accepts type prop", () => {
    const wrapper = mount(MizuToastRoot, {
      props: { type: "background", defaultOpen: true },
      slots: { default: "Toast" },
      global: { stubs },
    });
    expect(wrapper.text()).toContain("Toast");
  });

  it("accepts custom duration", () => {
    const wrapper = mount(MizuToastRoot, {
      props: { duration: 5000, defaultOpen: true },
      slots: { default: "Toast" },
      global: { stubs },
    });
    expect(wrapper.text()).toContain("Toast");
  });
});
