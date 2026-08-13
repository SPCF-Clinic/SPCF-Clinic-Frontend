import {
  getActivityLogs,
  type GetActivityLogsFilters,
} from "@/api/activity-logs";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const activityLogQueries = {
  all: () => ["activityLog"],
  lists: () => [...activityLogQueries.all(), "list"],
  list: (filters?: GetActivityLogsFilters) =>
    infiniteQueryOptions({
      queryKey: [...activityLogQueries.lists(), filters],
      queryFn: ({ pageParam }) =>
        getActivityLogs({ ...filters, cursor: pageParam }),
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.data.next_cursor,
    }),
};
