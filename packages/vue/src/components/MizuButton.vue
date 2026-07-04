<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";

export interface ButtonProps {
  variant?: "primary" | "accent" | "ghost" | "outline" | "success" | "warning" | "error" | "info" | "outline-success" | "outline-warning" | "outline-error" | "outline-info";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  /** Render button full width */
  block?: boolean;
  /** Equal padding on all sides (icon-only mode) */
  square?: boolean;
  /** Auto-set loading=true while @click handler's returned promise is pending */
  loadingAuto?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  type: "button",
  block: false,
  square: false,
  loadingAuto: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const attrs = useAttrs();

const slots = defineSlots<{
  default: () => unknown;
  "leading-icon": () => unknown;
  "trailing-icon": () => unknown;
}>();

const hasLeadingIcon = computed(() => !!slots["leading-icon"]);
const hasTrailingIcon = computed(() => !!slots["trailing-icon"]);
const hasDefaultSlot = computed(() => !!slots.default);

const variantColors: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: "var(--color-brand-primary)", text: "#fff", border: "transparent" },
  accent: { bg: "var(--color-brand-accent)", text: "#fff", border: "transparent" },
  success: { bg: "var(--color-feedback-success-base)", text: "var(--color-foreground-inverse)", border: "transparent" },
  warning: { bg: "var(--color-feedback-warning-base)", text: "var(--color-foreground-inverse)", border: "transparent" },
  error: { bg: "var(--color-feedback-error-base)", text: "var(--color-foreground-inverse)", border: "transparent" },
  info: { bg: "var(--color-feedback-info-base)", text: "var(--color-foreground-inverse)", border: "transparent" },
  ghost: { bg: "transparent", text: "var(--color-foreground-primary)", border: "transparent" },
  outline: { bg: "transparent", text: "var(--color-foreground-primary)", border: "var(--color-foreground-primary)" },
  "outline-success": { bg: "transparent", text: "var(--color-feedback-success-base)", border: "var(--color-feedback-success-base)" },
  "outline-warning": { bg: "transparent", text: "var(--color-feedback-warning-base)", border: "var(--color-feedback-warning-base)" },
  "outline-error": { bg: "transparent", text: "var(--color-feedback-error-base)", border: "var(--color-feedback-error-base)" },
  "outline-info": { bg: "transparent", text: "var(--color-feedback-info-base)", border: "var(--color-feedback-info-base)" },
};

const variantColor = computed(() => variantColors[props.variant] || variantColors.primary);

const hasBorder = computed(() => {
  return props.variant === "outline" || props.variant.startsWith("outline-");
});

const spinnerSizeClass = computed(() => `mizu-spinner--${props.size}`);

const autoLoading = ref(false);
const isLoading = computed(() => props.loading || autoLoading.value);

const buttonClasses = computed(() => {
  const classes = [
    "mizu-button",
    `mizu-button--${props.size}`,
    `mizu-${props.variant}`,
  ];

  if (props.disabled) classes.push("mizu-button--disabled");
  if (isLoading.value) classes.push("mizu-button--loading");
  if (hasBorder.value) classes.push("mizu-button--bordered");
  if (props.block) classes.push("mizu-button--block");
  if (props.square) classes.push("mizu-button--square");

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});

async function handleClick(event: MouseEvent) {
  if (!props.disabled && !isLoading.value) {
    const result = emit("click", event);
    if (props.loadingAuto && (result as unknown) instanceof Promise) {
      autoLoading.value = true;
      try {
        await result;
      } finally {
        autoLoading.value = false;
      }
    }
  }
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || isLoading"
    :aria-disabled="disabled"
    :aria-busy="isLoading"
    :class="buttonClasses"
    :style="{
      '--mizu-btn-bg': variantColor.bg,
      '--mizu-btn-text': variantColor.text,
      '--mizu-btn-border': variantColor.border,
    }"
    @click="handleClick"
  >
    <template v-if="isLoading">
      <svg
        :class="['mizu-spinner', spinnerSizeClass]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25" />
        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" opacity="0.75" />
      </svg>
    </template>
    <template v-else>
      <span v-if="hasLeadingIcon" class="mizu-icon-wrapper">
        <slot name="leading-icon" />
      </span>
      <span v-if="hasDefaultSlot" class="mizu-button__label">
        <slot />
      </span>
      <span v-if="hasTrailingIcon" class="mizu-icon-wrapper">
        <slot name="trailing-icon" />
      </span>
    </template>
  </button>
