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
    plugins: [
      tailwindcss(),
      ui({
        router: false,
        components: {
          resolvers: [],
        },
        ui: mizuTheme,
        colors: { nexus: "#4521D8", ycp: "#001C44" },
      }),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  integrations: [
    vue(),
    starlight({
      title: "Mizu Design System v0.18.1",
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
          tag: "script",
          content:
            "(function(){var t=localStorage.getItem('starlight-theme');if(!t||t==='auto'){document.documentElement.dataset.theme='light';localStorage.setItem('starlight-theme','light');}})();",
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
                { label: "Accordion", slug: "components/data/accordion" },
                { label: "Carousel", slug: "components/data/carousel" },
                { label: "DashList", slug: "components/data/dashlist" },
                { label: "Empty", slug: "components/data/empty" },
                { label: "Marquee", slug: "components/data/marquee" },
                { label: "Metric", slug: "components/data/metric" },
                { label: "Quote", slug: "components/data/quote" },
                { label: "ScrollArea", slug: "components/data/scroll-area" },
                { label: "Table", slug: "components/data/table" },
                { label: "Timeline", slug: "components/data/timeline" },
                { label: "Tree", slug: "components/data/tree" },
                { label: "User", slug: "components/data/user" },
              ],
            },
            {
              label: "Forms",
              items: [
                { label: "Input", slug: "components/forms/input" },
                { label: "Textarea", slug: "components/forms/textarea" },
                { label: "Select", slug: "components/forms/select" },
                { label: "SelectMenu", slug: "components/forms/select-menu" },
                { label: "InputMenu", slug: "components/forms/input-menu" },
                { label: "InputTags", slug: "components/forms/input-tags" },
                { label: "InputDate", slug: "components/forms/input-date" },
                { label: "MizuDateField", slug: "components/forms/mizu-date-field" },
                { label: "InputTime", slug: "components/forms/input-time" },
                { label: "FieldGroup", slug: "components/forms/field-group" },
                { label: "Listbox", slug: "components/forms/listbox" },
                { label: "FileUpload", slug: "components/forms/file-upload" },
                { label: "Checkbox", slug: "components/forms/checkbox" },
                { label: "CheckboxGroup", slug: "components/forms/checkbox-group" },
                { label: "ColorPicker", slug: "components/forms/color-picker" },
                { label: "Switch", slug: "components/forms/switch" },
                { label: "Form", slug: "components/forms/form" },
                { label: "FormField", slug: "components/forms/form-field" },
                { label: "RadioGroup", slug: "components/forms/radio-group" },
                { label: "Slider", slug: "components/forms/slider" },
                { label: "InputNumber", slug: "components/forms/input-number" },
                { label: "InputRating", slug: "components/forms/input-rating" },
                { label: "PinInput", slug: "components/forms/pin-input" },
                { label: "Validation Patterns", slug: "components/forms/validation-patterns" },
              ],
            },
            {
              label: "Element",
              items: [
                { label: "Alert", slug: "components/element/alert" },
                { label: "Avatar", slug: "components/element/avatar" },
                { label: "AvatarGroup", slug: "components/element/avatar-group" },
                { label: "Badge", slug: "components/element/badge" },
                { label: "Banner", slug: "components/element/banner" },
                { label: "Button", slug: "components/element/button" },
                { label: "Calendar", slug: "components/element/calendar" },
                { label: "Card", slug: "components/element/card" },
                { label: "Chip", slug: "components/element/chip" },
                { label: "Collapsible", slug: "components/element/collapsible" },
                { label: "Icon", slug: "components/element/icon" },
                { label: "Kbd", slug: "components/element/kbd" },
                { label: "Progress", slug: "components/element/progress" },
                { label: "Separator", slug: "components/element/separator" },
                { label: "Skeleton", slug: "components/element/skeleton" },
              ],
            },
            {
              label: "Navigation",
              items: [
                { label: "Link", slug: "components/navigation/link" },
                { label: "NavigationMenu", slug: "components/navigation/navigation-menu" },
                { label: "CommandPalette", slug: "components/navigation/command-palette" },
                { label: "Stepper", slug: "components/navigation/stepper" },
                { label: "FooterColumns", slug: "components/navigation/footer-columns" },
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
                { label: "Toast", slug: "components/overlay/toast" },
                { label: "ContextMenu", slug: "components/overlay/context-menu" },
                { label: "Drawer", slug: "components/overlay/drawer" },
                { label: "Slideover", slug: "components/overlay/slideover" },
              ],
            },
            {
              label: "Chat",
              items: [
                { label: "ChatMessage", slug: "components/chat/chat-message" },
                { label: "ChatMessages", slug: "components/chat/chat-messages" },
                { label: "ChatPrompt", slug: "components/chat/chat-prompt" },
                { label: "ChatPromptSubmit", slug: "components/chat/chat-prompt-submit" },
                { label: "ChatReasoning", slug: "components/chat/chat-reasoning" },
                { label: "ChatTool", slug: "components/chat/chat-tool" },
                { label: "ChatShimmer", slug: "components/chat/chat-shimmer" },
                { label: "ChatPalette", slug: "components/chat/chat-palette" },
              ],
            },
            {
              label: "Editor",
              items: [
                { label: "Editor", slug: "components/editor/editor" },
                { label: "EditorToolbar", slug: "components/editor/editor-toolbar" },
                { label: "EditorSuggestionMenu", slug: "components/editor/editor-suggestion-menu" },
                { label: "EditorMentionMenu", slug: "components/editor/editor-mention-menu" },
                { label: "EditorEmojiMenu", slug: "components/editor/editor-emoji-menu" },
                { label: "EditorDragHandle", slug: "components/editor/editor-drag-handle" },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
