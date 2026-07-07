import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

import starlight from "@astrojs/starlight";

import node from "@astrojs/node";

export default defineConfig({
  site: "https://mizu.kall.dev",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  integrations: [
    vue(),
    starlight({
      title: "Mizu Design System",
      customCss: [
        "./src/styles/tokens.css",
        "./src/styles/starlight.css",
        "@mizu/vue/style.css",
      ],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: true,
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Noto+Serif:wght@400;500;600;700&display=swap",
          },
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Changelog", slug: "getting-started/changelog" },
          ],
        },
        {
          label: "Tokens",
          items: [{ label: "Overview", slug: "tokens/overview" }],
        },
        {
          label: "Components",
          items: [
            {
              label: "Element",
              items: [
                { label: "Alert", slug: "components/element/alert" },
                { label: "Avatar", slug: "components/element/avatar" },
                {
                  label: "Avatar Group",
                  slug: "components/element/avatar-group",
                },
                { label: "Badge", slug: "components/element/badge" },
                { label: "Button", slug: "components/element/button" },
                { label: "Card", slug: "components/element/card" },
                {
                  label: "Collapsible",
                  slug: "components/element/collapsible",
                },
                { label: "Divider", slug: "components/element/divider" },
                { label: "Kbd", slug: "components/element/kbd" },
                { label: "Progress", slug: "components/element/progress" },
                { label: "Skeleton", slug: "components/element/skeleton" },
                { label: "Tag", slug: "components/element/tag" },
              ],
            },
            {
              label: "Form",
              items: [
                { label: "Checkbox", slug: "components/forms/checkbox" },
                {
                  label: "CheckboxGroup",
                  slug: "components/forms/checkbox-group",
                },
                { label: "Combobox", slug: "components/forms/combobox" },
                { label: "Form", slug: "components/forms/form" },
                { label: "Input", slug: "components/forms/input" },
                { label: "NumberField", slug: "components/forms/number-field" },
                { label: "Radio", slug: "components/forms/radio" },
                { label: "Select", slug: "components/forms/select" },
                { label: "Slider", slug: "components/forms/slider" },
                { label: "Switch", slug: "components/forms/switch" },
                { label: "TagsInput", slug: "components/forms/tags-input" },
                { label: "Textarea", slug: "components/forms/textarea" },
                { label: "ToggleGroup", slug: "components/forms/toggle-group" },
                {
                  label: "Validation Patterns",
                  slug: "components/forms/validation-patterns",
                },
              ],
            },
            {
              label: "Data",
              items: [
                { label: "Accordion", slug: "components/data/accordion" },
                { label: "DashList", slug: "components/data/dashlist" },
                { label: "DataTable", slug: "components/data/data-table" },
                { label: "Empty", slug: "components/data/empty" },
                { label: "Metric", slug: "components/data/metric" },
                { label: "Quote", slug: "components/data/quote" },
              ],
            },
            {
              label: "Overlay",
              items: [
                {
                  label: "AlertDialog",
                  slug: "components/overlay/alert-dialog",
                },
                { label: "Dialog", slug: "components/overlay/dialog" },
                { label: "Drawer", slug: "components/overlay/drawer" },
                {
                  label: "DropdownMenu",
                  slug: "components/overlay/dropdown-menu",
                },
                { label: "Popover", slug: "components/overlay/popover" },
                { label: "Toast", slug: "components/overlay/toast" },
                { label: "Tooltip", slug: "components/overlay/tooltip" },
              ],
            },
            {
              label: "Layout",
              items: [
                { label: "Breadcrumb", slug: "components/layout/breadcrumb" },
                { label: "ScrollArea", slug: "components/layout/scroll-area" },
                { label: "Tabs", slug: "components/layout/tabs" },
              ],
            },
            {
              label: "Navigation",
              items: [
                {
                  label: "Pagination",
                  slug: "components/navigation/pagination",
                },
              ],
            },
          ],
        },
        {
          label: "Samples",
          items: [{ label: "Login", slug: "samples/login" }],
        },
      ],
    }),
  ],
});
