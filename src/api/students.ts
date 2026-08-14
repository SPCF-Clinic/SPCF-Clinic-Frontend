import { apiClient } from "@/services/axios";
import type { PaginationQueryParams, PaginationResponse } from "@/types/api";
import type { StudentIndex } from "@/types/students";

export type GetStudentsFilters = PaginationQueryParams<{
  student_id?: string;
}>;

type GetStudentsResponse = PaginationResponse<StudentIndex, "students">;

export const getStudents = (filters?: GetStudentsFilters) =>
  apiClient.get<GetStudentsResponse>("/students", { params: filters });
