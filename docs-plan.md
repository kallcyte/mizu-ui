# Mizu Documentation Plan

Missing Nuxt UI core components to document, prioritized by category.

---

## 1. Overlay (4)

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 1a | **Toast** | `toast` | Pending |
| 1b | **ContextMenu** | `context-menu` | Pending |
| 1c | **Drawer** | `drawer` | Pending |
| 1d | **Slideover** | `slideover` | Pending |

## 2. Forms (13)

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 2a | **FormField** | `form-field` | Pending |
| 2b | **RadioGroup** | `radio-group` | Pending |
| 2c | **Slider** | `slider` | Pending |
| 2d | **InputNumber** | `input-number` | Pending |
| 2e | **InputMenu** | `input-menu` | Pending |
| 2f | **InputTags** | `input-tags` | Pending |
| 2g | **InputDate** | `input-date` | Pending |
| 2h | **InputTime** | `input-time` | Pending |
| 2i | **Listbox** | `listbox` | Pending |
| 2j | **InputRating** | `input-rating` | Pending |
| 2l | **FileUpload** | `file-upload` | Ready |
| 2m | **PinInput** | `pin-input` | Pending |

## 3. Element (8)

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 3a | **Alert** | `alert` | Pending |
| 3b | **Collapsible** | `collapsible` | Pending |
| 3c | **Icon** | `icon` | Pending |
| 3d | **Separator** | `separator` | Pending |
| 3e | **Chip** | `chip` | Pending |
| 3f | **AvatarGroup** | `avatar-group` | Pending |
| 3g | **Calendar** | `calendar` | Pending |
| 3h | **Banner** | `banner` | Pending |

## 4. Navigation (5)

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 4a | **Link** | `link` | Pending |
| 4b | **NavigationMenu** | `navigation-menu` | Pending |
| 4c | **CommandPalette** | `command-palette` | Pending |
| 4d | **Stepper** | `stepper` | Pending |
| 4e | **FooterColumns** | `footer-columns` | Pending |

## 5. Data (9)

| # | Component | Nuxt UI Slug | Status |
|---|-----------|-------------|--------|
| 5a | **Accordion** | `accordion` | Pending |
| 5b | **Empty** | `empty` | Ready |
| 5c | **Table** | `table` | Pending |
| 5d | **Timeline** | `timeline` | Pending |
| 5e | **Carousel** | `carousel` | Pending |
| 5f | **ScrollArea** | `scroll-area` | Pending |
| 5g | **Marquee** | `marquee` | Pending |
| 5h | **Tree** | `tree` | Pending |
| 5i | **User** | `user` | Pending |

## 6. AI Chat (8)

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

## 7. Editor (6)

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
7. Rebuild: `pnpm --filter @mizu/vue build`
8. Restart docs: `pnpm run dev:bg`

---

**Total: 53 components**
