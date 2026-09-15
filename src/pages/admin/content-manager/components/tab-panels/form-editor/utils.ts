import { type FormValidateInput, isNotEmpty } from "@mantine/form";

import type { FormEditingOption } from "@/api/fields";
import type { FormField } from "@/types/student-register";
import type { FieldFormValues } from "./formEditorFormContext";

export const REQUIRED_OPTION_TYPES = ["Dropdown", "Checkbox", "Radio"];

export const validators: FormValidateInput<FieldFormValues> = {
  name: isNotEmpty("Field name is required"),
  type: isNotEmpty("Field type is required"),
  options: (value, values) => {
    if (!REQUIRED_OPTION_TYPES.includes(values.type ?? "")) return null;

    const options = value ?? [];

    return options.some((option) => option.value.trim() !== "")
      ? null
      : "At least one option is required";
  },
};

export function hasValidationErrors(values: FieldFormValues) {
  for (const [key, validate] of Object.entries(validators)) {
    const value = values[key as keyof FieldFormValues];

    if (validate(value, values) != null) {
      return true;
    }
  }

  return false;
}

export function removeTrailingEmptyOption(options?: FormEditingOption[]) {
  if (options?.at(-1)?.value === "") {
    return options.slice(0, -1);
  }

  return options;
}

export const calculateFormOrder = (
  fields: FormField[],
  targetIndex: number,
) => {
  return (
    fields
      .slice(0, targetIndex)
      .reduce(
        (total, field) => total + 1 + (field.additional_fields?.length ?? 0),
        0,
      ) + 1
  );
};

export const calculateReorderPayload = (fields: FormField[]) => {
  const payload = [];
  const reservedOrders = new Set<number>();
  for (const field of fields) {
    if (!field.is_default) continue;
    reservedOrders.add(field.form_order);
    for (const additionalField of field.additional_fields) {
      reservedOrders.add(additionalField.form_order);
    }
  }

  const reorderableFields = fields.filter((field) => !field.is_default);
  let formOrder = 1;

  const getNextAvailableBlockStart = (blockSize: number) => {
    while (
      Array.from({ length: blockSize }, (_, index) => formOrder + index).some(
        (order) => reservedOrders.has(order),
      )
    ) {
      formOrder += 1;
    }
    return formOrder;
  };

  for (const field of reorderableFields) {
    const blockSize = 1 + field.additional_fields.length;
    const blockStart = getNextAvailableBlockStart(blockSize);
    payload.push({ field_id: field.id, form_order: blockStart });
    field.additional_fields.forEach((additionalField, index) => {
      payload.push({
        field_id: additionalField.id,
        form_order: blockStart + index + 1,
      });
    });
    formOrder = blockStart + blockSize;
  }

  return payload;
};
