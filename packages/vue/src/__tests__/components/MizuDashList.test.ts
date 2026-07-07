import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuDashList from "../../components/MizuDashList.vue";

describe("MizuDashList", () => {
  const items = [
    { label: "Status", value: "Active" },
    { label: "Role", value: "Admin" },
    { label: "Email", value: "user@example.com" },
  ];

  it("renders as a dl element", () => {
    const wrapper = mount(MizuDashList, {
      props: { items },
    });
    expect(wrapper.find("dl").exists()).toBe(true);
    expect(wrapper.find("dl").classes()).toContain("mizu-dashlist");
  });

  it("renders all items", () => {
    const wrapper = mount(MizuDashList, {
      props: { items },
    });
    const rows = wrapper.findAll(".mizu-dashlist__row");
    expect(rows.length).toBe(3);
  });

  it("renders item labels and values", () => {
    const wrapper = mount(MizuDashList, {
      props: { items },
    });
    expect(wrapper.find(".mizu-dashlist__label").text()).toBe("Status");
    expect(wrapper.find(".mizu-dashlist__value").text()).toBe("Active");
  });

  it("applies size class", () => {
    const wrapper = mount(MizuDashList, {
      props: { items, size: "lg" },
    });
    expect(wrapper.find("dl").classes()).toContain("mizu-dashlist--lg");
  });

  it("applies vertical orientation by default", () => {
    const wrapper = mount(MizuDashList, {
      props: { items },
    });
    expect(wrapper.find("dl").classes()).toContain("mizu-dashlist--vertical");
  });
});
