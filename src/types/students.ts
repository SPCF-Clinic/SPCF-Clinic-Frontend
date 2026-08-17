export interface StudentIndex {
  id: number;
  username: string;
  name: string;
  grade_level: string | null;
  year_level: string | null;
  course: string | null;
  age: number;
  sex: "MALE" | "FEMALE";
  status: string;
}

export interface StudentShow {
  id: number;
  username: string;
  personal_info: Fields[];
  medical_history: Fields[];
}

export interface Fields {
  id: number;
  name: string;
  form_order: number;
  value: string[] | string;
  additional_fields: AdditionalField[];
}

export interface AdditionalField {
  id: number;
  name: string;
  value: null | string;
}

export interface StudentCheckInIndex {
  id: number;
  user: CheckInStudent;
  reason_for_visit: string;
  check_in_time: string;
  items_dispensed: ItemsDispensed[];
  remarks: string | null;
}

export interface CheckInStudent {
  id: number;
  name: string;
  age: number;
  grade_level: string | null;
  year_level: string | null;
  course: string | null;
}

export interface ItemsDispensed {
  name: string;
  quantity: number;
}
