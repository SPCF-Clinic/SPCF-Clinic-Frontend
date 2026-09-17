import { mutationOptions,queryOptions } from "@tanstack/react-query";

import {
	type GetCheckInsFilters,
	getCheckIn,
	getCheckIns,
	updateCheckIn,
} from "@/api/check-ins";

export const checkInQueries = {
	all: () => ["checkIns"],
	lists: () => [...checkInQueries.all(), "list"],
	list: (filters?: GetCheckInsFilters) =>
		queryOptions({
			queryKey: [...checkInQueries.lists(), filters],
			queryFn: () => getCheckIns(filters),
		}),
	details: () => [...checkInQueries.all(), "detail"],
	detail: (id: number) =>
		queryOptions({
			queryKey: [...checkInQueries.details(), id],
			queryFn: () => getCheckIn(id),
		}),
	updateCheckIn: (id: number) =>
		mutationOptions({
			mutationKey: [...checkInQueries.details(), id, ],
			mutationFn: (payload: any) => updateCheckIn(id, payload),
		}),
};

