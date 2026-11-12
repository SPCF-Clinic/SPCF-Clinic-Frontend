import { apiClient } from "@/services/axios";
import type { PaginationMeta, PaginationQueryParams } from "@/types/api";
import type { StudentIndex, StudentShow } from "@/types/students";
import type { GetCheckInsResponse } from "./check-ins";

export const STUDENT_SORT_KEYS = [
  "student_id",
  "name",
  "year_level",
  "age",
  "sex",
  "status",
] as const;

export type StudentSortKey = (typeof STUDENT_SORT_KEYS)[number];
export type StudentSortOrder = "asc" | "desc";

export type GetStudentsFilters = PaginationQueryParams<{
  student_id?: string;
  sort_by?: StudentSortKey;
  sort_order?: StudentSortOrder;
}>;

export type GetStudentsResponse = {
  students: StudentIndex[];
  pagination: PaginationMeta | null;
};

export const getStudents = (filters?: GetStudentsFilters) =>
  apiClient.get<GetStudentsResponse>("/students", { params: filters });

export const getStudent = (studentId: number) =>
  apiClient.get<StudentShow>(`/students/${studentId}`);

export type GetStudentCheckInsFilters = PaginationQueryParams<{
  search?: string;
}>;

export const getStudentCheckIns = (
  studentId: number,
  filters?: GetStudentCheckInsFilters,
) =>
  apiClient.get<GetCheckInsResponse>(`/students/${studentId}/check-ins`, {
    params: filters,
  });
