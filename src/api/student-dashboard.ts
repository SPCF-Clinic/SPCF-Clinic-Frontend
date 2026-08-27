import { apiClient } from "../services/axios";
import type { StudentResponse } from "@/types/student-dashboard";

interface FetchStudentParams {
  student_number: number;
}

export async function fetchStudent({ student_number }: FetchStudentParams) {
  const { data } = await apiClient.get<StudentResponse>(`students/${student_number}`);
  return data;
}