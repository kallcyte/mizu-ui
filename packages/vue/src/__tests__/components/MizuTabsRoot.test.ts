import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuTabsRoot from "../../components/MizuTabsRoot.vue";

describe("MizuTabsRoot", () => {
  const defaultTabs = [
    { label: "Tab 1", value: "tab1", content: "Content 1" },
    { label: "Tab 2", value: "tab2", content: "Content 2" },
    { label: "Tab 3", value: "tab3", content: "Content 3" },
  ];

  it("renders with default props", () => {
    const wrapper = mount(MizuTabsRoot, {
      props: { tabs: defaultTabs },
    });
    expect(wrapper.classes()).toContain("mizu-tabs");
  });

  it("renders tabs list with triggers in items API mode", () => {
    const wrapper = mount(MizuTabsRoot, {
      props: { tabs: defaultTabs },
    });
    expect(wrapper.find(".mizu-tabs__list").exists()).toBe(true);
    const triggers = wrapper.findAll(".mizu-tabs__trigger");
    expect(triggers.length).toBe(3);
  });

  it("renders tab labels in triggers", () => {
    const wrapper = mount(MizuTabsRoot, {
      props: { tabs: defaultTabs },
    });
    const triggers = wrapper.findAll(".mizu-tabs__trigger");
    expect(triggers[0].text()).toBe("Tab 1");
    expect(triggers[1].text()).toBe("Tab 2");
    expect(triggers[2].text()).toBe("Tab 3");
  });

  it("renders tab content in items API mode with default value", () => {
    const wrapper = mount(MizuTabsRoot, {
      props: { tabs: defaultTabs, defaultValue: "tab1" },
    });
    const contents = wrapper.findAll(".mizu-tabs__content");
    expect(contents.length).toBeGreaterThanOrEqual(1);
  });

  it("renders composition mode when tabs prop is not provided", () => {
    const wrapper = mount(MizuTabsRoot, {
      slots: { default: '<div class="composition-slot">Custom content</div>' },
    });
    expect(wrapper.find(".composition-slot").exists()).toBe(true);
    expect(wrapper.text()).toBe("Custom content");
  });

  it("accepts variant prop", () => {
    const wrapper = mount(MizuTabsRoot, {
      props: { tabs: defaultTabs, variant: "button" },
    });
    expect(wrapper.find(".mizu-tabs__list").exists()).toBe(true);
  });

  it("accepts size prop", () => {
    const wrapper = mount(MizuTabsRoot, {
      props: { tabs: defaultTabs, size: "sm" },
    });
    expect(wrapper.find(".mizu-tabs__list").exists()).toBe(true);
  });

  it("renders disabled tab trigger", () => {
    const tabsWithDisabled = [
      { label: "Active", value: "active", content: "Active content" },
      { label: "Disabled", value: "disabled", content: "Disabled content", disabled: true },
    ];
    const wrapper = mount(MizuTabsRoot, {
      props: { tabs: tabsWithDisabled },
    });
    const triggers = wrapper.findAll(".mizu-tabs__trigger");
    expect(triggers[1].attributes("disabled")).toBeDefined();
  });

  it("accepts modelValue prop", () => {
    const wrapper = mount(MizuTabsRoot, {
      props: { tabs: defaultTabs, modelValue: "tab2" },
    });
    expect(wrapper.classes()).toContain("mizu-tabs");
  });

  it("accepts defaultValue for initial active tab", () => {
    const wrapper = mount(MizuTabsRoot, {
      props: { tabs: defaultTabs, defaultValue: "tab2" },
    });
    expect(wrapper.find(".mizu-tabs__trigger[data-state='active']").exists()).toBe(true);
  });
});
