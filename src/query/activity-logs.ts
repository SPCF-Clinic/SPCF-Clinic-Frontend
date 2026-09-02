import { infiniteQueryOptions } from "@tanstack/react-query";

import {
	type GetActivityLogsFilters,
	getActivityLogs,
} from "@/api/activity-logs";

export const activityLogQueries = {
	all: () => ["activityLogs"],
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
