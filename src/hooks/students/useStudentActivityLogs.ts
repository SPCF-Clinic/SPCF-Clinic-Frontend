import { useInfiniteQuery } from "@tanstack/react-query";

import {
    type GetActivityLogsFilters,
} from "@/api/activity-logs";

import { activityLogQueries } from "@/query/activity-logs";

export function useStudentActivityLogs(
    filters?: GetActivityLogsFilters,
) {
    console.log(filters?.performed_by, "filters in useStudentActivityLogs")
    return useInfiniteQuery({
        ...activityLogQueries.list(filters),
    });
}