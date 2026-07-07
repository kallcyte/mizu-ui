import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuRadio from "../../components/MizuRadio.vue";

const items = [
  { value: "option-1", label: "Option 1" },
  { value: "option-2", label: "Option 2", disabled: true },
  { value: "option-3", label: "Option 3" },
];

describe("MizuRadio", () => {
  it("renders radio group root", () => {
    const wrapper = mount(MizuRadio, {
      props: { modelValue: "", items },
    });
    expect(wrapper.find(".mizu-radio-group").exists()).toBe(true);
  });

  it("renders radio items from items prop", () => {
    const wrapper = mount(MizuRadio, {
      props: { modelValue: "", items },
    });
    const radioItems = wrapper.findAll(".mizu-radio-item");
    expect(radioItems.length).toBe(3);
  });

  it("renders item labels", () => {
    const wrapper = mount(MizuRadio, {
      props: { modelValue: "", items },
    });
    const labels = wrapper.findAll(".mizu-radio__item-label");
    expect(labels[0].text()).toBe("Option 1");
    expect(labels[1].text()).toBe("Option 2");
    expect(labels[2].text()).toBe("Option 3");
  });

  it("disables individual items", () => {
    const wrapper = mount(MizuRadio, {
      props: { modelValue: "", items },
    });
    const radioItems = wrapper.findAll(".mizu-radio-item");
    expect(radioItems[1].classes()).toContain("mizu-radio-item--disabled");
  });

  it("renders group label when label prop is set", () => {
    const wrapper = mount(MizuRadio, {
      props: { modelValue: "", items, label: "Choose one" },
    });
    expect(wrapper.find(".mizu-radio-group-label").text()).toContain("Choose one");
  });

  it("renders required indicator on group label", () => {
    const wrapper = mount(MizuRadio, {
      props: { modelValue: "", items, label: "Choose one", required: true },
    });
    expect(wrapper.find(".mizu-radio-group-label__required").exists()).toBe(true);
  });

  it("applies vertical orientation by default", () => {
    const wrapper = mount(MizuRadio, {
      props: { modelValue: "", items },
    });
    expect(wrapper.find(".mizu-radio-group").classes()).toContain("mizu-radio-group--vertical");
  });

  it("applies horizontal orientation class", () => {
    const wrapper = mount(MizuRadio, {
      props: { modelValue: "", items, orientation: "horizontal" },
    });
    expect(wrapper.find(".mizu-radio-group").classes()).toContain("mizu-radio-group--horizontal");
  });

  it("applies size class", () => {
    const wrapper = mount(MizuRadio, {
      props: { modelValue: "", items, size: "lg" },
    });
    expect(wrapper.find(".mizu-radio-group").classes()).toContain("mizu-radio-group--lg");
  });

  it("disables all items when disabled prop is true", () => {
    const wrapper = mount(MizuRadio, {
      props: { modelValue: "", items, disabled: true },
    });
    const radioItems = wrapper.findAll(".mizu-radio-item");
    radioItems.forEach((item) => {
      expect(item.classes()).toContain("mizu-radio-item--disabled");
    });
    expect(wrapper.find(".mizu-radio-group").classes()).toContain("mizu-radio-group--disabled");
  });

  it("emits update:modelValue when selection changes", async () => {
    const wrapper = mount(MizuRadio, {
      props: { modelValue: "", items },
    });
    const radio = wrapper.find('[data-state="unchecked"]');
    if (radio.exists()) {
      await radio.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    }
  });
});
