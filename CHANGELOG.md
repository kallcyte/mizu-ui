# Changelog

## [0.18.15] - 2026-07-20

### Added

- **Table docs — Ready** — Expanded `TableDemo.vue` with all key Nuxt UI examples: Basic, Columns (with `h()` render functions for badges, sort buttons, and status indicators), Loading, Sorting, Caption, Empty State, Row Selection (with checkboxes), Expandable Rows (with `#expanded` slot), and Pagination (with 50-row dataset). Updated the docs Example Usage block with real code patterns. Marked the Table page as Ready.

## [0.18.14] - 2026-07-20

### Added

- **RadioGroup docs — Ready** — Expanded `RadioGroupDemo.vue` with all Nuxt UI examples: Basic, Card Variant with Descriptions, Table Variant, Color (all 7), Size (sm/md/lg), Horizontal Orientation, Indicator Position (end), With Legend, and Disabled. Updated the docs Example Usage block. Marked the RadioGroup page as Ready.
- **InputTime docs — Ready** — Expanded `InputTimeDemo.vue` with all Nuxt UI examples: Basic, Default Value, Time Range, Hour Cycle (24h), Color (all 7), Variant (outline/soft/subtle/ghost), Size (sm/md/lg), Icon, Range Separator Icon, With FormField, and Disabled. Updated the docs Example Usage block. Marked the InputTime page as Ready.

### Changed

- **Theme: form labels** — Set `text-xs font-normal` on `UFormField` label, `UInput` label (sm/md/lg), `UCheckbox` label, `USwitch` label, and `URadioGroup` legend/label slots with size variant overrides across the Mizu theme. Fixed `InputDemo.vue` floating label font-size from 14px to 12px.

### Removed

- **Archived ColorPicker** — Removed the ColorPicker component (demo, doc page, sidebar entry, homepage card, components list, and docs-plan row) as it lacks relevancy for Mizu.

## [0.18.13] - 2026-07-20

### Added

- **Form docs — Ready** — Rewrote the Form documentation page to align with Nuxt UI. Added a new `FormDemo.vue` with interactive examples covering Basic custom validation, Zod schema validation, Error pattern (with `UInputTags`), `validate-on` control, `@error` event handling, HTML5 validation with programmatic `submit()`, and nested forms. Updated the API section with all `UForm` props, slots, emits, exposed methods, and state refs.
- **FormField docs — Ready** — Marked the FormField documentation page as Ready (green badge). Added missing `as` and `ui` props to the API table, added the full `app.config.ts` theme configuration, and expanded the intro to reference the Form page.

### Changed

- Expanded `FormFieldDemo.vue` examples and made the horizontal orientation container full width so the side-by-side layout is visible.
- **Validation Patterns docs** — Removed the standalone Validation Patterns page since the Form documentation page (`form.mdx`) already covers form validation patterns comprehensively.

### Fixed

- **Build: Vite 8 + Rolldown compatibility** — Fixed `[UNLOADABLE_DEPENDENCY]` build error on `@tailwindcss/oxide` native binary by patching the auto-generated NAPI-RS loader to use indirect `require()` calls that bundlers cannot statically resolve. Added `patches/@tailwindcss__oxide@4.3.2.patch`.
- **Nuxt UI component imports** — Fixed `[MISSING_EXPORT]` build error where `import { UTree }` and `import { UUser }` from `@nuxt/ui` failed in Astro's static build. Switched to component-path imports (`@nuxt/ui/components/Tree.vue` / `User.vue`) since Nuxt UI v4's main export is the Nuxt module, not runtime components.

## [0.18.12] - 2026-07-20

### Added

