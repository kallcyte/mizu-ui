# Mizu Documentation Plan

Missing Nuxt UI core components to document, prioritized by category.

---

## 1. Overlay (5) [2 Ready, 3 Pending]

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 1a | **Toast** | `toast` | Ready |
| 1b | **Modal** | `modal` | Ready |
| 1c | **ContextMenu** | `context-menu` | Pending |
| 1d | **Drawer** | `drawer` | Pending |
| 1e | **Slideover** | `slideover` | Pending |

## 2. Forms (12) [12 Ready]

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 2a | **FormField** | `form-field` | Ready |
| 2b | **RadioGroup** | `radio-group` | Ready |
| 2c | **Slider** | `slider` | Ready |
| 2d | **InputNumber** | `input-number` | Ready |
| 2e | **InputMenu** | `input-menu` | Ready |
| 2f | **InputTags** | `input-tags` | Ready |
| 2g | **InputDate** | `input-date` | Ready |
| 2h | **InputTime** | `input-time` | Ready |
| 2i | **Listbox** | `listbox` | Ready |
| 2j | **InputRating** | `input-rating` | Ready |
| 2l | **FileUpload** | `file-upload` | Ready |
| 2m | **PinInput** | `pin-input` | Ready |

## 3. Element (8) [8 Ready, 0 Pending]

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 3a | **Alert** | `alert` | Ready |
| 3b | **Collapsible** | `collapsible` | Ready |
| 3c | **Icon** | `icon` | Ready |
| 3d | **Separator** | `separator` | Ready |
| 3e | **Chip** | `chip` | Ready |
| 3f | **AvatarGroup** | `avatar-group` | Ready |
| 3g | **Calendar** | `calendar` | Ready |
| 3h | **Banner** | `banner` | Ready |

## 4. Navigation (5) [2 Ready, 3 Pending]

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 4a | **Link** | `link` | Pending |
| 4b | **NavigationMenu** | `navigation-menu` | Ready |
| 4c | **CommandPalette** | `command-palette` | Pending |
| 4d | **Stepper** | `stepper` | Ready |
| 4e | **FooterColumns** | `footer-columns` | Pending |

## 5. Data (9) [2 Ready, 7 Pending]

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 5a | **Accordion** | `accordion` | Pending |
| 5b | **Empty** | `empty` | Ready |
| 5c | **Table** | `table` | Ready |
| 5d | **Timeline** | `timeline` | Pending |
| 5e | **Carousel** | `carousel` | Pending |
| 5f | **ScrollArea** | `scroll-area` | Pending |
| 5g | **Marquee** | `marquee` | Pending |
| 5h | **Tree** | `tree` | Pending |
| 5i | **User** | `user` | Pending |

## 6. AI Chat (8) [8 Pending]

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 6a | **ChatMessage** | `chat-message` | Pending |
| 6b | **ChatMessages** | `chat-messages` | Pending |
| 6c | **ChatPrompt** | `chat-prompt` | Pending |
| 6d | **ChatPromptSubmit** | `chat-prompt-submit` | Pending |
| 6e | **ChatReasoning** | `chat-reasoning` | Pending |
| 6f | **ChatTool** | `chat-tool` | Pending |
| 6g | **ChatShimmer** | `chat-shimmer` | Pending |
| 6h | **ChatPalette** | `chat-palette` | Pending |

## 7. Editor (6) [6 Pending]

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 7a | **Editor** | `editor` | Pending |
| 7b | **EditorToolbar** | `editor-toolbar` | Pending |
| 7c | **EditorSuggestionMenu** | `editor-suggestion-menu` | Pending |
| 7d | **EditorMentionMenu** | `editor-mention-menu` | Pending |
| 7e | **EditorEmojiMenu** | `editor-emoji-menu` | Pending |
| 7f | **EditorDragHandle** | `editor-drag-handle` | Pending |

---

## Per-Component Checklist

For each component:

1. Fetch Nuxt UI API/docs via MCP
2. Create `src/components/docs/{Name}Demo.vue`
3. Create `src/content/docs/components/{category}/{slug}.mdx`
4. Add to sidebar in `astro.config.mjs`
5. Add to `src/pages/components.astro`
6. Add to `src/components/home/ComponentsSection.astro`
7. Rebuild: `pnpm --filter @mizu-ui/vue build`
8. Restart docs: `pnpm run dev:bg`

---

**Total: 52 components (25 Ready, 27 Pending)**
