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
