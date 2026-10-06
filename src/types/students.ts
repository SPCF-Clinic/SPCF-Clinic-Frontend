import type { OccupiedBed } from "./beds";

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
  status: "Active" | "Archived";
  full_name: string;
  username: string;
  check_in: CheckIn;
  personal_info: Field[];
  medical_history: Field[];
  contact_person: {
    name: string;
    number: string;
  };
  illnesses: string[];
}

interface CheckIn {
  id: number;
  status: "In Clinic" | "Not In Clinic";
  bed: Bed | null;
}

type Bed = Omit<OccupiedBed, "id" | "status" | "current_occupant">;

export interface Field {
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

export type DisplayField = Omit<Field, "id" | "form_order"> & {
  id: number | string;
};
