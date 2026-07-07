import { describe, it, expect, vi } from "vitest";
import { z } from "zod";
import { useForm } from "../../composables/useMizuField";

describe("useForm", () => {
  const schema = z.object({
    email: z.string().email("Invalid email"),
    name: z.string().min(2, "Name must be at least 2 characters"),
  });

  it("creates fields with initial values", () => {
    const form = useForm(schema);
    expect(form.fields.email.modelValue.value).toBe("");
    expect(form.fields.name.modelValue.value).toBe("");
    expect(form.errors.value).toEqual({});
  });

  it("returns undefined error before field is touched", () => {
    const form = useForm(schema);
    form.fields.email.onChange("not-an-email");
    expect(form.fields.email.error.value).toBeUndefined();
  });

  it("returns an error after blur with invalid input", () => {
    const form = useForm(schema);
    form.fields.email.onChange("not-an-email");
    form.fields.email.onBlur();
    expect(form.fields.email.error.value).toBe("Invalid email");
  });

  it("clears error after blur then valid input", () => {
    const form = useForm(schema);
    form.fields.email.onChange("not-an-email");
    form.fields.email.onBlur();
    expect(form.fields.email.error.value).toBe("Invalid email");

    form.fields.email.onChange("valid@example.com");
    expect(form.fields.email.error.value).toBeUndefined();
  });

  it("tracks touched state via onBlur", () => {
    const form = useForm(schema);
    expect(form.fields.email.touched.value).toBe(false);
    form.fields.email.onBlur();
    expect(form.fields.email.touched.value).toBe(true);
  });

  it("hasErrors returns false when all fields are valid", () => {
    const form = useForm(schema);
    form.fields.email.onChange("test@example.com");
    form.fields.name.onChange("John");
    form.validate();
    expect(form.hasErrors.value).toBe(false);
  });

  it("hasErrors returns true when any field has an error", () => {
    const form = useForm(schema);
    form.fields.email.onChange("bad");
    form.fields.email.onBlur();
    expect(form.hasErrors.value).toBe(true);
  });

  it("validate returns false for invalid data", () => {
    const form = useForm(schema);
    form.fields.email.onChange("bad");
    const valid = form.validate();
    expect(valid).toBe(false);
    expect(form.fields.email.error.value).toBe("Invalid email");
  });

  it("validate returns true for valid data", () => {
    const form = useForm(schema);
    form.fields.email.onChange("test@example.com");
    form.fields.name.onChange("John");
    const valid = form.validate();
    expect(valid).toBe(true);
  });

  it("handleSubmit calls the callback only when data is valid", async () => {
    const form = useForm(schema);
    const callback = vi.fn();

    form.fields.email.onChange("bad");
    const submit = form.handleSubmit(callback);
    await submit();

    expect(callback).not.toHaveBeenCalled();

    form.fields.email.onChange("test@example.com");
    form.fields.name.onChange("John");
    await submit();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ email: "test@example.com", name: "John" });
  });

  it("handleSubmit sets isSubmitting during async callback", async () => {
    const form = useForm(schema);
    form.fields.email.onChange("test@example.com");
    form.fields.name.onChange("John");

    let resolvePromise!: () => void;
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });
    const callback = vi.fn().mockReturnValue(promise);

    const submit = form.handleSubmit(callback);
    const submitPromise = submit();

    expect(form.isSubmitting.value).toBe(true);
    resolvePromise();
    await submitPromise;
    expect(form.isSubmitting.value).toBe(false);
  });

  it("reset clears all fields, errors, and touched state", () => {
    const form = useForm(schema);
    form.fields.email.onChange("test@example.com");
    form.fields.name.onChange("John");
    form.fields.name.onBlur();
    form.validate();

    form.reset();

    expect(form.fields.email.modelValue.value).toBe("");
    expect(form.fields.name.modelValue.value).toBe("");
    expect(form.fields.name.touched.value).toBe(false);
    expect(form.errors.value).toEqual({});
    expect(form.submitCount.value).toBe(0);
  });

  it("increments submitCount on each handleSubmit call", async () => {
    const form = useForm(schema);
    form.fields.email.onChange("test@example.com");
    form.fields.name.onChange("John");
    const callback = vi.fn();

    const submit = form.handleSubmit(callback);
    expect(form.submitCount.value).toBe(0);

    await submit();
    expect(form.submitCount.value).toBe(1);

    await submit();
    expect(form.submitCount.value).toBe(2);
  });

  it("setFieldValue updates a field value", () => {
    const form = useForm(schema);
    form.setFieldValue("email", "manual@example.com");
    expect(form.fields.email.modelValue.value).toBe("manual@example.com");
  });

  it("setFieldError manually sets an error", () => {
    const form = useForm(schema);
    form.setFieldError("email", "Custom error");
    expect(form.fields.email.error.value).toBe("Custom error");
    expect(form.hasErrors.value).toBe(true);
  });
});
