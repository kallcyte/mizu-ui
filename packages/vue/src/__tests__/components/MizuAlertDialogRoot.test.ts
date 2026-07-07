import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuAlertDialogRoot from "../../components/MizuAlertDialogRoot.vue";

describe("MizuAlertDialogRoot", () => {
  it("renders slot content", () => {
    const wrapper = mount(MizuAlertDialogRoot, {
      slots: { default: '<button class="alert-trigger">Delete</button>' },
    });
    expect(wrapper.find(".alert-trigger").exists()).toBe(true);
    expect(wrapper.text()).toBe("Delete");
  });

  it("renders multiple slot elements", () => {
    const wrapper = mount(MizuAlertDialogRoot, {
      slots: { default: '<span>Cancel</span><span>Confirm</span>' },
    });
    expect(wrapper.findAll("span").length).toBe(2);
  });

  it("accepts open prop for controlled mode", () => {
    const wrapper = mount(MizuAlertDialogRoot, {
      props: { open: true },
      slots: { default: "Content" },
    });
    expect(wrapper.text()).toBe("Content");
  });

  it("accepts defaultOpen prop", () => {
    const wrapper = mount(MizuAlertDialogRoot, {
      props: { defaultOpen: true },
      slots: { default: '<span>Open dialog</span>' },
    });
    expect(wrapper.find("span").exists()).toBe(true);
  });
});
