import { apiClient } from "@/services/axios";
import type { ActivityLogIndex } from "@/types/activity-logs";
import type {
  CursorPaginationQueryParams,
  CursorPaginationResponse,
} from "@/types/api";

export type GetActivityLogsFilters = CursorPaginationQueryParams<{
  group?:
    | "AUTH"
    | "INVENTORY"
    | "STUDENT_RECORD"
    | "CHECK-IN"
    | "BED"
    | "FORM_FIELD"
    | "TIMER";
  performed_by?: number;
  performed_for?: number;
  date?: string;
}>;

type GetActivityLogsResponse = CursorPaginationResponse<ActivityLogIndex>;

export const getActivityLogs = (filters?: GetActivityLogsFilters) =>
  apiClient.get<GetActivityLogsResponse>("/activity-logs", { params: filters });
