# Mizunagi Button — Specification

## Overview

Buttons allow users to take actions and make choices with a single tap. They communicate the action that will occur when the user touches them.

## Anatomy

A button consists of up to 4 parts:

![Button Anatomy](/images/button-anatomy.svg)

| Part | Required | Description |
|------|----------|-------------|
| Container | Yes | The button's background/fill area |
| Label Text | Yes | The button's text content |
| Leading Icon | No | Icon placed before the label |
| Trailing Icon | No | Icon placed after the label |

## Variants

Mizunagi buttons support 4 visual variants:

| Variant | Container | Border | Use Case |
|---------|-----------|--------|----------|
| **Primary** | Filled | None | Primary actions, form submissions |
| **Accent** | Filled | None | Secondary emphasis, links |
| **Ghost** | Transparent | None | Low emphasis, navigation |
| **Outline** | Transparent | 1px solid | Medium emphasis, alternative actions |

## Anatomy by Variant

### Primary Button
```
Container: bg-brand-primary
Label:     text-foreground-inverse
Icon:      text-foreground-inverse
```

### Accent Button
```
Container: bg-brand-accent
Label:     text-foreground-inverse
Icon:      text-foreground-inverse
```

### Ghost Button
```
Container: transparent
Label:     text-foreground-primary
Icon:      text-foreground-primary
```

### Outline Button
```
Container: transparent
Border:    1px solid surface-muted
Label:     text-foreground-primary
Icon:      text-foreground-primary
```

## Size Specifications

### Height & Padding

| Size | Height | Horizontal Padding | Vertical Padding | Gap (icon↔label) | Border Radius |
|------|--------|-------------------|------------------|-------------------|---------------|
| **SM** | 22px | 6px | 6px | 4px | 4px |
| **MD** | 36px | 10px | 10px | 6px | 6px |
| **LG** | 40px | 10px | 10px | 8px | 6px |

### Icon Sizes

| Size | Icon Size | Icon Stroke Width |
|------|-----------|-------------------|
| **SM** | 10px | 1.5px |
| **MD** | 16px | 1.5px |
| **LG** | 20px | 2px |

### Touch Target

All button sizes maintain a minimum touch target of **44px × 44px** for accessibility (WCAG 2.5.8).

## Typography

| Size | Font Size | Font Weight | Line Height | Letter Spacing |
|------|-----------|-------------|-------------|----------------|
| **SM** | 10px | 500 (medium) | 1 | 0 |
| **MD** | 12px | 500 (medium) | 1 | 0 |
| **LG** | 14px | 500 (medium) | 1 | 0 |

## Shape

| Property | SM | MD | LG |
|----------|----|----|-----|
| Border Radius | 4px | 6px | 6px |
| Corner Radius (Full) | 9999px | 9999px | 9999px |

## Color Specifications

### State Map

| State | Primary | Accent | Ghost | Outline |
|-------|---------|--------|-------|---------|
| **Enabled** | bg: `brand-primary`<br>fg: `foreground-inverse` | bg: `brand-accent`<br>fg: `foreground-inverse` | bg: transparent<br>fg: `foreground-primary` | bg: transparent<br>border: `surface-muted`<br>fg: `foreground-primary` |
| **Hovered** | bg: `brand-primary-hover`<br>fg: `foreground-inverse` | bg: `brand-accent-hover`<br>fg: `foreground-inverse` | bg: `surface-subtle`<br>fg: `foreground-primary` | bg: `surface-subtle`<br>border: `surface-muted`<br>fg: `foreground-primary` |
| **Focused** | bg: `brand-primary-focus`<br>fg: `foreground-inverse`<br>ring: 2px `brand-accent` | bg: `brand-accent-focus`<br>fg: `foreground-inverse`<br>ring: 2px `brand-accent` | bg: `surface-subtle`<br>fg: `foreground-primary`<br>ring: 2px `brand-accent` | bg: `surface-subtle`<br>border: `brand-accent`<br>fg: `foreground-primary`<br>ring: 2px `brand-accent` |
| **Pressed** | bg: `brand-primary-focus`<br>fg: `foreground-inverse` | bg: `brand-accent-focus`<br>fg: `foreground-inverse` | bg: `surface-muted`<br>fg: `foreground-primary` | bg: `surface-muted`<br>border: `surface-muted`<br>fg: `foreground-primary` |
| **Disabled** | bg: `surface-muted`<br>fg: `foreground-tertiary` | bg: `surface-muted`<br>fg: `foreground-tertiary` | bg: transparent<br>fg: `foreground-tertiary` | bg: transparent<br>border: `surface-muted`<br>fg: `foreground-tertiary` |

### Loading State

