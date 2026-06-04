<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface TagProps {
  variant?: "primary" | "accent" | "success" | "warning" | "error" | "info";
  closable?: boolean;
}

const props = withDefaults(defineProps<TagProps>(), {
  variant: "primary",
  closable: false,
});

const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => {
  emit("close");
};

const attrs = useAttrs();

const variantColors: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: "var(--bp-color-brand-primary-subtle)", text: "var(--bp-color-brand-primary)", border: "color-mix(in srgb, var(--bp-color-brand-primary) 25%, transparent)" },
  accent: { bg: "var(--bp-color-brand-accent-subtle)", text: "var(--bp-color-brand-accent)", border: "color-mix(in srgb, var(--bp-color-brand-accent) 25%, transparent)" },
  success: { bg: "var(--bp-color-feedback-success-subtle)", text: "var(--bp-color-feedback-success-base)", border: "color-mix(in srgb, var(--bp-color-feedback-success-base) 25%, transparent)" },
  warning: { bg: "var(--bp-color-feedback-warning-subtle)", text: "var(--bp-color-feedback-warning-base)", border: "color-mix(in srgb, var(--bp-color-feedback-warning-base) 25%, transparent)" },
  error: { bg: "var(--bp-color-feedback-error-subtle)", text: "var(--bp-color-feedback-error-base)", border: "color-mix(in srgb, var(--bp-color-feedback-error-base) 25%, transparent)" },
  info: { bg: "var(--bp-color-feedback-info-subtle)", text: "var(--bp-color-feedback-info-base)", border: "color-mix(in srgb, var(--bp-color-feedback-info-base) 25%, transparent)" },
};

const tagClasses = computed(() => {
  const classes = [
    "bp-tag",
    `bp-tag--${props.variant}`,
  ];
  if (props.closable) classes.push("bp-tag--closable");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const styleVars = computed(() => {
  const c = variantColors[props.variant];
  return {
    "--bp-tag-bg": c.bg,
    "--bp-tag-text": c.text,
    "--bp-tag-border": c.border,
  };
});
</script>

<template>
  <span :class="tagClasses" :style="styleVars">
    <slot />
    <button
      v-if="closable"
      type="button"
      class="bp-tag__close"
      @click="handleClose"
      aria-label="Remove tag"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
  </span>
</template>

<style>
@reference "../index.css";

.bp-tag {
  @apply inline-flex items-center font-medium leading-none whitespace-nowrap border;
  background-color: var(--bp-tag-bg);
  color: var(--bp-tag-text);
  border-color: var(--bp-tag-border);
  height: 24px;
  padding: 0 10px;
  font-size: 12px;
  border-radius: 9999px;
  gap: 4px;
  border-width: 1px;
}

.bp-tag__close {
  @apply inline-flex items-center justify-center p-0 border-none bg-transparent cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-150;
  color: inherit;
  width: 12px;
  height: 12px;
}
</style>
