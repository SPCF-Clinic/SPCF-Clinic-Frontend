import type { FieldTypeName } from "@/constants/fields";
import { apiClient } from "@/services/axios";
import type { FormApiResponse } from "@/types/api";
import type { FormField } from "@/types/student-register";

const FIELD_TYPE_URL = {
  Personal: "/personal-info-fields",
  Medical: "/medical-history-fields",
} satisfies Record<FieldType, string>;

export interface FieldData {
  name: string;
  type: FieldTypeName;
  description_text?: string;
  is_required?: boolean;
  required_with_field_id?: number;
  required_with_field_value?: string;
  required_with_option_id?: number;
  form_order: number;
  options?: Option[];
  version_number: number;
}

export interface Option {
  id: number;
  value: string;
}

export interface FormEditingOption {
  key: string;
  id?: number;
  value: string;
}

export interface FieldFormValues {
  name?: string;
  type?: FieldTypeName;
  description_text?: string | null;
  is_required?: boolean;
  required_with_field_id?: number | null;
  required_with_field_value?: string | null;
  required_with_option_id?: number | null;
  form_order?: number;
  options?: FormEditingOption[];
  version_number?: number;
}

export type FieldType = "Personal" | "Medical";

export const createField = ({
  type,
  data,
}: {
  type: FieldType;
  data: FieldFormValues;
}) =>
  apiClient.post<FormField>(FIELD_TYPE_URL[type], {
    ...data,
    options: data.options?.map(({ value }) => value),
  });

export interface EditFieldVariables {
  type: FieldType;
  id: number;
  data: Omit<FieldFormValues, "version_number"> & { version_number: number };
}
const isExistingOption = (
  option: FormEditingOption,
): option is FormEditingOption & { id: number } =>
  typeof option.id === "number" && Number.isInteger(option.id) && option.id > 0;

export const editField = ({ type, id, data }: EditFieldVariables) => {
  const updateOptions: { id: number; value: string }[] = [];
  const newOptions: string[] = [];

  for (const option of data.options ?? []) {
    if (isExistingOption(option)) {
      updateOptions.push({ id: option.id, value: option.value });
    } else {
      newOptions.push(option.value);
    }
  }

  return apiClient.put<FormField>(`${FIELD_TYPE_URL[type]}/${id}`, {
    version_number: data.version_number,
    name: data.name,
    type: data.type,
    is_required: data.is_required,
    description_text: data.description_text,
    required_with_field_id: data.required_with_field_id,
    required_with_field_value: data.required_with_field_value,
    ...(updateOptions.length > 0 && { update_options: updateOptions }),
    ...(newOptions.length > 0 && { new_options: newOptions }),
  });
};

interface ReorderFieldData {
  fields: ReorderFieldItem[];
  form_version: string;
}
export interface ReorderFieldItem {
  field_id: number;
  form_order: number;
}
export interface ReorderFieldVariables {
  type: FieldType;
  data: ReorderFieldData;
}
export const reorderField = ({ type, data }: ReorderFieldVariables) =>
  apiClient.post<FormApiResponse<FormField[]>>(
    `${FIELD_TYPE_URL[type]}/reorder`,
    data,
  );

export const deleteField = ({
  type,
  id,
  data,
}: {
  type: FieldType;
  id: number;
  data: { version_number: number };
}) => apiClient.delete(`${FIELD_TYPE_URL[type]}/${id}`, { data });
