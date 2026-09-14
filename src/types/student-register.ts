import type { FieldTypeName } from "@/constants/fields";

// Field input type configuration
interface FieldType {
  name: FieldTypeName;
  is_answerable: boolean;
  has_options: boolean;
  can_select_multiple: boolean;
}

export interface AdditionalField {
  id: number;
  version_number: number;
  form_order: number;
  name: string;
  type: FieldType;
  options: Option[];
  required_with_field_value: string;
}

export interface FormField {
  id: number;
  version_number: number;
  is_default: boolean;
  name: string;
  type: FieldType;
  form_order: number;
  description_text: string | null;
  options: Option[];
  is_required: boolean;
  required_with_field: number | string | null;
  additional_fields: AdditionalField[];
}

export interface Option {
  id: number;
  value: string;
}

export interface RegisterReqBody {
  student_id: string;
  password: string;
  personal_info_form_version: string;
  medical_history_form_version: string;
  [key: `personal_info[${number}]` | `medical_history[${number}]` | string]:
    | string
    | undefined;
}

interface RegisterPersonalInfo {
  id: number;
  user_id: number;
  personal_info_field_id: number;
  value: string;
}

interface RegisterResponseData {
  username: string;
  id: number;
  personal_infos: RegisterPersonalInfo[];
}

export interface RegisterResBody {
  message: string;
  data: RegisterResponseData;
  code: number;
  error: boolean;
}
