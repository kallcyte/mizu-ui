import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuQuote from "../../components/MizuQuote.vue";

describe("MizuQuote", () => {
  it("renders the quote with default styling", () => {
    const wrapper = mount(MizuQuote, {
      slots: { default: "A wise quote." },
    });
    expect(wrapper.find(".mizu-quote").exists()).toBe(true);
    expect(wrapper.find("blockquote").exists()).toBe(true);
    expect(wrapper.text()).toBe("A wise quote.");
  });

  it("applies accent class when accent is true", () => {
    const wrapper = mount(MizuQuote, {
      props: { accent: true },
      slots: { default: "Accented quote." },
    });
    expect(wrapper.classes()).toContain("mizu-quote--accent");
  });

  it("renders citation footer when cite is provided", () => {
    const wrapper = mount(MizuQuote, {
      props: { cite: "Author Name" },
      slots: { default: "Quote text." },
    });
    expect(wrapper.find(".mizu-quote__cite").exists()).toBe(true);
    expect(wrapper.find("cite").text()).toBe("Author Name");
  });
});
