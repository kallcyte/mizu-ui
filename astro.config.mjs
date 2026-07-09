import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import ui from "@nuxt/ui/vite";
import { mizuTheme } from "@mizu/vue/theme";

import vue from "@astrojs/vue";

import starlight from "@astrojs/starlight";

import node from "@astrojs/node";

export default defineConfig({
  site: "https://mizu.kall.dev",
  vite: {
    plugins: [tailwindcss(), ui({
      router: false,
      components: {
        resolvers: [],
      },
      ui: mizuTheme,
    })],
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
      customCss: ["./src/styles/global.css", "@mizu/vue/style.css"],
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
        {
          tag: "style",
          content: ":root, [data-theme='light'], .sl-theme-light { color-scheme: light; --sl-color-accent: var(--color-brand-ycp); --sl-color-accent-high: var(--color-brand-primary); --sl-color-accent-low: var(--color-brand-primary-subtle); --sl-color-accent-subtle: var(--color-brand-ycp-subtle); --sl-color-text: var(--color-foreground-primary); --sl-color-text-light: var(--color-foreground-secondary); --sl-color-text-lighter: var(--color-foreground-tertiary); --sl-color-text-accent: var(--color-brand-primary); --sl-color-bg: var(--color-surface-base); --sl-color-bg-nav: var(--color-surface-subtle); --sl-color-bg-sidebar: var(--color-surface-subtle); --sl-color-bg-inline-code: var(--color-surface-muted); --sl-color-hairline: var(--color-surface-muted); --sl-color-hairline-shade: var(--color-surface-muted); --sl-font: var(--font-family-sans); --sl-font-mono: var(--font-family-mono); --sl-text-h1: 1.5rem; --sl-text-h2: 1.125rem; --sl-text-h3: 0.9375rem; --sl-text-h4: 0.9375rem; --sl-text-h5: 0.8125rem; --sl-text-h6: 0.6875rem; --sl-text-code: 0.8125rem; --sl-text-base: 0.9375rem; --sl-text-sm: 0.8125rem; --sl-text-xs: 0.6875rem; --sl-text-2xs: 0.625rem; --sl-line-height: 1.6; --sl-line-height-headings: 1.2; --sl-radius-sm: var(--radius-tight); --sl-radius-md: var(--radius-default); --sl-radius-lg: var(--radius-card); --sl-radius-xl: var(--radius-feature); --sl-radius-full: var(--radius-full); --sl-content-width: 45rem; } [data-theme='dark'], .sl-theme-dark { color-scheme: dark; --sl-color-accent: var(--color-brand-primary); --sl-color-accent-high: var(--color-brand-primary); --sl-color-accent-low: var(--color-surface-subtle); --sl-color-accent-subtle: var(--color-surface-subtle); --sl-color-text: var(--color-foreground-primary); --sl-color-text-light: var(--color-foreground-secondary); --sl-color-text-lighter: var(--color-foreground-tertiary); --sl-color-text-accent: var(--color-brand-primary); --sl-color-bg: var(--color-surface-base); --sl-color-bg-nav: var(--color-surface-subtle); --sl-color-bg-sidebar: var(--color-surface-subtle); --sl-color-bg-inline-code: var(--color-surface-muted); --sl-color-hairline: var(--color-surface-muted); --sl-color-hairline-shade: var(--color-surface-muted); --sl-font: var(--font-family-sans); --sl-font-mono: var(--font-family-mono); } h1#_top { color: var(--sl-color-text) !important; } summary .large { color: var(--sl-color-text) !important; } .sl-markdown-content h1 { font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; } .sl-markdown-content h2 { font-weight: 600; line-height: 1.25; } .sl-markdown-content h3 { font-weight: 600; line-height: 1.3; } .sl-markdown-content h4 { font-weight: 600; } .sl-markdown-content h5 { font-weight: 500; } .sl-markdown-content h6 { font-weight: 500; } .sl-markdown-content { font-weight: 400; }",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Icons", slug: "getting-started/icons" },
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
                { label: "Metric", slug: "components/data/metric" },
                { label: "Quote", slug: "components/data/quote" },
              ],
            },
            {
              label: "Forms",
              items: [
                { label: "Input", slug: "components/forms/input" },
                { label: "Textarea", slug: "components/forms/textarea" },
                { label: "Select", slug: "components/forms/select" },
                { label: "Checkbox", slug: "components/forms/checkbox" },
                { label: "Switch", slug: "components/forms/switch" },
                { label: "Form", slug: "components/forms/form" },
                { label: "Validation Patterns", slug: "components/forms/validation-patterns" },
              ],
            },
            {
              label: "Element",
              items: [
                { label: "Button", slug: "components/element/button" },
                { label: "Badge", slug: "components/element/badge" },
                { label: "Card", slug: "components/element/card" },
                { label: "Avatar", slug: "components/element/avatar" },
                { label: "Kbd", slug: "components/element/kbd" },
                { label: "Progress", slug: "components/element/progress" },
                { label: "Skeleton", slug: "components/element/skeleton" },
              ],
            },
            {
              label: "Navigation",
              items: [
                { label: "Tabs", slug: "components/navigation/tabs" },
                { label: "Breadcrumb", slug: "components/navigation/breadcrumb" },
                { label: "Pagination", slug: "components/navigation/pagination" },
              ],
            },
            {
              label: "Overlay",
              items: [
                { label: "Modal", slug: "components/overlay/modal" },
                { label: "Tooltip", slug: "components/overlay/tooltip" },
                { label: "Popover", slug: "components/overlay/popover" },
                { label: "DropdownMenu", slug: "components/overlay/dropdown-menu" },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
