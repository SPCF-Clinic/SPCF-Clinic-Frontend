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
  illnesses: string[]; // Adjust item type if illness objects contain nested properties
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
