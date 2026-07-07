<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxInput } from "reka-ui";

export interface ComboboxInputProps {
  modelValue?: string;
  displayValue?: ((item: unknown) => string) | undefined;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<ComboboxInputProps>(), {
  modelValue: undefined,
  displayValue: undefined,
  placeholder: undefined,
  size: "md",
  asChild: undefined,
  as: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const attrs = useAttrs();

const inputClasses = computed(() => {
  const classes = ["mizu-combobox__input", `mizu-combobox__input--${props.size}`];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

const inputStyle = computed(() => {
  return attrs.style as string | Record<string, string> | undefined;
});
</script>

<template>
  <ComboboxInput
    :class="inputClasses"
    :style="inputStyle"
    :model-value="modelValue"
    :display-value="displayValue"
    :placeholder="placeholder"
    :as-child="asChild"
    :as="as"
    @update:model-value="(v: string) => emit('update:modelValue', v)"
  >
    <slot />
  </ComboboxInput>
</template>

<style>
@reference "../index.css";

.mizu-combobox__input {
  @apply w-full font-[inherit] outline-none;
  box-sizing: border-box;
  height: 100%;
  line-height: 1;
  color: var(--color-foreground-primary);
  background: transparent;
  border: none;
  margin: 0;
}

.mizu-combobox__input::placeholder {
  color: var(--color-foreground-tertiary);
}

.mizu-combobox__input--sm {
  @apply text-[12px];
  padding: 0 8px;
}
.mizu-combobox__input--md {
  @apply text-[12px];
  padding: 0 10px;
}
.mizu-combobox__input--lg {
  @apply text-[14px];
  padding: 0 10px;
}
</style>
