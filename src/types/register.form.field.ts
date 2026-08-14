interface FieldType {
  name: string;
  is_answerable: boolean;
  has_options: boolean;
  can_select_multiple: boolean;
}

interface AdditionalField {
  id: number;
  version_number: number;
  name: string;
  type: FieldType;
  options: string[];
  required_with_field_value: string;
}

export interface PersonalInfoField {
  id: number;
  name: string;
  type: FieldType;
  form_order: number;
  description_text: string | null;
  options: string[];
  is_required: boolean;
  required_with_field: string | null;
  additional_fields: AdditionalField[];
}

export interface PersonalInfoApiResponse {
  message: string;
  data: PersonalInfoField[];
  code: number;
  error: boolean;
  form_version: string;
}
// Field input type configuration
 interface FieldType {
  name: 'Divider' | 'Radio' | 'Checkbox' | 'Short Text' | string;
  is_answerable: boolean;
  has_options: boolean;
  can_select_multiple: boolean;
}

export interface AdditionalField {
  id: number;
  version_number: number;
  name: string;
  type: FieldType;
  options: string[];
  required_with_field_value: string;
}

export interface MedicalHistoryField {
  id: number;
  name: string;
  type: FieldType;
  form_order: number;
  description_text: string | null;
  options: string[];
  is_required: boolean;
  required_with_field: number | string | null;
  additional_fields: AdditionalField[];
}

export interface MedicalHistoryResponse {
  message: string;
  data: MedicalHistoryField[];
  code: number;
  error: boolean;
  form_version: string;
}

export interface RegisterReqBody {
  name: string;
  student_id: string;
  password: string;
  personal_info: Record<number, string>;
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