import { useDebouncedCallback } from "@mantine/hooks";
import { useEffect, useRef } from "react";

import type { FormEditingOption } from "@/api/fields";
import { useEditFieldMutation } from "@/hooks/fields/useEditFieldMutation";
import type { AdditionalField } from "@/types/student-register";
import { showToastError } from "@/utils/toastError";
import FieldProvider from "../contexts/FieldProvider";
import { useFieldContext } from "../contexts/useFieldContext";
import {
  type FieldFormValues,
  FormEditorFormProvider,
  useFormEditorForm,
} from "../formEditorFormContext";
import {
  hasValidationErrors,
  REQUIRED_OPTION_TYPES,
  removeTrailingEmptyOption,
  validators,
} from "../utils";
import FieldRenderer from "./FieldRenderer";

interface NestedFieldProps {
  field: AdditionalField;
}

function NestedField({ field }: NestedFieldProps) {
  const { fieldType, isDefault: parentIsDefault } = useFieldContext();
  const editFieldMutation = useEditFieldMutation();

  const versionNumberRef = useRef(field.version_number);
  useEffect(() => {
    versionNumberRef.current = field.version_number;
  }, [field.version_number]);

  const form = useFormEditorForm({
    mode: "uncontrolled",
    initialValues: {
      name: field.name,
      type: field.type.name,
      options: field.options.map(
        (option): FormEditingOption => ({
          key: String(option.id),
          id: option.id,
          value: option.value,
        }),
      ),
      is_required: false,
    },
    validate: validators,
    validateInputOnBlur: true,
    validateInputOnChange: true,
    onValuesChange: useDebouncedCallback((values: FieldFormValues) => {
      if (hasValidationErrors(values)) return;
      const payload = {
        ...values,
        options:
          values.type && REQUIRED_OPTION_TYPES.includes(values.type)
            ? removeTrailingEmptyOption(values.options)
            : undefined,
        version_number: versionNumberRef.current,
      };

      editFieldMutation.mutate(
        {
          data: payload,
          id: field.id,
          type: fieldType,
        },
        {
          onSuccess: ({ data }) =>
            (versionNumberRef.current = data.version_number),
          onError: (error) => showToastError(error, "Failed to update field"),
        },
      );
    }, 1000),
  });

  return (
    <FormEditorFormProvider form={form}>
      <FieldProvider
        field={field}
        fieldType={fieldType}
        isDefault={parentIsDefault}
      >
        <FieldRenderer />
      </FieldProvider>
    </FormEditorFormProvider>
  );
}

export default NestedField;
