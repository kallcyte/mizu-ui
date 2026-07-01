import { ref, computed, type Ref, type ComputedRef } from "vue";
import { z } from "zod";
import type { ZodError } from "zod";

export interface FieldState {
  modelValue: Ref<string | boolean | number>;
  error: Ref<string | undefined>;
  touched: Ref<boolean>;
  onChange: (value: string | boolean | number) => void;
  onBlur: () => void;
}

export interface MizuFormResult<T extends Record<string, unknown>> {
  fields: { [K in keyof T]: FieldState };
  values: ComputedRef<T>;
  errors: ComputedRef<Record<string, string | undefined>>;
  hasErrors: ComputedRef<boolean>;
  isSubmitting: Ref<boolean>;
  submitCount: Ref<number>;
  validate: () => boolean;
  handleSubmit: (fn: (values: T) => void | Promise<void>) => (event?: Event) => Promise<void>;
  reset: () => void;
  setFieldValue: (field: string, value: string | boolean | number) => void;
  setFieldError: (field: string, error: string | undefined) => void;
}

function getFieldError(schema: z.ZodType, path: string, value: unknown): string | undefined {
  const fieldSchema = getFieldSchema(schema, path);
  if (!fieldSchema) return undefined;
  const result = fieldSchema.safeParse(value);
  if (!result.success) {
    const firstIssue = (result.error as ZodError).issues?.[0];
    return firstIssue?.message || "Invalid value";
  }
  return undefined;
}

function getFieldSchema(schema: z.ZodType, path: string): z.ZodType | null {
  const parts = path.split(".");
  let current: unknown = schema;
  for (const part of parts) {
    if (current && typeof current === "object" && "shape" in current) {
      const obj = current as z.ZodObject<any, any>;
      if (part in obj.shape) {
        current = obj.shape[part];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  return (current as z.ZodType) || null;
}

export function useForm<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
): MizuFormResult<z.infer<typeof schema>> {
  type FormData = z.infer<typeof schema>;
  const fieldKeys = Object.keys(schema.shape);

  const initialValues: Record<string, unknown> = {};
  for (const key of fieldKeys) {
    const fieldSchema = schema.shape[key];
    const isBoolean = (fieldSchema as z.ZodType).safeParse(true).success;
    initialValues[key] = isBoolean ? false : "";
  }

  const values = ref({ ...initialValues }) as Ref<Record<string, unknown>>;
  const fieldErrors = ref<Record<string, string | undefined>>({});
  const touched = ref<Record<string, boolean>>({});
  const isSubmitting = ref(false);
  const submitCount = ref(0);

  function validateField(field: string): string | undefined {
    const err = getFieldError(
      schema as unknown as z.ZodType,
      field,
      values.value[field]
    );
    fieldErrors.value[field] = err;
    return err;
  }

  function validateAll(): boolean {
    let valid = true;
    const result = schema.safeParse({ ...values.value });
    if (!result.success) {
      const zodError = result.error as ZodError;
      const fieldMap: Record<string, string> = {};
      for (const issue of zodError.issues) {
        const path = issue.path.join(".");
        if (path && !fieldMap[path]) {
          fieldMap[path] = issue.message;
        }
      }
      for (const key of fieldKeys) {
        fieldErrors.value[key] = fieldMap[key];
        if (fieldMap[key]) valid = false;
      }
    } else {
      for (const key of fieldKeys) {
        fieldErrors.value[key] = undefined;
      }
    }
    return valid;
  }

  const fields = {} as Record<string, FieldState>;
  for (const key of fieldKeys) {
    fields[key] = {
      modelValue: computed({
        get: () => values.value[key] as string | boolean | number,
        set: (val) => {
          values.value[key] = val;
          if (touched.value[key]) validateField(key);
        },
      }),
      error: computed(() => fieldErrors.value[key]),
      touched: computed(() => !!touched.value[key]),
      onChange: (val: string | boolean | number) => {
        values.value[key] = val;
        if (touched.value[key]) validateField(key);
      },
      onBlur: () => {
        touched.value[key] = true;
        validateField(key);
      },
    };
  }

  const errors = computed(() => ({ ...fieldErrors.value }));
  const hasErrors = computed(() =>
    Object.values(fieldErrors.value).some(e => e !== undefined && e !== "")
  );

  function validate(): boolean {
    return validateAll();
  }

  function handleSubmit(
    fn: (formValues: FormData) => void | Promise<void>
  ): (event?: Event) => Promise<void> {
    return async (event?: Event) => {
      event?.preventDefault();
      submitCount.value++;
      const valid = validateAll();
      if (!valid) return;
      isSubmitting.value = true;
      try {
        await fn({ ...values.value } as FormData);
      } finally {
        isSubmitting.value = false;
      }
    };
  }

  function reset() {
    values.value = { ...initialValues };
    fieldErrors.value = {};
    touched.value = {};
    submitCount.value = 0;
    isSubmitting.value = false;
  }

  function setFieldValue(field: string, value: string | boolean | number) {
    values.value[field] = value;
  }

  function setFieldError(field: string, error: string | undefined) {
    fieldErrors.value[field] = error;
  }

  return {
    fields: fields as { [K in keyof FormData]: FieldState },
    values: computed(() => values.value as FormData),
    errors,
    hasErrors,
    isSubmitting,
    submitCount,
    validate,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
  };
}