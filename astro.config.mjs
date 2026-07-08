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
      customCss: ["./src/styles/tokens.css", "./src/styles/starlight.css", "@mizu/vue/style.css"],
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
            { label: "Migration Guide", slug: "getting-started/migration" },
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
              label: "Data",
              items: [
                { label: "DashList", slug: "components/data/dashlist" },
                { label: "DataTable", slug: "components/data/data-table" },
                { label: "Metric", slug: "components/data/metric" },
                { label: "Quote", slug: "components/data/quote" },
              ],
            },
            {
              label: "Element",
              items: [
                { label: "Skeleton", slug: "components/element/skeleton" },
              ],
            },
            {
              label: "AlertDialog",
              slug: "components/overlay/alert-dialog",
            },
          ],
        },
      ],
    }),
  ],
});
