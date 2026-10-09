import type { FormOption } from "@/types/student-register";

export interface AdditionalField {
  id: number;
  name: string;
  value: string | null;
}

export interface DynamicFormField {
  id: number;
  name: string;
  form_order: number;
  value: string | string[] | null;
  additional_fields: AdditionalField[];
}

export interface UpdateField {
  id: number;
  name: string;
  /** The student's stored answer; absent on schema-only fields. */
  value?: string | string[] | null;
  type?: { name: string } | null;
  options?: FormOption[];
  is_required?: boolean;
  description_text?: string | null;
  required_with_field_value?: string | null;
  additional_fields?: UpdateField[];
}

export interface ContactPerson {
  name: string;
  number: string;
}

export interface StudentData {
  id: number;
  username: string;
  personal_info: DynamicFormField[];
  medical_history: DynamicFormField[];
  contact_person: ContactPerson;
  personal_info_form_version: string;
  medical_history_form_version: string;
}

export interface StudentResponse {
  message: string;
  data: StudentData;
  code: number;
  error: boolean;
}

export interface BaseStudentUpdateRequest {
  form_version: string;
}
export interface UpdatePersonalInfoPayload extends BaseStudentUpdateRequest {
  personal_info: Record<number, string>;
}

export interface UpdateMedicalHistoryPayload extends BaseStudentUpdateRequest {
  medical_history: Record<number, string | string[]>;
}

export type PersonalInfoQueryParams = {
  form_version: string;
  [key: `personal_info[${number}]`]: string;
};

export type MedicalHistoryQueryParams = {
  form_version: string;
  [
    key: `medical_history[${number}]` | `medical_history[${number}][${number}]`
  ]: string;
};
