import type { StudentIndex } from "./students";

export interface CheckInIndex {
  id: number;
  user: CheckInStudent;
  reason_for_visit: string;
  check_in_time: string;
  items_dispensed: ItemsDispensed[];
  remarks: string | null;
}

export interface CheckInStudent {
  id: number;
  student_number: string;
  name: string;
  age: number;
  gender: StudentIndex["sex"] | null;
  grade_level: string | null;
  year_level: string | null;
  course: string | null;
}

export interface ItemsDispensed {
  name: string;
  quantity: number;
}

export interface CheckInShow {
  id: number;
  name: string;
  grade_level: string | null;
  year_level: string | null;
  course: string | null;
  check_in_time: string;
  reason_for_visit: string;
  remarks: string | null;
  bed_id: number | null;
  items_dispensed: ItemsDispensed[];
}

export interface CheckInReportPayload {
  date_from: string;
  date_to: string;
}

export interface DistributionItem {
  label: string;
  count: number;
  percentage: number;
}

export interface CheckInPeriod {
  from: string;
  to: string;
}

export interface CheckInDistributions {
  reason_for_visit: DistributionItem[];
  gender: DistributionItem[];
  religion: DistributionItem[];
  nationality: DistributionItem[];
  education_level: DistributionItem[];
  age_group: DistributionItem[];
}

export interface CheckInReportResponse {
  period: CheckInPeriod;
  total_check_ins: number;
  distributions: CheckInDistributions;
  unavailable: string[];
}

// export interface CheckInReportResponse {
//   message: string;
//   data: CheckInReportData;
//   code: number;
//   error: boolean;
// }