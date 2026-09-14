import { apiClient } from "@/services/axios";
import type { ActivityLogGroup, ActivityLogIndex } from "@/types/activity-logs";
import type {
  CursorPaginationQueryParams,
  CursorPaginationResponse,
} from "@/types/api";

export type GetActivityLogsFilters = CursorPaginationQueryParams<{
  group?: ActivityLogGroup;
  performed_by?: number;
}>;

type GetActivityLogsResponse = CursorPaginationResponse<ActivityLogIndex>;

export const getActivityLogs = (filters?: GetActivityLogsFilters) =>
  apiClient.get<GetActivityLogsResponse>("/activity-logs", { params: filters });
