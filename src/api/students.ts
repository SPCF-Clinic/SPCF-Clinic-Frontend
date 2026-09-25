import { apiClient } from "@/services/axios";
import type { PaginationQueryParams, PaginationResponse } from "@/types/api";
import type { StudentIndex, StudentShow } from "@/types/students";
import type { GetCheckInsResponse } from "./check-ins";

export type GetStudentsFilters = PaginationQueryParams<{
	student_id?: string;
}>;

type GetStudentsResponse = PaginationResponse<StudentIndex, "students">;

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

export const updateStudentPassword = (studentId: number, password: string) => {
    return apiClient.put<StudentShow>(`/students/${studentId}`, { password });
};

export const archiveStudent = (studentId: number, payload: any) => {
    return apiClient.put<StudentShow>(`/students/${studentId}`, payload);
};
