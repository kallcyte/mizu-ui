import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

import starlight from "@astrojs/starlight";

export default defineConfig({
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
      customCss: ["./src/styles/starlight.css"],
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
            { label: "Button", slug: "components/button" },
          ],
        },
      ],
    }),
  ],
});