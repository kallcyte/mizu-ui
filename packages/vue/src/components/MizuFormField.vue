<script lang="ts">
export interface FormFieldProps {
  /** Field name matching a key in form state */
  name: string;
  /** Label text */
  label?: string;
  /** Adds asterisk to label */
  required?: boolean;
  /** Help text displayed below the input */
  help?: string;
}
</script>

<script setup lang="ts">
import { computed, inject, useAttrs } from "vue";
import { MIZU_FORM_KEY } from "../composables/useMizuField";

const props = withDefaults(defineProps<FormFieldProps>(), {
  required: false,
});

const attrs = useAttrs();

const form = inject(MIZU_FORM_KEY, null);

const fieldError = computed(() => form?.errors.value[props.name]);
const fieldTouched = computed(() => !!form?.touched.value[props.name]);
const hasError = computed(() => fieldTouched.value && !!fieldError.value);

const fieldId = computed(() => {
  if (attrs.id) return attrs.id as string;
  return `mizu-field-${props.name}`;
});

function handleFocusOut() {
  form?.markTouched(props.name);
}

const fieldClasses = computed(() => {
  const classes = ["mizu-form-field"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <div :class="fieldClasses" @focusout="handleFocusOut">
    <label v-if="label" :for="fieldId" class="mizu-form-field__label">
      {{ label }}
      <span v-if="required" class="mizu-form-field__required" aria-hidden="true">*</span>
    </label>
    <slot
      :error="hasError"
      :helper-text="hasError && fieldError ? fieldError : help"
      :id="fieldId"
      :name="name"
      :required="required"
      :touched="fieldTouched"
    />
    <span v-if="hasError && fieldError" class="mizu-form-field__error">{{ fieldError }}</span>
    <span v-else-if="help && !hasError" class="mizu-form-field__help">{{ help }}</span>
  </div>
</template>

<style>
.mizu-form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mizu-form-field__label {
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  color: var(--color-foreground-primary);
}

.mizu-form-field__required {
  margin-left: 2px;
  color: var(--color-feedback-error-base);
}

.mizu-form-field__error {
  font-size: 12px;
  line-height: 1;
  color: var(--color-feedback-error-base);
}

.mizu-form-field__help {
  font-size: 12px;
  line-height: 1;
  color: var(--color-foreground-secondary);
}
</style>
