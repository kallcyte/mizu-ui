import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

import starlight from "@astrojs/starlight";

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
          items: [
            { label: "Overview", slug: "tokens/overview" },
          ],
        },
        {
          label: "Components",
          items: [
            { label: "Accordion", slug: "components/accordion" },
            { label: "Alert", slug: "components/alert" },
            { label: "AlertDialog", slug: "components/alert-dialog" },
            { label: "Avatar", slug: "components/avatar" },
            { label: "Breadcrumb", slug: "components/breadcrumb" },
            { label: "Button", slug: "components/button" },
            { label: "Card", slug: "components/card" },
            { label: "Checkbox", slug: "components/checkbox" },
            { label: "Combobox", slug: "components/combobox" },
            { label: "DashList", slug: "components/dashlist" },
            { label: "Data Table", slug: "components/data-table" },
            { label: "Dialog", slug: "components/dialog" },
            { label: "Divider", slug: "components/divider" },
            { label: "DropdownMenu", slug: "components/dropdown-menu" },
            { label: "Input", slug: "components/input" },
            { label: "Metric", slug: "components/metric" },
            { label: "NumberField", slug: "components/number-field" },
            { label: "Pagination", slug: "components/pagination" },
            { label: "Progress", slug: "components/progress" },
            { label: "Quote", slug: "components/quote" },
            { label: "Radio", slug: "components/radio" },
            { label: "Select", slug: "components/select" },
            { label: "Switch", slug: "components/switch" },
            { label: "Tabs", slug: "components/tabs" },
            { label: "Tag", slug: "components/tag" },
            { label: "Textarea", slug: "components/textarea" },
            { label: "Toast", slug: "components/toast" },
            { label: "Tooltip", slug: "components/tooltip" },
          ],
        },
      ],
    }),
  ],
});