</template>

<style>
@reference "../index.css";

/* Base button */
.mizu-button {
  @apply inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out cursor-pointer select-none border-none m-0 font-[inherit] focus:outline-none shrink-0;
  background-color: var(--mizu-btn-bg);
  color: var(--mizu-btn-text);
}
.mizu-button:focus-visible {
  @apply outline outline-1 outline-[var(--color-brand-accent)] outline-offset-2;
}
.mizu-button:active:not(:disabled) {
  @apply scale-[0.98];
}
.mizu-button--bordered {
  border-style: solid;
  border-width: 1px;
  border-color: var(--mizu-btn-border);
}

/* Sizes */
.mizu-button--sm {
  @apply h-[28px] px-[8px] py-[8px] text-[12px] leading-none gap-[4px] rounded-[4px];
}
.mizu-button--md {
  @apply h-[36px] px-[10px] py-[10px] text-[12px] leading-none gap-[6px] rounded-[6px];
}
.mizu-button--lg {
  @apply h-[40px] px-[10px] py-[10px] text-[14px] leading-none gap-[8px] rounded-[6px];
}

/* Icon wrapper */
.mizu-icon-wrapper {
  @apply inline-flex items-center justify-center shrink-0 w-[1.25em] h-[1.25em];
}

/* Spinner */
.mizu-spinner {
  @apply shrink-0;
  animation: mizu-spin 1s linear infinite;
}
.mizu-button--sm .mizu-spinner { @apply w-[10px] h-[10px]; }
.mizu-button--md .mizu-spinner { @apply w-[16px] h-[16px]; }
.mizu-button--lg .mizu-spinner { @apply w-[20px] h-[20px]; }

@keyframes mizu-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Hover states */
.mizu-primary:hover:not(:disabled) { @apply bg-[var(--color-brand-primary-hover)]; }
.mizu-accent:hover:not(:disabled) { @apply bg-[var(--color-brand-accent-hover)]; }
.mizu-ghost:hover:not(:disabled) { @apply text-[var(--color-brand-primary-hover)]; }
.mizu-outline:hover:not(:disabled) { @apply bg-[var(--color-surface-subtle)]; }
.mizu-success:hover:not(:disabled) { @apply bg-[var(--color-feedback-success-hover)]; }
.mizu-warning:hover:not(:disabled) { @apply bg-[var(--color-feedback-warning-hover)]; }
.mizu-error:hover:not(:disabled) { @apply bg-[var(--color-feedback-error-hover)]; }
.mizu-info:hover:not(:disabled) { @apply bg-[var(--color-feedback-info-hover)]; }
.mizu-outline-success:hover:not(:disabled) { @apply bg-[var(--color-feedback-success-subtle)]; }
.mizu-outline-warning:hover:not(:disabled) { @apply bg-[var(--color-feedback-warning-subtle)]; }
.mizu-outline-error:hover:not(:disabled) { @apply bg-[var(--color-feedback-error-subtle)]; }
.mizu-outline-info:hover:not(:disabled) { @apply bg-[var(--color-feedback-info-subtle)]; }

/* Outline press inset shadow */
.mizu-outline:active:not(:disabled),
[class*="mizu-outline-"]:active:not(:disabled) {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Block (full width) */
.mizu-button--block {
  @apply w-full;
}

/* Square (equal padding, icon-only mode) */
.mizu-button--square.mizu-button--sm {
  @apply p-[8px];
}
.mizu-button--square.mizu-button--md {
  @apply p-[10px];
}
.mizu-button--square.mizu-button--lg {
  @apply p-[10px];
}

/* Loading state */
.mizu-button--loading {
  @apply pointer-events-none opacity-80;
}
.mizu-button--loading:active {
  @apply scale-100;
}

/* Disabled state */
.mizu-button--disabled {
  @apply bg-[var(--color-surface-muted)] text-[var(--color-foreground-tertiary)] border-transparent cursor-not-allowed;
}
.mizu-button--disabled:hover {
  @apply bg-[var(--color-surface-muted)];
}
</style>
