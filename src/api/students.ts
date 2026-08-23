import { apiClient } from "@/services/axios";
import type { PaginationQueryParams, PaginationResponse } from "@/types/api";
import type {
	StudentCheckInIndex,
	StudentIndex,
	StudentShow,
} from "@/types/students";

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

type GetStudentCheckInsResponse = PaginationResponse<
	StudentCheckInIndex,
	"check_ins"
>;

export const getStudentCheckIns = (
	studentId: number,
	filters?: GetStudentCheckInsFilters,
) =>
	apiClient.get<GetStudentCheckInsResponse>(
		`/students/${studentId}/check-ins`,
		{ params: filters },
	);
