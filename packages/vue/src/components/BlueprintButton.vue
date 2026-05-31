<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface ButtonProps {
  variant?: "primary" | "accent" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  type: "button",
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

const buttonClasses = computed(() => {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-fast rounded-default focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:cursor-not-allowed select-none";

  const variants: Record<string, string> = {
    primary:
      "bg-brand-primary text-foreground-inverse hover:bg-brand-primary-hover focus:bg-brand-primary-focus active:bg-brand-primary-focus",
    accent:
      "bg-brand-accent text-foreground-inverse hover:bg-brand-accent-hover focus:bg-brand-accent-focus active:bg-brand-accent-focus",
    ghost:
      "bg-transparent text-foreground-primary hover:bg-surface-subtle focus:bg-surface-subtle active:bg-surface-muted",
    outline:
      "bg-transparent text-foreground-primary border border-surface-muted hover:bg-surface-subtle focus:border-brand-accent active:bg-surface-muted",
  };

  const sizes: Record<string, string> = {
    sm: "h-8 px-3 py-1.5 text-caption gap-1.5 min-w-16",
    md: "h-10 px-4 py-2.5 text-body gap-2 min-w-20",
    lg: "h-12 px-6 py-3 text-body font-semibold gap-2 min-w-24",
  };

  const disabledState = props.disabled
    ? "bg-surface-muted text-foreground-tertiary hover:bg-surface-muted focus:bg-surface-muted active:bg-surface-muted border-transparent"
    : "";

  const loadingState = props.loading
    ? "pointer-events-none opacity-80"
    : "";

  return [
    base,
    variants[props.variant],
    sizes[props.size],
    disabledState,
    loadingState,
    attrs.class as string,
  ]
    .filter(Boolean)
    .join(" ");
});

const iconSizes: Record<string, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-5 h-5",
};

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-disabled="disabled"
    :aria-busy="loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <template v-if="loading">
      <svg
        class="animate-spin"
        :class="iconSizes[size]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </template>
    <template v-else>
      <span
        v-if="hasLeadingIcon"
        :class="iconSizes[size]"
        class="shrink-0"
      >
        <slot name="leading-icon" />
      </span>
      <span v-if="hasDefaultSlot">
        <slot />
      </span>
      <span
        v-if="hasTrailingIcon"
        :class="iconSizes[size]"
        class="shrink-0"
      >
        <slot name="trailing-icon" />
      </span>
    </template>
  </button>
</template>
