import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { CalendarDate } from "@internationalized/date";
import MizuDateField from "../../components/MizuDateField.vue";
import type { DateRange } from "../../components/MizuDateField.vue";

describe("MizuDateField", () => {
  const date = new CalendarDate(2026, 7, 17);

  it("renders the formatted date value", () => {
    const wrapper = mount(MizuDateField, {
      props: { modelValue: date, dateStyle: "compact", locale: "en-GB" },
    });
    expect(wrapper.find(".mizu-date-field-trigger__value").exists()).toBe(true);
    expect(wrapper.find(".mizu-date-field-trigger__value").text()).toBe("Fri, 17 Jul 2026");
  });

  it("renders placeholder when no value is provided", () => {
    const wrapper = mount(MizuDateField, {
      props: { placeholder: "Choose a date" },
    });
    expect(wrapper.find(".mizu-date-field-trigger__placeholder").exists()).toBe(true);
    expect(wrapper.find(".mizu-date-field-trigger__placeholder").text()).toBe("Choose a date");
  });

  it("uses range placeholder in range mode", () => {
    const wrapper = mount(MizuDateField, {
      props: { range: true },
    });
    expect(wrapper.find(".mizu-date-field-trigger__placeholder").text()).toBe("Pick a date range");
  });

  it.each([
    ["short", "17/07/2026"],
    ["medium", "17 Jul 2026"],
    ["long", "17 July 2026"],
    ["full", "Friday, 17 July 2026"],
    ["compact", "Fri, 17 Jul 2026"],
  ] as const)("formats date with dateStyle=%s", (style, expected) => {
    const wrapper = mount(MizuDateField, {
      props: { modelValue: date, dateStyle: style, locale: "en-GB" },
    });
    expect(wrapper.find(".mizu-date-field-trigger__value").text()).toBe(expected);
  });

  it("supports a custom Intl.DateTimeFormat", () => {
    const wrapper = mount(MizuDateField, {
      props: {
        modelValue: date,
        locale: "en-GB",
        format: {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      },
    });
    expect(wrapper.find(".mizu-date-field-trigger__value").text()).toBe("Friday, 17 July 2026");
  });

  it("formats dates for a given locale", () => {
    const wrapper = mount(MizuDateField, {
      props: { modelValue: date, dateStyle: "full", locale: "de-DE" },
    });
    expect(wrapper.find(".mizu-date-field-trigger__value").text()).toBe("Freitag, 17. Juli 2026");
  });

  it("renders a formatted date range", () => {
    const range: DateRange = {
      start: new CalendarDate(2026, 7, 10),
      end: new CalendarDate(2026, 7, 24),
    };
    const wrapper = mount(MizuDateField, {
      props: { modelValue: range, range: true, dateStyle: "compact", locale: "en-GB" },
    });
    expect(wrapper.find(".mizu-date-field-trigger__value").text()).toBe(
      "Fri, 10 Jul 2026 — Fri, 24 Jul 2026"
    );
  });

  it("renders nothing when the range is incomplete", () => {
    const wrapper = mount(MizuDateField, {
      props: {
        modelValue: { start: new CalendarDate(2026, 7, 10) } as DateRange,
        range: true,
      },
    });
    expect(wrapper.find(".mizu-date-field-trigger__placeholder").exists()).toBe(true);
  });

  it("applies disabled state", () => {
    const wrapper = mount(MizuDateField, {
      props: { modelValue: date, disabled: true },
    });
    const trigger = wrapper.find("button");
    expect(trigger.attributes("disabled")).toBeDefined();
    expect(trigger.classes()).toContain("mizu-date-field-trigger--disabled");
  });

  it.each([
    ["sm", "h-7"],
    ["md", "h-9"],
    ["lg", "h-10"],
  ] as const)("applies size classes for size=%s", (size, expectedClass) => {
    const wrapper = mount(MizuDateField, {
      props: { modelValue: date, size },
    });
    expect(wrapper.find("button").classes()).toContain(expectedClass);
  });
});
