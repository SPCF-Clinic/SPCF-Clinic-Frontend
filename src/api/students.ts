import { apiClient } from "@/services/axios";
import type { PaginationQueryParams, PaginationResponse } from "@/types/api";
import { type StudentShow, type StudentIndex } from "@/types/students";

export type GetStudentsFilters = PaginationQueryParams<{
  student_id?: string;
}>;

type GetStudentsResponse = PaginationResponse<StudentIndex, "students">;

export const getStudents = (filters?: GetStudentsFilters) =>
  apiClient.get<GetStudentsResponse>("/students", { params: filters });

export const getStudent = (studentId: number) =>
  apiClient.get<StudentShow>(`/students/${studentId}`);
