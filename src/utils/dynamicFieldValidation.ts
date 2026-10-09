import type { FormErrors } from "@mantine/form";

/**
 * Structural subset of `FormField` / `AdditionalField` that the required-field
 * validators need, so both the schema fields returned by the API and the
 * stored answers on a student satisfy it.
 */
export interface DynamicValidationField {
  id: number;
  name: string;
  is_required?: boolean;
  type?: { name: string } | null;
}

/**
 * A field counts as answered when it holds a non-blank value. Checkbox fields
 * submit an array, so an empty selection is `[]` rather than `""`.
 */
export function isFieldAnswered(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.some((entry) => isFieldAnswered(entry));
  }

  if (value === null || value === undefined) return false;

  return String(value).trim() !== "";
}

/**
 * `null` when the field is optional or answered, otherwise the message to show
 * under it. Divider fields are layout only, so they are never required even
 * when the schema flags them.
 */
export function requiredFieldError(
  field: DynamicValidationField,
  value: unknown,
): string | null {
  const isAnswerable = field.type?.name !== "Divider";

  if (!field.is_required || !isAnswerable) return null;

  return isFieldAnswered(value) ? null : `${field.name} is required`;
}

/**
 * Builds the `<key>: "<message>"` record that Mantine's `validate` callback
 * returns, keyed the same way the caller's inputs are keyed so each error
 * lands on the field it belongs to.
 *
 * Pass a `getValue` that reads the answer and a `getKey` that matches how the
 * inputs are named — see `collectRequiredFieldErrors` call sites for the two
 * shapes the codebase uses (`personal_info[12]` on flat values,
 * `personal_info.12` on nested ones).
 */
export function collectRequiredFieldErrors<
  Field extends DynamicValidationField,
>(
  fields: Field[] | undefined,
  getValue: (field: Field) => unknown,
  getKey: (field: Field) => string,
): FormErrors {
  const errors: FormErrors = {};

  fields?.forEach((field) => {
    const error = requiredFieldError(field, getValue(field));

    if (error) errors[getKey(field)] = error;
  });

  return errors;
}
