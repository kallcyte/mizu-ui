import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuAlert from "../../components/MizuAlert.vue";

describe("MizuAlert", () => {
  it("renders with default info variant", () => {
    const wrapper = mount(MizuAlert, {
      slots: { default: "This is an alert" },
    });
    expect(wrapper.find(".mizu-alert").exists()).toBe(true);
    expect(wrapper.classes()).toContain("mizu-alert--info");
    expect(wrapper.text()).toContain("This is an alert");
  });

  it("applies variant class", () => {
    const wrapper = mount(MizuAlert, {
      props: { variant: "success" },
      slots: { default: "Success!" },
    });
    expect(wrapper.classes()).toContain("mizu-alert--success");
  });

  it("applies error variant class", () => {
    const wrapper = mount(MizuAlert, {
      props: { variant: "error" },
      slots: { default: "Error!" },
    });
    expect(wrapper.classes()).toContain("mizu-alert--error");
  });

  it("renders title when provided", () => {
    const wrapper = mount(MizuAlert, {
      props: { title: "Alert Title" },
      slots: { default: "Alert body" },
    });
    expect(wrapper.find(".mizu-alert__title").text()).toBe("Alert Title");
  });

  it("does not render title when not provided", () => {
    const wrapper = mount(MizuAlert, {
      slots: { default: "Alert body" },
    });
    expect(wrapper.find(".mizu-alert__title").exists()).toBe(false);
  });

  it("renders default icon by default", () => {
    const wrapper = mount(MizuAlert, {
      slots: { default: "Info" },
    });
    expect(wrapper.find(".mizu-alert__icon").exists()).toBe(true);
  });

  it("hides default icon when defaultIcon is false", () => {
    const wrapper = mount(MizuAlert, {
      props: { defaultIcon: false },
      slots: { default: "Info" },
    });
    expect(wrapper.find(".mizu-alert__icon").exists()).toBe(false);
  });

  it("renders custom icon slot", () => {
    const wrapper = mount(MizuAlert, {
      slots: {
        default: "Info",
        icon: '<span class="custom-icon">!</span>',
      },
    });
    expect(wrapper.find(".custom-icon").exists()).toBe(true);
  });

  it("shows close button when closable is true", () => {
    const wrapper = mount(MizuAlert, {
      props: { closable: true },
      slots: { default: "Closable" },
    });
    expect(wrapper.find(".mizu-alert__close").exists()).toBe(true);
  });

  it("emits close when close button is clicked", async () => {
    const wrapper = mount(MizuAlert, {
      props: { closable: true },
      slots: { default: "Closable" },
    });
    await wrapper.find(".mizu-alert__close").trigger("click");
    // After 200ms timeout, should emit close
    await new Promise((resolve) => setTimeout(resolve, 250));
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("sets role=alert for error variant", () => {
    const wrapper = mount(MizuAlert, {
      props: { variant: "error" },
      slots: { default: "Error" },
    });
    expect(wrapper.find(".mizu-alert").attributes("role")).toBe("alert");
    expect(wrapper.find(".mizu-alert").attributes("aria-live")).toBe("assertive");
  });

  it("sets role=status for non-error variants", () => {
    const wrapper = mount(MizuAlert, {
      props: { variant: "success" },
      slots: { default: "Success" },
    });
    expect(wrapper.find(".mizu-alert").attributes("role")).toBe("status");
    expect(wrapper.find(".mizu-alert").attributes("aria-live")).toBe("polite");
  });

  it("sets CSS custom properties for variant colors", () => {
    const wrapper = mount(MizuAlert, {
      props: { variant: "warning" },
      slots: { default: "Warning" },
    });
    const style = wrapper.find(".mizu-alert").attributes("style");
    expect(style).toContain("--mizu-alert-bg");
    expect(style).toContain("--mizu-alert-text");
  });
});
