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
      base: "cursor-pointer",
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

  // --- Input ---
  // Mizu spec: sm=28px, md=36px, lg=40px (same scale as Button)
  // See: old MizuInput docs (git history)
  input: {
    slots: {
      base: "rounded-md appearance-none disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-[var(--color-surface-muted)] transition-colors placeholder:text-[var(--input-placeholder-color,var(--color-foreground-secondary))]/80 !ring-0 !outline-none focus-visible:!outline-none",
      leadingIcon: "shrink-0 text-[var(--input-text-color,var(--color-foreground-primary))]",
      trailingIcon: "shrink-0 text-[var(--input-text-color,var(--color-foreground-primary))]",
    },
    variants: {
      size: {
        sm: {
          base: "px-2 py-1 text-sm/4 gap-1 rounded",
          leading: "ps-2",
          trailing: "pe-2",
          leadingIcon: "size-4",
          leadingAvatarSize: "3xs",
          trailingIcon: "size-4",
        },
        md: {
          base: "px-2.5 py-1.5 text-base/5 gap-1.5",
          leading: "ps-2.5",
          trailing: "pe-2.5",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-5",
        },
        lg: {
          base: "px-2.5 py-2 text-base/5 gap-2",
          leading: "ps-2.5",
          trailing: "pe-2.5",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-5",
        },
      },
      color: {
        primary:
          "[--input-text-color:var(--color-brand-primary)] [--input-border-color:var(--color-brand-primary)] [--input-placeholder-color:var(--color-brand-primary)]",
        secondary:
          "[--input-text-color:var(--color-brand-ycp)] [--input-border-color:var(--color-brand-ycp)] [--input-placeholder-color:var(--color-brand-ycp)]",
        success:
          "[--input-text-color:var(--color-feedback-success-base)] [--input-border-color:var(--color-feedback-success-base)] [--input-placeholder-color:var(--color-feedback-success-base)]",
        error:
          "[--input-text-color:var(--color-feedback-error-base)] [--input-border-color:var(--color-feedback-error-base)] [--input-placeholder-color:var(--color-feedback-error-base)]",
        warning:
          "[--input-text-color:var(--color-feedback-warning-base)] [--input-border-color:var(--color-feedback-warning-base)] [--input-placeholder-color:var(--color-feedback-warning-base)]",
        info: "[--input-text-color:var(--color-feedback-info-base)] [--input-border-color:var(--color-feedback-info-base)] [--input-placeholder-color:var(--color-feedback-info-base)]",
        neutral:
          "[--input-text-color:var(--color-foreground-primary)] [--input-placeholder-color:var(--color-foreground-secondary)]",
      },
      variant: {
        outline:
          "text-[var(--input-text-color,var(--color-foreground-primary))] bg-[var(--color-surface-base)] border border-[var(--input-border-color,var(--color-foreground-secondary))]/50 focus-visible:border-[var(--input-border-color,var(--color-foreground-secondary))]",
        subtle:
          "text-[var(--input-text-color,var(--color-foreground-primary))] bg-[var(--color-surface-subtle)] border border-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      color: "neutral",
      variant: "outline",
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

  // --- Select ---
  // Mizu spec: match Input sizing scale (sm=28px, md=36px, lg=40px)
  // Override the trigger button sizing to mirror Input dimensions.
  // --- Select --- adopt full Input styling (native select)
  select: {
    slots: {
      base: "relative group rounded-md disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-[var(--color-surface-muted)] transition-colors !ring-0 !outline-none focus-visible:!outline-none data-[state=open]:border-[var(--input-border-color,var(--color-foreground-secondary))]",
      leadingIcon: "shrink-0 text-[var(--input-text-color,var(--color-foreground-primary))]",
      trailingIcon:
        "shrink-0 text-[var(--input-text-color,var(--color-foreground-primary))] cursor-pointer",
    },
    variants: {
      size: {
        sm: {
          base: "px-2 py-1 text-sm/4 gap-1 rounded",
          leading: "ps-2",
          trailing: "pe-2",
          leadingIcon: "size-4",
          leadingAvatarSize: "3xs",
          trailingIcon: "size-4",
        },
        md: {
          base: "px-2.5 py-1.5 text-base/5 gap-1.5",
          leading: "ps-2.5",
          trailing: "pe-2.5",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-5",
        },
        lg: {
          base: "px-2.5 py-2 text-base/5 gap-2",
          leading: "ps-2.5",
          trailing: "pe-2.5",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-5",
        },
      },
      color: {
        primary:
          "[--input-text-color:var(--color-brand-primary)] [--input-border-color:var(--color-brand-primary)] [--input-placeholder-color:var(--color-brand-primary)]",
        secondary:
          "[--input-text-color:var(--color-brand-ycp)] [--input-border-color:var(--color-brand-ycp)] [--input-placeholder-color:var(--color-brand-ycp)]",
        success:
          "[--input-text-color:var(--color-feedback-success-base)] [--input-border-color:var(--color-feedback-success-base)] [--input-placeholder-color:var(--color-feedback-success-base)]",
        error:
          "[--input-text-color:var(--color-feedback-error-base)] [--input-border-color:var(--color-feedback-error-base)] [--input-placeholder-color:var(--color-feedback-error-base)]",
        warning:
          "[--input-text-color:var(--color-feedback-warning-base)] [--input-border-color:var(--color-feedback-warning-base)] [--input-placeholder-color:var(--color-feedback-warning-base)]",
        info: "[--input-text-color:var(--color-feedback-info-base)] [--input-border-color:var(--color-feedback-info-base)] [--input-placeholder-color:var(--color-feedback-info-base)]",
        neutral:
          "[--input-text-color:var(--color-foreground-primary)] [--input-placeholder-color:var(--color-foreground-secondary)]",
      },
      variant: {
        outline:
          "text-[var(--input-text-color,var(--color-foreground-primary))] bg-[var(--color-surface-base)] border border-[var(--input-border-color,var(--color-foreground-secondary))]/50 focus-visible:border-[var(--input-border-color,var(--color-foreground-secondary))]",
        subtle:
          "text-[var(--input-text-color,var(--color-foreground-primary))] bg-[var(--color-surface-subtle)] border border-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      color: "neutral",
      variant: "outline",
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

  // --- Textarea --- adopt full Input styling
  // Mizu spec: inherit Input scale + slots, color, variant (sm=28px, md=36px, lg=40px)
  textarea: {
    slots: {
      base: "rounded-md appearance-none disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-[var(--color-surface-muted)] transition-colors placeholder:text-[var(--input-placeholder-color,var(--color-foreground-secondary))]/80 !ring-0 !outline-none focus-visible:!outline-none",
      leadingIcon: "shrink-0 text-[var(--input-text-color,var(--color-foreground-primary))]",
      trailingIcon:
        "shrink-0 text-[var(--input-text-color,var(--color-foreground-primary))] cursor-pointer",
    },
    variants: {
      size: {
        sm: {
          base: "px-2 py-1 text-sm/4 gap-1 rounded",
          leading: "ps-2",
          trailing: "pe-2",
          leadingIcon: "size-4",
          leadingAvatarSize: "3xs",
          trailingIcon: "size-4",
        },
        md: {
          base: "px-2.5 py-1.5 text-base/5 gap-1.5",
          leading: "ps-2.5",
          trailing: "pe-2.5",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-5",
        },
        lg: {
          base: "px-2.5 py-2 text-base/5 gap-2",
          leading: "ps-2.5",
          trailing: "pe-2.5",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-5",
        },
      },
      color: {
        primary:
          "[--input-text-color:var(--color-brand-primary)] [--input-border-color:var(--color-brand-primary)] [--input-placeholder-color:var(--color-brand-primary)]",
        secondary:
          "[--input-text-color:var(--color-brand-ycp)] [--input-border-color:var(--color-brand-ycp)] [--input-placeholder-color:var(--color-brand-ycp)]",
        success:
          "[--input-text-color:var(--color-feedback-success-base)] [--input-border-color:var(--color-feedback-success-base)] [--input-placeholder-color:var(--color-feedback-success-base)]",
        error:
          "[--input-text-color:var(--color-feedback-error-base)] [--input-border-color:var(--color-feedback-error-base)] [--input-placeholder-color:var(--color-feedback-error-base)]",
        warning:
          "[--input-text-color:var(--color-feedback-warning-base)] [--input-border-color:var(--color-feedback-warning-base)] [--input-placeholder-color:var(--color-feedback-warning-base)]",
        info: "[--input-text-color:var(--color-feedback-info-base)] [--input-border-color:var(--color-feedback-info-base)] [--input-placeholder-color:var(--color-feedback-info-base)]",
        neutral:
          "[--input-text-color:var(--color-foreground-primary)] [--input-placeholder-color:var(--color-foreground-secondary)]",
      },
      variant: {
        outline:
          "text-[var(--input-text-color,var(--color-foreground-primary))] bg-[var(--color-surface-base)] border border-[var(--input-border-color,var(--color-foreground-secondary))]/50 focus-visible:border-[var(--input-border-color,var(--color-foreground-secondary))]",
        subtle:
          "text-[var(--input-text-color,var(--color-foreground-primary))] bg-[var(--color-surface-subtle)] border border-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      color: "neutral",
      variant: "outline",
    },
  },

  // --- Select --- adopt full Input styling (native select)

  // --- SelectMenu --- adopt full Input styling
  selectMenu: {
    slots: {
      base: "relative group rounded-md disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-[var(--color-surface-muted)] transition-colors !ring-0 !outline-none focus-visible:!outline-none data-[state=open]:border-[var(--input-border-color,var(--color-foreground-secondary))]",
      leadingIcon: "shrink-0 text-[var(--input-text-color,var(--color-foreground-primary))]",
      trailingIcon:
        "shrink-0 text-[var(--input-text-color,var(--color-foreground-primary))] cursor-pointer",
    },
    variants: {
      size: {
        sm: {
          base: "px-2 py-1 text-sm/4 gap-1 rounded",
          leading: "ps-2",
          trailing: "pe-2",
          leadingIcon: "size-4",
          leadingAvatarSize: "3xs",
          trailingIcon: "size-4",
        },
        md: {
          base: "px-2.5 py-1.5 text-base/5 gap-1.5",
          leading: "ps-2.5",
          trailing: "pe-2.5",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-5",
        },
        lg: {
          base: "px-2.5 py-2 text-base/5 gap-2",
          leading: "ps-2.5",
          trailing: "pe-2.5",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-5",
        },
      },
      color: {
        primary:
          "[--input-text-color:var(--color-brand-primary)] [--input-border-color:var(--color-brand-primary)] [--input-placeholder-color:var(--color-brand-primary)]",
        secondary:
          "[--input-text-color:var(--color-brand-ycp)] [--input-border-color:var(--color-brand-ycp)] [--input-placeholder-color:var(--color-brand-ycp)]",
        success:
          "[--input-text-color:var(--color-feedback-success-base)] [--input-border-color:var(--color-feedback-success-base)] [--input-placeholder-color:var(--color-feedback-success-base)]",
        error:
          "[--input-text-color:var(--color-feedback-error-base)] [--input-border-color:var(--color-feedback-error-base)] [--input-placeholder-color:var(--color-feedback-error-base)]",
        warning:
          "[--input-text-color:var(--color-feedback-warning-base)] [--input-border-color:var(--color-feedback-warning-base)] [--input-placeholder-color:var(--color-feedback-warning-base)]",
        info: "[--input-text-color:var(--color-feedback-info-base)] [--input-border-color:var(--color-feedback-info-base)] [--input-placeholder-color:var(--color-feedback-info-base)]",
        neutral:
          "[--input-text-color:var(--color-foreground-primary)] [--input-placeholder-color:var(--color-foreground-secondary)]",
      },
      variant: {
        outline:
          "text-[var(--input-text-color,var(--color-foreground-primary))] bg-[var(--color-surface-base)] border border-[var(--input-border-color,var(--color-foreground-secondary))]/50 focus-visible:border-[var(--input-border-color,var(--color-foreground-secondary))]",
        subtle:
          "text-[var(--input-text-color,var(--color-foreground-primary))] bg-[var(--color-surface-subtle)] border border-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      color: "neutral",
      variant: "outline",
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
};
