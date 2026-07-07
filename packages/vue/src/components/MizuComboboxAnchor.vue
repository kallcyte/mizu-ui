<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxAnchor } from "reka-ui";

export interface ComboboxAnchorProps {
  size?: "sm" | "md" | "lg";
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxAnchorProps>(), {
  size: "md",
  error: false,
  disabled: false,
  helperText: undefined,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const anchorClasses = computed(() => {
  const classes = ["mizu-combobox__anchor", `mizu-combobox__anchor--${props.size}`];
  if (props.error) classes.push("mizu-combobox__anchor--error");
  if (props.disabled) classes.push("mizu-combobox__anchor--disabled");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <div class="mizu-combobox__anchor-wrapper">
    <ComboboxAnchor :class="anchorClasses" :as-child="asChild" :as="as">
      <slot />
    </ComboboxAnchor>
    <span
      v-if="helperText"
      :class="['mizu-combobox__helper', { 'mizu-combobox__helper--error': error }]"
    >
      {{ helperText }}
    </span>
  </div>
</template>

<style>
@reference "../index.css";

.mizu-combobox__anchor-wrapper {
  @apply flex flex-col;
  gap: 6px;
}

.mizu-combobox__anchor {
  @apply flex items-center gap-[2px];
  box-sizing: border-box;
  border: 1px solid var(--color-surface-muted);
  background-color: var(--color-surface-base);
  transition:
    border-color 200ms ease-in-out,
    box-shadow 200ms ease-in-out;
}

.mizu-combobox__anchor:focus-within {
  border-color: var(--color-brand-ycp);
  box-shadow: 0 0 0 1px var(--color-brand-ycp);
}

/* Error state */
.mizu-combobox__anchor--error {
  border-color: var(--color-feedback-error-base);
}
.mizu-combobox__anchor--error:focus-within {
  border-color: var(--color-feedback-error-base);
  box-shadow: 0 0 0 1px var(--color-feedback-error-base);
}

/* Disabled state */
.mizu-combobox__anchor--disabled {
  background-color: var(--color-surface-muted);
  color: var(--color-foreground-tertiary);
  cursor: not-allowed;
}

.mizu-combobox__anchor--sm {
  @apply h-[28px];
  border-radius: 4px;
}
.mizu-combobox__anchor--md {
  @apply h-[36px];
  border-radius: 6px;
}
.mizu-combobox__anchor--lg {
  @apply h-[40px];
  border-radius: 6px;
}

/* Helper text */
.mizu-combobox__helper {
  @apply text-[12px] text-[var(--color-foreground-secondary)];
}
.mizu-combobox__helper--error {
  @apply text-[var(--color-feedback-error-base)];
}
</style>
