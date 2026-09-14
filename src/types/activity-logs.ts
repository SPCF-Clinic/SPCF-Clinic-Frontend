export interface ActivityLogIndex {
  id: number;
  group: ActivityLogGroup;
  action: string;
  user: string;
  created_at: string;
}

export type ActivityLogGroup =
  | "AUTH"
  | "CHECK-IN"
  | "BED"
  | "STUDENT_RECORD"
  | "INVENTORY"
  | "FORM_FIELD"
  | "TIMER";
