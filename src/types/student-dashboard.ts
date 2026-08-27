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