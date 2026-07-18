/**
 * Mizu theme preset for Nuxt UI v4.
 *
 * Apply Mizu's design language (sizing, spacing, radius, typography)
 * to all Nuxt UI components. Consumers merge this into their config:
 *
 * @example
 * ```ts
 * // app.config.ts
 * import { mizuTheme } from "@mizu/vue/theme";
 * export default defineAppConfig({ ui: mizuTheme });
 * ```
 *
 * Component overrides are populated phase-by-phase:
 * - Phase 10b: Button, Badge, Input, Card
 * - Phase 10c: Modal, Select, Checkbox, Switch, Textarea
 * - Phase 10d: Avatar, Tabs, Tooltip, Popover, DropdownMenu, Kbd, Progress, Breadcrumb, Pagination, Accordion
 */

export const mizuTheme = {
  // --- Button ---
  // Mizu spec: sm=28px, md=36px, lg=40px
  // See: old MizuButton docs (git history)
  button: {
    slots: {
      base: "cursor-pointer enabled:active:scale-99 transition-all duration-300 ease-emphasized",
    },
    variants: {
      size: {
        sm: {
          base: "px-2 py-2 text-[10px] gap-1 rounded",
          leadingIcon: "size-2.5",
          leadingAvatarSize: "3xs",
          trailingIcon: "size-2.5",
        },
        md: {
          base: "px-2.5 py-2.5 text-xs gap-1.5 rounded-md",
          leadingIcon: "size-4",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-4",
        },
        lg: {
          base: "px-2.5 py-2.5 text-sm gap-2 rounded-md",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-5",
        },
      },
    },
    compoundVariants: [
      // Icon-only buttons: keep same vertical padding as labeled buttons
      { size: "sm", square: true, class: "py-2 px-2" },
      { size: "md", square: true, class: "py-2.5 px-2.5" },
      { size: "lg", square: true, class: "py-2.5 px-2.5" },
      // Link variant: dashed underline with tight offset
      { variant: "link", class: "underline decoration-dashed underline-offset-2" },
      // Custom Mizu colors — solid variant
      { color: "nexus", variant: "solid", class: "text-inverted bg-nexus-500 hover:bg-nexus-600 active:bg-nexus-600 disabled:bg-nexus-500 aria-disabled:bg-nexus-500 outline-nexus-500/25 focus-visible:outline-1" },
      { color: "ycp", variant: "solid", class: "text-inverted bg-ycp-500 hover:bg-ycp-600 active:bg-ycp-600 disabled:bg-ycp-500 aria-disabled:bg-ycp-500 outline-ycp-500/25 focus-visible:outline-1" },
      // Custom Mizu colors — outline, ghost, soft
      { color: "nexus", variant: "outline", class: "ring ring-inset ring-nexus-500/25 text-nexus-500 bg-transparent hover:bg-nexus-500/10 active:bg-nexus-500/10 outline-nexus-500/25 focus-visible:outline-1" },
      { color: "ycp", variant: "outline", class: "ring ring-inset ring-ycp-500/25 text-ycp-500 bg-transparent hover:bg-ycp-500/10 active:bg-ycp-500/10 outline-ycp-500/25 focus-visible:outline-1" },
      { color: "nexus", variant: "ghost", class: "text-nexus-500 hover:bg-nexus-500/10 active:bg-nexus-500/10 outline-nexus-500/25 focus-visible:outline-1" },
      { color: "ycp", variant: "ghost", class: "text-ycp-500 hover:bg-ycp-500/10 active:bg-ycp-500/10 outline-ycp-500/25 focus-visible:outline-1" },
      { color: "nexus", variant: "soft", class: "text-nexus-500 bg-nexus-500/10 hover:bg-nexus-500/15 active:bg-nexus-500/15 outline-nexus-500/25 focus-visible:outline-1" },
      { color: "ycp", variant: "soft", class: "text-ycp-500 bg-ycp-500/10 hover:bg-ycp-500/15 active:bg-ycp-500/15 outline-ycp-500/25 focus-visible:outline-1" },
    ],
  },

  // --- Badge ---
  // Mizu spec: sm(16px content), md(20px content)
  // See: old MizuBadge docs (git history)
  badge: {
    variants: {
      size: {
        sm: {
          base: "text-[10px]/3 px-1 py-0.5 gap-1 rounded-full",
          leadingIcon: "size-3",
          leadingAvatarSize: "3xs",
          trailingIcon: "size-3",
        },
        md: {
          base: "text-[11px] px-1.5 py-1 gap-1 rounded-[10px]",
          leadingIcon: "size-4",
          leadingAvatarSize: "3xs",
          trailingIcon: "size-4",
        },
      },
    },
  },

  // --- FormField --- helper/error text at text-xs with Mizu tokens
  formField: {
    slots: {
      wrapper: "w-full",
      description: "text-xs text-[var(--color-foreground-tertiary)]",
      hint: "text-xs text-[var(--color-foreground-tertiary)]",
      help: "mt-1.5 text-xs text-[var(--color-foreground-tertiary)]",
      error: "mt-1.5 text-xs text-[var(--color-feedback-error-base)]",
    },
  },

  // --- Card ---
  // Mizu spec: rounded-md (6px), outline variant by default
  card: {
    slots: {
      root: "rounded-md overflow-hidden",
    },
    defaultVariants: {
      variant: "outline",
    },
  },

  // --- Modal ---
  // Mizu spec: rounded-md (6px) for dialog panels
  // Nuxt UI defaults are close -- just pin the content radius.
  modal: {
    slots: {
      content:
        "[background:var(--color-surface-base)] divide-y divide-[var(--color-surface-muted)] flex flex-col focus:outline-none rounded-md",
    },
  },

  // --- Checkbox ---
  // Mizu spec: border, ring, and outline follow Input style
  checkbox: {
    slots: {
      base: "rounded-sm border border-[var(--color-foreground-tertiary)] overflow-hidden !ring-0 outline-none focus-visible:!outline-none disabled:bg-[var(--color-surface-muted)]",
      wrapper: "",
      label: "font-normal",
    },
    variants: {
      color: {
        primary: { base: "", indicator: "bg-[var(--color-brand-primary)]" },
        secondary: { base: "", indicator: "bg-[var(--color-brand-ycp)]" },
        success: { base: "", indicator: "bg-[var(--color-feedback-success-base)]" },
        error: { base: "", indicator: "bg-[var(--color-feedback-error-base)]" },
        warning: { base: "", indicator: "bg-[var(--color-feedback-warning-base)]" },
        info: { base: "", indicator: "bg-[var(--color-feedback-info-base)]" },
        neutral: { base: "", indicator: "bg-[var(--color-foreground-primary)]" },
      },
    },
    defaultVariants: {
      size: "md",
      color: "primary",
      variant: "list",
      indicator: "start",
    },
  },

  // --- Switch ---
  switch: {
    variants: {
      disabled: {
        true: {
          base: "bg-[var(--color-surface-muted)]",
        },
      },
    },
  },

  //
  // Phase 10d -- Priority 3: Nuxt UI v4 defaults are already
  // consistent with the Mizu design scale. Entries below are
  // documented for completeness only; no overrides are needed.
  //

  // --- Avatar ---
  // Sizes 3xs-3xl (4px-12px) match Mizu's granular icon scale.
  // Defaults: size=md(8px), color=neutral.
  // avatar: {},

  // --- Tabs ---
  // Pill variant uses rounded-md; trigger sizes xs-xl match
  // the Button/Input sizing scale. Defaults: color=primary,
  // variant=pill, size=md.
  // tabs: {},

  // --- Tooltip ---
  // Compact h=6, px=2.5, text-xs, rounded-sm -- standard
  // tooltip dimensions that don't need Mizu-specific adjustment.
  // tooltip: {},

  // --- Popover ---
  // Already uses rounded-md (6px) -- Mizu's default radius.
  // popover: {},

  // --- DropdownMenu ---
  // Already uses rounded-md, good item sizes (xs-xl) with
  // proper leading/trailing icon sizing.
  // dropdownMenu: {},

  // --- Kbd ---
  // sm/md/lg: h-4/h-5/h-6 match the compact Mizu scale.
  // Defaults: variant=outline, color=neutral, size=md.
  // kbd: {},

  // --- Progress ---
  // Sizes 2xs-2xl, carousel animation by default.
  // Defaults: color=primary, size=md.
  // progress: {},

  // --- Breadcrumb ---
  // Text-sm links, size-5 separator icons.
  // Defaults: color=primary.
  // breadcrumb: {},

  // --- Pagination ---
  // Slot-based composition with button primitives.
  // No sizing variants -- inherits from button/input scale.
  // pagination: {},

  // --- Accordion ---
  // Chevron on the right side (ms-auto on trailingIcon from Nuxt UI default).
  // Add w-full to trigger so the title spans full width and the chevron sits
  // at the far right edge.
  accordion: {
    slots: {
      label: "w-full",
      trigger: "w-full",
    },
  },

  // --- InputDate ---
  // The default Nuxt UI outline variant uses a neutral `ring-accented` border
  // regardless of the color prop. These compound variants map the border ring
  // to the selected color so each color is visually distinct.
  inputDate: {
    compoundVariants: [
      { color: "primary", variant: ["outline", "subtle"], class: "ring-primary/25" },
      { color: "secondary", variant: ["outline", "subtle"], class: "ring-secondary/25" },
      { color: "success", variant: ["outline", "subtle"], class: "ring-success/25" },
      { color: "info", variant: ["outline", "subtle"], class: "ring-info/25" },
      { color: "warning", variant: ["outline", "subtle"], class: "ring-warning/25" },
      { color: "error", variant: ["outline", "subtle"], class: "ring-error/25" },
      { color: "neutral", variant: ["outline", "subtle"], class: "ring-inverted/25" },
    ],
  },

};
