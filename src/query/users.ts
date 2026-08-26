import { queryOptions } from "@tanstack/react-query";

import { type GetUsersFilters, getUsers } from "@/api/users";

export const userQueries = {
	all: () => ["users"],
	lists: () => [...userQueries.all(), "list"],
	list: (filters?: GetUsersFilters) =>
		queryOptions({
			queryKey: [...userQueries.lists(), filters],
			queryFn: () => getUsers(filters),
		}),
	details: () => [...userQueries.all(), "detail"],
	detail: (id: number) =>
		queryOptions({
			queryKey: [...userQueries.details(), id],
			// queryFn: () => getUser(id),
		}),
};
