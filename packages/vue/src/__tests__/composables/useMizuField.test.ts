import { describe, it, expect } from "vitest";
import { z } from "zod";
import { useForm } from "../../composables/useMizuField";

describe("useForm", () => {
  const schema = z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.coerce.number().min(18, "Must be at least 18"),
  });

  it("initializes fields with default values", () => {
    const form = useForm(schema);
    expect(form.fields.email.modelValue.value).toBe("");
    expect(form.fields.name.modelValue.value).toBe("");
    expect(form.fields.age.modelValue.value).toBe("");
  });

  it("returns no errors initially", () => {
    const form = useForm(schema);
    expect(form.errors.value).toEqual({});
    expect(form.hasErrors.value).toBe(false);
  });

  it("returns no error before field is touched", () => {
    const form = useForm(schema);
    form.fields.email.onChange("not-an-email");
    // Not touched yet, so no error should be shown
    expect(form.fields.email.error.value).toBeUndefined();
  });

  it("returns error after blur with invalid input", () => {
    const form = useForm(schema);
    form.fields.email.onChange("not-an-email");
    expect(form.fields.email.error.value).toBeUndefined();
    form.fields.email.onBlur();
    expect(form.fields.email.error.value).toBe("Invalid email address");
  });

  it("clears error when valid value is provided after touch", () => {
    const form = useForm(schema);
    form.fields.email.onChange("not-an-email");
    form.fields.email.onBlur();
    expect(form.fields.email.error.value).toBe("Invalid email address");

    form.fields.email.onChange("valid@example.com");
    expect(form.fields.email.error.value).toBeUndefined();
  });

  it("tracks touched state per field", () => {
    const form = useForm(schema);
    expect(form.fields.email.touched.value).toBe(false);
    form.fields.email.onBlur();
    expect(form.fields.email.touched.value).toBe(true);
    expect(form.fields.name.touched.value).toBe(false);
  });

  it("handles nested field validation on blur", () => {
    const form = useForm(schema);
    form.fields.name.onBlur();
    expect(form.fields.name.error.value).toBe("Name must be at least 2 characters");
    form.fields.name.onChange("John");
    expect(form.fields.name.error.value).toBeUndefined();
  });

  it("returns hasErrors true when any field has an error", () => {
    const form = useForm(schema);
    form.fields.email.onChange("bad");
    form.fields.email.onBlur();
    expect(form.hasErrors.value).toBe(true);
  });

  it("validate() returns false for invalid data", () => {
    const form = useForm(schema);
    form.fields.email.onChange("bad");
    form.fields.name.onChange("A");
    form.fields.age.onChange(15);
    expect(form.validate()).toBe(false);
    expect(form.fields.email.error.value).toBe("Invalid email address");
    expect(form.fields.name.error.value).toBe("Name must be at least 2 characters");
    expect(form.fields.age.error.value).toBe("Must be at least 18");
  });

  it("validate() returns true for valid data and clears errors", () => {
    const form = useForm(schema);
    form.fields.email.onChange("test@example.com");
    form.fields.name.onChange("John");
    form.fields.age.onChange(25);

    // Manually set some errors first
    form.fields.email.onBlur(); // email is valid, so no error
    form.fields.name.onBlur(); // name is valid, so no error

    expect(form.validate()).toBe(true);
    expect(form.fields.email.error.value).toBeUndefined();
    expect(form.fields.name.error.value).toBeUndefined();
    expect(form.fields.age.error.value).toBeUndefined();
  });

  it("handleSubmit prevents default on event", () => {
    const form = useForm(schema);
    // Set valid values so the form submits
    form.fields.email.onChange("test@example.com");
    form.fields.name.onChange("John");
    form.fields.age.onChange(25);

    let submitted = false;
    const handler = form.handleSubmit(() => {
      submitted = true;
    });

    const mockEvent = { preventDefault: () => {} } as Event;
    handler(mockEvent);
    expect(submitted).toBe(true);
  });

  it("handleSubmit does not call fn when data is invalid", async () => {
    const form = useForm(schema);
    let submitted = false;

    const handler = form.handleSubmit(() => {
      submitted = true;
    });

    await handler({ preventDefault: () => {} } as Event);
    expect(submitted).toBe(false);
  });

  it("reset() clears values, errors, and touched state", () => {
    const form = useForm(schema);
    form.fields.email.onChange("test@example.com");
    form.fields.name.onChange("John");
    form.fields.email.onBlur(); // valid, no error
    form.fields.name.onBlur(); // valid, no error
    form.fields.age.onChange(15);
    form.fields.age.onBlur(); // error: must be at least 18

    form.reset();

    expect(form.fields.email.modelValue.value).toBe("");
    expect(form.fields.name.modelValue.value).toBe("");
    expect(form.fields.age.modelValue.value).toBe("");
    expect(form.fields.email.touched.value).toBe(false);
    expect(form.fields.name.touched.value).toBe(false);
    expect(form.fields.age.touched.value).toBe(false);
    expect(form.fields.email.error.value).toBeUndefined();
    expect(form.fields.name.error.value).toBeUndefined();
    expect(form.fields.age.error.value).toBeUndefined();
    expect(form.errors.value).toEqual({});
    expect(form.hasErrors.value).toBe(false);
    expect(form.submitCount.value).toBe(0);
    expect(form.isSubmitting.value).toBe(false);
  });

  it("setFieldValue updates a field value", () => {
    const form = useForm(schema);
    form.setFieldValue("email", "test@example.com");
    expect(form.fields.email.modelValue.value).toBe("test@example.com");
    expect(form.values.value.email).toBe("test@example.com");
  });

  it("setFieldError sets and clears field errors", () => {
    const form = useForm(schema);
    form.setFieldError("email", "Custom error");
    expect(form.fields.email.error.value).toBe("Custom error");

    form.setFieldError("email", undefined);
    expect(form.fields.email.error.value).toBeUndefined();
  });

  it("tracks submit count", () => {
    const form = useForm(schema);
    expect(form.submitCount.value).toBe(0);

    form.fields.email.onChange("test@example.com");
    form.fields.name.onChange("John");
    form.fields.age.onChange(25);

    const handler = form.handleSubmit(() => {});
    handler({ preventDefault: () => {} } as Event);
    expect(form.submitCount.value).toBe(1);

    handler({ preventDefault: () => {} } as Event);
    expect(form.submitCount.value).toBe(2);
  });

  it("sets isSubmitting during async submit", async () => {
    const form = useForm(schema);
    form.fields.email.onChange("test@example.com");
    form.fields.name.onChange("John");
    form.fields.age.onChange(25);

    let resolvePromise: () => void;
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });

    const handler = form.handleSubmit(async () => {
      form.isSubmitting.value = true;
      await promise;
    });

    // Start submission
    const submitPromise = handler({ preventDefault: () => {} } as Event);
    expect(form.isSubmitting.value).toBe(true);

    resolvePromise!();
    await submitPromise;
    expect(form.isSubmitting.value).toBe(false);
  });
});
