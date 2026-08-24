import { apiClient } from "@/services/axios";
import type { PaginationQueryParams, PaginationResponse } from "@/types/api";
import type { CheckInIndex, CheckInShow } from "@/types/check-ins";

export type GetCheckInsFilters = PaginationQueryParams<{
	search?: string;
}>;

export type GetCheckInsResponse = PaginationResponse<CheckInIndex, "check_ins">;

export const getCheckIns = (filters?: GetCheckInsFilters) =>
	apiClient.get<GetCheckInsResponse>("/check-ins", { params: filters });

export const getCheckIn = (id: number) =>
	apiClient.get<CheckInShow>(`/check-ins/${id}`);
