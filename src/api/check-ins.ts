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

export const postCheckInStudent = (payload?: any) => 
  apiClient.post("/check-ins", payload);

export const putCheckOutStudent = (id: number, payload?: number) =>
  apiClient.put(`/check-ins/${id}`, payload);

export const putDispenseItem = (id: number, payload: any) => {
	return apiClient.put(`/check-ins/${id}`, payload)
}