- **PinInput docs — Ready** — Expanded `PinInputDemo.vue` to cover all Nuxt UI examples: Basic, Type (`number`/`alphanumeric`), Length, Mask, OTP, Separator, Color (all 7 variants), Variant, Size (sm/md/lg), Custom Separator Slot, and Disabled. Updated the docs Example Usage block. Marked the PinInput page as Ready (green badge).
- **InputRating docs — Ready** — Fixed `UInputRating` rendering by upgrading `@nuxt/ui` to `4.10.0` and pinning `reka-ui` to `2.10.1` (with the corresponding patch update). Expanded `InputRatingDemo.vue` with Basic, Step, Length, Hoverable, Clearable, Icon, Empty Icon, Color (all 7 variants), Size (sm/md/lg), Orientation, Readonly, and Disabled. Updated the docs Example Usage block. Marked the InputRating page as Ready (green badge).

### Changed

- Upgraded `@nuxt/ui` from `4.9.0` to `4.10.0` across the workspace and switched the patch from `patches/@nuxt__ui@4.9.0.patch` to `patches/@nuxt__ui@4.10.0.patch`.
- Pinned `reka-ui` to `^2.10.1` to satisfy the `@nuxt/ui@4.10.0` peer requirement.

## [0.18.11] - 2026-07-20

### Added

- **`reka-ui`** — Added as a direct dependency (pinned to `2.9.10`) so docs demos can import `TooltipProvider` for Nuxt UI tooltip-dependent components.

### Changed

- **Slider docs — Ready** — Marked the Slider documentation page as Ready (green badge). Wrapped `SliderDemo.vue` in `TooltipProvider` so the tooltip example renders. Expanded the demo with all Nuxt UI examples: Min/Max, Step, Orientation, Color (all 7 variants), Size, Inverted, Disabled, plus the existing Basic, With Tooltip, and Range examples.
- **InputNumber docs — Ready** — Marked the InputNumber documentation page as Ready (green badge). Expanded the demo with missing Nuxt UI examples: Min/Max, Step, Placeholder, Orientation, Color (all 7 variants), Variant, Size (sm/md/lg only), Custom Increment/Decrement, Custom Icons, Without Buttons, Decimal Format, Percentage Format, Currency Format, With Slots, With FormField, and Disabled. Replaced `xs` button sizes with `sm` to align with the Mizu size scale.

## [0.18.10] - 2026-07-20

### Docs

- Mark Switch component docs as Ready
- Expand Switch demo with all Nuxt UI examples (required, description, icons, loading, loading icon, colors, sizes, disabled)
- Fix Switch API docs — remove incorrect `variant` prop, add missing props

## [0.18.9] - 2026-07-20

### Docs

- Mark FileUpload, Checkbox, and CheckboxGroup component docs as Ready
- Align Checkbox and CheckboxGroup demo examples with Nuxt UI docs

### Fixes

- Remove uppercase text-transform and wide letter-spacing from sidebar summary labels in `@mizu/tokens`

## [0.18.8] - 2026-07-20

### Docs

- Add descriptions to all 81 component demo examples (Accordion, Alert, Avatar, AvatarGroup, Badge, Banner, Breadcrumb, Calendar, Card, Carousel, ChatMessage, ChatMessages, ChatPalette, ChatPrompt, ChatPromptSubmit, ChatReasoning, ChatShimmer, ChatTool, Checkbox, CheckboxGroup, Chip, Collapsible, ColorPicker, CommandPalette, ContextMenu, DashList, DataTable, Drawer, DropdownMenu, Editor, EditorDragHandle, EditorEmojiMenu, EditorMentionMenu, EditorSuggestionMenu, EditorToolbar, Empty, FieldGroup, FooterColumns, FormField, Icon, Icons, InputDate, InputMenu, InputNumber, InputRating, InputTags, InputTime, Kbd, Link, Listbox, Marquee, Metric, MizuDateField, Modal, NavigationMenu, Pagination, PinInput, Popover, Progress, Quote, RadioGroup, ScrollArea, Select, SelectMenu, Separator, Skeleton, Slideover, Slider, Stepper, Switch, Table, Tabs, Timeline, Toast, Tooltip, Tree, User)
- Fix `.demo-description code` background color visibility in light mode

## [0.18.7] - 2026-07-17

### Fixes

- Fix separate v-model refs for listbox examples

### Docs

- Align Listbox demo with Nuxt UI patterns
- Expand FileUpload demo with comprehensive examples
