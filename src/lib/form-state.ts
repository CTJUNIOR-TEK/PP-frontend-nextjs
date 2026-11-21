import type { z } from "zod";

/**
 * Estado retornado pelas Server Actions de formulário e consumido com
 * `useActionState` nos Client Components.
 */
export type FormState<TField extends string = string> = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<TField, string[]>>;
  /** Valores enviados, para não apagar o formulário quando há erro. */
  values?: Partial<Record<TField, string>>;
  /** Muda a cada sucesso; use como `key` para limpar o formulário. */
  resetKey?: number;
};

export const initialFormState: FormState = { status: "idle" };

export function formDataToObject(formData: FormData): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") result[key] = value;
  }
  return result;
}

export function validationErrorState<TField extends string>(
  error: z.ZodError,
  values: Record<string, string>,
  omitFromValues: string[] = [],
): FormState<TField> {
  const fieldErrors: Partial<Record<string, string[]>> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "");
    (fieldErrors[field] ??= []).push(issue.message);
  }

  const safeValues = { ...values };
  for (const key of omitFromValues) delete safeValues[key];

  return {
    status: "error",
    message: "Corrija os campos destacados.",
    fieldErrors: fieldErrors as FormState<TField>["fieldErrors"],
    values: safeValues as FormState<TField>["values"],
  };
}
