import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuMetric from "../../components/MizuMetric.vue";

describe("MizuMetric", () => {
  it("renders the metric with label and value", () => {
    const wrapper = mount(MizuMetric, {
      props: { label: "Revenue", value: "$12,345" },
    });
    expect(wrapper.find(".mizu-metric").exists()).toBe(true);
    expect(wrapper.find(".mizu-metric__label").text()).toBe("Revenue");
    expect(wrapper.find(".mizu-metric__value").text()).toBe("$12,345");
  });

  it("renders trend value when trendValue is provided", () => {
    const wrapper = mount(MizuMetric, {
      props: { label: "Users", value: "1,234", trend: "up", trendValue: "+12%" },
    });
    expect(wrapper.find(".mizu-metric__trend-value").text()).toBe("+12%");
  });

  it("renders trend icon for up trend", () => {
    const wrapper = mount(MizuMetric, {
      props: { label: "Users", value: "1,234", trend: "down", trendValue: "-5%" },
    });
    expect(wrapper.find(".mizu-metric__trend-icon").exists()).toBe(true);
  });

  it("does not render trend icon for neutral trend", () => {
    const wrapper = mount(MizuMetric, {
      props: { label: "Users", value: "1,234", trend: "neutral" },
    });
    expect(wrapper.find(".mizu-metric__trend-icon").exists()).toBe(false);
  });

  it("applies size and variant classes", () => {
    const wrapper = mount(MizuMetric, {
      props: { label: "Test", value: "100", size: "lg", variant: "primary" },
    });
    expect(wrapper.classes()).toContain("mizu-metric--lg");
    expect(wrapper.classes()).toContain("mizu-metric--primary");
  });
});
