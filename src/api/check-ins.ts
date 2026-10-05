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

export const updateCheckIn = (checkInId: number, payload?: any) =>
  apiClient.put(`/check-ins/${checkInId}`, undefined, {
    params: payload,
  });

export const unassignBed = (checkInId: number) => {
  const payload = { unassign_bed: true };
  return apiClient.put(`/check-ins/${checkInId}`, payload);
};

export const pauseBedTimer = (checkInId: number) => {
  const payload = { pause_timer: true };
  return apiClient.put(`/check-ins/${checkInId}`, payload);
};

export const resumeBedTimer = (checkInId: number) => {
  const payload = { resume_timer: true };
  return apiClient.put(`/check-ins/${checkInId}`, payload);
};

export const putDispenseItem = (id: number, payload: any) => {
  return apiClient.put(`/check-ins/${id}`, payload);
};

export interface AssignBedPayload {
  bed_id: number;
  timer_expires_at: string;
}

export const assignBed = (checkInId: number, payload: AssignBedPayload) =>
  apiClient.put(`/check-ins/${checkInId}`, payload);

