import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MizuAvatar from "../../components/MizuAvatar.vue";

describe("MizuAvatar", () => {
  it("renders with default icon when no props provided", () => {
    const wrapper = mount(MizuAvatar);
    expect(wrapper.find(".mizu-avatar").exists()).toBe(true);
    // Should render default icon SVG
    expect(wrapper.find(".mizu-avatar__icon").exists()).toBe(true);
  });

  it("renders an image when src is provided", () => {
    const wrapper = mount(MizuAvatar, {
      props: { src: "https://example.com/avatar.jpg", alt: "User" },
    });
    const img = wrapper.find(".mizu-avatar__image");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("https://example.com/avatar.jpg");
    expect(img.attributes("alt")).toBe("User");
  });

  it("renders initials from name", () => {
    const wrapper = mount(MizuAvatar, {
      props: { name: "John Doe" },
    });
    expect(wrapper.find(".mizu-avatar__initials").exists()).toBe(true);
    expect(wrapper.find(".mizu-avatar__initials").text()).toBe("JD");
  });

  it("renders single initial for one-word name", () => {
    const wrapper = mount(MizuAvatar, {
      props: { name: "Admin" },
    });
    expect(wrapper.find(".mizu-avatar__initials").text()).toBe("A");
  });

  it("renders icon slot when no image or name", () => {
    const wrapper = mount(MizuAvatar, {
      slots: { icon: '<span class="custom-icon">U</span>' },
    });
    expect(wrapper.find(".custom-icon").exists()).toBe(true);
  });

  it("applies size class", () => {
    const wrapper = mount(MizuAvatar, {
      props: { size: "lg" },
    });
    expect(wrapper.classes()).toContain("mizu-avatar--lg");
  });

  it("applies shape class", () => {
    const wrapper = mount(MizuAvatar, {
      props: { shape: "square" },
    });
    expect(wrapper.classes()).toContain("mizu-avatar--square");
  });

  it("applies color class", () => {
    const wrapper = mount(MizuAvatar, {
      props: { color: "primary" },
    });
    expect(wrapper.classes()).toContain("mizu-avatar--primary");
  });

  it("sets aria-label from alt", () => {
    const wrapper = mount(MizuAvatar, {
      props: { alt: "User avatar" },
    });
    expect(wrapper.attributes("aria-label")).toBe("User avatar");
  });

  it("handles image load error gracefully", async () => {
    const wrapper = mount(MizuAvatar, {
      props: { src: "https://example.com/broken.jpg", alt: "Broken" },
    });
    const img = wrapper.find(".mizu-avatar__image");
    await img.trigger("error");
    // Should show fallback (initials or icon)
    expect(wrapper.find(".mizu-avatar__image").exists()).toBe(false);
  });
});
