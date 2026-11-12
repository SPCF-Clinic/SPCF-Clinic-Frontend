import { apiClient } from "@/services/axios";
import type { PaginationMeta, PaginationQueryParams } from "@/types/api";
import type {
  CheckInIndex,
  CheckInShow,
  CheckInReportResponse,
  CheckInReportPayload,
} from "@/types/check-ins";

export type GetCheckInsFilters = PaginationQueryParams<{
  search?: string;
  date_from?: string;
  date_to?: string;
}>;

/** Omitting `per_page` makes the endpoint return every filtered check-in
 *  unpaginated, in which case `pagination` is null. */
export type GetCheckInsResponse = {
  check_ins: CheckInIndex[];
  pagination: PaginationMeta | null;
};

export const getCheckIns = (filters?: GetCheckInsFilters) =>
  apiClient.get<GetCheckInsResponse>("/check-ins", { params: filters });

export const getCheckIn = (id: number) => apiClient.get<CheckInShow>(`/check-ins/${id}`);

export const postCheckInStudent = (payload?: any) => apiClient.post("/check-ins", payload);

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

export const getCheckInReport = (payload: CheckInReportPayload) => {
  return apiClient.get<CheckInReportResponse>(`check-ins/report`, {
    params: payload,
  });
};