| Property | Value |
|----------|-------|
| Spinner Size | 16px (SM), 20px (MD/LG) |
| Spinner Color | Matches label color |
| Label | Hidden during loading |
| Cursor | `not-allowed` |
| Pointer Events | None |

## Spacing Details

### Button Content Layout

```
┌──────────────────────────────────────────────────┐
│←pad→┌────┐←gap→┌─────────┐←gap→┌────┐←pad→│
│     │Icon│     │  Label  │     │Icon│     │
│     └────┘     └─────────┘     └────┘     │
└──────────────────────────────────────────────────┘
```

| Property | SM | MD | LG |
|----------|----|----|-----|
| Horizontal Padding | 6px | 10px | 10px |
| Vertical Padding | 6px | 10px | 10px |
| Icon-Label Gap | 4px | 6px | 8px |

### Single Icon Button (No Label)

| Size | Padding |
|------|---------|
| **SM** | 6px |
| **MD** | 10px |
| **LG** | 10px |

## Transitions

| Property | Duration | Easing |
|----------|----------|--------|
| Background Color | 200ms | ease-in-out |
| Border Color | 200ms | ease-in-out |
| Box Shadow | 200ms | ease-in-out |
| Transform (press) | 100ms | ease-out |

### Press Effect

| Variant | Scale | Shadow Change |
|---------|-------|---------------|
| Primary | `scale(0.98)` | None |
| Accent | `scale(0.98)` | None |
| Ghost | None | None |
| Outline | `scale(0.98)` | Inset shadow |

## Focus Ring

| Property | Value |
|----------|-------|
| Style | `outline: 2px solid var(--color-brand-accent)` |
| Offset | `2px` |
| Border Radius | Inherit from button |

## Accessibility

### Requirements

| Criterion | Implementation |
|-----------|----------------|
| Touch Target | Minimum 44px × 44px |
| Color Contrast | 4.5:1 for text, 3:1 for icons |
| Keyboard Navigation | `tabindex="0"`, Enter/Space triggers click |
| Screen Reader | `role="button"` or native `<button>` |
| Focus Indicator | Visible focus ring on keyboard focus |
| Disabled State | `aria-disabled="true"`, `disabled` attribute |

### ARIA Attributes

```html
<button
  role="button"
  aria-disabled="false"
  aria-busy="false"
  aria-label="Submit form"
>
  Submit
</button>
```

## Token Mapping

### CSS Custom Properties

| Token | Value | Usage |
|-------|-------|-------|
| `--color-brand-primary` | #0070F2 | Primary button bg |
| `--color-brand-primary-hover` | #005AC2 | Primary hover bg |
| `--color-brand-primary-focus` | #338DF5 | Primary focus/pressed bg |
| `--color-brand-accent` | #001C44 | Accent button bg, focus ring |
| `--color-brand-accent-hover` | #001636 | Accent hover bg |
| `--color-brand-accent-focus` | #334969 | Accent focus/pressed bg |
| `--color-foreground-inverse` | #FFFFFF | Primary/Accent label color |
| `--color-foreground-primary` | #1B1B1D | Ghost/Outline label color |
| `--color-foreground-tertiary` | #9CA3AF | Disabled label color |
| `--color-surface-subtle` | #F9FAFB | Ghost hover bg |
| `--color-surface-muted` | #F3F4F6 | Outline border, disabled bg |
| `--radius-default` | 8px | Border radius |
| `--duration-fast` | 200ms | State transitions |
| `--font-weight-medium` | 500 | SM/MD label weight |
| `--font-weight-semibold` | 600 | LG label weight |

## Vue Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'accent' \| 'ghost' \| 'outline'` | `'primary'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Button label content |
| `leading-icon` | Leading icon content |
| `trailing-icon` | Trailing icon content |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted on button click |

### Example Usage

```vue
<MizunagiButton variant="primary" size="md">
  Submit
</MizunagiButton>

<MizunagiButton variant="accent" size="lg" :loading="isSubmitting">
  <template #leading-icon>
    <IconSave />
  </template>
  Save Changes
</MizunagiButton>

<MizunagiButton variant="ghost" size="sm">
  Cancel
</MizunagiButton>
```

## Implementation Notes

1. **Native `<button>` element** — No Reka UI primitive needed; use native HTML button for maximum accessibility
2. **Tailwind classes** — Use Mizunagi token classes directly (`bg-brand-primary`, `text-foreground-inverse`, etc.)
3. **Class inheritance** — Accept `class` prop for Tailwind overrides via `useAttrs()`
4. **TypeScript** — Full type safety with `<script setup lang="ts">`
5. **Tree-shakeable** — Export as ESM + CJS via Vite library mode
