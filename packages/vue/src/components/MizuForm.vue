<script setup lang="ts">
import { ref, provide, computed, useAttrs } from "vue";
import { MIZU_FORM_KEY, type FormContext } from "../composables/useMizuField";

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormProps {
  /** Reactive form state object */
  state?: Record<string, unknown>;
  /** Validation function — returns array of field errors */
  validate?: (state: Record<string, unknown>) => ValidationError[];
  /** Submit handler — called with validated state */
  submit?: (state: Record<string, unknown>) => Promise<void>;
}

const props = withDefaults(defineProps<FormProps>(), {
  state: () => ({}),
});

const emit = defineEmits<{
  submit: [state: Record<string, unknown>];
}>();

const attrs = useAttrs();

const errors = ref<Record<string, string | undefined>>({});
const touched = ref<Record<string, boolean>>({});
const isSubmitting = ref(false);

function markTouched(field: string) {
  touched.value[field] = true;
}

provide<FormContext>(MIZU_FORM_KEY, {
  errors,
  touched,
  isSubmitting,
  markTouched,
});

const formClasses = computed(() => {
  const classes = ["mizu-form"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

async function handleSubmit(event: Event) {
  event.preventDefault();

  // Mark all state keys as touched
  const state = props.state || {};
  for (const key of Object.keys(state)) {
    touched.value[key] = true;
  }

  // Validate
  if (props.validate) {
    const validationErrors = props.validate(state);
    const errorMap: Record<string, string | undefined> = {};
    for (const e of validationErrors) {
      errorMap[e.field] = e.message;
    }
    errors.value = errorMap;

    if (validationErrors.length > 0) return;
  }

  // Submit
  isSubmitting.value = true;
  try {
    if (props.submit) {
      await props.submit(state);
    }
    emit("submit", state);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <form :class="formClasses" @submit="handleSubmit">
    <slot />
  </form>
</template>

<style>
.mizu-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
