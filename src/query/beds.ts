import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { type GetBedsFilters, getBeds } from "@/api/beds";

export const bedQueries = {
	all: () => ["beds"],
	lists: () => [...bedQueries.all(), "list"],
	list: (filters?: GetBedsFilters) =>
		infiniteQueryOptions({
			queryKey: [...bedQueries.lists(), filters],
			queryFn: ({ pageParam }) => getBeds({ ...filters, cursor: pageParam }),
			initialPageParam: "",
			getNextPageParam: (lastPage) => lastPage.data.next_cursor,
		}),
	details: () => [...bedQueries.all(), "detail"],
	detail: (id: number) =>
		queryOptions({
			queryKey: [...bedQueries.details(), id],
			// queryFn: () => getBed(id),
		}),
};
